// const purgecss = require("@fullhuman/postcss-purgecss")({
//   content: ["./components/**/*.js", "./css/**/*.css", "./pages/**/*.js"],
//   defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []
// });

module.exports = {
  plugins: [
    "tailwindcss",
    "autoprefixer",
    // ...(process.env.NODE_ENV === "production" ? [purgecss] : []),
    "cssnano"
  ]
};
