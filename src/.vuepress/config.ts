import { defineUserConfig } from "vuepress";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { getDirname, path } from 'vuepress/utils'
import { viteBundler } from '@vuepress/bundler-vite'
import theme from "./theme.js";
const __dirname = getDirname(import.meta.url)

//自定义用户配置
export default defineUserConfig({
  base: "/",
  bundler: viteBundler(),
  // 多语言设置
  locales: {
    "/": {
      lang: "zh-CN",
      title: "終わり群星の知识宝库",
      description: "終わり群星の知识宝库",
      // 设置favicon
      head: [['link', { rel: 'icon', href: '/favicon.svg' }]],
    },
  },
  // 主题设置
  theme,
  // 插件设置
  plugins: [
    // 注册全局组件的插件
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
  shouldPrefetch: false,
});
