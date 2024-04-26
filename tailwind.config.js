/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: 'rgb(var(--primary))',
				background: 'rgb(var(--background))',
				secondary: 'rgb(var(--secondary))',
				accent: 'rgb(var(--accent))',
				font: 'rgb(var(--font))',
			},
			borderRadius: {
				radius: 'var(--radius)',
			},
			width: {
				'key-size': 'var(--key-size)',
			},
			height: {
				'key-size': 'var(--key-size)',
			},
		},
	},
	plugins: [],
};
