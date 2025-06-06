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
			fallback: '404.html', // Or undefined if you don't want/need a specific fallback
			precompress: false,
			strict: true
		}),
		paths: {
			// 👇 **THIS IS THE KEY CHANGE** 👇
			base: process.env.NODE_ENV === 'production' ? '/hems' : '',
		},
		prerender: {
			entries: ['*', '/courses'], // Ensure your main entry points are listed
			// SvelteKit will attempt to crawl from these to find dynamic [slug] pages
		}
	}
};

export default config;