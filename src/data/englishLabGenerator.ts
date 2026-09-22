import type { TranslationDirection, TranslationItem, VocabularyItem } from './englishLabs';

const names = ['Ravi', 'Meena', 'Arjun', 'Nita', 'Aman', 'Tara', 'Rohan', 'Priya'];
const objects = ['the book', 'the question', 'the letter', 'the door', 'the garden', 'the answer', 'the bag', 'the lesson'];
const places = ['the school', 'the library', 'the market', 'the classroom', 'the station', 'the village'];
const times = ['every morning', 'every evening', 'after school', 'on Sundays', 'before dinner'];
const adjectives = ['careful', 'helpful', 'honest', 'patient', 'active', 'curious'];
const actions = ['study', 'read', 'help', 'play', 'clean', 'practise'];

const hindiName: Record<string, string> = { Ravi:'रवि', Meena:'मीना', Arjun:'अर्जुन', Nita:'नीता', Aman:'अमन', Tara:'तारा', Rohan:'रोहन', Priya:'प्रिया' };
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
  const hiVerb: Record<string,string> = { reads:'पढ़ता है', opens:'खोलता है', checks:'जाँचता है', cleans:'साफ़ करता है', answers:'उत्तर देता है' };
  const en = `${name} ${verb} ${object} ${time}.`;
  const hi = `${hindiName[name]} ${hindiObject[object]} ${hiVerb[verb]} ${hindiTime[time]}।`;
  return direction === 'hi-en'
    ? { id:`gen-tr-${seed}`,level:1,direction,prompt:hi,acceptableAnswers:[en],displayAnswer:en,hint:`${hindiName[name]} = ${name}. समय-संकेत “${hindiTime[time]}” आदत दिखाता है।`,explanation:`पहले subject पहचानें, फिर habit के लिए Simple Present लगाएँ। ${name} singular है, इसलिए verb में s/es आता है। अंत में object और time phrase जोड़ें।`,grammarPoint:'Subject + V1(s/es) + Object + Time'}
    : { id:`gen-tr-${seed}`,level:1,direction,prompt:en,acceptableAnswers:[hi],displayAnswer:hi,hint:`${name} = ${hindiName[name]}; ${verb} = ${hiVerb[verb]}.`,explanation:`पहले subject और main verb पहचानें। यह habitual action है, इसलिए हिन्दी में सामान्य वर्तमानकाल का अर्थ रखें और time phrase अंत में जोड़ें।`,grammarPoint:'Simple Present → हिन्दी सामान्य वर्तमानकाल' };
};

const presentContinuous = (seed:number, direction:TranslationDirection): TranslationItem => {
  const name=pick(names,hashSeed(seed,21)); const action=pick(['study','read','clean','play','write'],hashSeed(seed,22));
  const enVerb:Record<string,string>={study:'studying',read:'reading',clean:'cleaning',play:'playing',write:'writing'};
  const hiVerb:Record<string,string>={study:'पढ़ रहा है',read:'पढ़ रहा है',clean:'साफ़ कर रहा है',play:'खेल रहा है',write:'लिख रहा है'};
  const en=`${name} is ${enVerb[action]} now.`; const hi=`${hindiName[name]} अभी ${hiVerb[action]}।`;
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
  const hi=`हालाँकि प्रश्न कठिन था, ${hindiName[name]} ${hindiAdj[adj]} रहा/रही और हर विकल्प को ध्यान से जाँचा।`;
  return direction==='hi-en'
    ? {id:`gen-tr-${seed}`,level:6,direction,prompt:hi,acceptableAnswers:[en],displayAnswer:en,hint:'“हालाँकि” = although; “ध्यान से” = carefully.',explanation:'पहले contrast clause बनाइए: Although + past clause. फिर main clause में past action रखें और adjective को linking verb के बाद रखें.',grammarPoint:'Although + clause + main clause'}
    : {id:`gen-tr-${seed}`,level:6,direction,prompt:en,acceptableAnswers:[hi],displayAnswer:hi,hint:'although = हालाँकि; remained = बना/रहा।',explanation:'Although contrast दिखाता है। फिर main clause का action और manner phrase हिन्दी में रखें.',grammarPoint:'Contrast + past action + adverb' };
};

export const generateTranslationItem = (level:number, direction:TranslationDirection, seed:number): TranslationItem => {
  const bucket = ((seed % 5) + 5) % 5;
  if (level <= 1) return simplePresent(seed + bucket * 101, direction);
  if (level === 2) return presentContinuous(seed + bucket * 101, direction);
  if (level === 3) return pastFuture(seed + bucket * 101, direction);
  if (level === 4) return conditionalPassive(seed + bucket * 101, direction);
  if (level === 5) return conditionalPassive(seed + 707, direction);
  return advanced(seed + bucket * 101, direction);
};

const exampleSubjects = ['Riya', 'Kabir', 'Sana', 'Vivek', 'Anu', 'Dev'];
const exampleTemplates = [
  (w:string,s:string)=>`${s} was ${w} when the teacher asked a question.`,
  (w:string,s:string)=>`${s} kept a ${w} idea in mind while solving the problem.`,
  (w:string,s:string)=>`The ${w} student helped a classmate after school.`,
  (w:string,s:string)=>`Reading about the topic made the lesson less ${w} for ${s}.`,
  (w:string,s:string)=>`${s} used the ${w} lesson in a real situation.`,
];

export const generateVocabularyItem = (
  level: VocabularyItem['level'],
  seed: number,
  base: VocabularyItem[],
): VocabularyItem => {
  const levelItems = base.filter((item) => item.level === level);
  const fallback = levelItems.length ? levelItems : base;
  const item = fallback[Math.abs(seed) % Math.max(1, fallback.length)];
  const subject = exampleSubjects[Math.abs(hashSeed(seed, 88)) % exampleSubjects.length];
  const sentenceFactory = exampleTemplates[Math.abs(hashSeed(seed, 89)) % exampleTemplates.length];
  return {
    ...item,
    id: `gen-v-${level}-${seed}`,
    sentence: sentenceFactory(item.word, subject),
    contextMeaning: `इस नए sentence में “${item.word}” का अर्थ ${item.meaning} ही है; आसपास के शब्द देखकर context confirm करें।`,
  };
};
