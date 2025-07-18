---
# 当前页面内容标题
title: Java 日志框架
# 当前页面图标
icon: log
# 分类
category:
  - javaee
  - log
# 标签
tag:
  - 日志
  - log4j
  - JUL
  - logback
  - log4j2
  - JCL
  - slf4j
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
> 课程视频教程链接：<https://www.bilibili.com/video/BV1434y1o73n>

## 第一章 日志的概念

### 一、概述

日志文件是用于记录系统操作事件的文件集合，可分为事件日志和消息日志。具有处理历史数据、诊断问题的追踪以及理解系统的活动等重要作用。

在计算机中，日志文件是记录在操作系统或其他软件运行中发生的事件或在通信软件的不同用户之间的消息的文件。记录是保持日志的行为。在最简单的情况下，消息被写入单个日志文件。

### 二、日志的作用

- 调试
  - 在 Java 项目调试时，查看栈信息可以方便地知道当前程序的运行状态，输出的日志便于记录程序在之前的运行结果。如果你大量使用 System.out 或者 System.err，这是一种最方便最有效的方法，但显得不够专业。
- 错误定位
  - 不要以为项目能正确跑起来就可以高枕无忧，项目在运行一段时候后，可能由于数据问题，网络问题，内存问题等出现异常。这时日志可以帮助开发或者运维人员快速定位错误位置，提出解决方案。
- 数据分析
  - 大数据的兴起，使得大量的日志分析成为可能，ELK 也让日志分析门槛降低了很多。日志中蕴含了大量的用户数据，包括点击行为，兴趣偏好等，用户画像对于公司下一步的战略方向有一定指引作用。

### 三、接触过的日志

最简单的日志输出方式，我们每天都在使用：

```java
System.out.println("这个数的结果是："+ num);
```

以及错误日志：

```java
System.err.println("此处发生了异常");
```

此类代码在程序的执行过程中没有什么实质的作用，但是却能打印一些中间变量，辅助我们调试和错误的排查。

日志系统我们也见过：

在 tomcat 中

![img](./img/1713933035664-4083d199-d61a-460f-91f4-a225d6c02982.png)

当我们的程序无法启动或者运行过程中产生问题，会有所记录，比如我的 catalina\.log 中查看，发现确实有错误信息，这能帮我们迅速定位：

![img](./img/1713933035744-7756a0be-cd2c-4745-845f-8cab038d4858.png)

而我们的`System.err`只能做到控制台打印日志，所以我们需要更强大日志框架来处理：

### 四、主流日志框架

- 日志实现（具体干活的）：JUL（java util logging）、logback、log4j、log4j2
- 日志门面（指定规则的）：JCL（Jakarta Commons Logging）、slf4j（ Simple Logging Facade for Java）

## 第二章 JUL 日志框架

JUL 全称 `Java util Logging` 是 java 原生的日志框架，使用时不需要另外引用第三方类库，相对其他日志框 架使用方便，学习简单，能够在小型应用中灵活使用。

在 JUL 中有以下组件，我们先做了解，慢慢学习：

- **Loggers**：被称为记录器，应用程序通过获取 Logger 对象，调用其 API 来来发布日志信息。Logger 通常时应用程序访问日志系统的入口程序。
- **Appenders**：也被称为 Handlers，每个 Logger 都会关联一组 Handlers，Logger 会将日志交给关联 Handlers 处理，由 Handlers 负责将日志做记录。Handlers 在此是一个抽象，其具体的实现决定了 日志记录的位置可以是控制台、文件、网络上的其他日志服务或操作系统日志等。
- **Layouts**：也被称为 Formatters，它负责对日志事件中的数据进行转换和格式化。Layouts 决定了 数据在一条日志记录中的最终形式。
- **Level**：每条日志消息都有一个关联的日志级别。该级别粗略指导了日志消息的重要性和紧迫，我 可以将 Level 和 Loggers，Appenders 做关联以便于我们过滤消息。
- **Filters**：过滤器，根据需要定制哪些信息会被记录，哪些信息会被放过。

**总结一下就是：**

用户使用 Logger 来进行日志记录，Logger 持有若干个 Handler，日志的输出操作是由 Handler 完成的。 在 Handler 在输出日志前，会经过 Filter 的过滤，判断哪些日志级别过滤放行哪些拦截，Handler 会将日志内容输出到指定位置（日志文件、控制台等）。Handler 在输出日志时会使用 Layout，将输出内容进行排版。

### 一、入门案例

```java
public static void main(String[] args) {
    Logger logger = Logger.getLogger("myLogger");
    logger.info("信息");
    logger.warning("警告信息");
    logger.severe("严重信息");
}
```

![img](./img/1713933035858-790c0f27-5296-4779-9dfc-7cd3f2f27102.png)

### 二、日志的级别

jul 中定义的日志级别，从上述例子中我们也看到使用 info 和 warning 打印出的日志有不同的前缀，通过给日志设置不同的级别可以清晰的从日志中区分出哪些是基本信息，哪些是调试信息，哪些是严重的异常。

（1）`java.util.logging.Level` 中定义了日志的级别：

1. **SEVERE**（最高值）
2. **WARNING**
3. **INFO** （默认级别）
4. **CONFIG**
5. **FINE**
6. **FINER**
7. **FINEST**（最低值）

再例如：我们查看 tomcat 的日志，能明显的看到不同级别的日志，其实 tomcat 默认使用的就是 JUL：

![img](./img/1713933035947-35cf94fd-e51a-4f5a-9413-5a8f2077d6e4.png)

还有两个特殊的级别：

- OFF，可用来关闭日志记录。
- ALL，启用所有消息的日志记录。

虽然我们测试了 7 个日志级别，

```java
@Test
public void testLogger() {
    Logger logger = Logger.getLogger(LoggerTest.class.getName());
    logger.severe("severe");
    logger.warning("warning");
    logger.info("info");
    logger.config("config");
    logger.fine("fine");
    logger.finer("finer");
    logger.finest("finest");
}
```

我们发现能够打印的只有三行，这是为什么呢？

![img](./img/1713933036032-f1c20447-8600-4a77-b807-d19d18966de8.png)

我们找一下这个文件，下图是 jdk11 的日志配置文件：

![img](./img/1713933036129-6a0a9e2a-ef2c-4afb-b759-0d60ffd5da78.png)

或者在 jdk1.8 中：

![img](./img/1713933036201-a97b4d32-2e67-4927-8a07-057662752aff.png)

![img](./img/1713933036290-a177fbfd-5efb-466d-9b4f-cc60a20744a1.png)

就可以看到系统默认在控制台打印的日志级别了，系统配置我们暂且不动，一会我们独立创建配置文件完成修改。

但是我们可以简单的看看这个日志配置了哪些内容：

```properties
.level= INFO

############################################################
# Handler specific properties.
# Describes specific configuration info for Handlers.
############################################################

# default file output is in user's home directory.
java.util.logging.FileHandler.pattern = %h/java%u.log
java.util.logging.FileHandler.limit = 50000
java.util.logging.FileHandler.count = 1
# Default number of locks FileHandler can obtain synchronously.
# This specifies maximum number of attempts to obtain lock file by FileHandler
# implemented by incrementing the unique field %u as per FileHandler API documentation.
java.util.logging.FileHandler.maxLocks = 100
java.util.logging.FileHandler.formatter = java.util.logging.XMLFormatter

# Limit the message that are printed on the console to INFO and above.
java.util.logging.ConsoleHandler.level = INFO
java.util.logging.ConsoleHandler.formatter = java.util.logging.SimpleFormatter
```

在日志中我们发现了，貌似可以给这个日志对象添加各种 handler 就是处理器，比如 ConsoleHandler 专门处理控制台日志，FileHandler 貌似可以处理文件，同时我们确实发现了他有这么一个方法：

![img](./img/1713933036360-59a6e363-79f9-4933-9af5-6692524a104e.png)

### 三、日志配置

```java
@Test
public void testLogConfig() throws Exception {
    // 1.创建日志记录器对象
    Logger logger = Logger.getLogger("com.ydlclass.log.JULTest");
    // 一、自定义日志级别
    // a.关闭系统默认配置
    logger.setUseParentHandlers(false);
    // b.创建handler对象
    ConsoleHandler consoleHandler = new ConsoleHandler();
    // c.创建formatter对象
    SimpleFormatter simpleFormatter = new SimpleFormatter();
    // d.进行关联
    consoleHandler.setFormatter(simpleFormatter);
    logger.addHandler(consoleHandler);
    // e.设置日志级别
    logger.setLevel(Level.ALL);
    consoleHandler.setLevel(Level.ALL);
    // 二、输出到日志文件
    FileHandler fileHandler = new FileHandler("d:/logs/jul.log");
    fileHandler.setFormatter(simpleFormatter);
    logger.addHandler(fileHandler);
    // 2.日志记录输出
    logger.severe("severe");
    logger.warning("warning");
    logger.info("info");
    logger.config("config");
    logger.fine("fine");
    logger.finer("finer");
    logger.finest("finest");
}
```

再次查看结果：

```bash
10月 21, 2021 11:50:01 上午 com.ydlclass.entity.LoggerTest testConfig
严重: severe
10月 21, 2021 11:50:01 上午 com.ydlclass.entity.LoggerTest testConfig
警告: warning
10月 21, 2021 11:50:01 上午 com.ydlclass.entity.LoggerTest testConfig
信息: info
10月 21, 2021 11:50:01 上午 com.ydlclass.entity.LoggerTest testConfig
配置: config
10月 21, 2021 11:50:01 上午 com.ydlclass.entity.LoggerTest testConfig
详细: fine
10月 21, 2021 11:50:01 上午 com.ydlclass.entity.LoggerTest testConfig
较详细: finer
10月 21, 2021 11:50:01 上午 com.ydlclass.entity.LoggerTest testConfig
非常详细: finest

Process finished with exit code 0
```

文件中也输出了正确的结果：

![img](./img/1713933036431-375efbd3-8292-4439-8a81-af9319558d0a.png)

### 四、 Logger 之间的父子关系

JUL 中 Logger 之间存在父子关系，这种父子关系通过树状结构存储，JUL 在初始化时会创建一个顶层 RootLogger 作为所有 Logger 父 Logger，存储上作为树状结构的根节点。并父子关系通过名称来关联。默认子 Logger 会继承父 Logger 的属性。

![img](./img/1713933036499-883da45b-5d58-4d20-b37e-9c3e8a83f80f.png)

所有的 logger 实例都是由 LoggerManager 统一管理，不妨我们点进 getLogger 方法：

```java
private static Logger demandLogger(String name, String resourceBundleName, Class<?> caller) {
    LogManager manager = LogManager.getLogManager();
    if (!SystemLoggerHelper.disableCallerCheck) {
        if (isSystem(caller.getModule())) {
            return manager.demandSystemLogger(name, resourceBundleName, caller);
        }
    }
    return manager.demandLogger(name, resourceBundleName, caller);
    // ends up calling new Logger(name, resourceBundleName, caller)
    // iff the logger doesn't exist already
}
```

我们可以看到 LogManager 是单例的：

```java
public static LogManager getLogManager() {
    if (manager != null) {
        manager.ensureLogManagerInitialized();
    }
    return manager;
}
@Test
public void testLogParent() throws Exception {
    Logger logger1 = Logger.getLogger("com.ydlclass.service");
    Logger logger2 = Logger.getLogger("com.ydlclass");
    System.out.println("logger1 = " + logger1);
    System.out.println("logger1.getParent() = " + logger1.getParent());
    System.out.println("logger2 = " + logger2);
    System.out.println("logger2.getParent() = " + logger2.getParent());
    System.out.println(logger1.getParent() == logger2);
}

结果：
logger1 = java.util.logging.Logger@2b4bac49
logger1.getParent() = java.util.logging.Logger@fd07cbb
logger2 = java.util.logging.Logger@fd07cbb
logger2.getParent() = java.util.logging.LogManager$RootLogger@3571b748
true
@Test
public void testLogParent() throws Exception {
    Logger logger1 = Logger.getLogger("com.ydlclass.service");
    Logger logger2 = Logger.getLogger("com.ydlclass");
    // 一、对logger2进行独立的配置
    // 1.关闭系统默认配置
    logger2.setUseParentHandlers(false);
    // 2.创建handler对象
    ConsoleHandler consoleHandler = new ConsoleHandler();
    // 3.创建formatter对象
    SimpleFormatter simpleFormatter = new SimpleFormatter();
    // 4.进行关联
    consoleHandler.setFormatter(simpleFormatter);
    logger2.addHandler(consoleHandler);
    // 5.设置日志级别
    logger2.setLevel(Level.ALL);
    consoleHandler.setLevel(Level.ALL);
    // 测试logger1是否被logger2影响
    logger1.severe("severe");
    logger1.warning("warning");
    logger1.info("info");
    logger1.config("config");
    logger1.fine("fine");
    logger1.finer("finer");
    logger1.finest("finest");
}


 10月 21, 2021 12:45:15 下午 com.ydlclass.entity.LoggerTest testLogParent
严重: severe
10月 21, 2021 12:45:15 下午 com.ydlclass.entity.LoggerTest testLogParent
警告: warning
10月 21, 2021 12:45:15 下午 com.ydlclass.entity.LoggerTest testLogParent
信息: info
10月 21, 2021 12:45:15 下午 com.ydlclass.entity.LoggerTest testLogParent
配置: config
10月 21, 2021 12:45:15 下午 com.ydlclass.entity.LoggerTest testLogParent
详细: fine
10月 21, 2021 12:45:15 下午 com.ydlclass.entity.LoggerTest testLogParent
较详细: finer
10月 21, 2021 12:45:15 下午 com.ydlclass.entity.LoggerTest testLogParent
非常详细: finest

Process finished with exit code 0
```

### 五、日志格式化

我们可以独立的实现日志格式化的 Formatter，而不使用 SimpleFormatter，我们可以做如下处理，最后返回的结果我们可以随意拼写：

```java
Formatter myFormatter = new Formatter(){
    @Override
    public String format(LogRecord record) {
        return record.getLoggerName()+"." +record.getSourceMethodName() + " " + LocalDateTime.ofInstant(record.getInstant(), ZoneId.systemDefault())+"\r\n"
            +record.getLevel()+": " +record.getMessage() + "\r\n";
    }
};
```

结果为：

![img](./img/1713933036586-a10aa545-06ff-4589-b1a4-06232a6ad4b1.png)

当然我们参考一下 SimpleFormatter 的该方法的实现：

```java
// format string for printing the log record
static String getLoggingProperty(String name) {
    return LogManager.getLogManager().getProperty(name);
}

private final String format =
    SurrogateLogger.getSimpleFormat(SimpleFormatter::getLoggingProperty);

ZonedDateTime zdt = ZonedDateTime.ofInstant(
    record.getInstant(), ZoneId.systemDefault());
return String.format(format,
                     zdt,
                     source,
                     record.getLoggerName(),
                     record.getLevel().getLocalizedLevelName(),
                     message,
                     throwable);
```

