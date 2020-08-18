const options = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/_variables.scss";',
      },
    },
  },
  publicPath: process.env.NODE_ENV === "production" ? "/time-calculator/" : "/",
};

module.exports = options;
