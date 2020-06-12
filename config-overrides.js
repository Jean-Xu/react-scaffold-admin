const {
  override,
  addDecoratorsLegacy,
  disableEsLint,
  fixBabelImports,
  addLessLoader,
  // addBabelPlugins,
} = require('customize-cra');

module.exports = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    // 一定要加上lessOptions！
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#6251dd' },
    }
  }),
  // addBabelPlugins()
  (config) => {
    // 去掉build时产生的map文件
    if(process.env.NODE_ENV==="production") config.devtool = false;
    return config
  }
);
