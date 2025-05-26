---
# 当前页面内容标题
title: 第一章 基础语法
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

## 一、基本情况

### 1、介绍

JavaScript 是一门解释性的脚本语言，主要用来给 HTML 网页增加动态功能。

通常的 js 是运行在浏览器环境下的，可以帮助我们去控制页面，实现丰富的功能。会有 dom 和 bom 的 api 去操作 html 文档和浏览器的一些功能。

nodejs 是运行在计算机环境下的。语法一样，但是因为环境是计算机，他当然不能操作 dom 和 bom。因为压根就没有，但是他能操作文件，能操作数据库，他其实是一门后端的编程语言。

但是 nodejs 的出现个 js 提供了蓬勃的生命力，让 js 更加强大，比如现在流行的一下编程模式，都需要 nodejs 的支持。

### 2、JS 解释器

无论是 node 还是各大浏览器，都需要有解释 JS 代码的引擎，参考下表浏览器使用的 JS 解释器

```bash
- Mozilla       --    Spidermonkey       火狐
- Chrome        --    v8                 谷歌
- Safari        --    JavaScriptCore     苹果
- IE、Edge      --    Chakra              ie
- node          --    v8                  nodejs
```

### 3、js 哪里可以执行

（1）放在 html 标签之中

```html
<body>
  //中间放页面标签 //放在body的结束标签之前
  <script type="text/javascript">
    document.write("<h1>123</h1>");
  </script>
</body>
```

（2）引入外部的 js

```html
<body>
  //中间放页面标签 //放在body的结束标签之前
  <script src="./index.js"></script>
</body>
```

### 4、作用

- 表单动态校验（密码强度检测） （ JS 产生最初的目的）
- 网页特效
- 服务端开发（Node.js）
- 桌面程序（Electron）
- App(Cordova)
- 控制硬件—物联网（Ruff 游戏 F 发(cocos2d-js)

### 5、浏览器执行 JS 简介

浏览器分成两部分：==渲染引擎和 JS 引擎==

- 渲染引擎：用来解析 HTML 与 CSS ，俗称内核，比如 chrome 浏览器的 blink ，老版本的 webkit

- JS 引擎：也称为 JS 解释器。用来读取网页中的 JavaScript 代码，对其处理后运行，比如 chrome 浏览器的 V8

==浏览器本身并不会执行 JS 代码，而是通过内置 JavaScript 引擎（解释器）来执行 JS 代码。JS 引擎执行代码时逐行解释每一句源码（转换为机器语言） ，然后由计算机去执行，所以 JavaScript 语言归为脚本语言，会逐行解释执行。==

### 6、JS 三大组成

- ECMAScript
- DOM—文档对象模型
- BOM—浏览器对象模型

## 二、数据类型

> 弱类型自动推断类型

数字（number）

- `Infinity`：无穷大
- `-Infinity`：无穷小
- `NaN`：Not a number，代表一个非数值。

字符串 （string）

布尔型 （boolean）

> null 是有值但为空，undefined 是只是被申明，未赋值

空（null）

未定义（ undefined）

| 简单数据类型 | 说明                                                      | 默认值      |
| ------------ | --------------------------------------------------------- | ----------- |
| Number       | 数字型，包含整值和浮点值，如 21、0.21                     | `0`         |
| Boolean      | 布尔值类型，如 true、 false，等价于 1 和 0                | `false`     |
| String       | 字符串类型，如“张三”注意 js 里面，字符串都带引号          | `""`        |
| Undefined    | `var a;` 声明了变量 a 但是没有给值，此时 a =undefinedNull | `undefined` |
| Null         | `var a = null;` 声明了变量 a 为空值                       | `null`      |

### 1、数据类型转换

使用表单、prompt 获取过来的数据默认是字符串类型的，此时就不能直接简单的进行加法运算，而需要转换变量的数据类型。
通俗来说，就是把一种数据类型的变量转换成另外一种数据类型
我们通常会实现 3 种方式的转换：

