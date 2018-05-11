export default {
  id: 'support',
  label: 'Support',
  title: 'Support',
  items: ['userGuide', 'learningTips', 'background', 'rubric', 'imageCredits'],
  selected: 'userGuide',
  byId: {
    userGuide: {
      id: 'userGuide',
      title: 'User Guide',
      label: 'User Guide',
      content: require('./user_guide.html'),
      audio: {
        type: 'audio',
        src: ''
      }
    },
    learningTips: {
      id: 'learningTips',
      title: 'Three-Dimensional Learning Tips',
      label: 'Three-Dimensional Learning Tips',
      content: require('./learning_tips.html'),
      audio: {
        type: 'audio',
        src: ''
      }
    },
    background: {
      id: 'background',
      title: 'Background',
      label: 'Background',
      content: require('./background.html'),
      audio: {
        type: 'audio',
        src: ''
      }
    },
    rubric: {
      id: 'rubric',
      title: 'Rubric',
      label: 'Rubric',
      content: require('./rubric.html'),
      audio: {
        type: 'audio',
        src: ''
      },
      printButton:true
    },
    imageCredits: {
      id: 'imageCredits',
      title: 'Image Credits',
      label: 'Image Credits',
      content: require('./image_credits.html'),
      audio: {
        type: 'audio',
        src: ''
      }
    }
  }
};
