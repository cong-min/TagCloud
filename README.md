TagCloud v1.1.1
===

TagCloud是一个能随鼠标滚动的3d标签云. (with javascript, but no jquery and only 4kb)

homepage: http://tagcloud.congm.in

demo: http://tagcloud.congm.in/demo.html

example: https://cqupt.congm.in

***

### 目录结构
```
tagcloud
 ├─ LICENSE               // MIT License
 ├─ README.md
 ├─ webpack.config.js
 ├─ package.json
 ├─ src
 │     └─ ...               // 打包前文件
 ├─ example
 │     ├─ demo.html         // demo页面
 │     ├─ index.css         // index页面样式
 │     ├─ index.html        // index页面
 │     └─ index.js
 └─ dist
       ├─ tagcloud.css      // css style (<1kb)
       ├─ tagcloud.js       // js (<9kb)
       ├─ tagcloud.min.css  // min.css (<1kb)
       └─ tagcloud.min.js   // min.js (<4kb)
```

## Getting started:

```
npm install TagCloud --save
```

```
require('TagCloud');
```

### OR

---

#### 1、Download，[下载](https://github.com/mcc108/tagcloud/releases)
* 下载`dist`文件夹中`tagcloud.min.css`文件
* 下载`dist`文件夹中`tagcloud.min.js`文件

#### 2、Include，在HTML中加载这两个文件
* 根据你的路径将`tagcloud.css`文件插入至`</head>`前
```
<link rel="stylesheet" href="tagcloud.min.css">
```
* 根据你的路径将`tagcloud.min.js`文件插入至`</head>`前或`</body>`前
```
<script src="tagcloud.min.js"></script>
```

## Build

* HTML，将数量不限的tag放入`a标签`内，并放入至class为`tagcloud`元素中
```
<div class="tagcloud">
  <a href="#">text</a>
  <a href="#">text</a>
  <a href="#">text</a>
  <a href="#">text</a>
  <a href="#">text</a>
  <a href="#">text</a>
  <a href="#">text</a>
</div>
```
* 将上述class为`tagcloud`的元素放入固定了`height`和`width`的你自己创建的元素中，如: `创建一个height和width都为400px的div`
```
<div style="height: 400px; width: 400px;">
  <div class="tagcloud">
    ...
  </div>
</div>
```
* JS，调用
```
tagcloud();
```
* Run it, and have fun!
  * 默认样式[demo效果](http://tagcloud.congm.in)

  ![taglcoud](https://raw.githubusercontent.com/mcc108/MarkdownPhotos/master/tagcloud/tagcloud2.png)

---

#### * 4、More
* 两种样式（背景皆为透明）
  * 默认样式（黑色字体）如上，外层元素设置为`class="tagcloud"`
  * light样式（白色字体），外层元素设置为`class="tagcloud tagcloud-light"`
    * light样式[demo效果](http://tagcloud.congm.in)

  ![taglcoud](https://raw.githubusercontent.com/mcc108/MarkdownPhotos/master/tagcloud/tagcloud1.png)

* 更多参数设置`options`
```
tagcloud(options);
```

## Options参数:
### 默认参数例子
```
  tagcloud({
  //参数名: 默认值
    selector: ".tagcloud",  //元素选择器
    fontsize: 16,       //基本字体大小
    radius: 60,         //滚动半径
    mspeed: "normal",   //滚动最大速度
    ispeed: "normal",   //滚动初速度
    direction: 135,     //初始滚动方向
    keep: true          //鼠标移出组件后是否继续随鼠标滚动
  });
```
### 参数列表
* `selector`
  * 元素选择器, 选择包含着标签的外层元素
  * 取值(string字符串): 选择器
  * 默认值：`.tagcloud`
* `fontsize`
  * 基本字体大小
  * 取值(number数值): 单位px
  * 默认值：`16`
* `radius`
  * 滚动半径
  * 取值(number数值): 单位px
  * 默认值：`60`
* `mspeed`
  * 滚动最大速度
  * 取值(string字符串): `slow`, `normal`, `fast`
  * 默认值：`normal`
* `ispeed`
  * 滚动初速度
  * 取值(string字符串): `slow`, `normal`, `fast`
  * 默认值：`normal`
* `direction`
  * 初始滚动方向
  * 取值(number数值): 单位角度(顺时针360度)
    * 如: `0`对应top, `90`对应left, `135`对应right-bottom...
  * 默认值：`135`
* `keep`
  * 鼠标移出组件后是否继续随鼠标滚动
  * 取值(boolean布尔值): `true`, `false`
    * `true` 表示移出后依旧随鼠标滚动, `false` 表示移出后减速至初速度滚动
  * 默认值：`true`

### MIT License
