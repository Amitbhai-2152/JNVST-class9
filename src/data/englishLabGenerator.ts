import type { TranslationDirection, TranslationItem, VocabularyItem } from './englishLabs';

type Gender = 'm' | 'f';

const names = ['Ravi', 'Meena', 'Arjun', 'Nita', 'Aman', 'Tara', 'Rohan', 'Priya'];
const objects = ['the book', 'the question', 'the letter', 'the door', 'the garden', 'the answer', 'the bag', 'the lesson'];
const places = ['the school', 'the library', 'the market', 'the classroom', 'the station', 'the village'];
const times = ['every morning', 'every evening', 'after school', 'on Sundays', 'before dinner'];
const adjectives = ['careful', 'helpful', 'honest', 'patient', 'active', 'curious'];
const actions = ['study', 'read', 'help', 'play', 'clean', 'practise'];

const hindiName: Record<string, string> = { Ravi:'रवि', Meena:'मीना', Arjun:'अर्जुन', Nita:'नीता', Aman:'अमन', Tara:'तारा', Rohan:'रोहन', Priya:'प्रिया' };
const hindiGender: Record<string, 'm' | 'f'> = {
  Ravi:'m', Meena:'f', Arjun:'m', Nita:'f', Aman:'m', Tara:'f', Rohan:'m', Priya:'f'
};

const hindiObject: Record<string, string> = {
  'the book':'किताब', 'the question':'प्रश्न', 'the letter':'पत्र', 'the door':'दरवाज़ा',
  'the garden':'बगीचा', 'the answer':'उत्तर', 'the bag':'बैग', 'the lesson':'पाठ'
};
const hindiPlace: Record<string, string> = {
  'the school':'स्कूल', 'the library':'पुस्तकालय', 'the market':'बाज़ार',
  'the classroom':'कक्षा', 'the station':'स्टेशन', 'the village':'गाँव'
};
const hindiTime: Record<string, string> = {
  'every morning':'हर सुबह', 'every evening':'हर शाम', 'after school':'स्कूल के बाद',
  'on Sundays':'रविवार को', 'before dinner':'रात के खाने से पहले'
};
const hindiAdj: Record<string,string> = {
  careful:'सावधान', helpful:'मददगार', honest:'ईमानदार', patient:'धैर्यवान', active:'सक्रिय', curious:'जिज्ञासु'
};
const hindiAction: Record<string,string> = {
  study:'पढ़ना', read:'पढ़ना', help:'मदद करना', play:'खेलना', clean:'साफ़ करना', practise:'अभ्यास करना'
};

const pick = <T,>(items: T[], seed: number, salt = 0): T => items[hashSeed(seed, salt) % items.length];

const hashSeed = (seed: number, salt: number) => {
  let x = (seed ^ salt) | 0;
  x = Math.imul(x ^ (x >>> 16), 2246822507);
  x = Math.imul(x ^ (x >>> 13), 3266489909);
  return (x ^ (x >>> 16)) >>> 0;
};

const simplePresent = (seed: number, direction: TranslationDirection): TranslationItem => {
  const name = pick(names, hashSeed(seed, 11));
  const object = pick(objects, hashSeed(seed, 12));
  const time = pick(times, hashSeed(seed, 13));
  const verb = pick(['reads', 'opens', 'checks', 'cleans', 'answers'], hashSeed(seed, 14));
  const hiVerbBase: Record<string,[string,string]> = { reads:['पढ़ता है','पढ़ती है'], opens:['खोलता है','खोलती है'], checks:['जाँचता है','जाँचती है'], cleans:['साफ़ करता है','साफ़ करती है'], answers:['उत्तर देता है','उत्तर देती है'] };
  const hiVerb = hiVerbBase[verb][hindiGender[name] === 'f' ? 1 : 0];
  const en = `${name} ${verb} ${object} ${time}.`;
  const hi = `${hindiName[name]} ${hindiObject[object]} ${hiVerb} ${hindiTime[time]}।`;
  return direction === 'hi-en'
    ? { id:`gen-tr-${seed}`,level:1,direction,prompt:hi,acceptableAnswers:[en],displayAnswer:en,hint:`${hindiName[name]} = ${name}. समय-संकेत “${hindiTime[time]}” आदत दिखाता है।`,explanation:`पहले subject पहचानें, फिर habit के लिए Simple Present लगाएँ। ${name} singular है, इसलिए verb में s/es आता है। अंत में object और time phrase जोड़ें।`,grammarPoint:'Subject + V1(s/es) + Object + Time'}
    : { id:`gen-tr-${seed}`,level:1,direction,prompt:en,acceptableAnswers:[hi],displayAnswer:hi,hint:`${name} = ${hindiName[name]}; ${verb} = ${hiVerb[verb]}.`,explanation:`पहले subject और main verb पहचानें। यह habitual action है, इसलिए हिन्दी में सामान्य वर्तमानकाल का अर्थ रखें और time phrase अंत में जोड़ें।`,grammarPoint:'Simple Present → हिन्दी सामान्य वर्तमानकाल' };
};

const presentContinuous = (seed:number, direction:TranslationDirection): TranslationItem => {
  const name=pick(names,hashSeed(seed,21)); const action=pick(['study','read','clean','play','write'],hashSeed(seed,22));
  const enVerb:Record<string,string>={study:'studying',read:'reading',clean:'cleaning',play:'playing',write:'writing'};
  const hiVerbBase:Record<string,[string,string]>={study:['पढ़ रहा है','पढ़ रही है'],read:['पढ़ रहा है','पढ़ रही है'],clean:['साफ़ कर रहा है','साफ़ कर रही है'],play:['खेल रहा है','खेल रही है'],write:['लिख रहा है','लिख रही है']};
  const hiVerb=hiVerbBase[action][hindiGender[name]==='f'?1:0];
  const en=`${name} is ${enVerb[action]} now.`; const hi=`${hindiName[name]} अभी ${hiVerb}।`;
  return direction==='hi-en'
    ? {id:`gen-tr-${seed}`,level:2,direction,prompt:hi,acceptableAnswers:[en],displayAnswer:en,hint:'“अभी” = now. काम इस समय चल रहा है।',explanation:'“अभी” देखकर Present Continuous चुनें: subject + is/am/are + verb-ing. यहाँ subject singular है, इसलिए is आएगा.',grammarPoint:'Present Continuous: is/am/are + V-ing'}
    : {id:`gen-tr-${seed}`,level:2,direction,prompt:en,acceptableAnswers:[hi],displayAnswer:hi,hint:'“now” वर्तमान में चल रहे काम का clue है।',explanation:'“is + V-ing” ongoing action दिखाता है। इसे हिन्दी के “... रहा है” pattern से जोड़ें.',grammarPoint:'is + V-ing → “... रहा है”'};
};

const pastFuture = (seed:number, direction:TranslationDirection): TranslationItem => {
  const name=pick(names,hashSeed(seed,31)); const object=pick(objects,hashSeed(seed,32));
  const en = `${name} finished ${object} yesterday.`; const hi=`${hindiName[name]} ने कल ${hindiObject[object]} पूरा किया।`;
  return direction==='hi-en'
    ? {id:`gen-tr-${seed}`,level:3,direction,prompt:hi,acceptableAnswers:[en],displayAnswer:en,hint:'“कल” यहाँ बीते हुए समय को दिखाता है।',explanation:'पहले yesterday पहचानें। फिर Simple Past लगाएँ: subject + V2 + object. Finished regular past form है.',grammarPoint:'Simple Past: subject + V2'}
    : {id:`gen-tr-${seed}`,level:3,direction,prompt:en,acceptableAnswers:[hi],displayAnswer:hi,hint:'yesterday = कल (बीता हुआ दिन)।',explanation:'Finished completed past action है। हिन्दी में “ने + किया/किया” जैसे past pattern से जोड़ें.',grammarPoint:'V2 → भूतकाल'};
};

