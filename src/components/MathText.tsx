import React, { type ReactNode } from 'react';

type MathTextProps = {
  value: string;
  display?: boolean;
};

const symbols: Record<string, string> = {
  times: '×',
  cdot: '·',
  div: '÷',
  pm: '±',
  mp: '∓',
  neq: '≠',
  ne: '≠',
  leq: '≤',
  le: '≤',
  geq: '≥',
  ge: '≥',
  approx: '≈',
  sim: '∼',
  propto: '∝',
  in: '∈',
  notin: '∉',
  subset: '⊂',
  subseteq: '⊆',
  supset: '⊃',
  supseteq: '⊇',
  forall: '∀',
  exists: '∃',
  therefore: '∴',
  because: '∵',
  angle: '∠',
  triangle: '△',
  parallel: '∥',
  perp: '⊥',
  pi: 'π',
  theta: 'θ',
  alpha: 'α',
  beta: 'β',
  gamma: 'γ',
  delta: 'δ',
  Delta: 'Δ',
  lambda: 'λ',
  mu: 'μ',
  sigma: 'σ',
  Sigma: 'Σ',
  phi: 'φ',
  omega: 'ω',
  Omega: 'Ω',
  infinity: '∞',
  infty: '∞',
  degree: '°',
  circ: '∘',
 rightarrow: '→',
 to: '→',
 leftarrow: '←',
 Rightarrow: '⇒',
 Leftrightarrow: '⇔',
};

const blackboard: Record<string, string> = {
  N: 'ℕ',
  Z: 'ℤ',
  Q: 'ℚ',
  R: 'ℝ',
  C: 'ℂ',
};

function readGroup(input: string, start: number): [string, number] | null {
  if (input[start] !== '{') return null;
  let depth = 0;
  for (let i = start; i < input.length; i += 1) {
    if (input[i] === '{') depth += 1;
    if (input[i] === '}') {
      depth -= 1;
      if (depth === 0) return [input.slice(start + 1, i), i + 1];
    }
  }
  return [input.slice(start + 1), input.length];
}

function nextToken(input: string, start: number): [string, number] {
  if (input[start] === '{') {
    const group = readGroup(input, start);
    if (group) return group;
  }
  return [input[start] ?? '', Math.min(input.length, start + 1)];
}

function renderMath(input: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let text = '';
  let i = 0;
  let key = 0;

  const flush = () => {
    if (text) {
      nodes.push(<span key={`t-${key++}`}>{text}</span>);
      text = '';
    }
  };

  while (i < input.length) {
    const ch = input[i];

    if (ch === '^' || ch === '_') {
      flush();
      const [token, next] = nextToken(input, i + 1);
      const Tag = ch === '^' ? 'sup' : 'sub';
      nodes.push(<Tag key={`script-${key++}`}>{renderMath(token)}</Tag>);
      i = next;
      continue;
    }

    if (ch === '{') {
      const group = readGroup(input, i);
      if (group) {
        nodes.push(<React.Fragment key={`group-${key++}`}>{renderMath(group[0])}</React.Fragment>);
        i = group[1];
        continue;
      }
    }

    if (ch === '\\') {
      const next = input[i + 1] ?? '';
      if (next === ' ' || next === ',' || next === ';' || next === '!' || next === ':') {
        const spaces: Record<string, string> = { ' ': ' ', ',': ' ', ';': ' ', '!': '', ':': ' ' };
        flush();
        nodes.push(<span key={`space-${key++}`}>{spaces[next]}</span>);
        i += 2;
        continue;
      }

      let j = i + 1;
      while (j < input.length && /[A-Za-z]/.test(input[j])) j += 1;
      const command = input.slice(i + 1, j);

      if (command === 'left' || command === 'right') {
        i = j;
        continue;
      }

      if (command === 'frac' || command === 'dfrac' || command === 'tfrac') {
        flush();
        const numerator = readGroup(input, j);
        if (numerator) {
          const denominator = readGroup(input, numerator[1]);
          if (denominator) {
            nodes.push(
              <span key={`frac-${key++}`} className="math-fraction" aria-label={`${numerator[0]} over ${denominator[0]}`}>
                <span className="math-num">{renderMath(numerator[0])}</span>
                <span className="math-den">{renderMath(denominator[0])}</span>
              </span>,
            );
            i = denominator[1];
            continue;
          }
        }
      }

      if (command === 'sqrt') {
        flush();
        const radicand = readGroup(input, j);
        if (radicand) {
          nodes.push(
            <span key={`sqrt-${key++}`} className="math-sqrt">
              <span className="math-radical">√</span><span className="math-radicand">{renderMath(radicand[0])}</span>
            </span>,
          );
          i = radicand[1];
          continue;
        }
      }

      if (command === 'mathbb' || command === 'Bbb') {
        flush();
        const arg = readGroup(input, j);
        if (arg) {
          const mapped = [...arg[0]].map((letter) => blackboard[letter] ?? letter).join('');
          nodes.push(<span key={`bb-${key++}`} className="math-blackboard">{mapped}</span>);
          i = arg[1];
          continue;
        }
      }

      if (command === 'mathrm' || command === 'mathbf' || command === 'text' || command === 'textbf' || command === 'mathcal') {
        flush();
        const arg = readGroup(input, j);
        if (arg) {
          nodes.push(<span key={`cmd-${key++}`}>{renderMath(arg[0])}</span>);
          i = arg[1];
          continue;
        }
      }

      const mapped = symbols[command];
      if (mapped) {
        flush();
        nodes.push(<span key={`sym-${key++}`}>{mapped}</span>);
        i = j;
        continue;
      }

      if (command) {
        flush();
        nodes.push(<span key={`cmd-raw-${key++}`}>{command}</span>);
        i = j;
        continue;
      }
    }

    if (ch === '~') {
      flush();
      nodes.push(<span key={`nbsp-${key++}`}> </span>);
      i += 1;
      continue;
    }

    text += ch;
    i += 1;
  }

  flush();
  return nodes;
}

const MathText = ({ value, display = false }: MathTextProps) => (
  <span className={display ? 'math-display' : 'math-inline'}>{renderMath(value.trim())}</span>
);

export default MathText;
