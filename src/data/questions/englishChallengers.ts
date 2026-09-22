import type { Question } from '../../types';
import { createQuestion } from '../../utils/questionFactory';

const passage = `Read the passage: Rina's school started a small reading corner after many students said that they wanted a quiet place to read during the lunch break. At first, the corner had only twenty books and two old chairs. Instead of asking the school to buy everything, the students collected storybooks from their homes, cleaned the room, and made simple labels for the shelves. A local shopkeeper donated a floor mat, while two parents gave low wooden shelves. After a month, the reading corner had become one of the busiest places in the school at lunchtime. Teachers noticed that students who visited it regularly were more willing to discuss stories and explain new words. The project also taught the students that improving a shared space did not always require a large amount of money; cooperation and careful use of available resources could make a big difference.`;

const make = (
  id: string,
  question: string,
  options: [string, string, string, string],
  correct: number,
  difficulty: Question['difficulty'],
  tags: string[],
): Question => createQuestion({
  id,
  type: 'mcq',
  subjectId: 'sub_eng',
  chapterId: 'chap_eng_01',
  topicId: 'top_eng_01_01',
  textPlain: `${passage}\n\n${question}`,
  options: options.map((text, index) => ({ id: `opt_${index + 1}`, text })),
  correctOptionIds: [`opt_${correct + 1}`],
  explanationPlain: '',
  difficulty,
  tags,
});

export const englishChapterChallengers: Question[] = [
  make('q_eng_ch_01_001','Why did the school create the reading corner?',[
    'Students wanted a quiet place to read during lunch.',
    'Teachers needed a room for staff meetings.',
    'The shopkeeper asked for a reading room.',
    'The school wanted to remove all old books.'
  ],0,'easy',['comprehension','main-idea']),
  make('q_eng_ch_01_002','What did the students do instead of asking the school to buy everything?',[
    'They closed the project for a month.',
    'They collected books, cleaned the room, and labelled the shelves.',
    'They asked only teachers to donate furniture.',
    'They replaced the reading corner with a playground.'
  ],1,'easy',['comprehension','details']),
  make('q_eng_ch_01_003','Who donated a floor mat?',[
    'A teacher',
    'The students',
    'A local shopkeeper',
    'The school principal'
  ],2,'easy',['comprehension','details']),
  make('q_eng_ch_01_004','How many books were in the corner at first?',[
    'Ten',
    'Twenty',
    'Thirty',
    'Forty'
  ],1,'easy',['comprehension','details']),
  make('q_eng_ch_01_005','Which statement best describes what happened after one month?',[
    'The reading corner was rarely used.',
    'The reading corner became one of the busiest lunchtime places.',
    'Students stopped bringing books from home.',
    'Teachers moved all classes into the corner.'
  ],1,'medium',['comprehension','inference']),
  make('q_eng_ch_01_006','What did teachers notice about students who visited the corner regularly?',[
    'They became less interested in stories.',
    'They were more willing to discuss stories and explain new words.',
    'They stopped talking to classmates.',
    'They preferred only mathematics books.'
  ],1,'medium',['comprehension','inference']),
  make('q_eng_ch_01_007','What is the main lesson of the passage?',[
    'A school needs expensive furniture before students can learn.',
    'Only adults can improve shared school spaces.',
    'Cooperation and careful use of resources can create useful changes.',
    'Reading is useful only during lunch breaks.'
  ],2,'medium',['comprehension','main-idea']),
  make('q_eng_ch_01_008','The word “donated” in the passage most nearly means:',[
    'gave something without asking for payment',
    'borrowed something for a short time',
    'sold something at a high price',
    'hid something from others'
  ],0,'medium',['comprehension','vocabulary']),
  make('q_eng_ch_01_009','Why is the sentence about the project not requiring a large amount of money important to the passage?',[
    'It explains that the students had no books at home.',
    'It shows that cooperation and available resources were central to the project.',
    'It proves that the shopkeeper paid for the entire project.',
    'It shows that teachers refused to help.'
  ],1,'hard',['comprehension','inference','critical-reading']),
  make('q_eng_ch_01_010','Which sequence matches the passage?',[
    'The corner became busy → students collected books → the room was created.',
    'Students collected books and cleaned the room → others donated resources → the corner became busy.',
    'The shopkeeper opened the corner → teachers donated books → students removed the shelves.',
    'Parents built a new room → students stopped reading → the corner was closed.'
  ],1,'hard',['comprehension','sequence']),
  make('q_eng_ch_01_011','What can be inferred about the students who helped with the project?',[
    'They were unwilling to share responsibilities.',
    'They could solve practical problems by working together.',
    'They depended completely on the school to provide materials.',
    'They were interested only in furniture.'
  ],1,'hard',['comprehension','inference']),
  make('q_eng_ch_01_012','In the passage, “available resources” refers mainly to:',[
    'Things that were already accessible and could be used for the project',
    'Money that the school borrowed from a bank',
    'Books that had already been thrown away',
    'Materials available only in another town'
  ],0,'hard',['comprehension','vocabulary']),
  make('q_eng_ch_01_013','Which detail best supports the idea that the project encouraged community cooperation?',[
    'The corner began with only two chairs.',
    'The school had a lunch break.',
    'A shopkeeper and parents contributed materials while students did the work.',
    'Teachers noticed that students discussed stories.'
  ],2,'challenge',['comprehension','evidence','critical-reading']),
  make('q_eng_ch_01_014','What would be the best title for the passage?',[
    'A Very Expensive School Project',
    'How a Shared Reading Space Grew Through Cooperation',
    'Why Lunch Breaks Should Be Longer',
    'The Problems Caused by Old Chairs'
  ],1,'challenge',['comprehension','main-idea','title']),
];

export const englishChapterChallengerAudit = {
  chapterId: 'chap_eng_01',
  questionCount: englishChapterChallengers.length,
  uniqueIds: new Set(englishChapterChallengers.map((question) => question.id)).size,
};
