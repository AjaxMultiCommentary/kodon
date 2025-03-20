/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				// Helvetica messes up kerning when diacritics are involved
				sans: ['Inter', 'Arial']
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
