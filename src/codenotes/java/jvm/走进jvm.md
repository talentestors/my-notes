---
# 当前页面内容标题
title: Java JVM 虚拟机 - 走进JVM
# 当前页面图标
icon: JVM
# 分类
category:
  - Java
  - JVM
# 标签
tag:
  - JVM
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: false
# 目录顺序
order: 1
# 是否将该文章添加至时间线中
timeline: false
---

> [!TIP]
>
> 课程地址：<https://www.bilibili.com/video/BV1Er4y1r7as/>

JVM 相对于 Java 应用层的学习难度更大，**开篇推荐掌握的预备知识：** C/C++(关键)、微机原理与接口技术、计算机组成原理、操作系统、数据结构与算法、编译原理（不推荐刚学完 JavaSE 的同学学习），如果没有掌握推荐的一半以上的预备知识，可能学习起来会比较吃力。

**本套课程中需要用到的开发工具：** CLion、IDEA、Jetbrains Gateway

此阶段，我们需要深入探讨 Java 的底层执行原理，了解 Java 程序运行的本质。开始之前，推荐各位都入手一本《深入理解 Java 虚拟机 第三版》这本书对于 JVM 的讲述非常地详细：

![点击查看图片来源](./img/b8TSFRoZayuUOlQ.jpg)

我们在 JavaSE 阶段的开篇就进行介绍了，我们的 Java 程序之所以能够实现跨平台，本质就是因为它是运行在虚拟机之上的，而不同平台只需要安装对应平台的 Java 虚拟机即可运行（在 JRE 中包含），所有的 Java 程序都采用统一的标准，在任何平台编译出来的字节码文件(.class)也是同样的，最后实际上是将编译后的字节码交给 JVM 处理执行。

![点击查看图片来源](./img/SgBybA8xC3MrD6k.jpg)

也正是得益于这种统一规范，除了 Java 以外，还有多种 JVM 语言，比如 Kotlin、Groovy 等，它们的语法虽然和 Java 不一样，但是最终编译得到的字节码文件，和 Java 是同样的规范，同样可以交给 JVM 处理。

![点击查看图片来源](./img/vNoWyDGsuwY23OE.jpg)

所以，JVM 是我们需要去关注的一个部分，通过了解 Java 的底层运作机制，我们的技术会得到质的提升。

## 技术概述

首先我们要了解虚拟机的具体定义，我们所接触过的虚拟机有安装操作系统的虚拟机，也有我们的 Java 虚拟机，而它们所面向的对象不同，Java 虚拟机只是面向单一应用程序的虚拟机，但是它和我们接触的系统级虚拟机一样，我们也可以为其分配实际的硬件资源，比如最大内存大小等。

并且 Java 虚拟机并没有采用传统的 PC 架构，比如现在的 HotSpot 虚拟机，实际上采用的是`基于栈的指令集架构`，而我们的传统程序设计一般都是`基于寄存器的指令集架构`，这里我们需要回顾一下`计算机组成原理`中的 CPU 结构：

![image-20230306164318560](./img/FuCI49TPSRpaitE.webp)

其中，**AX，BX，CX，DX 称作为数据寄存器：**

- AX (Accumulator)：累加寄存器，也称之为累加器；
- BX (Base)：基地址寄存器；
- CX (Count)：计数器寄存器；
- DX (Data)：数据寄存器；

这些寄存器可以用来传送数据和暂存数据，并且它们还可以细分为一个 8 位的高位寄存器和一个 8 位的低位寄存器，除了这些通用功能，它们各自也有自己的一些专属职责，比如 AX 就是一个专用于累加的寄存器，用的也比较多。

**SP 和 BP 又称作为指针寄存器：**

- SP (Stack Pointer)：堆栈指针寄存器，与 SS 配合使用，用于访问栈顶；
- BP (Base Pointer)：基指针寄存器，可用作 SS 的一个相对基址位置，用它可直接存取堆栈中的数据；

**SI 和 DI 又称作为变址寄存器：**

- SI (Source Index)：源变址寄存器；
- DI (Destination Index)：目的变址寄存器；

主要用于存放存储单元在段内的偏移量，用它们可实现多种存储器操作数的寻址方式，为以不同的地址形式访问存储单元提供方便。

**控制寄存器：**

- IP (Instruction Pointer)：指令指针寄存器；
- FLAG：标志寄存器；

**段寄存器：**

- CS (Code Segment)：代码段寄存器；
- DS (Data Segment)：数据段寄存器；
- SS (Stack Segment)：堆栈段寄存器；
- ES (Extra Segment)：附加段寄存器；

这里我们分别比较一下在 x86 架构下 C 语言和 arm 架构下编译之后的汇编指令不同之处：

```c
int main() {     //实现一个最简的a+b功能，并存入变量c
    int a = 10;
    int b = 20;
    int c = a + b;
    return c;
}
```

```sh
gcc -S main.c
```

