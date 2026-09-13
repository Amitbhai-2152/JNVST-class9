import type { Question, ContentBlock, ID } from '../types';

export function createQuestion(params: {id:ID;type:Question['type'];subjectId:ID;chapterId:ID;topicId:ID;passageId?:ID;textPlain:string;options:{id:ID;text:string}[];correctOptionIds:ID[];explanationPlain:string;difficulty:Question['difficulty'];tags?:string[];metadata?:Question['metadata']}): Question {
  const text: ContentBlock[] = [{ type:'paragraph', text:params.textPlain }];
  const explanation: ContentBlock[] = params.explanationPlain ? [{type:'paragraph',text:params.explanationPlain}] : [];
  return {id:params.id,type:params.type,subjectId:params.subjectId,chapterId:params.chapterId,topicId:params.topicId,passageId:params.passageId,text,options:params.options,correctOptionIds:params.correctOptionIds,explanation,difficulty:params.difficulty,tags:params.tags ?? [],metadata:params.metadata};
}
