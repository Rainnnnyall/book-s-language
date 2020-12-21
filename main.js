import Vue from 'vue'
import App from './App'
// import store from './store/index.js'
import store from './store/store.js'

import "@/static/fonts/iconfont.css"
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
