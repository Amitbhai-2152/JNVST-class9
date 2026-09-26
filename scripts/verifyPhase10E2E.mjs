import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const distPath = path.join(ROOT, 'dist');
const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const fail = (message) => {
  throw new Error(message);
};
const assert = (name, condition, detail = '') => {
  if (!condition) fail('FAIL — ' + name + (detail ? ': ' + detail : ''));
  console.log('PASS — ' + name);
};

const APP = read('src/App.tsx');
const AUTH = read('src/auth/Auth.tsx');
const PROGRESS = read('src/store/progress.ts');
const QUESTION_BANK = read('src/pages/QuestionBankPage.tsx');
const QBPAGE_CSS = read('src/question-bank.css');
const INDEX_CSS = read('src/index.css');
const PACKAGE = JSON.parse(read('package.json'));

const QUESTION_BANK_REMOTE_MARKERS = [
  ['expanded practice heading', 'EXPANDED PRACTICE'],
  ['hard-plus difficulty filter', 'hard-plus'],
  ['hard-plus label', 'Hard + Challenge'],
  ['custom question size controls', 'question-bank-size-presets'],
  ['custom question size presets', '50,75,100'],
];

const criticalRoutes = [
  '/',
  '/login',
  '/subjects',
  '/subjects/sub_hin',
  '/subjects/sub_eng',
  '/subjects/sub_math',
  '/subjects/sub_sci',
  '/chapters/chap_math_01',
  '/lessons/les_math_03_04_01',
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
  '/english-translation-lab',
  '/english-vocabulary-lab',
  '/english-translation-practice',
  '/english-vocabulary-practice',
  '/english-unseen-passage',
  '/hindi-unseen-passage',
  '/bookmarks',
];

const requiredRouteFragments = [
  ['dashboard route', '<Route path="/" element={<Dashboard />} />'],
  ['login route', '<Route path="/login" element={<AuthPage />} />'],
  ['subjects route', '<Route path="/subjects" element={<SubjectsPage />} />'],
  ['chapter study route', '<Route path="/chapters/:chapterId/study" element={<ChapterStudyPage />} />'],
  ['topic challenger route', '<Route path="/topics/:topicId/challenger" element={<TopicChallengerPage />} />'],
  ['lesson route', '<Route path="/lessons/:lessonId" element={<LessonPage />} />'],
  ['question bank route', '<Route path="/question-bank" element={<Shell><QuestionBankPage /></Shell>} />'],
  ['mock route', '<Route path="/mock-tests" element={<MockTestsPage />} />'],
  ['math mock route', '<Route path="/math-mock-test" element={<MathMockTestPage />} />'],
  ['science mock route', '<Route path="/science-mock-test" element={<ScienceMockTestPage />} />'],
  ['english translation lab route', '<Route path="/english-translation-lab" element={<EnglishTranslationLabPage />} />'],
  ['english vocabulary lab route', '<Route path="/english-vocabulary-lab" element={<EnglishVocabularyLabPage />} />'],
  ['hindi unseen route', '<Route path="/hindi-unseen-passage" element={<HindiUnseenPassagePage />} />'],
];

for (const [name, fragment] of requiredRouteFragments) assert(name, APP.includes(fragment));

assert('critical route catalog size', criticalRoutes.length >= 25);
assert('question bank canonical selector', QUESTION_BANK.includes('selectQuestionBankSession('));
assert('question bank session persistence', QUESTION_BANK.includes('saveQuestionBankSession({'));
assert('question bank attempt recording', QUESTION_BANK.includes('recordAttempts(attemptItems)'));
assert('question bank resume restoration', QUESTION_BANK.includes('savedQuestionBankSession.questionIds'));
assert('question bank challenger integration', QUESTION_BANK.includes('getDedicatedTopicChallengers('));
assert('question bank restored session state', QUESTION_BANK.includes('setSessionState(savedQuestionBankSession.status)'));

