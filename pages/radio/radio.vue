<template>
	<view>
		<view class="viewfor" v-for="(item,index) in result" :key="index">
			<text>{{item.title}}</text>
			<view style="width: 2000px;height: 150px;">
				<view style=" width: 125px;display: inline-block; margin-top: 10px;text-align: center;float: left;"  v-for="(ico,coco) in item.moduleInfo" :key="coco">
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
			async radio() {
				let result = await myRequestGet('?categoryPinyin=recommend')
				this.result=result.data.modules
				this.arr=result
				console.log(this.result)
			}
		},
		onLoad() {
			this.radio()
		}
	}
</script>

<style>

</style>
