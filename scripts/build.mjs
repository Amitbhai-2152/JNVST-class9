import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';

const sourcePath = 'index.src.html';
const targetPath = 'index.html';
const siteUrl = 'https://amitbhai-2152.github.io/JNVST-class9';
const curriculumSourcePath = 'src/data/curriculum.ts';

const escapeXml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

const unique = (items) => [...new Set(items)];

const extractIds = (source, pattern) => unique([...source.matchAll(pattern)].map((match) => match[1]));

const assetBasename = (value) => value.split('/').pop() || value;

const getAssetReferences = (html) =>
  [...html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css))["']/g)]
    .map((match) => assetBasename(match[1]))
    .filter((name) => name.endsWith('.js') || name.endsWith('.css'));

const preserveLegacyEntryAssets = async (previousHtml, builtHtml) => {
  const previousAssets = getAssetReferences(previousHtml);
  const builtAssets = getAssetReferences(builtHtml);

  for (const previousAsset of previousAssets) {
    const extension = previousAsset.endsWith('.css') ? '.css' : '.js';
    const currentAsset = builtAssets.find((asset) => asset.endsWith(extension));
    if (!currentAsset || currentAsset === previousAsset) continue;

    await copyFile('dist/assets/' + currentAsset, 'dist/assets/' + previousAsset);
  }
};

const buildSeoFiles = async () => {
  const curriculumSource = await readFile(curriculumSourcePath, 'utf8');
  const subjectIds = extractIds(curriculumSource, /\{ id: ['"](sub_[^'"]+)['"], title:/g);
  const chapterIds = extractIds(curriculumSource, /\{ id: ['"](chap_[^'"]+)['"], subjectId:/g);
  const topicIds = extractIds(curriculumSource, /\{ id: ['"](top_[^'"]+)['"], chapterId:/g);
  const lessonIds = extractIds(curriculumSource, /lessonIds:\s*\[([^\]]*)\]/g).flatMap((chunk) =>
    [...chunk.matchAll(/['"](les_[^'"]+)['"]/g)].map((match) => match[1]),
  );
  const staticPaths = [
    '/',
    '/login',
    '/subjects',
    '/english-revision',
    '/hindi-revision',
    '/math-formulas',
    '/science-revision',
    '/english-translation-lab',
    '/english-vocabulary-lab',
    '/english-translation-practice',
    '/english-vocabulary-practice',
    '/english-unseen-passage',
    '/hindi-unseen-passage',
    '/question-bank',
    '/smart-practice',
    '/math-smart-practice',
    '/science-smart-practice',
    '/english-smart-practice',
    '/hindi-smart-practice',
    '/mock-tests',
    '/math-mock-test',
    '/science-mock-test',
    '/english-mock-test',
    '/hindi-mock-test',
    '/bookmarks',
  ];
  const subjectPaths = subjectIds.map((id) => '/subjects/' + id);
  const chapterPaths = chapterIds.flatMap((id) => [
    '/chapters/' + id,
    '/chapters/' + id + '/study',
    '/chapters/' + id + '/challenger',
  ]);
  const topicPaths = topicIds.flatMap((id) => [
    '/practice/' + id,
    '/topics/' + id + '/challenger',
  ]);
  const lessonPaths = lessonIds.map((id) => '/lessons/' + id);
  const paths = unique([...staticPaths, ...subjectPaths, ...chapterPaths, ...topicPaths, ...lessonPaths]);

  const today = new Date().toISOString().slice(0, 10);
  const xmlUrls = paths.map((path) => {
    const loc = siteUrl + (path === '/' ? '/' : path);
    return [
      '  <url>',
      '    <loc>' + escapeXml(loc) + '</loc>',
      '    <lastmod>' + today + '</lastmod>',
      '  </url>',
    ].join('\n');
  }).join('\n');

  await mkdir('dist', { recursive: true });
  await writeFile(
    'dist/sitemap.xml',
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      xmlUrls +
      '\n</urlset>\n',
    'utf8',
  );

  await writeFile(
    'dist/robots.txt',
    [
      'User-agent: *',
      'Allow: /',
      'Sitemap: ' + siteUrl + '/sitemap.xml',
      '',
    ].join('\n'),
    'utf8',
  );

  await copyFile('dist/index.html', 'dist/404.html');

  for (const path of paths) {
    if (path === '/') continue;
    const routeDirectory = 'dist' + path;
    await mkdir(routeDirectory, { recursive: true });
    await copyFile('dist/index.html', routeDirectory + '/index.html');
  }
};

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
  else {
    const builtIndex = await readFile('dist/index.html', 'utf8');
    await preserveLegacyEntryAssets(previous, builtIndex);
    await copyFile('src/data/notifications.json', 'dist/notifications.json');
    await buildSeoFiles();
  }
} finally {
  await writeFile(targetPath, previous, 'utf8');
}