```asmatmel
 .file "main.c"
 .text
 .globl main
 .type main, @function
main:
.LFB0:
 .cfi_startproc  ;rbp寄存器是64位CPU下的基址寄存器，和8086CPU的16位bp一样
 pushq %rbp     ;该函数中需要用到rbp寄存器，所以需要先把他原来的值压栈保护起来
 .cfi_def_cfa_offset 16
 .cfi_offset 6, -16
 movq %rsp, %rbp    ;rsp是64位下的栈指针寄存器，这里是将rsp的值丢给rbp，因为局部变量是存放在栈中的，之后会使用rbp来访问局部变量
 .cfi_def_cfa_register 6
 movl $10, -12(%rbp)    ;将10存入rbp所指向位置-12的位置 ->  int a = 10;
 movl $20, -8(%rbp)     ;将20存入rbp所指向位置-8的位置  -> int b = 20;
 movl -12(%rbp), %edx   ;将变量a的值交给DX寄存器（32位下叫edx，因为是int，这里只使用了32位）
 movl -8(%rbp), %eax    ;同上，变量b的值丢给AX寄存器
 addl %edx, %eax        ;将DX和AX寄存器中的值相加，并将结果存在AX中  ->  tmp = a + b
 movl %eax, -4(%rbp)    ;将20存入rbp所指向位置-4的位置  -> int c = tmp;与上面合在一起就是int c = a + b;
 movl -4(%rbp), %eax    ;根据约定，将函数返回值放在AX   -> return c;
 popq %rbp     ;函数执行完毕，出栈
 .cfi_def_cfa 7, 8
 ret      ;函数返回
 .cfi_endproc
.LFE0:
 .size main, .-main
 .ident "GCC: (Ubuntu 7.5.0-6ubuntu2) 7.5.0"
 .section .note.GNU-stack,"",@progbits
```

在 arm 架构下（Apple M1 Pro 芯片）编译的结果为：

```armasm
    .section   __TEXT,__text,regular,pure_instructions
   .build_version macos, 12, 0    sdk_version 12, 1
   .globl _main                           ; -- Begin function main
   .p2align   2
_main:                                  ; @main
   .cfi_startproc
; %bb.0:
   sub    sp, sp, #16                     ; =16
   .cfi_def_cfa_offset 16
   str    wzr, [sp, #12]
   mov    w8, #10
   str    w8, [sp, #8]
   mov    w8, #20
   str    w8, [sp, #4]
   ldr    w8, [sp, #8]
   ldr    w9, [sp, #4]
   add    w8, w8, w9
   str    w8, [sp]
   ldr    w0, [sp]
   add    sp, sp, #16                     ; =16
   ret
   .cfi_endproc
                                        ; -- End function
.subsections_via_symbols
```

我们发现，在不同的 CPU 架构下，实际上得到的汇编代码也不一样，并且在 arm 架构下并没有和 x86 架构一样的寄存器结构，因此只能使用不同的汇编指令操作来实现。所以这也是 C 语言不支持跨平台的原因，我们只能将同样的代码在不同的平台上编译之后才能在对应的平台上运行我们的程序。

而 Java 利用了 JVM，它提供了很好的平台无关性（当然，JVM 本身是不跨平台的），我们的 Java 程序编译之后，并不是可以由平台直接运行的程序，而是由 JVM 运行，同时，我们前面说了，JVM（如 HotSpot 虚拟机），实际上采用的是`基于栈的指令集架构`，它并没有依赖于寄存器，而是更多的利用操作栈来完成，这样不仅设计和实现起来更简单，并且也能够更加方便地实现跨平台，不太依赖于硬件的支持。

这里我们对一个类进行反编译查看：

```java
public class Main {
    public int test(){    //和上面的例子一样
        int a = 10;
        int b = 20;
        int c = a + b;
        return c;
    }
}
```

```sh
javap -v target/classes/com/test/Main.class #使用javap命令对class文件进行反编译
```

得到如下结果：

```wasm
...
public int test();
    descriptor: ()I
    flags: ACC_PUBLIC
    Code:
      stack=2, locals=4, args_size=1
         0: bipush        10
         2: istore_1
         3: bipush        20
         5: istore_2
         6: iload_1
         7: iload_2
         8: iadd
         9: istore_3
        10: iload_3
        11: ireturn
      LineNumberTable:
        line 5: 0
        line 6: 3
        line 7: 6
        line 8: 10
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0      12     0  this   Lcom/test/Main;
            3       9     1     a   I
            6       6     2     b   I
           10       2     3     c   I
```

我们可以看到，java 文件编译之后，也会生成类似于 C 语言那样的汇编指令，但是这些命令都是交给 JVM 去执行的命令（实际上虚拟机提供了一个类似于物理机的运行环境，也有程序计数器之类的东西），最下方存放的是本地变量（局部变量）表，表示此方法中出现的本地变量，实际上 this 也在其中，所以我们才能在非静态方法中使用`this`关键字，在最上方标记了方法的返回值类型、访问权限等。首先介绍一下例子中出现的命令代表什么意思：

- `bipush` 将单字节的常量值推到栈顶
- `istore_1` 将栈顶的 int 类型数值存入到第二个本地变量
- `istore_2` 将栈顶的 int 类型数值存入到第三个本地变量
- `istore_3` 将栈顶的 int 类型数值存入到第四个本地变量
- `iload_1` 将第二个本地变量推向栈顶
- `iload_2` 将第三个本地变量推向栈顶
- `iload_3` 将第四个本地变量推向栈顶
- `iadd` 将栈顶的两个 int 类型变量相加，并将结果压入栈顶
- `ireturn` 方法的返回操作

有关详细的指令介绍列表可以参考《深入理解 Java 虚拟机 第三版》附录 C。

JVM 运行字节码时，所有的操作基本都是围绕两种数据结构，一种是堆栈（本质是栈结构），还有一种是队列，如果 JVM 执行某条指令时，该指令需要对数据进行操作，那么被操作的数据在指令执行前，必须要压到堆栈上，JVM 会自动将栈顶数据作为操作数。如果堆栈上的数据需要暂时保存起来时，那么它就会被存储到局部变量队列上。

我们从第一条指令来依次向下解读，显示方法相关属性：

```wasm
descriptor: ()I     //参数以及返回值类型，()I就表示没有形式参数，返回值为基本类型int
flags: ACC_PUBLIC   //public访问权限
Code:
  stack=2, locals=4, args_size=1    //stack表示要用到的最大栈深度，本地变量数，堆栈上最大对象数量（这里指的是this）
```

