export default {
  viewSchema1: {
    type: 'view',
    renderer: 'table',
    component: 'table',
    filter: {
      maxRows: 5,
      orderBy: 'descending',
      type: 'hammerBell',
      notesType: ''
    },
    renderConfig: [{
      id: 'force',
      data: 'Force Setting',
      type: 'text'
    }, {
      id: 'height',
      data: 'Height of the Bell Ringer (feet)',
      type: 'text'
    }, {
      id: 'observation',
      data: 'Observations of Motion',
      type: 'text'
    }]
  },
  viewSchema2: {
    type: 'view',
    renderer: 'table',
    component: 'table',
    filter: {
      maxRows: 6,
      orderBy: 'descending',
      type: 'pendulum',
      notesType: ''
    },
    renderConfig: [{
      id: 'attempt',
      data: 'Attempt',
      type: 'text'
    }, {
      id: 'height',
      data: 'Starting Height (cm)',
      type: 'text'
    }, {
      id: 'speed',
      data: 'Initial Speed',
      type: 'text'
    }, {
      id: 'speed_10L',
      data: 'Speed at 10 cm on Left',
      type: 'text'
    }, {
      id: 'speed_0B',
      data: 'Speed at 0 cm (Bottom)',
      type: 'text'
    }, {
      id: 'speed_10R',
      data: 'Speed at 10 cm on Right',
      type: 'text'
    }, {
      id: 'speed_TR',
      data: 'Speed at Top Right',
      type: 'text'
    }, {
      id: 'observation',
      data: 'Observations of Motion',
      type: 'text'
    }]
  },
  viewSchema3: {
    type: 'view',
    renderer: 'table',
    component: 'table',
    filter: {
      maxRows: 3,
      orderBy: 'descending',
      type: 'shuffleBoard',
      notesType: ''
    },
    renderConfig: [{
      id: 'force',
      data: 'Force Setting',
      type: 'text'
    }, {
      id: 'direction_F',
      data: 'Direction of Force',
      type: 'text'
    }, {
      id: 'distance',
      data: 'Distance (m)',
      type: 'text'
    }, {
      id: 'direction_M',
      data: 'Direction of Motion',
      type: 'text'
    }, {
      id: 'observation',
      data: 'Observations of Motion',
      type: 'text'
    }]
  },
  dataSchema1: {
    force: '',
    height: '',
    observation: '',
    observationType: 'textarea',
    gameType: 'hammerBell'
  },
  dataSchema2: {
    attempt: '',
    height: '',
    speed: '',
    speed_10L: '',
    speed_0B: '',
    speed_10R: '',
    speed_TR: '',
    observation: '',
    observationType: 'textarea',
    gameType: 'pendulum'
  },
  dataSchema3: {
    force: '',
    direction_F: '',
    distance: '',
    direction_M: '',
    observation: '',
    observationType: 'textarea',
    gameType: 'shuffleBoard'
  }
};
