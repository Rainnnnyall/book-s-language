import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store=new Vuex.Store({
	state:{
		// 购物车数据,从goodsList点击加入
		// carts:[]
		// 从storage缓存区取数据
		carts:uni.getStorageSync("carts") || []
	},
	mutations:{
		// 修改carts的值
		addCarts(state,good){
			// state.carts.push(item)
			
			// 点击相同的商品加入购物车时只需要改变buynum，不需要再把同样的商品push到carts
			// 判断carts中有没有相同的商品,有直接buynum++,没有则push
			var currentGood=state.carts.find((item)=>{
				if(item.id==good.id){
					return item
				}
			})	
			if(currentGood){
				currentGood.buynum+=good.buynum;
			}else{
				state.carts.push(good)
			}
			console.log(state.carts);
			// vuex中数据的缓存问题 手动存储 
			// 每一次state变化时 把数据存入 storage的缓存区,但只是这样 在使用vuex的carts页面每次刷新还是没有数据
			uni.setStorageSync("carts",state.carts)
			
		}
		
	}
})
// 导出
export default store