- 转换为字符串类型
- 转换为数字型
- 转换为布尔型

#### （1）转换成字符串的三种方法

一般用第三种方式，隐式转换。

- `toString()` 方法
- `String()` 方法
- 加号 `+` 拼接字符串

```js
var num = 12;
console.log(num.toString());
console.log(String(num));
console.log(num + "");
```

引申：数字字符长转数字

```js
var str = "123";
console.log(str - "");
```

#### （2）转换为数字型

| 方式                  | 说明                       | 案例                                  |
| --------------------- | -------------------------- | ------------------------------------- |
| `parseInt(str)` 函数  | string->整数型             | parseInt('10')                        |
| `parseFloat()` 函数   | string->浮点型             | parseFloat('3.14')                    |
| `Number()` 强转换函数 | string->数字型             | Number('12')                          |
| JS 隐式转换           | 算术运算符隐式转换为数字型 | `'12'-  0` 或 `'12' - ''` 或 `'12'*1` |

```js
console.log(parseInt("123")); // 123
console.log(parseFloat("3.14")); // 3.14
console.log("123" - 0); // 123
console.log("123" - ""); // 123
console.log(parseFloat("999")); // 999
console.log(parseInt("3.14159")); // 3
console.log(parseInt("120px")); // 120
console.log(Number("100")); // 100
console.log(Number("100.32")); // 100.32
console.log(Number("100px")); // NaN
console.log("100px" - ""); // NaN
```

注意：

1. 数字字符串（`'12.3'`，`12`）之间进行加法运算实际上是字符串的拼接，结果还是字符串；而数字字符串之间的减法运算是算术运算，结果是数字型。
2. 一个数字字符长和一个数字相乘，结果是算数运算结果，为数字型。

```js
console.log("10" + "2"); // 102
console.log("10" - "2"); // 8
console.log("10" + "3.2"); // 103.2
console.log("10" - "3.2"); // 6.8
console.log("12" * 3); // 36
```

> `isNaN` 方法用来判断一个变量和或者一个值是数字类型，若不是数字类型则返回 `true`；否则返回 `false`。

#### （3）转换为布尔型

使用 `Boolean()` 函数转换。

- 转换值为 `false`：`''`, `0`, `NaN`, `null`, `undefined`（5 个）
- 其他的转换值均为 `true`

```js
console.log(Boolean("")); // false
console.log(Boolean(0)); // false
console.log(Boolean(NaN)); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean([])); // true
```

### 2、隐式转换

#### 1. 减、乘、除

**我们在对各种非`Number`类型运用数学运算符(`- \* /`)时，会先将非`Number`类型转换为`Number`类型。**

```javascript
1 - true; // 0， 首先把 true 转换为数字 1， 然后执行 1 - 1
1 - null; // 1,  首先把 null 转换为数字 0， 然后执行 1 - 0
1 * undefined; //  NaN, undefined 转换为数字是 NaN
2 * ["5"]; //  10， ['5']首先会变成 '5', 然后再变成数字 5
```

> 上面例子中的 ['5']的转换，涉及到**拆箱操作**

以上 3 点，优先级从高到低，即 `3+'abc'` 会应用规则 1，而 `3+true`会应用规则 2。

```javascript
123 + "123"; // 123123   （规则1）
123 + null; // 123    （规则2）
123 + true; // 124    （规则2）
123 + {}; // 123[object Object]    （规则3）
```

#### 2.单个变量

如果只有单个变量，会先将变量转换为 Boolean 值。

我们可以参考**附录**的转换表来判断各种类型转变为`Boolean`后的值。

不过这里有个小技巧：

只有 `null` `undefined` `''` `NaN` `0` `false` 这几个是 `false`，其他的情况都是 `true`，比如 `{}` , `[]`。

#### 3.使用 == 比较中的 5 条规则

