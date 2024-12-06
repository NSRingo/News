import { defineConfig } from "@iringo/arguments-builder";
export default defineConfig({
	output: {
		surge: {
			path: "./dist/iRingo.News.sgmodule",
            transformEgern: {
				enable: true,
				path: "./dist/iRingo.News.yaml",
			},
		},
		loon: {
			path: "./dist/iRingo.News.plugin",
		},
		customItems: [
			{
				path: "./dist/iRingo.News.snippet",
				template: "./template/quantumultx.handlebars",
			},
			{
				path: "./dist/iRingo.News.stoverride",
				template: "./template/stash.handlebars",
			},
			{
				path: "./dist/iRingo.News.srmodule",
				template: "./template/shadowrocket.handlebars",
			},
		],
		dts: {
			isExported: true,
			path: "./src/types.d.ts",
		},
		boxjsSettings: {
			path: "./template/boxjs.settings.json",
			scope: "@iRingo.News.Settings",
		},
	},
	args: [
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
});
