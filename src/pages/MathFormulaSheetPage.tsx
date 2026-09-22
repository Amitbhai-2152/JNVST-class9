import React from 'react';
import { Link } from 'react-router-dom';
import { MathText } from '../components/MathText';

type FormulaGroup = {
  title: string;
  focus: string;
  formulas: Array<{ label: string; value: string }>;
};

const groups: FormulaGroup[] = [
  {
    title: '1. परिमेय संख्याएँ',
    focus: 'परिभाषा, संक्रियाएँ और गुणधर्म',
    formulas: [
      { label: 'परिमेय संख्या', value: '\\mathbb{Q}=\\left\\{\\frac{p}{q}:p,q\\in\\mathbb{Z},q\\neq0\\right\\}' },
      { label: 'दो भिन्नों का योग', value: '\\frac{a}{b}+\\frac{c}{d}=\\frac{ad+bc}{bd}' },
      { label: 'गुणात्मक प्रतिलोम', value: '\\left(\\frac{a}{b}\\right)^{-1}=\\frac{b}{a},\\quad a\\neq0' },
    ],
  },
  {
    title: '2. वर्ग और वर्गमूल',
    focus: 'पूर्ण वर्ग, वर्गमूल और त्रिक',
    formulas: [
      { label: 'वर्ग', value: 'a^2=a\\times a' },
      { label: 'वर्गमूल संबंध', value: '\\sqrt{a^2}=|a|' },
      { label: 'पाइथागोरस संबंध', value: 'a^2+b^2=c^2' },
    ],
  },
  {
    title: '3. घन और घनमूल',
    focus: 'पूर्ण घन और घनमूल',
    formulas: [
      { label: 'घन', value: 'a^3=a\\times a\\times a' },
      { label: 'घनमूल', value: '\\sqrt[3]{a^3}=a' },
      { label: 'घन के आयतन का संबंध', value: 'V=a^3' },
    ],
  },
  {
    title: '4. घातांक और घात',
    focus: 'घातों के नियम और मानक रूप',
    formulas: [
      { label: 'गुणा', value: 'a^m\\times a^n=a^{m+n}' },
      { label: 'भाग', value: '\\frac{a^m}{a^n}=a^{m-n},\\quad a\\neq0' },
      { label: 'घात की घात', value: '(a^m)^n=a^{mn}' },
      { label: 'ऋणात्मक घात', value: 'a^{-m}=\\frac{1}{a^m}' },
      { label: 'शून्य घात', value: 'a^0=1,\\quad a\\neq0' },
    ],
  },
  {
    title: '5. प्रत्यक्ष और प्रतिलोम समानुपात',
    focus: 'राशियों के बीच स्थिर संबंध',
    formulas: [
      { label: 'प्रत्यक्ष', value: 'y=kx' },
      { label: 'प्रतिलोम', value: 'xy=k' },
    ],
  },
  {
    title: '6. राशियों की तुलना',
    focus: 'प्रतिशत, लाभ-हानि, छूट और ब्याज',
    formulas: [
      { label: 'प्रतिशत', value: 'P=\\frac{a}{t}\\times100' },
      { label: 'लाभ', value: 'L=SP-CP' },
      { label: 'लाभ प्रतिशत', value: 'LP=\\frac{L}{CP}\\times100' },
      { label: 'हानि प्रतिशत', value: 'HP=\\frac{H}{CP}\\times100' },
      { label: 'छूट प्रतिशत', value: 'DP=\\frac{D}{MP}\\times100' },
      { label: 'साधारण ब्याज', value: 'SI=\\frac{P\\times R\\times T}{100}' },
      { label: 'चक्रवृद्धि राशि', value: 'A=P\\left(1+\\frac{R}{100}\\right)^n' },
    ],
  },
  {
    title: '7. बीजीय व्यंजक, सर्वसमिकाएँ और गुणनखंडन',
    focus: 'सरलीकरण, विस्तार और गुणनखंडन',
    formulas: [
      { label: 'पहली सर्वसमिका', value: '(a+b)^2=a^2+2ab+b^2' },
      { label: 'दूसरी सर्वसमिका', value: '(a-b)^2=a^2-2ab+b^2' },
      { label: 'वर्गों का अंतर', value: 'a^2-b^2=(a-b)(a+b)' },
      { label: 'द्विपद गुणन', value: '(x+a)(x+b)=x^2+(a+b)x+ab' },
    ],
  },
  {
    title: '8. एक चर वाले रैखिक समीकरण',
    focus: 'समीकरण, भिन्न और शब्द-समस्याएँ',
    formulas: [
      { label: 'मूल रूप', value: 'ax+b=c\\Rightarrow x=\\frac{c-b}{a},\\quad a\\neq0' },
      { label: 'परिमाप आधारित आयत', value: 'P=2(l+b)' },
    ],
  },
  {
    title: '9. चतुर्भुज',
    focus: 'गुण, कोण और विकर्ण',
    formulas: [
      { label: 'चतुर्भुज के कोणों का योग', value: '\\angle A+\\angle B+\\angle C+\\angle D=360^\\circ' },
      { label: 'समांतर चतुर्भुज', value: 'A+B=180^\\circ' },
      { label: 'समांतर चतुर्भुज का क्षेत्रफल', value: 'A=bh' },
      { label: 'समचतुर्भुज का क्षेत्रफल', value: 'A=\\frac{1}{2}d_1d_2' },
    ],
  },
  {
    title: '10. क्षेत्रमिति',
    focus: 'क्षेत्रफल, पृष्ठीय क्षेत्रफल और आयतन',
    formulas: [
      { label: 'आयत', value: 'A=lb,\\quad P=2(l+b)' },
      { label: 'वर्ग', value: 'A=a^2,\\quad P=4a' },
      { label: 'त्रिभुज', value: 'A=\\frac{1}{2}bh' },
      { label: 'समलंब', value: 'A=\\frac{1}{2}(a+b)h' },
      { label: 'घनाभ आयतन', value: 'V=lbh' },
      { label: 'घनाभ सम्पूर्ण पृष्ठ', value: 'TSA=2(lb+bh+hl)' },
      { label: 'घन', value: 'V=a^3,\\quad TSA=6a^2' },
      { label: 'बेलन', value: 'V=\\pi r^2h,\\quad CSA=2\\pi rh' },
    ],
  },
  {
    title: '11. आँकड़ों का प्रबंधन और प्रायिकता',
    focus: 'तालिका, बार ग्राफ, वृत्त आलेख और सरल प्रायिकता',
    formulas: [
      { label: 'माध्य', value: '\\bar{x}=\\frac{\\Sigma x}{n}' },
      { label: 'वृत्त आलेख से मान', value: 'A=\\frac{\\theta}{360^\\circ}\\times T' },
      { label: 'प्रायिकता', value: 'P(E)=\\frac{n(E)}{n(S)}' },
      { label: 'पूरक घटना', value: 'P(E^{\\prime})=1-P(E)' },
    ],
  },
];

