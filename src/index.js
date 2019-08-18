/**
 * TagCloud.js (c) 2016-2019 @ Cong Min
 * MIT License - https://github.com/mcc108/TagCloud
 */

class TagCloud {
    /* 构造函数 */
    constructor(container = document.body, texts, options) {
        const self = this;
        if (!container || container.nodeType !== 1) return new Error('Incorrect element type');

        // 处理参数
        self.$container = container;
        self.texts = texts || [];
        self.config = { ...TagCloud._defaultConfig, ...options || {} };

        // 计算配置
        self.radius = self.config.radius; // 滚动半径
        self.depth = 2 * self.radius; // 滚动深度
        self.size = 1.5 * self.radius; // 随鼠标滚动变速作用区域
        self.maxSpeed = TagCloud._getMaxSpeed(self.config.maxSpeed); // 滚动最大速度倍数
        self.initSpeed = TagCloud._getInitSpeed(self.config.initSpeed); // 滚动初速度
        self.direction = self.config.direction; // 初始滚动方向
        self.keep = self.config.keep; // 鼠标移出后是否保持之前滚动

        // 创建元素
        self._createElment();
        // 初始化
        self._init();
        // 设置元素及实例
        TagCloud.list.push({ el: self.$el, container, instance: self });
    }

    /* 静态属性方法 */
    // 所有 TagCloud 的个数
    static list = [];

    // 默认配置
    static _defaultConfig = {
        radius: 100, // 滚动半径, 单位px
        maxSpeed: 'normal', // 滚动最大速度, 取值: slow, normal(默认), fast
        initSpeed: 'normal', // 滚动初速度, 取值: slow, normal(默认), fast
        direction: 135, // 初始滚动方向, 取值角度(顺时针deg): 0 对应 top, 90 对应 left, 135 对应 right-bottom(默认)...
        keep: true, // 鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
    };

    // 速度对应的数值
    static _getMaxSpeed = (name) => ({ slow: 5, normal: 10, fast: 20 })[name] || 10;

    static _getInitSpeed = (name) => ({ slow: 20, normal: 40, fast: 80 })[name] || 50;

    // 事件监听
    static _on(el, ev, handler, cap) {
        if (el.addEventListener) {
            el.addEventListener(ev, handler, cap);
        } else if (el.attachEvent) {
            el.attachEvent(`on${ev}`, handler);
        } else {
            el[`on${ev}`] = handler;
        }
    }

    /* 实例属性方法 */
    // 创建元素
    _createElment() {
        const self = this;

        // 创建容器元素
        const $el = document.createElement('div');
        $el.className = 'tagcloud';
        $el.style.position = 'relative';
        $el.style.width = `${2 * self.radius}px`;
        $el.style.height = `${2 * self.radius}px`;

        // 创建文本元素
        self.items = [];
        self.texts.forEach((text, index) => {
            const item = self._createTextItem(text, index);
            $el.appendChild(item.el);
            self.items.push(item);
        });
        self.$container.appendChild($el);
        self.$el = $el;
    }

    // 创建单个文本项
    _createTextItem(text, index = 0) {
        const self = this;
        const itemEl = document.createElement('span');
        itemEl.className = 'tagcloud--item';
        itemEl.style.position = 'absolute';
        itemEl.style.top = '50%';
        itemEl.style.left = '50%';
        itemEl.style.zIndex = index + 1;
        itemEl.style.filter = 'alpha(opacity=0)';
        itemEl.style.opacity = 0;
        itemEl.style.willChange = 'transform, opacity, filter';
        const transformOrigin = '50% 50%';
        itemEl.style.WebkitTransformOrigin = transformOrigin;
        itemEl.style.MozTransformOrigin = transformOrigin;
        itemEl.style.OTransformOrigin = transformOrigin;
        itemEl.style.transformOrigin = transformOrigin;
        const transform = 'translateX(-50%) translateY(-50%) scale(1)';
        itemEl.style.WebkitTransform = transform;
        itemEl.style.MozTransform = transform;
        itemEl.style.OTransform = transform;
        itemEl.style.transform = transform;
        const transition = 'all .1s';
        itemEl.style.WebkitTransition = transition;
        itemEl.style.MozTransition = transition;
        itemEl.style.OTransition = transition;
        itemEl.style.transition = transition;
        itemEl.innerText = text;
        return {
            el: itemEl,
            ...self._computePosition(index), // 分布在合适的位置
        };
    }

    // 计算位置
    _computePosition(index, random = false) {
        const self = this;
        const textsLength = self.texts.length;
        // random 为 true, 则表示生成随机的合适位置, 位置将 index 无关
        if (random) index = Math.floor(Math.random() * (textsLength + 1));
        const phi = Math.acos(-1 + (2 * index + 1) / textsLength);
        const theta = Math.sqrt((textsLength + 1) * Math.PI) * phi;
        return {
            x: (self.size * Math.cos(theta) * Math.sin(phi)) / 2,
            y: (self.size * Math.sin(theta) * Math.sin(phi)) / 2,
            z: (self.size * Math.cos(phi)) / 2,
        };
    }

