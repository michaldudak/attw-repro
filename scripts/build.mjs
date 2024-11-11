import { rimraf } from 'rimraf';
import { $ } from 'execa';
import { writeFile } from 'node:fs/promises';

await rimraf('./build');

await $`tsc -p tsconfig.esm.json`;
await $`tsc -p tsconfig.cjs.json`;

await writeFile('./build/esm/package.json', JSON.stringify({ 'type': 'module' }, null, 2));