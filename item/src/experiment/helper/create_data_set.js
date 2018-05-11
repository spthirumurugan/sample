export default function createView(viewData, runId, id) {
  const views = {};
  const view = viewData;
  view.id = id;
  view.runId = runId;
  view.timeStamp = Date.now();
  views[view.id] = view;
  return views;
}
