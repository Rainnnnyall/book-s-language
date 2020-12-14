<template>
	<view :class="[circle === true || circle === 'true' ? 'uni-fav--circle' : '']" :style="[{ backgroundColor: checked ? bgColorChecked : bgColor }]"
	 @click="onClick" class="uni-fav">
		<text :style="{color: checked ? fgColorChecked : fgColor}" class="uni-fav-text iconfont icon-shoucang" ></text>
	</view>
</template>

<script>
	export default {
		name: "UniFav",
		
		props: {
			star: {
				type: [Boolean, String],
				default: true
			},
			bgColor: {
				type: String,
				default: "#eeeeee"
			},
			fgColor: {
				type: String,
				default: "#666666"
			},
			bgColorChecked: {
				type: String,
				default: "#007aff"
			},
			fgColorChecked: {
				type: String,
				default: "#FFFFFF"
			},
			circle: {
				type: [Boolean, String],
				default: false
			},
			checked: {
				type: Boolean,
				default: false
			},
			contentText: {
				type: Object,
				default () {
					return {
						contentDefault: "收藏",
						contentFav: "已收藏"
					};
				}
			}
		},
		watch: {
			checked() {
				if (uni.report) {
					if (this.checked) {
						uni.report("收藏", "收藏");
					} else {
						uni.report("取消收藏", "取消收藏");
					}
				}
			}
		},
		methods: {
			onClick() {
				this.$emit("click");
			}
		}
	};
</script>

<style lang="scss" scoped>
	$fav-height: 25px;

	.uni-fav {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 60px;
		height: $fav-height;
		line-height: $fav-height;
		text-align: center;
		border-radius: 3px;
	}

	.uni-fav--circle {
		border-radius: 30px;
	}

	.uni-fav-star {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		height: $fav-height;
		line-height: 24px;
		margin-right: 3px;
		align-items: center;
		justify-content: center;
	}

	.uni-fav-text {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		height: $fav-height;
		line-height: $fav-height;
		align-items: center;
		justify-content: center;
		font-size: $uni-font-size-base;
	}
</style>