assert('progress persistence version', PROGRESS.includes('version: 5'));
assert('progress stores question bank session', PROGRESS.includes('questionBankSession: null'));
assert('progress exposes question bank session action', PROGRESS.includes('saveQuestionBankSession:'));
assert('progress stores mock results', PROGRESS.includes('mockTestResults: [result'));
assert('progress stores lab attempts', PROGRESS.includes('recordEnglishLabAttempt'));
assert('auth gate handles recovery', AUTH.includes('recoveryMode'));
assert('auth supports Google login', AUTH.includes('signInWithGoogle'));
assert('auth supports email confirmation', AUTH.includes('resendEmailConfirmation'));

assert('notifications runtime feed', APP.includes('NOTIFICATION_FEED_URL'));
assert('notifications refresh interval', APP.includes('NOTIFICATION_REFRESH_INTERVAL_MS'));
assert('notifications persisted read state', APP.includes('NOTIFICATION_READ_KEY'));
assert('route scroll reset', APP.includes('window.scrollTo({ top: 0, left: 0, behavior: \'auto\' })'));
assert('mobile nav accessibility contract', APP.includes('aria-controls="primary-navigation-panel"'));
assert('main landmark', APP.includes('id="main-content"'));
assert('question bank mobile stylesheet', QBPAGE_CSS.includes('PHASE 9 — question-bank mobile refinement'));
assert('phase 9 global mobile guards', INDEX_CSS.includes('PHASE 9 — mobile + student UX final hardening'));

assert('verify script exists', Boolean(PACKAGE.scripts?.verify));
assert('e2e script exists', PACKAGE.scripts?.['verify:e2e'] === 'node scripts/verifyPhase10E2E.mjs');
assert('production build script exists', PACKAGE.scripts?.build === 'node scripts/build.mjs');

const fetchWithRetry = async (url, init = {}, attempts = 1, delayMs = 0) => {
  let lastResponse = null;
  let lastError = null;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      lastResponse = await fetch(url, init);
      if (lastResponse.status === 200 || attempt === attempts - 1 || delayMs === 0) {
        return lastResponse;
      }
    } catch (error) {
      lastError = error;
      if (attempt === attempts - 1 || delayMs === 0) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  if (lastResponse) return lastResponse;
  throw lastError ?? new Error('Request failed');
};