虽然我们可以严格使用 `===`，不过了解`==`的习性还是很有必要的。

根据 `==` 两侧的数据类型，我们总结出 5 条规则：

- 规则 1：`NaN`和其他任何类型比较永远返回`false`（包括和他自己）。

```javascript
NaN == NaN; // false
```

- 规则 2：Boolean 和其他任何类型比较，Boolean 首先被转换为 Number 类型。

```javascript
true == 1; // true
true == "2"; // false, 先把 true 变成 1，而不是把 '2' 变成 true
true == ["1"]; // true, 先把 true 变成 1， ['1']拆箱成 '1', 再参考规则3
true == ["2"]; // false, 同上
undefined == false; // false ，首先 false 变成 0，然后参考规则4
null == false; // false，同上
```

- 规则 3：`String`和`Number`比较，先将`String`转换为`Number`类型。

```javascript
123 == "123"; // true, '123' 会先变成 123
"" == 0; // true, '' 会首先变成 0
```

规则 4：`null == undefined`比较结果是`true`，除此之外，`null`、`undefined`和其他任何结果的比较值都为`false`。

```javascript
null == undefined; // true
null == ""; // false
null == 0; // false
null == false; // false
undefined == ""; // false
undefined == 0; // false
undefined == false; // false
```

规则 5：`原始类型`和`引用类型`做比较时，引用类型会依照`ToPrimitive`规则转换为原始类型。

> ⭐️`ToPrimitive`规则，是引用类型向原始类型转变的规则，它遵循先`valueOf`后`toString`的模式期望得到一个原始类型。

如果还是没法得到一个原始类型，就会抛出 `TypeError`。

```javascript
"[object Object]" == {};
// true, 对象和字符串比较，对象通过 toString 得到一个基本类型值
"1,2,3" == [1, 2, 3];
// true, 同上  [1, 2, 3]通过 toString 得到一个基本类型值
```

## 三、定义变量

> 弱类型，不需要申明这个变量的类型，统一用 var

```javascript
var num = 10;
var money = 1.2;
//字符串单引号和双引号都行，和java对比
var str = "str";
var str2 = "str2";
var nul = null;
var flag = true;
//压根就没有定义叫undefined
//数组和对象
var arr = [];
var obj = {};
```

因为 var 有一些弊端，如果前边定义了一个变量，后边再次定义，就会覆盖，这样会有问题，所有在 ES6 语法当中新增了 let 和 const 两个关键字来定义变量，除此之外还有作用域的问题。

```javascript
var num = 3;
var num = 4;
//前边的值会被后边的覆盖
```

```javascript
//let 和 const 定义的变量不能不覆盖，不能重复定义。
let num = 3;
let num = 4;
//直接会报错
//cosnt定义的叫常量，定义之后的数据不能被修改
const num = 3;
num = 4;
//直接会报错
```

ES6 以前，JS 没有块级作用域。ES6 新增 let 和 const 之后才有了块级作用域。
块级作用域是指用 `{}` 包括起来的一段代码，例如 if 、while 等等。
函数作用域就是指变量只在函数内部起作用。

- var 声明的是函数作用域的变量
- let 声明的是块级作用域的变量
- const 声明的是块级作用域的变量

> [!TIP]
>
> 8 种基本数据类型中，前 7 种为基本数据类型，最后 1 种为复杂数据类型（`object`）。
>
> - `number`：用于任何类型的数字：整数或浮点数，在 $\pm(2^{53}-1)$ 范围内的整数。
> - `bigint`：用于任意长的整数。
> - `string`：字符串，一个字符串可以包含 0 个或多个字符，没有单独的单字符类型。
> - `boolean`：值为 `true` 或 `false`
> - `null`：未知的值，只有一个 `null` 值的独立类型。
> - `undefined`：未定义得值，只有一个 `undefined` 值的独立类型。
> - `symbol`：用于唯一的标识符。
> - `object`：用于更复杂的数据结构。
>
> 使用 `typeof` 运算符查看变量的数据类型：
>
> - 两种形式：`typeof x` 或 `typeof(x)`
> - 以字符串的形式返回类型名称：例如 `string`
> - `typeof null` 会返回 `"object"` —— 这是 JavaScript 编程语言的一个错误，实际上它并不是一个 `object`。

