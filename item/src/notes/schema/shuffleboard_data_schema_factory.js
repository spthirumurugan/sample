const shuffleboardDataSchema = {
  props: ['force', 'direction_F', 'distance', 'direction_M', 'observation'],
  byProp: {
    force: {
      prop: 'force', // Required
      type: 'number', // Required
      label: 'Force Setting', // Required
      placeHolder: 'Force Setting',
      refreshFlag: false,
      color: '#811747'
    },
    direction_F: {
      prop: 'direction_F', // Required
      type: 'string', // Required
      label: 'Direction of Force', // Required
      placeHolder: 'Direction of Force',
      refreshFlag: false
    },
    distance: {
      prop: 'distance', // Required
      type: 'number', // Required
      label: 'Distance (m)', // Required
      placeHolder: 'Distance (m)',
      refreshFlag: false,
      color: '#436dae'
    },
    direction_M: {
      prop: 'direction_M', // Required
      type: 'string', // Required
      label: 'Direction of Motion', // Required
      placeHolder: 'Direction of Motion',
      refreshFlag: false
    },
    observation: {
      prop: 'observation', // Required
      type: 'string', // Required
      label: 'Observations of Motion', // Required
      placeHolder: 'Observations of Motion',
      refreshFlag: false
    }
  },
  selected: ['force', 'direction_F', 'distance', 'direction_M', 'observation'],
  gameType: 'shuffleBoard'
};

const shuffleboardDataSchemaFactory = props => ({
  ...shuffleboardDataSchema,
  props: props || shuffleboardDataSchema.props
});

export default shuffleboardDataSchemaFactory;
