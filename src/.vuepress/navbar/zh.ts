import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  { text: "快速导航", icon: "navigation", link: "/quicknav/" },
  { text: "代码笔记", icon: "code", link: "/codenotes/" },
  { text: "开源项目", icon: "free", link: "/projects/" },
  {text: "数据结构与算法", icon: "function",link: "/Algorithms/"},
  {
    text: "资源宝库",
    icon: "advance",
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