### 获取变量数据类型

#### typeof 获取变量数据类型

`typeof variable` （`typeof(variable)`） 返回一个字符串，值为该变量的数据类型。

```js
console.log(typeof 1); // number
console.log(typeof false); // boolean
console.log(typeof "aaa"); // string
console.log(typeof undefined); // undefined
console.log(typeof NaN); // number
console.log(typeof Infinity); // number
console.log(typeof null); // object
console.log(typeof typeof 1); // string
```

#### 字面量

字面量是在源代码中一个固定的表示法，通俗来说，就是字面量如何表达这个值。

- 数字字面量：`1`、`0`
- 字符串字面量：`mphy`、`aaa`
- 布尔字面量：`true`、`false`

## 四、运算符

| 比较运算符 | 说明                                                    |
| :--------: | ------------------------------------------------------- |
|    `<`     | 小于                                                    |
|    `>`     | 大于                                                    |
|    `<=`    | 大于或等于                                              |
|    `>=`    | 小于或等于                                              |
|    `==`    | 判等于                                                  |
|    `!=`    | 判不等                                                  |
|   `===`    | 全等于。要求值和数据类型均一致，则返回 `true`           |
|   `!==`    | 全不等于。要求值和数据类型至少一个不一致，则返回 `true` |

> [!NOTE]
>
> ### 3.2 关于 == 与 ===
>
> 需要注意的是 `==` 和 `===` 的区别。
>
> - `==` 比较的时候只判断值，因为会进行隐式转换。值相等则返回 `true`
> - `===` 比较判断的时同时需要值相等和类型相同，两者均满足则返回 `true`

## 六、JS 基本输入输出语句

1. 输入框
   `prompt` 方法返回一个 `string` 类型。

   ```js
   prompt("请输入你的名字：");
   ```

2. 警示框

   ```js
   alert("你好");
   ```

3. 控制台打印

   ```js
   console.log("我是程序员能看到的。");
   ```

## 七、数组（array）

### 1、定义的方式

#### （1）使用方法调用

```javascript
var arr = Array();
//Array 是个函数，猜一猜他的返回值就是个空数组
```

#### （2）使用 new 关键字

```javascript
var arr = new Array();
//js里函数可以当类使用
```

#### （3）使用 json 数组的方式，字面量，个人推荐

```javascript
var arr = [];
```

> 注：js 中初始化数组不需要初始化长度

### 2、赋值的方式

#### （1）定义之后去赋值

```javascript
arr[0] = 123;
arr[1] = 234;
```

#### （2）定义的时候赋值

```javascript
//这样当然方便
var arr = [123, 234];
```

### 3、操作

#### 求最值

```javascript
console.log(Math.max.apply(null, arr2));
console.log(Math.max(...arr2));
```

#### 连接 join()

```javascript
console.log(arr2.join("-")); // 1-21-3-4-5
```

#### toString()

```javascript
var arr1 = [1, 2, "123", true];
console.log(arr1.toString());
```

#### 添加/删除/修改

```javascript
arr2.push(6); // 加末尾
arr2.pop(); // 删末尾
arr2.shift(); // 删头部
arr2.unshift(0); // 加头部
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 0, "Lemon", "Kiwi");
```

#### 翻转 reverse()

```js
arr2.reverse();
```

#### 数组遍历

方式一：

```js
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}
```

方式二：

```js
for (const i in arr) {
  console.log(arr[i]);
}
```

#### 排序

```js
arr2.sort();
```

### 4. 检测一个值是否为数组

#### 4.1 instanceof

