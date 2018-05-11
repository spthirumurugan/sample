/* eslint global-require: "off"*/
export default
{
  id: 'hammer_sprite',
  name: 'hammer sprite',
  draggable: false,
  x: 622,
  y: 310,
  states: {
    selected: 'hammer',
    byId: {
      hammer: {
        id: 'hammer',
        data: require('../media/images/hammer_anim.json'),
        image: require('../media/images/hammer_anim.png'),
        loop: false,
        speed: 0.5
      }
    },
    items: ['hammer']
  },
  1: [3, 4],
  2: [3, 4],
  3: [2, 4],
  4: [2, 4],
  5: [1, 4],
  6: [1, 4],
  7: [0, 4],
  8: [0, 4],
  9: [0, 4]
};
