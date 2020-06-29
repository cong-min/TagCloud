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
- [Instance](#instance)
  - [tagcloud.update(texts)](#tagcloudupdatetexts)
  - [tagcloud.destroy()](#tagclouddestroy)
- [Custom event handler](#custom-event-handler)
  - [Use event delegation bind event listener to TagCloud instance root element](#use-event-delegation-bind-event-listener-to-tagcloud-instance-root-element)
- [Custom style](#custom-style)
  - [Add custom colors to TagCloud sub-item](#add-custom-colors-to-tagcloud-sub-item)
- [License](#license)
## Usage

### npm

```bash
$ npm i -S TagCloud
```

```js
const TagCloud = require('TagCloud');

const container = '.tagcloud';
const texts = [
    '3D', 'TagCloud', 'JavaScript',
    'CSS3', 'Animation', 'Interactive',
    'Mouse', 'Rolling', 'Sphere',
    '6KB', 'v2.x',
];
const options = {};

TagCloud(container, texts, options);
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

List of tag text for init.

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

## Instance

### tagcloud.update(texts)

Update tag list.

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

## Custom style

### Add custom colors to TagCloud sub-item

The following is an example, TagCloud sub-item is in green font, and when it is moved to it, it becomes red.

First, add an extra class to the container (the container used to construct TagCloud, the container in this example is called content), such as diy.

```html
<div class="content diy"></div>
```

```css
.diy .tagcloud--item {
    color: #67C23A;
}

.diy .tagcloud--item:hover {
    color: #F56C6C;
}
```

## License

MIT
