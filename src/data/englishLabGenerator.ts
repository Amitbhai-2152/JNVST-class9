import type { TranslationDirection, TranslationItem, VocabularyItem } from './englishLabs';

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

const pick = <T,>(items: T[], seed: number): T => items[Math.abs(seed) % items.length];

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

export const generateTranslationItem = (level:number, direction:TranslationDirection, seed:number): TranslationItem => {
  const bucket = ((seed % 5) + 5) % 5;
  const item =
    level <= 1 ? simplePresent(seed + bucket * 101, direction) :
    level === 2 ? presentContinuous(seed + bucket * 101, direction) :
    level === 3 ? pastFuture(seed + bucket * 101, direction) :
    level === 4 ? conditionalPassive(seed + bucket * 101, direction) :
    level === 5 ? conditionalPassive(seed + 707, direction) :
    advanced(seed + bucket * 101, direction);

  const buildStepsByLevel: Record<number, string[]> = {
    1: ['1. Subject पहचानें: कौन काम कर रहा है?', '2. Time/habit clue पहचानें.', '3. Simple Present का सही verb form चुनें.', '4. Object/place/time को जोड़कर पूरा natural sentence बनाएं.'],
    2: ['1. “अभी/now” जैसे ongoing clue पहचानें.', '2. Subject के अनुसार is/am/are चुनें.', '3. Main verb में -ing लगाएँ.', '4. बाकी information सही क्रम में जोड़ें.'],
    3: ['1. Past/future time clue पहचानें.', '2. Past हो तो V2; future हो तो will + V1 चुनें.', '3. Subject और object की जगह सही रखें.', '4. पूरे sentence का time meaning दोबारा जाँचें.'],
    4: ['1. Sentence का relationship पहचानें: condition, passive या comparison.', '2. हर clause का tense/form अलग तय करें.', '3. Main verb का सही structure लगाएँ.', '4. Grammar के बाद meaning से cross-check करें.'],
    5: ['1. Meaning को छोटे clauses में बाँटें.', '2. Connector/condition पहचानें.', '3. हर clause में सही tense और verb form लगाएँ.', '4. Final sentence natural और logically complete है या नहीं देखें.'],
    6: ['1. Main clause और supporting clause अलग करें.', '2. Connector जैसे although/relative/contrast पहचानें.', '3. Tense और clause structure बनाएं.', '4. Vocabulary का exact meaning रखें.', '5. अंत में पूरा translation मूल meaning से मिलाएँ.'],
  };

  return { ...item, buildSteps: buildStepsByLevel[level] ?? buildStepsByLevel[6] };
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
  level: VocabularyItem['level'],
  seed: number,
  base: VocabularyItem[],
): VocabularyItem => {
  const levelItems = base.filter((item) => item.level === level);
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
