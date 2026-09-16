import React, { type ReactNode } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

type MathTextProps = {
  value: string;
  display?: boolean;
};

const MATH_COMMAND = /\\(?:times|cdot|div|pm|mp|neq|ne|leq|le|geq|ge|approx|sim|propto|in|notin|subset|subseteq|supset|supseteq|forall|exists|angle|triangle|parallel|perp|pi|theta|alpha|beta|gamma|delta|Delta|lambda|mu|sigma|Sigma|phi|omega|Omega|infinity|infty|degree|circ|sqrt|frac|dfrac|tfrac|mathbb|Bbb|mathrm|mathbf|text|textbf|mathcal|left|right|mid)/;

const isMathToken = (token: string) => {
  if (!token) return false;
  return /[\\^_=×÷±≤≥≠≈∈∉∠△∥⊥π∞]/.test(token) ||
    /(?:^|[^A-Za-z])[0-9]+(?:[A-Za-z]|[./]|\(|\)|\{|\}|\^|_)+/.test(token) ||
    /^[-+*/().{},\[\]]+$/.test(token) ||
    (token.includes('/') && /^[A-Za-z0-9().{}\[\]+\-*/]+$/.test(token));
};

const normalizeMathSource = (value: string) => {
  let source = value.trim();
  if (source.startsWith('$$') && source.endsWith('$$')) {
    source = source.slice(2, -2).trim();
  } else if (source.startsWith('$') && source.endsWith('$')) {
    source = source.slice(1, -1).trim();
  }

  // Gemini-exported lesson strings can contain multiple literal backslashes.
  // Normalize them so KaTeX receives standard LaTeX commands.
  source = source.replace(/\\\\+/g, '\\');
  return source;
};

const escapeHtml = (value: string) => value
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const superscript = (value: string) => {
  const map: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
    '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', 'n': 'ⁿ', 'i': 'ⁱ',
  };
  return [...value].map((ch) => map[ch] ?? ch).join('');
};

const fallbackMathHtml = (value: string) => {
  let source = normalizeMathSource(value);
  const blackboard: Record<string, string> = {
    Q: 'ℚ', Z: 'ℤ', N: 'ℕ', R: 'ℝ', C: 'ℂ', I: '𝕀',
  };

  source = source
    .replace(/\\mathbb\{([A-Za-z])\}/g, (_, ch: string) => blackboard[ch] ?? ch)
    .replace(/\\(?:mathrm|mathbf|mathcal|textbf)\{([^{}]*)\}/g, '$1')
    .replace(/\\(?:frac|dfrac|tfrac)\{([^{}]*)\}\{([^{}]*)\}/g, '($1/$2)')
    .replace(/\\sqrt\{([^{}]*)\}/g, '√($1)')
    .replace(/\\left/g, '')
    .replace(/\\right/g, '')
    .replace(/\\times|\\cdot/g, '×')
    .replace(/\\div/g, '÷')
    .replace(/\\pm/g, '±')
    .replace(/\\mp/g, '∓')
    .replace(/\\neq|\\ne/g, '≠')
    .replace(/\\leq|\\le/g, '≤')
    .replace(/\\geq|\\ge/g, '≥')
    .replace(/\\approx/g, '≈')
    .replace(/\\sim/g, '∼')
    .replace(/\\propto/g, '∝')
    .replace(/\\in/g, '∈')
    .replace(/\\notin/g, '∉')
    .replace(/\\subseteq/g, '⊆')
    .replace(/\\subset/g, '⊂')
    .replace(/\\supseteq/g, '⊇')
    .replace(/\\supset/g, '⊃')
    .replace(/\\forall/g, '∀')
    .replace(/\\exists/g, '∃')
    .replace(/\\angle/g, '∠')
    .replace(/\\triangle/g, '△')
    .replace(/\\parallel/g, '∥')
    .replace(/\\perp/g, '⊥')
    .replace(/\\pi/g, 'π')
    .replace(/\\infty|\\infinity/g, '∞')
    .replace(/\\degree|\\circ/g, '°')
    .replace(/\\mid/g, '∣')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\mu/g, 'μ')
    .replace(/\\sigma/g, 'σ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\theta/g, 'θ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\delta/g, 'δ')
    .replace(/\\phi/g, 'φ')
    .replace(/\\omega/g, 'ω')
    .replace(/\\Omega/g, 'Ω')
    .replace(/\^\{([^{}]*)\}/g, (_, exp: string) => superscript(exp))
    .replace(/\^([A-Za-z0-9+\-])/g, (_, exp: string) => superscript(exp));

  source = source.replace(/[{}]/g, '');
  source = source.replace(/\\([A-Za-z]+)/g, '$1');
  return escapeHtml(source);
};

