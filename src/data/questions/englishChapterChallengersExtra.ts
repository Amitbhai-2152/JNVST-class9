import type { Question } from '../../types';
import { createQuestion } from '../../utils/questionFactory';

const passage = 'Read the passage: A school eco-club noticed that many students left empty water bottles near the sports ground. The club first placed clearly labelled bins at three convenient points. Members then made a short announcement explaining why sorting waste mattered. During the following weeks, students began using the bins more regularly. The club later counted the collected bottles and sent them to a recycling centre through a local partner. The activity showed that clear instructions, convenient facilities, and regular follow-up could change a simple school habit.';

const make = (
  id: string,
  chapterId: string,
  topicId: string,
  question: string,
  options: [string, string, string, string],
  correct: number,
  difficulty: Question['difficulty'],
  tags: string[],
): Question => createQuestion({
  id,
  type: 'mcq',
  subjectId: 'sub_eng',
  chapterId,
  topicId,
  textPlain: chapterId === 'chap_eng_01' ? passage + '\n\n' + question : question,
  options: options.map((text, index) => ({ id: 'opt_' + (index + 1), text })),
  correctOptionIds: ['opt_' + (correct + 1)],
  explanationPlain: 'The correct answer is: ' + options[correct],
  difficulty,
  tags,
});

