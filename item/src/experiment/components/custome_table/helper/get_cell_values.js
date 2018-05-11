export default function getCellValues(dataset, view) {
  const { selected, byProp } = view.schema;
  let value = '';
  let type = '';
  return selected.map((p) => {
    switch (byProp[p].rowType) {
      case 'image': value = dataset[p].src;
        type = byProp[p].rowType;
        break;
      default:
        value = String(dataset[p]);
        type = byProp[p].rowType;
        break;
    }
    return (
    {
      type, value
    }
    );
  }
);
}
