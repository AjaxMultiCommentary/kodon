import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	clearScreen: false,
	plugins: [tsconfigPaths(), sveltekit()],
	test: {
		include: ['tests/**/*.test.ts']
	}
});