const conditionalPassive = (seed:number, direction:TranslationDirection): TranslationItem => {
  const name=pick(names,hashSeed(seed,41)); const object=pick(objects,hashSeed(seed,42));
  const en=`If ${name} studies regularly, ${name} will understand ${object} better.`;
  const hi=`यदि ${hindiName[name]} नियमित पढ़ाई करता/करती है, तो ${hindiName[name]} ${hindiObject[object]} को बेहतर समझेगा/समझेगी।`;
  return direction==='hi-en'
    ? {id:`gen-tr-${seed}`,level:4,direction,prompt:hi,acceptableAnswers:[en],displayAnswer:en,hint:'“यदि” से condition शुरू होती है; result में will आएगा।',explanation:'First Conditional में if-clause में Simple Present और main clause में will + V1 आता है.',grammarPoint:'If + Simple Present, will + V1'}
    : {id:`gen-tr-${seed}`,level:4,direction,prompt:en,acceptableAnswers:[hi],displayAnswer:hi,hint:'if = यदि; will = भविष्य का परिणाम।',explanation:'पहले condition और फिर result को हिन्दी में स्वाभाविक क्रम में रखें.',grammarPoint:'First Conditional meaning'};
};

const advanced = (seed:number, direction:TranslationDirection): TranslationItem => {
  const name=pick(names,hashSeed(seed,51)); const adj=pick(adjectives,hashSeed(seed,52));
  const en=`Although the question was difficult, ${name} remained ${adj} and checked every option carefully.`;
  const remained = hindiGender[name] === 'f' ? 'रही' : 'रहा';
  const hi=`हालाँकि प्रश्न कठिन था, ${hindiName[name]} ${hindiAdj[adj]} ${remained} और हर विकल्प को ध्यान से जाँचा।`;
  return direction==='hi-en'
    ? {id:`gen-tr-${seed}`,level:6,direction,prompt:hi,acceptableAnswers:[en],displayAnswer:en,hint:'“हालाँकि” = although; “ध्यान से” = carefully.',explanation:'पहले contrast clause बनाइए: Although + past clause. फिर main clause में past action रखें और adjective को linking verb के बाद रखें.',grammarPoint:'Although + clause + main clause'}
    : {id:`gen-tr-${seed}`,level:6,direction,prompt:en,acceptableAnswers:[hi],displayAnswer:hi,hint:'although = हालाँकि; remained = बना/रहा।',explanation:'Although contrast दिखाता है। फिर main clause का action और manner phrase हिन्दी में रखें.',grammarPoint:'Contrast + past action + adverb' };
};

const makeTranslation = (
  seed: number,
  level: TranslationItem['level'],
  direction: TranslationDirection,
  hi: string,
  en: string,
  hint: string,
  explanation: string,
  grammarPoint: string,
  buildSteps: string[],
): TranslationItem => direction === 'hi-en'
  ? { id: 'gen-tr-' + level + '-' + seed, level, direction, prompt: hi, acceptableAnswers: [en], displayAnswer: en, hint, explanation, grammarPoint, buildSteps }
  : { id: 'gen-tr-' + level + '-' + seed, level, direction, prompt: en, acceptableAnswers: [hi], displayAnswer: hi, hint, explanation, grammarPoint, buildSteps };

type TranslationFactory = (seed: number, direction: TranslationDirection, level: TranslationItem['level']) => TranslationItem;

const genderFor = (name: string): Gender => hindiGender[name];
const isFemale = (name: string) => genderFor(name) === 'f';

