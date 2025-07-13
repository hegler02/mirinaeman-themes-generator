/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /(bg|text|border)-(red|green|blue|yellow|purple|pink|gray)-(100|200|300|400|500|600|700|800|900)/,
    },
    {
      pattern: /alert-(info|success|warning|error)-(bg|border|text)/,
    },
    {
      pattern: /badge-(primary|success|warning|error|info)-(bg|text)/,
    }
  ]
} 