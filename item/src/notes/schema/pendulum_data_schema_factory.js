const pendulumDataSchema = {
  props: ['attempt', 'height', 'speed', 'speed_10L', 'speed_0B', 'speed_10R', 'speed_TR', 'observation'],
  byProp: {
    attempt: {
      prop: 'attempt', // Required
      type: 'string', // Required
      label: 'Attempt', // Required
      placeHolder: 'Attempt',
      refreshFlag: false
    },
    height: {
      prop: 'height', // Required
      type: 'number', // Required
      label: 'Starting Height (cm)', // Required
      placeHolder: 'Starting Height (cm)',
      refreshFlag: false,
      color: '#811747'
    },
    speed: {
      prop: 'speed', // Required
      type: 'number', // Required
      label: 'Initial Speed', // Required
      placeHolder: 'Initial Speed',
      refreshFlag: false,
      color: '#436dae'
    },
    speed_10L: {
      prop: 'speed_10L', // Required
      type: 'number', // Required
      label: 'Speed at 10 cm on Left', // Required
      placeHolder: 'Speed at 10 cm on Left',
      refreshFlag: false,
      color: '#0eb592'
    },
    speed_0B: {
      prop: 'speed_0B', // Required
      type: 'number', // Required
      label: 'Speed at 0 cm (Bottom)', // Required
      placeHolder: 'Speed at 0 cm (Bottom)',
      refreshFlag: false,
      color: '#f0a91e'
    },
    speed_10R: {
      prop: 'speed_10R', // Required
      type: 'number', // Required
      label: 'Speed at 10 cm on Right', // Required
      placeHolder: 'Speed at 10 cm on Right',
      refreshFlag: false,
      color: '#436dae'
    },
    speed_TR: {
      prop: 'speed_TR', // Required
      type: 'number', // Required
      label: 'Speed at Top Right', // Required
      placeHolder: 'Speed at Top Right',
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
  selected: ['attempt', 'height', 'speed', 'speed_10L', 'speed_0B', 'speed_10R', 'speed_TR', 'observation'],
  gameType: 'pendulum'
};

const pendulumDataSchemaFactory = props => ({
  ...pendulumDataSchema,
  props: props || pendulumDataSchema.props
});

export default pendulumDataSchemaFactory;
