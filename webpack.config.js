const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",                          // Starts bundling code here
  mode: "development",
  module: {                                         // Modules -> defines how the exported js code is transformed
    rules: [
      {     
        test: /\.(js|jsx)$/,                        // Transforms js and jsx code
        exclude: /(node_modules|bower_components)/, // Does not transform any code in these folders
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }        // Use env preset in babel
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]         // Loading our css files
      }
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {                                         // Where is this bundled code going?
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",                           // Specifies public url for this directory (so dev server can use)
    filename: "bundle.js"                           // Name of bundled code
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),   // The folder containing our static content
    port: 3000,                                     // Port the dev server is running on
    publicPath: "http://localhost:3000/dist/",      // Tells the server where the bundled code is (Must use output's public path)
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]  
};