```js
function isArray(test) {
  if (test instanceof Array) return true;
  return false;
}
console.log(isArray([1, 2])); // true
console.log(isArray(1)); // false
```

#### 4.2 Array.isArray()

Array.isArray() 方法用于检测一个值是否为数组。

## 八、函数方法

### 1. 函数的声明与调用

```js
// 声明
function funcName(params) {
  // function statements
}
funcName(params);
// 调用
```

### 2. 实参个数与形参个数不匹配的情况

| 参数个数           | 说明                                 |
| ------------------ | ------------------------------------ |
| 形参和实参个数相等 | 输出正确结果                         |
| 实参个数多于形参   | 只取到形参的个数                     |
| 实参个数少于形参   | 多的形参定义为 undefined，结果为 NaN |

```js
function sum(num1, num2) {
  console.log(num1 + num2);
}
sum(100, 200); // 300, 形参和实参个数相等，输出正确结果
sum(100, 400, 500, 700); // 500, 实参个数多于形参，只取到形参的个数
sum(200); // NaN, 实参个数少于形参，多的形参定义为undefined，结果为NaN
```

> 在 JavaScript 中，形参的默认值是 `undefined`。

### 3. 声明函数的三种方法

#### 3.1 function 命令

```js
function funcName(params) {
  // function statements
}
```

#### 3.2 函数表达式

```js
const funcName = function (params) {
  // function statements
};
```

#### 3.3 箭头函数 `=>`

创建一个函数更加简洁的方式，有两种方式：

- 不带花括号：`(...args) => expression`，计算表达式，直接返回。
- 带花括号：`(...args) => { bodu }`，可以编写多行多个语句，需要 `return` 语句返回。

```javascript
let sum = (a, b) => a + b;
```

#### 3.4 Function 构造函数

```js
const add = new Function(
    'x',
    'y',
    return 'x + y'
);
```

### 4. 注意

- 函数未指定返回值则默认返回 `undefined`

### 5. arguments 的使用

`arguments` 是所有 JS 函数内置的对象，但也只有函数具有。

```js
function test() {
  return arguments;
}
console.log(test(1, 2, 3, 4));
```

输出：

```js
Arguments(4) [1, 2, 3, 4, callee: ƒ, Symbol(Symbol.iterator): ƒ]
```

函数的 `arguments` 是一种伪数组：

1. 具有数组的 `length` 属性
2. 按照索引方式进行存储
3. 没有真正数组的一些方法 `pop()`、`push()`

## 九、 对象（object）

**对象是 js 里最灵活的。**

### 1、定义空对象

#### （1）使用方法调用

```javascript
var obj = Object();
//Array 是个函数，猜一猜他的返回值就是个空数组
```

#### （2）使用 new 关键字

```javascript
var obj = new Object();
//js里函数可以当类使用
```

#### （3）使用 json 对象的方式，个人推荐

```javascript
var obj = {};
```

#### （4）自定义对象类型，有点高级，了解

这一点很是灵活，function 定义的函数，既能直接调用，也可以像类一样使用 new 关键字来生成。也就是函数既可以当做普通函数，也能当做构造函数。

**其中要注意，要想给 new 出来的对象添加属性或方法，必须使用 this 关键字，不写不行。**

命名规范和 java 一样，首字母大写，驼峰式命名。

```javascript
function User(name) {
  this.name = name;
}

var user = new User("wusanshui");
console.log(user.name);
```

### 2、给对象添加属性和方法

#### （1）定义了对象之后

```javascript
obj.name = "zhangsan";
obj.age = 18;
onj.eat = function () {
  console.log(" I am eating! ");
};
```

#### （2）定义类的时候

```javascript
//直接用json对象写一个对象出来
var user = {
  name: "zhangsan",
  age: 10,
  eat: function () {
    console.log("i am eating！");
  },
};
```

#### （3）自定义类的时候

一定要注意和 java 的区别

