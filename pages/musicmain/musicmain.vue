<template>
	<view>
		<view>
			<image :src="`https://imagev2.xmcdn.com/${cover}`" style="display: inline-block; width: 100px;height: 100px;vertical-align: top;"
			 mode=""></image>
			<view style="margin-bottom: 10px; display: inline-block;width: 255px;padding: 0px 10px;">
				<text style="display: inline-block;height: 25px;width: 275px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap; font-size: 18px;">{{title}}</text>
				<button @click="shoucang" class="btn" type="default" size="mini">收藏</button>
				<button open-type="share" type="default" size="mini">分享</button>
			</view>
		</view>
		<view>
			<view   style="width: 670rpx;height: 70px;border: 1px solid #ccc;padding:10px 40rpx;" v-for="(uu,ii) in arr2"
			 :key="ii" :class="{'active':active==ii}">
				<text>{{uu.trackInfo.title}}</text>
				<view>
					<!-- <text class="iconfont icon-erji"></text> -->
					<button style="float: right;" size="mini" @click="audioPause(uu,ii)">暂停</button>
					<button style="float: right;" size="mini"  @click="audioPlay(uu,ii)">播放</button>
					
					<text style="color: #bbb;margin-right: 20px;">{{uu.trackInfo.duration}}</text>
					<text class="iconfont icon-shijian"></text>
					<text style="color: #bbb;">{{uu.trackInfo.createdAt}}</text>
				</view>
			</view>
		</view>
		<view style="position: fixed;bottom: 0px;background-color: white;">
			<view class="page-body">
				<view class="page-section page-section-gap" style="text-align: center;">
					<audio id="myAudio" style="width: 750rpx;border: 0px;" :src="`${current.src}`" :poster="`${current.poster}`" :name="`${current.name}`"
					 :author="`${current.author}`" controls></audio>
				</view>
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
					poster: '',
					name: '',
					author: '书语——诉你所抒',
					src: '',
				},


				active: 0,
				musicid: '',
				cover: '',
				title: '',
				arr2: []
			}
		},
		methods: {
			audioPlay(uu,ii) {
				console.log(uu)
				this.current.name = uu.trackInfo.title
				this.current.src = uu.trackInfo.playPath
				this.current.poster = `https://imagev2.xmcdn.com/${this.cover}`
				console.log(this.cover, "ssssssssssssssssssssssssssssssssss")
				// innerAudioContext.autoplay = true;
				// innerAudioContext.src = `https://imagev2.xmcdn.com/${this.cover}`
				// innerAudioContext.onPlay(() => {
				//   console.log('开始播放');
				// });
				// innerAudioContext.onError((res) => {
				//   console.log(res.errMsg);
				//   console.log(res.errCode);
				// });
				this.active = ii
				this.audioCtx.play()
			},
			audioPause(uu,ii){
				console.log(uu)
				this.current.name = uu.trackInfo.title
				this.current.src = uu.trackInfo.playPath
				this.current.poster = `https://imagev2.xmcdn.com/${this.cover}`
				console.log(this.cover, "ssssssssssssssssssssssssssssssssss")
				// innerAudioContext.autoplay = true;
				// innerAudioContext.src = `https://imagev2.xmcdn.com/${this.cover}`
				// innerAudioContext.onPlay(() => {
				//   console.log('开始播放');
				// });
				// innerAudioContext.onError((res) => {
				//   console.log(res.errMsg);
				//   console.log(res.errCode);
				// });
				this.active = ii
				this.audioCtx.pause()
			},
			async music() {
				console.log(this.musicid, "55555555555555555")
				let result = await myRequestGet(`?albumId=${this.musicid}&page=1&pageSize=20`)
				result = result.data.trackDetailInfos
				this.arr2 = result
				console.log(result)

			},
			shoucang() {
				uni.showToast({
					title: "收藏成功!"
				})
			}
		},
		onLoad: function(option) {
			this.musicid = option.idd
			this.cover = option.cover
			this.title = option.title
			console.log(this.musicid, this.cover, this.title)
			this.music()
		}

	}
</script>

<style lang="scss">
	.btn {
		margin-right: 10px;
	}

	.icon-bofang {
		font-size: 40px;
		float: right;
	}

	.haha {
		background: #ff0000;
	}

	.active {
		color: red;
	}
</style>
