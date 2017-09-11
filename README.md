# Intro

A browser based [Image-Pal](https://github.com/asilvas/image-pal) implementation that leverages `Image` and `Canvas` for fast palette generation.


## Demo

To see demo clone this repo and open `demo/index.html` in any browser (IE11 or later). Select image (or drag & drop) to see palette.

![NPM](https://raw.githubusercontent.com/asilvas/image-pal-canvas/master/docs/demo.jpg)


## Usage

Very similar pattern to its parent [Image-Pal](https://github.com/asilvas/image-pal#usage), but asyncrhonous to accomodate events (onload, etc).
Additionally, `rgb` spectrum is used by default for client to keep size small. Specify `hsluv` directly if you want the extra weight.

```
  const getColors = require('image-pal-canvas/lib/hsluv');
  // OR if you want the non-human-perceptual version based on pure RGB
  // const getColors = require('image-pal-canvas/lib/rgb');
  
  getColors(options, (err, colors) => {
    if (err) return void console.error('oops!', err.stack || err);

    colors.forEach(color => {
      console.log(color.rgb); // [ 100, 100, 100 ]
      console.log(color.alpha); // 255
      console.log(color.hex); // #abc123
      // below props only available if using `hsluv` version
      console.log(color.hsluv); // [ 1, 50, 100 ]
    });
  });
```


## Options

Large images are not necessary for computing accurate palettes. It's highly recommended to use default settings for high performance and quality results.

| Name | Type | Default | Desc |
| --- | --- | --- | --- |
| srcUrl | String | (optional) | If you're supplying your own image url |
| width | Number | `100` | Maximum width of canvas in pixels. Only `width` OR `height` should be set, not both, to respect aspect ratio of source image |
| height | Number | `undefined` | Maximum height of canvas in pixels. Only `width` OR `height` should be set, not both, to respect aspect ratio of source image |
| imageEl | HTMLElement | (optional) | If specified, will use supplied `img` element instead of automatically created background image |
| canvasEl | HTMLElement | (optional) | If specified, will use supplied `canvas` element instead of automatically created background canvas |
| inputEl | HTMLElement | (optional) | If specified, will use supplied `input` to use as the file load trigger. MUST be of `type='file'` |

Additional tuning options can be found at [Image-Pal](https://github.com/asilvas/image-pal#options).


## Source Usage

The simplest example where we want everything to happen in the background and simply return the color palette once available.

```
  getColors({ srcUrl: '//some-domain.com/some-image.jpg' }, (err, colors) => {
    // do something with err & colors
  });
```


## Image Usage

Here we have an existing `img` element we want to attach to.

```
  getColors({ imageEl: document.getElementById('myImage') }, (err, colors) => {
    // do something with err & colors
  });
```


## Canvas Usage

Here we have an existing `canvas` element we want to attach to.

```
  getColors({ canvasEl: document.getElementById('myCanvas') }, (err, colors) => {
    // do something with err & colors
  });
```


## Upload Usage

Here we have an existing `input` element we want to attach to.

```
  getColors({ inputEl: document.getElementById('myUploadButton') }, (err, colors) => {
    // do something with err & colors
  });
```


## Advanced Usage

Here we're attaching to an existing `img`, `canvas`, and `input` elements.

```
  getColors({
    srcUrl: '//some-domain.com/some-image.jpg', // set default image
    imageEl: document.getElementById('myImage'), // attach to existing `img` element
    canvasEl: document.getElementById('myCanvas'), // render to my visible canvas
    inputEl: document.getElementById('myUploadButton') // update image & canvas if user tries to upload file
  }, (err, colors) => {
    // do something with err & colors
  });
```


## Unregister Usage

If you need unregister listeners simply:

```
  const getColorsInstance = getColors(options, cb);

  getColorsInstance.unregister(); // free me!
```