export const englishChapterChallengersExtra: Question[] = [
  make('q_eng_ch_02_001','chap_eng_02','top_eng_02_01','Which sentence has “quietly” functioning as an adverb?',['The quiet room was empty.','The students waited quietly outside.','She carried a quiet bag.','Quiet music filled the hall.'],1,'medium',['parts-of-speech','adverb']),
  make('q_eng_ch_02_002','chap_eng_02','top_eng_02_01','Which option is a complete sentence?',['Although the rain was heavy.','Across the crowded playground.','The captain thanked the volunteers.','Because the bus arrived late.'],2,'hard',['sentence-structure','complete-sentence']),
  make('q_eng_ch_02_003','chap_eng_02','top_eng_02_01','In “The clever girl solved the puzzle”, which word is the adjective?',['clever','girl','solved','puzzle'],0,'easy',['parts-of-speech','adjective']),
  make('q_eng_ch_02_004','chap_eng_02','top_eng_02_01','Which sentence has a clear subject and predicate?',['Running across the field quickly.','The old bridge collapsed during the storm.','When the bell rang.','After the match.'],1,'medium',['sentence-structure','subject','predicate']),
  make('q_eng_ch_02_005','chap_eng_02','top_eng_02_01','Which word is the subject in “My younger brother studies every evening”?',['younger','brother','studies','evening'],1,'easy',['sentence-structure','subject']),
  make('q_eng_ch_02_006','chap_eng_02','top_eng_02_01','Which sentence contains a noun used as the name of a place?',['The market opens early.','The bright lamp shines.','She walked quickly.','They arrived silently.'],0,'medium',['parts-of-speech','noun']),
  make('q_eng_ch_02_007','chap_eng_02','top_eng_02_01','Which option is a sentence fragment?',['The children played outside.','Our teacher explained the rule.','Because the road was flooded.','The bus reached the station.'],2,'challenge',['sentence-structure','fragment']),

  make('q_eng_ch_02_008','chap_eng_02','top_eng_02_02','Choose the correctly spelt word.',['separate','seperate','seperete','separete'],0,'easy',['spelling']),
  make('q_eng_ch_02_009','chap_eng_02','top_eng_02_02','Choose the correctly spelt word.',['receive','recieve','receeve','receve'],0,'medium',['spelling']),
  make('q_eng_ch_02_010','chap_eng_02','top_eng_02_02','Choose the correctly spelt word.',['February','Febuary','Februry','Febraury'],0,'hard',['spelling']),
  make('q_eng_ch_02_011','chap_eng_02','top_eng_02_02','Choose the correctly spelt word.',['principal','pricipal','principel','principleal'],0,'medium',['spelling','common-trap']),
  make('q_eng_ch_02_012','chap_eng_02','top_eng_02_02','Choose the correctly spelt word.',['knowledge','knowlege','knowladge','knowlage'],0,'challenge',['spelling']),
  make('q_eng_ch_02_013','chap_eng_02','top_eng_02_02','Which spelling is correct in the sentence “The road was ___ after the storm”?',['impassable','impassible','impasable','inpassable'],0,'hard',['spelling','context']),
  make('q_eng_ch_02_014','chap_eng_02','top_eng_02_02','Choose the correctly spelt word.',['achievement','acheivement','achievment','achivement'],0,'challenge',['spelling']),

  make('q_eng_ch_02_015','chap_eng_02','top_eng_02_03','Arrange the words: “the prize / won / our team / yesterday”.',['Our team won the prize yesterday.','Won yesterday our team the prize.','The prize our team won yesterday.','Yesterday won the prize our team.'],0,'easy',['jumbled-words']),
  make('q_eng_ch_02_016','chap_eng_02','top_eng_02_03','Arrange the words: “carefully / the teacher / explained / the rule”.',['The rule carefully explained the teacher.','The teacher explained the rule carefully.','Explained the teacher carefully the rule.','Carefully the rule the teacher explained.'],1,'medium',['jumbled-words']),
  make('q_eng_ch_02_017','chap_eng_02','top_eng_02_03','Arrange the words: “after the bell / students / left / the classroom”.',['Students left the classroom after the bell.','After the bell the classroom left students.','Left students after the bell the classroom.','The classroom after the bell students left.'],0,'hard',['jumbled-words','sentence-order']),
  make('q_eng_ch_02_018','chap_eng_02','top_eng_02_03','Arrange the words: “a new library / opened / the school / last month”.',['Last month a new library the school opened.','The school opened a new library last month.','Opened the school a new library last month.','A new library last month opened the school.'],1,'hard',['jumbled-words']),
  make('q_eng_ch_02_019','chap_eng_02','top_eng_02_03','Arrange the words: “because he was ill / missed / Rahul / the class”.',['Rahul missed the class because he was ill.','Because he was ill Rahul the class missed.','Missed Rahul because he was ill the class.','The class Rahul missed because he was ill.'],0,'challenge',['jumbled-words','cause-effect']),
  make('q_eng_ch_02_020','chap_eng_02','top_eng_02_03','Arrange the words: “to solve / tried / the problem / she / carefully”.',['Tried she carefully the problem to solve.','She carefully tried to solve the problem.','The problem she tried carefully to solve.','Carefully the problem tried she to solve.'],1,'challenge',['jumbled-words','sentence-order']),

  make('q_eng_ch_03_001','chap_eng_03','top_eng_03_01','Choose the correct tense: “By the time I reached the station, the train ___.”',['has left','had left','leaves','will leave'],1,'challenge',['tenses','past-perfect']),
  make('q_eng_ch_03_002','chap_eng_03','top_eng_03_01','Choose the correct tense: “She ___ her homework before dinner yesterday.”',['has finished','finishes','had finished','will finish'],2,'hard',['tenses','past-perfect']),
  make('q_eng_ch_03_003','chap_eng_03','top_eng_03_01','Choose the correct form: “They ___ football when it started to rain.”',['play','were playing','have played','will play'],1,'medium',['tenses','past-continuous']),
  make('q_eng_ch_03_004','chap_eng_03','top_eng_03_01','Choose the correct form: “I ___ this poem three times already.”',['read','have read','was reading','will read'],1,'hard',['tenses','present-perfect']),
  make('q_eng_ch_03_005','chap_eng_03','top_eng_03_01','Choose the correct tense: “Water ___ at 100°C under normal conditions.”',['boiled','boils','is boiling yesterday','will boil every day'],1,'easy',['tenses','simple-present']),
  make('q_eng_ch_03_006','chap_eng_03','top_eng_03_01','Choose the correct form: “We ___ the project next week.”',['completed','have completed','will complete','were completing yesterday'],2,'medium',['tenses','simple-future']),
  make('q_eng_ch_03_007','chap_eng_03','top_eng_03_01','Choose the correct form: “While I was reading, my sister ___ music.”',['listens','has listened','was listening','will listen'],2,'challenge',['tenses','past-continuous']),

  make('q_eng_ch_03_008','chap_eng_03','top_eng_03_02','Choose the modal that expresses strong necessity: “You ___ wear your identity card.”',['might','must','could','may'],1,'easy',['modals','obligation']),
  make('q_eng_ch_03_009','chap_eng_03','top_eng_03_02','Choose the modal for a polite request: “___ you please close the window?”',['Must','Could','Need','Ought'],1,'medium',['modals','requests']),
  make('q_eng_ch_03_010','chap_eng_03','top_eng_03_02','Choose the modal that expresses possibility: “It ___ be cloudy this evening.”',['might','mustn’t','shouldn’t','needn’t'],0,'medium',['modals','possibility']),
  make('q_eng_ch_03_011','chap_eng_03','top_eng_03_02','Choose the best advice: “You ___ check the question before choosing an answer.”',['may','should','mustn’t','can’t'],1,'hard',['modals','advice']),
  make('q_eng_ch_03_012','chap_eng_03','top_eng_03_02','Choose the modal that expresses permission: “Students ___ use the library after class.”',['may','must','shouldn’t','needn’t'],0,'easy',['modals','permission']),
  make('q_eng_ch_03_013','chap_eng_03','top_eng_03_02','Choose the best modal: “You ___ not touch a wet electrical wire.”',['can','must','might','could'],1,'hard',['modals','prohibition']),
  make('q_eng_ch_03_014','chap_eng_03','top_eng_03_02','Choose the best modal: “With more practice, she ___ solve harder questions.”',['can','mustn’t','may not','shouldn’t'],0,'challenge',['modals','ability']),

  make('q_eng_ch_03_015','chap_eng_03','top_eng_03_03','Choose the correct preposition: “The cat is hiding ___ the bed.”',['under','since','during','towards'],0,'easy',['prepositions','place']),
  make('q_eng_ch_03_016','chap_eng_03','top_eng_03_03','Choose the correct preposition: “The meeting starts ___ 9 a.m.”',['in','at','on','for'],1,'easy',['prepositions','time']),
  make('q_eng_ch_03_017','chap_eng_03','top_eng_03_03','Choose the correct preposition: “We waited ___ an hour.”',['since','for','at','by'],1,'medium',['prepositions','time']),
  make('q_eng_ch_03_018','chap_eng_03','top_eng_03_03','Choose the correct preposition: “She walked ___ the river.”',['along','since','during','at'],0,'medium',['prepositions','movement']),
  make('q_eng_ch_03_019','chap_eng_03','top_eng_03_03','Choose the correct preposition: “The teacher divided the sweets ___ the children.”',['among','since','during','towards'],0,'hard',['prepositions','among']),
  make('q_eng_ch_03_020','chap_eng_03','top_eng_03_03','Choose the best preposition: “The picture hangs ___ the wall.”',['under','on','since','between'],1,'challenge',['prepositions','place']),

  make('q_eng_ch_04_001','chap_eng_04','top_eng_04_01','Choose the passive form: “The gardener waters the plants every morning.”',['The plants are watered every morning by the gardener.','The plants were watered yesterday by the gardener.','The gardener is watered by the plants.','The plants water the gardener every morning.'],0,'easy',['passive-voice','simple-present']),
  make('q_eng_ch_04_002','chap_eng_04','top_eng_04_01','Choose the passive form: “The storm damaged several houses.”',['Several houses damage the storm.','Several houses were damaged by the storm.','Several houses are damaged by the storm yesterday.','The storm was damaged by several houses.'],1,'medium',['passive-voice','simple-past']),
  make('q_eng_ch_04_003','chap_eng_04','top_eng_04_01','Choose the active form: “The trophy was lifted by the captain.”',['The captain lifted the trophy.','The captain was lifted by the trophy.','The trophy lifted the captain.','The captain lifts the trophy yesterday.'],0,'medium',['passive-voice','active-voice']),
  make('q_eng_ch_04_004','chap_eng_04','top_eng_04_01','Choose the passive form: “The workers are painting the bridge.”',['The bridge is painted by the workers.','The bridge was being painted by the workers.','The bridge is being painted by the workers.','The workers are painted by the bridge.'],2,'hard',['passive-voice','present-continuous']),
  make('q_eng_ch_04_005','chap_eng_04','top_eng_04_01','Choose the passive form: “The school will organize the exhibition.”',['The exhibition will be organized by the school.','The exhibition is organized by the school yesterday.','The school will be organized by the exhibition.','The exhibition was organized by the school.'],0,'challenge',['passive-voice','future']),
  make('q_eng_ch_04_006','chap_eng_04','top_eng_04_01','Which sentence cannot normally be changed into a standard passive because it has no suitable direct object?',['The boy opened the gate.','The driver repaired the bus.','The baby slept peacefully.','The teacher checked the answers.'],2,'challenge',['passive-voice','objects','reasoning']),
  make('q_eng_ch_04_007','chap_eng_04','top_eng_04_01','Choose the correct passive structure: “They are cleaning the room.”',['The room is cleaning them.','The room is being cleaned by them.','The room was cleaned by them yesterday.','They are being cleaned by the room.'],1,'hard',['passive-voice','present-continuous']),

  make('q_eng_ch_04_008','chap_eng_04','top_eng_04_02','Change to reported speech: Mohan said, “I can swim.”',['Mohan said that he could swim.','Mohan said that I can swim.','Mohan says that he could swim yesterday.','Mohan told that he can swimming.'],0,'easy',['reported-speech','modals']),
  make('q_eng_ch_04_009','chap_eng_04','top_eng_04_02','Change to reported speech: She said, “I am reading now.”',['She said that she is reading now yesterday.','She said that she was reading then.','She said that I was reading now.','She asked that she was reading.'],1,'medium',['reported-speech','time-expression']),
  make('q_eng_ch_04_010','chap_eng_04','top_eng_04_02','Change to reported speech: Ravi said to me, “Where do you live?”',['Ravi asked me where I lived.','Ravi said me where did I live.','Ravi asked that where do I live.','Ravi told me where I live yesterday.'],0,'hard',['reported-speech','questions']),
  make('q_eng_ch_04_011','chap_eng_04','top_eng_04_02','Change to reported speech: The teacher said, “Work hard.”',['The teacher said that work hard.','The teacher advised the students to work hard.','The teacher asked that the students worked hard.','The teacher told to work hardly.'],1,'medium',['reported-speech','advice','imperative']),
  make('q_eng_ch_04_012','chap_eng_04','top_eng_04_02','Change to reported speech: Anu said, “I will call you tomorrow.”',['Anu said that she would call me the next day.','Anu said that I will call her tomorrow.','Anu asked that she will call me yesterday.','Anu told me that I would call you tomorrow.'],0,'challenge',['reported-speech','future-in-past','time-expression']),
  make('q_eng_ch_04_013','chap_eng_04','top_eng_04_02','Which reporting verb best fits a yes/no question?',['asked','shouted','advised','promised'],0,'challenge',['reported-speech','reporting-verbs']),

  make('q_eng_ch_04_014','chap_eng_04','top_eng_04_03','Choose the correct comparative form of “strong”.',['more strong','stronger','strongest','most strong'],1,'easy',['degrees-of-comparison','comparative']),
  make('q_eng_ch_04_015','chap_eng_04','top_eng_04_03','Choose the correct superlative form of “careful”.',['carefulest','more careful','most careful','carefuller'],2,'easy',['degrees-of-comparison','superlative']),
  make('q_eng_ch_04_016','chap_eng_04','top_eng_04_03','Choose the correct comparative sentence.',['This road is narrower than that one.','This road is narrowest than that one.','This road is more narrower than that one.','This road is as narrow than that one.'],0,'medium',['degrees-of-comparison','comparative']),
  make('q_eng_ch_04_017','chap_eng_04','top_eng_04_03','Choose the correct positive-degree sentence expressing equality.',['Asha is as intelligent as Meera.','Asha is more intelligent as Meera.','Asha is most intelligent as Meera.','Asha is intelligent than Meera.'],0,'medium',['degrees-of-comparison','positive-degree']),
  make('q_eng_ch_04_018','chap_eng_04','top_eng_04_03','Choose the sentence with a correctly formed superlative.',['This is the most useful answer.','This is the more useful answer of all.','This is the usefulest answer.','This is most useful than that answer.'],0,'hard',['degrees-of-comparison','superlative']),
  make('q_eng_ch_04_019','chap_eng_04','top_eng_04_03','Choose the best transformation: “No other metal is as useful as iron.”',['Iron is more useful than any other metal.','Iron is the most useful metal.','Very few metals are as useful as iron.','Iron is useful than all metal.'],1,'challenge',['degrees-of-comparison','transformation']),
  make('q_eng_ch_04_020','chap_eng_04','top_eng_04_03','Choose the correct comparative sentence.',['This exercise is difficult than the last one.','This exercise is more difficult than the last one.','This exercise is most difficult than the last one.','This exercise is difficulter than the last one.'],1,'challenge',['degrees-of-comparison','comparative']),
];