const examChecklist = [
  'सूत्र लगाने से पहले यह पहचानें कि प्रश्न क्षेत्रफल, परिमाप, पृष्ठीय क्षेत्रफल या आयतन में से क्या पूछ रहा है।',
  'प्रतिशत वाले प्रश्न में आधार राशि पहले तय करें: CP, SP या MP।',
  'समीकरण में दोनों पक्षों पर समान क्रिया करें और अंतिम उत्तर को मूल प्रश्न में रखकर जाँचें।',
  'आँकड़ों और ग्राफ में पैमाना, इकाई और कुल मान पढ़े बिना गणना न करें।',
  'JNVST में समय सीमित है: आसान प्रश्न पहले, लंबे calculation वाले प्रश्न बाद में।',
];

const MathFormulaSheet = () => (
  <div className="math-formula-page">
    <div className="page-head">
      <Link to="/subjects/sub_math">← गणित पर वापस</Link>
      <h1>गणित सूत्र-पत्र</h1>
      <p>JNVST कक्षा 9 गणित की मुख्य इकाइयों के सूत्र, उपयोग और परीक्षा-जाँच एक जगह।</p>
    </div>

    <section className="hero">
      <div>
        <span className="eyebrow">JNVST MATHEMATICS</span>
        <h2>तेज़ पुनरावृत्ति के लिए सूत्र-पत्र</h2>
        <p>सूत्र याद करने के साथ यह भी समझें कि उन्हें कब लगाना है। यही calculation की गति और accuracy दोनों बढ़ाता है।</p>
      </div>
      <div className="hero-stat"><b>11</b><span>मुख्य इकाइयाँ</span><small>गणित: 35 प्रश्न</small></div>
    </section>

    <div className="grid">
      {groups.map((group) => (
        <section className="card" key={group.title}>
          <h2>{group.title}</h2>
          <p>{group.focus}</p>
          <div className="lesson-content">
            {group.formulas.map((formula) => (
              <div key={formula.label} style={{ marginBottom: 18 }}>
                <strong>{formula.label}</strong>
                <div className="formula-block" style={{ marginTop: 8 }}>
                  <MathText value={`$$${formula.value}$$`} display />
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>

    <section className="card">
      <h2>परीक्षा से पहले 5 जाँच</h2>
      <ol>
        {examChecklist.map((item) => <li key={item}>{item}</li>)}
      </ol>
    </section>
  </main>
);

export default MathFormulaSheet;
