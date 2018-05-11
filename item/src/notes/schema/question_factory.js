import uniqid from 'uniqid';
import questionData from '../../config/notes/questions';

let questionIds = [];

// export default runId => ({
//   byId: questionData.reduce((p, c) => {
//     const curentQuestion = c;
//     curentQuestion.runId = runId;
//     curentQuestion.timestamp = new Date().getTime();
//     curentQuestion.id = uniqid('question_');
//     p = { ...p, [curentQuestion.id]: curentQuestion };
//     questionIds.push(curentQuestion.id);
//     return p;
//   }, {}),
//   questionIds
// });

export default (runId) => {
  questionIds = [];
  return ({
    byId: questionData.reduce((p, c) => {
      const curentQuestion = c;
      curentQuestion.runId = runId;
      curentQuestion.timestamp = new Date().getTime();
      curentQuestion.id = uniqid('question_');
      p = { ...p, [curentQuestion.id]: curentQuestion };
      questionIds.push(curentQuestion.id);
      return p;
    }, {}),
    questionIds
  });
};
