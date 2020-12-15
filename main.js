import Vue from 'vue'
import App from './App'
import '@/static/fonts/iconfont.css'
import '@/static/font_2269866_wp049iq93mj/iconfont.css'
import '@/static/font_2269987_04jna0qkj44z/iconfont.css'
import '@/static/font_2269997_0gw2sqcvvpqn/iconfont.css'
import '@/static/font_2270004_60akpa6aly/iconfont.css'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