    // 初始化
    _init() {
        const self = this;

        self.active = false; // 是否为鼠标激活态

        self.mouseX0 = self.initSpeed * Math.sin(self.direction * (Math.PI / 180)); // 鼠标与滚动圆心x轴初始距离
        self.mouseY0 = -self.initSpeed * Math.cos(self.direction * (Math.PI / 180)); // 鼠标与滚动圆心y轴初始距离

        self.mouseX = self.mouseX0; // 鼠标与滚动圆心x轴距离
        self.mouseY = self.mouseY0; // 鼠标与滚动圆心y轴距离

        // 鼠标移入
        TagCloud._on(self.$el, 'mouseover', () => { self.active = true; });
        // 鼠标移出
        TagCloud._on(self.$el, 'mouseout', () => { self.active = false; });
        // 鼠标在内移动
        TagCloud._on(self.keep ? window : self.$el, 'mousemove', (ev) => {
            ev = ev || window.event;
            const rect = self.$el.getBoundingClientRect();
            self.mouseX = (ev.clientX - (rect.left + rect.width / 2)) / 5;
            self.mouseY = (ev.clientY - (rect.top + rect.height / 2)) / 5;
        });

        // 定时更新状态
        self._next(); // 初始更新状态
        self.interval = setInterval(() => {
            self._next.call(self);
        }, 100);
    }

    // 运算下一个状态
    _next() {
        const self = this;

        // keep 为 false 时, 鼠标移出组件后暂停滚动
        if (!self.keep && !self.active) {
            self.mouseX = Math.abs(self.mouseX - self.mouseX0) < 1
                ? self.mouseX0 : (self.mouseX + self.mouseX0) / 2; // 重置鼠标与滚动圆心x轴距离
            self.mouseY = Math.abs(self.mouseY - self.mouseY0) < 1
                ? self.mouseY0 : (self.mouseY + self.mouseY0) / 2; // 重置鼠标与滚动圆心y轴距离
        }

        const a = -(Math.min(Math.max(-self.mouseY, -self.size), self.size) / self.radius)
            * self.maxSpeed;
        const b = (Math.min(Math.max(-self.mouseX, -self.size), self.size) / self.radius)
            * self.maxSpeed;

        if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) return; // 停止

        // 计算偏移量
        const l = Math.PI / 180;
        const sc = [
            Math.sin(a * l),
            Math.cos(a * l),
            Math.sin(b * l),
            Math.cos(b * l)
        ];

        self.items.forEach(item => {
            const rx1 = item.x;
            const ry1 = item.y * sc[1] + item.z * (-sc[0]);
            const rz1 = item.y * sc[0] + item.z * sc[1];

            const rx2 = rx1 * sc[3] + rz1 * sc[2];
            const ry2 = ry1;
            const rz2 = rz1 * sc[3] - rx1 * sc[2];

            const per = (2 * self.depth) / (2 * self.depth + rz2); // todo

            item.x = rx2;
            item.y = ry2;
            item.z = rz2;
            item.scale = per.toFixed(3);
            let alpha = per * per - 0.25;
            alpha = (alpha > 1 ? 1 : alpha).toFixed(3);

            const itemEl = item.el;
            const left = (item.x - itemEl.offsetWidth / 2).toFixed(2);
            const top = (item.y - itemEl.offsetHeight / 2).toFixed(2);
            const transform = `translateX(${left}px) translateY(${top}px) scale(${item.scale})`;
            itemEl.style.WebkitTransform = transform;
            itemEl.style.MozTransform = transform;
            itemEl.style.OTransform = transform;
            itemEl.style.transform = transform;
            itemEl.style.filter = `alpha(opacity=${100 * alpha})`;
            itemEl.style.opacity = alpha;
        });
    }

    /* 暴露的实例属性与方法 */
    // 更新
    update(texts) {
        const self = this;
        // 处理参数
        self.texts = texts || [];
        // 根据 texts 判断并处理 items
        self.texts.forEach((text, index) => {
            let item = self.items[index];
            if (!item) { // 如果没有，则创建
                item = self._createTextItem(text, index);
                Object.assign(item, self._computePosition(index, true)); // 随机位置
                self.$el.appendChild(item.el);
                self.items.push(item);
            }
            // 如果有，则替换文本
            item.el.innerText = text;
        });
        // 删除多余的 self.items
        const textsLength = self.texts.length;
        const itemsLength = self.items.length;
        if (textsLength < itemsLength) {
            const removeList = self.items.splice(textsLength, itemsLength - textsLength);
            removeList.forEach(item => {
                self.$el.removeChild(item.el);
            });
        }
    }

    // 摧毁
    destroy() {
        const self = this;
        self.interval = null;
        // 在 TagCloud.list 中清除
        const index = TagCloud.list.findIndex(e => e.el === self.$el);
        if (index !== -1) TagCloud.list.splice(index, 1);
        // 清理元素
        if (self.$container && self.$el) {
            self.$container.removeChild(self.$el);
        }
    }
}

export default (els, texts, options) => {
    if (typeof els === 'string') els = document.querySelectorAll(els);
    if (!els.forEach) els = [els];
    const instances = [];
    els.forEach(el => {
        if (el) {
            instances.push(new TagCloud(el, texts, options));
        }
    });
    return instances.length <= 1 ? instances[0] : instances;
};
