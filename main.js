import Vue from 'vue'
import App from './App'
import "@/static/fonts/iconfont.css"
Vue.config.productionTip = false
import store from '@/store/store.js'
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
