import { linkEmits } from "element-plus";
import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  // 代码笔记的侧边栏
  "/codenotes/": [
    {
      text: "Web核心",
      icon: "code",
      collapsible: true,
      prefix: "/codenotes/web",
      children: [
        {
          text: "HTML",
          icon: "html",
          collapsible: true,
          prefix: "/codenotes/web/html/",
          children: [
            {
              text: "1、HTML基础",
              icon: "html",
              link: "html.md",
            },
            {
              text: "2、HTML5新增特性",
              icon: "html",
              link: "html5.md",
            },
            {
              text: "3、HTML预留字符",
              icon: "html",
              link: "html实体参考.md",
            },
          ],
        },
        {
          text: "CSS",
          icon: "css",
          collapsible: true,
          prefix: "/codenotes/web/css/",
          children: [
            {
              text: "1、CSS简介与选择器",
              icon: "css",
              link: "简介与选择器.md",
            },
            {
              text: "2、CSS三大特性",
              icon: "css",
              link: "三大特性.md",
            },
            {
              text: "3、CSS盒子模型",
              icon: "css",
              link: "css盒子模型.md",
            },
            {
              text: "4、CSS高级",
              icon: "css",
              link: "css高级.md",
            },
            {
              text: "5、CSS3新增特性",
              icon: "css",
              link: "新增特性.md",
            },
          ],
        },
        {
          text: "JavaScript",
          icon: "javascript",
          collapsible: true,
          prefix: "/codenotes/web/javascript/",
          children: [
            {
              text: "1、基础语法",
              icon: "javascript",
              link: "js基础语法.md",
            },
            {
              text: "2、内置对象",
              icon: "javascript",
              link: "内置对象.md",
            },
            {
              text: "3、DOM编程",
              icon: "javascript",
              link: "dom编程.md",
            },
            {
              text: "4、BOM编程",
              icon: "javascript",
              link: "bom编程.md",
            },
            {
              text: "5、事件",
              icon: "javascript",
              link: "事件.md",
            },
            {
              text: "6、语法深入",
              icon: "javascript",
              link: "语法深入.md",
            },
            {
              text: "7、原型",
              icon: "javascript",
              link: "原型.md",
            },
            {
              text: "8、正则表达式",
              icon: "javascript",
              link: "正则表达式.md",
            },
          ],
        },
        {
          text: "SEO优化",
          icon: "seo-filled",
          link: "seo.md",
        },
        {
          text: "Emmet语法",
          icon: "emmet",
          link: "emmet语法.md",
        },
      ],
    },
    {
      text: "Java",
      icon: "java",
      collapsible: true,
      children: [
        {
          text: "JavaSE",
          icon: "java",
          collapsible: true,
          prefix: "/codenotes/java/javase/",
          children: [
            {
              text: "1、java基础",
              icon: "computer-fill",
              link: "java基础.md",
            },
            {
              text: "2、流程控制语句",
              icon: "branch",
              link: "流程控制语句.md",
            },
            {
              text: "3、数组和算法",
              icon: "array",
              link: "数组和算法.md",
            },
            {
              text: "4、面向对象",
              icon: "class",
              link: "面向对象.md",
            },
            {
              text: "5、常用api",
              icon: "api",
              link: "常用api.md",
            },
            {
              text: "6、异常机制",
              icon: "debug",
              link: "异常机制.md",
            },
            {
              text: "7、泛型和枚举",
              icon: "enum",
              link: "泛型和枚举.md",
            },
            {
              text: "8、多线程",
              icon: "asynchronous",
              link: "多线程.md",
            },
            {
              text: "9、树",
              icon: "tree",
              link: "树.md",
            },
            {
              text: "10、集合框架",
              icon: "folder",
              link: "集合框架.md",
            },
            {
              text: "11、IO流",
              icon: "IO",
              link: "io流.md",
            },
            {
              text: "12、注解和反射",
              icon: "reflect-vertical",
              link: "注解和反射.md",
            },
            {
              text: "13、java网络编程",
              icon: "network",
              link: "网络编程.md",
            },
            {
              text: "14、nio",
              icon: "IO",
              link: "nio.md",
            },
            {
              text: "15、java正则表达式",
              icon: "regexp",
              link: "java正则表达式.md",
            },
          ],
        },
        {
          text: "Java GUI",
          icon: "computer-fill",
          collapsible: true,
          prefix: "/codenotes/java/javagui/",
          children: [
            {
              text: "Swing",
              icon: "window-fill",
              link: "swing.md",
            },
          ],
        },
        {
          text: "JVM 虚拟机",
          icon: "JVM",
          collapsible: true,
          prefix: "/codenotes/java/jvm/",
          children: [
            {
              text: "1、走进JVM",
              icon: "JVM",
              link: "走进jvm.md",
            },
            {
              text: "2、JVM内存管理",
              icon: "JVM",
              link: "内存管理.md",
            },
            {
              text: "2、类与类加载",
              icon: "JVM",
              link: "类与类加载.md",
            },
          ],
        },
        {
          text: "JavaEE",
          icon: "jakarta_ee_logo_stacked",
          collapsible: true,
          prefix: "/codenotes/java/javaee/",
          children: [
            {
              text: "Java Web",
              icon: "javaweb",
              link: "javaweb/javaweb.md",
            },
            {
              text: "Java 日志框架",
              icon: "log",
              link: "java-log/java日志框架.md",
            },
            {
              text: "MyBaits",
              icon: "mybaits",
              link: "mybatis/mybatis.md",
            },
            {
              text: "Spring",
              icon: "spring",
              link: "spring/spring.md",
            },
            {
              text: "SpringMVC",
              icon: "spring",
              link: "springmvc/spring-mvc.md",
            },
            {
              text: "Spring SSM",
              icon: "spring",
              link: "springssm/ssm.md",
            },
            {
              text: "SpringCloud",
              icon: "spring",
              collapsible: true,
              prefix: "/codenotes/java/javaee/springcloud/",
              children: [
                {
                  text: "1、微服务基础",
                  icon: "spring",
                  link: "SpringCloud（一）微服务基础.md",
                },
                {
                  text: "2、微服务进阶",
                  icon: "spring",
                  link: "SpringCloud（二）微服务进阶.md",
                },
                {
                  text: "3、微服务应用",
                  icon: "spring",
                  link: "SpringCloud（三）微服务应用.md",
                },
                {
                  text: "4、消息队列",
                  icon: "spring",
                  link: "SpringCloud（四）消息队列.md",
                },
              ],
            },
          ],
        },
        {
          text: "Maven 构建工具",
          icon: "maven",
          link: "/codenotes/java/maven/maven.md",
        },
      ],
    },
    {
      text: "数据库",
      icon: "database",
      collapsible: true,
      children: [
        {
          text: "MySQL",
          icon: "MySQL",
          collapsible: true,
          prefix: "/codenotes/database/mysql/",
          children: [
            {
              text: "1、MySQL入门",
              icon: "MySQL",
              link: "mysql入门.md",
            },
            {
              text: "2、MySQL进阶",
              icon: "MySQL",
              link: "mysql进阶.md",
            },
          ],
        },
        {
          text: "JDBC",
          icon: "database",
          link: "/codenotes/database/mysql/jdbc.md",
        },
        {
          text: "Redis",
          icon: "redis",
          collapsible: true,
          prefix: "/codenotes/database/redis/",
          children: [
            {
              text: "1、Redis基础",
              icon: "redis",
              link: "redis.md",
            },
            {
              text: "2、Redis进阶",
              icon: "redis",
              link: "redis-plus.md",
            },
          ],
        },
      ],
    },
    {
      text: "开发工具",
      icon: "tool",
      collapsible: true,
      prefix: "/codenotes/devtool/",
      children: [
        {
          text: "git入门",
          icon: "git",
          link: "git/git.md",
        },
        {
          text: "git进阶",
          icon: "git",
          link: "git/git-plus.md",
        },
        {
          text: "Git Commit Message 规范",
          icon: "git",
          link: "git/git-commit-message.md",
        },
      ],
    },
    {
      text: "中间件",
      icon: "middleware",
      collapsible: true,
      prefix: "/codenotes/middleware/",
      children: [
        {
          text: "RocketMQ",
          icon: "rocketmq",
          collapsible: true,
          prefix: "/codenotes/middleware/rocketmq/",
          children: [
            {
              text: "1. RocketMQ概述",
              icon: "rocketmq",
              link: "01-rocketmq概述.md",
            },
            {
              text: "2. RocketMQ安装与启动",
              icon: "rocketmq",
              link: "02-rocketmq安装与启动.md",
            },
            {
              text: "3. RocketMQ工作原理",
              icon: "rocketmq",
              link: "03-rocketmq工作原理.md",
            },
            {
              text: "4. RocketMQ应用",
              icon: "rocketmq",
              link: "04-rocketmq应用.md",
            },
          ],
        },
      ],
    },
    {
      text: "Linux入门",
      icon: "linux",
      link: "/codenotes/os/linux/linux.md",
    },
    {
      text: "Linux入门",
      icon: "book",
      link: "/codenotes/others/open-source-license.md",
    },
  ],
  // 设计模式的侧边栏
  "/design-patterns/": [
    {
      text: "JAVA 设计模式",
      icon: "java",
      collapsible: true,
      prefix: "/design-patterns/",
      children: [
        {
          text: "JAVA 设计模式入门",
          icon: "design",
          link: "设计模式.md",
        },
      ],
    },
  ],
  // 开源项目的侧边栏
  // "/projects/": [
  //   {
  //     text: "🤖 chat AI合集",
  //     collapsible: true,
  //     link: "/projects/chatai/",
  //   },
  // ],
});
