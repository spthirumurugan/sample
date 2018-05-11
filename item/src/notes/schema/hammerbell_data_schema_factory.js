const hammerbellDataSchema = {
  props: ['force', 'height', 'observation'],
  byProp: {
    force: {
      prop: 'force', // Required
      type: 'number', // Required
      label: 'Force Setting', // Required
      placeHolder: 'Force Setting',
      refreshFlag: false,
      color: '#f0a91e'
    },
    height: {
      prop: 'height', // Required
      type: 'number', // Required
      label: 'Height of the Bell Ringer (feet)', // Required
      placeHolder: 'Height of the Bell Ringer (feet)',
      refreshFlag: false,
      color: '#0eb592'
    },
    observation: {
      prop: 'observation', // Required
      type: 'string', // Required
      label: 'Observations of Motion', // Required
      placeHolder: 'Observations of Motion',
      refreshFlag: false
    }
  },
  selected: ['force', 'height', 'observation'],
  gameType: 'hammerBell'
};

const hammerbellDataSchemaFactory = props => ({
  ...hammerbellDataSchema,
  props: props || hammerbellDataSchema.props
});

export default hammerbellDataSchemaFactory;