const levelTranslationFactories: Record<number, TranslationFactory[]> = {
  1: [
    (seed, direction, level) => { const s = pick(names, seed, 201); const hi = hindiName[s] + ' रोज़ स्कूल ' + (isFemale(s) ? 'जाती' : 'जाता') + ' है।'; const en = s + ' goes to school every day.'; return makeTranslation(seed, level, direction, hi, en, 'रोज़/every day habit का clue है।', 'Habitual action के लिए Simple Present आता है और third-person singular में go → goes होता है।', 'Subject + V-s/es + place + time', ['1. Subject पहचानें।', '2. Habit clue पहचानें।', '3. Third-person singular में goes लगाएँ।', '4. Place और time जोड़ें।']); },
    (seed, direction, level) => { const s = pick(names, seed, 202); const hi = hindiName[s] + ' के पास एक नई किताब है।'; const en = s + ' has a new book.'; return makeTranslation(seed, level, direction, hi, en, 'के पास possession बताता है।', 'Singular subject के साथ possession के लिए has आता है।', 'Subject + has + noun', ['1. Possession पहचानें।', '2. Singular subject देखें।', '3. Has चुनें।', '4. Noun phrase जोड़ें।']); },
    (seed, direction, level) => { const s = pick(names, seed, 203); const hi = hindiName[s] + ' आज बहुत खुश है।'; const en = s + ' is very happy today.'; return makeTranslation(seed, level, direction, hi, en, 'है/is linking verb है।', 'Singular subject के साथ be verb is आता है और happy adjective है।', 'Subject + is + adjective + time', ['1. Subject पहचानें।', '2. Is चुनें।', '3. Adjective happy जोड़ें।', '4. Today जोड़ें।']); },
    (seed, direction, level) => { const hi = 'कक्षा में एक बड़ा नक्शा है।'; const en = 'There is a large map in the classroom.'; return makeTranslation(seed, level, direction, hi, en, 'एक singular चीज़ मौजूद है, इसलिए There is।', 'There is किसी एक व्यक्ति या वस्तु के मौजूद होने को बताता है।', 'There is + singular noun + place', ['1. Existence meaning पहचानें।', '2. Singular noun देखें।', '3. There is लगाएँ।', '4. Place phrase जोड़ें।']); },
  ],
  2: [
    (seed, direction, level) => { const s = pick(names, seed, 211); const hi = hindiName[s] + ' अभी पुस्तकालय में ' + (isFemale(s) ? 'पढ़ रही' : 'पढ़ रहा') + ' है।'; const en = s + ' is studying in the library now.'; return makeTranslation(seed, level, direction, hi, en, 'अभी/now ongoing action का clue है।', 'Present Continuous में is/am/are + V-ing आता है।', 'Subject + is + V-ing + place + now', ['1. Ongoing clue खोजें।', '2. Singular subject के लिए is चुनें।', '3. Study → studying करें।', '4. Place और now जोड़ें।']); },
    (seed, direction, level) => { const hi = 'वे खेल के मैदान में क्रिकेट खेल रहे हैं।'; const en = 'They are playing cricket on the playground.'; return makeTranslation(seed, level, direction, hi, en, 'रहे हैं/are playing plural ongoing action है।', 'They के साथ are + V-ing आता है।', 'They + are + V-ing + object + place', ['1. They पहचानें।', '2. Are चुनें।', '3. Play → playing करें।', '4. Object और place जोड़ें।']); },
    (seed, direction, level) => { const s = pick(names, seed, 213); const hi = hindiName[s] + ' रविवार को बाज़ार नहीं ' + (isFemale(s) ? 'जाती' : 'जाता') + '।'; const en = s + ' does not go to the market on Sunday.'; return makeTranslation(seed, level, direction, hi, en, 'Present negative में does not देखें।', 'Third-person singular negative में does not + V1 आता है, इसलिए go base form में रहता है।', 'Subject + does not + V1 + place + time', ['1. Negative पहचानें।', '2. Singular subject के लिए does not रखें।', '3. Main verb go को V1 में रखें।', '4. Time phrase जोड़ें।']); },
    (seed, direction, level) => { const hi = 'क्या तुम यह प्रश्न हल कर सकते हो?'; const en = 'Can you solve this question?'; return makeTranslation(seed, level, direction, hi, en, 'सकते हो ability/request का clue है।', 'Can के बाद subject और base verb V1 आता है।', 'Can + subject + V1 + object?', ['1. Ability/question पहचानें।', '2. Can लगाएँ।', '3. You रखें।', '4. Solve V1 रखें।']); },
  ],
  3: [
    (seed, direction, level) => { const s = pick(names, seed, 221); const hi = hindiName[s] + ' ने कल एक पत्र लिखा।'; const en = s + ' wrote a letter yesterday.'; return makeTranslation(seed, level, direction, hi, en, 'कल/yesterday completed past action का clue है।', 'Simple Past में write का V2 wrote आता है।', 'Subject + V2 + object + past time', ['1. Past clue पहचानें।', '2. V2 चुनें।', '3. Write → wrote करें।', '4. Object और time जोड़ें।']); },
    (seed, direction, level) => { const s = pick(names, seed, 222); const hi = hindiName[s] + ' अगले सप्ताह गाँव जाएगा/जाएगी।'; const en = s + ' will go to the village next week.'; return makeTranslation(seed, level, direction, hi, en, 'अगले सप्ताह future clue है।', 'Future Simple में will + V1 आता है।', 'Subject + will + V1 + place + time', ['1. Future clue पहचानें।', '2. Will रखें।', '3. Go V1 रखें।', '4. Place/time जोड़ें।']); },
    (seed, direction, level) => { const s = pick(names, seed, 223); const hi = hindiName[s] + ' अपना काम पहले ही पूरा कर चुका/चुकी है।'; const en = s + ' has already finished the work.'; return makeTranslation(seed, level, direction, hi, en, 'पहले ही/already completed result का clue है।', 'Present Perfect में has/have + V3 आता है।', 'Subject + has + V3 + already', ['1. Completed result पहचानें।', '2. Has चुनें।', '3. V3 finished रखें।', '4. Already की position जाँचें।']); },
    (seed, direction, level) => { const hi = 'क्या तुमने कल यह कहानी पढ़ी?'; const en = 'Did you read this story yesterday?'; return makeTranslation(seed, level, direction, hi, en, 'Past question में Did + V1 आता है।', 'Did past tense को carry करता है, इसलिए main verb V1 में रहता है।', 'Did + subject + V1 + object + time?', ['1. Past question पहचानें।', '2. Did लगाएँ।', '3. Did के बाद read V1 रखें।', '4. Time clue जोड़ें।']); },
  ],
  4: [
    (seed, direction, level) => { const s = pick(names, seed, 231); const hi = 'जब शिक्षक पहुँचे, तब ' + hindiName[s] + ' प्रश्न हल कर ' + (isFemale(s) ? 'रही' : 'रहा') + ' था।'; const en = 'When the teacher arrived, ' + s + ' was solving a question.'; return makeTranslation(seed, level, direction, hi, en, 'एक past action चल रहा था और दूसरा बीच में हुआ।', 'Ongoing past action के लिए Past Continuous और completed event के लिए Simple Past आता है।', 'When + Simple Past, Past Continuous', ['1. दोनों past actions अलग करें।', '2. Arrived को Simple Past रखें।', '3. Was solving रखें।', '4. Clauses जोड़ें।']); },
    (seed, direction, level) => { const s = pick(names, seed, 232); const hi = 'यदि ' + hindiName[s] + ' नियमित अभ्यास करता/करती है, तो बेहतर प्रदर्शन करेगा/करेगी।'; const en = 'If ' + s + ' practises regularly, ' + s + ' will perform better.'; return makeTranslation(seed, level, direction, hi, en, 'यदि/if condition और result बनाता है।', 'First Conditional में if-clause Simple Present और result में will + V1 होता है।', 'If + Simple Present, will + V1', ['1. Condition अलग करें।', '2. If-clause में practises रखें।', '3. Result में will + perform रखें।', '4. Cause → result जाँचें।']); },
    (seed, direction, level) => { const hi = 'उत्तर शिक्षक द्वारा जाँचा गया था।'; const en = 'The answer was checked by the teacher.'; return makeTranslation(seed, level, direction, hi, en, 'Answer receiver है, इसलिए passive voice देखें।', 'Simple Past Passive = was/were + V3 + by + agent.', 'Object + was + V3 + by + agent', ['1. Receiver पहचानें।', '2. उसे शुरुआत में रखें।', '3. Was + checked लगाएँ।', '4. By + doer जोड़ें।']); },
    (seed, direction, level) => { const hi = 'यह प्रश्न पिछले प्रश्न से अधिक कठिन है।'; const en = 'This question is more difficult than the previous question.'; return makeTranslation(seed, level, direction, hi, en, 'तुलना में comparative + than आता है।', 'Long adjective difficult का comparative more difficult है।', 'Subject + is + more + adjective + than', ['1. दोनों चीज़ें पहचानें।', '2. Comparative relation देखें।', '3. More difficult बनाएँ।', '4. Than के बाद comparator रखें।']); },
  ],
  5: [
    (seed, direction, level) => { const hi = 'जो छात्र ध्यान से पढ़ता है, वह गद्यांश को बेहतर समझता है।'; const en = 'The student who reads carefully understands the passage better.'; return makeTranslation(seed, level, direction, hi, en, 'जो छात्र person को describe करता है, इसलिए who-clause देखें।', 'Relative clause में who व्यक्ति को describe करता है।', 'Noun + who + clause + main clause', ['1. Main noun student पहचानें।', '2. उसकी extra information पहचानें।', '3. Person के लिए who लगाएँ।', '4. Main clause पूरा करें।']); },
    (seed, direction, level) => { const s = pick(names, seed, 252); const hi = hindiName[s] + ' ने कहा कि वह अगले दिन आएगा/आएगी।'; const en = s + ' said that ' + s + ' would come the next day.'; return makeTranslation(seed, level, direction, hi, en, 'Past reporting verb में will → would और time-word change देखें।', 'Reported Speech में past reporting verb के साथ tense/time expression context के अनुसार backshift हो सकते हैं।', 'said + that + would + time change', ['1. Said पहचानें।', '2. Reported clause अलग करें।', '3. Will → would करें।', '4. Next day time expression जाँचें।']); },
    (seed, direction, level) => { const hi = 'यह कक्षा की सबसे शांत जगह है।'; const en = 'This is the quietest place in the classroom.'; return makeTranslation(seed, level, direction, hi, en, 'सबसे/superlative का clue देखें।', 'Superlative degree में the + adjective-est या the most + adjective आता है।', 'the + superlative + noun', ['1. “सबसे” पहचानें।', '2. Superlative form चुनें।', '3. Quiet → quietest करें।', '4. Group/place जोड़ें।']); },
    (seed, direction, level) => { const hi = 'अगले महीने नई किताबें पुस्तकालय में रखी जाएँगी।'; const en = 'New books will be placed in the library next month.'; return makeTranslation(seed, level, direction, hi, en, 'Future + passive: काम books पर हो रहा है।', 'Future Passive = will be + V3.', 'Object + will be + V3 + place + time', ['1. Future clue पहचानें।', '2. Receiver books को शुरुआत में रखें।', '3. Will be + placed लगाएँ।', '4. Place/time जोड़ें।']); },
  ],
  6: [
    (seed, direction, level) => { const hi = 'यदि उसने अधिक ध्यान से पढ़ा होता, तो वह गलती नहीं करता।'; const en = 'If he had read more carefully, he would not have made the mistake.'; return makeTranslation(seed, level, direction, hi, en, 'Unreal past condition: had + V3 / would have + V3.', 'Third Conditional बीती हुई unreal condition और उसका hypothetical result दिखाता है।', 'If + had + V3, would have + V3', ['1. Unreal past condition पहचानें।', '2. If-clause में had + V3 रखें।', '3. Result में would have + V3 रखें।', '4. Past meaning cross-check करें।']); },
    (seed, direction, level) => { const hi = 'शिक्षक ने पूछा कि क्या छात्रों ने उत्तर जाँचे थे।'; const en = 'The teacher asked whether the students had checked the answers.'; return makeTranslation(seed, level, direction, hi, en, 'पूछा कि क्या reported question का clue है।', 'Reported question में whether/if के बाद statement word order आता है।', 'asked + whether + subject + had + V3', ['1. Asked पहचानें।', '2. Whether से yes/no question जोड़ें।', '3. Statement order रखें।', '4. Past-perfect relation जाँचें।']); },
    (seed, direction, level) => { const hi = 'प्रश्न हल करने से पहले उसे ध्यान से पढ़ना आवश्यक है।'; const en = 'It is essential to read the question carefully before solving it.'; return makeTranslation(seed, level, direction, hi, en, 'आवश्यक है = essential; करने से पहले = before + V-ing.', 'It is + adjective + to-infinitive और before + gerund time/order दिखाते हैं।', 'It is + adjective + to V1 + before + V-ing', ['1. General statement पहचानें।', '2. It is essential बनाएं।', '3. To read V1 रखें।', '4. Before solving से sequence जोड़ें।']); },
    (seed, direction, level) => { const hi = 'गद्यांश को ध्यान से पढ़ना केवल परिचित शब्द पहचानने से अधिक उपयोगी है।'; const en = 'Reading the passage carefully is more useful than simply recognizing familiar words.'; return makeTranslation(seed, level, direction, hi, en, 'दो activities की comparison है: V-ing phrase + more...than.', 'Gerund phrase subject की तरह काम करता है और comparison में more useful than आता है।', 'V-ing phrase + is + more + adjective + than + V-ing', ['1. दोनों activities पहचानें।', '2. पहली activity को V-ing phrase बनाएं।', '3. More useful रखें।', '4. Than के बाद दूसरी activity रखें।']); },
  ],
};


