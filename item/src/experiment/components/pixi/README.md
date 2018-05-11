# Pixi components README

When working with PIXI we use the concept of Elements - these represent a single
object that have various states. Each Element state can have its own sprite data
This gives us more control over and allows for smaller Spritesheets.


### Elements with state
This is an example of the schema that must be followed.

```javascript
{
  id: 'dummy_1',
  name: 'Dummy 1',
  type: 'element',
  component: 'element_container',
  draggable: false,
  x: 100,
  y: 100,
  states: {
    selected: 'single',
    byId: {
      single: {
        id: 'single',
        data: require('./media/sprite.json'),
        image: require('./media/sprite.png'),
        loop: true
      }
    },
    items: ['single']
  }
}
```

### layer
This object can be used for background images and elements that contain no
interactive functionality or states.

```javascript
{
  id: 'dummy_1',
  name: 'Dummy 1',
  type: 'layer',
  component: 'layer_container',
  x: 0,
  y: 0,
  image: require('./media/background.png')
}
```


### Classes

#### PixiCanvas
This component creates a canvas element and creates a PIXI component to manipulate
it.

#### Pixi
This class creates the basic pixi functionality.

#### DraggableContainer
This class is abstract class that handles the drag functionality. Extend this class
to have drag functionality in you containers.

#### ElementContainer
Extends DraggableContainer, this component handles the loading and updates of
elements and the transition through its states.

#### LayerContainer
Simple layer component that can be used for background images etc.
