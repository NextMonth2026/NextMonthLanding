export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#06080C',
        charcoal: '#0D1117',
        signal: '#2BC8F4',
        magenta: '#EE28B8',
        violet: '#9B8CFF',
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      letterSpacing: { tightest: '-0.04em' },
    },
  },
  plugins: [],
};