const scenarioFactory = (
  level: TranslationItem['level'],
  scenarios: Array<{ hi: string; en: string; hint: string; explanation: string; grammarPoint: string }>,
  seed: number,
  direction: TranslationDirection,
): TranslationItem => {
  const scenario = scenarios[Math.max(0, Math.floor(seed)) % scenarios.length];
  const steps: Record<number, string[]> = {
    1: ['1. Sentence का basic meaning समझें।', '2. Subject/verb/noun पहचानें।', '3. सही word order बनाएँ।', '4. Final sentence को meaning से मिलाएँ।'],
    2: ['1. Tense clue पहचानें।', '2. Subject के अनुसार auxiliary/verb चुनें।', '3. Main verb का सही form रखें।', '4. Place/time phrase जोड़ें।'],
    3: ['1. Time या modal clue पहचानें।', '2. Tense/modal structure चुनें।', '3. Main verb का सही form रखें।', '4. पूरे sentence को cross-check करें।'],
    4: ['1. दोनों clauses/ideas अलग करें।', '2. Connector, voice या comparison पहचानें।', '3. हर हिस्से का grammar structure बनाएं।', '4. Final meaning verify करें।'],
    5: ['1. Main clause और supporting clause अलग करें।', '2. Connector/relative/purpose structure पहचानें।', '3. Tense और verb form तय करें।', '4. Sentence को natural English में assemble करें।'],
    6: ['1. Sentence को logical chunks में बाँटें।', '2. Clause relationship और advanced structure पहचानें।', '3. Tense/voice/modifier order तय करें।', '4. Vocabulary का exact meaning रखें।', '5. Final translation को source meaning से मिलाएँ।'],
  };
  return makeTranslation(seed, level, direction, scenario.hi, scenario.en, scenario.hint, scenario.explanation, scenario.grammarPoint, steps[level]);
};

