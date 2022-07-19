import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import 'amfe-flexible'
import './styles/base.css'
import Vant from 'vant'
import 'vant/lib/index.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
app.use(Vant)
