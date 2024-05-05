---
# 当前页面内容标题
title: HTML
# 当前页面图标
icon: html
# 分类
category:
  - 前端
  - HTML
# 标签
tag:
  - HTML
  - web
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: false
# 是否将该文章添加至时间线中
timeline: false
---

# HTML入门

> HTML简介

超文本标记语言（英语：HyperText Markup Language，简称：HTML）是一种用于创建网页的标准标记语言。

可以使用 HTML 来建立自己的 WEB 站点，HTML 运行在浏览器上，由浏览器来解析。

[MDN](https://developer.mozilla.org/zh-CN/)

## 标签

```html
<html></html>
<head></head>
···
```

#### HTML 标题

HTML 标题（Heading）是通过\<h1> - \<h6> 标签来定义的。

实例:

```HTML
<h1>这是一个标题</h1>
<h2>这是一个标题</h2>
<h3>这是一个标题</h3>
```

![image-20230102214004924](https://gitee.com/talentestors/img/raw/master/images/image-20230102214004924.png)

#### HTML 段落

HTML 段落是通过标签 \<p> 来定义的。

实例:

```HTML
<p>这是一个段落。</p>
<p>这是另外一个段落。</p>
```

> 文本格式化标签

- 粗体：`<strong>加粗</strong>`或者`<b>加粗</b>`
- 下划线：`<ins>下划线</ins>`或者`<u>下划线</u>`
- 斜体：`<em>倾斜</em>`或者`<i>倾斜</i>`
- 删除线：`<del>删除线</del>`或者`<s>删除线</s>`
- 空格：`$nbsp`

#### HTML 图像

HTML 图像是通过标签 \<img> 来定义的.

实例:

```HTML
<img decoding="async" src="/images/logo.png" width="258" height="39" />
```

#### Other

`hr` 分割线

`br`换行

## HTML页面

模板

```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>title</title>
  </head>
  <body>
      <h1>我的第一个标题</h1>
      <p>我的第一个段落。</p>
</body>
</html>
```

> 注意：对于中文网页需要使用 \<meta charset="utf-8"> 声明编码，否则会出现乱码。有些浏览器(如 360 浏览器)会设置 GBK 为默认编码，则你需要设置为 \<meta charset="gbk">。

## 元素

- `<html lang="zh-CN">` `lang` 表示该页面的语言   `"en"` 英语  `"zh"` 中文

- `<p id="p1" title="show1">Hello,world!</p>` `id` 给标签命名`title`定义鼠标指向元素显示的信息

- `<meta charset="UTF-8" />` 页面编码

### HTML 元素

| 开始标签                | 元素内容     | 结束标签 |
| :---------------------- | :----------- | :------- |
| \<p>                    | 这是一个段落 | \</p>    |
| \<a href="default.htm"> | 这是一个链接 | \</a>    |
| \<br>                   | 换行         |          |

开始标签常被称为**起始标签（opening tag）**，结束标签常称为**闭合标签（closing tag）**。

------

### HTML 元素语法

- HTML 元素以**开始标签**起始
- HTML 元素以**结束标签**终止
- **元素的内容**是开始标签与结束标签之间的内容
- 某些 HTML 元素具有**空内容（empty content）**
- 空元素**在开始标签中进行关闭**（以开始标签的结束而结束）
- 大多数 HTML 元素可拥有**属性**

**注释:** 您将在本教程的下一章中学习更多有关属性的内容。

------

### 嵌套的 HTML 元素

大多数 HTML 元素可以嵌套（HTML 元素可以包含其他 HTML 元素）。

HTML 文档由相互嵌套的 HTML 元素构成。

------

### HTML 文档实例

```html
<!DOCTYPE html>
<html>

<body>
<p>这是第一个段落。</p>
</body>

</html>
```

以上实例包含了三个 HTML 元素。

------

#### HTML 实例

- \<p> 元素:

```html
<p>这是第一个段落。</p>
```

这个 \<p> 元素定义了 HTML 文档中的一个段落。
这个元素拥有一个开始标签 \<p> 以及一个结束标签 \</p>.
元素内容是: 这是第一个段落。

- **\<body> 元素:**

```html
<body>
<p>这是第一个段落。</p>
</body>
```

`<body>` 元素定义了 HTML 文档的主体。
这个元素拥有一个开始标签 `<body>` 以及一个结束标签 `</body>`。
元素内容是另一个 HTML 元素（p 元素）。

- **\<html> 元素：**

```html
<html>

<body>
<p>这是第一个段落。\</p>
</body>

</html>
```

`<html>` 元素定义了整个 HTML 文档。
这个元素拥有一个开始标签 \<html> ，以及一个结束标签 \</html>.
元素内容是另一个 HTML 元素（body 元素）。

> 不要忘记结束标签

即使您忘记了使用结束标签，大多数浏览器也会正确地显示 HTML：

`<p>`这是一个段落`<p>`这是一个段落

以上实例在浏览器中也能正常显示，因为关闭标签是可选的。

但不要依赖这种做法。忘记使用结束标签会产生不可预料的结果或错误。

------

### HTML 空元素

没有内容的 HTML 元素被称为空元素。空元素是在开始标签中关闭的。

\<br> 就是没有关闭标签的空元素（\<br> 标签定义换行）。

在 XHTML、XML 以及未来版本的 HTML 中，所有元素都必须被关闭。

在开始标签中添加斜杠，比如 \<br />，是关闭空元素的正确方法，HTML、XHTML 和 XML 都接受这种方式。

即使 \<br> 在所有浏览器中都是有效的，但使用\<br /> 其实是更长远的保障。

> HTML tips：使用小写标签

HTML 标签对大小写不敏感：\<P> 等同于 \<p>。许多网站都使用大写的 HTML 标签。

## HTML 列表

`<li>`标签可以放任意标签

#### 1.有序列表

ol： ordered list

```html
<ol>
  <li>列表1</li>
  <li>列表2</li>
  <li>列表3</li>
</ol>
```

![有序列表](https://gitee.com/talentestors/img/raw/master/images/image-20230102214237161.png)

#### 2.无序列表

ul ：unordered（无序的）list

li：list item （ 列表项）

```html
<ul>
  <li>列表1</li>
  <li>列表2</li>
  <li>列表3</li>
</ul>
```

![无序列表](https://gitee.com/talentestors/img/raw/master/images/unorderlist.png)

#### 3.多级列表

```html
<ul>
    <li>
      北京市
      <ul>
        <li>海滨区</li>
        <li>朝阳区</li>
        <li>昌平区</li>
      </ul>
    </li>
    <li>
      河北省
      <ul>
        <li>石家庄</li>
        <li>保定</li>
      </ul>
    </li>
</ul>
```

![多级列表](https://gitee.com/talentestors/img/raw/master/images/image-20230102214415944.png)

#### 4.自定义列表

自定义列表不仅仅是一列项目，而是项目及其注释的组合。

自定义列表以 `<dl>` 标签开始。每个自定义列表项以 `<dt>` 开始。每个自定义列表项的定义以 `<dd>` 开始。

```html
<dl>
    <dt>look</dt>
    <dd>解释1</dd>
    <dd>解释2</dd>
    <dd>解释3</dd>
</dl>
```

![自定义列表](https://gitee.com/talentestors/img/raw/master/images/image-20230110210855890.png)

## HTML Anchor(超链接)

锚，超链接

```html
<a href="address">超链接文本</a>
```

#### 1.本地网页

```html
 <a href="index01.html">本地网页</a>
```

#### 2.互联网网页

```html
<a href="http://www.bilibili.com">互联网网页</a>
```

#### 3.页面内锚点

```html
<a href="#p1">页面内锚点</a>
    <hr /><!-- <hr>分割线 -->
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
 <!-- <br>换行 -->
    <p id="p1">很下面的内容<a href="#">回到顶部</a></p>
```

href = "#" 只有#号，表示回到页面顶部

```html
<a href = "跳转目标" target="目标窗口弹出方式">文本或图像</a>
```

- `target` 指定链接页面的打开方式，_self为默认值，\_blank为在新窗口打开。

> 案例
>
> ```html
> <!DOCTYPE html>
> <html lang="zh">
> <head>
>  <meta charset="UTF-8" />
>  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
>  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
>  <title>Document</title>
> </head>
> <body>
>  <a href="index01.html">本地网页</a>
>  <hr/>
>  <a href="http://www.bilibili.com">互联网网页</a>
>  <hr/>
>  <a href="#p1">页面内锚点</a>
>  <hr/>
>  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
>  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
>  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
>  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
>  <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
>  <p id="p1">很下面的内容<a href="#">回到顶部</a></p>
> </body>
> </html>
> ```

`结果：`

![](https://gitee.com/talentestors/img/raw/master/images/image-20230104173012362.png)![](https://gitee.com/talentestors/img/raw/master/images/image-20230104173036601.png)

## 多媒体

#### 1.Image

```html
<img src="文件路径">
<img src="文件路径" alt="error" width="200">
```

`border`边框

src格式有三种

- 文件地址
- data URL  将图片的二进制数据嵌入网页

```html
 data:媒体类型;base64,数据
```

- object URL

> base64编码

**java：**

终端

`jshell`+`<CR>`

调用`Files.readAllBytes()`方法

`Files.readAllBytes(Path.of("path of image"));`+`<CR>`

![image-20230104205017470](https://gitee.com/talentestors/img/raw/master/images/image-20230104205017470.png)

调用`Base64.getEncoder().encodeToString($*)`方法

`System.out.println(Base64.getEncoder().encodeToString($1));`+`<CR>`

复制生成的字符串

```html
<img src="data:image/jpg;base64,粘贴数据" alt="error" width="400" />
```

#### 2.Video

```html
<video src="文件路径"></video>
```

```html
 <video src="../video/tscg.mp4" width="800" controls></video>
```

`controls`显示控件

> 案例：嵌入B站视频
>
> ```html
> <iframe src="//player.bilibili.com/player.html?aid=941207928&bvid=BV13W4y127Ey&cid=807165255&page=46" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
> ```

![B站视频](https://gitee.com/talentestors/img/raw/master/images/image-20230104195123485.png)

#### 3.Audio

```html
<audio src="文件路径"></audio>
<audio src="文件路径" controls></audio>
```

## HTML \<div> 和\<span>

无语义,用于布局网页

HTML 可以通过 \<div> 和 \<span>将元素组合起来。

#### \<div>

（division）分开，分组

HTML \<div> 元素是**块级元素**，它可用于**组合其他 HTML 元素**的容器。

`<div>` 元素没有特定的含义。除此之外，由于它属于块级元素，浏览器会在其前后显示折行。

如果与 CSS 一同使用，`<div>` 元素可用于对大的内容块设置样式属性。

`<div>` 元素的另一个常见的用途是文档布局。它取代了使用表格定义布局的老式方法。使用 `<table>` 元素进行文档布局不是表格的正确用法。`<table>`元素的作用是显示表格化的数据。

#### \<span>

（span）内联容器，跨度，跨距

HTML \<span> 元素是**内联元素**，可用作**文本**的容器

`<span>`元素也没有特定的含义。

当与 CSS 一同使用时，`<span>` 元素可用于为部分文本设置样式属性。

## HTML 字符实体

| 显示结果 | 描述        | 实体名称           | 实体编号 |
| -------- | ----------- | ------------------ | -------- |
| &nbsp;   | 空格        | \&nbsp;            | \&#160;  |
| <        | 小于号      | \&lt;              | \&#60;   |
| >        | 大于号      | \&gt;              | \&#62;   |
| &        | 和号        | \&amp;             | \&#38;   |
| "        | 引号        | \&quot;            | \&#34;   |
| '        | 撇号        | \&apos; (IE不支持) | \&#39;   |
| ￠       | 分          | \&cent;            | \&#162;  |
| £        | 镑          | \&pound;           | \&#163;  |
| ¥        | 人民币/日元 | \&yen;             | \&#165;  |
| €        | 欧元        | \&euro;            | \&#8364; |
| §        | 小节        | \&sect;            | \&#167;  |
| ©        | 版权        | \&copy;            | \&#169;  |
| ®        | 注册商标    | \&reg;             | \&#174;  |
| ™        | 商标        | \&trade;           | \&#8482; |
| ×        | 乘号        | \&times;           | \&#215;  |
| ÷        | 除号        | \&divide;          | \&#247;  |

虽然 html 不区分大小写，但实体字符对大小写敏感。

[HTML 实体参考](HTML实体参考)

## HTML 表格

#### HTML 表格标签

```html
<table>
    <tr>
        <td>单元格中的文字</td>
        <td>1</td>
    </tr>
     ...
</table>
```

1. `<table></table>`用于定义一个表格

2. `<tr></tr>`用于定义表格中的行

3. `<td>1</td>`用于定义表格中的单元格

   想要表格居中的话，要在\<table>中添加align="center"

#### 表头单元格标签

表格的表头使用 `<th>` 标签进行定义。

大多数浏览器会把表头显示为粗体居中的文本：

```html
<table border="1">
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>row 1, cell 1</td>
        <td>row 1, cell 2</td>
    </tr>
    <tr>
        <td>row 2, cell 1</td>
        <td>row 2, cell 2</td>
    </tr>
</table>
```

#### 表格属性

| key         | value               | description                              |
| ----------- | ------------------- | ---------------------------------------- |
| align       | left、center、right | 规定表格的对齐方式。                     |
| border      | 1 or ""             | 规定表格的边框，默认为""，表示没有边框。 |
| cellpadding | px                  | 规定单元边沿与内容之间的空白，默认为1。  |
| cellspacing | px                  | 规定单元格之间的空白，默认为2。          |
| width       | px 或 百分比%       | 规定表格的宽度。                         |

#### 表格结构标签

`<thead>`标签：表格头部区域

`<tbody>`标签：表格主体区域

> 其它：
>
> |     标签     | 描述                 |
> | :----------: | :------------------- |
> | `<caption>`  | 定义表格标题         |
> | `<colgroup>` | 定义表格列的组       |
> |   `<col>`    | 定义用于表格列的属性 |
> |  `<tfoot>`   | 定义表格的页脚       |

### 合并单元格

```html
rowspan="合并单元格的个数" //跨行合并
colspan="合并单元格的个数" //跨列合并
```

![合并单元格](https://gitee.com/talentestors/img/raw/master/images/image-020230110205707973.png)

```html
<table align="center" border="1" cellpadding="2" cellspacing="0">
        <thead>
          <tr>
            <th>Header 1</th>
            <th colspan="3">Header 2</th>
          </tr>
        </thead>
        <tbody align="center">
          <tr>
            <td rowspan="3">单元格</td>
            <td>单元格中的文字</td>
            <td>单元格中的文字</td>
            <td>1</td>
          </tr>
          <tr>
            <td>单元格中的文字</td>
            <td>单元格中的文字</td>
            <td>1</td>
          </tr>
          <tr>
            <td>单元格</td>
            <td>单元格</td>
            <td>1</td>
          </tr>
      </tbody>
    </table>
```

## 表单

表单的作用：**收集**用户填入的**数据**，并将数据提交给服务器

```html
<form action="服务器地址" method="请求方式" enctype="数据格式">
    <!-- 表单项 -->
    
 <input type="submit" value="提交按钮">
</form>
```

#### method

method 请求方式有

- **get**（默认）提交是，数据跟在URL地址之后
- **post**提交时，数据在请求体内

#### enctype

enctype在post请求时，指定数据格式

- **application/x-www-form-urlencoded**（默认）
- **multipart/form-data**

#### 表单项

表单项提供多种收集数据的**方式**

有\<input>输入\<select>下拉\<textarea>文本域

有**name属性**的表单项数据，才会被发送到服务器

### 常见表单项

#### \<input>

##### 1.文本框

```html
<input type="text" name="username">
```

##### 2.密码框

```html
<input type="password" name="password" maxlength="20">
<!-- "maxlength"设置输入最大值 -->
```

##### 3.隐藏框

```html
<input type="hidden" name="id">
```

##### 4.日期框

```html
<input type="date" name="birthday">
```

##### 5.单选

```html
<input type="radio" name="sex" value="男" checked>
<input type="radio" name="sex" value="女">
<!-- "checked"此元素默认被选中 --/>
```

##### 6.多选

```html
<input type="CheckBox" name="fav" value="1">
<input type="CheckBox" name="fav" value="2">
<input type="CheckBox" name="fav" value="3">
```

##### 7.文件上传

```html
<input type="file" name="avatar">
```

#### \<select>

\<select>下拉表单

```html
籍贯<select name="jiguan">
        <option value="0">长沙</option>
        <option value="0">上海</option>
        <option value="0" selected>北京</option>
        <option value="0">杭州</option>
      </select>
```

selected:默认选择项

#### \<label>

`<label>`标签为input元素定义标注(标签)。

用于绑定一个表单元素，可以增加用户体验。

```html
<label for="m" >男</label>
<input type="radio" name="sex" value="男" id="m" checked />
<label for="f">女</label>
<input type="radio" name="sex" value="女"  id="f" />
```

#### \<textarea>

文本域元素

```html
<form>
反馈：<br />
	<textarea name="feedback" id="feed" cols="30" rows="10">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet veritatis ipsum quasi, maxime deleniti deserunt ducimus officia nostrum? Alias assumenda dolorum, illum molestias deserunt eaque rem cumque incidunt recusandae quasi?
	</textarea>
</form>
```