const scenarioBanks: Record<number, Array<{ hi: string; en: string; hint: string; explanation: string; grammarPoint: string }>> = {
  1: [
    { hi:'मेरी बहन रोज़ सुबह जल्दी उठती है।', en:'My sister gets up early every morning.', hint:'रोज़ सुबह habit है; sister singular है।', explanation:'Simple Present में third-person singular subject के साथ get → gets होता है।', grammarPoint:'Simple Present + frequency phrase' },
    { hi:'मेरे पिता के पास एक पुरानी घड़ी है।', en:'My father has an old watch.', hint:'“के पास” possession है।', explanation:'Singular subject father के साथ has आता है।', grammarPoint:'Possession: has' },
    { hi:'बच्चे मैदान में हैं।', en:'The children are in the playground.', hint:'यह location sentence है।', explanation:'Plural subject children के साथ be verb are आता है।', grammarPoint:'Plural subject + are + place' },
    { hi:'कृपया अपना बैग मेज़ पर रखो।', en:'Please put your bag on the table.', hint:'यह polite instruction है; “पर” के लिए on देखें।', explanation:'Imperative में base verb put आता है और surface के लिए on प्रयोग होता है।', grammarPoint:'Imperative + preposition on' },
  ],
  2: [
    { hi:'मीना अभी अपना होमवर्क कर रही है।', en:'Meena is doing her homework now.', hint:'अभी/now = ongoing action.', explanation:'Present Continuous में is + doing आता है।', grammarPoint:'is + V-ing' },
    { hi:'क्या तुम्हारा भाई हर दिन पढ़ता है?', en:'Does your brother study every day?', hint:'Present Simple question में Does + V1 देखें।', explanation:'Singular subject brother के साथ question में does और main verb study (V1) आता है।', grammarPoint:'Does + subject + V1?' },
    { hi:'वे रविवार को स्कूल नहीं जाते हैं।', en:'They do not go to school on Sundays.', hint:'Plural present negative में do not + V1।', explanation:'They के साथ do not आता है और main verb go base form में रहता है।', grammarPoint:'do not + V1' },
    { hi:'किताब कुर्सी के नीचे है।', en:'The book is under the chair.', hint:'“के नीचे” = under.', explanation:'Location relation बताने के लिए under preposition प्रयोग होता है।', grammarPoint:'is + under + noun' },
  ],
  3: [
    { hi:'मैंने कल अपना कमरा साफ़ किया।', en:'I cleaned my room yesterday.', hint:'Yesterday past clue है।', explanation:'Simple Past में regular verb clean → cleaned होता है।', grammarPoint:'Simple Past: V2' },
    { hi:'हम अगले महीने परीक्षा देंगे।', en:'We will take the examination next month.', hint:'अगले महीने future clue है।', explanation:'Future Simple में will + V1 आता है।', grammarPoint:'will + V1' },
    { hi:'उसने अभी तक उत्तर नहीं दिया है।', en:'She has not answered yet.', hint:'“अभी तक” completed action not done = Present Perfect negative.', explanation:'She के साथ has not + V3 answer → answered आता है।', grammarPoint:'has not + V3' },
    { hi:'क्या तुम्हें यह नियम समझना चाहिए?', en:'Should you understand this rule?', hint:'“चाहिए” = should.', explanation:'Modal question में Should + subject + V1 आता है।', grammarPoint:'Should + subject + V1?' },
  ],
  4: [
    { hi:'जब बारिश शुरू हुई, बच्चे खेल रहे थे।', en:'When the rain started, the children were playing.', hint:'एक past event हुआ और दूसरा action चल रहा था।', explanation:'Started Simple Past है; were playing Past Continuous है।', grammarPoint:'When + Simple Past, Past Continuous' },
    { hi:'यदि तुम ध्यान से पढ़ोगे, तो तुम गलती कम करोगे।', en:'If you read carefully, you will make fewer mistakes.', hint:'Condition present, result future.', explanation:'First Conditional में if-clause Simple Present और result will + V1 में होता है।', grammarPoint:'If + present, will + V1' },
    { hi:'नियम रोज़ कक्षा में दोहराए जाते हैं।', en:'The rules are repeated in class every day.', hint:'Rules काम के receiver हैं और routine है।', explanation:'Present Passive = are + V3; plural subject rules के साथ are आता है।', grammarPoint:'Present Passive: are + V3' },
    { hi:'यह कहानी उस कहानी से अधिक रोचक है।', en:'This story is more interesting than that story.', hint:'दो चीज़ों की तुलना है; interesting के साथ more आएगा।', explanation:'Long adjective interesting का comparative more interesting होता है।', grammarPoint:'more + adjective + than' },
  ],
  5: [
    { hi:'जिस लड़के ने उत्तर दिया, वह बहुत आत्मविश्वासी था।', en:'The boy who answered the question was very confident.', hint:'“जिस लड़के...” person को describe करता है।', explanation:'Who relative clause boy के बारे में extra information देता है।', grammarPoint:'Noun + who-clause' },
    { hi:'उसने दरवाज़ा बंद करने के बाद कमरे को साफ़ किया।', en:'After closing the door, he cleaned the room.', hint:'“करने के बाद” = after + V-ing.', explanation:'After closing पहले हुई action दिखाता है और main clause past action बताता है।', grammarPoint:'After + V-ing + main clause' },
    { hi:'शिक्षक ने बताया कि परीक्षा शुक्रवार को होगी।', en:'The teacher said that the examination would be on Friday.', hint:'Past reporting verb said के बाद future-in-the-past would देखें।', explanation:'Reported Speech में will का backshift would हो सकता है।', grammarPoint:'said + that + would' },
    { hi:'यह पुस्तक पढ़ने के लिए बहुत उपयोगी है।', en:'This book is very useful to read.', hint:'“के लिए” purpose/infinitive relation दिखा सकता है।', explanation:'Useful के बाद infinitive to read बताता है कि पुस्तक किस काम के लिए useful है।', grammarPoint:'adjective + to-infinitive' },
  ],
  6: [
    { hi:'यदि मैंने निर्देश पहले पढ़े होते, तो मैं वही गलती नहीं करता।', en:'If I had read the instructions earlier, I would not have made the same mistake.', hint:'Unreal past condition में had + V3 और result में would have + V3।', explanation:'यह Third Conditional है, जो past hypothetical condition/result दिखाता है।', grammarPoint:'If + had + V3, would have + V3' },
    { hi:'यह समझना महत्वपूर्ण है कि लेखक ने यह उदाहरण क्यों दिया।', en:'It is important to understand why the writer gave this example.', hint:'“यह समझना महत्वपूर्ण है” = It is important to understand.', explanation:'It is + adjective + to-infinitive के बाद why-clause reason/explanation देता है।', grammarPoint:'It is + adjective + to V1 + wh-clause' },
    { hi:'गद्यांश स्पष्ट रूप से नहीं बताता कि समस्या कैसे शुरू हुई।', en:'The passage does not state clearly how the problem began.', hint:'Main clause negative है और how-clause embedded question है।', explanation:'Embedded question में statement word order रहता है: how the problem began, न कि how did the problem begin।', grammarPoint:'Negative main clause + embedded wh-clause' },
    { hi:'परिचित शब्द देखकर अनुमान लगाने के बजाय, पाठक को पूरे संदर्भ पर ध्यान देना चाहिए।', en:'Instead of guessing from familiar words, the reader should focus on the full context.', hint:'“के बजाय” = instead of + V-ing; “चाहिए” = should.', explanation:'Instead of के बाद gerund guessing आता है और main clause में should + V1 रहता है।', grammarPoint:'Instead of + V-ing + should + V1' },
  ],
};

const scenarioFactories: Record<number, TranslationFactory> = {
  1: (seed, direction, level) => scenarioFactory(level, scenarioBanks[1], seed, direction),
  2: (seed, direction, level) => scenarioFactory(level, scenarioBanks[2], seed, direction),
  3: (seed, direction, level) => scenarioFactory(level, scenarioBanks[3], seed, direction),
  4: (seed, direction, level) => scenarioFactory(level, scenarioBanks[4], seed, direction),
  5: (seed, direction, level) => scenarioFactory(level, scenarioBanks[5], seed, direction),
  6: (seed, direction, level) => scenarioFactory(level, scenarioBanks[6], seed, direction),
};


