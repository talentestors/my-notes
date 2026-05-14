import { defineUserConfig } from "vuepress";
import { registerComponentsPlugin } from "@vuepress/plugin-register-components";
import { getDirname, path } from "vuepress/utils";
import { viteBundler } from "@vuepress/bundler-vite";

import theme from "./theme.js";
const __dirname = getDirname(import.meta.url);

/**
 * 自定义 logger：过滤 Rolldown 硬编码阈值的 chunk size 警告
 * Vite 8 (Rolldown-backed) 的 `chunkSizeWarningLimit` 配置不生效，
 * reporter 插件硬编码了 1024KB 阈值。通过 customLogger 拦截该消息。
 */
const SILENCED_PATTERNS = [
  "Some chunks are larger than",
];

function shouldSilence(msg: string): boolean {
  return typeof msg === "string" && SILENCED_PATTERNS.some((p) => msg.includes(p));
}

const logger: any = {
  hasWarned: false,
  info(msg: string, _options?: any) {
    if (shouldSilence(msg)) return;
    console.log(msg);
  },
  warn(msg: string, _options?: any) {
    if (shouldSilence(msg)) return;
    this.hasWarned = true;
    console.warn(msg);
  },
  warnOnce(msg: string, _options?: any) {
    if (shouldSilence(msg)) return;
    this.hasWarned = true;
    console.warn(msg);
  },
  error(msg: string, _options?: any) {
    this.hasWarned = true;
    console.error(msg);
  },
  clearScreen(_type?: string) {},
  hasErrorLogged(_error: Error) {
    return false;
  },
};

//自定义用户配置
export default defineUserConfig({
  base: "/",
  bundler: viteBundler({
    viteOptions: {
      customLogger: logger,
      build: {
        rolldownOptions: {
          checks: {
            pluginTimings: false,
            commonJsVariableInEsm: false,
          },
        },
      },
    },
  }),
  // 多语言设置
  locales: {
    "/": {
      lang: "zh-CN",
      title: "時の終わりでの知识宝库",
      description: "時の終わりでの知识宝库",
      // 设置favicon
      head: [["link", { rel: "icon", href: "/favicon.svg" }]],
    },
  },
  markdown: {
    headers: {
      // 用到哪一级就提取哪一级
      level: [2, 3, 4],
    },
  },
  // 主题设置
  theme,
  // 插件设置
  plugins: [
    // 注册全局组件的插件
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, "./components"),
    }),
  ],
  shouldPrefetch: false,
});