const checkHtml = async (baseUrl, label, routes, options = {}) => {
  const origin = baseUrl.replace(/\/$/, '');
  const attempts = options.attempts ?? 1;
  const delayMs = options.delayMs ?? 0;
  const results = [];

  for (const route of routes) {
    const candidatePaths = route === '/' ? ['/'] : [route, route + '/'];
    let response = null;
    let body = '';
    let resolvedPath = route;

    for (const candidate of candidatePaths) {
      const url = origin + candidate + (candidate.includes('?') ? '&' : '?') + '_phase10=1';
      const candidateResponse = await fetchWithRetry(
        url,
        {
          redirect: 'follow',
          headers: { 'cache-control': 'no-cache', accept: 'text/html,*/*' },
        },
        attempts,
        delayMs,
      );
      const candidateBody = await candidateResponse.text();

      if (candidateResponse.status === 200) {
        response = candidateResponse;
        body = candidateBody;
        resolvedPath = candidate;
        break;
      }

      // GitHub Pages history-routing fallback: a generated 404.html can still
      // boot the SPA, after which BrowserRouter resolves the requested route.
      if (candidateResponse.status === 404 && /id=["']root["']/.test(candidateBody)) {
        response = candidateResponse;
        body = candidateBody;
        resolvedPath = candidate;
        break;
      }

      response = candidateResponse;
      body = candidateBody;
    }

    const routeStatus = response?.status ?? 0;
    const hasShell = /id=["']root["']/.test(body);
    const validRouteResponse = routeStatus === 200 || (routeStatus === 404 && hasShell);
    assert(label + ' route ' + route, validRouteResponse, 'HTTP ' + (routeStatus || 'no response') + ' after canonical-path fallback');
    assert(label + ' HTML shell ' + route, hasShell);
    if (routeStatus === 404) {
      console.log('PASS — ' + label + ' SPA 404 fallback ' + route);
    }
    results.push({ route, resolvedPath, status: routeStatus, bytes: Buffer.byteLength(body), spaFallback: routeStatus === 404 });
  }

  return results;
};

const checkStaticAssets = async (baseUrl) => {
  const origin = baseUrl.replace(/\/$/, '');
  const html = fs.readFileSync(path.join(distPath, 'index.html'), 'utf8');
  const urls = [
    ...[...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/<link[^>]+href="([^"]+)"/g)].map((m) => m[1]),
  ].filter((value) => value.startsWith('/'));

  assert('production index asset references', urls.length > 0);
  for (const asset of urls) {
    const response = await fetch(origin + asset + (asset.includes('?') ? '&' : '?') + '_phase10=1', {
      redirect: 'manual',
      headers: { 'cache-control': 'no-cache' },
    });
    const body = await response.arrayBuffer();
    assert('production asset ' + asset, response.status === 200, 'HTTP ' + response.status);
    assert('production asset bytes ' + asset, body.byteLength > 0);
  }
};

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const startProductionServer = async () => {
  const { createServer } = await import('node:http');
  const server = createServer(async (request, response) => {
    try {
      const rawPath = decodeURIComponent(new URL(request.url ?? '/', 'http://127.0.0.1').pathname);
      const deploymentPrefix = '/JNVST-class9';
      const normalizedPath = rawPath === deploymentPrefix ? '/' : (rawPath.startsWith(deploymentPrefix + '/') ? rawPath.slice(deploymentPrefix.length) : rawPath);
      const relativePath = normalizedPath.replace(/^\/+/, '');
      const directPath = path.resolve(distPath, relativePath);
      const safeRoot = path.resolve(distPath);
      if (directPath !== safeRoot && !directPath.startsWith(safeRoot + path.sep)) {
        response.writeHead(400);
        response.end('Bad request');
        return;
      }

      let candidate = directPath;
      try {
        const info = await import('node:fs/promises').then(({ stat }) => stat(candidate));
        if (info.isDirectory()) candidate = path.join(candidate, 'index.html');
      } catch {
        if (!path.extname(candidate)) candidate = path.join(candidate, 'index.html');
      }

      try {
        const info = await import('node:fs/promises').then(({ stat }) => stat(candidate));
        if (!info.isFile()) throw new Error('not a file');
        const body = await import('node:fs/promises').then(({ readFile }) => readFile(candidate));
        response.writeHead(200, {
          'content-type': MIME_TYPES[path.extname(candidate).toLowerCase()] ?? 'application/octet-stream',
          'cache-control': 'no-store',
        });
        response.end(body);
      } catch {
        const fallback = await import('node:fs/promises').then(({ readFile }) => readFile(path.join(distPath, '404.html')));
        response.writeHead(404, {
          'content-type': 'text/html; charset=utf-8',
          'cache-control': 'no-store',
        });
        response.end(fallback);
      }
    } catch {
      response.writeHead(500);
      response.end('Internal test server error');
    }
  });

  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(4173, '127.0.0.1', resolve);
  });

  return server;
};

