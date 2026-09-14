import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; message: string };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'अनपेक्षित त्रुटि हुई।',
    };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error('JNVST Learning Hub runtime error:', error, info);
  }

  private reload = () => window.location.reload();

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, background: '#f5f7fb', color: '#172033' }}>
        <section style={{ width: 'min(680px, 100%)', background: '#fff', border: '1px solid #e7eaf0', borderRadius: 20, padding: 28, boxShadow: '0 12px 40px rgba(16,24,40,.08)' }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>⚠️</div>
          <h1 style={{ margin: '0 0 10px' }}>पेज लोड करते समय समस्या हुई</h1>
          <p style={{ color: '#667085', lineHeight: 1.6, marginTop: 0 }}>
            वेबसाइट बंद नहीं हुई है। पेज को दोबारा लोड करके फिर प्रयास करें।
          </p>
          <details style={{ margin: '18px 0', color: '#667085' }}>
            <summary>तकनीकी विवरण</summary>
            <pre style={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', marginTop: 10 }}>{this.state.message}</pre>
          </details>
          <button type="button" onClick={this.reload} style={{ border: 0, borderRadius: 12, padding: '11px 16px', background: '#3554d1', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
            पेज पुनः लोड करें
          </button>
        </section>
      </main>
    );
  }
}