type VastSubject = { en: string; hi: string; gender: Gender };
type VastAction = {
  enBase: string;
  enThird: string;
  enIng: string;
  enPast: string;
  hiPresentM: string;
  hiPresentF: string;
  hiPastM: string;
  hiPastF: string;
};
const vastSubjects: VastSubject[] = [
  {en:'Ravi',hi:'रवि',gender:'m'},{en:'Meena',hi:'मीना',gender:'f'},{en:'Arjun',hi:'अर्जुन',gender:'m'},{en:'Nita',hi:'नीता',gender:'f'},
  {en:'Aman',hi:'अमन',gender:'m'},{en:'Tara',hi:'तारा',gender:'f'},{en:'Rohan',hi:'रोहन',gender:'m'},{en:'Priya',hi:'प्रिया',gender:'f'},
  {en:'Kabir',hi:'कबीर',gender:'m'},{en:'Sana',hi:'सना',gender:'f'},{en:'Vivek',hi:'विवेक',gender:'m'},{en:'Anu',hi:'अनु',gender:'f'},
  {en:'Dev',hi:'देव',gender:'m'},{en:'Kavya',hi:'काव्या',gender:'f'},{en:'Mohan',hi:'मोहन',gender:'m'},{en:'Pooja',hi:'पूजा',gender:'f'},
  {en:'Rahul',hi:'राहुल',gender:'m'},{en:'Neha',hi:'नेहा',gender:'f'},{en:'Karan',hi:'करण',gender:'m'},{en:'Isha',hi:'ईशा',gender:'f'},
];
const vastActions: VastAction[] = [
  {enBase:'read the book',enThird:'reads the book',enIng:'reading the book',enPast:'read the book',hiPresentM:'किताब पढ़ता है',hiPresentF:'किताब पढ़ती है',hiPastM:'किताब पढ़ा',hiPastF:'किताब पढ़ी'},
  {enBase:'write a letter',enThird:'writes a letter',enIng:'writing a letter',enPast:'wrote a letter',hiPresentM:'एक पत्र लिखता है',hiPresentF:'एक पत्र लिखती है',hiPastM:'एक पत्र लिखा',hiPastF:'एक पत्र लिखी'},
  {enBase:'solve the problem',enThird:'solves the problem',enIng:'solving the problem',enPast:'solved the problem',hiPresentM:'समस्या हल करता है',hiPresentF:'समस्या हल करती है',hiPastM:'समस्या हल की',hiPastF:'समस्या हल की'},
  {enBase:'check the answer',enThird:'checks the answer',enIng:'checking the answer',enPast:'checked the answer',hiPresentM:'उत्तर जाँचता है',hiPresentF:'उत्तर जाँचती है',hiPastM:'उत्तर जाँचा',hiPastF:'उत्तर जाँचा'},
  {enBase:'open the door',enThird:'opens the door',enIng:'opening the door',enPast:'opened the door',hiPresentM:'दरवाज़ा खोलता है',hiPresentF:'दरवाज़ा खोलती है',hiPastM:'दरवाज़ा खोला',hiPastF:'दरवाज़ा खोला'},
  {enBase:'close the box',enThird:'closes the box',enIng:'closing the box',enPast:'closed the box',hiPresentM:'डिब्बा बंद करता है',hiPresentF:'डिब्बा बंद करती है',hiPastM:'डिब्बा बंद किया',hiPastF:'डिब्बा बंद किया'},
  {enBase:'clean the room',enThird:'cleans the room',enIng:'cleaning the room',enPast:'cleaned the room',hiPresentM:'कमरा साफ़ करता है',hiPresentF:'कमरा साफ़ करती है',hiPastM:'कमरा साफ़ किया',hiPastF:'कमरा साफ़ किया'},
  {enBase:'carry the bag',enThird:'carries the bag',enIng:'carrying the bag',enPast:'carried the bag',hiPresentM:'बैग ले जाता है',hiPresentF:'बैग ले जाती है',hiPastM:'बैग ले गया',hiPastF:'बैग ले गई'},
  {enBase:'answer the question',enThird:'answers the question',enIng:'answering the question',enPast:'answered the question',hiPresentM:'प्रश्न का उत्तर देता है',hiPresentF:'प्रश्न का उत्तर देती है',hiPastM:'प्रश्न का उत्तर दिया',hiPastF:'प्रश्न का उत्तर दिया'},
  {enBase:'watch the film',enThird:'watches the film',enIng:'watching the film',enPast:'watched the film',hiPresentM:'फिल्म देखता है',hiPresentF:'फिल्म देखती है',hiPastM:'फिल्म देखी',hiPastF:'फिल्म देखी'},
  {enBase:'visit the library',enThird:'visits the library',enIng:'visiting the library',enPast:'visited the library',hiPresentM:'पुस्तकालय जाता है',hiPresentF:'पुस्तकालय जाती है',hiPastM:'पुस्तकालय गया',hiPastF:'पुस्तकालय गई'},
  {enBase:'practise the exercise',enThird:'practises the exercise',enIng:'practising the exercise',enPast:'practised the exercise',hiPresentM:'अभ्यास करता है',hiPresentF:'अभ्यास करती है',hiPastM:'अभ्यास किया',hiPastF:'अभ्यास किया'},
  {enBase:'help the teacher',enThird:'helps the teacher',enIng:'helping the teacher',enPast:'helped the teacher',hiPresentM:'शिक्षक की मदद करता है',hiPresentF:'शिक्षक की मदद करती है',hiPastM:'शिक्षक की मदद की',hiPastF:'शिक्षक की मदद की'},
  {enBase:'study the lesson',enThird:'studies the lesson',enIng:'studying the lesson',enPast:'studied the lesson',hiPresentM:'पाठ पढ़ता है',hiPresentF:'पाठ पढ़ती है',hiPastM:'पाठ पढ़ा',hiPastF:'पाठ पढ़ा'},
  {enBase:'explain the example',enThird:'explains the example',enIng:'explaining the example',enPast:'explained the example',hiPresentM:'उदाहरण समझाता है',hiPresentF:'उदाहरण समझाती है',hiPastM:'उदाहरण समझाया',hiPastF:'उदाहरण समझाया'},
  {enBase:'compare the answers',enThird:'compares the answers',enIng:'comparing the answers',enPast:'compared the answers',hiPresentM:'उत्तर की तुलना करता है',hiPresentF:'उत्तर की तुलना करती है',hiPastM:'उत्तर की तुलना की',hiPastF:'उत्तर की तुलना की'},
  {enBase:'choose the option',enThird:'chooses the option',enIng:'choosing the option',enPast:'chose the option',hiPresentM:'विकल्प चुनता है',hiPresentF:'विकल्प चुनती है',hiPastM:'विकल्प चुना',hiPastF:'विकल्प चुना'},
  {enBase:'collect the papers',enThird:'collects the papers',enIng:'collecting the papers',enPast:'collected the papers',hiPresentM:'कागज़ इकट्ठे करता है',hiPresentF:'कागज़ इकट्ठे करती है',hiPastM:'कागज़ इकट्ठे किए',hiPastF:'कागज़ इकट्ठे किए'},
  {enBase:'prepare the notebook',enThird:'prepares the notebook',enIng:'preparing the notebook',enPast:'prepared the notebook',hiPresentM:'कॉपी तैयार करता है',hiPresentF:'कॉपी तैयार करती है',hiPastM:'कॉपी तैयार की',hiPastF:'कॉपी तैयार की'},
  {enBase:'arrange the books',enThird:'arranges the books',enIng:'arranging the books',enPast:'arranged the books',hiPresentM:'किताबें व्यवस्थित करता है',hiPresentF:'किताबें व्यवस्थित करती है',hiPastM:'किताबें व्यवस्थित कीं',hiPastF:'किताबें व्यवस्थित कीं'},
  {enBase:'complete the task',enThird:'completes the task',enIng:'completing the task',enPast:'completed the task',hiPresentM:'काम पूरा करता है',hiPresentF:'काम पूरा करती है',hiPastM:'काम पूरा किया',hiPastF:'काम पूरा किया'},
  {enBase:'revise the chapter',enThird:'revises the chapter',enIng:'revising the chapter',enPast:'revised the chapter',hiPresentM:'अध्याय दोहराता है',hiPresentF:'अध्याय दोहराती है',hiPastM:'अध्याय दोहराया',hiPastF:'अध्याय दोहराया'},
  {enBase:'draw the picture',enThird:'draws the picture',enIng:'drawing the picture',enPast:'drew the picture',hiPresentM:'चित्र बनाता है',hiPresentF:'चित्र बनाती है',hiPastM:'चित्र बनाया',hiPastF:'चित्र बनाया'},
  {enBase:'discuss the story',enThird:'discusses the story',enIng:'discussing the story',enPast:'discussed the story',hiPresentM:'कहानी पर चर्चा करता है',hiPresentF:'कहानी पर चर्चा करती है',hiPastM:'कहानी पर चर्चा की',hiPastF:'कहानी पर चर्चा की'},
];
const vastTimes = [
  {en:'every morning',hi:'हर सुबह'},{en:'every evening',hi:'हर शाम'},{en:'after school',hi:'स्कूल के बाद'},{en:'on Sundays',hi:'रविवार को'},
  {en:'before dinner',hi:'रात के खाने से पहले'},{en:'at the library',hi:'पुस्तकालय में'},{en:'during the lesson',hi:'पाठ के दौरान'},{en:'in the afternoon',hi:'दोपहर में'},
  {en:'on weekdays',hi:'कामकाजी दिनों में'},{en:'before the exam',hi:'परीक्षा से पहले'},{en:'after breakfast',hi:'नाश्ते के बाद'},{en:'in the evening',hi:'शाम को'},
];
const vastPlaces = [
  {en:'the school',hi:'स्कूल'},{en:'the library',hi:'पुस्तकालय'},{en:'the classroom',hi:'कक्षा'},{en:'the market',hi:'बाज़ार'},
  {en:'the playground',hi:'खेल का मैदान'},{en:'the village',hi:'गाँव'},{en:'the station',hi:'स्टेशन'},{en:'the park',hi:'पार्क'},
  {en:'the laboratory',hi:'प्रयोगशाला'},{en:'the reading room',hi:'पठन कक्ष'},{en:'the hall',hi:'सभागार'},{en:'the office',hi:'कार्यालय'},
];
const vastAdjectives = [
  {en:'careful',hiM:'सावधान',hiF:'सावधान'},{en:'honest',hiM:'ईमानदार',hiF:'ईमानदार'},{en:'patient',hiM:'धैर्यवान',hiF:'धैर्यवान'},
  {en:'curious',hiM:'जिज्ञासु',hiF:'जिज्ञासु'},{en:'active',hiM:'सक्रिय',hiF:'सक्रिय'},{en:'confident',hiM:'आत्मविश्वासी',hiF:'आत्मविश्वासी'},
  {en:'focused',hiM:'एकाग्र',hiF:'एकाग्र'},{en:'helpful',hiM:'मददगार',hiF:'मददगार'},{en:'regular',hiM:'नियमित',hiF:'नियमित'},{en:'calm',hiM:'शांत',hiF:'शांत'},
];
const vastPick = <T,>(items:T[], index:number):T => items[((index % items.length)+items.length)%items.length];
const vastIndices = (n:number, lengths:number[]) => lengths.map((len, i) => Math.floor(n / lengths.slice(0,i).reduce((a,b)=>a*b,1)) % len);
const vastBuild = (
  level: TranslationItem['level'],
  direction: TranslationDirection,
  family: number,
  n: number,
): TranslationItem => {
  const subject = vastPick(vastSubjects, n);
  const action = vastPick(vastActions, Math.floor(n / vastSubjects.length));
  const time = vastPick(vastTimes, Math.floor(n / (vastSubjects.length * vastActions.length)));
  const place = vastPick(vastPlaces, Math.floor(n / 17));
  const adj = vastPick(vastAdjectives, Math.floor(n / 19));
  const secondAction = vastPick(vastActions, Math.floor(n / 23) + 7);
  const hiPresent = subject.gender === 'f' ? action.hiPresentF : action.hiPresentM;
  const hiPast = subject.gender === 'f' ? action.hiPastF : action.hiPastM;
  const hiAdj = subject.gender === 'f' ? adj.hiF : adj.hiM;
  let en = '';
  let hi = '';
  let grammarPoint = '';
  let hint = '';
  let explanation = '';
  let steps: string[] = [];
  switch (family) {
    case 0:
      en = subject.en + ' ' + action.enThird + ' ' + time.en + '.';
      hi = subject.hi + ' ' + hiPresent + ' ' + time.hi + '।';
      grammarPoint = 'Simple Present: subject + V-s/es + phrase';
      hint = 'Habit/frequency clue पहचानें; singular name के साथ V-s/es आता है।';
      explanation = 'यह habitual action है। English में singular subject के साथ verb का s/es form और time phrase सही जगह रखा गया है।';
      steps = ['1. Subject पहचानें।','2. Habit/time clue पहचानें।','3. Singular subject के लिए V-s/es चुनें।','4. बाकी phrase जोड़ें।'];
      break;
    case 1:
      en = subject.en + ' does not ' + action.enBase + ' ' + time.en + '.';
      hi = subject.hi + ' ' + time.hi + ' ' + hiPresent.replace(/(ता|ती) है$/, '').trim() + ' नहीं करता/करती।';
      grammarPoint = 'Simple Present Negative: does not + V1';
      hint = 'Negative + singular subject में does not के बाद V1 रखें।';
      explanation = 'Does not already tense carries करता है, इसलिए main verb base form में रहता है।';
      steps = ['1. Negative पहचानें।','2. Singular subject देखें।','3. Does not लगाएँ।','4. Main verb V1 रखें।'];
      break;
    case 2:
      en = 'Does ' + subject.en + ' ' + action.enBase + ' ' + time.en + '?';
      hi = 'क्या ' + subject.hi + ' ' + hiPresent.replace(/(ता|ती) है$/, '').trim() + ' ' + time.hi + '?';
      grammarPoint = 'Simple Present Question: Does + subject + V1?';
      hint = 'क्या... करता/करती है? = Does + subject + V1';
      explanation = 'Does question का tense mark है, इसलिए main verb base form में रहता है।';
      steps = ['1. Question पहचानें।','2. Does लगाएँ।','3. Subject रखें।','4. Main verb V1 रखें।'];
      break;
    case 3:
      en = subject.en + ' is ' + action.enIng + ' ' + time.en + '.';
      hi = subject.hi + ' ' + time.hi + ' ' + (subject.gender === 'f' ? action.hiPresentF.replace(/ता|ती/,'रही') : action.hiPresentM.replace(/ता|ते/,'रहा')) + '।';
      grammarPoint = 'Present Continuous: is + V-ing';
      hint = 'अभी/इस समय चल रहे काम के लिए is + V-ing।';
      explanation = 'Singular subject के साथ is और main verb का -ing form ongoing action दिखाता है।';
      steps = ['1. Ongoing action पहचानें।','2. Singular subject के लिए is रखें।','3. Main verb में -ing लगाएँ।','4. Time phrase जोड़ें।'];
      break;
    case 4:
      en = subject.en + ' ' + action.enPast + ' yesterday.';
      hi = subject.hi + ' ने कल ' + hiPast + '।';
      grammarPoint = 'Simple Past: V2';
      hint = 'Yesterday past-time clue है; main verb का past form चुनें।';
      explanation = 'यह completed past action है। English में V2 और हिन्दी में “ने” वाला past structure है।';
      steps = ['1. Past clue पहचानें।','2. V2 चुनें।','3. Subject + past action बनाएँ।','4. Time clue जोड़ें।'];
      break;
    case 5:
      en = subject.en + ' will ' + action.enBase + ' ' + time.en + '.';
      hi = subject.hi + ' ' + time.hi + ' ' + (subject.gender === 'f' ? 'यह काम करेगी' : 'यह काम करेगा') + '।';
      grammarPoint = 'Future: will + V1';
      hint = 'Future result/action में will + V1 रखें।';
      explanation = 'Will के बाद base verb आता है। हिन्दी अर्थ को भविष्यकाल के स्वाभाविक रूप में रखें।';
      steps = ['1. Future clue पहचानें।','2. Will लगाएँ।','3. Main verb V1 रखें।','4. Time phrase जोड़ें।'];
      break;
    case 6:
      en = subject.en + ' has ' + 'already ' + action.enPast + '.';
      hi = subject.hi + ' पहले ही ' + hiPast + ' है।';
      grammarPoint = 'Present Perfect: has + V3';
      hint = '“पहले ही/already” completed result का clue है।';
      explanation = 'Singular subject के साथ has + past participle (V3) present relevance बताता है।';
      steps = ['1. Completed result पहचानें।','2. Has चुनें।','3. V3 रखें।','4. Already की जगह जाँचें।'];
      break;
    case 7:
      en = subject.en + ' should ' + action.enBase + ' ' + time.en + '.';
      hi = subject.hi + ' को ' + time.hi + ' ' + hiPresent.replace(/(ता|ती) है$/, '').trim() + ' चाहिए।';
      grammarPoint = 'Modal: should + V1';
      hint = 'चाहिए = should; इसके बाद V1 आता है।';
      explanation = 'Should advice/recommendation दिखाता है और उसके बाद main verb base form में रहता है।';
      steps = ['1. Advice पहचानें।','2. Should रखें।','3. Main verb V1 रखें।','4. बाकी phrase जोड़ें।'];
      break;
    case 8:
      en = subject.en + ' ' + action.enPast + ' because ' + subject.en.toLowerCase() + ' wanted to improve.';
      hi = subject.hi + ' ने ' + hiPast + ' क्योंकि ' + (subject.gender === 'f' ? 'वह' : 'वह') + ' सुधार करना ' + (subject.gender === 'f' ? 'चाहती' : 'चाहता') + ' था।';
      grammarPoint = 'Because + clause';
      hint = 'क्योंकि = because; कारण वाला clause बाद में आ सकता है।';
      explanation = 'Main action के बाद कारण बताने के लिए because-clause जोड़ा गया है।';
      steps = ['1. Main action पहचानें।','2. कारण पहचानें।','3. Because से reason clause जोड़ें।','4. दोनों clauses का tense मिलाएँ।'];
      break;
    case 9:
      en = 'If ' + subject.en + ' ' + action.enThird + ', ' + subject.en + ' will ' + secondAction.enBase + ' tomorrow.';
      hi = 'यदि ' + subject.hi + ' ' + hiPresent + ', तो ' + subject.hi + ' कल ' + (subject.gender === 'f' ? 'यह काम करेगी' : 'यह काम करेगा') + '।';
      grammarPoint = 'First Conditional: If + Present, will + V1';
      hint = 'यदि/if condition में present, result में will।';
      explanation = 'First Conditional condition और उसका future result दिखाता है।';
      steps = ['1. If-clause अलग करें।','2. Condition में Simple Present रखें।','3. Result में will + V1 रखें।','4. Cause → result जाँचें।'];
      break;
    case 10:
      en = 'Although ' + subject.en + ' was ' + adj.en + ', ' + subject.en + ' ' + action.enPast + '.';
      hi = 'हालाँकि ' + subject.hi + ' ' + (subject.gender === 'f' ? 'थकी' : 'थका') + ' हुई/हुआ था, फिर भी ' + subject.hi + ' ने ' + hiPast + '।';
      grammarPoint = 'Although + contrast clause';
      hint = 'हालाँकि = although; contrast के बाद main result देखें।';
      explanation = 'Although दो ideas में contrast बनाता है; main action past tense में रखा गया है।';
      steps = ['1. Contrast पहचानें।','2. Although-clause बनाएँ।','3. Main clause में past action रखें।','4. दोनों ideas का संबंध जाँचें।'];
      break;
    default:
      en = 'When ' + subject.en + ' arrived at ' + place.en + ', ' + subject.en + ' was ' + action.enIng + '.';
      hi = 'जब ' + subject.hi + ' ' + place.hi + ' पहुँचा/पहुँची, तब ' + subject.hi + ' ' + (subject.gender === 'f' ? '...' : '...') + '।';
      grammarPoint = 'When + Simple Past, Past Continuous';
      hint = 'एक past event हुआ और दूसरा action उस समय चल रहा था।';
      explanation = 'When-clause completed past event दिखाता है; दूसरे clause में Past Continuous background action दिखाता है।';
      steps = ['1. दोनों past actions अलग करें।','2. When-clause में Simple Past रखें।','3. Ongoing action में was + V-ing रखें।','4. दोनों clauses जोड़ें।'];
      break;
  }
  return makeTranslation('' + family + '-' + n, level, direction, hi, en, hint, explanation, grammarPoint, steps);
};

