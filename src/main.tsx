import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

const reactRoot = createRoot(root);

const showBootError = (error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  root.innerHTML = `
    <main style="min-height:100vh;display:grid;place-items:center;padding:24px;background:#f5f7fb;color:#172033;font-family:system-ui,sans-serif">
      <section style="width:min(720px,100%);background:#fff;border:1px solid #e7eaf0;border-radius:20px;padding:28px;box-shadow:0 12px 40px rgba(16,24,40,.08)">
        <div style="font-size:38px;margin-bottom:10px">⚠️</div>
        <h1 style="margin:0 0 10px">वेबसाइट शुरू नहीं हो सकी</h1>
        <p style="color:#667085;line-height:1.6">JNVST Learning Hub का मुख्य application module लोड नहीं हो पाया।</p>
        <details style="margin-top:18px">
          <summary>तकनीकी विवरण</summary>
          <pre style="white-space:pre-wrap;overflow-wrap:anywhere;color:#667085;margin-top:10px">${message.replace(/[&<>]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c] || c))}</pre>
        </details>
        <button id="reload-app" style="margin-top:18px;border:0;border-radius:12px;padding:11px 16px;background:#3554d1;color:#fff;font-weight:700;cursor:pointer">पुनः लोड करें</button>
      </section>
    </main>`;
  document.getElementById('reload-app')?.addEventListener('click', () => window.location.reload());
  console.error('JNVST app bootstrap failed:', error);
};

reactRoot.render(
  <React.StrictMode>
    <ErrorBoundary>
      <div id="app-loading" style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24,background:'#f5f7fb',color:'#17304f',fontFamily:'system-ui,sans-serif'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:40,marginBottom:10}}>📚</div>
          <strong style={{fontSize:22}}>JNVST कक्षा 9 Learning Hub</strong>
          <p style={{color:'#64748b'}}>वेबसाइट लोड हो रही है…</p>
        </div>
      </div>
    </ErrorBoundary>
  </React.StrictMode>
);

import('./App')
  .then(({ default: App }) => {
    reactRoot.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
  })
  .catch(showBootError);
