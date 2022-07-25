import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import postCssPxToRem from 'postcss-pxtorem'

// import Components from 'unplugin-vue-components/vite';
// import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // Components({
    //   resolvers: [VantResolver()],
    // })
  ],
  base: './',
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') }
    ]
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5, //1rem的大小
          propList: ['*']  //需要转换的属性
        })
      ]
    }
  }
  ,
  server: {
    host: '0.0.0.0'
    // cors: true,
    // open: true,
    // hmr: true
  }
})
