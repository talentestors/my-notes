import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as n,f as l}from"./app-C3tAciGk.js";const e="/my-notes/assets/image-20211220183531957-D5iXgku0.png",t={};function h(k,i){return a(),n("div",null,i[0]||(i[0]=[l(`<p>事件是为了让我们更好的去和页面进行交互。</p><p>事件一般是定义在元素节点上的，所以我们一般称之为给元素节点绑定一个事件。</p><h2 id="一-、定义事件" tabindex="-1"><a class="header-anchor" href="#一-、定义事件"><span>一 、定义事件</span></a></h2><h3 id="_1-addeventlistener" tabindex="-1"><a class="header-anchor" href="#_1-addeventlistener"><span>（1）addEventListener</span></a></h3><p>最常用，大神都是这么写。</p><p>康永亮说兼容性问题，大家可以自行查阅资料。</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> div1</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> document</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">getElementById</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;div1&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">div1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">addEventListener</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;click&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">    console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;click&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-onclick" tabindex="-1"><a class="header-anchor" href="#_2-onclick"><span>（2）onclick</span></a></h3><p>一定要知道，能少用就少用把。</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> div1</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> document</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">getElementById</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;div1&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">div1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">onclick</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> function</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">    console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;click&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-标签内使用" tabindex="-1"><a class="header-anchor" href="#_3-标签内使用"><span>（3）标签内使用</span></a></h3><p>也常用</p><div class="language-html line-numbers-mode" data-highlighter="shiki" data-ext="html" data-title="html" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> class</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;content aaa&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> onclick</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">test</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379;">(</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">123</span><span style="--shiki-light:#383A42;--shiki-dark:#98C379;">)</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;div1&quot;</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">  name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;bbb&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">div</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">script</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> type</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">=</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;text/javascript&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">    function</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> test</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">        console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;test&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">    }</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&lt;/</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">script</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="二、清除事件" tabindex="-1"><a class="header-anchor" href="#二、清除事件"><span>二、清除事件</span></a></h2><h3 id="_1-方式一" tabindex="-1"><a class="header-anchor" href="#_1-方式一"><span>（1）方式一</span></a></h3><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">div1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">onclick</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> null</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">或者</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">div1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">onclick</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> false</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-方式二" tabindex="-1"><a class="header-anchor" href="#_2-方式二"><span>（2）方式二</span></a></h3><p>使用此方法，必须将回调函数定义在外边，不能使用匿名回调</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;"> callback</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;"> function</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(){</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">    console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;click&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">}</span></span>
<span class="line"><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">var</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;"> div1</span><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;"> =</span><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;"> document</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">getElementById</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;div1&quot;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">);</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//添加一个事件</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">div1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">addEventListener</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;click&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">callback</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">//移除一个事件</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">div1</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">removeEventListener</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;click&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">callback</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="三、事件分类" tabindex="-1"><a class="header-anchor" href="#三、事件分类"><span>三、事件分类</span></a></h2><h3 id="_1-鼠标事件" tabindex="-1"><a class="header-anchor" href="#_1-鼠标事件"><span>（1）鼠标事件</span></a></h3><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">（常用）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onclick</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：点击某个对象时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">ondblclick</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：双击某个对象时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onmouseover</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：鼠标移入某个元素时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onmouseout</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：鼠标移出某个元素时触发</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">（知道，不用）</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onmouseenter</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：鼠标进入某个元素时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onmouseleave</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：鼠标离开某个元素时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onmousedown</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：鼠标按下时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onmouseup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：鼠标抬起时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onmousemove</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：鼠标被移动时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onwheel</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：鼠标滚轮滚动时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">oncontextmenu</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：点击鼠标右键时触发</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-键盘事件" tabindex="-1"><a class="header-anchor" href="#_2-键盘事件"><span>（2）键盘事件</span></a></h3><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">键盘事件</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onkeydown</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：键盘的键按下时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onkeyup</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：键盘的键放开时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onkeypress</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：按下或按住键盘键时触发</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-表单事件" tabindex="-1"><a class="header-anchor" href="#_3-表单事件"><span>（3）表单事件</span></a></h3><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">常用</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onfocus</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：元素获得焦点时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onblur</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：元素失去焦点时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onchange</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：元素内容改变时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">oninput</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：元素获取用户输入时触发</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-文档、浏览器-对象事件" tabindex="-1"><a class="header-anchor" href="#_4-文档、浏览器-对象事件"><span>（4）（文档、浏览器）对象事件</span></a></h3><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">会用到</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：元素加载完时触发</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">一辈子也用不了几次，知不知道都行</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onresize</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：浏览器窗口大小改变时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onabort</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：图形的加载被中断时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onerror</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：当加载文档或者图片时（没找到）发生的错误时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onscroll</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：文档滚动时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onpageshow</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：用户访问页面时触发</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E06C75;">onunload</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">：用户退出页面时触发</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="四、事件冒泡和捕获" tabindex="-1"><a class="header-anchor" href="#四、事件冒泡和捕获"><span>四、事件冒泡和捕获</span></a></h2><p><strong>1、事件捕获</strong> 捕获型事件(event capturing)：事件从最不精确的对象(document 对象)开始触发，然后到最精确(也可以在窗口级别捕获事件，不过必须由开发人员特别指定)</p><p><strong>2、事件冒泡</strong> 冒泡型事件：事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发。</p><p><strong>3、捕获和冒泡过程图</strong></p><p><img src="`+e+`" alt="image-20211220183531957"></p><p>事件是先进行捕获，后进行冒泡！</p><p>addEventListener的第三个参数如果是false表示在冒泡阶段处理回调函数，如果是true表示在捕获阶段处理回调函数。</p><p>怎么阻止事件冒泡？event.stopPropagation();</p><div class="language-javascript line-numbers-mode" data-highlighter="shiki" data-ext="javascript" data-title="javascript" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">ul</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">addEventListener</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;click&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">,</span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">function</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#383A42;--shiki-light-font-style:inherit;--shiki-dark:#E06C75;--shiki-dark-font-style:italic;">event</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">){</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            console</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">log</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">(</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;ul&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#E5C07B;">            event</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">.</span><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">stopPropagation</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">();</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        },</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">true</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,37)]))}const r=s(t,[["render",h],["__file","事件.html.vue"]]),c=JSON.parse('{"path":"/codenotes/web/javascript/%E4%BA%8B%E4%BB%B6.html","title":"第五章 事件","lang":"zh-CN","frontmatter":{"title":"第五章 事件","icon":"javascript","category":["前端","JavaScript"],"tag":["JavaScript","web"],"sticky":false,"star":false,"article":false,"timeline":false,"description":"事件是为了让我们更好的去和页面进行交互。 事件一般是定义在元素节点上的，所以我们一般称之为给元素节点绑定一个事件。 一 、定义事件 （1）addEventListener 最常用，大神都是这么写。 康永亮说兼容性问题，大家可以自行查阅资料。 （2）onclick 一定要知道，能少用就少用把。 （3）标签内使用 也常用 二、清除事件 （1）方式一 （2）...","head":[["meta",{"property":"og:url","content":"https://www.stazxr.cn/my-notes/my-notes/codenotes/web/javascript/%E4%BA%8B%E4%BB%B6.html"}],["meta",{"property":"og:site_name","content":"終わり群星の知识宝库"}],["meta",{"property":"og:title","content":"第五章 事件"}],["meta",{"property":"og:description","content":"事件是为了让我们更好的去和页面进行交互。 事件一般是定义在元素节点上的，所以我们一般称之为给元素节点绑定一个事件。 一 、定义事件 （1）addEventListener 最常用，大神都是这么写。 康永亮说兼容性问题，大家可以自行查阅资料。 （2）onclick 一定要知道，能少用就少用把。 （3）标签内使用 也常用 二、清除事件 （1）方式一 （2）..."}],["meta",{"property":"og:type","content":"website"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-09-05T16:57:27.000Z"}],["meta",{"property":"article:author","content":"talentestors"}],["meta",{"property":"article:tag","content":"JavaScript"}],["meta",{"property":"article:tag","content":"web"}],["meta",{"property":"article:modified_time","content":"2024-09-05T16:57:27.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"WebPage\\",\\"name\\":\\"第五章 事件\\",\\"description\\":\\"事件是为了让我们更好的去和页面进行交互。 事件一般是定义在元素节点上的，所以我们一般称之为给元素节点绑定一个事件。 一 、定义事件 （1）addEventListener 最常用，大神都是这么写。 康永亮说兼容性问题，大家可以自行查阅资料。 （2）onclick 一定要知道，能少用就少用把。 （3）标签内使用 也常用 二、清除事件 （1）方式一 （2）...\\"}"]]},"headers":[{"level":2,"title":"一 、定义事件","slug":"一-、定义事件","link":"#一-、定义事件","children":[{"level":3,"title":"（1）addEventListener","slug":"_1-addeventlistener","link":"#_1-addeventlistener","children":[]},{"level":3,"title":"（2）onclick","slug":"_2-onclick","link":"#_2-onclick","children":[]},{"level":3,"title":"（3）标签内使用","slug":"_3-标签内使用","link":"#_3-标签内使用","children":[]}]},{"level":2,"title":"二、清除事件","slug":"二、清除事件","link":"#二、清除事件","children":[{"level":3,"title":"（1）方式一","slug":"_1-方式一","link":"#_1-方式一","children":[]},{"level":3,"title":"（2）方式二","slug":"_2-方式二","link":"#_2-方式二","children":[]}]},{"level":2,"title":"三、事件分类","slug":"三、事件分类","link":"#三、事件分类","children":[{"level":3,"title":"（1）鼠标事件","slug":"_1-鼠标事件","link":"#_1-鼠标事件","children":[]},{"level":3,"title":"（2）键盘事件","slug":"_2-键盘事件","link":"#_2-键盘事件","children":[]},{"level":3,"title":"（3）表单事件","slug":"_3-表单事件","link":"#_3-表单事件","children":[]},{"level":3,"title":"（4）（文档、浏览器）对象事件","slug":"_4-文档、浏览器-对象事件","link":"#_4-文档、浏览器-对象事件","children":[]}]},{"level":2,"title":"四、事件冒泡和捕获","slug":"四、事件冒泡和捕获","link":"#四、事件冒泡和捕获","children":[]}],"git":{"createdTime":1725555447000,"updatedTime":1725555447000,"contributors":[{"name":"talentestors","email":"talentestors@gmail.com","commits":1}]},"readingTime":{"minutes":2.85,"words":854},"filePathRelative":"codenotes/web/javascript/事件.md","localizedDate":"2024年9月5日","autoDesc":true}');export{r as comp,c as data};
