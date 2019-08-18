/*!
 * TagCloud.js v2.0.1
 * Copyright (c) 2016-2019 @ Cong Min
 * MIT License - https://github.com/mcc108/TagCloud
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.TagCloud = factory());
}(this, function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(source, true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  /**
   * TagCloud.js (c) 2016-2019 @ Cong Min
   * MIT License - https://github.com/mcc108/TagCloud
   */
  var TagCloud =
  /*#__PURE__*/
  function () {
    /* 构造函数 */
    function TagCloud() {
      var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
      var texts = arguments.length > 1 ? arguments[1] : undefined;
      var options = arguments.length > 2 ? arguments[2] : undefined;

      _classCallCheck(this, TagCloud);

      var self = this;
      if (!container || container.nodeType !== 1) return new Error('Incorrect element type'); // 处理参数

      self.$container = container;
      self.texts = texts || [];
      self.config = _objectSpread2({}, TagCloud._defaultConfig, {}, options || {}); // 计算配置

      self.radius = self.config.radius; // 滚动半径

      self.depth = 2 * self.radius; // 滚动深度

      self.size = 1.5 * self.radius; // 随鼠标滚动变速作用区域

      self.maxSpeed = TagCloud._getMaxSpeed(self.config.maxSpeed); // 滚动最大速度倍数

      self.initSpeed = TagCloud._getInitSpeed(self.config.initSpeed); // 滚动初速度

      self.direction = self.config.direction; // 初始滚动方向

      self.keep = self.config.keep; // 鼠标移出后是否保持之前滚动
      // 创建元素

      self._createElment(); // 初始化


      self._init(); // 设置元素及实例


      TagCloud.list.push({
        el: self.$el,
        container: container,
        instance: self
      });
    }
    /* 静态属性方法 */
    // 所有 TagCloud 的个数


    _createClass(TagCloud, [{
      key: "_createElment",

      /* 实例属性方法 */
      // 创建元素
      value: function _createElment() {
        var self = this; // 创建容器元素

        var $el = document.createElement('div');
        $el.className = 'tagcloud';
        $el.style.position = 'relative';
        $el.style.width = "".concat(2 * self.radius, "px");
        $el.style.height = "".concat(2 * self.radius, "px"); // 创建文本元素

        self.items = [];
        self.texts.forEach(function (text, index) {
          var item = self._createTextItem(text, index);

          $el.appendChild(item.el);
          self.items.push(item);
        });
        self.$container.appendChild($el);
        self.$el = $el;
      } // 创建单个文本项

    }, {
      key: "_createTextItem",
      value: function _createTextItem(text) {
        var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var self = this;
        var itemEl = document.createElement('span');
        itemEl.className = 'tagcloud--item';
        itemEl.style.position = 'absolute';
        itemEl.style.top = '50%';
        itemEl.style.left = '50%';
        itemEl.style.zIndex = index + 1;
        itemEl.style.filter = 'alpha(opacity=0)';
        itemEl.style.opacity = 0;
        var transformOrigin = '50% 50%';
        itemEl.style.WebkitTransformOrigin = transformOrigin;
        itemEl.style.MozTransformOrigin = transformOrigin;
        itemEl.style.OTransformOrigin = transformOrigin;
        itemEl.style.transformOrigin = transformOrigin;
        var transform = 'translateX(-50%) translateY(-50%) scale(1)';
        itemEl.style.WebkitTransform = transform;
        itemEl.style.MozTransform = transform;
        itemEl.style.OTransform = transform;
        itemEl.style.transform = transform;
        var transition = 'all .2s';
        itemEl.style.WebkitTransition = transition;
        itemEl.style.MozTransition = transition;
        itemEl.style.OTransition = transition;
        itemEl.style.transition = transition;
        itemEl.innerText = text;
        return _objectSpread2({
          el: itemEl
        }, self._computePosition(index));
      } // 计算位置

    }, {
      key: "_computePosition",
      value: function _computePosition(index) {
        var random = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var self = this;
        var textsLength = self.texts.length; // random 为 true, 则表示生成随机的合适位置, 位置将 index 无关

        if (random) index = Math.floor(Math.random() * (textsLength + 1));
        var phi = Math.acos(-1 + (2 * index + 1) / textsLength);
        var theta = Math.sqrt((textsLength + 1) * Math.PI) * phi;
        return {
          x: self.size * Math.cos(theta) * Math.sin(phi) / 2,
          y: self.size * Math.sin(theta) * Math.sin(phi) / 2,
          z: self.size * Math.cos(phi) / 2
        };
      } // 初始化

    }, {
      key: "_init",
      value: function _init() {
        var self = this;
        self.active = false; // 是否为鼠标激活态

        self.mouseX0 = self.initSpeed * Math.sin(self.direction * (Math.PI / 180)); // 鼠标与滚动圆心x轴初始距离

        self.mouseY0 = -self.initSpeed * Math.cos(self.direction * (Math.PI / 180)); // 鼠标与滚动圆心y轴初始距离

        self.mouseX = self.mouseX0; // 鼠标与滚动圆心x轴距离

        self.mouseY = self.mouseY0; // 鼠标与滚动圆心y轴距离
        // 鼠标移入

        TagCloud._on(self.$el, 'mouseover', function () {
          self.active = true;
        }); // 鼠标移出


        TagCloud._on(self.$el, 'mouseout', function () {
          self.active = false;
        }); // 鼠标在内移动


        TagCloud._on(self.keep ? window : self.$el, 'mousemove', function (ev) {
          ev = ev || window.event;
          var rect = self.$el.getBoundingClientRect();
          self.mouseX = (ev.clientX - (rect.left + rect.width / 2)) / 5;
          self.mouseY = (ev.clientY - (rect.top + rect.height / 2)) / 5;
        }); // 定时更新状态


        self._next(); // 初始更新状态


        self.interval = setInterval(function () {
          self._next.call(self);
        }, 100);
      } // 运算下一个状态

    }, {
      key: "_next",
      value: function _next() {
        var self = this; // keep 为 false 时, 鼠标移出组件后暂停滚动

        if (!self.keep && !self.active) {
          self.mouseX = Math.abs(self.mouseX - self.mouseX0) < 1 ? self.mouseX0 : (self.mouseX + self.mouseX0) / 2; // 重置鼠标与滚动圆心x轴距离

          self.mouseY = Math.abs(self.mouseY - self.mouseY0) < 1 ? self.mouseY0 : (self.mouseY + self.mouseY0) / 2; // 重置鼠标与滚动圆心y轴距离
        }

        var a = -(Math.min(Math.max(-self.mouseY, -self.size), self.size) / self.radius) * self.maxSpeed;
        var b = Math.min(Math.max(-self.mouseX, -self.size), self.size) / self.radius * self.maxSpeed;
        if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) return; // 停止
        // 计算偏移量

        var l = Math.PI / 180;
        var sc = [Math.sin(a * l), Math.cos(a * l), Math.sin(b * l), Math.cos(b * l)];
        self.items.forEach(function (item) {
          var rx1 = item.x;
          var ry1 = item.y * sc[1] + item.z * -sc[0];
          var rz1 = item.y * sc[0] + item.z * sc[1];
          var rx2 = rx1 * sc[3] + rz1 * sc[2];
          var ry2 = ry1;
          var rz2 = rz1 * sc[3] - rx1 * sc[2];
          var per = 2 * self.depth / (2 * self.depth + rz2); // todo

          item.x = rx2;
          item.y = ry2;
          item.z = rz2;
          item.scale = per.toFixed(3);
          var alpha = per * per - 0.25;
          alpha = (alpha > 1 ? 1 : alpha).toFixed(3);
          var itemEl = item.el;
          var left = (item.x - itemEl.offsetWidth / 2).toFixed(2);
          var top = (item.y - itemEl.offsetHeight / 2).toFixed(2);
          var transform = "translateX(".concat(left, "px) translateY(").concat(top, "px) scale(").concat(item.scale, ")");
          itemEl.style.WebkitTransform = transform;
          itemEl.style.MozTransform = transform;
          itemEl.style.OTransform = transform;
          itemEl.style.transform = transform;
          itemEl.style.filter = "alpha(opacity=".concat(100 * alpha, ")");
          itemEl.style.opacity = alpha;
        });
      }
      /* 暴露的实例属性与方法 */
      // 更新

    }, {
      key: "update",
      value: function update(texts) {
        var self = this; // 处理参数

        self.texts = texts || []; // 根据 texts 判断并处理 items

        self.texts.forEach(function (text, index) {
          var item = self.items[index];

          if (!item) {
            // 如果没有，则创建
            item = self._createTextItem(text, index);

            _extends(item, self._computePosition(index, true)); // 随机位置


            self.$el.appendChild(item.el);
            self.items.push(item);
          } // 如果有，则替换文本


          item.el.innerText = text;
        }); // 删除多余的 self.items

        var textsLength = self.texts.length;
        var itemsLength = self.items.length;

        if (textsLength < itemsLength) {
          var removeList = self.items.splice(textsLength, itemsLength - textsLength);
          removeList.forEach(function (item) {
            self.$el.removeChild(item.el);
          });
        }
      } // 摧毁

    }, {
      key: "destroy",
      value: function destroy() {
        var self = this;
        self.interval = null; // 在 TagCloud.list 中清除

        var index = TagCloud.list.findIndex(function (e) {
          return e.el === self.$el;
        });
        if (index !== -1) TagCloud.list.splice(index, 1); // 清理元素

        if (self.$container && self.$el) {
          self.$container.removeChild(self.$el);
        }
      }
    }], [{
      key: "_on",
      // 事件监听
      value: function _on(el, ev, handler, cap) {
        if (el.addEventListener) {
          el.addEventListener(ev, handler, cap);
        } else if (el.attachEvent) {
          el.attachEvent("on".concat(ev), handler);
        } else {
          el["on".concat(ev)] = handler;
        }
      }
    }]);

    return TagCloud;
  }();

  TagCloud.list = [];
  TagCloud._defaultConfig = {
    radius: 100,
    // 滚动半径, 单位px
    maxSpeed: 'normal',
    // 滚动最大速度, 取值: slow, normal(默认), fast
    initSpeed: 'normal',
    // 滚动初速度, 取值: slow, normal(默认), fast
    direction: 135,
    // 初始滚动方向, 取值角度(顺时针deg): 0 对应 top, 90 对应 left, 135 对应 right-bottom(默认)...
    keep: true // 鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动

  };

  TagCloud._getMaxSpeed = function (name) {
    return {
      slow: 5,
      normal: 10,
      fast: 20
    }[name] || 10;
  };

  TagCloud._getInitSpeed = function (name) {
    return {
      slow: 20,
      normal: 40,
      fast: 80
    }[name] || 50;
  };

  var index = (function (els, texts, options) {
    if (typeof els === 'string') els = document.querySelectorAll(els);
    if (!els.forEach) els = [els];
    var instances = [];
    els.forEach(function (el) {
      if (el) {
        instances.push(new TagCloud(el, texts, options));
      }
    });
    return instances.length <= 1 ? instances[0] : instances;
  });

  return index;

}));
