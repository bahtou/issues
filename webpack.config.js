const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

let counterAfterEmit = 0,
  counterAfterDone = 0;

class IsDonePlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap("IsDonePlugin", () => {
      console.log(
        "👀  ",
        ++counterAfterEmit,
        ". compilation afterEmit",
        new Date()
      );
    });
    compiler.hooks.done.tap("IsDonePlugin", () => {
      console.log(
        "👀  ",
        ++counterAfterDone,
        ". compilation is done",
        new Date()
      );
    });
  }
}

module.exports = {
  experiments: {
    layers: true,
    futureDefaults: true,
    cacheUnaffected: true
  },
  stats: {
    errorDetails: true
  },
  entry: {
    reactVendors: ["react", "react-dom"],
    app: {
      import: "./src/index.tsx",
      dependOn: "reactVendors",
      layer: "main-app"
    }
  },
  output: {
    chunkFilename: "chunk.[name].[chunkhash:4].js",
    clean: true,
    filename: "[name].[contenthash:4].js",
    path: path.resolve("dist"),
    pathinfo: true,
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: [
          {
            loader: "swc-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new IsDonePlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  resolve: {
    alias: {
      "@components": path.resolve("src", "components")
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    enforceExtension: false,
    modules: ["node_modules"]
  },
  mode: "development",
  devtool: "eval-source-map"
};
