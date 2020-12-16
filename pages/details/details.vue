<template>
	<view class="details">
		<scroll-view scroll-y="">
			<!-- 头部 -->
			<view class="head">
				<!-- 可借/不可借 -->
				<view class="left">
					<text :class="item1.kjsl==0?'bukejie':'kejie'">{{item1.kjsl==0?'已借出':'可借'}}</text>
				</view>
				<!-- 图片 -->
				<view class="center">
					<image :src="`https://uptownlet.com/appendix/image.jspx?id={{list.fm}}`" mode="widthFix"></image>
				</view>
				<!-- 分享/MP3 -->
				<view class="right">
					<icon class="iconfont iconfenxiang"></icon>
					<icon class="iconfont iconicon-" :class="list.lx=='2CT07MLO'?'show':''"></icon>
				</view>
			</view>
			<!-- 出版信息 -->
			<view class="xx">
				<text class="sm">{{list.sm}}</text>
				<text class="zz">{{list.zz}}</text>
				<text class="cbs">{{list.cbs}}/{{list.cbrq}}</text>
				<view class="sheng">
					<icon class="iconfont iconhuo"><text>{{list.zxrd}}</text></icon>
					<icon class="iconfont iconsheng"><text>￥{{list.yj}}</text></icon>
				</view>
			</view>
			<!-- 简介 书友圈 -->
			<view class="jjsyq" :class="gao>=380?'xvanting':''">
				<button @click="dianji"><text class="jj" :class="flag?'dianji':''">简介</text></button>
				<button @click="dianji1"><text class="syq" :class="flag?'':'dianji'">书友圈</text></button>
			</view>
			<!-- 作者简介，书籍介绍 -->
			<view class="zznrtwjj jianting1">
				<!-- #ifdef MP-WEIXIN|H5|APP-PLUS -->
				<rich-text class="tjy" :nodes="list.zznrtwjj"></rich-text>
				<!-- #endif -->
				<text :class="list.zznrtwjj!=''||list.zzjs==''?'cang':'sh'"><text class="header">作者介绍</text>\n<text class="bo">{{list.zzjs}}\n\n</text></text>
				<text :class="list.zznrtwjj!=''||list.nrjj==''?'cang':'sh'"><text class="header">书籍介绍</text>\n<text class="bo">{{list.nrjj}}\n\n</text></text>
				<!-- #ifdef MP-ALIPAY -->
				<rich-text class="tjy" :nodes="htmlNodes"></rich-text>
				<!-- #endif -->
			</view>
			<!-- 书友圈 -->
			<view class="syqpl jianting2">
				<text class="header">书友圈</text>
				<view class="sypl" v-for="item in list1" :key="item.id">
					<image :src="`{{item.tx}}`" mode="" class="tx"></image>
					<view class="xinxi">
						<text class="username">{{item._cuser}}</text>
						<text class="yhly">{{item.yhly}}</text>
						<text class="cdate">{{item.cdate}}</text>
					</view>
					<view class="dzhf">
						<view class="dianzan">
							<text>{{item.dzs}}</text>
							<icon class="iconfont iconiconfontzhizuobiaozhun44"></icon>
						</view>
						<icon class="iconfont iconmore"></icon>
					</view>
				</view>
				<input type="text" value="" :focus="Boolean" confirm-type="string" placeholder="请输入评论" v-model="value" />
				<button type="primary" class="btn" size="mini">发送</button>
			</view>

			<!-- 精品推荐 -->
			<view class="tuijian">
				<text>精品推荐</text>
				<view class="tjsj-all">
					<view class="tjsj-one" v-for="item2 in list2.data" :key="item2.id" @click="godetails(item2)">
						<image :src="`https://uptownlet.com/appendix/image.jspx?id={{item2.tp}}`" mode=""></image>
						<text>{{item2.bt}}</text>
					</view>
				</view>
			</view>


			<!-- 底部 -->
			<view class="footer">
				<view class="shoucang" @click="shoucang(list.id)">
					<icon class="iconfont iconshoucang sctb"></icon>
					<text class="scz">收藏</text>
				</view>
				<view class="jia">
					<text class="sbs">4本</text>
					<text class="jrsb">加入书包</text>
				</view>
				<view class="jieyue">
					<icon class="iconfont iconwodejieyue ljjetb"></icon>
					<text class="ljjyz">立即借阅</text>
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
				list: {},
				list1: [],
				item1: [],
				list2: [],
				htmlNodes: [],
				flag: true,
				gao: 0,
			}
		},
		onLoad(options) {
			/* options是接收的上一个页面传递的信息 */
			this.item1 = options;
			/* 调用函数 */
			this.getSwiper(options);
		},
		methods: {
			/* 获取数据库信息 */
			async getSwiper(options) {
				let result = await myRequestGet(
					`/portal.php?resid=QueryBookAction.qmbook&rowid=${options.id}&yhid=c935e06c19dd4a6cb5dcc500d3af21dd`)
				if (result != 0) {
					this.list = result.data
				}
				let result1 = await myRequestGet(
					`/portal.php?resid=LyplAction.lyplList&tid=${options.id}&openid=ouJlZ5CQg49u6u6ODEcn28BckzmU&pllx=1X7FJT1B&yhid=c935e06c19dd4a6cb5dcc500d3af21dd`
				)
				if (result1 != 0) {
					this.list1 = result1.data
				}
				let result2 = await myRequestGet(
					`/portal.php?resid=SbAction.jptj&lx=2M8QUIME&tsid=3e131263d90a440b97c2f198443c25af`
				)
				if (result2 != 0) {
					this.list2 = result2.data
				}
				// console.log(this.list, "11111")
				// console.log(this.list1, "33333")
				// console.log(this.list2, 5555555)
			},
			/* 简介点击事件 */
			dianji() {
				this.flag = true;
				uni.createSelectorQuery().select(".jianting1").boundingClientRect(function(res) {
					uni.pageScrollTo({
						scrollTop: res.top,
						duration: 300
					});
				}).exec()
			},
			/* 书友圈点击事件 */
			dianji1() {
				this.flag = false;
				uni.createSelectorQuery().select(".jianting2").boundingClientRect(function(res) {
					uni.pageScrollTo({
						scrollTop: res.top,
						duration: 300
					});
				}).exec()
			},
			/* 滚动条监视 */
			onPageScroll(e) {
				// console.log(e.scrollTop,22222); //距离页面顶部距离
				this.gao = e.scrollTop
				uni.createSelectorQuery().select(".jianting2").boundingClientRect((res) => {
					// console.log(res.top,11111)
					if (e.scrollTop >= res.top) {
						this.flag = false;
					} else {
						this.flag = true;
					}
				}).exec()

			},
			/* 精品书推荐点击事件 */
			godetails(item2) {
				uni.navigateTo({
					url: `../details/details?id=${item2.id}`
				})
			}
		}
	}
