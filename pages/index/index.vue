<template>
	<view>
		<button v-for="item in books" :key="item" @click="gohotsd(item.id)">{{item.bt}}</button>
	</view>
</template>
<script>
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	export default {
		data() {
			return {
				books: [],
			}
		},
		onLoad() {
			this.getSwiper();
		},
		methods: {
			async getSwiper() {
				let result = await myRequestGet("/portal.php?resid=SdAction.hotsd")
				if (result != 0) {
					this.books = result.data
				}
			},
			gohotsd(id) {
				uni.navigateTo({
					url:`../hotsd/hotsd?id=${id}`
				})
			}

		}
	}
</script>

<style>

</style>
