---
# 当前页面内容标题
title: 第四章 BOM编程
# 当前页面图标
icon: javascript
# 分类
category:
  - 前端
  - JavaScript
# 标签
tag:
  - JavaScript
  - web
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: false
# 是否将该文章添加至时间线中
timeline: false
---

## 一、概述

BOM 是浏览器对象模型。

BOM 提供了独立于内容 而与浏览器窗口进行交互的对象；

BOM 的核心对象是 window；

BOM 由一系列相关的对象构成，并且每个对象都提供了很多方法与属性；

打开浏览器，F12 打开调试窗口，console 里输入 window，就能看到这个对象。里边有很多的方法和属性，能够帮助我们查看和浏览器相关的一些内容，比如浏览器的版本啦（navigator）、浏览的历时记录啦（history）、网站的地址信息啦（location），和屏幕相关的内容啦（带 screende）等等，自己可以浏览一下即可。

## 二、常用方法

> 回调函数

```javascript
//js函数非常灵活，定义了参数传什么都行
var callback = function(fun){
    console.log(fun)
}
callback(1)
callback("123")
callback( {name:'zhangnan'} )
callback( [1,2,3] )

//实际上传什么，就要把这个参数当成什么来用
//要是传个方法就要在方法里找个合适的地方调用一下
var callback = function(fun){
    console.log(fun)
}

var test = function(fun){
    console.log("before");
    fun();
    console.log("after");
}

//你知道需要传方法却传了一个数字，更定不能调用，就会报错
test(1)
VM1038:2 before
VM1038:3 Uncaught TypeError: fun is not a function
    at test (<anonymous>:3:5)
    at <anonymous>:1:1
test @ VM1038:3
(anonymous) @ VM1060:1


var callback = function(){
    console.log("I am callback!")
}
test(callback);

//结果
VM1038:2 before
VM1151:2 I am callback!
VM1038:4 after

//callback就是个方法的名字
var callback = function(data){
    console.log("I am callback!"+data)
}

var test = function(fun){
    console.log("before");
    fun();
    console.log("after");
}

var test = function(fun){
    console.log("before");
    var i = 10;
    fun(i);
    console.log("after");
}
//可以直接传名字
test(callback)
VM1296:2 before
VM1255:2 I am callback!10
VM1296:5 after

//也能直接传个方法体进去
test( function(data){
    console.log("I am callback!"+data)
} )

VM1296:2 before
VM1363:2 I am callback!10
VM1296:5 after

//直接调用方法体也行
(function(){
    console.log(123)
})()
VM1427:2 123

var a  = function(){
    console.log(123)
}
//拿名字调用也行
a()
VM1452:2 123
```

### 1、setTimeout

```javascript
//一次性定时器，会在多少毫秒后执行这个函数
//里边的是匿名函数，也叫回调函数（就是等过了两秒后回过头来再调用这个函数）
//返回值是个定时器，这个方法是在未来去执行某个函数
var timer = setTimeout(function () {
  console.log(123);
}, 2000);

//如果时间未到，不想让他执行了，就需要取消这个定时器
clearTimeout(timer);
```

### 2、setInterval

```javascript
//周期性定时器，会每隔多少毫秒后执行这个函数
//里边的是匿名函数，也叫回调函数（就是等过了两秒后回过头来再调用这个函数）
//返回值是个定时器，这个方法是在未来去执行某个函数
var timer = setInterval(function () {
  console.log(123);
}, 2000);

//如果时间未到，或者中途不想让他执行了，就需要取消这个定时器
clearInterval(timer);
```

### 3、浏览器自带小型数据库

为每一个网址提供两个小型数据库

```javascript
//localStorage只要不人为删除，会浏览器被删除数据会一直在
//增加或修改一个
window.localStorage.setItem("name", "lucy");
//获取
window.localStorage.getItem("name");
//删除一个
window.localStorage.removeItem("name");
//清空
window.localStorage.clear();

//sessionStorage网页被关闭就没有了
//增加或修改一个
window.sessionStorage.setItem("name", "lucy");
//获取
window.sessionStorage.getItem("name");
//删除一个
window.sessionStorage.removeItem("name");
//清空
window.sessionStorage.clear();
```

### 4、弹窗其实没求用

```javascript
//弹个提示窗口，调试也不要用，不优雅
alert(1)

//弹出确认框
//点击确定就是true 点击否就是false
var flag = confirm("您确定要退出吗?")
console.log(flag)

//弹出信息框
//输入信息后点击确定返回填的内容，点击取消返回none
var message = prompt("请填写您的手机号！");
console.log(message);
VM3797:2 1373838438

var message = window.prompt("请输入名字：")
undefined
message
"张楠"
var message = window.prompt("请输入名字：")
undefined
message
""
var message = window.prompt("请输入名字：")
undefined
message
null
var message = window.prompt("请输入名字：","liankun")
```

### 5、history

```javascript
//回退
history.go(-1);
//向前
history.go(1);
//回退
history.back();
//向前
window.history.forward();
```

### 6、navigator

这个属性提供了一写浏览器的属性，比如浏览器类型，版本之类的信息。

### 7、一点注意

在浏览器模型中，调用的方法或属性其实是属于 window 对象的

你在最外层定义一个方法或者一个变量其实是赋给了 window 对象

在浏览器模型中，调用 window 的方法可以省略 window. 也可以不省略，如下：

```javascript
window.localStorage.setItem("name", "lucy");
localStorage.setItem("name", "lucy");
```

浏览器编程中，全局的变量，就是直接在最外边定义变量的时候尽量避开 name，应为 window 有 name 属性，你再定义就覆盖了人家的了，当然在方法里，对象中可以随便使用。
