/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // 1. Add your brand color for reusability across your app
      colors: {
        'brand-orange': '#e6931d',
        'primary': "#D2042D",
        'secondery': "#FA0F3E"
      },
      // 2. Define the keyframes for our 3D effects.
      // While the cube effect is now handled with inline styles for dynamic rotation,
      // these can be used for other potential animations.
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
            '0%': { transform: 'translateY(100%)', opacity: '0'},
            '100%': { transform: 'translateY(0)', opacity: '1'},
        }
      },
      // 3. Create animation utilities using the keyframes
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out forwards',
        'slide-up-reveal': 'slide-up 0.3s ease-in-out forwards',
      },
    },
  },
  // 4. A small plugin to add the utilities needed for 3D transforms
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.transform-style-3d': {
          'transform-style': 'preserve-3d',
        },
        '.perspective-1000': {
          'perspective': '1000px',
        },
        '.backface-hidden': {
          'backface-visibility': 'hidden',
        },
      });
    },
  ],
};
