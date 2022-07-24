import { createStore } from 'vuex'

// 将封装的状态模块引入
import user from './modules/user'

export default createStore({
  modules: {
    user
  }
})
