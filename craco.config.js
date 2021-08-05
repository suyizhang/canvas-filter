const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, {
      env, paths
    }) => {
        // paths.appPath='public'
        paths.appBuild = 'dist';
        webpackConfig.output = {
          ...webpackConfig.output,
            // ...{
          //   filename: whenDev(() => 'static/js/bundle.js', 'static/js/[name].js'),
          //   chunkFilename: 'static/js/[name].js'
          // },
          path: path.resolve(__dirname, 'dist'), // 修改输出文件目录
          publicPath: '/canvas-filter/',
        }
        return webpackConfig;
    }
  },
  // ...
  plugins: [
    {
      plugin: CracoLessPlugin,
    }
  ]
};