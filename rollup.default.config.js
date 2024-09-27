import json from '@rollup/plugin-json';
import commonjs from "@rollup/plugin-commonjs";
import terser from '@rollup/plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
	{
		input: 'src/request.js',
		output: {
			file: 'dist/request.js',
			format: 'es',
			banner: `/* README: https://github.com/NSRingo */\nconsole.log(' iRingo: 📰 News Request')\nconsole.log('${new Date().toLocaleString('zh-CN', {timeZone: 'PRC'})}')`,
		},
		plugins: [json(), commonjs(), nodeResolve(), terser()]
	}
];
