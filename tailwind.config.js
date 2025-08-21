import { colors } from './constants/Colors';

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary:colors.primary,
        secondary: colors.secondary,
        disabled_focus:colors.disabled_focus,
        white:colors.white,
        background: colors.background,
        contrast_background:colors.contrast_background,
        shades: colors.shades,
        transparent_overlay: colors.transparent_overlay,
        initial_icons: colors.initial_icons,
        text: colors.text,
        score_bg: colors.score_bg,
      }, 
      fontFamily:{
        'fredoka-regular':['Fredoka-Regular', 'sans-serif'],
        'fredoka-semibold':['Fredoka-SemiBold', 'sans-serif'],
        'fredoka-bold':['Fredoka-Bold', 'sans-serif'],
        'monstserrat':['Montserrat', 'sans-serif'],
      }   
    },
  },
  plugins: [],
}