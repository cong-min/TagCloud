/**
 * tagcloud v1.0.2 - http://tagcloud.congm.in
 * Copyright 2016 @ Cong Min, Inc.
 *
 * MIT License - https://github.com/mcc108/tagcloud
 */
;(function(win) {
    var tagcloud = function() {
        this.init.apply(this, arguments);
    };
    tagcloud.prototype = {
        init: function() {
            var o = this;
            o.config = (function(args) {
                var config = {      //默认值
                    fontsize: 16,       //基本字体大小, 单位px
                    radius: 60,         //滚动半径, 单位px
                    mspeed: "normal",   //滚动最大速度, 取值: slow, normal(默认), fast
                    ispeed: "normal",   //滚动初速度, 取值: slow, normal(默认), fast
                    direction: 135,     //初始滚动方向, 取值角度(顺时针360): 0对应top, 90对应left, 135对应right-bottom(默认)...
                    keep: true          //鼠标移出组件后是否继续随鼠标滚动, 取值: false, true(默认) 对应 减速至初速度滚动, 随鼠标滚动
                };
                if(args && args.length > 0) {
                    var options = args[0],
                        getType = Object.prototype.toString;
                    if(options && getType.call(options) == "[object Object]") {
                        for(var i in options) {
                            if(options.hasOwnProperty(i)) {
                                config[i] = options[i]; //用户配置
                            }
                        }
                    }
                }
                return config;  //配置参数
            })(Array.prototype.slice.call(arguments));
            o.box = o.config.element;   //组件元素
            o.fontsize = o.config.fontsize; //平均字体大小
            o.radius = o.config.radius; //滚动半径
            o.depth = 1.5 * o.radius;   //滚动深度
            o.size = 1.5 * o.radius;    //随鼠标滚动变速作用区域
            o.mspeed = (function(mspeed) {    //滚动最大速度
                switch(mspeed) {
                    case "slow":
                        return 1.5;
                    case "normal":
                        return 3;
                    case "fast":
                        return 5;
                    default:
                        return 3;
                }
            })(o.config.mspeed);
            o.ispeed = (function(ispeed) {    //滚动初速度
                switch(ispeed) {
                    case "slow":
                        return 10;
                    case "normal":
                        return 25;
                    case "fast":
                        return 50;
                    default:
                        return 25;
                }
            })(o.config.ispeed);
            o.items = (function(items) {
                var element = (function(e){
                    var list = e.children || e.childNodes,
                        child = [];
                    for(var i = 0; i < list.length; i++){
                        if(list[i].nodeType==1){
                            child.push(list[i]);
                        }
                    }
                    return child;
                })(o.box);
                var length = element.length;
                for(var i = 0; i < length; i++) {
                    var item = {};
                    item.angle = {};
                    item.angle.phi = Math.acos(-1 + (2 * i + 1) / length);
                    item.angle.theta = Math.sqrt((length + 1) * Math.PI) * item.angle.phi;
                    item.element = element[i];
                    item.offsetWidth = item.element.offsetWidth;
                    item.offsetHeight = item.element.offsetHeight;
                    item.x = o.radius * Math.cos(item.angle.theta) * Math.sin(item.angle.phi);
                    item.y = o.radius * Math.sin(item.angle.theta) * Math.sin(item.angle.phi);
                    item.z = o.radius * Math.cos(item.angle.phi);
                    item.element.style.left = item.x + (o.box.offsetWidth - item.offsetWidth) / 2 + "px";
                    item.element.style.top = item.y + (o.box.offsetHeight - item.offsetHeight) / 2 + "px";
                    items.push(item);
                }
                return items;   //单元素数组
            })([]);
            o.direction = o.config.direction;   //初始滚动方向
            o.keep = o.config.keep; //鼠标移出后是否保持之前滚动
            //初始化
            o.active = false;   //是否为激活状态
            o.lasta = 1;
            o.lastb = 1;
            o.mouseX0 = o.ispeed * Math.sin(o.direction * Math.PI / 180);    //鼠标与滚动圆心x轴初始距离
            o.mouseY0 = -o.ispeed * Math.cos(o.direction * Math.PI / 180);   //鼠标与滚动圆心y轴初始距离
            o.mouseX = o.mouseX0;   //鼠标与滚动圆心x轴距离
            o.mouseY = o.mouseY0;   //鼠标与滚动圆心y轴距离
            //开始
            o.ready();
        },
        ready: function() {
            var o = this;
            //鼠标移入
            o.box.onmouseover = function() {
                o.active = true;
            };
            //鼠标移出
            o.box.onmouseout = function() {
                o.active = false;
            };
            //鼠标在内移动
            var area = o.keep ? win : o.box;
            area.onmousemove = function(ev) {
                var oEvent = window.event || ev;
                var boxPosition = o.box.getBoundingClientRect();
                o.mouseX = (oEvent.clientX - (boxPosition.left + o.box.offsetWidth / 2)) / 5;
                o.mouseY = (oEvent.clientY - (boxPosition.top + o.box.offsetHeight / 2)) / 5;
            };
            o.begin();
        },
        begin: function() {
            var o = this;
            //定时更新
            o.update(o);    //初始更新
            o.box.style.visibility = "visible";
            o.box.style.position = "relative";
            for(var j = 0; j < o.items.length; j++) {
                o.items[j].element.style.position = "absolute";
                o.items[j].element.style.zIndex = j + 1;
            }
            o.up = setInterval(function() {
                o.update(o);
            }, 30);
        },
        update: function() {
            var o = this,
                a, b;
            if(!o.active && !o.keep) {
                o.mouseX = Math.abs(o.mouseX - o.mouseX0) < 1 ? o.mouseX0 : (o.mouseX + o.mouseX0) / 2;   //重置鼠标与滚动圆心x轴距离
                o.mouseY = Math.abs(o.mouseY - o.mouseY0) < 1 ? o.mouseY0 : (o.mouseY + o.mouseY0) / 2;   //重置鼠标与滚动圆心y轴距离
            }
            a = -(Math.min(Math.max(-o.mouseY, -o.size), o.size) / o.radius ) * o.mspeed;
            b = (Math.min(Math.max(-o.mouseX, -o.size), o.size) / o.radius ) * o.mspeed;

            if(Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
                return;
            }
            o.lasta = a;
            o.lastb = b;
            var sc = (function(a, b) {
                var l = Math.PI / 180;
                //数组顺序0,1,2,3表示asin,acos,bsin,bcos
                return [
                    Math.sin(a * l),
                    Math.cos(a * l),
                    Math.sin(b * l),
                    Math.cos(b * l)
                ];
            })(a, b);
            for(var j = 0; j < o.items.length; j++) {
                var rx1 = o.items[j].x,
                    ry1 = o.items[j].y*sc[1] + o.items[j].z*(-sc[0]),
                    rz1 = o.items[j].y*sc[0] + o.items[j].z*sc[1];
                var rx2 = rx1 * sc[3] + rz1 * sc[2],
                    ry2 = ry1,
                    rz2 = rz1 * sc[3] - rx1 * sc[2];
                var per = o.depth / (o.depth + rz2);

                o.items[j].x = rx2;
                o.items[j].y = ry2;
                o.items[j].z = rz2;
                o.items[j].scale = per; //取值范围0.6 ~ 3
                o.items[j].fontsize = Math.ceil(per * 3) + o.fontsize - 6;
                o.items[j].alpha = 1.5 * per - 0.5;

                o.items[j].element.style.left = o.items[j].x + (o.box.offsetWidth - o.items[j].offsetWidth) / 2 + "px";
                o.items[j].element.style.top = o.items[j].y + (o.box.offsetHeight - o.items[j].offsetHeight) / 2 + "px";
                o.items[j].element.style.fontSize = o.items[j].fontsize + "px";
                o.items[j].element.style.filter = "alpha(opacity=" + 100 * o.items[j].alpha + ")";
                o.items[j].element.style.opacity = o.items[j].alpha;
            }
        }
    };
    win.tagcloud = function(options) {
        var args = !options ? {} : options,
            className = "tagcloud", //默认classtagcloud
            element = document.getElementsByClassName(className);
        for(var i = 0; i < element.length; i++) {
            args.element = element[i];
            new tagcloud(args);
        }
    };
})(window);