这个写法貌似比我们的写法高级一点，所以我们必须好好学一下 String 的 format 方法了。

#### 1、String 的 format 方法

String 类的 `format()` 方法用于创建格式化的字符串以及连接多个字符串对象。

`format()` 方法有两种重载形式：

```java
public static String format(String format, Object... args) {
    return new Formatter().format(format, args).toString();
}

public static String format(Locale l, String format, Object... args) {
    return new Formatter(l).format(format, args).toString();
}
```

在这个方法中我们可以定义字符串模板，然后使用类似填空的方式将模板格式化成我们想要的结果字符串：

```java
String java = String.format("hello %s", "world");
```

得到的结果就是 hello world，我们可以把第一个参数当做模板， %s 当做填空题，后边的可变参数当做答案。

#### 2、常用的转换符

当然不同数据类型需要不同转换符完成字符串的转换，以下是不同类型的转化符列表：

| 转换符 | 详细说明                                      | 示例             |
| ------ | --------------------------------------------- | ---------------- |
| **%s** | **字符串类型**                                | **“喜欢请收藏”** |
| %c     | 字符类型                                      | ‘m’              |
| %b     | 布尔类型                                      | true             |
| **%d** | **整数类型（十进制）**                        | **88**           |
| %x     | 整数类型（十六进制）                          | FF               |
| %o     | 整数类型（八进制）                            | 77               |
| **%f** | **浮点类型**                                  | **8.888**        |
| %a     | 十六进制浮点类型                              | FF.35AE          |
| %e     | 指数类型                                      | 9.38e+5          |
| **%n** | 换行符                                        |                  |
| %tx    | 日期与时间类型（x 代表不同的日期与时间转换符) | 后边详细说       |

小例子：

```java
System.out.printf("过年了，%s今年%d岁了，今天收了%f元的压岁钱!",
                "小明",5,88.88);

结果：
    过年了，小明今年5岁了，今天收了88.880000元的压岁钱!
```

这要比拼写字符串简单多了。

#### 3、特殊符号

接下来我们看几个特殊字符的常用搭配，可以实现一些高级功能：

