module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  plugins: [
    ['@tarojs/plugin-mock',{
      host:"localhost",
      port:9999
    }]
  ],
  defineConstants: {
    API:JSON.stringify("/api")
  },
  mini: {
    
  },
  h5: {
    devServer:{
      proxy:{
        '/api':{
          target:'http://localhost:9999',
          secure:false
        }
      }
    }
  }
}
