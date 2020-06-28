const options = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/_variables.scss";',
      },
    },
  },
};

module.exports = options;
