import { Question } from '../../types';
import { createQuestion } from '../../utils/questionFactory';

// ==========================================
// BATCH 1: 50 Questions (Exactly as locked previously)
// ==========================================
const englishQuestionsBatch1: Question[] = [
  createQuestion({
    id: 'q_eng_01_001',
    type: 'mcq',
    subjectId: 'sub_eng',
    chapterId: 'chap_eng_01',
    topicId: 'top_eng_01_01',
    textPlain: "Read the passage: A healthy lifestyle is built upon three pillars: balanced nutrition, regular physical activity, and adequate rest. While many people focus intensely on diet, they often ignore the restorative power of sleep. During deep sleep, the body repairs tissues, consolidates memories, and strengthens the immune system. Depriving oneself of sleep merely to study or work longer often backfires, reducing overall daily efficiency. What is the primary function of deep sleep according to the passage?",
    options: [
      { id: 'opt_1', text: 'To repair the body and support memory and immunity' },
      { id: 'opt_2', text: 'To increase the need for food' },
      { id: 'opt_3', text: 'To replace physical activity' },
      { id: 'opt_4', text: 'To reduce the need for studying' }
    ],
    correctOptionIds: ['opt_1'],
    explanationPlain: 'The passage directly states that during deep sleep the body repairs tissues, consolidates memories, and strengthens the immune system.',
    difficulty: 'easy',
    tags: ['comprehension', 'main-idea']
  }),
  createQuestion({
    id: 'q_eng_01_002',
    type: 'mcq',
    subjectId: 'sub_eng',
    chapterId: 'chap_eng_01',
    topicId: 'top_eng_01_01',
    textPlain: "Based on the same passage, what is the consequence of depriving oneself of sleep to work longer?",
    options: [
      { id: 'opt_1', text: 'It always increases daily efficiency.' },
      { id: 'opt_2', text: 'It can reduce overall daily efficiency.' },
      { id: 'opt_3', text: 'It makes the immune system unnecessary.' },
      { id: 'opt_4', text: 'It guarantees better memory.' }
    ],
    correctOptionIds: ['opt_2'],
    explanationPlain: 'The passage says that cutting sleep short to work or study longer often backfires and reduces overall daily efficiency.',
    difficulty: 'easy',
    tags: ['comprehension', 'inference']
  }),
  createQuestion({
    id: 'q_eng_01_003',
    type: 'multiple-select',
    subjectId: 'sub_eng',
    chapterId: 'chap_eng_01',
    topicId: 'top_eng_01_01',
    textPlain: 'Which two ideas are explicitly mentioned as benefits of deep sleep in the passage? (Select all that apply)',
    options: [
      { id: 'opt_1', text: 'Improving memory consolidation' },
      { id: 'opt_2', text: 'Strengthening the immune system' },
      { id: 'opt_3', text: 'Making people skip meals' },
      { id: 'opt_4', text: 'Replacing all exercise' }
    ],
    correctOptionIds: ['opt_1', 'opt_2'],
    explanationPlain: 'The passage explicitly mentions memory consolidation and immune-system support as benefits of deep sleep.',
    difficulty: 'medium',
    tags: ['comprehension', 'details', 'multiple-select']
  }),
  createQuestion({
    id: 'q_eng_01_004',
    type: 'mcq',
    subjectId: 'sub_eng',
    chapterId: 'chap_eng_01',
    topicId: 'top_eng_01_01',
    textPlain: "What does the word 'restorative' most nearly mean in the context of the passage?",
    options: [
      { id: 'opt_1', text: 'Having a repairing or renewing effect' },
      { id: 'opt_2', text: 'Making something more expensive' },
      { id: 'opt_3', text: 'Making something difficult to understand' },
      { id: 'opt_4', text: 'Causing physical activity' }
    ],
    correctOptionIds: ['opt_1'],
    explanationPlain: 'Restorative means helping something recover, repair, or regain strength.',
    difficulty: 'medium',
    tags: ['comprehension', 'vocabulary']
  }),
  createQuestion({
    id: 'q_eng_01_005',
    type: 'true-false',
    subjectId: 'sub_eng',
    chapterId: 'chap_eng_01',
    topicId: 'top_eng_01_01',
    textPlain: 'True or False: The passage says that focusing only on diet is enough to maintain a healthy lifestyle.',
    options: [
      { id: 'opt_true', text: 'True' },
      { id: 'opt_false', text: 'False' }
    ],
    correctOptionIds: ['opt_false'],
    explanationPlain: 'False. The passage says a healthy lifestyle has three pillars: balanced nutrition, regular physical activity, and adequate rest.',
    difficulty: 'challenge',
    tags: ['comprehension', 'critical-reading']
  }),

  // ==========================================
  // TOPIC 2: Word and Sentence Structure
  // ==========================================
  createQuestion({
    id: 'q_eng_02_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_01',
    textPlain: 'Which word is an adjective in the sentence: “The bright stars filled the sky.”?',
    options: [
      { id: 'opt_1', text: 'bright' }, { id: 'opt_2', text: 'stars' }, { id: 'opt_3', text: 'filled' }, { id: 'opt_4', text: 'sky' }
    ], correctOptionIds: ['opt_1'], explanationPlain: 'Bright describes the noun stars, so it is an adjective.', difficulty: 'easy', tags: ['parts-of-speech', 'adjective']
  }),
  createQuestion({
    id: 'q_eng_02_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_01',
    textPlain: 'In the sentence “Ravi plays football every evening”, which word is the subject?',
    options: [
      { id: 'opt_1', text: 'Ravi' }, { id: 'opt_2', text: 'plays' }, { id: 'opt_3', text: 'football' }, { id: 'opt_4', text: 'evening' }
    ], correctOptionIds: ['opt_1'], explanationPlain: 'Ravi is the person performing the action, so Ravi is the subject.', difficulty: 'easy', tags: ['sentence-structure', 'subject']
  }),
  createQuestion({
    id: 'q_eng_02_003',
    type: 'multiple-select',
    subjectId: 'sub_eng',
    chapterId: 'chap_eng_02',
    topicId: 'top_eng_02_01',
    textPlain: 'Which of the following options represent grammatically complete, standalone sentences? (Select all that apply)',
    options: [
      { id: 'opt_1', text: 'Running down the green hill very quickly.' },
      { id: 'opt_2', text: 'The wise old owl sat quietly on the branch.' },
      { id: 'opt_3', text: 'Three bright stars shone brightly in the dark night sky.' },
      { id: 'opt_4', text: 'Because the heavy rain started suddenly.' }
    ],
    correctOptionIds: ['opt_2', 'opt_3'],
    explanationPlain: 'Options 2 and 3 contain both a complete subject and predicate with independent thoughts. Options 1 and 4 are sentence fragments.',
    difficulty: 'hard', tags: ['sentence-structure', 'fragments']
  }),
  createQuestion({
    id: 'q_eng_02_004', type: 'true-false', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_01',
    textPlain: "True or False: An imperative sentence like 'Stop!' is grammatically incomplete because it lacks a visible subject.",
    options: [{ id: 'opt_true', text: 'True' }, { id: 'opt_false', text: 'False' }], correctOptionIds: ['opt_false'],
    explanationPlain: "False. Imperative sentences can have an understood subject 'you', so 'Stop!' is a complete imperative sentence.", difficulty: 'hard', tags: ['sentence-structure', 'imperative']
  }),
  createQuestion({
    id: 'q_eng_02_005', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_01',
    textPlain: "Which word acts as the adverb in the sentence: 'She sang beautifully at the concert.'?",
    options: [
      { id: 'opt_1', text: 'She' }, { id: 'opt_2', text: 'sang' }, { id: 'opt_3', text: 'beautifully' }, { id: 'opt_4', text: 'concert' }
    ], correctOptionIds: ['opt_3'], explanationPlain: 'Beautifully tells us how she sang, so it is an adverb.', difficulty: 'challenge', tags: ['parts-of-speech', 'adverb']
  }),

  // ==========================================
  // TOPIC 3: Spelling Rules
  // ==========================================
  createQuestion({
    id: 'q_eng_03_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_02',
    textPlain: 'Choose the correctly spelt word.',
    options: [{ id: 'opt_1', text: 'necessary' }, { id: 'opt_2', text: 'neccessary' }, { id: 'opt_3', text: 'necessery' }, { id: 'opt_4', text: 'necesary' }],
    correctOptionIds: ['opt_1'], explanationPlain: "The correct spelling is 'necessary'.", difficulty: 'easy', tags: ['spelling']
  }),
  createQuestion({
    id: 'q_eng_03_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_02',
    textPlain: 'Choose the correctly spelt word.',
    options: [{ id: 'opt_1', text: 'beautiful' }, { id: 'opt_2', text: 'beutiful' }, { id: 'opt_3', text: 'beautifull' }, { id: 'opt_4', text: 'beautifal' }],
    correctOptionIds: ['opt_1'], explanationPlain: "The correct spelling is 'beautiful'.", difficulty: 'easy', tags: ['spelling']
  }),
  createQuestion({
    id: 'q_eng_03_003', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_02',
    textPlain: 'Which words are spelt correctly? (Select all that apply)',
    options: [{ id: 'opt_1', text: 'separate' }, { id: 'opt_2', text: 'occurrence' }, { id: 'opt_3', text: 'accomodate' }, { id: 'opt_4', text: 'definately' }],
    correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: "'Separate' and 'occurrence' are correctly spelt; 'accomodate' should be 'accommodate' and 'definately' should be 'definitely'.", difficulty: 'medium', tags: ['spelling', 'multiple-select']
  }),
  createQuestion({
    id: 'q_eng_03_004', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_02',
    textPlain: 'Choose the correct spelling of the word meaning “a place where books are kept for reading or borrowing.”',
    options: [{ id: 'opt_1', text: 'library' }, { id: 'opt_2', text: 'libary' }, { id: 'opt_3', text: 'librery' }, { id: 'opt_4', text: 'liberry' }],
    correctOptionIds: ['opt_1'], explanationPlain: "The correct spelling is 'library'.", difficulty: 'medium', tags: ['spelling', 'vocabulary']
  }),
  createQuestion({
    id: 'q_eng_03_005', type: 'true-false', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_02',
    textPlain: 'True or False: In British and Indian English, “travelling” is an accepted spelling with a double l before -ing.',
    options: [{ id: 'opt_true', text: 'True' }, { id: 'opt_false', text: 'False' }], correctOptionIds: ['opt_true'], explanationPlain: "True. 'Travelling' is the standard British/Indian spelling, while American English commonly uses 'traveling'.", difficulty: 'challenge', tags: ['spelling', 'variant-spelling']
  }),

  // ==========================================
  // TOPIC 4: Rearranging Jumbled Words
  // ==========================================
  createQuestion({
    id: 'q_eng_04_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_03',
    textPlain: 'Arrange the words to form a correct sentence: “school / every day / goes / she / to”.',
    options: [{ id: 'opt_1', text: 'She goes to school every day.' }, { id: 'opt_2', text: 'She every day goes to school.' }, { id: 'opt_3', text: 'Goes she to school every day.' }, { id: 'opt_4', text: 'To school every day she goes.' }],
    correctOptionIds: ['opt_1'], explanationPlain: 'A standard English sentence follows the pattern subject + verb + object/complement + time expression.', difficulty: 'easy', tags: ['jumbled-words']
  }),
  createQuestion({
    id: 'q_eng_04_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_03',
    textPlain: 'Arrange the words to form a correct sentence: “an / honest / is / boy / Rahul”.',
    options: [{ id: 'opt_1', text: 'Rahul is an honest boy.' }, { id: 'opt_2', text: 'An honest Rahul boy is.' }, { id: 'opt_3', text: 'Is Rahul boy an honest.' }, { id: 'opt_4', text: 'Boy Rahul is an honest.' }],
    correctOptionIds: ['opt_1'], explanationPlain: 'The correct order is subject + linking verb + article/adjective + noun.', difficulty: 'easy', tags: ['jumbled-words']
  }),
  createQuestion({
    id: 'q_eng_04_003', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_03',
    textPlain: 'Which sentences are correctly rearranged and grammatically acceptable? (Select all that apply)',
    options: [{ id: 'opt_1', text: 'The children are playing outside.' }, { id: 'opt_2', text: 'Yesterday went he to the market.' }, { id: 'opt_3', text: 'My sister loves classical music.' }, { id: 'opt_4', text: 'Quietly the bird sang beautifully.' }],
    correctOptionIds: ['opt_1', 'opt_3'], explanationPlain: 'Options 1 and 3 have natural word order. Options 2 and 4 are not the intended standard arrangements.', difficulty: 'medium', tags: ['jumbled-words', 'sentence-order', 'multiple-select']
  }),
  createQuestion({
    id: 'q_eng_04_004', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_03',
    textPlain: 'Arrange the words correctly: “to / wants / become / she / a doctor”.',
    options: [{ id: 'opt_1', text: 'She wants to become a doctor.' }, { id: 'opt_2', text: 'She to become wants a doctor.' }, { id: 'opt_3', text: 'Wants she a doctor to become.' }, { id: 'opt_4', text: 'A doctor she wants become to.' }],
    correctOptionIds: ['opt_1'], explanationPlain: 'The natural order is subject + verb + infinitive phrase + complement.', difficulty: 'medium', tags: ['jumbled-words']
  }),
  createQuestion({
    id: 'q_eng_04_005', type: 'true-false', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_03',
    textPlain: 'True or False: In a normal affirmative English sentence, the subject generally comes before the main verb.',
    options: [{ id: 'opt_true', text: 'True' }, { id: 'opt_false', text: 'False' }], correctOptionIds: ['opt_true'], explanationPlain: 'True. English usually follows a Subject–Verb–Object/Complement order, though other structures also exist.', difficulty: 'challenge', tags: ['sentence-order']
  }),

  // ==========================================
  // TOPIC 5: Tense Forms
  // ==========================================
  createQuestion({
    id: 'q_eng_05_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_01',
    textPlain: 'Which tense is used in “They visited Delhi yesterday”?',
    options: [{ id: 'opt_1', text: 'Simple Past' }, { id: 'opt_2', text: 'Simple Present' }, { id: 'opt_3', text: 'Present Continuous' }, { id: 'opt_4', text: 'Simple Future' }],
    correctOptionIds: ['opt_1'], explanationPlain: 'The verb visited describes a completed action in the past, signalled by yesterday.', difficulty: 'easy', tags: ['tenses', 'simple-past']
  }),
  createQuestion({
    id: 'q_eng_05_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_01',
    textPlain: 'Which tense is used in “She is reading now”?',
    options: [{ id: 'opt_1', text: 'Present Continuous' }, { id: 'opt_2', text: 'Simple Past' }, { id: 'opt_3', text: 'Present Perfect' }, { id: 'opt_4', text: 'Simple Future' }],
    correctOptionIds: ['opt_1'], explanationPlain: 'Is reading shows an action happening at the time of speaking, so Present Continuous is used.', difficulty: 'easy', tags: ['tenses', 'present-continuous']
  }),
  createQuestion({
    id: 'q_eng_05_003', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_01',
    textPlain: 'Choose the correct verb form: “By the time we arrived, the train ___.”',
    options: [{ id: 'opt_1', text: 'had left' }, { id: 'opt_2', text: 'has left' }, { id: 'opt_3', text: 'leaves' }, { id: 'opt_4', text: 'will leave' }],
    correctOptionIds: ['opt_1'], explanationPlain: 'The earlier of two past actions takes the Past Perfect: had left.', difficulty: 'medium', tags: ['tenses', 'past-perfect']
  }),
  createQuestion({
    id: 'q_eng_05_004', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_01',
    textPlain: 'Which sentences use the Present Perfect tense correctly? (Select all that apply)',
    options: [{ id: 'opt_1', text: 'She has finished her homework already.' }, { id: 'opt_2', text: 'They have lived here for five years.' }, { id: 'opt_3', text: 'He has went to school yesterday.' }, { id: 'opt_4', text: 'I have saw that film last week.' }],
    correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'The Present Perfect uses has/have + past participle and is used appropriately in options 1 and 2.', difficulty: 'hard', tags: ['tenses', 'present-perfect', 'multiple-select']
  }),
  createQuestion({
    id: 'q_eng_05_005', type: 'true-false', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_01',
    textPlain: 'True or False: “I was reading when the phone rang” contains a Past Continuous form.',
    options: [{ id: 'opt_true', text: 'True' }, { id: 'opt_false', text: 'False' }], correctOptionIds: ['opt_true'], explanationPlain: 'True. Was reading is Past Continuous and describes an ongoing past action interrupted by another past event.', difficulty: 'challenge', tags: ['tenses', 'past-continuous']
  }),

  // ==========================================
  // TOPIC 6: Modal Auxiliaries
  // ==========================================
  createQuestion({ id: 'q_eng_06_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_02', textPlain: 'Which modal shows ability in “I can swim”?', options: [{ id: 'opt_1', text: 'can' }, { id: 'opt_2', text: 'must' }, { id: 'opt_3', text: 'should' }, { id: 'opt_4', text: 'may' }], correctOptionIds: ['opt_1'], explanationPlain: 'Can expresses present ability.', difficulty: 'easy', tags: ['modals', 'ability'] }),
  createQuestion({ id: 'q_eng_06_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_02', textPlain: 'Which modal shows necessity in “You must obey the rules”?', options: [{ id: 'opt_1', text: 'must' }, { id: 'opt_2', text: 'can' }, { id: 'opt_3', text: 'might' }, { id: 'opt_4', text: 'could' }], correctOptionIds: ['opt_1'], explanationPlain: 'Must expresses strong necessity or obligation.', difficulty: 'easy', tags: ['modals', 'necessity'] }),
  createQuestion({ id: 'q_eng_06_003', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_02', textPlain: 'Choose the most appropriate modal: “___ I borrow your pen, please?”', options: [{ id: 'opt_1', text: 'May' }, { id: 'opt_2', text: 'Must' }, { id: 'opt_3', text: 'Need' }, { id: 'opt_4', text: 'Ought' }], correctOptionIds: ['opt_1'], explanationPlain: 'May is commonly used to make a polite request for permission.', difficulty: 'medium', tags: ['modals', 'permission'] }),
  createQuestion({ id: 'q_eng_06_004', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_02', textPlain: 'Which modals can express possibility? (Select all that apply)', options: [{ id: 'opt_1', text: 'may' }, { id: 'opt_2', text: 'might' }, { id: 'opt_3', text: 'must' }, { id: 'opt_4', text: 'can' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'May and might can express possibility in appropriate contexts.', difficulty: 'hard', tags: ['modals', 'possibility', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_06_005', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_02', textPlain: 'Which sentence uses “should” to give advice?', options: [{ id: 'opt_1', text: 'You should revise before the exam.' }, { id: 'opt_2', text: 'You should be at home yesterday.' }, { id: 'opt_3', text: 'Should I can swim?' }, { id: 'opt_4', text: 'You should must leave now.' }], correctOptionIds: ['opt_1'], explanationPlain: 'Should is commonly used to give advice or recommendation.', difficulty: 'challenge', tags: ['modals', 'advice'] }),

  // ==========================================
  // TOPIC 7: Use of Prepositions
  // ==========================================
  createQuestion({ id: 'q_eng_07_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_03', textPlain: 'Choose the correct preposition: “The book is ___ the table.”', options: [{ id: 'opt_1', text: 'on' }, { id: 'opt_2', text: 'at' }, { id: 'opt_3', text: 'to' }, { id: 'opt_4', text: 'by' }], correctOptionIds: ['opt_1'], explanationPlain: 'On is used for a position on a surface.', difficulty: 'easy', tags: ['prepositions'] }),
  createQuestion({ id: 'q_eng_07_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_03', textPlain: 'Choose the correct preposition: “We arrived ___ school at 8.”', options: [{ id: 'opt_1', text: 'at' }, { id: 'opt_2', text: 'on' }, { id: 'opt_3', text: 'between' }, { id: 'opt_4', text: 'from' }], correctOptionIds: ['opt_1'], explanationPlain: 'At is used for a specific point or place such as school in this context.', difficulty: 'easy', tags: ['prepositions', 'place'] }),
  createQuestion({ id: 'q_eng_07_003', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_03', textPlain: 'Choose the correct preposition: “The children walked ___ the bridge.”', options: [{ id: 'opt_1', text: 'across' }, { id: 'opt_2', text: 'between' }, { id: 'opt_3', text: 'during' }, { id: 'opt_4', text: 'until' }], correctOptionIds: ['opt_1'], explanationPlain: 'Across indicates movement from one side of a bridge to the other.', difficulty: 'medium', tags: ['prepositions', 'movement'] }),
  createQuestion({ id: 'q_eng_07_004', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_03', textPlain: 'Which prepositions are normally used to show a period of time? (Select all that apply)', options: [{ id: 'opt_1', text: 'during' }, { id: 'opt_2', text: 'for' }, { id: 'opt_3', text: 'between' }, { id: 'opt_4', text: 'at' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'During and for can both express time duration/period, depending on the sentence.', difficulty: 'hard', tags: ['prepositions', 'time', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_07_005', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_03', textPlain: 'Choose the best preposition: “The prize was shared ___ the two winners.”', options: [{ id: 'opt_1', text: 'between' }, { id: 'opt_2', text: 'among' }, { id: 'opt_3', text: 'during' }, { id: 'opt_4', text: 'across' }], correctOptionIds: ['opt_1'], explanationPlain: 'Between is traditionally used when referring to two distinct people or things.', difficulty: 'challenge', tags: ['prepositions', 'between-among'] }),

  // ==========================================
  // TOPIC 8: Passivation
  // ==========================================
  createQuestion({ id: 'q_eng_08_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_01', textPlain: 'Choose the passive form of “Rita wrote a letter.”', options: [{ id: 'opt_1', text: 'A letter was written by Rita.' }, { id: 'opt_2', text: 'Rita was written a letter.' }, { id: 'opt_3', text: 'A letter is writing Rita.' }, { id: 'opt_4', text: 'A letter has write Rita.' }], correctOptionIds: ['opt_1'], explanationPlain: 'The simple past active verb wrote becomes was written in the passive voice.', difficulty: 'easy', tags: ['passive-voice'] }),
  createQuestion({ id: 'q_eng_08_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_01', textPlain: 'Choose the passive form of “The boy kicked the ball.”', options: [{ id: 'opt_1', text: 'The ball was kicked by the boy.' }, { id: 'opt_2', text: 'The boy was kicked the ball.' }, { id: 'opt_3', text: 'The ball kicked the boy.' }, { id: 'opt_4', text: 'The ball is kick by boy.' }], correctOptionIds: ['opt_1'], explanationPlain: 'The object of the active sentence becomes the subject of the passive sentence: the ball was kicked.', difficulty: 'easy', tags: ['passive-voice'] }),
  createQuestion({ id: 'q_eng_08_003', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_01', textPlain: 'Which sentences are correctly written in the passive voice? (Select all that apply)', options: [{ id: 'opt_1', text: 'The homework was checked by the teacher.' }, { id: 'opt_2', text: 'The cake was baked by my mother.' }, { id: 'opt_3', text: 'The ball was kick by Ravi.' }, { id: 'opt_4', text: 'The room cleaned by the students.' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'Options 1 and 2 have the correct be + past participle structure.', difficulty: 'medium', tags: ['passive-voice', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_08_004', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_01', textPlain: 'Change to passive voice: “People speak English in many countries.”', options: [{ id: 'opt_1', text: 'English is spoken in many countries.' }, { id: 'opt_2', text: 'English was spoken people in many countries.' }, { id: 'opt_3', text: 'People are spoken English in many countries.' }, { id: 'opt_4', text: 'English speaks in many countries.' }], correctOptionIds: ['opt_1'], explanationPlain: 'The simple present passive is is/are + past participle: English is spoken.', difficulty: 'hard', tags: ['passive-voice', 'simple-present'] }),
  createQuestion({ id: 'q_eng_08_005', type: 'true-false', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_01', textPlain: 'True or False: The agent introduced by “by” is always necessary in a passive sentence.', options: [{ id: 'opt_true', text: 'True' }, { id: 'opt_false', text: 'False' }], correctOptionIds: ['opt_false'], explanationPlain: 'False. The agent can be omitted when it is unknown, obvious, or unimportant.', difficulty: 'challenge', tags: ['passive-voice', 'agent'] }),

  // ==========================================
  // TOPIC 9: Reported Speech
  // ==========================================
  createQuestion({ id: 'q_eng_09_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_02', textPlain: 'Change to reported speech: He said, “I am tired.”', options: [{ id: 'opt_1', text: 'He said that he was tired.' }, { id: 'opt_2', text: 'He said that I am tired.' }, { id: 'opt_3', text: 'He says he was tired.' }, { id: 'opt_4', text: 'He said that he is tired.' }], correctOptionIds: ['opt_1'], explanationPlain: 'With a past reporting verb, am generally backshifts to was and I changes to he.', difficulty: 'easy', tags: ['reported-speech', 'statements'] }),
  createQuestion({ id: 'q_eng_09_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_02', textPlain: 'Change to reported speech: Riya said, “I have finished my work.”', options: [{ id: 'opt_1', text: 'Riya said that she had finished her work.' }, { id: 'opt_2', text: 'Riya said that I have finished my work.' }, { id: 'opt_3', text: 'Riya says she had finish work.' }, { id: 'opt_4', text: 'Riya said that she has finish her work.' }], correctOptionIds: ['opt_1'], explanationPlain: 'Present Perfect have finished backshifts to Past Perfect had finished, and I changes to she.', difficulty: 'easy', tags: ['reported-speech', 'present-perfect'] }),
  createQuestion({ id: 'q_eng_09_003', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_02', textPlain: 'Change to reported speech: The teacher said to the students, “Work hard.”', options: [{ id: 'opt_1', text: 'The teacher advised the students to work hard.' }, { id: 'opt_2', text: 'The teacher said the students work hard.' }, { id: 'opt_3', text: 'The teacher advised that the students worked hard.' }, { id: 'opt_4', text: 'The teacher said to work hard the students.' }], correctOptionIds: ['opt_1'], explanationPlain: 'An imperative giving advice can be reported using advised + object + to-infinitive.', difficulty: 'medium', tags: ['reported-speech', 'commands'] }),
  createQuestion({ id: 'q_eng_09_004', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_02', textPlain: 'Which changes are normally correct when reporting a past statement? (Select all that apply)', options: [{ id: 'opt_1', text: '“am” may change to “was”' }, { id: 'opt_2', text: 'pronouns may change according to the speaker' }, { id: 'opt_3', text: 'every sentence must change to future tense' }, { id: 'opt_4', text: 'all nouns must be removed' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'Reported speech commonly involves tense backshift and appropriate pronoun changes when the reporting verb is in the past.', difficulty: 'hard', tags: ['reported-speech', 'rules', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_09_005', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_02', textPlain: "The doctor said to me, 'Take this medicine daily.' Change this to reported speech.", options: [{ id: 'opt_1', text: 'The doctor advised me to take that medicine daily.' }, { id: 'opt_2', text: 'The doctor advised me that take this medicine daily.' }, { id: 'opt_3', text: 'The doctor said me taking that medicine daily.' }, { id: 'opt_4', text: 'The doctor told to me that I take this medicine daily.' }], correctOptionIds: ['opt_1'], explanationPlain: 'An imperative giving advice is reported with a suitable reporting verb + object + to-infinitive.', difficulty: 'challenge', tags: ['reported-speech', 'advice'] }),

  // ==========================================
  // TOPIC 10: Degrees of Comparison
  // ==========================================
  createQuestion({ id: 'q_eng_10_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_03', textPlain: 'Choose the comparative form of “tall”.', options: [{ id: 'opt_1', text: 'taller' }, { id: 'opt_2', text: 'tallest' }, { id: 'opt_3', text: 'more tall' }, { id: 'opt_4', text: 'most tall' }], correctOptionIds: ['opt_1'], explanationPlain: 'The comparative form of the short adjective tall is taller.', difficulty: 'easy', tags: ['degrees-of-comparison'] }),
  createQuestion({ id: 'q_eng_10_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_03', textPlain: 'Choose the superlative form of “good”.', options: [{ id: 'opt_1', text: 'best' }, { id: 'opt_2', text: 'better' }, { id: 'opt_3', text: 'goodest' }, { id: 'opt_4', text: 'more good' }], correctOptionIds: ['opt_1'], explanationPlain: 'Good is an irregular adjective: good, better, best.', difficulty: 'easy', tags: ['degrees-of-comparison', 'irregular-adjective'] }),
  createQuestion({ id: 'q_eng_10_003', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_03', textPlain: 'Choose the correct comparative sentence: “No other metal is as useful as iron.”', options: [{ id: 'opt_1', text: 'Iron is more useful than any other metal.' }, { id: 'opt_2', text: 'Iron is the most useful than any metal.' }, { id: 'opt_3', text: 'No metal is useful as iron.' }, { id: 'opt_4', text: 'Iron is useful than all other metals.' }], correctOptionIds: ['opt_1'], explanationPlain: 'The positive structure “No other...as...as” can be changed to “Subject + comparative + than any other...”.', difficulty: 'medium', tags: ['degrees-of-comparison', 'transformation'] }),
  createQuestion({ id: 'q_eng_10_004', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_03', textPlain: 'Which are correct forms of comparison? (Select all that apply)', options: [{ id: 'opt_1', text: 'This book is better than that one.' }, { id: 'opt_2', text: 'Mount Everest is the highest peak among these.' }, { id: 'opt_3', text: 'She is more taller than her sister.' }, { id: 'opt_4', text: 'He is the most fastest runner.' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'Options 1 and 2 use correct comparative/superlative structures. Double comparison is incorrect in 3 and 4.', difficulty: 'hard', tags: ['degrees-of-comparison', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_10_005', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_03', textPlain: 'Transform the following superlative sentence into positive degree without changing meaning:\n“Gold is one of the most precious metals.”', options: [{ id: 'opt_1', text: 'No other metal is as precious as gold.' }, { id: 'opt_2', text: 'Very few metals are as precious as gold.' }, { id: 'opt_3', text: 'Gold is more precious than any other metal.' }, { id: 'opt_4', text: 'All metals are as precious as gold.' }], correctOptionIds: ['opt_2'], explanationPlain: "The structure 'one of the + superlative' implies there are a few others in that top category, so its positive equivalent begins with 'Very few... are as... as...'.", difficulty: 'challenge', tags: ['degrees-of-comparison', 'advanced-transformation'] })
];

const englishQuestionsBatch2: Question[] = [
  createQuestion({ id: 'q_eng_b2_01_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_01', topicId: 'top_eng_01_01', textPlain: 'Choose the best title for a short passage about regular reading improving vocabulary and understanding.', options: [{ id: 'opt_1', text: 'Benefits of Regular Reading' }, { id: 'opt_2', text: 'Why Books Are Heavy' }, { id: 'opt_3', text: 'Only School Reading' }, { id: 'opt_4', text: 'Avoiding New Words' }], correctOptionIds: ['opt_1'], explanationPlain: 'The title should capture the central idea of regular reading improving vocabulary and understanding.', difficulty: 'easy', tags: ['comprehension', 'main-idea'] }),
  createQuestion({ id: 'q_eng_b2_01_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_01', topicId: 'top_eng_01_01', textPlain: 'What does a passage that contrasts short-term and long-term effects mainly require a reader to identify?', options: [{ id: 'opt_1', text: 'The author’s main comparison' }, { id: 'opt_2', text: 'Only the longest sentence' }, { id: 'opt_3', text: 'Only difficult spellings' }, { id: 'opt_4', text: 'The font used' }], correctOptionIds: ['opt_1'], explanationPlain: 'Understanding the author’s main comparison is central to interpreting such a passage.', difficulty: 'medium', tags: ['comprehension', 'comparison'] }),
  createQuestion({ id: 'q_eng_b2_01_003', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_01', topicId: 'top_eng_01_01', textPlain: 'Which statement is an inference rather than a directly stated fact?', options: [{ id: 'opt_1', text: 'The reader may benefit from careful attention to details.' }, { id: 'opt_2', text: 'The passage states that water is saved.' }, { id: 'opt_3', text: 'The writer mentions trees.' }, { id: 'opt_4', text: 'The sentence contains a full stop.' }], correctOptionIds: ['opt_1'], explanationPlain: 'An inference is a conclusion reasonably drawn from what the passage suggests.', difficulty: 'hard', tags: ['comprehension', 'inference'] }),
  createQuestion({ id: 'q_eng_b2_01_004', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_01', topicId: 'top_eng_01_01', textPlain: 'Which skills are useful for answering unseen-passage questions? (Select all that apply)', options: [{ id: 'opt_1', text: 'Finding the main idea' }, { id: 'opt_2', text: 'Locating supporting details' }, { id: 'opt_3', text: 'Ignoring the passage' }, { id: 'opt_4', text: 'Guessing every answer without reading' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'Main ideas and supporting details are essential for comprehension questions.', difficulty: 'hard', tags: ['comprehension', 'skills', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_b2_01_005', type: 'true-false', subjectId: 'sub_eng', chapterId: 'chap_eng_01', topicId: 'top_eng_01_01', textPlain: 'True or False: An answer to a passage question should be supported by the information or reasonable inference from the passage.', options: [{ id: 'opt_true', text: 'True' }, { id: 'opt_false', text: 'False' }], correctOptionIds: ['opt_true'], explanationPlain: 'True. Passage answers should be grounded in the text rather than unrelated guesses.', difficulty: 'challenge', tags: ['comprehension', 'evidence'] }),
  createQuestion({ id: 'q_eng_b2_02_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_01', textPlain: 'Which part of a sentence usually tells who or what performs the action?', options: [{ id: 'opt_1', text: 'Subject' }, { id: 'opt_2', text: 'Object' }, { id: 'opt_3', text: 'Adverb' }, { id: 'opt_4', text: 'Conjunction' }], correctOptionIds: ['opt_1'], explanationPlain: 'The subject usually names the person, place, thing, or idea that performs the action or is described.', difficulty: 'easy', tags: ['sentence-structure', 'subject'] }),
  createQuestion({ id: 'q_eng_b2_02_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_01', textPlain: 'In “The little girl opened the window,” which word is the object?', options: [{ id: 'opt_1', text: 'girl' }, { id: 'opt_2', text: 'opened' }, { id: 'opt_3', text: 'window' }, { id: 'opt_4', text: 'little' }], correctOptionIds: ['opt_3'], explanationPlain: 'Window receives the action of opened, so it is the object.', difficulty: 'medium', tags: ['sentence-structure', 'object'] }),
  createQuestion({ id: 'q_eng_b2_02_003', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_01', textPlain: 'Which sentence contains an adverb modifying a verb?', options: [{ id: 'opt_1', text: 'She danced gracefully.' }, { id: 'opt_2', text: 'The blue sky is clear.' }, { id: 'opt_3', text: 'The book is heavy.' }, { id: 'opt_4', text: 'My brother is a doctor.' }], correctOptionIds: ['opt_1'], explanationPlain: 'Gracefully tells how she danced, so it modifies the verb danced.', difficulty: 'hard', tags: ['parts-of-speech', 'adverb'] }),
  createQuestion({ id: 'q_eng_b2_02_004', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_01', textPlain: 'Which of these options are complete, standalone English sentences? (Select all that apply)', options: [{ id: 'opt_1', text: 'The clock struck twelve.' }, { id: 'opt_2', text: 'Waiting for the morning train.' }, { id: 'opt_3', text: 'She smiled gracefully.' }, { id: 'opt_4', text: 'Because he arrived late.' }], correctOptionIds: ['opt_1', 'opt_3'], explanationPlain: 'Options 1 and 3 have a subject and a predicate and express a complete thought. Options 2 and 4 are fragments lacking a complete independent clause.', difficulty: 'hard', tags: ['sentence-structure', 'complete-sentences'] }),
  createQuestion({ id: 'q_eng_b2_02_005', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_01', textPlain: "What grammatical component is missing to make this phrase a complete sentence?\n'The children playing happily in the park.'", options: [{ id: 'opt_1', text: 'A finite verb' }, { id: 'opt_2', text: 'An article' }, { id: 'opt_3', text: 'An adjective' }, { id: 'opt_4', text: 'A preposition' }], correctOptionIds: ['opt_1'], explanationPlain: 'Playing is a participle here; the phrase needs a finite verb such as are to form a complete sentence.', difficulty: 'challenge', tags: ['sentence-structure', 'fragments'] }),
  createQuestion({ id: 'q_eng_b2_03_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_02', textPlain: 'Choose the correctly spelt word.', options: [{ id: 'opt_1', text: 'privilege' }, { id: 'opt_2', text: 'privelege' }, { id: 'opt_3', text: 'priviledge' }, { id: 'opt_4', text: 'previlege' }], correctOptionIds: ['opt_1'], explanationPlain: "The correct spelling is 'privilege'.", difficulty: 'easy', tags: ['spelling'] }),
  createQuestion({ id: 'q_eng_b2_03_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_02', textPlain: 'Choose the correctly spelt word.', options: [{ id: 'opt_1', text: 'rhythm' }, { id: 'opt_2', text: 'rythm' }, { id: 'opt_3', text: 'rhythum' }, { id: 'opt_4', text: 'rhythem' }], correctOptionIds: ['opt_1'], explanationPlain: "The correct spelling is 'rhythm'.", difficulty: 'medium', tags: ['spelling'] }),
  createQuestion({ id: 'q_eng_b2_03_003', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_02', textPlain: 'Which words are correctly spelt? (Select all that apply)', options: [{ id: 'opt_1', text: 'calendar' }, { id: 'opt_2', text: 'committee' }, { id: 'opt_3', text: 'embarass' }, { id: 'opt_4', text: 'begining' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'Calendar and committee are correct spellings; embarrass and beginning have missing letters.', difficulty: 'hard', tags: ['spelling', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_b2_03_004', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_02', textPlain: 'Which spelling correctly follows the rule of dropping a final silent e before adding -ing?', options: [{ id: 'opt_1', text: 'writing' }, { id: 'opt_2', text: 'writeing' }, { id: 'opt_3', text: 'writting' }, { id: 'opt_4', text: 'wrtting' }], correctOptionIds: ['opt_1'], explanationPlain: 'Write becomes writing by dropping the final silent e before -ing.', difficulty: 'hard', tags: ['spelling', 'suffixes'] }),
  createQuestion({ id: 'q_eng_b2_03_005', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_02', textPlain: 'Choose the correct spelling: “The teacher gave us useful ___.”', options: [{ id: 'opt_1', text: 'advice' }, { id: 'opt_2', text: 'advise' }, { id: 'opt_3', text: 'advaice' }, { id: 'opt_4', text: 'advisees' }], correctOptionIds: ['opt_1'], explanationPlain: 'Advice is the noun meaning helpful suggestions; advise is a verb.', difficulty: 'challenge', tags: ['spelling', 'word-choice'] }),
  createQuestion({ id: 'q_eng_b2_04_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_03', textPlain: 'Choose the correct order: “early / the / reached / team / station”.', options: [{ id: 'opt_1', text: 'The team reached the station early.' }, { id: 'opt_2', text: 'Reached the team early the station.' }, { id: 'opt_3', text: 'The station early reached the team.' }, { id: 'opt_4', text: 'Early the station the team reached.' }], correctOptionIds: ['opt_1'], explanationPlain: 'The sentence follows normal subject + verb + object + adverb order.', difficulty: 'easy', tags: ['jumbled-words'] }),
  createQuestion({ id: 'q_eng_b2_04_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_03', textPlain: 'Arrange the words: “honesty / best / policy / the / is”.', options: [{ id: 'opt_1', text: 'Honesty is the best policy.' }, { id: 'opt_2', text: 'The best honesty policy is.' }, { id: 'opt_3', text: 'Is honesty the policy best.' }, { id: 'opt_4', text: 'Policy honesty is the best.' }], correctOptionIds: ['opt_1'], explanationPlain: 'The standard sentence order produces “Honesty is the best policy.”', difficulty: 'medium', tags: ['jumbled-words'] }),
  createQuestion({ id: 'q_eng_b2_04_003', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_03', textPlain: 'Which are correctly arranged sentences? (Select all that apply)', options: [{ id: 'opt_1', text: 'We visited the museum yesterday.' }, { id: 'opt_2', text: 'Never I have seen such a view.' }, { id: 'opt_3', text: 'The baby slept peacefully.' }, { id: 'opt_4', text: 'To school goes Rohan every day.' }], correctOptionIds: ['opt_1', 'opt_3'], explanationPlain: 'Options 1 and 3 have standard English word order.', difficulty: 'hard', tags: ['jumbled-words', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_b2_04_004', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_03', textPlain: 'Arrange the words: “carefully / the / scientist / experiment / performed”.', options: [{ id: 'opt_1', text: 'The scientist performed the experiment carefully.' }, { id: 'opt_2', text: 'The experiment carefully the scientist performed.' }, { id: 'opt_3', text: 'Performed carefully the scientist experiment.' }, { id: 'opt_4', text: 'Carefully performed the experiment the scientist.' }], correctOptionIds: ['opt_1'], explanationPlain: 'The natural order is subject + verb + object + adverb.', difficulty: 'hard', tags: ['jumbled-words'] }),
  createQuestion({ id: 'q_eng_b2_04_005', type: 'true-false', subjectId: 'sub_eng', chapterId: 'chap_eng_02', topicId: 'top_eng_02_03', textPlain: 'True or False: Rearranging jumbled words requires attention to both grammar and meaning.', options: [{ id: 'opt_true', text: 'True' }, { id: 'opt_false', text: 'False' }], correctOptionIds: ['opt_true'], explanationPlain: 'True. A grammatically correct arrangement should also make logical sense.', difficulty: 'challenge', tags: ['jumbled-words', 'grammar'] }),
  createQuestion({ id: 'q_eng_b2_05_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_01', textPlain: 'Choose the correct tense: “She ___ in this school since 2022.”', options: [{ id: 'opt_1', text: 'has studied' }, { id: 'opt_2', text: 'studied' }, { id: 'opt_3', text: 'will study' }, { id: 'opt_4', text: 'is study' }], correctOptionIds: ['opt_1'], explanationPlain: 'Since + a starting point commonly takes the Present Perfect for an action continuing to the present.', difficulty: 'easy', tags: ['tenses', 'present-perfect'] }),
  createQuestion({ id: 'q_eng_b2_05_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_01', textPlain: 'Choose the correct tense: “By next month, they ___ the project.”', options: [{ id: 'opt_1', text: 'will have completed' }, { id: 'opt_2', text: 'completed' }, { id: 'opt_3', text: 'complete' }, { id: 'opt_4', text: 'are completing yesterday' }], correctOptionIds: ['opt_1'], explanationPlain: 'By next month indicates an action completed before a future time, so Future Perfect is appropriate.', difficulty: 'medium', tags: ['tenses', 'future-perfect'] }),
  createQuestion({ id: 'q_eng_b2_05_003', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_01', textPlain: 'Choose the correct tense: “She has finished her homework already, so she can go out to play.”', options: [{ id: 'opt_1', text: 'Present Perfect' }, { id: 'opt_2', text: 'Simple Past' }, { id: 'opt_3', text: 'Past Continuous' }, { id: 'opt_4', text: 'Simple Future' }], correctOptionIds: ['opt_1'], explanationPlain: 'Has finished is Present Perfect and connects a completed action with the present result.', difficulty: 'hard', tags: ['tenses', 'present-perfect'] }),
  createQuestion({ id: 'q_eng_b2_05_004', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_01', textPlain: 'Which sentences are in the Simple Past tense? (Select all that apply)', options: [{ id: 'opt_1', text: 'They visited Jaipur last week.' }, { id: 'opt_2', text: 'I finished my work yesterday.' }, { id: 'opt_3', text: 'She is reading a novel.' }, { id: 'opt_4', text: 'We have completed the task.' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'Visited and finished are Simple Past forms describing completed past actions.', difficulty: 'hard', tags: ['tenses', 'simple-past', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_b2_05_005', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_01', textPlain: 'Choose the correct form: “When I entered the room, the students ___ quietly.”', options: [{ id: 'opt_1', text: 'were studying' }, { id: 'opt_2', text: 'have studied' }, { id: 'opt_3', text: 'will study' }, { id: 'opt_4', text: 'study tomorrow' }], correctOptionIds: ['opt_1'], explanationPlain: 'The Past Continuous describes an action that was in progress at a particular time in the past.', difficulty: 'challenge', tags: ['tenses', 'past-continuous'] }),
  createQuestion({ id: 'q_eng_b2_06_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_02', textPlain: 'Which modal is best for polite advice: “You ___ check your answers again.”', options: [{ id: 'opt_1', text: 'should' }, { id: 'opt_2', text: 'mustn’t' }, { id: 'opt_3', text: 'may not' }, { id: 'opt_4', text: 'couldn’t' }], correctOptionIds: ['opt_1'], explanationPlain: 'Should is commonly used to give advice or a recommendation.', difficulty: 'easy', tags: ['modals', 'advice'] }),
  createQuestion({ id: 'q_eng_b2_06_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_02', textPlain: 'Which modal expresses strong prohibition: “You ___ touch the wires.”', options: [{ id: 'opt_1', text: 'must not' }, { id: 'opt_2', text: 'may' }, { id: 'opt_3', text: 'can' }, { id: 'opt_4', text: 'should' }], correctOptionIds: ['opt_1'], explanationPlain: 'Must not expresses strong prohibition.', difficulty: 'medium', tags: ['modals', 'prohibition'] }),
  createQuestion({ id: 'q_eng_b2_06_003', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_02', textPlain: 'Which modal can show a less certain possibility than “may” in some contexts?', options: [{ id: 'opt_1', text: 'might' }, { id: 'opt_2', text: 'must' }, { id: 'opt_3', text: 'ought to' }, { id: 'opt_4', text: 'needn’t' }], correctOptionIds: ['opt_1'], explanationPlain: 'Might often expresses a more tentative possibility than may.', difficulty: 'hard', tags: ['modals', 'possibility'] }),
  createQuestion({ id: 'q_eng_b2_06_004', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_02', textPlain: 'Which modal expressions can be used to make requests? (Select all that apply)', options: [{ id: 'opt_1', text: 'Could you help me?' }, { id: 'opt_2', text: 'May I come in?' }, { id: 'opt_3', text: 'Must I help you?' }, { id: 'opt_4', text: 'Should you close the door?' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'Could and may are both commonly used for polite requests or permission.', difficulty: 'hard', tags: ['modals', 'requests', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_b2_06_005', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_02', textPlain: 'Choose the best modal: “Students ___ follow the examination instructions.”', options: [{ id: 'opt_1', text: 'must' }, { id: 'opt_2', text: 'might' }, { id: 'opt_3', text: 'may perhaps' }, { id: 'opt_4', text: 'could maybe' }], correctOptionIds: ['opt_1'], explanationPlain: 'Must expresses obligation or necessity.', difficulty: 'challenge', tags: ['modals', 'obligation'] }),
  createQuestion({ id: 'q_eng_b2_07_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_03', textPlain: 'Choose the correct preposition: “The children sat ___ the tree.”', options: [{ id: 'opt_1', text: 'under' }, { id: 'opt_2', text: 'between' }, { id: 'opt_3', text: 'during' }, { id: 'opt_4', text: 'toward' }], correctOptionIds: ['opt_1'], explanationPlain: 'Under shows position below the tree.', difficulty: 'easy', tags: ['prepositions', 'place'] }),
  createQuestion({ id: 'q_eng_b2_07_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_03', textPlain: 'Choose the correct preposition: “She has been waiting ___ two hours.”', options: [{ id: 'opt_1', text: 'for' }, { id: 'opt_2', text: 'since' }, { id: 'opt_3', text: 'at' }, { id: 'opt_4', text: 'by' }], correctOptionIds: ['opt_1'], explanationPlain: 'For is used with a duration such as two hours.', difficulty: 'medium', tags: ['prepositions', 'time'] }),
  createQuestion({ id: 'q_eng_b2_07_003', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_03', textPlain: 'Choose the correct preposition: “He was born ___ July.”', options: [{ id: 'opt_1', text: 'in' }, { id: 'opt_2', text: 'on' }, { id: 'opt_3', text: 'at' }, { id: 'opt_4', text: 'from' }], correctOptionIds: ['opt_1'], explanationPlain: 'In is used with months.', difficulty: 'medium', tags: ['prepositions', 'time'] }),
  createQuestion({ id: 'q_eng_b2_07_004', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_03', textPlain: 'Which prepositions can introduce a starting point in time? (Select all that apply)', options: [{ id: 'opt_1', text: 'since' }, { id: 'opt_2', text: 'from' }, { id: 'opt_3', text: 'during' }, { id: 'opt_4', text: 'under' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'Since and from can indicate the point when a time period begins.', difficulty: 'hard', tags: ['prepositions', 'time', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_b2_07_005', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_03', topicId: 'top_eng_03_03', textPlain: 'Choose the best preposition: “The teacher stood ___ the students.”', options: [{ id: 'opt_1', text: 'among' }, { id: 'opt_2', text: 'between' }, { id: 'opt_3', text: 'since' }, { id: 'opt_4', text: 'during' }], correctOptionIds: ['opt_1'], explanationPlain: 'Among is commonly used when referring to a group of more than two people or things.', difficulty: 'challenge', tags: ['prepositions', 'among'] }),
  createQuestion({ id: 'q_eng_b2_08_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_01', textPlain: 'Choose the passive form of “The chef cooked the meal.”', options: [{ id: 'opt_1', text: 'The meal was cooked by the chef.' }, { id: 'opt_2', text: 'The chef was cooked the meal.' }, { id: 'opt_3', text: 'The meal cooked the chef.' }, { id: 'opt_4', text: 'The meal is cook by the chef.' }], correctOptionIds: ['opt_1'], explanationPlain: 'The simple past passive uses was/were + past participle.', difficulty: 'easy', tags: ['passive-voice'] }),
  createQuestion({ id: 'q_eng_b2_08_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_01', textPlain: 'Choose the passive form of “They clean the classroom every day.”', options: [{ id: 'opt_1', text: 'The classroom is cleaned every day.' }, { id: 'opt_2', text: 'The classroom was cleaned yesterday.' }, { id: 'opt_3', text: 'The classroom cleans every day.' }, { id: 'opt_4', text: 'They are cleaned the classroom.' }], correctOptionIds: ['opt_1'], explanationPlain: 'For a simple present active verb, the passive is am/is/are + past participle.', difficulty: 'medium', tags: ['passive-voice', 'simple-present'] }),
  createQuestion({ id: 'q_eng_b2_08_003', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_01', textPlain: 'Which active sentences can be changed into passive voice because they have a suitable object? (Select all that apply)', options: [{ id: 'opt_1', text: 'The child opened the door.' }, { id: 'opt_2', text: 'Ravi kicked the ball.' }, { id: 'opt_3', text: 'The baby slept.' }, { id: 'opt_4', text: 'Birds fly.' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'A standard passive transformation requires a suitable object that can become the passive subject.', difficulty: 'hard', tags: ['passive-voice', 'objects', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_b2_08_004', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_01', textPlain: 'Choose the passive form: “The workers are repairing the road.”', options: [{ id: 'opt_1', text: 'The road is being repaired by the workers.' }, { id: 'opt_2', text: 'The road was repaired by the workers.' }, { id: 'opt_3', text: 'The road is repaired yesterday.' }, { id: 'opt_4', text: 'The workers are being repaired the road.' }], correctOptionIds: ['opt_1'], explanationPlain: 'The present continuous passive uses am/is/are being + past participle.', difficulty: 'hard', tags: ['passive-voice', 'present-continuous'] }),
  createQuestion({ id: 'q_eng_b2_08_005', type: 'true-false', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_01', textPlain: 'True or False: The object of an active sentence generally becomes the grammatical subject of the corresponding passive sentence.', options: [{ id: 'opt_true', text: 'True' }, { id: 'opt_false', text: 'False' }], correctOptionIds: ['opt_true'], explanationPlain: 'True. This is the basic structural change in an active-to-passive transformation.', difficulty: 'challenge', tags: ['passive-voice', 'transformation'] }),
  createQuestion({ id: 'q_eng_b2_09_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_02', textPlain: 'Change to reported speech: She said, “I will help you.”', options: [{ id: 'opt_1', text: 'She said that she would help me.' }, { id: 'opt_2', text: 'She said that I will help you.' }, { id: 'opt_3', text: 'She says that she would help me.' }, { id: 'opt_4', text: 'She said that she will help you yesterday.' }], correctOptionIds: ['opt_1'], explanationPlain: 'Will commonly backshifts to would in reported speech with a past reporting verb; pronouns also change as needed.', difficulty: 'easy', tags: ['reported-speech', 'future-in-past'] }),
  createQuestion({ id: 'q_eng_b2_09_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_02', textPlain: 'Change to reported speech: Amit said, “I can solve this problem.”', options: [{ id: 'opt_1', text: 'Amit said that he could solve that problem.' }, { id: 'opt_2', text: 'Amit said that I can solve this problem.' }, { id: 'opt_3', text: 'Amit says he could solve this problem.' }, { id: 'opt_4', text: 'Amit said that he can solved that problem.' }], correctOptionIds: ['opt_1'], explanationPlain: 'Can commonly changes to could, and this changes to that where appropriate.', difficulty: 'medium', tags: ['reported-speech', 'modals'] }),
  createQuestion({ id: 'q_eng_b2_09_003', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_02', textPlain: 'Change to reported speech: The boy said, “Do you know the answer?”', options: [{ id: 'opt_1', text: 'The boy asked if I knew the answer.' }, { id: 'opt_2', text: 'The boy said that do I know the answer.' }, { id: 'opt_3', text: 'The boy asked that I know the answer.' }, { id: 'opt_4', text: 'The boy said if I knew answer.' }], correctOptionIds: ['opt_1'], explanationPlain: 'A yes/no question is commonly reported with asked if/whether + statement word order.', difficulty: 'hard', tags: ['reported-speech', 'questions'] }),
  createQuestion({ id: 'q_eng_b2_09_004', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_02', textPlain: 'Which are appropriate reporting verbs for the following functions? (Select all that apply)', options: [{ id: 'opt_1', text: 'advised for advice' }, { id: 'opt_2', text: 'asked for a question' }, { id: 'opt_3', text: 'shouted for every polite request' }, { id: 'opt_4', text: 'said to for every command without adjustment' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'Advised is suitable for advice and asked is suitable for questions.', difficulty: 'hard', tags: ['reported-speech', 'reporting-verbs', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_b2_09_005', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_02', textPlain: "The doctor said to me, 'Take this medicine daily.' Change this to reported speech.", options: [{ id: 'opt_1', text: 'The doctor advised me to take that medicine daily.' }, { id: 'opt_2', text: 'The doctor advised me that take this medicine daily.' }, { id: 'opt_3', text: 'The doctor said me taking that medicine daily.' }, { id: 'opt_4', text: 'The doctor told to me that I take this medicine daily.' }], correctOptionIds: ['opt_1'], explanationPlain: 'An imperative giving advice is reported with a suitable reporting verb + object + to-infinitive.', difficulty: 'challenge', tags: ['reported-speech', 'advice'] }),
  createQuestion({ id: 'q_eng_b2_10_001', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_03', textPlain: 'Choose the comparative form of “happy”.', options: [{ id: 'opt_1', text: 'happier' }, { id: 'opt_2', text: 'happyer' }, { id: 'opt_3', text: 'more happier' }, { id: 'opt_4', text: 'happiest' }], correctOptionIds: ['opt_1'], explanationPlain: 'For many adjectives ending in consonant + y, y changes to i before -er: happier.', difficulty: 'easy', tags: ['degrees-of-comparison'] }),
  createQuestion({ id: 'q_eng_b2_10_002', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_03', textPlain: 'Choose the correct superlative form of “difficult”.', options: [{ id: 'opt_1', text: 'most difficult' }, { id: 'opt_2', text: 'difficultest' }, { id: 'opt_3', text: 'more difficultest' }, { id: 'opt_4', text: 'difficulter' }], correctOptionIds: ['opt_1'], explanationPlain: 'Long adjectives such as difficult normally take most for the superlative.', difficulty: 'medium', tags: ['degrees-of-comparison'] }),
  createQuestion({ id: 'q_eng_b2_10_003', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_03', textPlain: 'Change to comparative degree: “Very few cities are as crowded as Mumbai.”', options: [{ id: 'opt_1', text: 'Mumbai is more crowded than most other cities.' }, { id: 'opt_2', text: 'Mumbai is the most crowded than other cities.' }, { id: 'opt_3', text: 'Mumbai is crowded than every city.' }, { id: 'opt_4', text: 'Most cities are crowded as Mumbai is.' }], correctOptionIds: ['opt_1'], explanationPlain: '“Very few...as...as” can be changed to “Subject + comparative + than most other...”.', difficulty: 'hard', tags: ['degrees-of-comparison', 'transformation'] }),
  createQuestion({ id: 'q_eng_b2_10_004', type: 'multiple-select', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_03', textPlain: 'Which sentences use comparison correctly? (Select all that apply)', options: [{ id: 'opt_1', text: 'This road is wider than that one.' }, { id: 'opt_2', text: 'This is the most useful tool here.' }, { id: 'opt_3', text: 'He is more stronger than me.' }, { id: 'opt_4', text: 'She is the most kindest person.' }], correctOptionIds: ['opt_1', 'opt_2'], explanationPlain: 'Options 1 and 2 use single, correct comparative/superlative forms.', difficulty: 'hard', tags: ['degrees-of-comparison', 'multiple-select'] }),
  createQuestion({ id: 'q_eng_b2_10_005', type: 'mcq', subjectId: 'sub_eng', chapterId: 'chap_eng_04', topicId: 'top_eng_04_03', textPlain: 'Transform the following superlative sentence into positive degree without changing meaning:\n“Gold is one of the most precious metals.”', options: [{ id: 'opt_1', text: 'No other metal is as precious as gold.' }, { id: 'opt_2', text: 'Very few metals are as precious as gold.' }, { id: 'opt_3', text: 'Gold is more precious than any other metal.' }, { id: 'opt_4', text: 'All metals are as precious as gold.' }], correctOptionIds: ['opt_2'], explanationPlain: "The structure 'one of the + superlative' implies there are a few others in that top category, so its positive equivalent begins with 'Very few... are as... as...'.", difficulty: 'challenge', tags: ['degrees-of-comparison', 'advanced-transformation'] })
];

export const englishQuestions: Question[] = [...englishQuestionsBatch1, ...englishQuestionsBatch2];
