import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"
import postCssPxToRem from 'postcss-pxtorem'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
  // ,
  // server: {
  //   host: 'localhost',
  //   cors: true,
  //   open: true,
  //   hmr: true
  // }
})
