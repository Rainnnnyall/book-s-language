import Vue from 'vue'
import App from './App'
import "@/static/font_fenxiang/iconfont.css"
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
