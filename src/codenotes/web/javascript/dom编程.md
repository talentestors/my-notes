---
# 当前页面内容标题
title: 第三章 DOM编程
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

在 HTML DOM (Document Object Model) 即文档对象模型中, 每个东西都是 **节点** :

- 文档本身就是一个文档对象
- 所有 HTML 元素都是元素节点
- 所有 HTML 属性都是属性节点
- 元素内的文本是文本节点
- 注释是注释节点，就不用

```html
<div class='test1' id='a'>itnanls</div>

div整体是一个元素节点
class=‘test1’ 是一个属性节点
itnanls是个文本节点，注意中间没有东西空字符也是一个文本节点
```

所有的节点都有一个nodeType属性，可以判断节点类型，常用的就是以下

| NodeType | Named Constant          |
| -------- | ----------------------- |
| 1        | ELEMENT_NODE 元素节点   |
| 2        | ATTRIBUTE_NODE 属性节点 |
| 3        | TEXT_NODE 文本节点      |

```javascript
//元素节点
var mydiv = document.getElementById("div1")
mydiv.nodeType
1
//属性节点
mydiv.attributes[0].nodeType
2
```

DOM操作其实就是对节点的增删查改

## 二、元素节点

### 1、获取元素节点的方法

```javascript
//根据id获取一个元素节点
var div1 = document.getElementById("div1")
//根据标签名获取一堆节点的集合
var li1 = document.getElementsByTagName("li");
//根据class获取一堆元素节点
var div2 = document.getElementsByClassName("content");

//使用css选择器选择第一个匹配的元素节点
var d1 = document.querySelector(".content")
//根据css选择器选择一批能够被匹配到的所有的元素
var d1 = document.querySelectorAll(".content")
```

### 2、修改元素节点的内容

```javascript
//不渲染html标签，标签会当做文本打印出来
mydiv.innerText = "jiasoushi"
//会将html标签渲染出来
mydiv.innerHTML = "<h1>123</h1>"
```

### 3、删除一个元素节点

```javascript
//直接把自己干掉
var mydiv = document.getElementById("div1")
mydiv.remove();

//清除内容
mydiv.innerText = “”;

//删除某个子元素节点
//1、找到这个字元素节点
var myul = document.getElementsByTagName('ul')[0];
//2、调用方法干掉，注意这个方法参数一定要是个元素节点
mydiv.removeChild(myul)

var div1 = document.getElementById("div1")
undefined
var child = document.getElementsByTagName("ul")[0]
undefined
child
<ul>…</ul>
div1.removeChild(child );
```

### 4、新建一个元素节点

```javascript
//创建一个div标签，内存中
var mydiv = document.createElement("div");
//添加进几个属性
mydiv.setAttribute("name","mydiv");
mydiv.setAttribute("class","test");
//获取到我的div
var div1 = document.getElementById("div1");
//将内存中新建的div实实在在的加入到我的div中
div1.append(mydiv)
```

### 5、获取所有的子节点

- 获取了之后当然就能像操作节点一样操作他了。
- 子节点一般是个集合，其实就是个数组
- 循环遍历可以批量操作
- 不仅仅是子节点集合，任何节点集合都能批量操作

```java
//children属性能获取所有的子元素节点，不包括文本节点
mydiv.children
HTMLCollection [ul]

//children属性能获取所有的子元素节点，包括文本节点
mydiv.childNodes
NodeList(3) [text, ul, text]
    
//子节点也是元素节点，一样可以有子节点    
mydiv.children[0].children    
```

## 三、属性节点

### 1、使用元素节点方法进行增删查改

```javascript
var mydiv = document.getElementById("div1")
//获取这个属性的值
mydiv.getAttribute("name")
//修改，同时可以添加一个属性的值
mydiv.setAttribute("name","cccc")
//删除一个属性
mydiv.removeAttribute("name")
```

### 2、使用属性节点对象对属性本身进行操作

```javascript
//获取所有的属性节点的集合，是个可以当成数组
mydiv.attributes
//通过下标拿到第二个属性
mydiv.attributes[1]
//拿到属性的name
var attrName = mydiv.attributes[1].name
//拿到属性的值
var attrValue = mydiv.attributes[1].value
//修改这个属性的值
mydiv.attributes[1].value = "aaa"
```

## 三、常用属性操作

如 id 、class、style

```javascript
var div1 = document.getElementById("div1");

//获取id的值
div1.id
"div1"
//给元素标签的id赋值
div1.id = "div2"
"div2"

//获取class属性
div1.className
"content aaa"
//为class属性赋值
div1.className = 'content'
"content"
div1.className
"content"

//直接修改行内样式
div1.style = 'background: black'
"background: black"
```
