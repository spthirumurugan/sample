export default function createView(viewData, runId, id) {
  const views = {};
  const view = viewData;
  view.id = id;
  view.runId = runId;
  view.timeStamp = Date.now();
  if (view.filter) {
    view.filter.notesType = `${runId}_${view.filter.type}`;
  }
  views[view.id] = view;
  return views;
}
