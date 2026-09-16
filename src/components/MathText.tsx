import React, { type ReactNode } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

type MathTextProps = {
  value: string;
  display?: boolean;
};

const MATH_COMMAND = /\\(?:times|cdot|div|pm|mp|neq|ne|leq|le|geq|ge|approx|sim|propto|in|notin|subset|subseteq|supset|supseteq|forall|exists|angle|triangle|parallel|perp|pi|theta|alpha|beta|gamma|delta|Delta|lambda|mu|sigma|Sigma|phi|omega|Omega|infinity|infty|degree|circ|sqrt|frac|dfrac|tfrac|mathbb|Bbb|mathrm|mathbf|text|textbf|mathcal|left|right)/;

const isMathToken = (token: string) => {
  if (!token) return false;
  return /[\\^_=×÷±≤≥≠≈∈∉∠△∥⊥π∞]/.test(token) ||
    /(?:^|[^A-Za-z])[0-9]+(?:[A-Za-z]|[./]|\(|\)|\{|\}|\^|_)+/.test(token) ||
    /^[-+*/().{},\[\]]+$/.test(token) ||
    (token.includes('/') && /^[A-Za-z0-9().{}\[\]+\-*/]+$/.test(token));
};

const renderKatex = (value: string, display = false): ReactNode => {
  const source = value.trim();
  const html = katex.renderToString(source, {
    displayMode: display,
    throwOnError: false,
    strict: false,
    trust: false,
    output: 'htmlAndMathml',
  });
  return <span className={display ? 'math-display' : 'math-inline'} dangerouslySetInnerHTML={{ __html: html }} />;
};

export const MathText = ({ value, display = false }: MathTextProps) => renderKatex(value, display);

function renderMixedSegment(text: string): ReactNode[] {
  const tokens = text.split(/(\s+)/);
  const nodes: ReactNode[] = [];
  let buffer: string[] = [];

  const flush = () => {
    if (!buffer.length) return;
    const raw = buffer.join('');
    nodes.push(raw);
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
