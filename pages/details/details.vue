<template>
	<view class="details">
		<scroll-view scroll-y="">
			<view class="head">
				<view class="left">
					<text :class="item1.kjsl==0?'bukejie':'kejie'">{{item1.kjsl==0?'已借出':'可借'}}</text>
				</view>
				<view class="center">
					<image :src="`https://uptownlet.com/appendix/image.jspx?id={{list.fm}}`" mode="widthFix"></image>
				</view>
				<view class="right">
					<icon class="iconfont iconfenxiang"></icon>
					<icon class="iconfont iconicon-" :class="list.lx=='2CT07MLO'?'show':''"></icon>
				</view>
			</view>
			<view class="xx">
				<text class="sm">{{list.sm}}</text>
				<text class="zz">{{list.zz}}</text>
				<text class="cbs">{{list.cbs}}/{{list.cbrq}}</text>
				<view class="sheng">
					<icon class="iconfont iconhuo"><text>{{list.zxrd}}</text></icon>
					<icon class="iconfont iconsheng"><text>￥{{list.yj}}</text></icon>
				</view>
			</view>
			<view class="jjsyq">
				<button><text class="jj">简介</text></button>
				<button><text class="syq">书友圈</text></button>
			</view>
			<view class="zznrtwjj">
				<!-- #ifdef MP-WEIXIN|H5|APP-PLUS -->
				<rich-text class="tjy" :nodes="list.zznrtwjj"></rich-text>
				<!-- #endif -->
				<text :class="list.zznrtwjj!=''||list.zzjs==''?'cang':'sh'"><text class="header">作者介绍</text>\n<text class="bo">{{list.zzjs}}\n\n</text></text>
				<text :class="list.zznrtwjj!=''||list.nrjj==''?'cang':'sh'"><text class="header">书籍介绍</text>\n<text class="bo">{{list.nrjj}}\n\n</text></text>
				<!-- #ifdef MP-ALIPAY -->
				<rich-text class="tjy" :nodes="htmlNodes"></rich-text>
				<!-- #endif -->
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
				list: {},
				item1: [],
				htmlNodes: [],
			}
		},
		onLoad(options) {
			this.item1 = options;
			this.getSwiper(options);
		},
		methods: {
			async getSwiper(options) {
				let result = await myRequestGet(
					`/portal.php?resid=QueryBookAction.qmbook&rowid=${options.tsid}&yhid=c935e06c19dd4a6cb5dcc500d3af21dd`)
				if (result != 0) {
					this.list = result.data
				}
				console.log(this.list, "11111")
			},
		}
	}
</script>

<style lang="less">
	.head {
		width: 100%;
		height: 500rpx;
		display: flex;
		justify-content: space-between;

		.left {
			width: 150rpx;
			vertical-align: top;
			margin-top: 20px;

			.kejie {
				display: block;
				width: 150rpx;
				color: #92E6D8;
				border: 1px solid #92E6D8;
				border-radius: 15px;
				margin-left: -15px;
				margin-bottom: 5px;
				padding: 2px;
				text-align: center;
			}

			.bukejie {
				display: block;
				width: 150rpx;
				text-align: center;
				color: pink;
				border: 1px solid pink;
				border-radius: 15px;
				margin-left: -15px;
				margin-bottom: 5px;
				padding: 2px;
			}
		}

		.center {
			flex: 1;
			text-align: center;

			image {
				width: 300rpx;
			}
		}

		.right {
			vertical-align: top;
			width: 100rpx;
			vertical-align: top;
			margin-top: 20px;
			color: #92E6D8;

			.iconfont {
				font-size: 1.5em;
			}

			.iconicon- {
				display: block;
				margin-top: 10px;
				margin-left: -5px;
				font-size: 2em;
				display: none;
			}

			.show {
				display: block;
			}
		}
	}

	.xx {
		display: flex;
		flex-direction: column;
		text-align: center;

		.sm {
			font-weight: bold;
			margin-bottom: 10px;
		}

		.zz {
			color: #CCCCCC;
			margin-bottom: 10px;
		}

		.cbs {
			color: #CCCCCC;
			margin-bottom: 10px;
		}

		.iconfont {
			margin-right: 20px;
			font-size: 1.2em;
		}

		.iconhuo {
			color: rgb(239, 115, 32);

			text {
				color: #3B4144;
				font-size: 0.8em;
			}
		}

		.iconsheng {
			color: rgb(247, 182, 31);

			text {
				text-decoration: line-through;
				color: #3B4144;
				font-size: 0.8em;
			}
		}
	}

	.jjsyq {
		margin-bottom: 20px;

		button {
			width: 50%;
			border: 0;
			display: inline-block;
			background-color: #FFFFFF;
			margin-top: 10px;
			opacity: 0.5;

			text {
				padding: 10px;
				border-bottom: 1px solid rgb(25, 202, 173);
			}
		}
	}

	.zznrtwjj {
		padding: 10px;

		.cang {
			display: none;
		}

		.sh {
			.header {
				font-weight: bold;
			}

			.bo {
				color: #C0C0C0;
			}
		}
	}
</style>
