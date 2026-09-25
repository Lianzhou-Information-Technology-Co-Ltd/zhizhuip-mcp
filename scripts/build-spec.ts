import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import type { ToolDef } from '../src/types.js';
import { buildTools, loadOverrides, parsePage, type Page } from './lib/merge.js';

const ROOT = new URL('../', import.meta.url);

/** 读 spec/pages 下全部页面；页面 id 就是相对路径去掉 .md，和 placePages 的落盘规则一致 */
export function loadPages(dir: URL = new URL('spec/pages/', ROOT)): Page[] {
  return (readdirSync(dir, { recursive: true }) as string[])
    .map(f => f.replaceAll('\\', '/'))
    .filter(f => f.endsWith('.md'))
    .sort()
    .map(f => parsePage(f.replace(/\.md$/, ''), readFileSync(new URL(f, dir), 'utf8')));
}

export function generate(): ToolDef[] {
  return buildTools(loadPages(), loadOverrides(readFileSync(new URL('spec/overrides.yaml', ROOT), 'utf8')));
}

export function buildSpec(): void {
  const out = new URL('spec/tools.json', ROOT);
  const prev: ToolDef[] = existsSync(out) ? JSON.parse(readFileSync(out, 'utf8')) : [];
  const next = generate();
  writeFileSync(out, JSON.stringify(next, null, 2) + '\n');
  printDiff(prev, next);
}

function printDiff(prev: ToolDef[], next: ToolDef[]): void {
  const sig = (t: ToolDef) => JSON.stringify([Object.keys(t.inputSchema.properties).sort(), [...t.inputSchema.required].sort(), t.products ?? null, t.fixed ?? null]);
  const p = new Map(prev.map(t => [t.name, t]));
  const n = new Map(next.map(t => [t.name, t]));
  for (const name of n.keys()) if (!p.has(name)) console.error(`+ ${name}`);
  for (const name of p.keys()) if (!n.has(name)) console.error(`- ${name}`);
  for (const [name, t] of n) {
    const o = p.get(name);
    if (o && sig(o) !== sig(t)) console.error(`~ ${name}: 参数、必填项或产品有变化`);
  }
  console.error(`spec/tools.json：${next.length} 个工具，其中只读 ${next.filter(t => t.readOnly).length} 个`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) buildSpec();