const vastFamilyMap: Record<number, number[]> = {
  1:[0,1,2,4],
  2:[0,1,2,3,4],
  3:[0,3,4,5,6,7],
  4:[3,4,5,6,7,8,9],
  5:[4,5,6,7,8,10],
  6:[4,6,7,8,9,10,11],
};

const generateVastTranslationItem = (level: number, direction: TranslationDirection, seed: number): TranslationItem => {
  const safeLevel = Math.min(6, Math.max(1, Math.floor(level))) as TranslationItem['level'];
  const families = vastFamilyMap[safeLevel];
  const sequence = Math.max(0, Math.floor(seed));
  const familyPos = sequence % families.length;
  const family = families[familyPos];
  const n = Math.floor(sequence / families.length);
  return vastBuild(safeLevel, direction, family, n);
};

export const generateTranslationItem = (level: number, direction: TranslationDirection, seed: number): TranslationItem => {
  return generateVastTranslationItem(level, direction, seed);
};

const exampleSubjects = ['Riya', 'Kabir', 'Sana', 'Vivek', 'Anu', 'Dev'];
const wordParts: Record<string, 'adjective' | 'verb' | 'adverb' | 'noun'> = {
  happy:'adjective', small:'adjective', begin:'verb', help:'verb', quick:'adjective', clean:'verb',
  easy:'adjective', quiet:'adjective', careful:'adjective', improve:'verb', common:'adjective',
  correct:'adjective', different:'adjective', simple:'adjective', choose:'verb', reason:'noun',
  carefully:'adverb', available:'adjective', similar:'adjective', require:'verb', identify:'verb',
  compare:'verb', evidence:'noun', infer:'verb', passage:'noun', 'main idea':'noun', detail:'noun',
  sequence:'noun', support:'verb', context:'noun', regularly:'adverb', unusual:'adjective',
  cooperation:'noun', accurate:'adjective', essential:'adjective', relevant:'adjective',
  distractor:'noun', interpret:'verb', contrast:'noun', conclusion:'noun',
};

