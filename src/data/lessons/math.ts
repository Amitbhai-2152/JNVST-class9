import type { ContentBlock, Lesson } from '../../types';
import { mathMasteryUnitMap } from '../mathMastery';

const c = (blocks: ContentBlock[]): ContentBlock[] => blocks;



const addJnvstMastery = (topicId: string, content: ContentBlock[]): ContentBlock[] => {
  const unit = mathMasteryUnitMap.get(topicId);
  if (!unit) return content;

  return [
    ...content,
    { type: 'heading', level: 2, text: 'JNVST Mastery Check — ' + unit.title },
    { type: 'paragraph', text: 'इस section को lesson के अंत में checklist की तरह इस्तेमाल करें। यदि नीचे के सभी बिंदु बिना सहायता के समझ में आ रहे हैं, तो topic practice पर जाएँ।' },
    { type: 'heading', level: 3, text: 'Core skills' },
    { type: 'list', style: 'bullet', items: unit.coreSkills },
    { type: 'heading', level: 3, text: 'Must Know' },
    { type: 'list', style: 'bullet', items: unit.mustKnow },
    { type: 'heading', level: 3, text: 'मुख्य सूत्र एक नज़र में' },
    ...unit.formulaFacts.map((expression): ContentBlock => ({ type: 'formula', expression })),
    { type: 'heading', level: 3, text: 'Exam Traps' },
    { type: 'list', style: 'bullet', items: unit.examTraps },
    { type: 'callout', style: 'important', title: 'Topic Complete?', text: 'पहले concept → फिर formula recall → फिर बिना देखे 5 प्रश्न → फिर गलत प्रश्न की explanation पढ़ें।' },
  ];
};

