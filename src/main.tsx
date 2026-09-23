import React from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthGate, AuthProvider } from './auth/Auth';
import './index.css';
import './chapter-ui.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

const BootError = ({ error }: { error: unknown }) => {
  const message = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#f5f7fb', color: '#172033' }}>
      <section style={{ width: 'min(720px, 100%)', background: '#fff', border: '1px solid #e7eaf0', borderRadius: 20, padding: 28, boxShadow: '0 12px 40px rgba(16,24,40,.08)' }}>
        <div style={{ fontSize: 36, marginBottom: 10 }}>⚠️</div>
        <h1 style={{ margin: '0 0 10px' }}>Learning Hub लोड नहीं हो पाया</h1>
        <p style={{ color: '#667085', lineHeight: 1.6, marginTop: 0 }}>
          ऐप के मुख्य JavaScript module को लोड करते समय त्रुटि हुई। पेज को एक बार फिर लोड करें।
        </p>
        <details open style={{ margin: '18px 0', color: '#667085' }}>
          <summary>तकनीकी विवरण</summary>
          <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', marginTop: 10 }}>{message}</pre>
        </details>
        <button type="button" onClick={() => window.location.reload()} style={{ border: 0, borderRadius: 12, padding: '11px 16px', background: '#3554d1', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
          पेज पुनः लोड करें
        </button>
      </section>
    </main>
  );
};

const renderApp = async () => {
  try {
    const { default: App } = await import('./App');
    createRoot(root).render(
      <React.StrictMode>
        <AuthProvider>
          <AuthGate>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </AuthGate>
        </AuthProvider>
      </React.StrictMode>,
    );
  } catch (error) {
    console.error('JNVST Learning Hub boot error:', error);
    createRoot(root).render(<BootError error={error} />);
  }
};

void renderApp();
