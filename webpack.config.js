const path = require('path');

module.exports = {
  mode: "development",
  watch : true,
  devtool : "eval-source-map",
  entry: {
    app: "./src/js/main.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};