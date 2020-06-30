module.exports = {
  transpileDependencies: ["vuetify"],
  runtimeCompiler: true,
  devServer: {
    // proxy: 'http://localhost:8080',
    // public: '172.20.10.4:8080/',
    watchOptions: {
    poll: true
  }
}
};
