// svelte.config.js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false,
			strict: true
		}),
		paths: {
			// 👇 **THIS IS THE KEY CORRECTION** 👇
			base: process.env.NODE_ENV === 'production' ? '/markdown-viewer' : '',
			// It should be '/markdown-viewer', not '/hems'
		},
		prerender: {
			entries: ['*', '/courses'],
		}
	}
};

export default config;