```javascript
function User(name) {
  this.name = name;
  this.age = 18;
  this.eat = function () {
    console.log("I am eating!");
  };
}

var user = new User("wusanshui");

//new 出来的对象自然而然就拥有这些属性和方法
```

### 3、获取对象的属性的方法

#### （1）使用`.`

```javascript
console.log(user.name);
调用方法;
user.eat();
```

#### （2）使用`[]`

```javascript
console.log(user["name"]);
调用方法;
user["eat"]();
```

## 十、判断和循环

和 java 里的一模一样，简单写一下就行了

### 1、if 语句

如果条件是一个值：

如果是 0 ‘’ null undefined false 都是 false

{} [] 非零的数字 字符串 都是真

```javascript
var flag = true;

if (flag) {
  alert(true);
} else {
  alert(false);
}
```

### 2、switch 语句

```javascript
var m = 2;
var x;
switch (m) {
  case 0:
    x = "今天是星期日";
    break;
  case 1:
    x = "今天是星期一";
    break;
  case 2:
    x = "今天是星期二";
    break;
}

console.log(x);
```

### 3、循环数组

```javascript
let cars = ["兰博基尼", "CRV", "卡宴", "奔驰是傻逼", "bwm"];
for (var i = 0; i < cars.length; i++) {
  console.log(cars[i]);
}
```

### 4、遍历对象属性

注意：获取对象属性的时候可以用. 也可以用[key]

```javascript
var options = {
  name: "zhangsan",
  age: 10,
};
for (var attr in options) {
  console.log(attr);
  //正确
  console.log(options[attr]);
  //错误
  console.log(options.attr);
}
```

## 十一、异常处理

### 1. try/catch/finally

`try/catch/finally` 是 JavaScript 异常处理语句。

```js
try {
  //调试代码块
} catch (e) {
  //捕获异常，并进行异常处理的代码块
} finally {
  //后期清理代码块
}
```

在正常情况下，JavaScript 按顺序执行 `try` 子句中的代码，如果没有异常发生，将会忽略 `catch` 子句，跳转到 `finally` 子句中继续执行。

如果在 `try` 子句运行时发生错误，或者使用 throw 语句主动抛出异常，则执行 `catch` 子句中的代码，同时传入一个参数，引用 `Error` 对象。

不管 `try` 语句是否完全执行，`finally` 语句最后都必须要执行，即使使用了跳转语句跳出了异常处理结构，也必须在跳出之前先执行 `finally` 子句。

### 2. Error

通过 `Error` 的构造器可以创建一个错误对象。当运行时错误产生时，`Error` 的实例对象会被抛出。`Error` 对象也可用于用户自定义的异常的基础对象。

创建自定义异常的语法：

```js
new Error([message]);
```

参数说明：

- `message`：可选。可阅读的错误描述信息。

ECMA-262 规范了 7 种错误类型，具体说明如下。其中 `Error` 是基类，其他 6 种错误类型是子类，都继承 `Error` 基类。`Error` 类型的主要用途是自定义异常对象。  
下面列出了各种内建的标准错误类型。

- `Error`：普通异常。与 `throw` 语句和 `try/catch` 语句一起使用，属性 `name` 可以读写异常类型，`message` 属性可以读写详细错误信息。
- `EvalError`：不正确的使用 `eval()` 方法时抛出。
- `SyntaxError`：出现语法错误时抛出。
- `RangeError`：数字超出合法范围时抛出、
- `ReferenceError`：读取不存在的变量时抛出，无效引用。
- `TypeError`：变量或参数不属于有效类型。
- `URIError`：URI 编码和解码错误时抛出。例如，给 `encodeURI()` 或 `decodeURI()` 传递的参数无效。

### 3. throw

`throw` 语句用来抛出一个用户自定义的异常。当前函数的执行将被停止（`throw` 之后的语句将不会执行），并且控制将被传递到调用堆栈中的第一个 `catch` 块。如果调用者函数中没有 `catch` 块，程序将会终止。