有关 descriptor 的详细属性介绍，我们会放在之后的类结构中进行讲解。

接着我们来看指令：

```wasm
0: bipush        10     //0是程序偏移地址，然后是指令，最后是操作数
2: istore_1
```

这一步操作实际上就是使用`bipush`将 10 推向栈顶，接着使用`istore_1`将当前栈顶数据存放到第二个局部变量中，也就是 a，所以这一步执行的是`int a = 10`操作。

```wasm
3: bipush        20
5: istore_2
```

同上，这里执行的是`int b = 20`操作。

```wasm
6: iload_1
7: iload_2
8: iadd
```

这里是将第二和第三个局部变量放到栈中，也就是取 a 和 b 的值到栈中，最后`iadd`操作将栈中的两个值相加，结果依然放在栈顶。

```wasm
9: istore_3
10: iload_3
11: ireturn
```

将栈顶数据存放到第四个局部变量中，也就是 c，执行的是`int c = 30`，最后取出 c 的值放入栈顶，使用`ireturn`返回栈顶值，也就是方法的返回值。

至此，方法执行完毕。

实际上我们发现，JVM 执行的命令基本都是入栈出栈等，而且大部分指令都是没有操作数的，传统的汇编指令有一操作数、二操作数甚至三操作数的指令，Java 相比 C 编译出来的汇编指令，执行起来会更加复杂，实现某个功能的指令条数也会更多，所以 Java 的执行效率实际上是不如 C/C++的，虽然能够很方便地实现跨平台，但是性能上大打折扣，所以在性能要求比较苛刻的 Android 上，采用的是定制版的 JVM，并且是基于寄存器的指令集架构。此外，在某些情况下，我们还可以使用 JNI 机制来通过 Java 调用 C/C++编写的程序以提升性能（也就是本地方法，使用到 native 关键字）

---

## 现在与未来

随着时代的变迁，JVM 的实现多种多样，而我们还要从最初的虚拟机说起。

### 虚拟机的发展历程

在 1996，Java1.0 面世时，第一款商用虚拟机 Sun Classic VM 开始了它的使命，这款虚拟机提供了一个 Java 解释器，也就是将我们的 class 文件进行读取，最后像上面一样得到一条一条的命令，JVM 再将指令依次执行。虽然这样的运行方式非常的简单易懂，但是它的效率实际上是很低的，就像你耳机里一边在放六级听力，你必须同时记在脑海里面然后等着问问题，再去选择问题的答案一样，更重要的是同样的代码每次都需要重新翻译再执行。

这个时候我们就需要更加高效的方式来运行 Java 程序，随着后面的发展，现在大多数的主流的 JVM 都包含即时**编译器**。JVM 会根据当前代码的进行判断，当虚拟机发现某个方法或代码块的运行特别频繁时，就会把这些代码认定为“热点代码”。为了提高热点代码的执行效率，在运行时，虚拟机将会把这些代码编译成与本地平台相关的机器码，并进行各种层次的优化，完成这个任务的编译器称为即时编译器（Just In Time Compiler）

![img](./img/JcfyIZm85AXECoh.jpg)

在 JDK1.4 时，Sun Classic VM 完全退出了历史舞台，取而代之的是至今都在使用的 HotSpot VM，它是目前使用最广泛的虚拟机，拥有上面所说的热点代码探测技术、准确式内存管理（虚拟机可以知道内存中某个位置的数据具体是什么类型）等技术，而我们之后的章节都是基于 HotSpot 虚拟机进行讲解。

### 虚拟机发展的未来

2018 年 4 月，Oracle Labs 公开了最新的 GraalVM，它是一种全新的虚拟机，它能够实现所有的语言统一运行在虚拟机中。

![img](./img/BKqTOH8RrjoAWMw.jpg)

Graal VM 被官方称为“Universal VM”和“Polyglot VM”，这是一个在 HotSpot 虚拟机基础上增强而成的跨语言全栈虚拟机，可以作为“任何语言”的运行平台使用，这里“任何语言”包括了 Java、Scala、Groovy、Kotlin 等基于 Java 虚拟机之上的语言，还包括了 C、C++、Rust 等基于 LLVM 的语言，同时支持其他像 JavaScript、Ruby、Python 和 R 语言等等。Graal VM 可以无额外开销地混合使用这些编程语言，支持不同语言中混用对方的接口和对象，也能够支持这些语言使用已经编写好的本地库文件。

Graal VM 的基本工作原理是将这些语言的源代码（例如 JavaScript）或源代码编译后的中间格式（例如 LLVM 字节码）通过解释器转换为能被 Graal VM 接受的中间表示（Intermediate Representation，IR），譬如设计一个解释器专门对 LLVM 输出的字节码进行转换来支持 C 和 C++语言，这个过程称为“程序特化”（Specialized，也常称为 Partial Evaluation）。Graal VM 提供了 Truffle 工具集来快速构建面向一种新语言的解释器，并用它构建了一个称为 Sulong 的高性能 LLVM 字节码解释器。

目前最新的 SpringBoot 已经提供了本地运行方案：<https://docs.spring.io/spring-native/docs/current/reference/htmlsingle/>

