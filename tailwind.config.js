/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Base / Background Colors
        "base-100": "oklch(12% 0.042 264.695)",
        "base-200": "oklch(20% 0.042 265.755)",
        "base-300": "oklch(27% 0.041 260.031)",
        "base-content": "oklch(96% 0.007 247.896)",

        // Brand Colors
        "primary": "oklch(82% 0.111 230.318)",
        "primary-content": "oklch(29% 0.066 243.157)",
        "secondary": "oklch(85% 0.138 181.071)",
        "secondary-content": "oklch(27% 0.046 192.524)",
        "accent": "oklch(82% 0.119 306.383)",
        "accent-content": "oklch(29% 0.149 302.717)",
        "neutral": "oklch(44% 0.043 257.281)",
        "neutral-content": "oklch(98% 0.003 247.858)",

        // State Colors
        "info": "oklch(71% 0.143 215.221)",
        "info-content": "oklch(98% 0.019 200.873)",
        "success": "oklch(70% 0.14 182.503)",
        "success-content": "oklch(98% 0.014 180.72)",
        "warning": "oklch(79% 0.184 86.047)",
        "warning-content": "oklch(98% 0.026 102.212)",
        "error": "oklch(63% 0.237 25.331)",
        "error-content": "oklch(97% 0.013 17.38)",
      },
      borderRadius: {
        "selector": "0.25rem",
        "field": "1rem",
        "box": "0.25rem",
      },
      borderWidth: {
        "custom": "1px", // use as border-custom
      },
    },
  },
  plugins: [],
}
