/**
 *  This is an how to create a data object for you specific cdlo.
 *  Please ensure all dataset objects follow this same basic schema
 *  Unique id for data objects are prefixed with 'data_' to make it easy
 *  debug later.
 *
 *  Run id is supplied at execution time and is passed into the factory as a
 *  param.
 *
 */
import uniqid from 'uniqid';

// const dataSet = {
//   id: undefined,
//   runId: undefined,
//   timestamp: undefined,
//   eValue: 0,
//   sValue: 0,
//   oValue: ''
// };

export default (runId, data) => ({
  ...data,
  timestamp: new Date().getTime(),
  id: uniqid('data_'),
  runId
});
