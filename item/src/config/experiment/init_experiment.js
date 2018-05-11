import spriteData from './sprite_data';

export default {
  selected: '',
  suffleRefresh: false,
  activityActive: 'Phase0',
  screens: [
    {
      id: 'hammerBell',
      selected: false,
      force: 0,
      attempts: 5
    },
    {
      id: 'pendulum',
      force: 10,
      selected: false,
      attempts: 6,
      starData: [false, false, false]
    },
    {
      id: 'shuffleBoard',
      selected: false,
      attempts: -1,
      force: 0
    }
  ],
  items: ['pendulum', 'hammer', 'shuffleBoard'],
  hammerAnim: spriteData,
  questionPopup: false,
  ostPopup: false,
  ostCompletePopup: false,
  tabPopup: false,
  ostData: [
    {
      isShown: false,
      game: 'hammerBell',
      ost: 'Swing the hammer to ring the bell. Save energy by trying to use as little force as possible while still reaching the bell.'
    },
    {
      isShown: false,
      game: 'hammerBell',
      ost: '1. Move the slider to choose a force.<br/>2. When you are ready to swing the hammer, choose "Start."<br/>3. Observe the motion of the bell ringer.<br/>4. Record your observations in the table.'
    },
    {
      isShown: false,
      game: 'hammerBell',
      ost: 'Repeat to collect data for a total of five different forces.'
    },
    {
      isShown: false,
      game: 'pendulum',
      ost: 'Choose the starting height of the pendulum on the left to try to reach the prizes at different heights on the right.'
    },
    {
      isShown: false,
      game: 'pendulum',
      ost: '1. Move the pendulum to choose a starting height.<br/>2. When you are ready to release the pendulum, choose "Start."<br/>3. Observe the pendulum\'s motion.'
    },
    {
      isShown: false,
      game: 'pendulum',
      ost: 'How would you describe the motion of the pendulum? <br/>Record your observations in the table.'
    },
    {
      isShown: false,
      game: 'pendulum',
      ost: 'Repeat the investigation to try to collect all of the prizes.'
    },
    {
      isShown: false,
      game: 'shuffleBoard',
      ost: 'Change the force and direction that you push the puck. Try to make the puck stop in the circles to win points.'
    },
    {
      isShown: false,
      game: 'shuffleBoard',
      ost: '1. Move the slider to select the force.<br/>2. Rotate the arrow to choose the direction.<br/>3. When you are ready to push the puck, choose "Start."<br/>4. Record your observations in the table.'
    },
    {
      isShown: false,
      game: 'shuffleBoard',
      ost: 'Change the force or the direction on your next try. Only change one at a time.'
    }
  ]
};
