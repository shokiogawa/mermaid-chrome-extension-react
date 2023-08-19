const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: {
    content: path.join(__dirname, "src/content/index.tsx"),
    popup: path.join(__dirname, "src/popup/index.tsx"),
    // background: path.join(__dirname, "src/background/index.ts"),
  },
  output: {
    path: path.join(__dirname, "dist/js"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env", "@babel/react"] },
          },
          {
            loader: "ts-loader",
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
  },
};
