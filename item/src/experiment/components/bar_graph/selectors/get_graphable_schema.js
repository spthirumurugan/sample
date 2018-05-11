export default (notes, viewId) => {
  const view = notes.byId[viewId];
  const schema = view.schema.selected.reduce((prev, cur) => {
    const propObj = view.schema.byProp[cur];
    if (propObj.type === 'number') {
      return [...prev, propObj];
    }
    return prev;
  }, []);
  return schema;
};
