**English** | [中文](./README.CN.md)

<p align="center">
  <img alt="TagCloud" src="https://raw.githubusercontent.com/mcc108/TagCloud/master/examples/tagcloud.gif" width="200">
</p>

<h1 align="center">TagCloud.js</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/TagCloud"><img alt="npm" src="https://img.shields.io/npm/v/TagCloud.svg?style=flat-square"></a>
  <a href="https://github.com/mcc108/TagCloud/tree/master/dist"><img alt="minsize" src="https://img.shields.io/bundlephobia/min/TagCloud?label=TagCloud&style=flat-square"></a>
  <a href="https://www.npmjs.com/package/TagCloud"><img alt="downloads" src="https://img.shields.io/npm/dt/TagCloud?style=flat-square"></a>
</p>

<p align="center">
  It's 3D <strong>TagCloud</strong> that rolling with the mouse. It's only 6KB in minsize and doesn't depend on other libraries. <a href="http://tagcloud.congm.in/examples">Examples</a>
</p>

- [Usage](#usage)
  - [npm](#npm)
  - [Browser](#browser)
- [Constructor](#constructor)
  - [TagCloud(container, texts, options)](#tagcloudcontainer-texts-options)
    - [container](#container)
    - [texts](#texts)
    - [options](#options)
      - [options.radius](#optionsradius)
      - [options.maxSpeed](#optionsmaxspeed)
      - [options.initSpeed](#optionsinitspeed)
      - [options.direction](#optionsdirection)
      - [options.keep](#optionskeep)
      - [options.containerClass](#optionscontainerClass)
      - [options.itemClass](#optionsitemClass)
      - [options.useContainerInlineStyles](#optionsuseContainerInlineStyles)
      - [options.useItemInlineStyles](#optionsuseItemInlineStyles)
- [Instance](#instance)
  - [tagcloud.update(texts)](#tagcloudupdatetexts)
  - [tagcloud.pause()](#tagcloudpause)
  - [tagcloud.resume()](#tagcloudresume)
  - [tagcloud.destroy()](#tagclouddestroy)
- [Custom event handler](#custom-event-handler)
  - [Use event delegation bind event listener to TagCloud instance root element](#use-event-delegation-bind-event-listener-to-tagcloud-instance-root-element)
- [License](#license)
## Usage

### npm

```bash
$ npm i -S TagCloud
```

```js
const TagCloud = require('TagCloud');
const container = '.tagcloud';
const options = {};

// using plain text as tags
TagCloud(container, [
    '3D', 'TagCloud', 'JavaScript',
    'CSS3', 'Animation', 'Interactive',
    'Mouse', 'Rolling', 'Sphere',
    '6KB', 'v2.x',
], options);
```

```js
// or, using html with optional mutator function for customization
// below example requires jQuery
const randomColor = () => `hsl(${Math.random() * 360}, 100%, 70%)`;

TagCloud(container, [
    ['Hello World!', function () {
        $(this).css("color", randomColor);
        setInterval(() => $(this).css("color", randomColor), 1000);
    }],
    'It works!',
    '🎉🎉🎉',
    '<a href="somepage" style="font-size: 4em">Click Me!</a>',
    ['Google', function () { $(this).click(e => window.open('https://www.google.com')) }]
], { radius: 360 });
```


### Browser

```html
<!-- html -->
<script type="text/javascript" src="./dist/TagCloud.min.js"></script>
```

```js
TagCloud(container, texts, options);
```

## Constructor

### TagCloud(container, texts, options)

Returns tagcloud instance.

#### container

Type: `String` or `HTMLElement` or `Array`

Container for constructing a tagcloud.

#### texts

Type: `Array`

List of tag text for init. HTML is also supported.

An array can also be passed instead of each text or html entry.
When used like this, a mutator function can be passed as the 2nd member of the array.
Refer to the examples section for details.

#### options

Type: `Object`

##### options.radius

Type: `Number`\
Default: `100`\
Unit: `px`

Rolling radius.

##### options.maxSpeed

Optional: `'slow'`, `'normal'`, `'fast'`\
Default: `'normal'`

Rolling max speed.

##### options.initSpeed

Optional: `'slow'`, `'normal'`, `'fast'`\
Default: `'normal'`

Rolling init speed.

##### options.direction

Type: `Number`\
Default: `135` (right-bottom)\
Unit: clockwise `deg`

Rolling init direction, e.g. `0` (top) , `90` (left), `135` (right-bottom) ...

##### options.keep

Type: `Boolean`\
Default: `true`

Whether to keep rolling after mouse out area. Default `true` (decelerate to rolling init speed, and keep rolling with mouse).

##### options.containerClass

Type: `String`\
Default: `tagcloud`

Css class to be used for the tagcloud container. Default `tagcloud`

##### options.itemClass

Type: `String`\
Default: `tagcloud--item`

Css class to be used for tagcloud items. Default `tagcloud--item`

##### options.useContainerInlineStyles

Type: `Boolean`\
Default: `true`

Add inline styles to the tagcloud container which are required for correct view. When this option is disabled you have to add the css by yourself. Default `true`

##### options.useItemInlineStyles

Type: `Boolean`\
Default: `true`

Add common inline styles to the items which are required for correct view. When this option is disabled you have to add the css by yourself. Default `true`

## Instance

### tagcloud.update(texts)

Update tag list.

### tagcloud.pause()

Pause the tagcloud animation.

### tagcloud.resume()

Resume the tagcloud animation.

### tagcloud.destroy()

Destroy the tagcloud instance.

## Custom event handler

### Use event delegation bind event listener to TagCloud instance root element

The following is an example, click the TagCloud sub-item to jump to Google to search for keywords.

```javascript
let rootEl = document.querySelector('.content');
rootEl.addEventListener('click', function clickEventHandler(e) {
    if (e.target.className === 'tagcloud--item') {
        window.open(`https://www.google.com/search?q=${e.target.innerText}`, '_blank');
        // your code here
    }
});
```

## License

MIT