| 标志 | 说明                                                     | 示例             | 结果         |
| ---- | -------------------------------------------------------- | ---------------- | ------------ |
| +    | 为正数或者负数添加符号，因为一般**正**整数不会主动加符号 | (“%+d”,15)       | +15          |
| 0    | 数字前面补 0，用于对齐                                   | (“%04d”, 99)     | 0099         |
| 空格 | 在整数之前添加指定数量的空格                             | (“%4d”, 99)      | 99           |
| ,    | 以“,”对数字分组(常用显示金额)                            | (“%,f”, 9999.99) | 9,999.990000 |
| (    | 使用括号包含负数                                         | (“%(f”, -99.99)  | (99.990000)  |

```java
System.out.printf("过年了，%s今年%03d岁了，今天收了%,f元的压岁钱!",
                "小明",5,8888.88);
// 结果：
//      过年了，小明今年005岁了，今天收了8,888.880000元的压岁钱!
```

默认情况下，我们的可变参数是安装顺序依次替换，但是我想重复利用可变参数那该怎么处理呢？

我们可以采用 在转换符中加数字$完成匹配：

```java
System.out.printf("%1$s %1$s %1$s","小明");
```

其中 `1$` 就代表第一个参数，那么 `2$` 就代表第二个参数了：

```text
小明 小明 小明
```

#### 4、日期处理

第一个例子中有说到 `%tx` 代表日期转换符 我也顺便列举下日期转换符

| 标志 | 说明                         | 示例                                  |
| ---- | ---------------------------- | ------------------------------------- |
| c    | 包括全部日期和时间信息       | 周四 10 月 21 14:52:10 GMT+08:00 2021 |
| F    | “年-月-日”格式               | 2021-10-21                            |
| D    | “月/日/年”格式               | 10/21/21                              |
| r    | “HH:MM:SS PM”格式（12 时制） | 02:53:20 下午                         |
| T    | “HH:MM:SS”格式（24 时制）    | 14:53:39                              |
| R    | “HH:MM”格式（24 时制）       | 14:53                                 |
| b    | 月份本地化                   | 10 月                                 |
| y    | 两位的年                     | 21                                    |
| Y    | 四位的年                     | 2021                                  |
| m    | 月                           | 10                                    |
| d    | 日                           | 21                                    |
| H    | 24 小时制的时                | 14                                    |
| l    | 12 小时制的时                | 2                                     |
| M    | 分                           | 57                                    |
| S    | 秒                           | 46                                    |
| s    | 秒为单位的时间戳             | 1634799527                            |
| p    | 上午还是下午                 | 下午                                  |

我们可以使用以下三个类去进行格式化，其中可能存在不支持的情况，比如 LocalDateTime 不支持 c：

```java
System.out.printf("%tc",new Date());
System.out.printf("%tc",ZonedDateTime.now());
System.out.printf("%tF",LocalDateTime.now());
```

此时我们使用 debug 查看，默认情况下的 fomat，我们不妨来读一读：

![img](./img/1713933036661-1b0bd8e7-d6ca-406a-817b-2b75f73890ee.png)

```bash
10月 21, 2021 2:23:42 下午 com.ydlclass.entity.LoggerTest testLogParent
警告: warning
```

### 六、配置文件

我们不妨看看一个文件处理器的源码是怎么读配置项的：

```java
private void configure() {
        LogManager manager = LogManager.getLogManager();

        String cname = getClass().getName();

        pattern = manager.getStringProperty(cname + ".pattern", "%h/java%u.log");
        limit = manager.getLongProperty(cname + ".limit", 0);
        if (limit < 0) {
            limit = 0;
        }
        count = manager.getIntProperty(cname + ".count", 1);
        if (count <= 0) {
            count = 1;
        }
        append = manager.getBooleanProperty(cname + ".append", false);
        setLevel(manager.getLevelProperty(cname + ".level", Level.ALL));
        setFilter(manager.getFilterProperty(cname + ".filter", null));
        setFormatter(manager.getFormatterProperty(cname + ".formatter", new XMLFormatter()));
        // Initialize maxLocks from the logging.properties file.
        // If invalid/no property is provided 100 will be used as a default value.
        maxLocks = manager.getIntProperty(cname + ".maxLocks", MAX_LOCKS);
        if(maxLocks <= 0) {
            maxLocks = MAX_LOCKS;
        }
        try {
            setEncoding(manager.getStringProperty(cname +".encoding", null));
        } catch (Exception ex) {
            try {
                setEncoding(null);
            } catch (Exception ex2) {
                // doing a setEncoding with null should always work.
                // assert false;
            }
        }
    }
```

可以从以下源码中看到配置项：

```java
public class FileHandler extends StreamHandler {
    private MeteredStream meter;
    private boolean append;
    // 限制文件大小
    private long limit;       // zero => no limit.
    // 控制日志文件的数量
    private int count;
    // 日志文件的格式化方式
    private String pattern;
    private String lockFileName;
    private FileChannel lockFileChannel;
    private File files[];
    private static final int MAX_LOCKS = 100;
    // 可以理解为同时可以有多少个线程打开文件，源码中有介绍
    private int maxLocks = MAX_LOCKS;
    private static final Set<String> locks = new HashSet<>();
}
```

我们已经知道系统默认的配置文件的位置，那我们能不能自定义呢？当然可以了，我们从 jdk 中赋值一个配置文件过来：

```properties
.level= INFO

# default file output is in user's home directory.
java.util.logging.FileHandler.pattern = %h/java%u.log
java.util.logging.FileHandler.limit = 50000
java.util.logging.FileHandler.count = 1

# Default number of locks FileHandler can obtain synchronously.
# This specifies maximum number of attempts to obtain lock file by FileHandler
# implemented by incrementing the unique field %u as per FileHandler API documentation.
java.util.logging.FileHandler.maxLocks = 100
java.util.logging.FileHandler.formatter = java.util.logging.XMLFormatter

# Limit the message that are printed on the console to INFO and above.
java.util.logging.ConsoleHandler.level = INFO
java.util.logging.ConsoleHandler.formatter = java.util.logging.SimpleFormatter

# java.util.logging.SimpleFormatter.format=%4$s: %5$s [%1$tc]%n
pattern = manager.getStringProperty(cname + ".pattern", "%h/java%u.log");
static File generate(String pat, int count, int generation, int unique)
            throws IOException
{
    Path path = Paths.get(pat);
    Path result = null;
    boolean sawg = false;
    boolean sawu = false;
    StringBuilder word = new StringBuilder();
    Path prev = null;
    for (Path elem : path) {
        if (prev != null) {
            prev = prev.resolveSibling(word.toString());
            result = result == null ? prev : result.resolve(prev);
        }
        String pattern = elem.toString();
        int ix = 0;
        word.setLength(0);
        while (ix < pattern.length()) {
            char ch = pattern.charAt(ix);
            ix++;
            char ch2 = 0;
            if (ix < pattern.length()) {
                ch2 = Character.toLowerCase(pattern.charAt(ix));
            }
            if (ch == '%') {
                if (ch2 == 't') {
                    String tmpDir = System.getProperty("java.io.tmpdir");
                    if (tmpDir == null) {
                        tmpDir = System.getProperty("user.home");
                    }
                    result = Paths.get(tmpDir);
                    ix++;
                    word.setLength(0);
                    continue;
                } else if (ch2 == 'h') {
                    result = Paths.get(System.getProperty("user.home"));
                    if (jdk.internal.misc.VM.isSetUID()) {
                        // Ok, we are in a set UID program.  For safety's sake
                        // we disallow attempts to open files relative to %h.
                        throw new IOException("can't use %h in set UID program");
                    }
                    ix++;
                    word.setLength(0);
                    continue;
                } else if (ch2 == 'g') {
                    word = word.append(generation);
                    sawg = true;
                    ix++;
                    continue;
                } else if (ch2 == 'u') {
                    word = word.append(unique);
                    sawu = true;
                    ix++;
                    continue;
                } else if (ch2 == '%') {
                    word = word.append('%');
                    ix++;
                    continue;
                }
            }
            word = word.append(ch);
        }
        prev = elem;
    }

    if (count > 1 && !sawg) {
        word = word.append('.').append(generation);
    }
    if (unique > 0 && !sawu) {
        word = word.append('.').append(unique);
    }
    if (word.length() > 0) {
        String n = word.toString();
        Path p = prev == null ? Paths.get(n) : prev.resolveSibling(n);
        result = result == null ? p : result.resolve(p);
    } else if (result == null) {
        result = Paths.get("");
    }

    if (path.getRoot() == null) {
        return result.toFile();
    } else {
        return path.getRoot().resolve(result).toFile();
    }
}
System.out.println(System.getProperty("user.home") );
```

C:\Users\zn\java0.log

我们将拷贝的文件稍作修改：

```properties
.level= INFO

# default file output is in user's home directory.
java.util.logging.FileHandler.pattern = D:/log/java%u.log
java.util.logging.FileHandler.limit = 50000
java.util.logging.FileHandler.count = 1
java.util.logging.FileHandler.maxLocks = 100
java.util.logging.FileHandler.formatter = java.util.logging.XMLFormatter

# Limit the message that are printed on the console to INFO and above.
java.util.logging.ConsoleHandler.level = INFO
java.util.logging.ConsoleHandler.formatter = java.util.logging.SimpleFormatter

# java.util.logging.SimpleFormatter.format=%4$s: %5$s [%1$tc]%n
@Test
public void testProperties() throws Exception {
    // 读取自定义配置文件
    InputStream in =
        JULTest.class.getClassLoader().getResourceAsStream("logging.properties");
    // 获取日志管理器对象
    LogManager logManager = LogManager.getLogManager();
    // 通过日志管理器加载配置文件
    logManager.readConfiguration(in);
    Logger logger = Logger.getLogger("com.ydlclass.log.JULTest");
    logger.severe("severe");
    logger.warning("warning");
    logger.info("info");
    logger.config("config");
    logger.fine("fine");
    logger.finer("finer");
    logger.finest("finest");
}
```

配置文件：

```properties
handlers= java.util.logging.ConsoleHandler,java.util.logging.FileHandler
.level= INFO

java.util.logging.FileHandler.pattern = D:/logs/java%u.log
java.util.logging.FileHandler.limit = 50000
java.util.logging.FileHandler.count = 1
java.util.logging.FileHandler.maxLocks = 100
java.util.logging.FileHandler.formatter = java.util.logging.XMLFormatter

# Limit the message that are printed on the console to INFO and above.
java.util.logging.ConsoleHandler.level = INFO
java.util.logging.ConsoleHandler.formatter = java.util.logging.SimpleFormatter
```

![img](./img/1713933036775-ac9a81ad-deba-493d-9f43-01527de550a9.png)

文件中也出现了：

![img](./img/1713933036848-a2dbe98a-bd22-43e7-965b-26662e4bbc51.png)

打开日志发现是 xml，因为这里用的就是 XMLFormatter：

![img](./img/1713933036925-47c74dd0-2d41-4f54-9a0e-30f952d052e8.png)

上边我们配置了两个 handler 给根 Logger，我们还可以给其他的 Logger 做独立的配置：

```properties
handlers = java.util.logging.ConsoleHandler
.level = INFO
# 对这个logger独立配置
com.ydlclass.handlers = java.util.logging.FileHandler
com.ydlclass.level = ALL
com.ydlclass.useParentHandlers = false

# 修改了名字
java.util.logging.FileHandler.pattern = D:/logs/ydl-java%u.log
java.util.logging.FileHandler.limit = 50000
java.util.logging.FileHandler.count = 1
java.util.logging.FileHandler.maxLocks = 100
java.util.logging.FileHandler.formatter = java.util.logging.SimpleFormatter
# 文件使用追加方式
java.util.logging.FileHandler.append = true

# Limit the message that are printed on the console to INFO and above.
java.util.logging.ConsoleHandler.level = INFO
java.util.logging.ConsoleHandler.formatter = java.util.logging.SimpleFormatter

# 修改日志格式
java.util.logging.SimpleFormatter.format=%4$s: %5$s [%1$tc]%n
```

执行发现控制台没有内容，文件中有了，说明没有问题 OK 了：

![img](./img/1713933036994-6dfb3495-c35e-4552-967e-bcfc375a5520.png)

日志出现以下内容：

![img](./img/1713933037062-5099b05b-c3a8-4ad8-9e31-9af79684d844.png)

## 第三章 LOG4J 日志框架

Log4j 是 Apache 下的一款开源的日志框架。 官方网站： <http://logging.apache.org/log4j/1.2/>，这是一款比较老的日志框架，目前新的 log4j2 做了很大的改动，任然有一些项目在使用 log4j。

### 一、入门案例

1. 建立 maven 工程
2. 添加依赖

```xml
<dependencies>
    <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.17</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.13.2</version>
    </dependency>
</dependencies>

<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>${maven.compiler.source}</source>
                <target>${maven.compiler.target}</target>
                <encoding>UTF-8</encoding>
            </configuration>
        </plugin>
    </plugins>
</build>
```

1. java 代码

```java
@Test
public void testLogger() {
    Logger logger = Logger.getLogger(Log4jTest.class);
    // 日志记录输出
    logger.info("hello log4j");
    // 日志级别
    logger.fatal("fatal"); // 严重错误，一般会造成系统崩溃和终止运行
    logger.error("error"); // 错误信息，但不会影响系统运行
    logger.warn("warn"); // 警告信息，可能会发生问题
    logger.info("info"); // 程序运行信息，数据库的连接、网络、IO操作等
    logger.debug("debug"); // 调试信息，一般在开发阶段使用，记录程序的变量、参数等
    logger.trace("trace"); // 追踪信息，记录程序的所有流程信息
}
```

发现会有一些警告，JUL 可以直接在控制台输出是因为他有默认的配置文件，而这个独立的第三方的日志框架却没有配置文件：

```bash
log4j:WARN No appenders could be found for logger (com.ydlclass.entity.Log4jTest).
log4j:WARN Please initialize the log4j system properly.
log4j:WARN See http://logging.apache.org/log4j/1.2/faq.html#noconfig for more info.
```

我们在执行代码之前，加上以下代码，他会初始化一个默认配置：

```java
BasicConfigurator.configure();
```

结果：

```bash
0 [main] INFO com.ydlclass.entity.Log4jTest  - hello log4j
1 [main] FATAL com.ydlclass.entity.Log4jTest  - fatal
1 [main] ERROR com.ydlclass.entity.Log4jTest  - error
1 [main] WARN com.ydlclass.entity.Log4jTest  - warn
1 [main] INFO com.ydlclass.entity.Log4jTest  - info
1 [main] DEBUG com.ydlclass.entity.Log4jTest  - debug
```

从源码看，这一行代码给我们的 RootLogger 加入一个控制台的输出源，就和 jul 中的 handler 一样：

```java
public static void configure() {
    Logger root = Logger.getRootLogger();
    root.addAppender(new ConsoleAppender(new PatternLayout("%r [%t] %p %c %x - %m%n")));
}
```

log4j 定义了以下的日志的级别，和 JUL 的略有不同：

1. **fatal** 指出每个严重的错误事件将会导致应用程序的退出。
2. **error** 指出虽然发生错误事件，但仍然不影响系统的继续运行。
3. **warn** 表明会出现潜在的错误情形。
4. **info** 一般和在粗粒度级别上，强调应用程序的运行全程。
5. **debug** 一般用于细粒度级别上，对调试应用程序非常有帮助。
6. **trace** 是程序追踪，可以用于输出程序运行中的变量，显示执行的流程。

和 JUL 一样：还有两个特殊的级别：OFF，可用来关闭日志记录。 ALL，启用所有消息的日志记录。

一般情况下，我们只使用 4 个级别，优先级从高到低为 **ERROR > WARN > INFO > DEBUG**。

### 二、组件讲解

Log4J 主要由 Loggers (日志记录器)、Appenders（输出端）和 Layout（日志格式化器）组成。其中 Loggers 控制日志的输出级别与日志是否输出；Appenders 指定日志的输出方式（输出到控制台、文件 等）；Layout 控制日志信息的输出格式。

#### 1、Loggers

日志记录器：负责收集处理日志记录，实例的命名就是类“XX”的 full quailied name（类的全限定名）， Logger 的名字大小写敏感，其命名有继承机制：例如：name 为 com.ydlclass.service 的 logger 会继承 name 为 com.ydlclass 的 logger，和 JUL 一致。

Log4J 中有一个特殊的 logger 叫做“root”，他是所有 logger 的根，也就意味着其他所有的 logger 都会直接 或者间接地继承自 root。root logger 可以用 Logger.getRootLogger()方法获取。 JUL 是不是也有一个名为.的根。

#### 2、Appenders

Appender 和 JUL 的 Handler 很像，用来指定日志输出到哪个地方，可以同时指定日志的输出目的地。Log4j 常用的输出目的地 有以下几种：

| 输出端类型               | 作用                                                                                                                |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| ConsoleAppender          | 将日志输出到控制台                                                                                                  |
| FileAppender             | 将日志输出到文件中                                                                                                  |
| DailyRollingFileAppender | 将日志输出到一个日志文件，并且每天输出到一个新的文件                                                                |
| RollingFileAppender      | 将日志信息输出到一个日志文件，并且指定文件的尺寸，当文件大 小达到指定尺寸时，会自动把文件改名，同时产生一个新的文件 |
| JDBCAppender             | 把日志信息保存到数据库中                                                                                            |

```java
// 配置一个控制台输出源
ConsoleAppender consoleAppender = new ConsoleAppender();
consoleAppender.setName("ydl");
consoleAppender.setWriter(new PrintWriter(System.out));
logger.addAppender(consoleAppender);
```

#### 3、Layouts

```java
Layout layout = new Layout() {
    @Override
    public String format(LoggingEvent loggingEvent) {
        return loggingEvent.getLoggerName() + " "
            +loggingEvent.getMessage() + "\r\n";
    }

    @Override
    public boolean ignoresThrowable() {
        return false;
    }

    @Override
    public void activateOptions() {

    }
};
```

有一些默认的实现类：

```java
Layout layout = new SimpleLayout();
```

![img](./img/1713933037128-399389cc-5c27-41cb-8298-21817f5a7574.png)

他的实现太简单了：

```java
public String format(LoggingEvent event) {
    sbuf.setLength(0);
    sbuf.append(event.getLevel().toString());
    sbuf.append(" - ");
    sbuf.append(event.getRenderedMessage());
    sbuf.append(LINE_SEP);
    return sbuf.toString();
  }
```

还有一个比较常用的 Layout，就是 PatternLayout 这个实现类，能够根据特定的占位符进行转化，和 JUL 很像，但是又不一样，我们庖丁解牛研究一番，首先看他的构造器，构造器中如果传入一个 pattern 字符串，他会根据这个 pattern 创建一个链表，这个链表具体干什么咱们慢慢往后看：

```java
public PatternLayout(String pattern) {
    this.pattern = pattern;
    head = createPatternParser((pattern == null) ? DEFAULT_CONVERSION_PATTERN :
                               pattern).parse();
}
```

将步骤拆解开来看，首先创建了一个解析器：

```java
protected PatternParser createPatternParser(String pattern) {
    return new PatternParser(pattern);
}
```

查看 parse 方法，这个方法比较复杂我们简化来看：

```java
public PatternConverter parse() {
    char c;
    i = 0;
    while(i < patternLength) {
        ...此次省略了很多代码，但是可以从这个核心看出来
        c = pattern.charAt(i++);
        finalizeConverter(c);
    }
    return head;
}
```

而 `finalizeConverter` 做的工作大家就能看的很清楚了：

```java
protected void finalizeConverter(char c) {
    PatternConverter pc = null;
    switch(c) {
    case 'c':
      pc = new CategoryPatternConverter(formattingInfo,
     extractPrecisionOption());
      //LogLog.debug("CATEGORY converter.");
      //formattingInfo.dump();
      currentLiteral.setLength(0);
      break;
    //处理类名的转化器
    case 'C':
      pc = new ClassNamePatternConverter(formattingInfo,
      extractPrecisionOption());
      //LogLog.debug("CLASS_NAME converter.");
      //formattingInfo.dump();
      currentLiteral.setLength(0);
      break;
     //处理时间的转化器
    case 'd':
      String dateFormatStr = AbsoluteTimeDateFormat.ISO8601_DATE_FORMAT;
      DateFormat df;
  ...
      pc = new DatePatternConverter(formattingInfo, df);
      currentLiteral.setLength(0);
      break;
    //输出日志时间发生的位置，包括类名、线程、及在代码中的行数
    case 'F':
      pc = new LocationPatternConverter(formattingInfo,
     FILE_LOCATION_CONVERTER);
      break;
    case 'l':
      pc = new LocationPatternConverter(formattingInfo,
     FULL_LOCATION_CONVERTER);
      currentLiteral.setLength(0);
      break;
    case 'L':
      pc = new LocationPatternConverter(formattingInfo,
     LINE_LOCATION_CONVERTER);
      currentLiteral.setLength(0);
      break;
    case 'm':
      pc = new BasicPatternConverter(formattingInfo, MESSAGE_CONVERTER);
      currentLiteral.setLength(0);
      break;
    case 'M':
      pc = new LocationPatternConverter(formattingInfo,
     METHOD_LOCATION_CONVERTER);
      currentLiteral.setLength(0);
      break;
    case 'p':
      pc = new BasicPatternConverter(formattingInfo, LEVEL_CONVERTER);
      currentLiteral.setLength(0);
      break;
    case 'r':
      pc = new BasicPatternConverter(formattingInfo,
      RELATIVE_TIME_CONVERTER);
      currentLiteral.setLength(0);
      break;
    case 't':
      pc = new BasicPatternConverter(formattingInfo, THREAD_CONVERTER);
      currentLiteral.setLength(0);
      break;
    case 'x':
      pc = new BasicPatternConverter(formattingInfo, NDC_CONVERTER);
      //LogLog.debug("NDC converter.");
      currentLiteral.setLength(0);
      break;
    case 'X':
      String xOpt = extractOption();
      pc = new MDCPatternConverter(formattingInfo, xOpt);
      currentLiteral.setLength(0);
      break;
    default:
      LogLog.error("Unexpected char [" +c+"] at position "+i
     +" in conversion patterrn.");
      pc = new LiteralPatternConverter(currentLiteral.toString());
      currentLiteral.setLength(0);
    }

    addConverter(pc);
  }
```

下边就是一个典型的链表结构的构建了：

```java
protected void addConverter(PatternConverter pc) {
    currentLiteral.setLength(0);
    // Add the pattern converter to the list.
    addToList(pc);
    // Next pattern is assumed to be a literal.
    state = LITERAL_STATE;
    // Reset formatting info
    formattingInfo.reset();
}
private void  addToList(PatternConverter pc) {
    if(head == null) {
        head = tail = pc;
    } else {
        tail.next = pc;
        tail = pc;
    }
}
```

构建完转化器链表之后，就是循环这个链表，一次处理对应的占位符了，他的核心的格式化的方法也是 format 方法，在 format 方法中是通过一个转化器链来完成转化的：

```java
public String format(LoggingEvent event) {
    // 在format方法中是通过一个转化器链来完成转化的
    PatternConverter c = head;

    while(c != null) {
      // 这一句是核心，第一个参数是一个StringBuilder，第二个参数LoggingEvent
      c.format(sbuf, event);
      c = c.next;
    }
    return sbuf.toString();
  }
}
```

这里就是通过一个 pattern 字符串，这个字符串可能张这个样子 `(%-d{yyyy-MM-dd HH:mm:ss} [%t:%r] -[%p] %m%n)`，使用 `createPatternParser().parse()` 方法构建一个处理器的链表，这个每个处理器处理一个占位符比如（`%d`）。

进入 `c.format()` 方法，我们会进入一个抽象类 PatternConverter 中的 format 方法，里边的核心就是如下代码：

```java
public void format(StringBuffer sbuf, LoggingEvent e) {
    // 核心就是这一句
    String s = convert(e);
}
```

log4j 其实采用类似 C 语言的 printf 函数的打印格式格式化日志信息，源码已经看过了，具体的占位符及其含义如下：

```text
%m 输出代码中指定的日志信息
%p 输出日志级别，及 DEBUG、INFO 等
%n 换行符（Windows平台的换行符为 "\n"，Unix 平台为 "\n"）
%r 输出自应用启动到输出该 log 信息耗费的毫秒数
%c 输出打印语句所属的类的全名
%t 输出产生该日志的线程全名
%d 输出服务器当前时间，默认为 ISO8601，也可以指定格式，如：%d{yyyy年MM月dd日HH:mm:ss}
%l 输出日志时间发生的位置，包括类名、线程、及在代码中的行数。如：Test.main(Test.java:10)
%F 输出日志消息产生时所在的文件名称
%L 输出代码中的行号
%% 输出一个 "%" 字符
* 可以在 % 与字符之间加上修饰符来控制最小宽度、最大宽度和文本的对其方式。如：
%5c 输出category名称，最小宽度是5，category<5，默认的情况下右对齐
%-5c 输出category名称，最小宽度是5，category<5，"-"号指定左对齐,会有空格
%.5c 输出category名称，最大宽度是5，category>5，就会将左边多出的字符截掉，<5不会有空格
%20.30c category名称<20补空格，并且右对齐，>30字符，就从左边交远销出的字符截掉
```

举一个例子：

```bash
%-d{yyyy-MM-dd HH:mm:ss} [%t:%r] -[%p] %m%n
打印：日期 [线程:毫秒数] - [日志级别] - 日志信息 换行
```

尝试写一个：

```java
@Test
public void testLog(){
    // 获取一个logger
    Logger logger = Logger.getLogger(TestLog4j.class);
    // 创建一个layout
    Layout layout = new PatternLayout("%-d{yyyy-MM-dd HH:mm:ss} [%t:%r] -[%p] %m%n");
    // 创建一个输出源
    ConsoleAppender appender = new ConsoleAppender();
    appender.setLayout(layout);
    appender.setWriter(new PrintWriter(System.out));
    logger.addAppender(appender);
    logger.warn("warning");
}

结果：
2021-10-21 21:31:05 [main:0] -[WARN] warning
```

配置一个 jdbcAppender

```java
JDBCAppender jdbcAppender = new JDBCAppender();
jdbcAppender.setDriver("com.mysql.cj.jdbc.Driver");
jdbcAppender.setURL("jdbc:mysql://localhost:3306/ydlclass?characterEncoding=utf8&useSSL=false&serverTimezone=UTC");
jdbcAppender.setUser("root");
jdbcAppender.setPassword("root");
jdbcAppender.setSql("INSERT INTO log(project_name,create_date,level,category,file_name,thread_name,line,all_category,message) values('ydlclass','%d{yyyy-MM-ddHH:mm:ss}','%p','%c','%F','%t','%L','%l','%m')");
```

数据表

```sql
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '项目名',
  `create_date` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '创建时间',
  `level` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '优先级',
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '所在类的全名',
  `file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '输出日志消息产生时所在的文件名称 ',
  `thread_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '日志事件的线程名',
  `line` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '行号',
  `all_category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '日志事件的发生位置',
  `message` varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '输出代码中指定的消息',
  PRIMARY KEY (`log_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;
```

依赖

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.22</version>
</dependency>
```

### 三、配置

log4j 不仅仅可以在控制台，文件文件中输出日志，甚至可以在数据库中，我们先使用配置的方式完成日志的输入：

```properties
#指定日志的输出级别与输出端
log4j.rootLogger=INFO,Console,ydl
# 控制台输出配置
log4j.appender.Console=org.apache.log4j.ConsoleAppender
log4j.appender.Console.layout=org.apache.log4j.PatternLayout
log4j.appender.Console.layout.ConversionPattern=%d [%t] %-5p [%c] - %m%n
# 文件输出配置
log4j.appender.ydl = org.apache.log4j.DailyRollingFileAppender
#指定日志的输出路径
log4j.appender.ydl.File = D:/logs/ydl.log
log4j.appender.ydl.Append = true
#使用自定义日志格式化器
log4j.appender.ydl.layout = org.apache.log4j.PatternLayout
#指定日志的输出格式
log4j.appender.ydl.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss} [%t:%r] -[%p] %m%n
#指定日志的文件编码
log4j.appender.ydl.encoding=UTF-8
```

有了这个配置文件我们些代码就简单了一些：

```java
@Test
public void testConfig(){
    // 获取一个logger
    Logger logger = Logger.getLogger(TestLog4j.class);
    logger.warn("warning");
}

结果：
    2021-10-21 21:37:06,705 [main] WARN  [com.ydlclass.TestLog4j] - warning
```

文件也有了：

![img](./img/1713933037196-a6f2c224-2b33-41cd-a64d-b2922ba72afe.png)

内容：

![img](./img/1713933037263-7a51f6a8-953d-4d40-b2e0-85688755abd4.png)

我们查看了可是确实没有问题。

当然日志配置文件是什么时候读取的呢？每一个 logger 都是 LogManager 创建的，而 LogManager 有一个静态代码块帮助我们解析配置文件，细节就不需要了解了：

```java
public class LogManager {

  /**
   * @deprecated This variable is for internal use only. It will
   * become package protected in future versions.
   * */
  static public final String DEFAULT_CONFIGURATION_FILE = "log4j.properties";

  static final String DEFAULT_XML_CONFIGURATION_FILE = "log4j.xml";

  /**
   * @deprecated This variable is for internal use only. It will
   * become private in future versions.
   * */
  static final public String DEFAULT_CONFIGURATION_KEY="log4j.configuration";

  /**
   * @deprecated This variable is for internal use only. It will
   * become private in future versions.
   * */
  static final public String CONFIGURATOR_CLASS_KEY="log4j.configuratorClass";

  /**
  * @deprecated This variable is for internal use only. It will
  * become private in future versions.
  */
  public static final String DEFAULT_INIT_OVERRIDE_KEY =
                                                 "log4j.defaultInitOverride";


  static private Object guard = null;
  static private RepositorySelector repositorySelector;

  static {
      // By default we use a DefaultRepositorySelector which always returns 'h'.
      Hierarchy h = new Hierarchy(new RootLogger((Level) Level.DEBUG));
      repositorySelector = new DefaultRepositorySelector(h);

      /** Search for the properties file log4j.properties in the CLASSPATH.  */
      String override =OptionConverter.getSystemProperty(DEFAULT_INIT_OVERRIDE_KEY,
                                                         null);

      // if there is no default init override, then get the resource
      // specified by the user or the default config file.
      if(override == null || "false".equalsIgnoreCase(override)) {

          String configurationOptionStr = OptionConverter.getSystemProperty(
              DEFAULT_CONFIGURATION_KEY,
              null);

          String configuratorClassName = OptionConverter.getSystemProperty(
              CONFIGURATOR_CLASS_KEY,
              null);

          URL url = null;

          // if the user has not specified the log4j.configuration
          // property, we search first for the file "log4j.xml" and then
          // "log4j.properties"
          if(configurationOptionStr == null) {
              url = Loader.getResource(DEFAULT_XML_CONFIGURATION_FILE);
              if(url == null) {
                  url = Loader.getResource(DEFAULT_CONFIGURATION_FILE);
              }
          } else {
              try {
                  url = new URL(configurationOptionStr);
              } catch (MalformedURLException ex) {
                  // so, resource is not a URL:
                  // attempt to get the resource from the class path
                  url = Loader.getResource(configurationOptionStr);
              }
          }

          // If we have a non-null url, then delegate the rest of the
          // configuration to the OptionConverter.selectAndConfigure
          // method.
          if(url != null) {
              LogLog.debug("Using URL ["+url+"] for automatic log4j configuration.");
              try {
                  OptionConverter.selectAndConfigure(url, configuratorClassName,
                                                     LogManager.getLoggerRepository());
              } catch (NoClassDefFoundError e) {
                  LogLog.warn("Error during default initialization", e);
              }
          } else {
              LogLog.debug("Could not find resource: ["+configurationOptionStr+"].");
          }
      } else {
          LogLog.debug("Default initialization of overridden by " +
                       DEFAULT_INIT_OVERRIDE_KEY + "property.");
      }
  }
}
```

还有更有意思的，我们可以直接添加一个数据源，讲日志输出到数据库中，就是一个和数据库链接的输出源而已：

加入一个数据库的日志输出源：

```properties
#mysql
log4j.appender.logDB=org.apache.log4j.jdbc.JDBCAppender
log4j.appender.logDB.layout=org.apache.log4j.PatternLayout
log4j.appender.logDB.Driver=com.mysql.cj.jdbc.Driver
log4j.appender.logDB.URL=jdbc:mysql://localhost:3306/ssm
log4j.appender.logDB.User=root
log4j.appender.logDB.Password=root
log4j.appender.logDB.Sql=INSERT INTO log(project_name,create_date,level,category,file_name,thread_name,line,all_category,message) values('ydlclass','%d{yyyy-MM-ddHH:mm:ss}','%p','%c','%F','%t','%L','%l','%m')
```

需要

```sql
CREATE TABLE `log` (
    `log_id` int(11) NOT NULL AUTO_INCREMENT,
    `project_name` varchar(255) DEFAULT NULL COMMENT '目项名',
    `create_date` varchar(255) DEFAULT NULL COMMENT '创建时间',
    `level` varchar(255) DEFAULT NULL COMMENT '优先级',
    `category` varchar(255) DEFAULT NULL COMMENT '所在类的全名',
    `file_name` varchar(255) DEFAULT NULL COMMENT '输出日志消息产生时所在的文件名称 ',
    `thread_name` varchar(255) DEFAULT NULL COMMENT '日志事件的线程名',
    `line` varchar(255) DEFAULT NULL COMMENT '号行',
    `all_category` varchar(255) DEFAULT NULL COMMENT '日志事件的发生位置',
    `message` varchar(4000) DEFAULT NULL COMMENT '输出代码中指定的消息',
    PRIMARY KEY (`log_id`)
);
```

pom 中添加驱动：

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.22</version>
</dependency>
```

再次执行：

发现除了控制台，文件，数据库中也有了日志了：

![img](./img/1713933037370-22d01af1-bef0-4a73-a41a-53904b8bdef6.png)

### 四、自定义 Logger

```properties
# RootLogger配置
log4j.rootLogger = trace,console
# 自定义Logger
log4j.logger.com.ydlclass= WARN,logDB
log4j.logger.org.apache = error
```

由此我们发现，我们可以很灵活的自定义，组装不同 logger 的实现，接下来我们写代码测试：

```java
@Test
public void testDefineLogger() throws Exception {
    Logger logger1 = Logger.getLogger(Log4jTest.class);
    logger1.fatal("fatal"); // 严重错误，一般会造成系统崩溃和终止运行
    logger1.error("error"); // 错误信息，但不会影响系统运行
    logger1.warn("warn"); // 警告信息，可能会发生问题
    logger1.info("info"); // 程序运行信息，数据库的连接、网络、IO操作等
    logger1.debug("debug"); // 调试信息，一般在开发阶段使用，记录程序的变量、参数等
    logger1.trace("trace"); // 追踪信息，记录程序的所有流程信息
    // 自定义 org.apache
    Logger logger2 = Logger.getLogger(Logger.class);
    logger2.fatal("fatal logger2"); // 严重错误，一般会造成系统崩溃和终止运行
    logger2.error("error logger2"); // 错误信息，但不会影响系统运行
    logger2.warn("warn logger2"); // 警告信息，可能会发生问题
    logger2.info("info logger2"); // 程序运行信息，数据库的连接、网络、IO操作等
    logger2.debug("debug logger2"); // 调试信息，一般在开发阶段使用，记录程序的变量、参数等
    logger2.trace("trace logger2"); // 追踪信息，记录程序的所有流程信息
}
```

我们发现 logger1 的日志级别成了 warn，并且在数据库中有了日志，logger2 级别成了 error，他们其实都继承了根 logger 的一些属性。

## 第四章 日志门面

当我们的系统变的复杂的之后，难免会集成其他的系统，不同的系统之间可能会使用不同的日志系统。那么在一个系统中，我们的日志框架可能会出现多个，会出现混乱，而且随着时间的发展，可能会出现新的效率更高的日志系统，如果我们想切换代价会非常的大。如果我们的日志系统能和 jdbc 一样，有一套自己的规范，其他实现均按照规范去实现，就能很灵活的使用日志框架了。

日志门面就是为了解决这个问题而出现的一种技术，日志门面是规范，其他的实现按照规范实现各自的日志框架即可，我们程序员基于日志门面编程即可。举个例子：日志门面就好比菜单，日志实现就好比厨师，我们去餐馆吃饭按照菜单点菜即可，厨师是谁其实不重要，但是有一个符合我口味的厨师当然会更好。

常见的日志门面： `JCL`、`slf4j`

常见的日志实现： `JUL`、`log4j`、`logback`、`log4j2`

日志框架出现的历史顺序：

`log4j -->JUL-->JCL--> slf4j --> logback --> log4j2`

![img](./img/1713933037434-634fc472-fd58-4d69-b846-5c35301ee4f8.png)

### 一、SLF4J 日志门面

简单日志门面(Simple Logging Facade For Java) SLF4J 主要是为了给 Java 日志访问提供一套标准、规范的 API 框架，其主要意义在于提供接口，具体的实现可以交由其他日志框架，例如 log4j 和 logback 等。 当然 slf4j 自己也提供了功能较为简单的实现，但是一般很少用到。对于一般的 Java 项目而言，日志框架 会选择 `slf4j-api` 作为门面，配上具体的实现框架（log4j、logback 等），中间使用桥接器完成桥接。官方网站： <https://www.slf4j.org/>

SLF4J 是目前市面上最流行的日志门面。现在的项目中，基本上都是使用 SLF4J 作为我们的日志系统。

SLF4J 日志门面主要提供两大功能：

1. 日志框架的绑定
2. 日志框架的桥接

#### 1、阿里日志规约

1. 应用中不可直接使用日志系统（Log4j、Logback）中的 API，而应依赖使用日志框架 SLF4J 中的 API。使用门面模式的日志框架，有利于维护和各个类的日志处理方法统一。
2. 日志文件推荐至少保存 15 天，因为有些异常具备以“周”为频次发生的特点。
3. 应用中的扩展日志（如打点、临时监控、访问日志等）命名方式：`appName_logType_logName.log`。logType 为日志类型，推荐分类有 `stats/monitor/visit` 等；
4. logName 为日志描述。这种命名的好处：通过文件名就可以知道日志文件属于哪个应用，哪种类型，有什么目的，这也有利于归类查找。
5. 对 `trace/debug/info` 级别的日志输出，必须使用条件输出形式或者占位符的方式。
6. 避免重复打印日志，否则会浪费磁盘空间。务必在日志配置文件中设置 `additivity=false`。
7. 异常信息应该包括两类：案发现场信息和异常堆栈信息。如果不处理，那么通过关键字向上抛出。
8. 谨慎地记录日志。生产环境禁止输出 `debug` 日志；有选择地输出 `info` 日志；如果使用 warn 记录刚上线时的业务行为信息，一定要注意日志输出量的问题，避免吧服务器磁盘撑爆，并及时删除这些观察日志。
9. 可以使用 warn 日志级别记录用户输入参数错误的情况，避免当用户投诉时无所适从。

#### 2、SLF4J 实战

（1）添加依赖

```xml
<!--slf4j core 使用slf4j必須添加-->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.27</version>
</dependency>
<!--slf4j 自带的简单日志实现 -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>1.7.27</version>
</dependency>
```

（2）编写代码

```java
public class cn.stazxr.TestSlf4j {

    // 声明日志对象
    public final static Logger LOGGER =
            LoggerFactory.getLogger(cn.stazxr.TestSlf4j.class);
    @Test
    public void testSlfSimple()  {
        //打印日志信息
        LOGGER.error("error");
        LOGGER.warn("warn");
        LOGGER.info("info");
        LOGGER.debug("debug");
        LOGGER.trace("trace");
        // 使用占位符输出日志信息
        String name = "lucy";
        Integer age = 18;
        LOGGER.info("{}今年{}岁了！", name, age);
        // 将系统异常信息写入日志
        try {
            int i = 1 / 0;
        } catch (Exception e) {
            // e.printStackTrace();
            LOGGER.info("出现异常：", e);
        }
    }
}
```

slf4j 支持占位符：

#### 3、绑定其他日志的实现（Binding）

如前所述，SLF4J 支持各种日志框架。SLF4J 发行版附带了几个称为 “SLF4J 绑定“ 的 jar 文件，每个绑定对应一个受支持的框架。

**使用 slf4j 的日志绑定流程:**

1. 添加 `slf4j-api` 的依赖
2. 使用 slf4j 的 API 在项目中进行统一的日志记录
3. 绑定具体的日志实现框架 a. 绑定已经实现了 slf4j 的日志框架,直接添加对应依赖 b. 绑定没有实现 slf4j 的日志框架,先添加日志的适配器,再添加实现类的依赖
4. slf4j 有且仅有一个日志实现框架的绑定（如果出现多个默认使用第一个依赖日志实现）

绑定 jul 的实现

```xml
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.27</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-jdk14</artifactId>
    <version>1.7.25</version>
</dependency>
```

绑定 log4j 的实现

```xml
<!--slf4j core 使用slf4j必須添加-->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.27</version>
</dependency>
<!-- log4j-->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-log4j12</artifactId>
    <version>1.7.27</version>
</dependency>
<dependency>
    <groupId>log4j</groupId>
    <artifactId>log4j</artifactId>
    <version>1.2.17</version>
</dependency>
```

要切换日志框架，只需替换类路径上的 slf4j 绑定。例如，要从 `java.util.logging` 切换到 log4j，只需将 `slf4j-jdk14-1.7.27.jar` 替换为 `slf4j-log4j12-1.7.27.jar` 即可。

SLF4J 不依赖于任何特殊的类装载。实际上，每个 SLF4J 绑定在编译时都是硬连线的， 以使用一个且只有 一个特定的日志记录框架。例如，`slf4j-log4j12-1.7.27.jar` 绑定在编译时绑定以使用 log4j。

#### 4、桥接旧的日志框架（Bridging）

通常，您依赖的某些组件依赖于 SLF4J 以外的日志记录 API。您也可以假设这些组件在不久的将来不会切换到 SLF4J。为了解决这种情况，SLF4J 附带了几个桥接模块，这些模块将对 log4j，JCL 和 `java.util.logging` API 的调用重定向，就好像它们是对 SLF4J API 一样。

就是你还用 log4j 的 api 写代码，但是具体的实现给你抽离了，我们依赖了一个中间层，这个层其实是用旧的 api 操作 slf4j，而不是操作具体的实现。

桥接解决的是项目中日志的遗留问题，当系统中存在之前的日志 API，可以通过桥接转换到 slf4j 的实现

1. 先去除之前老的日志框架的依赖，必须去掉。
2. 添加 SLF4J 提供的桥接组件，这个组件就是模仿之前老的日志写了一套相同的 api，只不过这个 api 是在调用 slf4j 的 api。
3. 为项目添加 SLF4J 的具体实现。

迁移的方式：

```xml
<!-- 桥接的组件 -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>log4j-over-slf4j</artifactId>
    <version>1.7.27</version>
</dependency>

<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.27</version>
</dependency>

<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>1.7.27</version>
</dependency>
```

SLF4J 提供的桥接器：

```xml
<!-- log4j-->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>log4j-over-slf4j</artifactId>
    <version>1.7.27</version>
</dependency>
<!-- jul -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>jul-to-slf4j</artifactId>
    <version>1.7.27</version>
</dependency>
<!--jcl -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>jcl-over-slf4j</artifactId>
    <version>1.7.27</version>
</dependency>
```

注意问题：

1. `jcl-over-slf4j.jar` 和 `slf4j-jcl.jar` 不能同时部署。前一个 jar 文件将导致 JCL 将日志系统的选择委托给 SLF4J，后一个 jar 文件将导致 SLF4J 将日志系统的选择委托给 JCL，从而导致无限循环。
2. `log4j-over-slf4j.jar` 和 `slf4j-log4j12.jar` 不能同时出现
3. `jul-to-slf4j.jar` 和 `slf4j-jdk14.jar` 不能同时出现
4. 所有的桥接都只对 Logger 日志记录器对象有效，如果程序中调用了内部的配置类或者是 Appender,Filter 等对象，将无法产生效果。

#### 5、SLF4J 原理解析

1. SLF4J 通过 LoggerFactory 加载日志具体的实现对象。
2. LoggerFactory 在初始化的过程中，会通过 `performInitialization()` 方法绑定具体的日志实现。
3. 在绑定具体实现的时候，通过类加载器，加载 `org/slf4j/impl/StaticLoggerBinder.class`
4. 所以，只要是一个日志实现框架，在 `org.slf4j.impl` 包中提供一个自己的 StaticLoggerBinder 类，在其中提供具体日志实现的 LoggerFactory 就可以被 SLF4J 所加载

在 slf4j 中创建 logger 的方法是：

```java
public static Logger getLogger(String name) {
    ILoggerFactory iLoggerFactory = getILoggerFactory();
    return iLoggerFactory.getLogger(name);
}
```

继续进入查看，核心就是 `performInitialization();`：

```java
public static ILoggerFactory getILoggerFactory() {
    if (INITIALIZATION_STATE == UNINITIALIZED) {
        synchronized (LoggerFactory.class) {
            if (INITIALIZATION_STATE == UNINITIALIZED) {
                INITIALIZATION_STATE = ONGOING_INITIALIZATION;
                performInitialization();
            }
        }
    }
}
```

继续进入查看，核心就是 `bind()`，这个方法应该就能绑定日志实现了：

```java
private final static void performInitialization() {
        bind();
        if (INITIALIZATION_STATE == SUCCESSFUL_INITIALIZATION) {
            versionSanityCheck();
        }
    }
}
```

来到这里，看看绑定的方法：

```java
private final static void bind() {
        try {
            ...
            // 以下内容就绑定成功了
            StaticLoggerBinder.getSingleton();
            INITIALIZATION_STATE = SUCCESSFUL_INITIALIZATION;
            reportActualBinding(staticLoggerBinderPathSet);
            fixSubstituteLoggers();
            replayEvents();
            // release all resources in SUBST_FACTORY
            SUBST_FACTORY.clear();
        } catch (NoClassDefFoundError ncde) {
            String msg = ncde.getMessage();
            if (messageContainsOrgSlf4jImplStaticLoggerBinder(msg)) {
                INITIALIZATION_STATE = NOP_FALLBACK_INITIALIZATION;
                Util.report("Failed to load class \"org.slf4j.impl.StaticLoggerBinder\".");
                Util.report("Defaulting to no-operation (NOP) logger implementation");
                Util.report("See " + NO_STATICLOGGERBINDER_URL + " for further details.");
            } else {
                failedBinding(ncde);
                throw ncde;
            }
        } catch (java.lang.NoSuchMethodError nsme) {
            String msg = nsme.getMessage();
            if (msg != null && msg.contains("org.slf4j.impl.StaticLoggerBinder.getSingleton()")) {
                INITIALIZATION_STATE = FAILED_INITIALIZATION;
                Util.report("slf4j-api 1.6.x (or later) is incompatible with this binding.");
                Util.report("Your binding is version 1.5.5 or earlier.");
                Util.report("Upgrade your binding to version 1.6.x.");
            }
            throw nsme;
        } catch (Exception e) {
            failedBinding(e);
            throw new IllegalStateException("Unexpected initialization failure", e);
        }
    }
```

每一个日志实现的中间包都有一个 StaticLoggerBinder：

![img](./img/1713933037505-259370d5-9923-4b85-b1f8-d8cfc03e2f66.png)

```java
public class StaticLoggerBinder implements LoggerFactoryBinder {

    /**
     * The unique instance of this class.
     *
     */
    private static final StaticLoggerBinder SINGLETON = new StaticLoggerBinder();

    /**
     * Return the singleton of this class.
     *
     * @return the StaticLoggerBinder singleton
     */
    public static final StaticLoggerBinder getSingleton() {
        return SINGLETON;
    }

    /**
     * Declare the version of the SLF4J API this implementation is compiled against.
     * The value of this field is modified with each major release.
     */
    // to avoid constant folding by the compiler, this field must *not* be final
    public static String REQUESTED_API_VERSION = "1.6.99"; // !final

    private static final String loggerFactoryClassStr = Log4jLoggerFactory.class.getName();

    /**
     * The ILoggerFactory instance returned by the {@link #getLoggerFactory}
     * method should always be the same object
     */
    private final ILoggerFactory loggerFactory;

    private StaticLoggerBinder() {
        loggerFactory = new Log4jLoggerFactory();
        try {
            @SuppressWarnings("unused")
            Level level = Level.TRACE;
        } catch (NoSuchFieldError nsfe) {
            Util.report("This version of SLF4J requires log4j version 1.2.12 or later. See also http://www.slf4j.org/codes.html#log4j_version");
        }
    }

    public ILoggerFactory getLoggerFactory() {
        return loggerFactory;
    }

    public String getLoggerFactoryClassStr() {
        return loggerFactoryClassStr;
    }
}
```

### 二、JCL 日志门面

全称为 Jakarta Commons Logging，是 Apache 提供的一个通用日志 API。 改日志门面的使用并不是很广泛。

它是为 "所有的 Java 日志实现"提供一个统一的接口，它自身也提供一个日志的实现，但是功能非常常弱 （SimpleLog）。所以一般不会单独使用它。他允许开发人员使用不同的具体日志实现工具: `Log4j`, Jdk 自带的日志（JUL)

JCL 有两个基本的抽象类：`Log(基本记录器)`和 `LogFactory(负责创建 Log 实例)`。

#### 1、JCL 入门

1. 建立 maven 工程
2. 添加依赖

```xml
<dependency>
    <groupId>commons-logging</groupId>
    <artifactId>commons-logging</artifactId>
    <version>1.2</version>
</dependency>
```

1. 入门代码

```java
public class JULTest {
    @Test
    public void testQuick() throws Exception {
        // 创建日志对象
        Log log = LogFactory.getLog(JULTest.class);
        // 日志记录输出
        log.fatal("fatal");
        log.error("error");
        log.warn("warn");
        log.info("info");
        log.debug("debug");
    }
}
```

**我们为什么要使用日志门面：**

1. 面向接口开发，不再依赖具体的实现类。减少代码的耦合
2. 项目通过导入不同的日志实现类，可以灵活的切换日志框架
3. 统一 API，方便开发者学习和使用
4. 统一配置便于项目日志的管理

#### 2、JCL 原理

![img](./img/1713933037587-153e8fd3-69e6-4505-953a-c29139697ae6.png)

1. 通过 LogFactory 动态加载 Log 实现类

![img](./img/1713933037664-5f5305de-e7b9-437f-b7fc-18e049a32517.png)

1. 日志门面支持的日志实现数组

```java
private static final String[] classesToDiscover =
    new String[]{"org.apache.commons.logging.impl.Log4JLogger",
                 "org.apache.commons.logging.impl.Jdk14Logger",
                 "org.apache.commons.logging.impl.Jdk13LumberjackLogger",
                 "org.apache.commons.logging.impl.SimpleLog"};
```

1. 获取具体的日志实现

```java
for(int i = 0; i < classesToDiscover.length && result == null; ++i) {
    result = this.createLogFromClass(classesToDiscover[i], logCategory, true);
}
```

#### 3、日志生态图

![img](./img/1713933037749-14fddde9-a6c4-434a-a81f-8c01e25f6934.png)

历史插曲：现在聊聊历史：<https://segmentfault.com/a/1190000021121882?utm_source=tag-newest>

## 第五章 Logback 的使用

Logback 是由 log4j 创始人设计的另一个开源日志组件，性能比 log4j 要好。

官方网站：<https://logback.qos.ch/index.html>

Logback 主要分为三个模块：

- `logback-core`：其它两个模块的基础模块
- `logback-classic`：它是 log4j 的一个改良版本，同时它完整实现了 slf4j API
- `logback-access`：访问模块与 Servlet 容器集成提供通过 Http 来访问日志的功能 后续的日志代码都是通过 SLF4J 日志门面搭建日志系统，所以在代码是没有区别，主要是通过修改配置文件和 pom.xml 依赖

### 一、logback 入门

1. 添加依赖

```xml
<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.2.3</version>
</dependency>
```

1. java 代码

```java
public class TestLogback {

    private final static Logger logger = LoggerFactory.getLogger(TestLog4j.class);

    @Test
    public void testLogback(){
        //打印日志信息
        logger.error("error");
        logger.warn("warn");
        logger.info("info");
        logger.debug("debug");
        logger.trace("trace");
    }
}
```

1、其实我们发现即使项目中没有引入 slf4j 我们这里也是用的 slf4j 门面进行编程。

![img](./img/1713933037834-36d28760-05b4-435a-b6ba-c8aaa0228a74.png)

2、从 logback 的 pom 依赖中我们看到 slf4j，依赖会进行传递

![img](./img/1713933038005-722daf3e-0a51-40eb-b4c9-040d9ac3a306.png)

### 二、源码解析

#### 1、spi 机制

SPI 全称 Service Provider Interface，是 Java 提供的一套用来被第三方实现或者扩展的 API，它可以用来启用框架扩展和替换组件。他是一种服务发现机制。它通过在 ClassPath 路径下的 `META-INF/services` 文件夹查找文件，自动加载文件里所定义的类。

主要是使用，`java.util` 包下的 ServiceLoader 实现：

```java
public static <S> ServiceLoader<S> load(Class<S> service, ClassLoader loader) {
    return new ServiceLoader<>(service, loader);
}
```

#### 2、源码解析

源码看一下启动过程：

1、我们从日志工厂的常见看起，这里是 slf4j 的实现：

```java
private final static Logger logger = LoggerFactory.getLogger(TestLog4j.class);
```

核心方法只有一句：

```java
public static Logger getLogger(Class<?> clazz) {
    Logger logger = getLogger(clazz.getName());
    ...中间的逻辑判断省略掉
    return logger;
}
```

看一下 `getLogger` 方法，这里是先获取日志工厂，在从工厂中提取日志对象，我们不考虑日志对象，主要看看日志工厂的环境怎么初始化的：

```java
public static Logger getLogger(String name) {
    ILoggerFactory iLoggerFactory = getILoggerFactory();
    return iLoggerFactory.getLogger(name);
}
```

日志工厂的创建方法：

```java
public static ILoggerFactory getILoggerFactory() {
 ...去掉其他的代码，从这一行看。
    return StaticLoggerBinder.getSingleton().getLoggerFactory();
}
```

这里就进入了，StaticLoggerBinder 这个对象，这是日志实现用来和 slf4j 进行绑定的类，从此就进入日志实现中了。

`StaticLoggerBinder.getSingleton()` 这里看到出来是一个单例，来到这个类当中，我们看到，直接返回了 defaultLoggerContext

```java
public ILoggerFactory getLoggerFactory() {
        if (!initialized) {
            return defaultLoggerContext;
        }
... 省略其他
}
```

这是个日志上下文，一定保存了我们的环境，配置内容一定在这个里边，那么哪里初始化他了呢，我们能想到的就是静态代码块了：

我们发现这个类中还真有：

```java
static {
    SINGLETON.init();
}
```

我们看到 `init()` 方法中，有一个 `autoConfig()`，感觉就像在自动配置：

```java
void init() {
    try {
        try {
            new ContextInitializer(defaultLoggerContext).autoConfig();
        } catch (JoranException je) {
            Util.report("Failed to auto configure default logger context", je);
        }
        ...其他省略
    }
}
```

默认配置：ContextInitializer 类是初始化的关键：

自动配置是这么玩的，先找配置文件

```java
public void autoConfig() throws JoranException {
        StatusListenerConfigHelper.installIfAsked(loggerContext);
        // 这就是去找配置文件
        URL url = findURLOfDefaultConfigurationFile(true);
        if (url != null) {
            // 解析配置
            configureByResource(url);
        } else {
            // 没有找到文件，就去使用spi机制找一个配置类，这个配置类是在web中用的
            Configurator c = EnvUtil.loadFromServiceLoader(Configurator.class);
            if (c != null) {
                try {
                    c.setContext(loggerContext);
                    c.configure(loggerContext);
                } catch (Exception e) {
                    throw new LogbackException(String.format("Failed to initialize Configurator: %s using ServiceLoader", c != null ? c.getClass()
                                    .getCanonicalName() : "null"), e);
                }
            } else {
                // 如果没有找到，就做基本的配置
                BasicConfigurator basicConfigurator = new BasicConfigurator();
                basicConfigurator.setContext(loggerContext);
                basicConfigurator.configure(loggerContext);
            }
        }
    }
```

寻找配置文件的过程：

```java
final public static String GROOVY_AUTOCONFIG_FILE = "logback.groovy";
final public static String AUTOCONFIG_FILE = "logback.xml";
final public static String TEST_AUTOCONFIG_FILE = "logback-test.xml";

public URL findURLOfDefaultConfigurationFile(boolean updateStatus) {
    ClassLoader myClassLoader = Loader.getClassLoaderOfObject(this);
    URL url = findConfigFileURLFromSystemProperties(myClassLoader, updateStatus);
    if (url != null) {
        return url;
    }

    url = getResource(TEST_AUTOCONFIG_FILE, myClassLoader, updateStatus);
    if (url != null) {
        return url;
    }

    url = getResource(GROOVY_AUTOCONFIG_FILE, myClassLoader, updateStatus);
    if (url != null) {
        return url;
    }

    return getResource(AUTOCONFIG_FILE, myClassLoader, updateStatus);
}
public void configureByResource(URL url) throws JoranException {
        if (url == null) {
            throw new IllegalArgumentException("URL argument cannot be null");
        }
        final String urlString = url.toString();
        if (urlString.endsWith("groovy")) {
            if (EnvUtil.isGroovyAvailable()) {
                // avoid directly referring to GafferConfigurator so as to avoid
                // loading groovy.lang.GroovyObject . See also http://jira.qos.ch/browse/LBCLASSIC-214
                GafferUtil.runGafferConfiguratorOn(loggerContext, this, url);
            } else {
                StatusManager sm = loggerContext.getStatusManager();
                sm.add(new ErrorStatus("Groovy classes are not available on the class path. ABORTING INITIALIZATION.", loggerContext));
            }
        } else if (urlString.endsWith("xml")) {
            JoranConfigurator configurator = new JoranConfigurator();
            configurator.setContext(loggerContext);
            configurator.doConfigure(url);
        } else {
            throw new LogbackException("Unexpected filename extension of file [" + url.toString() + "]. Should be either .groovy or .xml");
        }
    }
```

基础配置的代码：

```java
public class BasicConfigurator extends ContextAwareBase implements Configurator {

    public BasicConfigurator() {
    }

    public void configure(LoggerContext lc) {
        addInfo("Setting up default configuration.");

        ConsoleAppender<ILoggingEvent> ca = new ConsoleAppender<ILoggingEvent>();
        ca.setContext(lc);
        ca.setName("console");
        LayoutWrappingEncoder<ILoggingEvent> encoder = new LayoutWrappingEncoder<ILoggingEvent>();
        encoder.setContext(lc);


        // same as
        // PatternLayout layout = new PatternLayout();
        // layout.setPattern("%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n");
        TTLLLayout layout = new TTLLLayout();

        layout.setContext(lc);
        layout.start();
        encoder.setLayout(layout);

        ca.setEncoder(encoder);
        ca.start();

        Logger rootLogger = lc.getLogger(Logger.ROOT_LOGGER_NAME);
        rootLogger.addAppender(ca);
    }
}
```

我们先不说配置的事情，从源码中我们可以看出有几种配置，因为有了

我们先模仿 BasicConfigurator 写一个类，只做略微的改动：

```java
public class MyConfigurator extends ContextAwareBase implements Configurator {
    public MyConfigurator() {
    }

    public void configure(LoggerContext lc) {
        addInfo("Setting up default configuration.");

        ConsoleAppender<ILoggingEvent> ca = new ConsoleAppender<ILoggingEvent>();
        ca.setContext(lc);
        ca.setName("console");
        LayoutWrappingEncoder<ILoggingEvent> encoder = new LayoutWrappingEncoder<ILoggingEvent>();
        encoder.setContext(lc);


        // same as
        // PatternLayout layout = new PatternLayout();
        // layout.setPattern("%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n");
        PatternLayout layout = new PatternLayout();
        layout.setPattern("%d{HH:mm:ss} [%thread] %-5level %logger{36} - %msg%n");

        layout.setContext(lc);
        layout.start();
        encoder.setLayout(layout);

        ca.setEncoder(encoder);
        ca.start();

        Logger rootLogger = lc.getLogger(Logger.ROOT_LOGGER_NAME);
        rootLogger.addAppender(ca);
    }
}
```

在 `resource` 中新建 `META-INF` 目录，下边在新建 `services` 文件夹，再新建一个名字我 `ch.qos.logback.classic.spi.Configurator` 的文件，

内容是：`com.ydlclass.MyConfigurator`

![img](./img/1713933038082-7ff150b5-67a9-4283-9c29-6b0246d1f2b4.png)

### 三、三大组件

1、**appender**，输出源，一个日志可以后好几个输出源

2、**encoder**，一个 appender 有一个 encoder，负责将一个 event 事件转换成一组 byte 数组，并将转换后的字节数据输出到文件中。

Encoder 负责把事件转换为字节数组，并把字节数组写到合适的输出流。因此，encoder 可以控制在什么时候、把什么样的字节数组写入到其拥有者维护的输出流中。Encoder 接口有两个实现类，LayoutWrappingEncoder 与 PatternLayoutEncoder。

注意：在 _logback 0.9.19_ 版之前没有 encoder。

在之前的版本里，多数 appender 依靠 layout 来把事件转换成字符串并用 java\.io\.Writer 把字符串输出。在之前的版本里，用户需要在 FileAppender 里嵌入一个 PatternLayout。

3、**layout**，格式化数据将 event 事件转化为字符串，解析的过程

4、filter 过滤器

```java
LevelFilter levelFilter = new LevelFilter();
        levelFilter.setOnMatch(FilterReply.DENY);
        levelFilter.setLevel(Level.WARN);
        levelFilter.start();
        ca.addFilter(levelFilter);
```

1. `%-5level`
2. `%d{yyyy-MM-dd HH:mm:ss.SSS}日期`
3. `%c 类的完整名称`
4. `%M 为 method`
5. %L 为行号
6. `%thread 线程名称`
7. `%m 或者%msg 为信息`
8. `%n 换行`

能看到 logback 的格式化信息

```java
public class PatternLayout extends PatternLayoutBase<ILoggingEvent> {

    public static final Map<String, String> defaultConverterMap = new HashMap<String, String>();
    public static final String HEADER_PREFIX = "#logback.classic pattern: ";

    static {
        defaultConverterMap.putAll(Parser.DEFAULT_COMPOSITE_CONVERTER_MAP);

        defaultConverterMap.put("d", DateConverter.class.getName());
        defaultConverterMap.put("date", DateConverter.class.getName());

        defaultConverterMap.put("r", RelativeTimeConverter.class.getName());
        defaultConverterMap.put("relative", RelativeTimeConverter.class.getName());

        defaultConverterMap.put("level", LevelConverter.class.getName());
        defaultConverterMap.put("le", LevelConverter.class.getName());
        defaultConverterMap.put("p", LevelConverter.class.getName());

        defaultConverterMap.put("t", ThreadConverter.class.getName());
        defaultConverterMap.put("thread", ThreadConverter.class.getName());

        defaultConverterMap.put("lo", LoggerConverter.class.getName());
        defaultConverterMap.put("logger", LoggerConverter.class.getName());
        defaultConverterMap.put("c", LoggerConverter.class.getName());

        defaultConverterMap.put("m", MessageConverter.class.getName());
        defaultConverterMap.put("msg", MessageConverter.class.getName());
        defaultConverterMap.put("message", MessageConverter.class.getName());

        defaultConverterMap.put("C", ClassOfCallerConverter.class.getName());
        defaultConverterMap.put("class", ClassOfCallerConverter.class.getName());

        defaultConverterMap.put("M", MethodOfCallerConverter.class.getName());
        defaultConverterMap.put("method", MethodOfCallerConverter.class.getName());

        defaultConverterMap.put("L", LineOfCallerConverter.class.getName());
        defaultConverterMap.put("line", LineOfCallerConverter.class.getName());

        defaultConverterMap.put("F", FileOfCallerConverter.class.getName());
        defaultConverterMap.put("file", FileOfCallerConverter.class.getName());

        defaultConverterMap.put("X", MDCConverter.class.getName());
        defaultConverterMap.put("mdc", MDCConverter.class.getName());

        defaultConverterMap.put("ex", ThrowableProxyConverter.class.getName());
        defaultConverterMap.put("exception", ThrowableProxyConverter.class.getName());
        defaultConverterMap.put("rEx", RootCauseFirstThrowableProxyConverter.class.getName());
        defaultConverterMap.put("rootException", RootCauseFirstThrowableProxyConverter.class.getName());
        defaultConverterMap.put("throwable", ThrowableProxyConverter.class.getName());

        defaultConverterMap.put("xEx", ExtendedThrowableProxyConverter.class.getName());
        defaultConverterMap.put("xException", ExtendedThrowableProxyConverter.class.getName());
        defaultConverterMap.put("xThrowable", ExtendedThrowableProxyConverter.class.getName());

        defaultConverterMap.put("nopex", NopThrowableInformationConverter.class.getName());
        defaultConverterMap.put("nopexception", NopThrowableInformationConverter.class.getName());

        defaultConverterMap.put("cn", ContextNameConverter.class.getName());
        defaultConverterMap.put("contextName", ContextNameConverter.class.getName());

        defaultConverterMap.put("caller", CallerDataConverter.class.getName());

        defaultConverterMap.put("marker", MarkerConverter.class.getName());

        defaultConverterMap.put("property", PropertyConverter.class.getName());

        defaultConverterMap.put("n", LineSeparatorConverter.class.getName());

        defaultConverterMap.put("black", BlackCompositeConverter.class.getName());
        defaultConverterMap.put("red", RedCompositeConverter.class.getName());
        defaultConverterMap.put("green", GreenCompositeConverter.class.getName());
        defaultConverterMap.put("yellow", YellowCompositeConverter.class.getName());
        defaultConverterMap.put("blue", BlueCompositeConverter.class.getName());
        defaultConverterMap.put("magenta", MagentaCompositeConverter.class.getName());
        defaultConverterMap.put("cyan", CyanCompositeConverter.class.getName());
        defaultConverterMap.put("white", WhiteCompositeConverter.class.getName());
        defaultConverterMap.put("gray", GrayCompositeConverter.class.getName());
        defaultConverterMap.put("boldRed", BoldRedCompositeConverter.class.getName());
        defaultConverterMap.put("boldGreen", BoldGreenCompositeConverter.class.getName());
        defaultConverterMap.put("boldYellow", BoldYellowCompositeConverter.class.getName());
        defaultConverterMap.put("boldBlue", BoldBlueCompositeConverter.class.getName());
        defaultConverterMap.put("boldMagenta", BoldMagentaCompositeConverter.class.getName());
        defaultConverterMap.put("boldCyan", BoldCyanCompositeConverter.class.getName());
        defaultConverterMap.put("boldWhite", BoldWhiteCompositeConverter.class.getName());
        defaultConverterMap.put("highlight", HighlightingCompositeConverter.class.getName());

        defaultConverterMap.put("lsn", LocalSequenceNumberConverter.class.getName());

    }

    public PatternLayout() {
        this.postCompileProcessor = new EnsureExceptionHandling();
    }

    public Map<String, String> getDefaultConverterMap() {
        return defaultConverterMap;
    }

    public String doLayout(ILoggingEvent event) {
        if (!isStarted()) {
            return CoreConstants.EMPTY_STRING;
        }
        return writeLoopOnConverters(event);
    }

    @Override
    protected String getPresentationHeaderPrefix() {
        return HEADER_PREFIX;
    }
}
OutputStreamAppender
protected void subAppend(E event) {
        if (!isStarted()) {
            return;
        }
        try {
            // this step avoids LBCLASSIC-139
            if (event instanceof DeferredProcessingAware) {
                ((DeferredProcessingAware) event).prepareForDeferredProcessing();
            }
            // the synchronization prevents the OutputStream from being closed while we
            // are writing. It also prevents multiple threads from entering the same
            // converter. Converters assume that they are in a synchronized block.
            // lock.lock();

            byte[] byteArray = this.encoder.encode(event);
            writeBytes(byteArray);

        } catch (IOException ioe) {
            // as soon as an exception occurs, move to non-started state
            // and add a single ErrorStatus to the SM.
            this.started = false;
            addStatus(new ErrorStatus("IO failure in appender", this, ioe));
        }
    }
public byte[] encode(E event) {
        String txt = layout.doLayout(event);
        return convertToBytes(txt);
    }
private void buildLoggingEventAndAppend(final String localFQCN, final Marker marker, final Level level, final String msg, final Object[] params,
                                        final Throwable t) {
    LoggingEvent le = new LoggingEvent(localFQCN, this, level, msg, t, params);
    le.setMarker(marker);
    callAppenders(le);
}
```

### 四、logback 配置

Let us begin by discussing the initialization steps that logback follows to try to configure itself:

1. Logback tries to find a file called _logback-test.xml_ [in the classpath](http://logback.qos.ch/faq.html#configFileLocation).
2. If no such file is found, logback tries to find a file called _logback.groovy_ [in the classpath](http://logback.qos.ch/faq.html#configFileLocation).
3. If no such file is found, it checks for the file _logback.xml_ [in the classpath](http://logback.qos.ch/faq.html#configFileLocation)..
4. If no such file is found, [service-provider loading facility](http://docs.oracle.com/javase/6/docs/api/java/util/ServiceLoader.html) (introduced in JDK 1.6) is used to resolve the implementation of [`com.qos.logback.classic.spi.Configurator`](http://logback.qos.ch/xref/ch/qos/logback/classic/spi/Configurator.html) interface by looking up the file _META-INF\\services\\ch\.qos\.logback\.classic\.spi\.Configurator_ in the class path. Its contents should specify the fully qualified class name of the desired `Configurator` implementation.
5. If none of the above succeeds, logback configures itself automatically using the [`BasicConfigurator`](http://logback.qos.ch/xref/ch/qos/logback/classic/BasicConfigurator.html) which will cause logging output to be directed to the console.
6. 基本配置信息

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>

    <!--格式化输出：%d表示日期，%thread表示线程名，%-5level：级别从左显示5个字符宽度
    %msg：日志消息，%n是换行符-->
    <property name="pattern" value="%d{yyyy-MM-dd HH:mm:ss.SSS} %c [%thread]
                                    %-5level %msg%n"/>
    <!--
    	Appender: 设置日志信息的去向,常用的有以下几个
        ch.qos.logback.core.ConsoleAppender (控制台)
        ch.qos.logback.core.rolling.RollingFileAppender (文件大小到达指定尺寸的时候产生一个新文件)
        ch.qos.logback.core.FileAppender (文件)
        -->
    <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
        <!--输出流对象 默认 System.out 改为 System.err-->
        <target>System.err</target>
        <!--日志格式配置-->
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
    </appender>
    <!--
  用来设置某一个包或者具体的某一个类的日志打印级别、以及指定<appender>。
                    <loger>仅有一个name属性，一个可选的level和一个可选的addtivity属性
                    name:
        用来指定受此logger约束的某一个包或者具体的某一个类。
            level:
        用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL 和
            OFF，
            如果未设置此属性，那么当前logger将会继承上级的级别。
            additivity:
        是否向上级loger传递打印信息。默认是true。
            <logger>可以包含零个或多个<appender-ref>元素，标识这个appender将会添加到这个
            logger
            -->
    <!--
            也是<logger>元素，但是它是根logger。默认debug
            level:用来设置打印级别，大小写无关：TRACE, DEBUG, INFO, WARN, ERROR, ALL
                和 OFF，
                <root>可以包含零个或多个<appender-ref>元素，标识这个appender将会添加到这个
                logger。
        -->
    <root level="ALL">
        <appender-ref ref="console"/>
    </root>
</configuration>
```

1. FileAppender 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- 自定义属性 可以通过${name}进行引用-->
    <property name="pattern" value="[%-5level] %d{yyyy-MM-dd HH:mm:ss} %c %M
                                    %L [%thread] %m %n"/>
    <!--
    日志输出格式：
    %d{pattern}日期
    %m或者%msg为信息
    %M为method
    %L为行号
    %c类的完整名称
    %thread线程名称
    %n换行
    %-5level
    -->
    <!-- 日志文件存放目录 -->
    <property name="log_dir" value="d:/logs"></property>
    <!--控制台输出appender对象-->
    <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
        <!--输出流对象 默认 System.out 改为 System.err-->
        <target>System.err</target>
        <!--日志格式配置-->
        <encoder
                 class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
    </appender>
    <!--日志文件输出appender对象-->
    <appender name="file" class="ch.qos.logback.core.FileAppender">
        <!--日志格式配置-->
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
        <!--日志输出路径-->
        <file>${log_dir}/logback.log</file>
    </appender>
    <!-- 生成html格式appender对象 -->
    <appender name="htmlFile" class="ch.qos.logback.core.FileAppender">
        <!--日志格式配置-->
        <encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
            <layout class="ch.qos.logback.classic.html.HTMLLayout">
                <pattern>%level%d{yyyy-MM-dd HH:mm:ss}%c%M%L%thread%m</pattern>
            </layout>
        </encoder>
        <!--日志输出路径-->
        <file>${log_dir}/logback.html</file>
    </appender>
    <!--RootLogger对象-->
    <root level="all">
        <appender-ref ref="console"/>
        <appender-ref ref="file"/>
        <appender-ref ref="htmlFile"/>
    </root>
</configuration>
```

1. RollingFileAppender 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- 自定义属性 可以通过${name}进行引用-->
    <property name="pattern" value="[%-5level] %d{yyyy-MM-dd HH:mm:ss} %c %M
                                    %L [%thread] %m %n"/>
    <!--
    日志输出格式：
    %d{pattern}日期
    %m或者%msg为信息
    %M为method
    %L为行号
    %c类的完整名称
    %thread线程名称
    %n换行
    %-5level
    -->
    <!-- 日志文件存放目录 -->
    <property name="log_dir" value="d:/logs"></property>
    <!--控制台输出appender对象-->
    <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
        <!--输出流对象 默认 System.out 改为 System.err-->
        <target>System.err</target>
        <!--日志格式配置-->
        <encoder
                 class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
    </appender>
    <!-- 日志文件拆分和归档的appender对象-->
    <appender name="rollFile"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!--日志格式配置-->
        <encoder
                 class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
        <!--日志输出路径-->
        <file>${log_dir}/roll_logback.log</file>
        <!--指定日志文件拆分和压缩规则-->
        <rollingPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!--通过指定压缩文件名称，来确定分割文件方式-->
            <fileNamePattern>${log_dir}/rolling.%d{yyyy-MMdd}.log%i.gz</fileNamePattern>
            <!--文件拆分大小-->
            <maxFileSize>1MB</maxFileSize>
        </rollingPolicy>
    </appender>
    <!--RootLogger对象-->
    <root level="all">
        <appender-ref ref="console"/>
        <appender-ref ref="rollFile"/>
    </root>
</configuration>
```

1. Filter 和异步日志配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- 自定义属性 可以通过${name}进行引用-->
    <property name="pattern" value="[%-5level] %d{yyyy-MM-dd HH:mm:ss} %c %M
                                    %L [%thread] %m %n"/>
    <!--
    日志输出格式：
    %d{pattern}日期
    %m或者%msg为信息
    %M为method
    %L为行号
    %c类的完整名称
    %thread线程名称
    %n换行
    %-5level
    -->
    <!-- 日志文件存放目录 -->
    <property name="log_dir" value="d:/logs/"></property>
    <!--控制台输出appender对象-->
    <appender name="console" class="ch.qos.logback.core.ConsoleAppender">
        <!--输出流对象 默认 System.out 改为 System.err-->
        <target>System.err</target>
        <!--日志格式配置-->
        <encoder
                 class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
    </appender>
    <!-- 日志文件拆分和归档的appender对象-->
    <appender name="rollFile"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <!--日志格式配置-->
        <encoder
                 class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
        <!--日志输出路径-->
        <file>${log_dir}roll_logback.log</file>
        <!--指定日志文件拆分和压缩规则-->
        <rollingPolicy
                       class="ch.qos.logback.core.rolling.SizeAndTimeBasedRollingPolicy">
            <!--通过指定压缩文件名称，来确定分割文件方式-->
            <fileNamePattern>${log_dir}rolling.%d{yyyy-MMdd}.log%i.gz</fileNamePattern>
            <!--文件拆分大小-->
            <maxFileSize>1MB</maxFileSize>
        </rollingPolicy>
        <!--filter配置-->
        <filter class="ch.qos.logback.classic.filter.LevelFilter">
            <!--设置拦截日志级别-->
            <level>error</level>
            <onMatch>ACCEPT</onMatch>
            <onMismatch>DENY</onMismatch>
        </filter>
    </appender>
    <!--异步日志-->
    <appender name="async" class="ch.qos.logback.classic.AsyncAppender">
        <appender-ref ref="rollFile"/>
    </appender>
    <!--RootLogger对象-->
    <root level="all">
        <appender-ref ref="console"/>
        <appender-ref ref="async"/>
    </root>
    <!--自定义logger additivity表示是否从 rootLogger继承配置-->
    <logger name="com.ydlclass" level="debug" additivity="false">
        <appender-ref ref="console"/>
    </logger>
</configuration>
```

### 五、logback-access 的使用

在 `server.xml` 里的标签下加上

```xml
<Valve className="org.apache.catalina.valves.AccessLogValve"  directory="logs" prefix="localhost_access_log." suffix=".txt"  pattern="common" resolveHosts="false"/>
```

就可以了，下面咱们逐一分析各个参数。

| className    | 想配置访问日志？这就必须得写成这样。                                                                                         |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| directory    | 这个东西是日志文件放置的目录，在 tomcat 下面有个 logs 文件夹，那里面是专门放置日志文件的，当然你也可以修改，我就给改成了 D:\ |
| prefix       | 这个是日志文件的名称前缀，我的日志名称为 localhost_access_log.2007-09-22.txt，前面的前缀就是这个 localhost_access_log        |
| suffix       | 这就是后缀名啦，可以改成别的                                                                                                 |
| pattern      | 这个是最主要的参数了，具体的咱们下面讲，这个参数的内容比较丰富。                                                             |
| resolveHosts | 如果这个值是 true 的话，tomcat 会将这个服务器 IP 地址通过 DNS 转换为主机名，如果是 false，就直接写服务器 IP 地址啦           |

To use logback-access with Tomcat, after downloading the logback distribution, place the files _logback-core-1.3.0-alpha10.jar_ and _logback-access-1.3.0-alpha10.jar_ under `$TOMCAT_HOME/lib/` directory, where `$TOMCAT_HOME` is the folder where you have installed Tomcat.

logback-access 模块与 Servlet 容器（如 Tomcat 和 Jetty）集成，以提供 HTTP 访问日志功能。我们可以使 用 logback-access 模块来替换 tomcat 的访问日志。

1. 将 logback-access.jar 与 logback-core.jar 复制到 `$TOMCAT_HOME/lib/` 目录下
2. 修改 `$TOMCAT_HOME/conf/server.xml` 中的 Host 元素中添加：

```java
<Valve className="ch.qos.logback.access.tomcat.LogbackValve"/>
```

1. logback 默认会在 `$TOMCAT_HOME/conf` 下查找文件 `logback-access.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <!-- always a good activate OnConsoleStatusListener -->
    <statusListener
                    class="ch.qos.logback.core.status.OnConsoleStatusListener"/>
    <property name="LOG_DIR" value="${catalina.base}/logs"/>
    <appender name="FILE"
              class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>${LOG_DIR}/access.log</file>
        <rollingPolicy
                       class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>access.%d{yyyy-MM-dd}.log.zip</fileNamePattern>
        </rollingPolicy>
        <encoder>
            <!-- 访问日志的格式 -->
            <pattern>combined</pattern>
        </encoder>
    </appender>
    <appender-ref ref="FILE"/>
</configuration>
%h %l %u %user %date "%r" %s %b
```

官方配置： <https://logback.qos.ch/access.html#configuration>

![img](./img/1713933038174-05dd6c1c-98d6-493c-9112-510ccc7e2917.png)

![img](./img/1713933038301-7ec53bd2-1d48-4646-9b2d-4565903e522b.png)

## 第六章 log4j2 的使用

Apache Log4j2 是对 Log4j 的升级版，参考了 logback 的一些优秀的设计，并且修复了一些问题，因此带来了一些重大的提升，主要有：

- 异常处理，在 logback 中，Appender 中的异常不会被应用感知到，但是在 log4j2 中，提供了一些异常处理机制。
- 性能提升， log4j2 相较于 log4j 和 logback 都具有很明显的性能提升，后面会有官方测试的数据。
- 自动重载配置，参考了 logback 的设计，当然会提供自动刷新参数配置，最实用的就是我们在生产 上可以动态的修改日志的级别而不需要重启应用。

官网： <https://logging.apache.org/log4j/2.x/>

### 一、Log4j2 入门

目前已经有三个门面了，其实不管是哪里都是江湖，都想写一个门面，一统江湖，所以 log42 出了提供日志实现以外，也拥有一套自己的独立的门面。

目前市面上最主流的日志门面就是 SLF4J，虽然 Log4j2 也是日志门面，因为它的日志实现功能非常强大，性能优越。所以大家一般还是将 Log4j2 看作是日志的实现，Slf4j + Log4j2 应该是未来的大势所趋。

#### 1、使用 log4j-api 做门面

（1）添加依赖

```xml
<!-- Log4j2 门面API-->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>2.14.1</version>
</dependency>
<!-- Log4j2 日志实现 -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.14.1</version>
</dependency>
```

（2）JAVA 代码

```java
public class TestLog4j2 {

    private static final Logger LOGGER = LogManager.getLogger(TestLog4j2.class);

    @Test
    public void testLog(){
        LOGGER.fatal("fatal");
        LOGGER.error("error");
        LOGGER.warn("warn");
        LOGGER.info("info");
        LOGGER.debug("debug");
        LOGGER.trace("trace");
    }

}
```

结果：

![img](./img/1713933038373-488990cd-e243-47f9-b1ee-7ed04caf868c.png)

#### 2、使用 slf4j 做门面

使用 slf4j 作为日志的门面，使用 log4j2 作为日志的实现。

```xml
<!-- Log4j2 门面API-->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-api</artifactId>
    <version>2.14.1</version>
</dependency>
<!-- Log4j2 日志实现 -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.14.1</version>
</dependency>
<!--使用slf4j作为日志的门面,使用log4j2来记录日志 -->
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.7.30</version>
</dependency>
<!--为slf4j绑定日志实现 log4j2的适配器 -->
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-slf4j-impl</artifactId>
    <version>2.12.1</version>
</dependency>
```

> [!TIP]
>
> 仅需 `log4j-slf4j2-impl`  的依赖即可，其它的依赖已被包含。

```java
private static final org.slf4j.Logger LOG = LoggerFactory.getLogger(TestLog4j2.class);

@Test
public void testSlf4j(){
    LOG.error("error");
    LOG.warn("warn");
    LOG.debug("debug");
    LOG.info("info");
    LOG.trace("trace");
}
```

结果：

![img](./img/1713933038494-e1fd378b-cabd-48f1-8c01-86b2af506585.png)

我们看到 log4j2 的默认日志级别好像是 error。

### 二、Log4j2 配置

#### 1、默认配置

DefaultConfiguration 类中提供的默认配置将设置，

通过 debug 可以在 LoggerContext 类中发现

```java
private volatile Configuration configuration = new DefaultConfiguration();
```

可以看到默认的 root 日志的 layout

![img](./img/1713933038594-fa4d2c6b-aedb-4eb0-bf0f-64dbd1e2f551.png)

我们也能看到他的日志级别：

![img](./img/1713933038660-2d43adfe-6f53-4a62-9950-2511a96e041e.png)

我们能从默认配置类中看到一些默认的配置：

```java
protected void setToDefault() {
    // LOG4J2-1176 facilitate memory leak investigation
    setName(DefaultConfiguration.DEFAULT_NAME + "@" + Integer.toHexString(hashCode()));
    final Layout<? extends Serializable> layout = PatternLayout.newBuilder()
        .withPattern(DefaultConfiguration.DEFAULT_PATTERN)
        .withConfiguration(this)
        .build();
    final Appender appender = ConsoleAppender.createDefaultAppenderForLayout(layout);
    appender.start();
    addAppender(appender);
    final LoggerConfig rootLoggerConfig = getRootLogger();
    rootLoggerConfig.addAppender(appender, null, null);

    final Level defaultLevel = Level.ERROR;
    final String levelName = PropertiesUtil.getProperties().getStringProperty(DefaultConfiguration.DEFAULT_LEVEL,
                                                                              defaultLevel.name());
    final Level level = Level.valueOf(levelName);
    rootLoggerConfig.setLevel(level != null ? level : defaultLevel);
}
```

5 自定义配置文件位置

log4j2 默认在 classpath 下查找配置文件，可以修改配置文件的位置。在非 web 项目中：

```java
public static void main(String[] args) throws IOException {
 File file = new File("D:/log4j2.xml");
 BufferedInputStream in = new BufferedInputStream(new FileInputStream(file));
 final ConfigurationSource source = new ConfigurationSource(in);
 Configurator.initialize(null, source);

 Logger logger = LogManager.getLogger("mylog");
}
```

如果是 web 项目，在 `web.xml` 中添加

```xml
<context-param>
    <param-name>log4jConfiguration</param-name>
    <param-value>/WEB-INF/conf/log4j2.xml</param-value>
</context-param>
<listener>
    <listener-class>org.apache.logging.log4j.web.Log4jServletContextListener</listener-class>
</listener>
```

log4j2 默认加载 classpath 下的 log4j2.xml 文件中的配置。事实上 log4j2 可以通过 XML、JSON、YAML 或 properties 格式进行配置：

<https://logging.apache.org/log4j/2.x/manual/configuration.html>

如果找不到配置文件，Log4j 将提供默认配置。DefaultConfiguration 类中提供的默认配置将设置：

- `%d{HH:mm:ss.SSS}` ，表示输出到毫秒的时间
- `%t`，输出当前线程名称
- `%-5level`，输出日志级别，-5 表示左对齐并且固定输出 5 个字符，如果不足在右边补 0
- `%logger`，输出 logger 名称，因为 Root Logger 没有名称，所以没有输出
- `%msg`，日志文本
- `%n`，换行

其他常用的占位符有：

- `%F`，输出所在的类文件名，如 Client\.java
- `%L`，输出行号
- `%M`，输出所在方法名
- `%l`，输出语句所在的行数, 包括类名、方法名、文件名、行数

```java
private void reconfigure(final URI configURI) {
    Object externalContext = externalMap.get(EXTERNAL_CONTEXT_KEY);
    final ClassLoader cl = ClassLoader.class.isInstance(externalContext) ? (ClassLoader) externalContext : null;
    LOGGER.debug("Reconfiguration started for context[name={}] at URI {} ({}) with optional ClassLoader: {}",
                 contextName, configURI, this, cl);
    final Configuration instance = ConfigurationFactory.getInstance().getConfiguration(this, contextName, configURI, cl);
    if (instance == null) {
        LOGGER.error("Reconfiguration failed: No configuration found for '{}' at '{}' in '{}'", contextName, configURI, cl);
    } else {
        setConfiguration(instance);
        /*
             * instance.start(); Configuration old = setConfiguration(instance); updateLoggers(); if (old != null) {
             * old.stop(); }
             */
        final String location = configuration == null ? "?" : String.valueOf(configuration.getConfigurationSource());
        LOGGER.debug("Reconfiguration complete for context[name={}] at URI {} ({}) with optional ClassLoader: {}",
                     contextName, location, this, cl);
    }
}
ConfigurationFactory
for (final ConfigurationFactory factory : getFactories()) {
    final String[] types = factory.getSupportedTypes();
    if (types != null) {
        for (final String type : types) {
            if (type.equals(ALL_TYPES)) {
                final Configuration config = factory.getConfiguration(loggerContext, name, configLocation);
                if (config != null) {
                    return config;
                }
            }
        }
    }
}
```

![img](./img/1713933038745-4fc9ecf6-525a-4bd0-8895-172d78bb1c9d.png)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="warn" monitorInterval="5">
    <properties>
        <property name="LOG_HOME">D:/logs</property>
    </properties>
    <Appenders>
        <Console name="Console" target="SYSTEM_OUT">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] [%-5level] %c{36}:%L -
                                    -- %m%n" />
        </Console>
        <File name="file" fileName="${LOG_HOME}/myfile.log">
            <PatternLayout pattern="[%d{yyyy-MM-dd HH:mm:ss.SSS}] [%-5level] %l
                                    %c{36} - %m%n" />
        </File>
        <RandomAccessFile name="accessFile" fileName="${LOG_HOME}/myAcclog.log">
            <PatternLayout pattern="[%d{yyyy-MM-dd HH:mm:ss.SSS}] [%-5level] %l
                                    %c{36} - %m%n" />
        </RandomAccessFile>
        <RollingFile name="rollingFile" fileName="${LOG_HOME}/myrollog.log"
                     filePattern="D:/logs/$${date:yyyy-MM-dd}/myrollog-%d{yyyyMM-dd-HH-mm}-%i.log">
            <ThresholdFilter level="debug" onMatch="ACCEPT" onMismatch="DENY" />
            <PatternLayout pattern="[%d{yyyy-MM-dd HH:mm:ss.SSS}] [%-5level] %l
                                    %c{36} - %msg%n" />
            <Policies>
                <OnStartupTriggeringPolicy />
                <SizeBasedTriggeringPolicy size="10 MB" />
                <TimeBasedTriggeringPolicy />
            </Policies>
            <DefaultRolloverStrategy max="30" />
        </RollingFile>
        <RollingRandomAccessFile name="MyFile"
   fileName="${LOG_HOME}/${FILE_NAME}.log"
   filePattern="${LOG_HOME}/$${date:yyyy-MM}/${FILE_NAME}-%d{yyyy-MM-dd HH-mm}-%i.log">
   <PatternLayout
    pattern="%d{yyyy-MM-dd HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n" />
   <Policies>
    <TimeBasedTriggeringPolicy interval="1" />
    <SizeBasedTriggeringPolicy size="10 MB" />
   </Policies>
   <DefaultRolloverStrategy max="20" />
  </RollingRandomAccessFile>
    </Appenders>
    <Loggers>
        <Logger name="mylog" level="trace" additivity="false">
   <AppenderRef ref="MyFile" />
  </Logger>
  <Root level="error">
   <AppenderRef ref="Console" />
  </Root>
    </Loggers>
</Configuration>
```

注意根节点增加了一个 monitorInterval 属性，含义是每隔 300 秒重新读取配置文件，可以不重启应用的情况下修改配置，还是很好用的功能。

RollingRandomAccessFile 的属性：

- **fileName** 指定当前日志文件的位置和文件名称
- **filePattern** 指定当发生 Rolling 时，文件的转移和重命名规则
- **SizeBasedTriggeringPolicy** 指定当文件体积大于 size 指定的值时，触发 Rolling
- **DefaultRolloverStrategy** 指定最多保存的文件个数
- **TimeBasedTriggeringPolicy** 这个配置需要和 filePattern 结合使用，
- 注意 filePattern 中配置的文件重命名规则是`${FILE_NAME}-%d{yyyy-MM-dd HH-mm}-%i`，最小的时间粒度是 mm，即分钟。
- **TimeBasedTriggeringPolicy** 指定的 size 是 1，结合起来就是每 1 分钟生成一个新文件。如果改成 `%d{yyyy-MM-dd HH}`，最小粒度为小时，则每一个小时生成一个文件。

### 三、Log4j2 异步日志

**异步日志**

log4j2 最大的特点就是异步日志，其性能的提升主要也是从异步日志中受益，我们来看看如何使用 log4j2 的异步日志。

- **同步日志**

![img](./img/1713933038868-fd3c4fba-cf23-4f48-b77f-05404930884b.png)

- **异步日志**

![img](./img/1713933038966-0248659a-23ee-484d-ae51-95ca96383918.png)

![img](./img/1713933039055-c6d28243-7cf7-4e2c-aa43-0a6d28fb2c29.png)

Log4j2 提供了两种实现日志的方式，一个是通过 AsyncAppender，一个是通过 AsyncLogger，分别对应 前面我们说的 Appender 组件和 Logger 组件。

注意：配置异步日志需要添加依赖

```xml
<!--异步日志依赖-->
<dependency>
    <groupId>com.lmax</groupId>
    <artifactId>disruptor</artifactId>
    <version>3.3.4</version>
</dependency>
```

1. AsyncAppender 方式

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="warn">
    <properties>
        <property name="LOG_HOME">D:/logs</property>
    </properties>
    <Appenders>
        <File name="file" fileName="${LOG_HOME}/myfile.log">
            <PatternLayout>
                <Pattern>%d %p %c{1.} [%t] %m%n</Pattern>
            </PatternLayout>
        </File>
        <Async name="Async">
            <AppenderRef ref="file"/>
        </Async>
    </Appenders>
    <Loggers>
        <Root level="error">
            <AppenderRef ref="Async"/>
        </Root>
    </Loggers>
</Configuration>
```

1. AsyncLogger 方式

AsyncLogger 才是 log4j2 的重头戏，也是官方推荐的异步方式。它可以使得调用 Logger.log 返回的 更快。你可以有两种选择：全局异步和混合异步。

- **全局异步**就是，所有的日志都异步的记录，在配置文件上不用做任何改动，只需要添加一个 `log4j2.component.properties` 配置；

```properties
Log4jContextSelector=org.apache.logging.log4j.core.async.AsyncLoggerContextSelector
```

- **混合异步**就是，你可以在应用中同时使用同步日志和异步日志，这使得日志的配置方式更加灵活。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Configuration status="WARN">
    <properties>
        <property name="LOG_HOME">D:/logs</property>
    </properties>
    <Appenders>
        <File name="file" fileName="${LOG_HOME}/myfile.log">
            <PatternLayout>
                <Pattern>%d %p %c{1.} [%t] %m%n</Pattern>
            </PatternLayout>
        </File>
        <Async name="Async">
            <AppenderRef ref="file"/>
        </Async>
    </Appenders>
    <Loggers>
        <AsyncLogger name="com.ydlclass" level="trace"
                     includeLocation="false" additivity="false">
            <AppenderRef ref="file"/>
        </AsyncLogger>
        <Root level="info" includeLocation="true">
            <AppenderRef ref="file"/>
        </Root>
    </Loggers>
</Configuration>
```

如上配置： com.ydlclass 日志是异步的，root 日志是同步的。

使用异步日志需要注意的问题：

1. 如果使用异步日志，AsyncAppender、AsyncLogger 和全局日志，不要同时出现。性能会和 AsyncAppender 一致，降至最低。
2. 设置 `includeLocation=false` ，打印位置信息会急剧降低异步日志的性能，比同步日志还要慢。

```java
for (int i = 0; i < 1000000; i++) {
    LOGGER.fatal("fatal");
}

long end = System.currentTimeMillis();
System.out.println(end - start);

2970
```

Log4j2 的性能

log4j 官网对其性能进行大肆宣扬，但是网上也有专业认识进行测试，log4j 在大量日志的情况下有一定的优势，他确实是日后的选择。但是也不必纠结。

![img](./img/1713933039204-dfd0a108-f1d0-455a-b354-959080a4d99c.png)

[Log4j – Performance (apache.org)](http://logging.apache.org/log4j/2.x/performance.html#asyncLogging)

## 第七章：怎么打日志

基本格式

必须使用参数化信息的方式:

```java
logger.debug("Processing trade with id:[{}] and symbol : [{}] ", id, symbol);
```

不要进行字符串拼接,那样会产生很多 String 对象，占用空间，影响性能。反例(不要这么做):

```java
logger.debug("Processing trade with id: " + id + " symbol: " + symbol);
```

使用[]进行参数变量隔离，如有参数变量，应该写成如下写法:

```java
logger.debug("Processing trade with id:[{}] and symbol : [{}] ", id, symbol);
```

这样的格式写法，可读性更好，对于排查问题更有帮助。不同级别的使用

ERROR，影响到程序正常运行、当前请求正常运行的异常情况:

- 打开配置文件失败
- 所有第三方对接的异常(包括第三方返回错误码)
- 所有影响功能使用的异常，包括: SQLException 和除了业务异常之外的所有异常(RuntimeException 和 Exception)
- 不应该出现的情况，比如要使用阿里云传图片，但是未响应
- 如果有 Throwable 信息，需要记录完成的堆栈信息:

```java
log.error("获取用户[{}]的用户信息时出错",userName,e);
```

说明，如果进行了抛出异常操作，请不要记录 error 日志，由最终处理方进行处理：

反例(不要这么做):

```java
try {
    ....
} catch(Exception ex) {
    String errorMessage=String.format("Error while reading information of user [%s]",userName);
    logger.error(errorMessage,ex);
    throw new UserServiceException(errorMessage,ex);
}
```

WARN，不应该出现但是不影响程序、当前请求正常运行的异常情况:

1. 有容错机制的时候出现的错误情况
2. 找不到配置文件，但是系统能自动创建配置文件
3. 即将接近临界值的时候，例如：缓存池占用达到警告线，业务异常的记录，比如:用户锁定异常

INFO，系统运行信息

1. Service 方法中对于系统/业务状态的变更
2. 主要逻辑中的分步骤：1，初始化什么 2、加载什么
3. 外部接口部分
4. 客户端请求参数(REST/WS)
5. 调用第三方时的调用参数和调用结果
6. 对于复杂的业务逻辑，需要进行日志打点，以及埋点记录，比如电商系统中的下订单逻辑，以及 OrderAction 操作(业务状态变更)。
7. 调用其他第三方服务时，所有的出参和入参是必须要记录的(因为你很难追溯第三方模块发生的问题)

说明
并不是所有的 service 都进行出入口打点记录,单一、简单 service 是没有意义的(job 除外,job 需要记录开始和结束,)。反例(不要这么做):

```java
public List listByBaseType(Integer baseTypeId) {
    log.info("开始查询基地");
    BaseExample ex=new BaseExample();
    BaseExample.Criteria ctr = ex.createCriteria();
    ctr.andIsDeleteEqualTo(IsDelete.USE.getValue());
    Optionals.doIfPresent(baseTypeId, ctr::andBaseTypeIdEqualTo);
    log.info("查询基地结束");
    return baseRepository.selectByExample(ex);
}
```

DEBUG，可以填写所有的想知道的相关信息(但不代表可以随便写，debug 信息要有意义,最好有相关参数)

生产环境需要关闭 DEBUG 信息

如果在生产情况下需要开启 DEBUG,需要使用开关进行管理，不能一直开启。

说明
如果代码中出现以下代码，可以进行优化:

1. 获取用户基本薪资
2. 获取用户休假情况
3. 计算用户应得薪资

```java
logger.debug("开始获取员工[{}] [{}]年基本薪资",employee,year);
logger.debug("获取员工[{}] [{}]年的基本薪资为[{}]",employee,year,basicSalary);
logger.debug("开始获取员工[{}] [{}]年[{}]月休假情况",employee,year,month);
logger.debug("员工[{}][{}]年[{}]月年假/病假/事假为[{}]/[{}]/[{}]",employee,year,month,annualLeaveDays,sickLeaveDays,noPayLeaveDays);
logger.debug("开始计算员工[{}][{}]年[{}]月应得薪资",employee,year,month);
logger.debug("员工[{}] [{}]年[{}]月应得薪资为[{}]",employee,year,month,actualSalary);
```

TRACE，特别详细的系统运行完成信息，业务代码中，不要使用 '.' (除非有特殊用意，否则请使用 DEBUG 级别替代)

规范示例说明

```java
@Override
@Transactional
public void createUserAndBindMobile(@NotBlank String mobile, @NotNull User user) throws CreateConflictException{
    boolean debug = log.isDebugEnabled();
    if(debug){
        log.debug("开始创建用户并绑定手机号. args[mobile=[{}],user=[{}]]", mobile, LogObjects.toString(user));
    }
    try {
        user.setCreateTime(new Date());
        user.setUpdateTime(new Date());
        userRepository.insertSelective(user);
        if(debug){
            log.debug("创建用户信息成功. insertedUser=[{}]",LogObjects.toString(user));
        }
        UserMobileRelationship relationship = new UserMobileRelationship();
        relationship.setMobile(mobile);
        relationship.setOpenId(user.getOpenId());
        relationship.setCreateTime(new Date());
        relationship.setUpdateTime(new Date());
        userMobileRelationshipRepository.insertOnDuplicateKey(relationship);
        if(debug){
            log.debug("绑定手机成功. relationship=[{}]",LogObjects.toString(relationship));
        }
        log.info("创建用户并绑定手机号. userId=[{}],openId=[{}],mobile[{}]",user.getId(),user.getOpenId(),mobile);   // 如果考虑安全，手机号记得脱敏
    }catch(DuplicateKeyException e){
        log.info("创建用户并绑定手机号失败,已存在相同的用户. openId=[{}],mobile=[{}]",user.getOpenId(),mobile);
        throw new CreateConflictException("创建用户发生冲突, openid=[%s]",user.getOpenId());
    }
}
```
