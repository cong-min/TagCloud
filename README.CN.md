[English](./README.md) | **中文**

<p align="center">
    <a href="https://github.com/mcc108/TagCloud" rel="noopener noreferrer">
        <img width="200" src="https://github.com/mcc108/TagCloud/blob/master/examples/tagcloud.gif?raw=true" alt="TagCloud">
    </a>
</p>

<h1 align="center">TagCloud.js</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/TagCloud"><img alt="npm" src="https://img.shields.io/npm/v/TagCloud.svg?style=flat-square"></a>
  <a href="https://github.com/mcc108/TagCloud/tree/master/dist"><img alt="minsize" src="https://img.shields.io/bundlephobia/min/TagCloud?label=TagCloud&style=flat-square"></a>
  <a href="https://www.npmjs.com/package/TagCloud"><img alt="downloads" src="https://img.shields.io/npm/dt/TagCloud?style=flat-square"></a>
</p>

<p align="center">
  它是随着鼠标滚动的3D<strong>标签云</strong>，只有6kb大小，不依赖任何其他类库。 <a href="http://tagcloud.congm.in/examples">例子</a>
</p>

- [如何使用](#如何使用)
  - [npm](#npm)
  - [浏览器](#浏览器)
- [构造函数](#构造函数)
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
- [实例方法](#实例方法)
  - [tagcloud.update(texts)](#tagcloudupdatetexts)
  - [tagcloud.pause()](#tagcloudpause)
  - [tagcloud.resume()](#tagcloudresume)
  - [tagcloud.destroy()](#tagclouddestroy)
- [自定义事件](#自定义事件)
  - [使用事件委托机制来为标签云子项添加自定义事件](#使用事件委托机制来为标签云子项添加自定义事件)]
- [License](#license)
## 如何使用

### npm

```bash
$ npm i -S TagCloud
```

```js
const TagCloud = require('TagCloud');
const container = '.tagcloud';
const options = {};

// 使用文本作为标签
TagCloud(container, [
    '3D', 'TagCloud', 'JavaScript',
    'CSS3', 'Animation', 'Interactive',
    'Mouse', 'Rolling', 'Sphere',
    '6KB', 'v2.x',
], options);
```

```js
// 或者可以使用HTML，和可选的mutator函数
// 下面的示例依赖jQuery
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


### 浏览器

```html
<!-- html -->
<script type="text/javascript" src="./dist/TagCloud.min.js"></script>
```

```js
TagCloud(container, texts, options);
```

## 构造函数

### TagCloud(container, texts, options)

返回 tagcloud 实例。

#### container

类型: `String` 或 `HTMLElement` 或 `Array`

用于构造标签云的容器。

#### texts

类型: `Array`

初始化时的标签文本或HTML列表。

Array也可以用来代替每条文本或者HTML。
使用Array时，第一项为文本或HTML，第二项为可选的函数。
使用方法参考上方示例。

#### options

类型: `Object`

##### options.radius

类型: `Number`\
默认值: `100`\
单位: `px`

滚动半径。

##### options.maxSpeed

可选值: `'slow'`, `'normal'`, `'fast'`\
默认值: `'normal'`

滚动最大速度。

##### options.initSpeed

可选值: `'slow'`, `'normal'`, `'fast'`\
默认值: `'normal'`

滚动初始速度。

##### options.direction

类型: `Number`\
默认值: `135` (向右下滚动)\
单位: 顺时针角度 `deg`

滚动初始方向，例如 `0` (向上滚动) , `90` (向左滚动), `135` (向右下滚动) ...

##### options.keep

类型: `Boolean`\
默认值: `true`

鼠标移除容器区域时是否保持继续滚动。默认为是 `true`，减速至初始滚动速度，然后继续随鼠标滚动。

##### options.containerClass

类型: `String`\
默认值: `tagcloud`

用于 tagcloud 容器的CSS样式 class。

##### options.itemClass

类型: `String`\
默认值: `tagcloud--item`

用于 tagcloud 标签项的CSS样式 class。

##### options.useContainerInlineStyles

Type: `Boolean`\
Default: `true`

使用正常视图的内联样式添加到 tagcloud 容器上；禁用此选项后，你必须自己添加CSS。

##### options.useItemInlineStyles

类型: `Boolean`\
默认值: `true`

使用正常视图的内联样式添加到 tagcloud 标签项上；禁用此选项后，你必须自己添加CSS。

## 实例方法

### tagcloud.update(texts)

更新标签文本列表。

### tagcloud.pause()

暂停标签云动画。

### tagcloud.resume()

继续标签云动画。

### tagcloud.destroy()

摧毁标签云实例。

## 自定义事件

### 使用事件委托机制来为标签云子项添加自定义事件

以下是示例，点击标签云子项跳转到 Google 去搜索关键字

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