const renderKatex = (value: string, display = false): ReactNode => {
  const source = normalizeMathSource(value);
  try {
    const html = katex.renderToString(source, {
      displayMode: display,
      throwOnError: true,
      strict: false,
      trust: false,
      output: 'htmlAndMathml',
    });
    return <span className={display ? 'math-display' : 'math-inline'} dangerouslySetInnerHTML={{ __html: html }} />;
  } catch (error) {
    console.warn('KaTeX render fallback:', error, source);
    return <span
      className={display ? 'math-display math-fallback' : 'math-inline math-fallback'}
      dangerouslySetInnerHTML={{ __html: fallbackMathHtml(source) }}
      aria-label={source}
    />;
  }
};

export const MathText = ({ value, display = false }: MathTextProps) => renderKatex(value, display);

function renderMixedSegment(text: string): ReactNode[] {
  const tokens = text.split(/(\s+)/);
  const nodes: ReactNode[] = [];
  let buffer: string[] = [];

  const flush = () => {
    if (!buffer.length) return;
    nodes.push(buffer.join(''));
    buffer = [];
  };

  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (/^\s+$/.test(token)) {
      buffer.push(token);
      i += 1;
      continue;
    }

    const singleMath = isMathToken(token) || MATH_COMMAND.test(token);
    if (!singleMath) {
      const next = tokens[i + 1] ?? '';
      const nextNext = tokens[i + 2] ?? '';
      if (/^[A-Za-z]$/.test(token) && (isMathToken(nextNext) || MATH_COMMAND.test(nextNext))) {
        flush();
        nodes.push(renderKatex(token + next + nextNext));
        i += 3;
        continue;
      }
      buffer.push(token);
      i += 1;
      continue;
    }

    let end = i + 1;
    while (end < tokens.length) {
      const t = tokens[end];
      if (/^\s+$/.test(t)) {
        const following = tokens[end + 1] ?? '';
        if (end + 1 < tokens.length && (isMathToken(following) || MATH_COMMAND.test(following))) {
          end += 1;
          continue;
        }
        break;
      }
      if (isMathToken(t) || MATH_COMMAND.test(t) || /^[A-Za-z]$/.test(t)) {
        end += 1;
        continue;
      }
      break;
    }

    const raw = tokens.slice(i, end).join('');
    if (raw.trim()) {
      flush();
      nodes.push(renderKatex(raw));
    }
    i = end;
  }

  flush();
  return nodes;
}

export const MathAwareText = ({ text }: { text: string }) => {
  const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[\s\S]*?\$|\*\*[\s\S]*?\*\*)/g);
  return <>{parts.map((part, index) => {
    if (part.startsWith('$$') && part.endsWith('$$')) {
      return <React.Fragment key={index}>{renderKatex(part.slice(2, -2), true)}</React.Fragment>;
    }
    if (part.startsWith('$') && part.endsWith('$')) {
      return <React.Fragment key={index}>{renderKatex(part.slice(1, -1))}</React.Fragment>;
    }
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={index}>{renderMixedSegment(part)}</React.Fragment>;
  })}</>;
};

export default MathText;
