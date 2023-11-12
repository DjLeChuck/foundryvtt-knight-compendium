import fs from 'fs';
import path from 'path';
import { compilePack } from '@foundryvtt/foundryvtt-cli';

async function compilePacksInDir(sourceDir, targetDir) {
  // Read all names in the source directory
  const names = await fs.promises.readdir(sourceDir, { withFileTypes: true });

  // Filter the names for directories only
  const dirNames = names
    .filter(value => value.isDirectory())
    .map(value => value.name);

  // For each directory, call compilePack with the correct arguments
  for (const dirName of dirNames) {
    console.log(`Packing ${dirName}...`);
    await compilePack(path.join(sourceDir, dirName), path.join(targetDir, dirName), { log: true });
  }
}

console.log('Compiling packs...');
await compilePacksInDir('_packs_sources', 'packs');
