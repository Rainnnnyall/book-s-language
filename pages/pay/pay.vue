<template>
	<view class="container">
		<view class="top">
			<view class="price">
				<view class="pri1">0元</view>
				<view class="pri2">总共消费</view>
			</view>
			<view class="his">
				<view class="his-title">消费明细：</view>
				<view class="his-body">
					<text>会员费</text> 
					<text>元</text>
				</view>
			</view>
		</view>
		<view class="middle">
			<text>使用红包</text>
			<text>
				<text>0个可用</text>
				
			</text>
		</view>
		<view class="buy">购买</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
			 background: #F8F9FA;
			/* background:url("") ; */
			 }
</style>
<style lang="less">
	.container{
		position: relative;
		margin: auto;
		.top{
			background-color: white;
			width: 95%;
			margin-left: 2.5%;
			text-align: center;
			height: 350rpx;
			margin-bottom: 20rpx;
			.price{
				padding-top: 40rpx;
				margin-bottom:20rpx;
				border-bottom: 1px solid #FFFFFF;
				.pri1{
					font-size:35px;
					color: #19CAAD;
				}
				.pri2{
					color: #999999;
				}
			}
			.his{
				position: absolute;
				.his-title{
					left: 0;
					font-weight: bold;
				}
				.his-body{
					left: 0;
					margin-top: 20rpx;
					color: #999999;
				}
			}
			.middle{
				background-color: white;
				height: 120rpx;
				width: 95%;
			}
		}
		.middle{
			background-color: white;
			height: 120rpx;
			width: 95%;
			line-height: 120rpx;
			view::first-child{
				color:#999999 ;
			}
		}
		.buy{
			position: fixed;
			font-size: 16px;
			bottom: 0;
			width: 100%;
			line-height: 90rpx;
			text-align: center;
			height: 90rpx;
			color: white;
			background-color: #19CAAD;
		}
	}
	
</style>