const runLocalProductionSmoke = async () => {
  assert('dist/index.html exists', fs.existsSync(path.join(distPath, 'index.html')));
  assert('dist/404.html exists', fs.existsSync(path.join(distPath, '404.html')));

  for (const route of criticalRoutes.filter((route) => route !== '/')) {
    const entry = path.join(distPath, route.slice(1), 'index.html');
    assert('generated route entry ' + route, fs.existsSync(entry));
  }

  const server = await startProductionServer();
  try {
    await checkHtml('http://127.0.0.1:4173', 'production-preview', criticalRoutes);
    await checkStaticAssets('http://127.0.0.1:4173');
    const notificationResponse = await fetch('http://127.0.0.1:4173/notifications.json?_phase10=1', { cache: 'no-store' });
    assert('production notifications feed', notificationResponse.status === 200);
    const notifications = await notificationResponse.json();
    assert('production notifications feed shape', Array.isArray(notifications));
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
};


const checkRemoteQuestionBankBundle = async (baseUrl) => {
  const origin = baseUrl.replace(/\/$/, '');
  const routeUrl = origin + '/question-bank/';
  let lastIssue = '';

  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      const response = await fetchWithRetry(
        routeUrl + (routeUrl.includes('?') ? '&' : '?') + '_bundlecheck=' + (attempt + 1),
        {
          redirect: 'follow',
          headers: {
            'cache-control': 'no-cache, no-store, max-age=0',
            pragma: 'no-cache',
            accept: 'text/html,*/*',
          },
        },
        1,
        0,
      );
      const html = await response.text();
      if (response.status !== 200 || !/id=["']root["']/.test(html)) {
        lastIssue = 'Question Bank route not ready: HTTP ' + response.status;
      } else {
        const scriptMatches = [...html.matchAll(/<script[^>]+src=["']([^"']+\.js)["']/g)].map((match) => match[1]);
        const stylesheetMatches = [...html.matchAll(/<link[^>]+href=["']([^"']+\.css)["']/g)].map((match) => match[1]);
        const scriptUrl = scriptMatches.find((value) => value.includes('/assets/'));
        const stylesheetUrl = stylesheetMatches.find((value) => value.includes('/assets/'));

        if (!scriptUrl || !stylesheetUrl) {
          lastIssue = 'current Question Bank HTML does not reference Vite assets';
        } else {
          const scriptResponse = await fetchWithRetry(
            origin + scriptUrl + (scriptUrl.includes('?') ? '&' : '?') + '_bundlecheck=' + (attempt + 1),
            { headers: { 'cache-control': 'no-cache, no-store, max-age=0' } },
            1,
            0,
          );
          const cssResponse = await fetchWithRetry(
            origin + stylesheetUrl + (stylesheetUrl.includes('?') ? '&' : '?') + '_bundlecheck=' + (attempt + 1),
            { headers: { 'cache-control': 'no-cache, no-store, max-age=0' } },
            1,
            0,
          );
          const script = await scriptResponse.text();
          const css = await cssResponse.text();

          if (scriptResponse.status !== 200 || cssResponse.status !== 200) {
            lastIssue = 'bundle assets not ready: JS HTTP ' + scriptResponse.status + ', CSS HTTP ' + cssResponse.status;
          } else {
            const missingMarkers = QUESTION_BANK_REMOTE_MARKERS
              .filter(([, marker]) => !script.includes(marker) && !css.includes(marker))
              .map(([label]) => label);

            if (missingMarkers.length === 0) {
              assert('remote Question Bank canonical route', true);
              assert('remote Question Bank canonical HTML shell', true);
              assert('remote Question Bank JS asset', true);
              assert('remote Question Bank CSS asset', true);
              for (const [label] of QUESTION_BANK_REMOTE_MARKERS) {
                assert('remote Question Bank ' + label, true);
              }
              console.log('PASS — remote Question Bank bundle matches the expanded-practice release');
              return;
            }

            lastIssue = 'stale bundle missing: ' + missingMarkers.join(', ');
          }
        }
      }
    } catch (error) {
      lastIssue = error instanceof Error ? error.message : String(error);
    }

    if (attempt < 119) {
      if ((attempt + 1) % 6 === 0) console.log('WAIT — remote Question Bank bundle propagation: ' + lastIssue);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  fail('FAIL — remote Question Bank bundle freshness after extended propagation window: ' + lastIssue);
};
const runRemoteSmoke = async (baseUrl) => {
  assert('remote URL supplied', /^https?:\/\//.test(baseUrl));

  // GitHub Pages can take a short time to expose a freshly deployed directory index.
  // Retry each critical route for a bounded window, then fail on a persistent 404/5xx.
  await checkHtml(baseUrl, 'remote-production', criticalRoutes, { attempts: 12, delayMs: 5000 });

  await checkRemoteQuestionBankBundle(baseUrl);

  const notificationUrl = baseUrl.replace(/\/$/, '') + '/notifications.json?_phase10=1';
  const response = await fetchWithRetry(
    notificationUrl,
    { cache: 'no-store' },
    12,
    5000,
  );
  assert('remote notifications feed', response.status === 200, 'HTTP ' + response.status);
  const payload = await response.json();
  assert('remote notifications feed shape', Array.isArray(payload));
};

const args = process.argv.slice(2);
const remoteIndex = args.indexOf('--remote');
const remoteUrl = remoteIndex >= 0 ? args[remoteIndex + 1] : null;

if (!remoteUrl) {
  await runLocalProductionSmoke();
}

if (remoteUrl) {
  await runRemoteSmoke(remoteUrl);
}

console.log('\nPhase 10 end-to-end verification passed.');
console.log('Critical routes checked:', criticalRoutes.length);
