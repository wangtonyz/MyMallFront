module.exports = {
  devServer: {
    port: 8080,
	    proxy: {
	      'api': {
	        target: 'http://localhost:8060',
	        ws: true,
	        changeOrigin: true,
	        pathRewrite: {
	          '^api': ''
	        }
	      },
    }
  }
}