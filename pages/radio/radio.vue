<template>
	<view>
		<view class="viewfor" v-for="(item,index) in result" :key="index">
			<text>{{item.title}}</text>
			<view style="width: 2000px;">
				<view style=" width: 260rpx;display: inline-block; margin-top: 10px;text-align: center;float: left;position: relative;"  v-for="(ico,coco) in item.moduleInfo" :key="coco" @click="main(ico)" :data-news="ico">
					<text style="position: absolute;top:80px;right: 15px;font-size: 20px; color: #eee;" class="iconfont icon-bofang"></text>
					<image style="height: 100px;width: 100px;" :src="`https://imagev2.xmcdn.com/${ico.albumInfo.cover}`"></image>
				<view style="height: 50px;font-size: 12px;width: 100px;text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">{{ico.albumInfo.title}}</view>
				</view>
				<text>{{item.moduleInfo}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '@/utils/radio.js'
	export default {
		data() {
			return {
			result:[],
			arr:[]
			}
		},
		methods: {
			main(ico){
				let idd=ico.id
				let cover=ico.albumInfo.cover
				let title=ico.albumInfo.title
				console.log(idd,cover,title)
				uni.navigateTo({
					url: '/pages/musicmain/musicmain?idd='+idd+'&cover='+cover+'&title='+title
				})
				//console.log(ico)
			},
			async radio() {
				let result = await myRequestGet('?categoryPinyin=recommend')
				this.result=result.data.modules
				this.arr=result
				console.log(this.arr)
			}
		},
		onLoad() {
			this.radio()
		}
	}
</script>

<style>

</style>
