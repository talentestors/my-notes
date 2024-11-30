import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  { text: "快速导航", icon: "navigation", link: "/quicknav/" },
  { text: "代码笔记", icon: "code-fill", link: "/codenotes/" },
  { text: "开源项目", icon: "open-source-fill", link: "/projects/" },
  {text: "数据结构与算法", icon: "Function",link: "/algorithms/"},
  {
    text: "资源宝库",
    icon: "advanced",
    prefix: "/resources/",
    children: [
      {
        text: "书籍资源",
        icon: "animation",
        link: "books/"
      },
      {
        text: "影音资源",
        icon: "play",
        link: "videos/"
      },
    ],
  },
]);
