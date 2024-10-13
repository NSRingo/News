import { defineConfig } from "@iringo/arguments-builder";
export default defineConfig({
	output: {
		surge: { path: "./dist/News.sgmodule" },
		loon: { path: "./dist/News.plugin" },
		customItems: [
			{
				path: "./dist/News.snippet",
				template: "./template/quantumultx.handlebars",
			},
			{
				path: "./dist/News.stoverride",
				template: "./template/stash.handlebars",
			},
			{
				path: "./dist/News.srmodule",
				template: "./template/shadowrocket.handlebars",
			},
		],
		dts: { isExported: true, path: "./src/interface.ts" },
		boxjsSettings: {
			path: "./template/boxjs.settings.json",
			scope: "@iRingo.News.Settings",
		},
	},
	args: [
		{
			key: "Switch",
			name: "总功能开关",
			defaultValue: true,
			type: "boolean",
			description: "是否启用此APP修改。",
			exclude: ["surge", "loon"],
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
});