const mathLessonContent: Record<string, ContentBlock[]> = {
  top_math_01_01: c([
    { type: 'heading', level: 2, text: 'परिमेय संख्या क्या है?' },
    { type: 'paragraph', text: 'जिस संख्या को $p/q$ के रूप में लिखा जा सके, जहाँ $p$ और $q$ पूर्णांक हों तथा $q\\neq0$ हो, वह परिमेय संख्या कहलाती है। उदाहरण: $3/5$, $-7/4$, $0=0/1$।' },
    { type: 'formula', expression: '$$\\mathbb{Q}=\\left\\{\\frac{p}{q}:p,q\\in\\mathbb{Z},\\ q\\neq0\\right\\}$$' },
    { type: 'heading', level: 3, text: 'परिमेय संख्याओं का मानक रूप' },
    { type: 'paragraph', text: 'किसी भिन्न को मानक रूप में लिखते समय अंश और हर का महत्तम समापवर्तक 1 होना चाहिए और ऋणात्मक चिह्न सामान्यतः अंश में रखा जाता है। जैसे $-12/18=-2/3$।' },
    { type: 'heading', level: 3, text: 'मुख्य गुणधर्म' },
    { type: 'table', headers: ['गुणधर्म', 'योग', 'घटाव', 'गुणन', 'भाग'], rows: [
      ['संवृत', 'हाँ', 'हाँ', 'हाँ', 'हर गैर-शून्य भाजक के लिए'],
      ['क्रमविनिमेय', 'हाँ', 'नहीं', 'हाँ', 'नहीं'],
      ['साहचर्य', 'हाँ', 'नहीं', 'हाँ', 'नहीं']
    ] },
    { type: 'paragraph', text: 'योज्य प्रतिलोम वह संख्या है जिसे जोड़ने पर 0 मिले। $a$ का योज्य प्रतिलोम $-a$ है। गैर-शून्य $a/b$ का गुणात्मक प्रतिलोम $b/a$ है। 0 का गुणात्मक प्रतिलोम नहीं होता।' },
    { type: 'heading', level: 3, text: 'दो परिमेय संख्याओं के बीच संख्या' },
    { type: 'paragraph', text: 'किसी भी दो भिन्न परिमेय संख्याओं के बीच अनंत परिमेय संख्याएँ होती हैं। एक आसान तरीका है दोनों का औसत लेना: यदि $a<b$, तो $(a+b)/2$ भी उनके बीच होगा।' },
    { type: 'heading', level: 3, text: 'हल किया हुआ उदाहरण' },
    { type: 'step-by-step', steps: ['हल करें: $-3/4+5/6$।', '12 को समान हर लें: $-3/4=-9/12$ और $5/6=10/12$।', 'अब जोड़ें: $-9/12+10/12=1/12$।', 'अंतिम उत्तर को सरलतम रूप में रखें: $1/12$।'] },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'घटाव और भाग को क्रमविनिमेय या साहचर्य मानना गलत है। इसी प्रकार 0 का गुणात्मक प्रतिलोम निकालने का प्रयास नहीं करना चाहिए।' },
    { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'परिमेय संख्या के प्रश्न में पहले चिह्न, फिर हरों का LCM, फिर सरलीकरण जाँचें।' },
    { type: 'callout', style: 'info', title: 'त्वरित जाँच', text: 'क्या $-5/7$ का गुणात्मक प्रतिलोम $7/5$ है? नहीं। सही प्रतिलोम $-7/5$ है।' }
  ]),

  top_math_01_02: c([
    { type: 'heading', level: 2, text: 'वर्ग और वर्गमूल' },
    { type: 'paragraph', text: 'किसी संख्या को उसी से गुणा करने पर प्राप्त परिणाम उसका वर्ग कहलाता है: $12^2=144$। यदि $a^2=N$, तो $a$ को $N$ का वर्गमूल कहते हैं।' },
    { type: 'heading', level: 3, text: 'पूर्ण वर्ग पहचानने की युक्तियाँ' },
    { type: 'list', style: 'bullet', items: ['पूर्ण वर्ग का इकाई अंक केवल 0, 1, 4, 5, 6 या 9 हो सकता है।', 'किसी पूर्ण वर्ग में अभाज्य गुणनखंडों की सभी घातें सम होती हैं।', 'यदि किसी संख्या के अंत में शून्य हों, तो पूर्ण वर्ग में शून्यों की संख्या सम होनी चाहिए।'] },
    { type: 'heading', level: 3, text: 'अभाज्य गुणनखंड विधि' },
    { type: 'step-by-step', steps: ['144 का गुणनखंड करें: $144=2^4\\times3^2$।', 'समान गुणनखंडों के जोड़े बनाएँ: $(2\\times2)(2\\times2)(3\\times3)$।', 'हर जोड़े से एक गुणनखंड बाहर लें: $2\\times2\\times3=12$।', 'अतः $\\sqrt{144}=12$।'] },
    { type: 'heading', level: 3, text: 'अपूर्ण वर्गों के लिए अनुमान' },
    { type: 'paragraph', text: 'यदि संख्या दो क्रमिक पूर्ण वर्गों के बीच है, तो उसका वर्गमूल भी उन दोनों मूल संख्याओं के बीच होगा। जैसे 50, 49 और 64 के बीच है, इसलिए $\\sqrt{50}$, 7 और 8 के बीच होगा।' },
    { type: 'heading', level: 3, text: 'पाइथागोरस त्रिक' },
    { type: 'paragraph', text: 'ऐसी तीन धनात्मक पूर्ण संख्याएँ जिनके लिए $a^2+b^2=c^2$ हो, पाइथागोरस त्रिक कहलाती हैं। उदाहरण: 6, 8, 10 क्योंकि $36+64=100$।' },
    { type: 'heading', level: 3, text: 'हल किया हुआ उदाहरण' },
    { type: 'step-by-step', steps: ['252 का गुणनखंड करें: $252=2^2\\times3^2\\times7$।', '2 और 3 की घातें जोड़ी बना रही हैं, लेकिन 7 अकेला है।', 'पूर्ण वर्ग बनाने के लिए 7 से गुणा करें।', 'प्राप्त संख्या $252\\times7=1764=42^2$ होगी।'] },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: '$\\sqrt{a+b}$ को $\\sqrt a+\\sqrt b$ मान लेना सामान्यतः गलत है। वर्गमूल का नियम जोड़ पर इस तरह लागू नहीं होता।' },
    { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'वर्गमूल प्रश्न में पहले पूर्ण वर्ग जाँचें, फिर गुणनखंड विधि अपनाएँ और अंत में अपने उत्तर का वर्ग करके पुष्टि करें।' }
  ]),

  top_math_01_03: c([
    { type: 'heading', level: 2, text: 'घन और घनमूल' },
    { type: 'paragraph', text: 'किसी संख्या का तीन बार गुणन उसका घन है: $a^3=a\\times a\\times a$। जिस संख्या का घन दी गई संख्या हो, वह उसका घनमूल है।' },
    { type: 'table', headers: ['संख्या', 'घन'], rows: [['1', '1'], ['2', '8'], ['3', '27'], ['4', '64'], ['5', '125'], ['6', '216'], ['7', '343'], ['8', '512'], ['9', '729'], ['10', '1000']] },
    { type: 'heading', level: 3, text: 'अभाज्य गुणनखंड विधि' },
    { type: 'step-by-step', steps: ['216 का गुणनखंड करें: $216=2^3\\times3^3$।', 'घनमूल के लिए समान गुणनखंडों के तीन-तीन के समूह बनाएँ।', 'हर समूह से एक गुणनखंड बाहर लें: $2\\times3$।', 'अतः $\\sqrt[3]{216}=6$।'] },
    { type: 'heading', level: 3, text: 'ऋणात्मक संख्या का घनमूल' },
    { type: 'paragraph', text: 'ऋणात्मक संख्या का घनमूल ऋणात्मक ही होता है। जैसे $(-4)^3=-64$, इसलिए $\\sqrt[3]{-64}=-4$। यह वर्गमूल से एक महत्वपूर्ण अंतर है।' },
    { type: 'heading', level: 3, text: 'दशमलव उदाहरण' },
    { type: 'step-by-step', steps: ['$0.000216$ को $216/1000000$ लिखें।', '$\\sqrt[3]{216}=6$ और $\\sqrt[3]{1000000}=100$।', 'इसलिए $\\sqrt[3]{0.000216}=6/100=0.06$।'] },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'घनमूल के अभाज्य गुणनखंडों में दो-दो के समूह नहीं, तीन-तीन के समूह बनाए जाते हैं।' },
    { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'घन का अंतिम अंक और छोटे पूर्ण घनों की सूची मानसिक गणना को बहुत तेज कर सकती है।' }
  ]),

  top_math_01_04: c([
    { type: 'heading', level: 2, text: 'घातांक और घात' },
    { type: 'paragraph', text: 'घात किसी संख्या के बार-बार गुणन को संक्षेप में लिखने का तरीका है। $a^n$ में $a$ आधार और $n$ घात है।' },
    { type: 'heading', level: 3, text: 'घातों के मूल नियम' },
    { type: 'formula', expression: '$$a^m\\times a^n=a^{m+n}$$' },
    { type: 'formula', expression: '$$\\frac{a^m}{a^n}=a^{m-n},\\quad a\\neq0$$' },
    { type: 'formula', expression: '$$(a^m)^n=a^{mn}$$' },
    { type: 'formula', expression: '$$(ab)^m=a^m b^m$$' },
    { type: 'formula', expression: '$$a^0=1,\\quad a^{-m}=\\frac{1}{a^m}$$' },
    { type: 'heading', level: 3, text: 'मानक रूप' },
    { type: 'paragraph', text: 'बहुत बड़ी या बहुत छोटी संख्याओं को $a\\times10^n$ के रूप में लिखा जा सकता है, जहाँ $1\\le a<10$ हो। उदाहरण: $0.00000837=8.37\\times10^{-6}$।' },
    { type: 'heading', level: 3, text: 'हल किया हुआ उदाहरण' },
    { type: 'step-by-step', steps: ['सरल करें: $(3^{-2}\\times3^5)\\div3^2$।', 'समान आधार होने से घातें जोड़ें: $3^{-2+5}=3^3$।', 'अब भाग का नियम: $3^3/3^2=3^1$।', 'उत्तर: $3$।'] },
    { type: 'heading', level: 3, text: 'आधार समान बनाने की रणनीति' },
    { type: 'paragraph', text: '25 को $5^2$ और 125 को $5^3$ लिखने पर कठिन प्रश्न भी सरल हो जाते हैं। यदि आधार समान हो जाएँ तो घातों की तुलना की जा सकती है।' },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: '$(a+b)^2$ में घात का नियम लागू नहीं होता। घातों के नियम समान आधार वाली गुणा-भाग जैसी संरचनाओं पर लागू होते हैं।' },
    { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'पहले आधारों को समान बनाइए, फिर घातों का नियम लगाइए। शून्य और ऋणात्मक घात को अलग से जाँचिए।' }
  ]),

  top_math_02_01: c([
    { type: 'heading', level: 2, text: 'प्रत्यक्ष और प्रतिलोम समानुपात' },
    { type: 'paragraph', text: 'जब एक राशि में जितने अनुपात में परिवर्तन होता है, दूसरी राशि भी उसी अनुपात में उसी दिशा में बदलती है, तो प्रत्यक्ष समानुपात होता है। जब एक बढ़ती है और दूसरी उसी अनुपात में घटती है, तो प्रतिलोम समानुपात होता है।' },
    { type: 'formula', expression: '$$y=kx$$' },
    { type: 'formula', expression: '$$xy=k$$' },
    { type: 'heading', level: 3, text: 'पहचान कैसे करें?' },
    { type: 'table', headers: ['स्थिति', 'प्रकार', 'मुख्य जाँच'], rows: [
      ['अधिक वस्तुएँ ⇒ अधिक कुल कीमत', 'प्रत्यक्ष', 'कीमत/वस्तु स्थिर'],
      ['अधिक मजदूर ⇒ कम दिन', 'प्रतिलोम', 'मजदूर × दिन स्थिर'],
      ['अधिक दूरी प्रति समान समय ⇒ अधिक गति', 'प्रत्यक्ष', 'अनुपात समान']
    ] },
    { type: 'heading', level: 3, text: 'हल किया हुआ उदाहरण' },
    { type: 'step-by-step', steps: ['15 मीटर कपड़े की कीमत ₹1200 है। 25 मीटर की कीमत x मानें।', 'यह प्रत्यक्ष समानुपात है: $15/1200=25/x$।', 'क्रॉस-गुणन: $15x=30000$।', 'अतः $x=2000$ रुपये।'] },
    { type: 'heading', level: 3, text: 'प्रतिलोम समानुपात का उदाहरण' },
    { type: 'step-by-step', steps: ['20 मजदूर काम को 15 दिन में करते हैं। 12 दिन में वही काम करने के लिए x मजदूर चाहिए।', '$20\\times15=x\\times12$।', '$x=300/12=25$।', 'अतः 25 मजदूर आवश्यक होंगे।'] },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'सिर्फ यह देखकर direct या inverse तय न करें कि कोई संख्या बड़ी है। वास्तविक संबंध देखें: एक बढ़ने पर दूसरी बढ़ती है या घटती है?' },
    { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'उत्तर निकालने से पहले दिशा का अनुमान लगाएँ। इससे गलत अनुपात लगाने की गलती जल्दी पकड़ी जाती है।' }
  ]),

  top_math_02_02: c([
    { type: 'heading', level: 2, text: 'राशियों की तुलना' },
    { type: 'paragraph', text: 'इस इकाई में प्रतिशत, लाभ-हानि, छूट, साधारण ब्याज और चक्रवृद्धि ब्याज जैसे प्रश्न आते हैं। हर प्रश्न में सबसे पहले आधार राशि पहचानना आवश्यक है।' },
    { type: 'heading', level: 3, text: 'प्रतिशत' },
    { type: 'formula', expression: '$$P=\\frac{a}{t}\\times100$$' },
    { type: 'heading', level: 3, text: 'लाभ, हानि और छूट' },
    { type: 'formula', expression: '$$L=SP-CP,\\quad LP=\\frac{L}{CP}\\times100$$' },
    { type: 'formula', expression: '$$H=CP-SP,\\quad HP=\\frac{H}{CP}\\times100$$' },
    { type: 'formula', expression: '$$D=MP-SP,\\quad DP=\\frac{D}{MP}\\times100$$' },
    { type: 'paragraph', text: 'यहाँ CP = क्रय मूल्य, SP = विक्रय मूल्य और MP = अंकित मूल्य है। लाभ/हानि प्रतिशत का आधार सामान्यतः CP होता है, जबकि छूट प्रतिशत का आधार MP होता है।' },
    { type: 'heading', level: 3, text: 'साधारण ब्याज' },
    { type: 'formula', expression: '$$SI=\\frac{P\\times R\\times T}{100},\\quad A=P+SI$$' },
    { type: 'heading', level: 3, text: 'चक्रवृद्धि ब्याज' },
    { type: 'formula', expression: '$$A=P\\left(1+\\frac{R}{100}\\right)^n,\\quad CI=A-P$$' },
    { type: 'heading', level: 3, text: 'हल किया हुआ उदाहरण' },
    { type: 'step-by-step', steps: ['CP = ₹1000 और लाभ 15% है।', 'लाभ = $15/100\\times1000=₹150$।', 'SP = $1000+150=₹1150$।', 'यदि इसी वस्तु पर 10% छूट हो और MP ₹1200 हो, तो SP = ₹1080 होगा।'] },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'लाभ प्रतिशत को MP से या छूट प्रतिशत को CP से निकालना गलत आधार चुनना है।' },
    { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'प्रश्न के आरंभ में CP, SP, MP, P, R, T लिख लें। इससे अधिकांश आधार-सम्बन्धी गलतियाँ रुक जाती हैं।' }
  ]),

  top_math_03_01: c([
    { type: 'heading', level: 2, text: 'बीजीय व्यंजक की रचना' },
    { type: 'paragraph', text: 'बीजीय व्यंजक में संख्याएँ, चर और पद होते हैं। $3x+5y-2$ में 3x, 5y और -2 अलग-अलग पद हैं। समान चर और समान घात वाले पद सजातीय पद कहलाते हैं।' },
    { type: 'heading', level: 3, text: 'सजातीय पद' },
    { type: 'paragraph', text: '$3x$ और $-5x$ सजातीय हैं, लेकिन $3x$ और $3x^2$ सजातीय नहीं हैं। केवल सजातीय पदों को सीधे जोड़-घटा सकते हैं।' },
    { type: 'heading', level: 3, text: 'मुख्य सर्वसमिकाएँ' },
    { type: 'formula', expression: '$$(a+b)^2=a^2+2ab+b^2$$' },
    { type: 'formula', expression: '$$(a-b)^2=a^2-2ab+b^2$$' },
    { type: 'formula', expression: '$$(a+b)(a-b)=a^2-b^2$$' },
    { type: 'formula', expression: '$$(x+a)(x+b)=x^2+(a+b)x+ab$$' },
    { type: 'heading', level: 3, text: 'सर्वसमिकाओं से मान निकालना' },
    { type: 'step-by-step', steps: ['$102\\times103$ को $(100+2)(100+3)$ लिखें।', 'अब विस्तार करें: $100^2+5\\times100+6$।', 'मिलता है: $10000+500+6=10506$।', 'इस प्रकार लंबा गुणन किए बिना उत्तर प्राप्त हो जाता है।'] },
    { type: 'heading', level: 3, text: 'गुणनखंडन का संबंध' },
    { type: 'paragraph', text: 'गुणनखंडन में व्यंजक को ऐसे गुणनफल में लिखा जाता है जिसे वापस गुणा करने पर वही व्यंजक मिले। उदाहरण: $x^2-25=(x-5)(x+5)$।' },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: '$(a+b)^2=a^2+b^2$ नहीं है। बीच का पद $2ab$ अनिवार्य है।' },
    { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'पहले देखें कि सवाल विस्तार माँग रहा है या गुणनखंडन। सही identity चुनना ही आधा समाधान है।' }
  ]),

  top_math_03_02: c([
    { type: 'heading', level: 2, text: 'एक चर वाले रैखिक समीकरण' },
    { type: 'paragraph', text: 'जिस समीकरण में चर की अधिकतम घात 1 हो, वह एक चर वाला रैखिक समीकरण है। उदाहरण: $3x+5=20$।' },
    { type: 'heading', level: 3, text: 'संतुलन का सिद्धांत' },
    { type: 'paragraph', text: 'समीकरण को तराजू की तरह समझें। एक पक्ष पर जो क्रिया करें, वही दूसरे पक्ष पर भी करनी चाहिए। इसी कारण केवल सुविधा के लिए “पक्षांतरण” की जगह समान क्रिया करना अधिक सुरक्षित तरीका है।' },
    { type: 'heading', level: 3, text: 'भिन्न वाले समीकरण' },
    { type: 'step-by-step', steps: ['यदि $x/3+2=5$, तो 2 घटाएँ: $x/3=3$।', 'दोनों पक्षों को 3 से गुणा करें।', 'अतः $x=9$।', 'उत्तर मूल समीकरण में रखकर जाँचें।'] },
    { type: 'heading', level: 3, text: 'कोष्ठक वाला समीकरण' },
    { type: 'step-by-step', steps: ['$3(x-2)=12$।', 'वितरण से $3x-6=12$।', 'दोनों पक्षों में 6 जोड़ें: $3x=18$।', '3 से भाग दें: $x=6$।'] },
    { type: 'heading', level: 3, text: 'शाब्दिक प्रश्नों की रणनीति' },
    { type: 'list', style: 'number', items: ['अज्ञात राशि को x मानें।', 'प्रश्न की भाषा को गणितीय संबंध में बदलें।', 'समीकरण बनाएँ।', 'हल करें।', 'उत्तर को वास्तविक संदर्भ में जाँचें।'] },
    { type: 'heading', level: 3, text: 'हल किया हुआ उदाहरण' },
    { type: 'step-by-step', steps: ['एक आयत की चौड़ाई 3 सेमी है और परिमाप 18 सेमी है। लंबाई x मानें।', '$2(x+3)=18$।', '$x+3=9$।', '$x=6$ सेमी।'] },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'कोष्ठक खोलते समय ऋणात्मक चिह्न भूलना और किसी पद को दूसरी ओर ले जाकर चिह्न बदलना याद न रखना सबसे आम त्रुटियाँ हैं।' },
    { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'अंतिम उत्तर को मूल समीकरण में रखने की छोटी जाँच विशेषकर शब्द-समस्याओं में बहुत उपयोगी है।' }
  ]),

  top_math_04_01: c([
    { type: 'heading', level: 2, text: 'चतुर्भुज और उनके गुण' },
    { type: 'paragraph', text: 'चार भुजाओं वाली बंद समतल आकृति चतुर्भुज कहलाती है। उसके आंतरिक कोणों का योग $360^\\circ$ होता है।' },
    { type: 'table', headers: ['आकृति', 'मुख्य गुण'], rows: [
      ['समांतर चतुर्भुज', 'दोनों जोड़ी सम्मुख भुजाएँ समानांतर और बराबर; सम्मुख कोण बराबर'],
      ['आयत', 'चारों कोण 90°; सम्मुख भुजाएँ बराबर'],
      ['वर्ग', 'चारों भुजाएँ बराबर और चारों कोण 90°'],
      ['समचतुर्भुज', 'चारों भुजाएँ बराबर; विकर्ण परस्पर लंब होते हैं'],
      ['पतंग', 'दो जोड़ी आसन्न भुजाएँ बराबर']
    ] },
    { type: 'heading', level: 3, text: 'समांतर चतुर्भुज के विशेष गुण' },
    { type: 'list', style: 'bullet', items: ['सम्मुख भुजाएँ बराबर होती हैं।', 'सम्मुख कोण बराबर होते हैं।', 'आसन्न कोणों का योग 180° होता है।', 'विकर्ण एक-दूसरे को समद्विभाजित करते हैं।'] },
    { type: 'heading', level: 3, text: 'वर्ग, आयत और समचतुर्भुज का संबंध' },
    { type: 'paragraph', text: 'हर वर्ग एक आयत भी है क्योंकि उसके चारों कोण 90° हैं, और हर वर्ग एक समचतुर्भुज भी है क्योंकि उसकी चारों भुजाएँ बराबर हैं। लेकिन हर आयत वर्ग नहीं होता और हर समचतुर्भुज वर्ग नहीं होता।' },
    { type: 'heading', level: 3, text: 'हल किया हुआ उदाहरण' },
    { type: 'step-by-step', steps: ['किसी चतुर्भुज के कोण $3x,4x,5x,6x$ हैं।', 'कोणों का योग 360° है: $18x=360$।', '$x=20$°।', 'कोण 60°, 80°, 100° और 120° होंगे।'] },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'हर समांतर चतुर्भुज के सभी कोण 90° नहीं होते। 90° वाला समांतर चतुर्भुज विशेष स्थिति में आयत कहलाता है।' },
    { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'Properties आधारित प्रश्न में आकृति का नाम नहीं, उसके दिए हुए गुण पढ़ें और फिर पहचान करें।' }
  ]),

  top_math_04_02: c([
    { type: 'heading', level: 2, text: 'क्षेत्रमिति: समतल आकृतियाँ और ठोस आकृतियाँ' },
    { type: 'paragraph', text: 'क्षेत्रमिति में परिमाप, क्षेत्रफल, पृष्ठीय क्षेत्रफल और आयतन की गणना की जाती है। सबसे पहले यह तय करें कि प्रश्न लंबाई, क्षेत्रफल या आयतन माँग रहा है।' },
    { type: 'heading', level: 3, text: 'समतल आकृतियों के सूत्र' },
    { type: 'formula', expression: '$A=lb,\\quad P=2(l+b)$' },
    { type: 'formula', expression: '$A=a^2,\\quad P=4a$' },
    { type: 'formula', expression: '$A=\\frac12bh$' },
    { type: 'formula', expression: '$A=bh$' },
    { type: 'formula', expression: '$A=\\frac12d_1d_2$' },
    { type: 'heading', level: 3, text: 'घन और घनाभ' },
    { type: 'formula', expression: '$V=lbh$' },
    { type: 'formula', expression: '$TSA=2(lb+bh+hl)$' },
    { type: 'formula', expression: '$V=a^3,\\quad TSA=6a^2$' },
    { type: 'heading', level: 3, text: 'बेलन' },
    { type: 'formula', expression: '$V=\\pi r^2h,\\quad CSA=2\\pi rh$' },
    { type: 'heading', level: 3, text: 'हल किया हुआ उदाहरण' },
    { type: 'step-by-step', steps: ['घनाभ की लंबाई 12 मी, चौड़ाई 8 मी और ऊँचाई 4 मी है।', 'चार दीवारों का क्षेत्रफल $2h(l+b)$ होगा।', '$2\\times4\\times(12+8)=160$ वर्ग मीटर।', 'यदि सफेदी की दर ₹5 प्रति वर्ग मीटर हो, तो खर्च ₹800 होगा।'] },
    { type: 'heading', level: 3, text: 'इकाई का अनुशासन' },
    { type: 'list', style: 'bullet', items: ['लंबाई → cm, m जैसी एक-आयामी इकाई।', 'क्षेत्रफल → cm², m²।', 'आयतन → cm³, m³।', '1 m³ = 1000 L और 1000 cm³ = 1 L।'] },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'क्षेत्रफल और आयतन की इकाइयों को आपस में न बदलें। प्रश्न में दिए सभी माप पहले एक ही प्रणाली में करें।' },
    { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'चित्र बनाकर दिए हुए माप पर नाम लिखें। इससे लंबाई-चौड़ाई-ऊँचाई और त्रिज्या जैसे माप आपस में नहीं मिलते।' }
  ]),

  top_math_05_01: c([
    { type: 'heading', level: 2, text: 'आँकड़ों का प्रबंधन' },
    { type: 'paragraph', text: 'आँकड़े किसी समूह, घटना या माप से प्राप्त जानकारी हैं। उन्हें सूची, तालिका, बार ग्राफ या वृत्त आलेख में व्यवस्थित करने से तुलना और निष्कर्ष निकालना आसान हो जाता है।' },
    { type: 'heading', level: 3, text: 'आँकड़ों को व्यवस्थित करने की प्रक्रिया' },
    { type: 'list', style: 'number', items: ['प्राप्त आँकड़ों को पढ़ें।', 'समान श्रेणियों में बाँटें।', 'तालिका में आवृत्ति या संख्या लिखें।', 'उचित पैमाने के साथ ग्राफ बनाएँ या पढ़ें।', 'अंत में प्रश्न के अनुसार तुलना करें।'] },
    { type: 'heading', level: 3, text: 'बार ग्राफ' },
    { type: 'paragraph', text: 'बार ग्राफ में अलग-अलग श्रेणियों की संख्याओं को आयताकार पट्टियों से दिखाया जाता है। क्षैतिज/ऊर्ध्वाधर अक्ष, पैमाना और इकाई को पहले पढ़ना आवश्यक है।' },
    { type: 'heading', level: 3, text: 'वृत्त आलेख' },
    { type: 'paragraph', text: 'पूरे वृत्त को 360° माना जाता है। किसी श्रेणी का केंद्रीय कोण उसके हिस्से के अनुपात में होता है।' },
    { type: 'formula', expression: '$A=\\frac{\\theta}{360^\\circ}\\times T$' },
    { type: 'heading', level: 3, text: 'माध्य' },
    { type: 'formula', expression: '$$\\bar{x}=\\frac{\\Sigma x}{n}$$' },
    { type: 'heading', level: 3, text: 'हल किया हुआ उदाहरण' },
    { type: 'step-by-step', steps: ['कुल ₹36000 के खर्च में भोजन का कोण 120° है।', 'भोजन का भाग $120/360=1/3$ है।', 'भोजन पर खर्च $36000/3=₹12000$ है।', 'वापस जाँचें: 12000 कुल का एक-तिहाई है।'] },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'बार ग्राफ में पट्टी की ऊँचाई से पहले पैमाना देखें। एक खांचा 1, 2, 5 या किसी अन्य इकाई का हो सकता है।' },
    { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'ग्राफ प्रश्न में title, axis, scale और unit चारों पढ़े बिना विकल्प न चुनें।' }
  ]),

  top_math_05_01_probability: c([
    { type: 'heading', level: 2, text: 'प्रायिकता' },
    { type: 'paragraph', text: 'किसी घटना के होने की संभावना को प्रायिकता कहते हैं। जब सभी परिणाम समान रूप से संभावित हों, तब अनुकूल परिणामों की संख्या को कुल संभावित परिणामों की संख्या से भाग देकर प्रायिकता मिलती है।' },
    { type: 'formula', expression: '$P(E)=\\frac{n(E)}{n(S)}$' },
    { type: 'paragraph', text: 'प्रायिकता का मान 0 और 1 के बीच होता है। असंभव घटना की प्रायिकता 0 और निश्चित घटना की प्रायिकता 1 होती है।' },
    { type: 'heading', level: 3, text: 'पूरक घटना' },
    { type: 'formula', expression: '$P(E^{\\prime})=1-P(E)$' },
    { type: 'heading', level: 3, text: 'सिक्का' },
    { type: 'step-by-step', steps: ['एक निष्पक्ष सिक्के के दो समान संभावित परिणाम हैं: चित और पट।', 'चित के अनुकूल परिणाम 1 है।', 'अतः $P(चित)=1/2$।'] },
    { type: 'heading', level: 3, text: 'पासा' },
    { type: 'step-by-step', steps: ['एक सामान्य पासे के 6 समान संभावित परिणाम हैं।', 'सम संख्या आने के अनुकूल परिणाम 2, 4, 6 हैं; कुल 3।', 'अतः $P(सम)=3/6=1/2$।'] },
    { type: 'heading', level: 3, text: 'थैले से गेंद निकालना' },
    { type: 'step-by-step', steps: ['थैले में 4 लाल, 5 हरी और 3 नीली गेंदें हैं। कुल 12 गेंदें हैं।', 'हरी न होने वाली गेंदें = 4+3=7।', 'अतः हरी न होने की प्रायिकता $7/12$ है।'] },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'कुल परिणाम गिनते समय रंग, क्रम या वस्तुओं की संख्या गलत न गिनें। अनुकूल परिणाम हमेशा उसी कुल sample space के भीतर होना चाहिए।' },
    { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'पहले कुल संभावित परिणाम लिखें, फिर अनुकूल परिणाम गिनें, अंत में भिन्न को सरल करें।' }
  ]),

  top_math_05_01_graphs: c([
    { type: 'heading', level: 2, text: 'अतिरिक्त अभ्यास: निर्देशांक तल और आलेख' },
    { type: 'callout', style: 'info', title: 'पाठ्यक्रम स्थिति', text: 'यह भाग वर्तमान मुख्य JNVST गणित सूची से अतिरिक्त अभ्यास सामग्री है। इसे हटाया नहीं गया है, लेकिन मुख्य परीक्षा-अध्यायों से अलग पहचानना चाहिए।' },
    { type: 'paragraph', text: 'निर्देशांक तल में दो परस्पर लंब अक्ष होते हैं: x-अक्ष क्षैतिज और y-अक्ष ऊर्ध्वाधर। उनका प्रतिच्छेदन मूल बिंदु $(0,0)$ कहलाता है।' },
    { type: 'heading', level: 3, text: 'क्रमित युग्म' },
    { type: 'formula', expression: '$$(x,y)$$' },
    { type: 'paragraph', text: 'क्रमित युग्म में पहला मान x-निर्देशांक और दूसरा मान y-निर्देशांक होता है। $(0,y)$ के रूप के बिंदु y-अक्ष पर तथा $(x,0)$ के रूप के बिंदु x-अक्ष पर स्थित होते हैं।' },
    { type: 'heading', level: 3, text: 'बिंदु अंकित करने की विधि' },
    { type: 'step-by-step', steps: ['पहले x की दिशा में जाएँ।', 'फिर y की दिशा में जाएँ।', 'दोनों मानों के चिह्न के अनुसार दाएँ/बाएँ और ऊपर/नीचे जाएँ।', 'अंतिम स्थान पर बिंदु अंकित करें और उसका नाम लिखें।'] },
    { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: '$(x,y)$ को $(y,x)$ से बदल देने पर बिंदु की स्थिति बदल सकती है। x हमेशा पहले और y बाद में आता है।' },
    { type: 'callout', style: 'important', title: 'परीक्षा-स्मरण', text: 'इसे अतिरिक्त अभ्यास मानें; आधिकारिक गणित तैयारी में पहले 11 मुख्य इकाइयों को पूरा करें।' }
  ])
};