</script>
<style lang="less">
	.details {
		position: relative;

		.head {
			width: 100%;
			height: 500rpx;
			display: flex;
			justify-content: space-between;

			.left {
				width: 150rpx;
				vertical-align: top;
				margin-top: 20px;
				/* 可借不可借 */
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
			/* 书籍图片 */
			.center {
				flex: 1;
				text-align: center;

				image {
					width: 300rpx;
				}
			}
			/* 分享，mp3 */
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
			width: 100%;
			margin-bottom: 20px;
			background-color: #FFFFFF;
			
			.dianji {
				border-bottom: 1px solid rgb(25, 202, 173);
				color: rgb(25, 202, 173);
			}
			/* 简介，书友圈按钮 */
			button {
				width: 50%;
				border: 0;
				display: inline-block;
				background-color: #FFFFFF;
				margin-top: 10px;
				opacity: 0.5;

				text {
					padding: 10px;
				}
			}
		}
		/* 简介、书友圈悬停 */
		.xvanting {
			position: fixed;
			top: 0;
			z-index: 100;

			button {
				margin-top: 0;
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

		/* 书友圈评论 */
		.syqpl {
			display: flex;
			flex-direction: column;
			margin-bottom: 100px;

			.header {
				font-weight: bold;
				margin: 20px;
			}
			/* 书友评论 */
			.sypl {
				display: flex;
				justify-content: space-between;
				height: 80px;
				padding-top: 10px;
				padding-right: 5px;
				margin-bottom: 30px;
				/* 评论头像 */
				.tx {
					width: 40px;
					height: 40px;
					border-radius: 50%;
				}
				/*评论信息  */
				.xinxi {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}

				.dzhf {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					text-align: center;

					.iconfont {
						font-size: 1.5em;
					}
				}
			}
			/* 评论输入框 */
			input {
				width: 610rpx;
				height: 30px;
				line-height: 30px;
				padding-left: 20px;
				padding-right: 20px;
				background-color: rgb(238, 238, 238);
				border-radius: 20px;
				margin-bottom: 20px;
				margin-left: 15px;
			}
			/*评论提交按钮 */
			.btn {
				background-color: rgb(25, 202, 173);
			}
		}

		/* 精品书推荐 */
		.tuijian {
			margin-bottom: 100px;

			.tjsj-all {
				display: flex;
				justify-content: space-around;

				.tjsj-one {
					padding: 5px;
					flex: 1;

					image {
						width: 100%;
						height: 150px;
						display: block;
					}
				}
			}
		}

		// 足部
		.footer {
			width: 100%;
			display: flex;
			z-index: 100;
			padding-top: 10px;
			justify-content: space-between;
			background-color: #FFFFFF;
			position: fixed;
			bottom: 0;
			/* 收藏 */
			.shoucang {
				margin-left: 20px;
				text-align: center;

				.sctb {
					display: block;
					font-size: 1.5em;

				}
			}
			/* 加入书包 */
			.jia {
				background-color: rgb(25, 202, 173);
				color: #ffffff;
				padding: 0 10px;
				text-align: center;
				border-radius: 20px;
				margin-bottom: 10px;
				line-height: 38px;
				.sbs {
					padding: 10px 20px;
					border-right: 1px solid #ffffff;
				}
				.jrsb {
					padding: 10px 30px;
				}
			}
            /* 立即借阅 */
			.jieyue {
				margin-right: 20px;
				text-align: center;

				.ljjetb {
					display: block;
					font-size: 1.5em;

				}
			}
		}
	}
</style>
