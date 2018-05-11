import PIXI from 'pixi.js';

function webpackJsonLoader(name, pathToImage, data, resolution = parseInt(data.meta.scale, 10)) {
  PIXI.loader.add(name, pathToImage, (res) => {
    const frames = data.frames;
    const frameKeys = Object.keys(frames);

    let frameIndex = 0;

    while (frameIndex < frameKeys.length) {
      const frame = frames[frameKeys[frameIndex]];
      const rect = frame.frame;

      if (rect) {
        let size = null;
        let trim = null;
        const orig = new PIXI.Rectangle(
          0,
          0,
          frame.sourceSize.w / resolution,
          frame.sourceSize.h / resolution
        );
        if (frame.rotated) {
          size = new PIXI.Rectangle(rect.x, rect.y, rect.h, rect.w);
        } else {
          size = new PIXI.Rectangle(rect.x, rect.y, rect.w, rect.h);
        }

        //  Check to see if the sprite is trimmed
        if (frame.trimmed) {
          trim = new PIXI.Rectangle(
            frame.spriteSourceSize.x / resolution,
            frame.spriteSourceSize.y / resolution,
            frame.spriteSourceSize.w / resolution,
            frame.spriteSourceSize.h / resolution
          );
        }

        // flip the width and height!
        if (frame.rotated) {
          const temp = size.width;
          size.width = size.height;
          size.height = temp;
        }

        size.x /= resolution;
        size.y /= resolution;
        size.width /= resolution;
        size.height /= resolution;

        PIXI.utils.TextureCache[frameKeys[frameIndex]]
        = new PIXI.Texture(res.texture.baseTexture, size, orig, trim, frame.rotated ? 2 : 0);
      }
      frameIndex += 1;
    }
  });
}

export default webpackJsonLoader;