export const mathLessonsData: Lesson[] = [
  {
    id: 'les_math_01_01_01', topicId: 'top_math_01_01', title: 'परिमेय संख्याएँ',
    objectives: ['परिमेय संख्याओं की पहचान और मानक रूप समझना', 'परिमेय संख्याओं के गुणधर्म लागू करना', 'प्रतिलोम और गणना आधारित प्रश्न हल करना'],
    estimatedMinutes: 35,
    content: addJnvstMastery('top_math_01_01', mathLessonContent.top_math_01_01)
  },
  {
    id: 'les_math_03_01_01', topicId: 'top_math_01_02', title: 'वर्ग और वर्गमूल',
    objectives: ['पूर्ण वर्ग पहचानना', 'वर्गमूल निकालना', 'पाइथागोरस त्रिक और पूर्ण वर्ग आधारित प्रश्न हल करना'],
    estimatedMinutes: 35,
    content: addJnvstMastery('top_math_01_02', mathLessonContent.top_math_01_02)
  },
  {
    id: 'les_math_03_02_01', topicId: 'top_math_01_03', title: 'घन और घनमूल',
    objectives: ['पूर्ण घन पहचानना', 'अभाज्य गुणनखंडों से घनमूल निकालना', 'दशमलव और ऋणात्मक संख्याओं पर प्रश्न हल करना'],
    estimatedMinutes: 30,
    content: addJnvstMastery('top_math_01_03', mathLessonContent.top_math_01_03)
  },
  {
    id: 'les_math_01_02_01', topicId: 'top_math_01_04', title: 'घातांक और घात',
    objectives: ['घातांक के नियम समझना', 'शून्य और ऋणात्मक घात का प्रयोग करना', 'मानक रूप में संख्याएँ लिखना'],
    estimatedMinutes: 35,
    content: addJnvstMastery('top_math_01_04', mathLessonContent.top_math_01_04)
  },
  {
    id: 'les_math_03_04_01', topicId: 'top_math_02_01', title: 'प्रत्यक्ष और प्रतिलोम समानुपात',
    objectives: ['प्रत्यक्ष समानुपात की पहचान', 'प्रतिलोम समानुपात की पहचान', 'दैनिक जीवन की समानुपाती समस्याएँ हल करना'],
    estimatedMinutes: 35,
    content: addJnvstMastery('top_math_02_01', mathLessonContent.top_math_02_01)
  },
  {
    id: 'les_math_03_03_01', topicId: 'top_math_02_02', title: 'प्रतिशत, लाभ-हानि, छूट और ब्याज',
    objectives: ['प्रतिशत की गणना', 'लाभ, हानि और छूट निकालना', 'साधारण और चक्रवृद्धि ब्याज के मूल प्रश्न हल करना'],
    estimatedMinutes: 45,
    content: addJnvstMastery('top_math_02_02', mathLessonContent.top_math_02_02)
  },
  {
    id: 'les_math_02_02_01', topicId: 'top_math_03_01', title: 'बीजीय व्यंजक और सर्वसमिकाएँ',
    objectives: ['पद और सजातीय पद पहचानना', 'सर्वसमिकाओं का उपयोग करना', 'सरलीकरण और विस्तार करना'],
    estimatedMinutes: 40,
    content: addJnvstMastery('top_math_03_01', mathLessonContent.top_math_03_01)
  },
  {
    id: 'les_math_02_03_01', topicId: 'top_math_03_01', title: 'गुणनखंडन',
    objectives: ['सामान्य गुणनखंड निकालना', 'सर्वसमिकाओं से गुणनखंडन करना', 'सरल त्रिपदों का गुणनखंडन करना'],
    estimatedMinutes: 40,
    content: [
      { type: 'heading', level: 2, text: 'गुणनखंडन की मूल अवधारणा' },
      { type: 'paragraph', text: 'किसी बीजीय व्यंजक को ऐसे सरल व्यंजकों के गुणनफल के रूप में लिखना, जिन्हें गुणा करने पर वही मूल व्यंजक मिले, गुणनखंडन कहलाता है।' },
      { type: 'heading', level: 3, text: 'सामान्य गुणनखंड विधि' },
      { type: 'step-by-step', steps: ['$6x+9$ में 3 सामान्य गुणनखंड है।', '3 बाहर निकालें: $3(2x+3)$।', 'वापस गुणा करके जाँचें: $6x+9$।'] },
      { type: 'heading', level: 3, text: 'सर्वसमिका से गुणनखंडन' },
      { type: 'formula', expression: '$$a^2-b^2=(a-b)(a+b)$$' },
      { type: 'paragraph', text: 'उदाहरण: $m^2-256=m^2-16^2=(m-16)(m+16)$।' },
      { type: 'heading', level: 3, text: 'मध्य पद विभाजन' },
      { type: 'step-by-step', steps: ['$x^2-7x+12$ में दो संख्याएँ खोजें जिनका योग -7 और गुणनफल 12 हो।', 'वे संख्याएँ -3 और -4 हैं।', 'मध्य पद को बाँटें: $x^2-3x-4x+12$।', 'समूहन: $x(x-3)-4(x-3)$।', 'अतः $(x-3)(x-4)$।'] },
      { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'गुणनखंडन के बाद उत्तर को दोबारा गुणा करके जाँचें। विशेषकर ऋणात्मक signs में यही जाँच बहुत उपयोगी है।' },
      { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'पहले common factor देखें, फिर difference of squares या अन्य identity खोजें, और अंत में middle-term splitting आजमाएँ।' }
    ]
  },
  {
    id: 'les_math_02_01_01', topicId: 'top_math_03_02', title: 'एक चर वाले रैखिक समीकरण',
    objectives: ['सरल और कोष्ठक वाले समीकरण हल करना', 'भिन्न वाले समीकरण हल करना', 'शाब्दिक समस्याओं को समीकरण में बदलना'],
    estimatedMinutes: 40,
    content: addJnvstMastery('top_math_03_02', mathLessonContent.top_math_03_02)
  },
  {
    id: 'les_math_04_01_01', topicId: 'top_math_04_01', title: 'चतुर्भुजों को समझना',
    objectives: ['मुख्य चतुर्भुजों की पहचान करना', 'उनके गुणों का प्रयोग करना', 'कोण और property आधारित प्रश्न हल करना'],
    estimatedMinutes: 40,
    content: addJnvstMastery('top_math_04_01', mathLessonContent.top_math_04_01)
  },
  {
    id: 'les_math_04_02_01', topicId: 'top_math_04_02', title: 'ठोस आकृतियों का दृश्यांकन',
    objectives: ['फलक, किनारे और शीर्ष पहचानना', 'जाल और त्रि-आयामी आकृतियों को समझना', 'क्षेत्रमिति से जुड़े ठोस-आकृति प्रश्न हल करना'],
    estimatedMinutes: 30,
    content: [
      { type: 'heading', level: 2, text: 'ठोस आकृतियों का दृश्यांकन' },
      { type: 'paragraph', text: 'यह पूरक lesson घन, घनाभ और अन्य ठोस आकृतियों को अलग-अलग दिशाओं से समझने में मदद करता है। इसे क्षेत्रमिति के साथ पढ़ना उपयोगी है।' },
      { type: 'table', headers: ['आकृति', 'फलक', 'किनारे', 'शीर्ष'], rows: [
        ['घन', '6', '12', '8'],
        ['घनाभ', '6', '12', '8']
      ] },
      { type: 'heading', level: 3, text: 'जाल (Net)' },
      { type: 'paragraph', text: 'किसी ठोस आकृति को उसकी सतहों के साथ काटकर समतल पर फैलाने से प्राप्त आकृति उसका जाल कहलाती है। सही जाल वही है जिसे मोड़कर फिर मूल ठोस बनाया जा सके।' },
      { type: 'heading', level: 3, text: 'ऑयलर का संबंध' },
      { type: 'formula', expression: '$$F+V-E=2$$' },
      { type: 'paragraph', text: 'यह संबंध सामान्यतः उत्तल बहुफलक में फलक (F), शीर्ष (V) और किनारों (E) के बीच संबंध बताता है।' },
      { type: 'callout', style: 'warning', title: 'सामान्य गलती', text: 'फलक, किनारा और शीर्ष के नामों को आपस में न मिलाएँ। जाल में दिखाई देने वाली साझा सीमाओं को भी ध्यान से गिनें।' },
      { type: 'callout', style: 'important', title: 'JNVST परीक्षा-स्मरण', text: 'यह अतिरिक्त दृश्यात्मक अभ्यास क्षेत्रमिति की तैयारी को मजबूत करता है, लेकिन मुख्य परीक्षा के लिए क्षेत्रफल, पृष्ठीय क्षेत्रफल और आयतन के सूत्र प्राथमिक रखें।' }
    ]
  },
  {
    id: 'les_math_05_01_01', topicId: 'top_math_04_02', title: 'क्षेत्रमिति',
    objectives: ['समतल आकृतियों का क्षेत्रफल और परिमाप', 'घन, घनाभ और बेलन का पृष्ठीय क्षेत्रफल', 'घन, घनाभ और बेलन का आयतन तथा इकाई रूपांतरण'],
    estimatedMinutes: 45,
    content: addJnvstMastery('top_math_04_02', mathLessonContent.top_math_04_02)
  },
  {
    id: 'les_math_06_01_01', topicId: 'top_math_05_01', title: 'आँकड़ों को व्यवस्थित करना',
    objectives: ['आँकड़े तालिका में व्यवस्थित करना', 'बार ग्राफ और वृत्त आलेख पढ़ना', 'माध्य जैसे सरल निष्कर्ष निकालना'],
    estimatedMinutes: 35,
    content: addJnvstMastery('top_math_05_01', mathLessonContent.top_math_05_01)
  },
  {
    id: 'les_math_06_02_01', topicId: 'top_math_05_01', title: 'प्रायिकता',
    objectives: ['समान संभावित परिणाम समझना', 'सरल घटनाओं की प्रायिकता निकालना', 'प्रायिकता की सीमा और पूरक घटना समझना'],
    estimatedMinutes: 30,
    content: mathLessonContent.top_math_05_01_probability
  },
  {
    id: 'les_math_06_03_01', topicId: 'top_math_05_01', title: 'अतिरिक्त अभ्यास: निर्देशांक तल',
    objectives: ['निर्देशांक तल की मूल बातें समझना', 'क्रमित युग्म से बिंदु पहचानना', 'आलेख पढ़ने का आधार बनाना'],
    estimatedMinutes: 25,
    content: mathLessonContent.top_math_05_01_graphs
  }
];
