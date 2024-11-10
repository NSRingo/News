import { defineConfig } from "@iringo/modkit";
import { pluginEgern } from "@iringo/modkit-plugin-egern";
import { pluginBoxJs } from "@iringo/modkit/plugins/boxjs";
import { pluginDts } from "@iringo/modkit/plugins/dts";
import { pluginLoon } from "@iringo/modkit/plugins/loon";
import { pluginStash } from "@iringo/modkit/plugins/stash";
import { pluginSurge } from "@iringo/modkit/plugins/surge";
import { pluginNodePolyfill } from "@rsbuild/plugin-node-polyfill";
import pkg from "./package.json";

export default defineConfig({
  source: {
    metadata: {
      system: ["iOS", "iPadOS", "tvOS", "macOS", "watchOS"],
      extra: {
        openUrl: "http://boxjs.com/#/app/iRingo.News",
        author: ["VirgilClyne[https://github.com/VirgilClyne]"],
        homepage: "https://NSRingo.github.io/guide/apple-news",
        icon: "https://developer.apple.com/assets/elements/icons/news/news-128x128.png",
        category: " iRingo",
        date: new Date().toLocaleString("zh-CN"),
      },
    },
    content: {
      rule: [
        "DOMAIN,gateway.icloud.com,{{{Proxy}}}",
        {
          type: "RULE-SET",
          assetKey: "News.list",
          policyName: {
            custom: "{{{Proxy}}}",
          },
          description: "📰 News",
        },
      ],
      script: [
        {
          name: "📰 News.v1.configs.request",
          type: "http-request",
          pattern: "^https?://news(-todayconfig)?-edge.apple.com/v1/configs",
          requiresBody: true,
          scriptKey: "request",
          injectArgument: true,
        },
        {
          name: "📰 News.analyticseventsv2.async.request",
          type: "http-request",
          pattern:
            "^https?://news(-sports)?-events.apple.com/analyticseventsv2/async",
          requiresBody: true,
          scriptKey: "request",
          injectArgument: true,
        },
        {
          name: "📰 News.v1.search.request",
          type: "http-request",
          pattern: "^https?://news-client-search.apple.com/v1/search",
          requiresBody: false,
          scriptKey: "request",
          injectArgument: true,
        },
      ],
      mitm: {
        hostname: [
          "news-edge.apple.com",
          "news-todayconfig-edge.apple.com",
          "news-events.apple.com",
          "news-sports-events.apple.com",
          "news-client.apple.com",
          "news-client-search.apple.com",
        ],
      },
    },
    arguments: [
      {
        key: "Switch",
        name: "总功能开关",
        defaultValue: true,
        type: {
          default: "boolean",
          surge: "exclude",
          loon: "exclude",
          stash: "exclude",
        },
        description: "是否启用此APP修改。",
      },
      {
        key: "CountryCode",
        name: "国家或地区代码",
        defaultValue: "US",
        type: "string",
        options: [
          { key: "AUTO", label: "🇺🇳自动（跟随地区检测结果）" },
          { key: "CN", label: "🇨🇳中国大陆" },
          { key: "HK", label: "🇭🇰香港" },
          { key: "TW", label: "🇹🇼台湾" },
          { key: "SG", label: "🇸🇬新加坡" },
          { key: "US", label: "🇺🇸美国" },
          { key: "JP", label: "🇯🇵日本" },
          { key: "AU", label: "🇦🇺澳大利亚" },
          { key: "GB", label: "🇬🇧英国" },
          { key: "KR", label: "🇰🇷韩国" },
          { key: "CA", label: "🇨🇦加拿大" },
          { key: "IE", label: "🇮🇪爱尔兰" },
        ],
        description: "不同国家或地区提供的内容或有差别。",
      },
      {
        key: "NewsPlusUser",
        name: "[搜索]显示News+内容",
        defaultValue: true,
        type: "boolean",
        description: "是否显示News+搜索结果。",
      },
    ],
    scripts: {
      request: "./src/request.js",
    },
    assets: {
      "News.list": "./rulesets/News.list",
    },
  },
  output: {
    assetPrefix: `https://github.com/NSRingo/News/releases/download/v${pkg.version}`,
    banners: [
      {
        banner: `console.log('Version: ${pkg.version}');`,
        raw: true,
      },{
        banner: "console.log('[file]');",
        raw: true,
      },{
        banner: `console.log('${pkg.displayName}');`,
        raw: true,
      },
      {
        banner: pkg.homepage,
      }
    ]
  },
  tools: {
    rsbuild: {
      plugins: [pluginNodePolyfill()],
    },
    rspack: {
      resolve: {
        fallback: {
          got: false,
          "iconv-lite": false,
          "tough-cookie": false,
        },
      },
    },
  },
  plugins: [
    pluginDts({
      interfaceName: "Settings",
      isExported: true,
      filePath: "src/interface.ts",
    }),
    pluginBoxJs(),
    pluginSurge(),
    pluginLoon(),
    pluginStash(),
    pluginEgern(),
  ],
});
