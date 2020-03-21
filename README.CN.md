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


## 如何使用

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

初始化时的标签文本列表。

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

## 实例方法

### tagcloud.update(texts)

更新标签文本列表。

### tagcloud.destroy()

摧毁标签云实例

## License

MIT
