<template>
	<view>
		<view class="sousuo">
			<text class="iconfont icon-sousuo"></text>
			<input type="text" v-model="inputValue" @confirm="search" placeholder="搜索书名/作者/关键字······" />
			<button @click="getdate">搜索</button>
		</view>
		<view style="display: flex;align-items: center;justify-content: space-between;box-sizing: border-box;padding: 0px 5px;">
			<text class="head">历史记录</text>
			<view style="color: red;font-size: 28px;" @click="empty">×</view>
		</view>
		<view class="histview">
			<text v-for="(item,index) in carts" :key="index" class="historytext">{{item}}</text>
		</view>
		<view >
			<text class="head">热门搜索</text>
			<text v-for="(item,index) in obj" :key="index" class="historytextdown" @click="touch(item)">{{item}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputValue: '',
				carts: [],
				obj: ['一年顶十年',
					'儿童大脑 开窍指南',
					'大话西方艺术',
					'如何高效学习:1年完成MIT4年33门课程的整体性学习法',
					'性格的力量'
				]
			}
		},
		methods: {
			touch(item){
				this.inputValue=item
				this.getdate()
			},
			search() {
				if (this.inputValue.trim().length == 0) {
					uni.showModal({
						title: '搜索内容不能为空',

					});
				} else {
					if (!this.carts.includes(this.inputValue)) {
						this.carts.unshift(this.inputValue);
						uni.setStorage({
							key: 'searchList',
							data: this.carts
						});
					} else {
						//有搜索记录，删除之前的旧记录，将新搜索值重新push到数组首位
						let i = this.carts.indexOf(this.inputValue);
						this.carts.splice(i, 1);
						this.carts.unshift(this.inputValue);
						// uni.showToast({
						// 	title: '请勿重复输入'
						// });
						uni.setStorage({
							key: 'searchList',
							data: this.carts
						});
					}
				}
			},
			getdate() {
				this.search()
			},
			empty() {
				uni.showToast({
					title: '已清空'
				});
				uni.removeStorage({
					key: 'searchList'
				});

				this.carts = [];
			}
		},
		async onLoad() {
			let list = await uni.getStorage({
				key: 'searchList'
			});
			console.log(list);

			if (list[1].data) {
				this.carts = list[1].data;
			}
		}


	}
</script>

<style lang="scss">
	.sousuo {
		height: 25px;
		width: 355px;
		margin: 0 auto;
		background-color: #eee;
		border-radius: 17px;
		padding: 0px 5px 0px 10px;
		overflow: hidden;

		.icon-sousuo {
			display: inline-block;
			font-size: 20px;
			vertical-align: top;
		}

		button {
			padding: 0px 25px;
			margin-right: -10px;
			margin-top: -6px;
			float: right;
			// width: 100px;
			// height: 25px;
			font-size: 14px;
		}

		input {
			width: 260px;
			display: inline-block;
		}
	}



	.head {
		font-size: 20px;
		margin-top: 10px 0px;
		display: block;
	}

	.histview {
		width: 355px;
		height: 187px;
		overflow:auto;

		.historytext {
			display: inline-block;
			margin: 10px 0px;
			margin-left: 10px;
			padding: 5px;
			border-radius: 10px;
			background-color: #eee;

		}
	}
	.historytextdown {
		display: inline-block;
		margin-left: 10px;
		margin-bottom: 10px;
		padding: 5px;
		border-radius: 10px;
		background-color: #eee;
	
	}
</style>
