<template>
	<view>
		<view class="top">
			<image class="top-bg" :src="`https://uptownlet.com/appendix/image.jspx?id=c71b92161a3c4955aaa0bc9414c79486`"></image>
			<view class="touxiang"></view>
			<view class="book-code">取书码</view>
			<view class="username">用户名</view>
			<view class="huangguan">
				<icon class="iconfont iconV"></icon>
				<text class="outsider">非会员</text>
				<view class="buy">购买</view>
			</view>
			<image class="right-img" :src="`https://uptownlet.com/appendix/image.jspx?id=f22093ed57e84122a52035fe6304bd52`"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			// getBgImg()
		},
		methods: {
			// async getBgImg() {
			// 		let result = await myRequestGet()
			// },
		}
	}
</script>

<style lang="scss">
    .top{
		position: relative;
		width: 100%;
		height: 350rpx;
		.top-bg{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 420rpx;
		
		}
		.touxiang{
			position: absolute;
			width: 130rpx;
			height: 130rpx;
			border-radius: 50%;
			left: 30rpx;
			top: 10rpx;
			background-color: gray;
		}
		.book-code{
			position: absolute;
			width: 110rpx;
			height: 35rpx;
			line-height: 35rpx;
			color: white;
			font-size: 25rpx;
			text-align: center;
			left: 40rpx;
			top: 135rpx;
			background-color: #76E4D2;
			border-radius: 20px;
		}
		.username{
			position: absolute;
			left: 170rpx;
			top: 15rpx;
			width: 150rpx;
			height: 60rpx;
			color: white;
			font-size: 40rpx;
			line-height: 60rpx;
			text-align: center;
			
		}
		.huangguan{
			position: absolute;
			width: 300rpx;
			height: 60rpx;
			left: 180rpx;
			top: 85rpx;
			// background-color: pink;
			.iconV{
				position: absolute;
				left: 0;
				top: 0;
				font-size: 60rpx;
				color: white;
			}
			.outsider{
				position: absolute;
				left: 70rpx;
				top: 0;
				width: 110rpx;
				height: 60rpx;
				text-align: center;
				line-height: 60rpx;
				color: white;
				font-size: 35rpx;
			}
			.buy{
				position: absolute;
				left: 190rpx;
				top: 5rpx;
				width: 110rpx;
				height: 50rpx;
				text-align: center;
				line-height: 50rpx;
				color: black;
				font-size: 35rpx;
				border-radius: 20px;
				background-color: #FEDE00;
			}
		}
		.right-img{
			position: absolute;
			right: 40rpx;
			top: 10rpx;
			width: 130rpx;
			height: 130rpx;
		}
	}
</style>
