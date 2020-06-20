// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// const isProd = process.env.NODE_ENV === "production";

module.exports = {
  transpileDependencies: ["vuetify"],
  runtimeCompiler: true,
  // configureWebpack: {
  //   optimization: {
  //     minimizer: isProd
  //       ? [
  //           new UglifyJsPlugin({
  //             uglifyOptions: {
  //               compress: {
  //                 drop_console: true
  //               }
  //             }
  //           })
  //         ]
  //       : []
  //   }
  // }
};
