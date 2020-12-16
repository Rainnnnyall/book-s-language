import Vue from 'vue'
import App from './App'
import '@/static/fonts/iconfont.css'
import '@/static/iconfont/iconfont.css'
import '@/static/iicc/iconfont.css'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