> Spring Native 支持使用[GraalVM](https://www.graalvm.org/)[原生镜像](https://www.graalvm.org/reference-manual/native-image/)编译器将 Spring 应用程序编译为本机可执行文件。
>
> 与 Java 虚拟机相比，原生映像可以为许多类型的工作负载实现更简单、更加持续的托管。包括微服务、非常适合容器的功能工作负载和[Kubernetes](https://kubernetes.io/)
>
> 使用本机映像提供了关键优势，如即时启动、即时峰值性能和减少内存消耗。
>
> GraalVM 原生项目预计随着时间的推移会改进一些缺点和权衡。构建本机映像是一个比常规应用程序慢的繁重过程。热身后的本机映像运行时优化较少。最后，它不如 JVM 成熟，行为各不相同。
>
> 常规 JVM 和此原生映像平台的主要区别是：
>
> - 从主入口点对应用程序进行静态分析，在构建时进行。
> - 未使用的部件将在构建时删除。
> - 反射、资源和动态代理需要配置。
> - Classpath 在构建时是固定的。
> - 没有类惰性加载：可执行文件中运送的所有内容将在启动时加载到内存中。
> - 一些代码将在构建时运行。
> - Java 应用程序的某些方面有一些不受完全支持[的限制](https://www.graalvm.org/reference-manual/native-image/Limitations/)。
>
> 该项目的目标是孵化对 Spring Native 的支持，Spring Native 是 Spring JVM 的替代品，并提供旨在打包在轻量级容器中的原生部署选项。在实践中，目标是在这个新平台上支持您的 Spring 应用程序，几乎未经修改。

优点：

1. 立即启动，一般启动时间小于 100ms
2. 更低的内存消耗
3. 独立部署，不再需要 JVM
4. 同样的峰值性能要比 JVM 消耗的内存小

缺点：

1. 构建时间长
2. 只支持新的 Springboot 版本（2.4.4+）

---

## 手动编译 JDK8

学习 JVM 最关键的是研究底层 C/C++源码，我们首先需要搭建一个测试环境，方便我们之后对底层源码进行调试。但是编译这一步的坑特别多，请务必保证跟教程中的环境一致，尤其是编译环境，版本不能太高，因为 JDK8 属于比较早期的版本了，否则会遇到各种各样奇奇怪怪的问题。

### 环境配置

- 操作系统：Ubuntu 20.04 Server
- 硬件配置：i7-4790 4C8T/ 16G 内存 / 128G 硬盘 （不能用树莓派或是 arm 芯片 Mac 的虚拟机，配置越高越好，不然卡爆）
- 调试工具：Jetbrains Gateway（服务器运行 CLion Backend 程序，界面在 Mac 上显示）
- OpenJDK 源码：<https://codeload.github.com/openjdk/jdk/zip/refs/tags/jdk8-b120>
- 编译环境：
  - gcc-4.8
  - g++-4.8
  - make-3.81
  - openjdk-8

### 开始折腾

首选需要在我们的测试服务器上安装 Ubuntu 20.04 Server 系统，并通过 ssh 登录到服务器：

```sh
Welcome to Ubuntu 20.04.3 LTS (GNU/Linux 5.4.0-96-generic x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/advantage

  System information as of Sat 29 Jan 2022 10:33:03 AM UTC

  System load:  0.08               Processes:               156
  Usage of /:   5.5% of 108.05GB   Users logged in:         0
  Memory usage: 5%                 IPv4 address for enp2s0: 192.168.10.66
  Swap usage:   0%                 IPv4 address for enp2s0: 192.168.10.75
  Temperature:  32.0 C


37 updates can be applied immediately.
To see these additional updates run: apt list --upgradable


Last login: Sat Jan 29 10:27:06 2022
nagocoler@ubuntu-server:~$
```

先安装一些基本的依赖：

```sh
sudo apt install build-essential libxrender-dev xorg-dev libasound2-dev libcups2-dev gawk zip libxtst-dev libxi-dev libxt-dev gobjc
```

接着我们先将 JDK 的编译环境配置好，首先是安装 gcc 和 g++的 4.8 版本，但是最新的源没有这个版本了，我们先导入旧版软件源：

```sh
sudo vim /etc/apt/sources.list
```

在最下方添加旧版源地址并保存：

```bash
deb http://archive.ubuntu.com/ubuntu xenial main
deb http://archive.ubuntu.com/ubuntu xenial universe
```

接着更新一下 apt 源信息，并安装 gcc 和 g++：

```sh
sudo apt update
sudo apt install gcc-4.8 g++-4.8
```

接着配置：

```sh
sudo update-alternatives --install /usr/bin/gcc gcc /usr/bin/gcc-4.8 100
sudo update-alternatives --install /usr/bin/g++ g++ /usr/bin/g++-4.8 100
```

最后查看版本是否为 4.8 版本：

```sh
nagocoler@ubuntu-server:~$ gcc --version
gcc (Ubuntu 4.8.5-4ubuntu2) 4.8.5
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

nagocoler@ubuntu-server:~$ g++ --version
g++ (Ubuntu 4.8.5-4ubuntu2) 4.8.5
Copyright (C) 2015 Free Software Foundation, Inc.
This is free software; see the source for copying conditions.  There is NO
warranty; not even for MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

接着安装 make 3.81 版本，需要从官方下载：

```sh
wget https://ftp.gnu.org/gnu/make/make-3.81.tar.gz
```

下载好之后进行解压，并进入目录：

```sh
tar -zxvf make-3.81.tar.gz
cd make-3.81/
```

接着我们修改一下代码，打开`glob/glob.c`文件：

```c
...
#ifdef  HAVE_CONFIG_H
# include <config.h>
#endif

#define __alloca alloca   <- 添加这一句
/* Enable GNU extensions
...
```

接着进行配置并完成编译和安装：

```sh
bash configure
sudo make install
```

安装完成后，将 make 已经变成 3.81 版本了：

```sh
nagocoler@ubuntu-server:~/make-3.81$ make -verison
GNU Make 3.81
Copyright (C) 2006  Free Software Foundation, Inc.
This is free software; see the source for copying conditions.
There is NO warranty; not even for MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.
```

由于 JDK 中某些代码是 Java 编写的，所以我们还需要安装一个启动 JDK，启动 JDK 可以是当前版本或低一版本，比如我们要编译 JDK8 的源码，那么就可以使用 JDK7、JDK8 作为启动 JDK，对源码中的一些 java 文件进行编译。这里我们选择安装 OpenJDK8 作为启动 JDK：

```sh
sudo apt install openjdk-8-jdk
```

这样，我们的系统环境就准备完成了，接着我们需要下载 OpenJDK8 的源码（已经放在网盘了）解压：

```sh
unzip jdk-jdk8-b120.zip
```

接着我们需要安装 JetBrains Gateway 在我们的服务器上导入项目，这里我们使用 CLion 后端，等待下载远程后端，这样我们的 Linux 服务器上虽然没有图形化界面，但是依然可以使用 IDEA、CLion 等工具，只是服务器上只有后端程序，而界面由我们电脑上的前端程序提供（目前此功能还在 Beta 阶段，暂不支持 arm 架构的 Linux 服务器）整个过程根据服务器配置决定可能需要 5-20 分钟。

完成之后，我们操作起来就很方便了，界面和 IDEA 其实差不多，我们打开终端，开始进行配置：

```sh
bash configure --with-debug-level=slowdebug --enable-debug-symbols ZIP_DEBUGINFO_FIELS=0
```

配置完成后，再次确认是否和教程中的配置信息一致：

```shell
Configuration summary:
* Debug level:    slowdebug
* JDK variant:    normal
* JVM variants:   server
* OpenJDK target: OS: linux, CPU architecture: x86, address length: 64

Tools summary:
* Boot JDK:       openjdk version "1.8.0_312" OpenJDK Runtime Environment (build 1.8.0_312-8u312-b07-0ubuntu1~20.04-b07) OpenJDK 64-Bit Server VM (build 25.312-b07, mixed mode)  (at /usr/lib/jvm/java-8-openjdk-amd64)
* C Compiler:     gcc-4.8 (Ubuntu 4.8.5-4ubuntu2) version 4.8.5 (at /usr/bin/gcc-4.8)
* C++ Compiler:   g++-4.8 (Ubuntu 4.8.5-4ubuntu2) version 4.8.5 (at /usr/bin/g++-4.8)

Build performance summary:
* Cores to use:   3
* Memory limit:   3824 MB
* ccache status:  not installed (consider installing)

WARNING: The result of this configuration has overridden an older
configuration. You *should* run 'make clean' to make sure you get a
proper build. Failure to do so might result in strange build problems.
```

接着我们需要修改几个文件，不然一会会编译失败，首先是`hotspot/make/linux/Makefile`文件：

```text
原有的 SUPPORTED_OS_VERSION = 2.4% 2.5% 2.6% 3%
修改为 SUPPORTED_OS_VERSION = 2.4% 2.5% 2.6% 3% 4% 5%
```

接着是`hotspot/make/linux/makefiles/gcc.make`文件：

```text
原有的 WARNINGS_ARE_ERRORS = -Werror
修改为 #WARNINGS_ARE_ERRORS = -Werror
```

接着是`nashorn/make/BuildNashorn.gmk`文件：

```c
  $(CP) -R -p $(NASHORN_OUTPUTDIR)/nashorn_classes/* $(@D)/
  $(FIXPATH) $(JAVA) \
原有的 -cp "$(NASHORN_OUTPUTDIR)/nasgen_classes$(PATH_SEP)$(NASHORN_OUTPUTDIR)/nashorn_classes" \
修改为  -Xbootclasspath/p:"$(NASHORN_OUTPUTDIR)/nasgen_classes$(PATH_SEP)$(NASHORN_OUTPUTDIR)/nashorn_classes" \
   jdk.nashorn.internal.tools.nasgen.Main $(@D) jdk.nashorn.internal.objects $(@D)
```

OK，修改完成，接着我们就可以开始编译了：

```sh
make all
```

整个编译过程大概需要持续 10-20 分钟，请耐心等待。构建完成后提示：

```sh
----- Build times -------
Start 2022-01-29 11:36:35
End   2022-01-29 11:48:20
00:00:30 corba
00:00:25 demos
00:02:39 docs
00:03:05 hotspot
00:00:27 images
00:00:17 jaxp
00:00:31 jaxws
00:03:02 jdk
00:00:38 langtools
00:00:11 nashorn
00:11:45 TOTAL
-------------------------
Finished building OpenJDK for target 'all'
```

只要按照我们的教程一步步走，别漏了，应该是直接可以完成的，当然难免可能有的同学出现了奇奇怪怪的问题，加油，慢慢折腾，总会成功的~

接着我们就可以创建一个测试配置了，首先打开设置页面，找到`自定义构建目标`：

![image-20230306164504510](./img/TAcqg1Sx3KwOQZz.webp)

点击`应用`即可，接着打开运行配置，添加一个新的自定义配置：

![image-20230306164521873](./img/FbEYsV1zvIf9TWl.webp)

选择我们编译完成的 java 程序，然后测试-version 查看版本信息，去掉下方的构建。

接着直接运行即可：

```sh
/home/nagocoler/jdk-jdk8-b120/build/linux-x86_64-normal-server-slowdebug/jdk/bin/java -version
openjdk version "1.8.0-internal-debug"
OpenJDK Runtime Environment (build 1.8.0-internal-debug-nagocoler_2022_01_29_11_36-b00)
OpenJDK 64-Bit Server VM (build 25.0-b62-debug, mixed mode)

Process finished with exit code 0
```

我们可以将工作目录修改到其他地方，接着我们创建一个 Java 文件并完成编译，然后测试能否使用我们编译的 JDK 运行：

![image-20230306164535518](./img/YZcxklCK7hvnapV.webp)

在此目录下编写一个 Java 程序，然后编译：

```java
public class Main{
 public static void main(String[] args){
  System.out.println("Hello World!");
 }
}
```

```sh
nagocoler@ubuntu-server:~$ cd JavaHelloWorld/
nagocoler@ubuntu-server:~/JavaHelloWorld$ vim Main.java
nagocoler@ubuntu-server:~/JavaHelloWorld$ javac Main.java
nagocoler@ubuntu-server:~/JavaHelloWorld$ ls
Main.class  Main.java
```

点击运行，成功得到结果：

```sh
/home/nagocoler/jdk-jdk8-b120/build/linux-x86_64-normal-server-slowdebug/jdk/bin/java Main
Hello World!

Process finished with exit code 0
```

我们还可以在 CLion 前端页面中进行断点调试，比如我们测试一个入口点 JavaMain，在`jdk/src/share/bin/java.c`中的 JavaMain 方法：

![image-20230306164549328](./img/AcdjJWy8QnxlTa4.webp)

点击右上角调试按钮，可以成功进行调试：

![image-20230306164602205](./img/tZzqg2GD3LSbn9o.webp)

至此，在 Ubuntu 系统上手动编译 OpenJDK8 完成。

---

## JVM 启动流程探究

前面我们完成了 JDK8 的编译，也了解了如何进行断点调试，现在我们就可以来研究一下 JVM 的启动流程了，首先我们要明确，虚拟机的启动入口位于`jdk/src/share/bin/java.c`的`JLI_Launch`函数，整个流程分为如下几个步骤：

1. 配置 JVM 装载环境
2. 解析虚拟机参数
3. 设置线程栈大小
4. 执行 JavaMain 方法

首先我们来看看`JLI_Launch`函数是如何定义的：

```c
int
JLI_Launch(int argc, char ** argv,              /* main argc, argc */
        int jargc, const char** jargv,          /* java args */
        int appclassc, const char** appclassv,  /* app classpath */
        const char* fullversion,                /* full version defined */
        const char* dotversion,                 /* dot version defined */
        const char* pname,                      /* program name */
        const char* lname,                      /* launcher name */
        jboolean javaargs,                      /* JAVA_ARGS */
        jboolean cpwildcard,                    /* classpath wildcard */
        jboolean javaw,                         /* windows-only javaw */
        jint     ergo_class                     /* ergnomics policy */
);
```

可以看到在入口点的参数有很多个，其中包括当前的完整版本名称、简短版本名称、运行参数、程序名称、启动器名称等。

首先会进行一些初始化操作以及 Debug 信息打印配置等：

```c
InitLauncher(javaw);
DumpState();
if (JLI_IsTraceLauncher()) {
    int i;
    printf("Command line args:\n");
    for (i = 0; i < argc ; i++) {
        printf("argv[%d] = %s\n", i, argv[i]);
    }
    AddOption("-Dsun.java.launcher.diag=true", NULL);
}
```

接着就是选择一个合适的 JRE 版本：

```c
/*
 * Make sure the specified version of the JRE is running.
 *
 * There are three things to note about the SelectVersion() routine:
 *  1) If the version running isn't correct, this routine doesn't
 *     return (either the correct version has been exec'd or an error
 *     was issued).
 *  2) Argc and Argv in this scope are *not* altered by this routine.
 *     It is the responsibility of subsequent code to ignore the
 *     arguments handled by this routine.
 *  3) As a side-effect, the variable "main_class" is guaranteed to
 *     be set (if it should ever be set).  This isn't exactly the
 *     poster child for structured programming, but it is a small
 *     price to pay for not processing a jar file operand twice.
 *     (Note: This side effect has been disabled.  See comment on
 *     bugid 5030265 below.)
 */
SelectVersion(argc, argv, &main_class);
```

接着是创建 JVM 执行环境，例如需要确定数据模型，是 32 位还是 64 位，以及 jvm 本身的一些配置在 jvm.cfg 文件中读取和解析：

```c
CreateExecutionEnvironment(&argc, &argv,
                               jrepath, sizeof(jrepath),
                               jvmpath, sizeof(jvmpath),
                               jvmcfg,  sizeof(jvmcfg));
```

此函数只在头文件中定义，具体的实现是根据不同平台而定的。接着会动态加载 jvm.so 这个共享库，并把 jvm.so 中的相关函数导出并且初始化，而启动 JVM 的函数也在其中：

```c
if (!LoadJavaVM(jvmpath, &ifn)) {
    return(6);
}
```

比如 mac 平台下的实现：

```c
jboolean
LoadJavaVM(const char *jvmpath, InvocationFunctions *ifn)
{
    Dl_info dlinfo;
    void *libjvm;

    JLI_TraceLauncher("JVM path is %s\n", jvmpath);

    libjvm = dlopen(jvmpath, RTLD_NOW + RTLD_GLOBAL);
    if (libjvm == NULL) {
        JLI_ReportErrorMessage(DLL_ERROR1, __LINE__);
        JLI_ReportErrorMessage(DLL_ERROR2, jvmpath, dlerror());
        return JNI_FALSE;
    }

    ifn->CreateJavaVM = (CreateJavaVM_t)
        dlsym(libjvm, "JNI_CreateJavaVM");
    if (ifn->CreateJavaVM == NULL) {
        JLI_ReportErrorMessage(DLL_ERROR2, jvmpath, dlerror());
        return JNI_FALSE;
    }

    ifn->GetDefaultJavaVMInitArgs = (GetDefaultJavaVMInitArgs_t)
        dlsym(libjvm, "JNI_GetDefaultJavaVMInitArgs");
    if (ifn->GetDefaultJavaVMInitArgs == NULL) {
        JLI_ReportErrorMessage(DLL_ERROR2, jvmpath, dlerror());
        return JNI_FALSE;
    }

    ifn->GetCreatedJavaVMs = (GetCreatedJavaVMs_t)
    dlsym(libjvm, "JNI_GetCreatedJavaVMs");
    if (ifn->GetCreatedJavaVMs == NULL) {
        JLI_ReportErrorMessage(DLL_ERROR2, jvmpath, dlerror());
        return JNI_FALSE;
    }

    return JNI_TRUE;
}
```

最后就是对 JVM 进行初始化了：

```c
return JVMInit(&ifn, threadStackSize, argc, argv, mode, what, ret);
```

这也是由平台决定的，比如 Mac 下的实现为：

```c
int
JVMInit(InvocationFunctions* ifn, jlong threadStackSize,
                 int argc, char **argv,
                 int mode, char *what, int ret) {
    if (sameThread) {
        //无需关心....
    } else {
       //正常情况下走这个
        return ContinueInNewThread(ifn, threadStackSize, argc, argv, mode, what, ret);
    }
}
```

可以看到最后进入了一个`ContinueInNewThread`函数（在刚刚的`java.c`中实现），这个函数会创建一个新的线程来执行：

```c
int
ContinueInNewThread(InvocationFunctions* ifn, jlong threadStackSize,
                    int argc, char **argv,
                    int mode, char *what, int ret)
{

    ...

      rslt = ContinueInNewThread0(JavaMain, threadStackSize, (void*)&args);
      /* If the caller has deemed there is an error we
       * simply return that, otherwise we return the value of
       * the callee
       */
      return (ret != 0) ? ret : rslt;
    }
}
```

接着进入了一个名为`ContinueInNewThread0`的函数，可以看到它将`JavaMain`函数传入作为参数，而此函数定义的第一个参数类型是一个函数指针：

```c
int
ContinueInNewThread0(int (JNICALL *continuation)(void *), jlong stack_size, void * args) {
    int rslt;
    pthread_t tid;
    pthread_attr_t attr;
    pthread_attr_init(&attr);
    pthread_attr_setdetachstate(&attr, PTHREAD_CREATE_JOINABLE);

    if (stack_size > 0) {
      pthread_attr_setstacksize(&attr, stack_size);
    }

    if (pthread_create(&tid, &attr, (void *(*)(void*))continuation, (void*)args) == 0) {
      void * tmp;
      pthread_join(tid, &tmp);
      rslt = (int)tmp;
    } else {
     /*
      * Continue execution in current thread if for some reason (e.g. out of
      * memory/LWP)  a new thread can't be created. This will likely fail
      * later in continuation as JNI_CreateJavaVM needs to create quite a
      * few new threads, anyway, just give it a try..
      */
      rslt = continuation(args);
    }

    pthread_attr_destroy(&attr);
    return rslt;
}
```

最后实际上是在新的线程中执行`JavaMain`函数，最后我们再来看看此函数里面做了什么事情：

```c
/* Initialize the virtual machine */
start = CounterGet();
if (!InitializeJVM(&vm, &env, &ifn)) {
    JLI_ReportErrorMessage(JVM_ERROR1);
    exit(1);
}
```

第一步初始化虚拟机，如果报错直接退出。接着就是加载主类（至于具体如何加载一个类，我们会放在后面进行讲解），因为主类是我们 Java 程序的入口点：

```c
/*
 * Get the application's main class.
 *
 * See bugid 5030265.  The Main-Class name has already been parsed
 * from the manifest, but not parsed properly for UTF-8 support.
 * Hence the code here ignores the value previously extracted and
 * uses the pre-existing code to reextract the value.  This is
 * possibly an end of release cycle expedient.  However, it has
 * also been discovered that passing some character sets through
 * the environment has "strange" behavior on some variants of
 * Windows.  Hence, maybe the manifest parsing code local to the
 * launcher should never be enhanced.
 *
 * Hence, future work should either:
 *     1)   Correct the local parsing code and verify that the
 *          Main-Class attribute gets properly passed through
 *          all environments,
 *     2)   Remove the vestages of maintaining main_class through
 *          the environment (and remove these comments).
 *
 * This method also correctly handles launching existing JavaFX
 * applications that may or may not have a Main-Class manifest entry.
 */
mainClass = LoadMainClass(env, mode, what);
```

某些没有主方法的 Java 程序比如 JavaFX 应用，会获取 ApplicationMainClass：

```c
/*
 * In some cases when launching an application that needs a helper, e.g., a
 * JavaFX application with no main method, the mainClass will not be the
 * applications own main class but rather a helper class. To keep things
 * consistent in the UI we need to track and report the application main class.
 */
appClass = GetApplicationClass(env);
```

初始化完成：

```c
/*
 * PostJVMInit uses the class name as the application name for GUI purposes,
 * for example, on OSX this sets the application name in the menu bar for
 * both SWT and JavaFX. So we'll pass the actual application class here
 * instead of mainClass as that may be a launcher or helper class instead
 * of the application class.
 */
PostJVMInit(env, appClass, vm);
```

接着就是获取主类中的主方法：

```java
/*
 * The LoadMainClass not only loads the main class, it will also ensure
 * that the main method's signature is correct, therefore further checking
 * is not required. The main method is invoked here so that extraneous java
 * stacks are not in the application stack trace.
 */
mainID = (*env)->GetStaticMethodID(env, mainClass, "main",
                                   "([Ljava/lang/String;)V");
```

没错，在字节码中`void main(String[] args)`表示为`([Ljava/lang/String;)V`我们之后会详细介绍。接着就是调用主方法了：

```c
/* Invoke main method. */
(*env)->CallStaticVoidMethod(env, mainClass, mainID, mainArgs);
```

调用后，我们的 Java 程序就开飞速运行起来，直到走到主方法的最后一行返回：

```c
/*
 * The launcher's exit code (in the absence of calls to
 * System.exit) will be non-zero if main threw an exception.
 */
ret = (*env)->ExceptionOccurred(env) == NULL ? 0 : 1;
LEAVE();
```

至此，一个 Java 程序的运行流程结束，在最后 LEAVE 函数中会销毁 JVM。我们可以进行断点调试来查看是否和我们推出的结论一致：

![image-20230306164622940](./img/DgkhOvWYfAiB1yq.webp)

还是以我们之前编写的测试类进行，首先来到调用之前，我们看到主方法执行之前，控制台没有输出任何内容，接着我们执行此函数，再来观察控制台的变化：

![image-20230306164639620](./img/X3F2Hjvplnm17UJ.webp)

可以看到，主方法执行完成之后，控制台也成功输出了 Hello World！

继续下一步，整个 Java 程序执行完成，得到退出状态码`0`：

![image-20230306164706976](./img/SoP1fVekqM4R8sd.webp)

成功验证，最后总结一下整个执行过程：

![image-20230306164716949](./img/c4IKjgrhtw3ak9p.webp)

---

## JNI 调用本地方法

Java 还有一个 JNI 机制，它的全称：Java Native Interface，即 Java 本地接口。它允许在 Java 虚拟机内运行的 Java 代码与其他编程语言（如 C/C++和汇编语言）编写的程序和库进行交互（在 Android 开发中用得比较多）比如我们现在想要让 C 语言程序帮助我们的 Java 程序实现 a+b 的运算，首先我们需要创建一个本地方法：

```java
public class Main {
    public static void main(String[] args) {
        System.out.println(sum(1, 2));
    }

    //本地方法使用native关键字标记，无需任何实现，交给C语言实现
    public static native int sum(int a, int b);
}
```

创建好后，接着点击构建按钮，会出现一个 out 文件夹，也就是生成的 class 文件在其中，接着我们直接生成对应的 C 头文件：

```sh
javah -classpath out/production/SimpleHelloWorld -d ./jni com.test.Main
```

> [!WARNING]
>
> 新版 JDK 已经用 `javac -h` 来代替 `javah`
>
> ```sh
> javac -h ./jni Main.java
> ```
>
> 一步到位

生成的头文件位于 jni 文件夹下：

```c
/* DO NOT EDIT THIS FILE - it is machine generated */
#include <jni.h>
/* Header for class com_test_Main */

#ifndef _Included_com_test_Main
#define _Included_com_test_Main
#ifdef __cplusplus
extern "C" {
#endif
/*
 * Class:     com_test_Main
 * Method:    sum
 * Signature: (II)V
 */
JNIEXPORT void JNICALL Java_com_test_Main_sum
  (JNIEnv *, jclass, jint, jint);

#ifdef __cplusplus
}
#endif
#endif
```

接着我们在 CLion 中新建一个 C++项目，并引入刚刚生成的头文件，并导入 jni 相关头文件（在 JDK 文件夹中）首先修改 CMake 文件：

```cmake
cmake_minimum_required(VERSION 3.21)
project(JNITest)

include_directories(/Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home/include)
include_directories(/Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home/include/darwin)
set(CMAKE_CXX_STANDARD 14)

add_executable(JNITest com_test_Main.cpp com_test_Main.h)
```

接着就可以编写实现了，首先认识一下引用类型对照表：

![image-20230306164733817](./img/QS9FxGhdsMRBCcm.webp)

所以我们这里直接返回 a+b 即可：

```cpp
#include "com_test_Main.h"

JNIEXPORT jint JNICALL Java_com_test_Main_sum
        (JNIEnv * env, jclass clazz, jint a, jint b){
    return a + b;
}
```

接着我们就可以将 cpp 编译为动态链接库，在 MacOS 下会生成`.dylib`文件，Windows 下会生成`.dll`文件，我们这里就只以 MacOS 为例，命令有点长，因为还需要包含 JDK 目录下的头文件：

```sh
gcc com_test_Main.cpp -I /Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home/include -I /Library/Java/JavaVirtualMachines/zulu-8.jdk/Contents/Home/include/darwin -fPIC -shared -o test.dylib -lstdc++
```

编译完成后，得到`test.dylib`文件，这就是动态链接库了。

最后我们再将其放到桌面，然后在 Java 程序中加载：

```java
public class Main {
    static {
        System.load("/Users/nagocoler/Desktop/test.dylib");
    }

    public static void main(String[] args) {
        System.out.println(sum(1, 2));
    }

    public static native int sum(int a, int b);
}
```

> [!NOTE]
>
> 如果动态链接库在 class 的类路径下（`java.library.path` 的值） ，可以使用 `System.loadLibrary("test");`
>
> 可以通过如下方法来获得该变量的值：`System.getProperty(“java.library.path”);`

运行，成功得到结果：

![image-20230306164747347](./img/AdKbxHjlGwDfUY2.webp)

通过了解 JVM 的一些基础知识，我们心目中大致有了一个 JVM 的模型，在下一章，我们将继续深入学习 JVM 的内存管理机制和垃圾收集器机制，以及一些实用工具。
