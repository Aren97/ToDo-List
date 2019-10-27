module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        data: `
          @import "~@/assets/scss/variables.scss";
        `
      }
    }
  }
}
