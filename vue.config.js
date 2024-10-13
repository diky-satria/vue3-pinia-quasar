const webpack = require("webpack");
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: true, // Enable Options API
        __VUE_PROD_DEVTOOLS__: false, // Disable Vue devtools in production
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false, // Add this flag to resolve the warning
      }),
    ],
  },
});