```js
try {
  console.log("before throw");
  throw new TypeError("This is a TypeError");
  console.log("after throw"); // 这条语句不会执行
} catch (e) {
  console.log(e.name);
  console.log(e.message);
}
/*
before throw
TypeError
This is a TypeError
*/
```

### 4. 关于嵌套的 try 块

任何给定的异常只会被离它最近的封闭 `catch` 块捕获一次。当然，在 “inner” 块抛出的任何新异常 （因为 `catch` 块里的代码也可以抛出异常），将会被 “outer” 块所捕获。

```js
try {
  try {
    throw new Error("oops");
  } catch (e) {
    console.log("[inner] " + e.message);
    throw e;
  } finally {
    console.log("[inner] finally");
  }
} catch (e) {
  console.log("[outer] " + e.message);
}
/*
[inner] oops
[inner] finally
[outer] oops
*/
```

如果从 `finally` 块中返回一个值，那么这个值将会成为整个 `try-catch-finally` 的返回值，无论是否有 `return` 语句在 `try` 和 `catch` 中。这包括在 `catch` 块里抛出的异常。

```js
try {
  try {
    throw new Error("oops");
  } catch (e) {
    console.log("[inner] " + e.message);
    throw e; // 这里抛出的异常被 return 语句给覆盖了，所以外层无法捕获
  } finally {
    console.log("[inner] finally");
    return;
  }
} catch (e) {
  console.log("[outer] " + e.message); // 无法捕获内层抛出的异常
} finally {
  console.log("[outer] finally");
}
/*
[inner] oops
[inner] finally
[outer] finally
*/
```

> [!note]
>
> # chrome 代码调试
>
> - 断点调试：断点调试是指自己在程序的某一行设置一个断点，调试时，程序运行到这一行就会停住，然后你可以一步一步往下调试，调试过程中可以看各个变量当前的值，出错的话，调试到出错的代码行即显示错误，停下。
> - 断点调试可以帮我们观察程序的运行过程
> - 浏览器中按 F12--> sources -->找到需要调试的文件-->在程序的某一行设置断点
> - Watch: 监视，通过 watch 可以监视变量的值的变化，非常的常用。
> - F11: 程序单步执行，让程序一行一行的执行，这个时候，观察 watch 中变量的值的变化。
> - 代码调试的能力非常重要，只有学会了代码调试，才能学会自己解决 bug 的能力。初学者不要觉得调试代码麻烦就不去调试，

# 声明提升

1. 我们 js 引擎运行 js 分为两步： 预解析，代码执行
   - 预解析 js 引擎会把 js 里面所有的 var 还有 function 提升到当前作用域的最前面
   - 代码执行 按照代码书写的顺序从上往下执行
2. 预解析分为变量预解析（变量提升） 和函数预解析（函数提升）
   - 变量提升就是把所有的变量声明提升到当前的作用域最前面 不提升赋值操作
   - 函数提升就是把所有的函数声明提升到当前的作用域最前面，不调用操作

举例一

```JS
func();
var func = function () {
    console.log('hello');
}
// 出错，以上代码相当于：
var func;
func();
func = function () {
    console.log('hello');
}
```

举例二

```JS
f1()
console.log(c);
console.log(b);
console.log(a);
function f1() {
    var a = b = c = 9;
    console.log(a);
    console.log(b);
    console.log(c);
}
```

相当于

```JS
function f1() {
    var a;
    c = 9;
    b = c;
    a = b;
    console.log(a);
    console.log(b);
    console.log(c);
}
f1();
console.log(c);
console.log(b);
console.log(a);
```

输出

```JS
// answer
/*
9
9
9
9
9
error
*/
```

> ```js
> // JS 交换两个元素
> var a = 1,
>   b = 2;
> console.log(a, b); // 1 2
> [a, b] = [b, a];
> console.log(a, b); // 2 1
> ```