const pickExample = (word: string, subject: string, seed: number): string => {
  const type = wordParts[word] ?? 'noun';
  const variant = Math.abs(hashSeed(seed, 901)) % 4;
  if (type === 'adjective') {
    const templates = [
      `${subject} gave a ${word} answer to the question.`,
      `The teacher said that ${subject}'s explanation was ${word}.`,
      `${subject} found the task ${word} after reading the instructions.`,
      `A ${word} habit can make daily study easier for ${subject}.`,
    ];
    return templates[variant];
  }
  if (type === 'verb') {
    const templates = [
      `${subject} decided to ${word} the question carefully.`,
      `The teacher asked ${subject} to ${word} the important points.`,
      `Regular practice helps ${subject} ${word} faster.`,
      `Before choosing an option, ${subject} tried to ${word} the clues.`,
    ];
    return templates[variant];
  }
  if (type === 'adverb') {
    const templates = [
      `${subject} read the passage ${word} before answering.`,
      `${subject} ${word} checked the instructions twice.`,
      `The student answered the question ${word} during practice.`,
      `${subject} ${word} revised the difficult words.`,
    ];
    return templates[variant];
  }
  const templates = [
    `The teacher explained the ${word} with a simple example to ${subject}.`,
    `${subject} wrote the ${word} in a notebook for later revision.`,
    `Finding the ${word} helped ${subject} understand the question.`,
    `The passage gave ${subject} enough information about the ${word}.`,
  ];
  return templates[variant];
};

export const generateVocabularyItem = (
  level: VocabularyItem['level'] | 'all',
  seed: number,
  base: VocabularyItem[],
): VocabularyItem => {
  const levelItems = level === 'all' ? base : base.filter((item) => item.level === level);
  const fallback = levelItems.length ? levelItems : base;
  const item = fallback[Math.abs(seed) % Math.max(1, fallback.length)];
  const subject = exampleSubjects[Math.abs(hashSeed(seed, 88)) % exampleSubjects.length];
  return {
    ...item,
    id: `gen-v-${level}-${seed}`,
    sentence: pickExample(item.word, subject, seed),
    contextMeaning: `इस नए sentence में “${item.word}” का अर्थ ${item.meaning} ही है; आसपास के words देखकर context confirm करें।`,
  };
};
