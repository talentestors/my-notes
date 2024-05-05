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
          link: "HTML/HTML.md",
        },
        {
          text: "Emmet语法",
          icon: "emmet",
          link: "Emmet语法.md",
        },
        {
          text: "CSS",
          icon: "css",
          collapsible: true,
          prefix: "/codenotes/web/CSS/",
          children: [
            {
            text: "1、CSS简介与选择器",
            icon: "css",
            link: "简介与选择器.md"
            },
            {
              text: "2、CSS三大特性",
              icon: "css",
              link: "三大特性.md"
            },
            {
              text: "3、CSS盒子模型",
              icon: "css",
              link: "CSS盒子模型.md"
            },
            {
              text: "4、CSS高级",
              icon: "css",
              link: "CSS高级.md"
            },
          ]
        },
      ],
    },{
      text: "Javase",
      icon: "java",
      collapsible: true,
      children: [{
        text: "Javase",
        icon: "java",
        collapsible: true,
        prefix: "/codenotes/java/javase/",
        children: [
          {
            text: "1、java基础",
            icon: "computer",
            link: "java基础.md"
          },
          {
            text: "2、流程控制语句",
            icon: "branch",
            link: "流程控制语句.md"
          },
          {
            text: "3、数组和算法",
            icon: "array",
            link: "数组和算法.md"
          },
          {
            text: "4、面向对象",
            icon: "class",
            link: "面向对象.md"
          },
          {
            text: "5、常用api",
            icon: "api",
            link: "常用api.md"
          },
          {
            text: "6、异常机制",
            icon: "debug",
            link: "异常机制.md"
          },
          {
            text: "7、泛型和枚举",
            icon: "enum",
            link: "泛型和枚举.md"
          },
          {
            text: "8、多线程",
            icon: "asynchronous",
            link: "多线程.md"
          },
          {
            text: "9、树",
            icon: "tree",
            link: "树.md"
          },
          {
            text: "10、集合框架",
            icon: "folder",
            link: "集合框架.md"
          },
          {
            text: "11、IO流",
            icon: "IO",
            link: "IO流.md"
          },
          {
            text: "12、反射",
            icon: "format",
            link: "注解和反射.md"
          },
          {
            text: "13、Java网络编程",
            icon: "change",
            link: "网络编程.md"
          },
          {
            text: "14、nio",
            icon: "IO",
            link: "nio.md"
          },
          {
            text: "15、Java正则表达式",
            icon: "regexp",
            link: "Java正则表达式.md"
          }
        ],
      },{
        text: "JavaGUI",
        icon: "computer",
        collapsible: true,
        prefix: "/codenotes/java/javaGUI/",
        children: [
          {
            text: "Swing",
            icon: "window",
            link: "swing.md"
          },
        ]
      }]
    },
    {
      text: "MySQL",
      icon: "mysql",
      collapsible: true,
      prefix: "/codenotes/mysql/",
      children: [
        {
          text: "1、Mysql入门",
          icon: "mysql",
          link: "MySQL入门.md"
        },
      ]
    },
    // {
    //   text: "企业级框架",
    //   icon: "frame",
    //   collapsible: true,
    //   prefix: "/codenotes/framework/",
    //   children: [
    //     {
    //       text: "Netty",
    //       icon: "network",
    //       collapsible: true,
    //       prefix: "netty/",
    //       children: [
    //         "Netty核心.md",
    //         "Netty高级.md",
    //       ],
    //     },
    //     {
    //       text: "Electron核心",
    //       icon: "write",
    //       link:"Electron核心.md"
    //     },
    //   ]
    // },
    // {
    //   text: "算法和数据结构",
    //   icon: "ability",
    //   collapsible: true,
    //   prefix: "/codenotes/algdata/",
    //   children: [
    //     {
    //       text:"算法小抄",
    //       icon:"like",
    //       collapsible:true,
    //       prefix:"lbld/",
    //       children:[
    //         "算法小抄核心套路.md",
    //         "算法小抄数学运算.md",
    //         "算法小抄动态规划.md",
    //         "算法小抄数据结构.md",
    //         "算法小抄算法思维.md",
    //         "算法小抄高频面试.md",
    //       ],
    //     }
    //   ],
    // },
    // {
    //   text: "数据库",
    //   icon: "mysql",
    //   collapsible: true,
    //   prefix: "/codenotes/database/",
    //   children: [
    //     ""
    //   ],
    // },
    // {
    //   text: "开发必备",
    //   icon: "tool",
    //   collapsible: true,
    //   prefix: "/codenotes/devtool/",
    //   children: [
    //     ""
    //   ],
    // },
    // {
    //   text: "在线技术文档",
    //   icon: "read",
    //   collapsible: true,
    //   prefix: "/codenotes/cookbook/",
    //   children: [
    //     ""
    //   ],
    // }
  ],
  // 开源项目的侧边栏
  "/projects/": [
    {
      text: "🤖 chat AI合集",
      collapsible: true,
      link: "/projects/chatAI/",
    },
    // {
    //   text: "实战项目",
    //   icon: "workingDirectory",
    //   collapsible: true,
    //   link: "/projects/pracprojects/",
    // },
    // {
    //   text: "系统设计",
    //   icon: "shell",
    //   collapsible: true,
    //   link: "/projects/systemdesign/",
    // },
    // {
    //   text: "工具类库",
    //   icon: "module",
    //   collapsible: true,
    //   link: "/projects/toollibrary/",
    // },
  ],
});
