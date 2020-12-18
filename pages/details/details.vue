<template>
	<view class="details">
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
			<button style="none" @click="dianji"><text class="jj" :class="flag?'dianji':''">简介</text></button>
			<button style="none" @click="dianji1"><text class="syq" :class="flag?'':'dianji'">书友圈</text></button>
		</view>
		<!-- 作者简介，书籍介绍 -->
		<view class="zznrtwjj jianting1">
			<!-- #ifdef MP-WEIXIN|H5|APP-PLUS -->
			<rich-text class="tjy" :nodes="list.zznrtwjj"></rich-text>
			<!-- #endif -->
			<text :class="list.zznrtwjj!=''||list.zzjs==''?'cang':'sh'"><text class="bo">{{list.zzjs}}</text></text>
			<text :class="list.zznrtwjj!=''||list.nrjj==''?'cang':'sh'"><text class="header">书籍介绍</text>\n<text class="bo">{{list.nrjj}}\n\n</text></text>
			<!-- #ifdef MP-ALIPAY -->
			<rich-text class="tjy" :nodes="htmlNodes"></rich-text>
			<!-- #endif -->
		</view>
		<!-- 书友圈 -->
		<view class="syqpl jianting2">
			<view class="comments" v-for="item in comments" :key="item.id">
				<view class="tou">
					<view class="timg">
						<image :src="item.tx" v-if="item.tx"></image>
						<image src="../../static/2345_image_file_copy_1.jpg" v-else></image>
						<text>{{item._cuser}}</text>
					</view>
					<!-- :class="['zan',item.flag?'red':'nored']" -->
					<text class="zan" @click="dianzan(item.dzs,item.id)" v-model="item.dzs" :class="item.hfs===1?'red':''">{{item.dzs}}
						<text class="iconfont icon-zan"></text></text>
				</view>
				<view class="ping">
					{{item.yhly}}
				</view>
				<view class="shu" @click="goDetail(item.pid)">
					<view class="s-yes" v-if="item.fxtp">
						<image :src="`https://uptownlet.com/appendix/image.jspx?id=${item.fxtp}`"></image>
						<view class="shu-right">
							<text>{{item.fxmc}}</text>
							<text>{{item.fxzz}}</text>
						</view>
					</view>
					<view class="s-no" v-else>
						<text class="iconfont icon-bofang1"></text>
					</view>
				</view>
				<view class="shi">
					<text>{{item.cdate}}</text>
					<text @click="speack(item.id)"><text class="iconfont icon-pinglun"></text>评论</text>
				</view>
			</view>
			<input type="text" value="" :focus="Boolean" confirm-type="string" placeholder="请输入评论" />
			<button type="primary" class="btn" size="mini" form-type="submit" open-type="getUserInfo" @getuserinfo="getuserinfo">发送</button>
		</view>

		<!-- 精品推荐 -->
		<view class="tuijian">
			<text class="header">精品推荐</text>
			<view class="tjsj-all">
				<view class="tjsj-one" v-for="item2 in list2.data" :key="item2.id" @click="godetails(item2)">
					<image :src="`https://uptownlet.com/appendix/image.jspx?id={{item2.tp}}`" mode=""></image>
					<text>{{item2.bt}}</text>
				</view>
			</view>
		</view>


		<!-- 底部 -->
		<view class="footer">
			<button>
				可借提醒
			</button>
		</view>
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
				commentsDetail: [],
				item1: [],
				list2: [],
				htmlNodes: [],
				flag: true,
				gao: 0,
				value: '',
				cont: {},
			}
		},
		onLoad(options) {
			/* options是接收的上一个页面传递的信息 */
			this.item1 = options;
			/* 调用函数 */
			console.log(options.id, "-------------");
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
					this.commentsDetail = result1.data
				}
				let result2 = await myRequestGet(
					`/portal.php?resid=SbAction.jptj&lx=2M8QUIME&tsid=3e131263d90a440b97c2f198443c25af`
				)
				if (result2 != 0) {
					this.list2 = result2.data
				}
				// console.log(this.list, "11111")
				console.log(this.commentsDetail, "33333")
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
			/* 点赞 */
			dianzan(dzs, id, zt) {
				for (var i = 0; i < this.commentsDetail.length; i++) {
					if (id == this.commentsDetail[i].id) {
						if (this.commentsDetail[i].zt == 1) {
							this.commentsDetail[i].zt = 0
							this.commentsDetail[i].dzs++
						} else {
							this.commentsDetail[i].zt = 1
							this.commentsDetail[i].dzs--
						}
					}
				}
				uni.setStorageSync("commentsDetail", this.commentsDetail)


				this.commentsDetail.flag = true

			},
			/* 精品书推荐点击事件 */
			godetails(item2) {
				uni.navigateTo({
					url: `../details/details?id=${item2.id}`
				})
			},
			/* 发表评论 */
			getuserinfo: function() {
				// wx登录
				let that = this
				uni.login({
					success(res) {
						if (res.code) {
							//发起网络请求
							var code = res.code
							// 获取微信用户信息
							uni.getUserInfo({
								success: (res) => {
									that.cont = res.userInfo
									console.log(that.cont)
								},
								fail: res => {

								}
							})

						} else {

						}
					}
				})
			},
		},
	}
</script>
<style lang="less">
	.details {
		// position: relative;

		.header {
			margin: 16rpx 0;
			font-weight: bold;
			font-size: 28rpx;
			padding: 20rpx;
		}

		.head {
			width: 100px;
			height: 120px;
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
            border-bottom: 1px solid #e5e5e5;
			.dianji {
				border-bottom: 1px solid rgb(25, 202, 173);
				color: rgb(25, 202, 173);
			}

			button::after{
				border: none;
			}

			/* 简介，书友圈按钮 */
			button {
				font-size: 14px;
				width: 50%;
				border: 0;
				display: inline-block;
				background-color: #FFFFFF;
				margin-top: 10px;
				font-size: 14px;
                color: #666;
				text {
					padding: 10px;
					border-bottom:1px solid #4CD964 ;
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

					.red {
						color: red;
					}

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
					width: 105px;
					margin-top: 5px;

					image {
						width: 100%;
						height: 120px;
						display: block;
						border-radius: 10px;
					}

					text {
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2; //控制行数
						overflow: hidden;
						font-size: 14px;
						line-height: 21px;
						margin-top: 5px;
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

			button {
				width: 340px;
				color: #fff;
				height: 30px;
				line-height: 30px;
				background-color: #4CD964;
				border: none;
				outline: none;
				border-radius: 20px;
				color: #fff;
				font-size: 14px;
				margin-bottom: 5px;
			}

		}
	}
</style>
