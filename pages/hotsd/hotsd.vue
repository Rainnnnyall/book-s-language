<template>
	<view class="hot">
		<scroll-view scroll-y="">
			<image class="header" src="https://uptownlet.com/appendix/image.jspx?id=086ad475b01c41d0adc49bf200c574f9" mode="widthFix"></image>
			<text class="bt">{{list.bt+'【'+list._lx+'】'}}</text>
			<text class="js">{{list.js}}</text>
			<view class="main">
				<view class="ts" v-for="item in ts" :key="item.tsid" @click="godetails(item)">
					<view class="left">
						<image :src="`https://uptownlet.com/appendix/image.jspx?id={{item.fm}}`" mode="aspectFit"></image>
					</view>
					<view class="right">
						<text class="sm">{{item.sm}}\n</text>
						<text class="zz">{{item.zz}}\n</text>
						<text class="nrjj">{{item.nrjj}}\n</text>
						<text :class="item.kjsl==0?'bukejie':'kejie'">{{item.kjsl==0?'已借出':'可借'}}</text>
					</view>
				</view>

			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		myRequestGet
	} from '@/utils/zgrequest.js'
	export default {
		data() {
			return {
				list: [],
				ts: [],
			}
		},
		onLoad(options) {
			// console.log(options)
			this.getSwiper(options);

		},
		methods: {
			async getSwiper(options) {

				let result = await myRequestGet(`/portal.php?resid=SysdAction.sdxq&sdid=${options.id}`)
				if (result != 0) {
					this.list = result.data
					this.ts = result.data.ts
				}
				// console.log(this.list, "99999")
				console.log(this.ts, "222222")
			},
			godetails(item) {
				uni.navigateTo({
					url: `../details/details?id=${item.tsid}&kjsl=${item.kjsl}`
				})
			}
		}
	}
</script>

<style lang="less">
	.hot {
		.header {
			width: 750rpx;
		}

		.bt {
			font-size: 16px;
			font-weight: bold;
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 5px;
		}

		.js {
			color: #C0C0C0;
			font-size: 16px;
			display: flex;

			padding: 10px;
			border-bottom: 1px solid #C0C0C0;
		}

		.main {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			width: 100%;
			border-bottom: 1px solid #C0C0C0;
			.ts {
				margin-bottom: 10px;
				border-bottom: 1px solid #ccc;
				.left {
					display: inline-flex;
					image {
						width: 180rpx;
						height: 113px;
						margin: 5px;
						
					}
				}

				.right {
					width: 520rpx;
					margin: 5rpx auto;
					display: inline-flex;
					flex-direction: column;
					justify-content: flex-start;
					vertical-align: top;
					.sm {
						font-weight: bold;
						margin-bottom: 20rpx;
					}

					.zz {
						margin-bottom: 10px;
					}

					.nrjj {
						width: 520rpx;
						color: #cccccc;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-bottom: 10px;
					}

					.kejie {
						width: 100rpx;
						color: #92E6D8;
						border: 1px solid #92E6D8;
						border-radius: 4px;
						margin-bottom: 5px;
						padding: 2px;
						text-align: center;
					}

					.bukejie {
						width: 150rpx;
						text-align: center;
						color: pink;
						border: 1px solid pink;
						border-radius: 4px;
						margin-bottom: 5px;
						padding: 2px;
					}
				}
			}
		}
	}
</style>
