// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require("tailwindcss/plugin")

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Public Sans', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        outline: '0 0 0 2px rgba(56, 178, 172, 0.5);',
      },
    },
    customForms: theme => ({
      default: {
        'checkbox, input, multiselect, radio, select, textarea': {
          '&:focus': {
            borderColor: theme('colors.teal.500'),
            boxShadow: theme('boxShadow.outline'),
          },
        },
        'checkbox, radio': {
          '&:checked': {
            backgroundColor: theme('colors.teal.500'),
          },
        },
        'input, multiselect, select, textarea': {
          width: theme('width.full'),
        },
      },
    }),
  },
  plugins: [
    require('@tailwindcss/ui'),
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.provider': {
          'padding': '2.5rem',
          'background-color': '#fff',
          
        },
        'provider-active': {
          'border-bottom': '3px solid #0694a2'
        }
      }

      addUtilities(newUtilities)
    })
  ],
};
