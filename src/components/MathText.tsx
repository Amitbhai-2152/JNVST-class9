import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

type MathTextProps = {
  value: string;
  display?: boolean;
};

const MathText = ({ value, display = false }: MathTextProps) => {
  const source = value.trim();
  const html = katex.renderToString(source, {
    displayMode: display,
    throwOnError: false,
    strict: false,
    trust: false,
    output: 'htmlAndMathml',
  });

  return (
    <span
      className={display ? 'math-display' : 'math-inline'}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MathText;
