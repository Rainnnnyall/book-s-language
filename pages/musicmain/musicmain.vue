<template>
	<view>
		<view>
			<image :src="`https://imagev2.xmcdn.com/${cover}`" style="display: inline-block; width: 100px;height: 100px;vertical-align: top;"
			 mode=""></image>
			<view style="margin-bottom: 10px; display: inline-block;width: 255px;padding: 0px 10px;">
				<text style="font-weight: 600; display: inline-block;height: 25px;width: 275px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; font-size: 18px;">{{title}}</text>
				<text style="margin-bottom: 10px; display: block;font-size: 14px;color: #bbb;">{{customTitle}}</text>
				<button plain="true" @click="shoucang" class="btn" type="default" size="mini" style="height: 31px; width: 80px;font-size: 13px;">✚订阅</button>
				<button open-type="share" type="default" size="mini" style="position: relative; font-size: 13px; height: 31px; width: 80px; color: white; background-color: rgb(7,193,96);">
					<text class="iconfont icon-weixin"></text>
					<text style="padding-left: 19px;">分享</text>
				</button>
			</view>
		</view>
		<view>
			<view style=" position: relative; width: 670rpx;height: 70px;border: 1px solid #ccc;padding:10px 40rpx;" v-for="(uu,ii) in arr2"
			 :key="ii" :class="{'active':active==ii}">
				<text space="true" decode="true" style="color: red;font-size: 20px;font-weight: 600;margin-right: 5px;float: left;">{{ ii+1 }}</text>
				<text class="main">{{uu.trackInfo.title}}</text>
				<view>
					<text @click="pplly(uu,ii)" class="iconfont" :class="['iconfont',uu.trackInfo.isPaid?'icon-ziyuan100':'icon-bofang']"></text>
					<text class="iconfont icon-erji"></text>
					<text style="color: #bbb;margin-right: 20px;">{{uu.trackInfo.duration}}</text>
					<text class="iconfont icon-shijian"></text>
					<text style="color: #bbb;">{{uu.trackInfo.createdAt}}</text>
				</view>
			</view>
		</view>
		<view>
			<view>
				<audio id="myAudio" :src="`${current.src}`" :poster="current.poster" :name="current.name" :author="current.author"
				 controls></audio>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		myRequestGet
	} from '@/utils/musicpage.js'
	export default {
		onReady: function(e) {
			this.audioCtx = wx.createAudioContext('myAudio')
		},
		data() {
			return {
				current: {
					poster: 'https://cdn.nlark.com/yuque/0/2020/jpeg/2545516/1608098409357-86b68b6f-8a85-442e-a92b-074746974101.jpeg',
					name: '点击播放按钮欣赏节目',
					author: '书语——诉你所抒',
					src: '',
				},
				flag: true,
				active: 9999999999999999999999999999,
				musicid: '',
				cover: '',
				title: '',
				customTitle: '',
				arr2: [],
				acc: 99999999999999999999999999999999999,
				index: 99999999999999999999999999999999,
			}
		},
		methods: {
			pplly(uu, ii) {
				if (this.acc != ii) {
					for (var i = 0; i < this.arr2.length; i++) {
						this.arr2[i].trackInfo.isPaid = false
					}
				}
				uu.trackInfo.isPaid = !uu.trackInfo.isPaid
				console.log(uu.trackInfo.isPaid)
				if (uu.trackInfo.isPaid) {
					setTimeout(() => {
						this.audioCtx.play()
						this.acc = ii
					}, 100)
				} else {
					setTimeout(() => {
						this.audioCtx.pause()
						this.acc = ii
					}, 100)
				}
				this.current.name = uu.trackInfo.title
				this.current.src = uu.trackInfo.playPath
				this.current.poster = `https://imagev2.xmcdn.com/${this.cover}`
				this.active = ii
				this.index = ii
			},
			async music() {
				let result = await myRequestGet(`?albumId=${this.musicid}&page=1&pageSize=20`)
				result = result.data.trackDetailInfos
				this.arr2 = result
			},
			shoucang() {
				uni.showToast({
					title: "订阅成功!"
				})
			}
		},
		onLoad: function(option) {
			this.musicid = option.idd
			this.cover = option.cover
			this.title = option.title
			this.customTitle = option.customTitle
			console.log(this.musicid, this.cover, this.title, this.customTitle)
			this.music()
		}
	}
</script>
<style lang="scss">
	audio {
		position: fixed;
		bottom: 0px;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.icon-weixin {
		font-size: 24px;
		position: absolute;
		left: 15px;
		top: -11px;
	}

	.btn {
		margin-right: 10px;
	}

	.icon-ziyuan100 {
		position: absolute;
		font-size: 33px;
		bottom: 9px;
		right: 14px;

	}

	.icon-bofang {
		position: absolute;
		font-size: 40px;
		bottom: 5px;
		right: 10px;
	}

	.haha {
		background: #ff0000;
	}

	.active {
		color: red;
	}
	.main{
		display:inline-block;
		width: 290px;
		height: 40px;
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
</style>
