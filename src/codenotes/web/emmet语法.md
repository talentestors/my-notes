# Emmet 语法

> Emmet 是一种介于标记性语言（如 HTML、XML）和规范之外的逻辑输入方法，是一种能大幅提高前端开发效率的工具。

## HTML 文档类型和结构初始化

- `html:5` 或`!`：用于 HTML5 文档类型
- `html:xt`：用于 XHTML 过渡文档类型
- `html:4s`：用于 HTML4 严格文档类型

```html
html:5 !
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

#### 点号

表示 class 属性。

`div.jpf`

```html
<div class="jpf"></div>
```

#### 井号

表示 id 属性。

`div#jpf`

```html
<div id="jpf"></div>
```

#### 方括号

表示标签的内部属性。

`a[href="123" class="a"]`

```html
<a href="123" class="a"></a>
```

#### 花括号

表示标签的内容。

`div{hi}`

```html
<div>hi</div>
```

#### 小括号

表示分组标签。

`(a>h1)+(b>h2)`

```html
<a href="">
  <h1></h1>
</a>
<b>
  <h2></h2>
</b>
```

#### 特殊实例

`ul>.jpf`

```html
<ul>
  <li class="jpf"></li>
</ul>
```

`label[for='content']>#content`

```html
<label for="content">
  <span id="content"></span>
</label>
```

### 关系符号

关系符号共有五个，分别是大于号、加号、角号、星号和美元符。

#### 大于号

表示嵌套元素。

`ul>li`

```html
<ul>
  <li></li>
</ul>
```

#### 加号

表示同级元素。

`div+div`

```html
<div></div>
<div></div>
```

`ul>li+a`

```html
<ul>
  <li></li>
  <a href=""></a>
</ul>
```

#### 角号

表示上级元素。

`div>ul>li^p`

```html
<div>
  <ul>
    <li></li>
  </ul>
  <p></p>
</div>
```

`div>ul>li^^p`

```html
<div>
  <ul>
    <li></li>
  </ul>
</div>
<p></p>
```

`ul>li^ul>li`

```html
<ul>
  <li></li>
</ul>
<ul>
  <li></li>
</ul>
```

`div>(p>ul>li*2>a)+div>p`

```html
<div>
    <p>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </p>
    <div>
        <p></p>
    </div>
</div>
```

`div>(tr>td*5)*2+div>p`

```html
<div>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <div>
    <p></p>
  </div>
</div>
```

#### 星号

表示批量复制。

`ul>li*5`

```html
<ul>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
  <li></li>
</ul>
```

`div*5`

```html
<div></div>
<div></div>
<div></div>
<div></div>
<div></div>
```

#### 美元符

表示数字通配符。

`div.jpf$*5`

```html
<div class="jpf1"></div>
<div class="jpf2"></div>
<div class="jpf3"></div>
<div class="jpf4"></div>
<div class="jpf5"></div>
```

`div.jpf$$$*5`

```html
<div class="jpf001"></div>
<div class="jpf002"></div>
<div class="jpf003"></div>
<div class="jpf004"></div>
<div class="jpf005"></div>
```

`div>ul>li.item-$*3`

```html
<div>
  <ul>
    <li class="item-1"></li>
    <li class="item-2"></li>
    <li class="item-3"></li>
  </ul>
</div>
```

`ul>li.$*3`

```html
<ul>
  <li class="1"></li>
  <li class="2"></li>
  <li class="3"></li>
</ul>
```

`ul>li[id='item$']{第$$$条数据}*3`

```html
<ul>
  <li id="item1">第001条数据</li>
  <li id="item2">第002条数据</li>
  <li id="item3">第003条数据</li>
</ul>
```

**美元符配合@可以实现从指定数字开始向后数指定位数。**

`div.jpf$@3*5`

```html
<div class="jpf3"></div>
<div class="jpf4"></div>
<div class="jpf5"></div>
<div class="jpf6"></div>
<div class="jpf7"></div>
```

#### 占位标记

`lorem`表示占位标记，作用是随机生成一个文本。lorem1 表示生成的文本包含一个单词，lorem2 表示生成的文本包含两个单词，以此类推，loremN 表示生成的文本包含 N 个单词。

`p*4>lorem2`

```html
<p>Lorem, ipsum.</p>
<p>Blanditiis, consequatur.</p>
<p>Ullam, id?</p>
<p>Corrupti, ratione.</p>
```

`div>lorem2`

```html
<div>Lorem, ipsum.</div>
```

[官网:](https://emmet.io/)<https://emmet.io/>

## 快速生成 CSS 样式

CSS 基本采取简写形式

1.`w200`生成 width: `200px;`

2.`lh26`生成`line-height: 26px;`
