import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';

const sourcePath = 'index.src.html';
const targetPath = 'index.html';

const source = await readFile(sourcePath, 'utf8');
const previous = await readFile(targetPath, 'utf8');

await writeFile(targetPath, source, 'utf8');

try {
  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  const child = spawn(npmCommand, ['exec', '--', 'vite', 'build'], {
    stdio: 'inherit',
    env: process.env,
  });

  const exitCode = await new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('exit', (code, signal) => resolve(code ?? (signal ? 1 : 0)));
  });

  if (exitCode !== 0) process.exitCode = exitCode;
  await copyFile('src/data/notifications.json', 'dist/notifications.json');
} finally {
  await writeFile(targetPath, previous, 'utf8');
}
