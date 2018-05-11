export default function getCell(dataset, view) {
  const { props, byProp } = view.schema;
  let value = '';
  let type = '';
  return props.map((p) => {
    switch (byProp[p].rowType) {
      case 'image': value = dataset[byProp[p].src];
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
