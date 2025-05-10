import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	clearScreen: false,
	plugins: [tailwindcss(), tsconfigPaths(), sveltekit()],
	test: {
		include: ['tests/**/*.test.ts']
	}
});
