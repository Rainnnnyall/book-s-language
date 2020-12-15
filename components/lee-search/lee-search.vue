<template>
	<view :class="['search-input',btnLinkInput ? 'btn-link-input': '']" :style="{height:getHeight}">
		<view class="input-wrap" :style="{fontSize:getFontSize,backgroundColor:getBackgroundColor,border:getBorder,borderWidth:getBorderWidth,borderRadius:getBorderRadius}">
			<view :class="['placeholder-wrap',getPlaceholderPosition]" :style="{paddingLeft:getPlaceholderPaddingLeft,color:getPlaceholderColor}"
			 v-if="!keyWord && getPlaceholderText && !entering">
				<image v-if="showPlaceholderIcon" class="icon" mode="aspectFit" :style="{height:getIconHeight,width:getIconWidth,padding:getIconPadding,transform:'scale('+ iconAttr.scale + ')'}"
				 :src="iconSrc.placeholder"></image>
				<text class="text">{{getPlaceholderText}}</text>
			</view>
			<view class="basic" :style="{height:getHeight,borderRadius:getBorderRadius,color:getColor}">
				<image v-if="showLogoIcon" class="icon icon-logo" mode="aspectFit" :src="iconSrc.logo" :style="{height:getIconHeight,width:getIconWidth,padding:getIconPadding,transform:'scale('+ iconAttr.scale + ')'}"></image>
				<input class="input" :style={paddingLeft:getPaddingLeft} :type="type" :password="password" :disabled="disabled"
				 :maxlength="maxLength" :cursor-spacing="cursorSpacing" :focus="focus" :confirm-type="confirmType" :confirm-hold="confirmHold"
				 :cursor="cursor" :selection-start="selectionStart" :selection-end="selectionEnd" :adjust-position="adjustPosition"
				 v-model="keyWord" @focus="inputFocus" @blur="blur" @input="input" @confirm="confirm" />
				<view class="icon-btn-wrap">
					<!-- #ifdef MP-WEIXIN -->
					<image class="icon" v-if="showVoiceIcon" @click="voice" mode="aspectFit" :src="iconSrc.voice" :style="{height:getIconHeight,width:getIconWidth,padding:getIconPadding,transform:'scale('+ iconAttr.scale + ')'}"></image>
					<image class="icon" v-if="showScanIcon" @click="scan" mode="aspectFit" :src="iconSrc.scan" :style="{height:getIconHeight,width:getIconWidth,padding:getIconPadding,transform:'scale('+ iconAttr.scale + ')'}"></image>
					<!-- #endif -->
					<image class="icon" v-if="showClearIcon" @click="clear" mode="aspectFit" :src="iconSrc.clear" :style="{height:getIconHeight,width:getIconWidth,padding:getIconPadding,transform:'scale('+ iconAttr.scale + ')'}"></image>
					<image class="icon" v-if="showSearchIcon" @click="search" mode="aspectFit" :src="iconSrc.search" :style="{height:getIconHeight,width:getIconWidth,padding:getIconPadding,transform:'scale('+ iconAttr.scale + ')'}"></image>
					<slot name="icon"></slot>
				</view>
			</view>
		</view>
		<view class="btn" v-if="getBtnEnable" :style="{color:getBtnColor,backgroundColor:getBtnBackgroundColor,borderRadius:getBtnBorderRadius,fontSize:getBtnFontSize,border:getBtnBorder,borderWidth:getBtnBorderWidth,lineHeight:getHeight,paddingLeft:getBtnPaddingLeft,paddingRight:getBtnPaddingRight, backgroundImage:getBtnBackgroundImage, bacbackgroundPosition:getBtnBackgroundPosition,backgroundSize:getBtnbackgroundSize}"
		 @click="btnClick">
			{{getBtnText}}
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="voice-module" v-if="openVoice">
			<cover-view :class="['recond-btn',recording ? 'disabled': '']" :style="{backgroundColor: recording ? getVoiceAttrBtnBackgroundActiveColor : getVoiceAttrBtnBackgroundColor,color:recording ? getVoiceAttrBtnActiveColor : getVoiceAttrBtnColor}"
			 @touchstart="startHandel" @touchend="endHandle()" @touchcancel="endHandle()">{{recording ? getVoiceAttrActiveText : getVoiceAttrText}}</cover-view>
			<view class="listen-wrap" v-if="recording" :style="{backgroundColor: getVoiceAttrListenBackgroundColor}">
				<text class="text" :style="{color:getVoiceAttrListenColor}">正在聆听</text>
				<view class="animate">
					<text class="one" :style="{backgroundColor:getVoiceAttrListenColor}"></text>
					<text class="two" :style="{backgroundColor:getVoiceAttrListenColor}"></text>
					<text class="three" :style="{backgroundColor:getVoiceAttrListenColor}"></text>
					<text class="four" :style="{backgroundColor:getVoiceAttrListenColor}"></text>
					<text class="five" :style="{backgroundColor:getVoiceAttrListenColor}"></text>
				</view>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyWord: '',
				entering: false, // 判断是处于输入状态
				openVoice: false, // 打开语音功能
				manager: null,
				recording: false, // 正在录音
				recordStatus: 0, // 状态： 0 - 录音中 1- 翻译中 2 - 翻译完成/二次翻译
			}
		},
		props: {
			btnLinkInput: {
				type: Boolean,
				default: false //控制有btn时，按钮与input框是否相连
			},
			inputAttr: {
				type: Object,
				default: function() {
					return {}
				}
			},
			btnAttr: {
				type: Object,
				default:function() {
					return {}
				}
			},
			voiceAttr: {
				type: Object,
				default: function() {
					return {}
				}
			},
			iconAttr: {
				type: Object,
				default: function() {
					return {}
				}
			},
			iconSrc: {
				type: Object,
				default: function() {
					return {}
				}
			},
			type: {
				type: String,
				default: 'text'
			},
			password: {
				type: Boolean,
				default: false,
			},
			disabled: {
				type: Boolean,
				default: false
			},
			maxLength: {
				type: Number,
				default: -1
			},
			cursorSpacing: {
				type: Number,
				default: 0
			},
			focus: {
				type: Boolean,
				default: false
			},
			confirmType: {
				type: String,
				default: '搜索'
			},
			confirmHold: {
				type: Boolean,
				default: false
			},
			cursor: {
				type: Number
			},
			selectionStart: {
				type: Number,
				default: -1
			},
			selectionEnd: {
				type: Number,
				default: -1
			},
			adjustPosition: {
				type: Boolean,
				default: true
			}
		},
		watch: {
			showVoiceIcon(val) {
				if (!val) {
					this.openVoice = false
				}
			},
			keyWord(val) {
				if (val.length===0) {
					this.entering = false
				}
			}
		},
		computed: {
			showPlaceholderIcon() {
				return this.getPlaceholderText && this.watchToolIcon('placeholder')
			},
			showLogoIcon() {
				return this.watchToolIcon('logo')
			},
			showVoiceIcon() {
				return this.watchToolIcon('voice') && !this.keyWord
			},
			showScanIcon() {
				return this.watchToolIcon('scan') && !this.entering && !this.keyWord
			},
			showClearIcon() {
				return this.watchToolIcon('clear') && this.keyWord
			},
			showSearchIcon() {
				return this.watchToolIcon('search') && this.keyWord
			},
			getFontSize() {
				return uni.upx2px(this.inputAttr.fontSize || 28) + 'px'
			},
			getHeight() {
				return uni.upx2px(this.inputAttr.height && this.inputAttr.height > 60 ? this.inputAttr.height : 60) + 'px'
			},
			getBorder() {
				return this.inputAttr.border || '1px solid #c8c7cc'
			},
			getBorderWidth() {
				return uni.upx2px(this.inputAttr.borderWidth || 1) + 'px'
			},
			getBorderRadius() {
				return uni.upx2px(this.inputAttr.borderRadius || 30) + 'px'
			},
			getColor() {
				return this.inputAttr.color || '#333'
			},
			getBackgroundColor() {
				return this.inputAttr.backgroundColor || '#ffffff'
			},
			getPlaceholderPosition() {
				return this.inputAttr.placeholderPosition || 'left'
			},
			getPlaceholderColor() {
				return this.inputAttr.placeholderColor || '#808080'
			},
			getPlaceholderText() {
				return this.inputAttr.placeholderText || ' '
			},
			getPlaceholderPaddingLeft() {
				if (this.showLogoIcon && this.getPlaceholderPosition === 'left') {
					return uni.upx2px((this.iconAttr.width ? this.iconAttr.width : (this.inputAttr.height || 60)) + (this.inputAttr.paddingLeft ||
							0)) +
						'px'
				} else {
					return uni.upx2px(this.inputAttr.paddingLeft || 20) + 'px'
				}
			},
			getPaddingLeft() {
				if (this.showLogoIcon) {
					return uni.upx2px(this.inputAttr.paddingLeft || 0) + 'px'
				} else {
					return uni.upx2px((this.inputAttr.paddingLeft && this.inputAttr.paddingLeft > 20) ? this.inputAttr.paddingLeft :
						20) + 'px'
				}
			},
			getIconWidth() {
				return this.iconAttr.width ? uni.upx2px(this.iconAttr.width) + 'px' : this.getHeight
			},
			getIconHeight() {
				return this.iconAttr.height ? uni.upx2px(this.iconAttr.height) + 'px' : this.getHeight
			},
			getIconPadding() {
				return uni.upx2px(this.iconAttr.padding) + 'px'
			},

			getBtnEnable() {
				return this.btnAttr.enable || false
			},
			getBtnText() {
				return this.btnAttr.text || ''
			},
			getBtnBackgroundColor() {
				return this.btnAttr.backgroundColor || '#ffffff'
			},
			getBtnColor() {
				return this.btnAttr.color || '#333'
			},
			getBtnBorder() {
				return this.btnAttr.border || 'none'
			},
			getBtnBackgroundImage() {
				return 'url(' + this.btnAttr.backgroundImage + ')'
			},
			getBtnBackgroundPosition() {
				return this.btnAttr.backgroundPosition || 'center center'
			},
			getBtnbackgroundSize() {
				return this.btnAttr.backgroundSize || 'contain'
			},
			getBtnBorderRadius() {
				return uni.upx2px(this.btnAttr.borderRadius || 30) + 'px'
			},
			getBtnFontSize() {
				return uni.upx2px(this.btnAttr.fontSize || 28) + 'px'
			},
			getBtnPaddingLeft() {
				return uni.upx2px(this.btnAttr.paddingLeft || 10) + 'px'
			},
			getBtnPaddingRight() {
				return uni.upx2px(this.btnAttr.paddingRight || 0) + 'px'
			},
			getBtnBorderWidth() {
				return uni.upx2px(this.btnAttr.borderWidth || 1) + 'px'
			},

			getVoiceAttrBtnColor() {
				return this.voiceAttr.btnColor || '#fff'
			},
			getVoiceAttrBtnActiveColor() {
				return this.voiceAttr.btnActiveColor || '#fff'
			},
			getVoiceAttrListenColor() {
				return this.voiceAttr.listenColor || '#fff'
			},
			getVoiceAttrBtnBackgroundColor() {
				return this.voiceAttr.BtnBackgroundColor || '#f1f1f1'
			},
			getVoiceAttrBtnBackgroundActiveColor() {
				return this.voiceAttr.BtnBackgroundActiveColor || '#c8c7cc'
			},
			getVoiceAttrListenBackgroundColor() {
				return this.voiceAttr.listenBackgroundColor || '#c8c7cc'
			},
			getVoiceAttrText() {
				return this.voiceAttr.text || '按住 说活'
			},
			getVoiceAttrActiveText() {
				return this.voiceAttr.activeText || '松开 结束'
			}

		},
		methods: {
			watchToolIcon(icon) {
				let flag = false
				for (let key of Object.keys(this.iconSrc)) {
					if (icon === key && this.iconSrc[key]) {
						flag = true
					}
				}
				return flag
			},
			inputFocus() {
				this.$emit('focus')
			},
			blur() {
				if (!this.keyWord && this.watchToolIcon('scan')) {
					this.entering = false
				}
				this.$emit('blur')
			},
			input() {
				this.entering = true
				this.$emit('input')
			},
			confirm() {
				this.$emit('confirm')
			},
			clear() {
				this.keyWord = ''
				this.$emit('clear')
			},
			
			scan() {
				// 扫码
				uni.scanCode({
					success: function(res) {
						this.$emit('scan', res)
					}
				})
			},
			search() {
				// 搜索
				this.$emit('search')
			},

			btnClick() {
				// 按钮点击事件
				this.$emit('btnClick', this.btnAttr.text)

			},
			voice() {
				this.openVoice = true
			},
			startHandel() {
				console.log('按下录音按钮')
				this.manager.start({
					lang: "zh_CN"
				})
				uni.vibrateShort({
					success: () => {
						this.recordStatus = 0
						this.recording = true
					}
				})
			},
			endHandle() {
				// 防止重复触发stop函数
				if (!this.recording || this.recordStatus !== 0) {
					console.warn("has finished!")
					return
				}
				console.log('松开了按钮')
				this.manager.stop()
				// this.listenManagerStop()
			},
			listenRecordLnit() {
				this.listenManagerStart()
				this.listenManagerStop()
				this.listenManagerRecognize()
				this.listenManagerError()
			},
			listenManagerStart() {
				this.manager.onStart = (res) => {
					console.log('开始录音', res)
				}
			},
			listenManagerRecognize() {
				this.manager.onRecognize = (res) => {
					console.log('识别了新内容', res)
				}
			},
			listenManagerError() {
				this.manager.onError = (res) => {
					console.log('识别错误事件', res)
					this.recording = false

				}
			},
			listenManagerStop() {
				// 识别结束事件
				this.manager.onStop = (res) => {
					console.log('识别结束事件', res)
					let text = res.result

					if (text === '') {
						this.showRecordEmptyTip()
						return
					}
					this.recordStatus = 0
					this.keyWord = res.result.substr(0, res.result.length - 1)
					this.recording = false
				}
			},

			showRecordEmptyTip() {
				this.recording = false
				uni.showToast({
					title: '什么也没听到',
					icon: 'none',
					duration: 1000
				})
			}
		},
		// #ifdef  MP-WEIXIN
		onReady() {
			
			if (this.iconSrc.voice) {
				const plugin = requirePlugin("WechatSI")
				uni.authorize({
					scope: 'scope.record',
					success: () => {
						this.manager = plugin.getRecordRecognitionManager()
						this.listenRecordLnit()
					}
				})
			}
		}
		// #endif
	}
</script>

<style lang="scss" scoped>
	.search-input {
		display: flex;

		&.btn-link-input {
			.input-wrap {
				border-top-right-radius: 0 !important;
				border-bottom-right-radius: 0 !important;
				border-right: 0 !important;
			}

			.btn {
				border-top-left-radius: 0 !important;
				border-bottom-left-radius: 0 !important;
			}
		}

		.icon {
			box-sizing: border-box;
			height: inherit;
			padding: 10upx;
		}

		.btn {
			flex: 0 0 auto;
			min-width: 60upx;
			width: inherit;
			background-repeat: no-repeat;
			background-image: '../../static/icon_search.png';
		}


		.input-wrap {
			flex: 1;
			position: relative;
			box-sizing: border-box;
			display: flex;

			.placeholder-wrap {
				box-sizing: border-box;
				position: absolute;
				top: 0;
				left: 0;
				bottom: 0;
				width: 100%;
				height: inherit;
				background: transparent;

				&.center {
					display: flex;
					align-items: center;
					justify-content: center;
					padding-left: 0 !important;
				}

				&.left {
					box-sizing: border-box;
					display: flex;
					align-items: center;
				}

				.text {
					color: inherit;
				}
			}

			.basic {
				flex: 1;
				box-sizing: border-box;
				display: flex;
				height: inherit;
				width: 100%;
				position: relative;
				z-index: 2;
				align-items: center;

				.icon-btn-wrap {
					flex: 0 0 auto;
					height: inherit;
					font-size: $uni-font-size-base;
					color: $uni-text-color;
					display: flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
				}

				.input {
					box-sizing: border-box;
					flex: 1;
					height: calc(inherit-2upx);
					text-align: left;
					color: inherit;
					border: none;
					outline: none;
					background:transparent;
				}
			}
		}
	}

	.recond-btn {
		position: fixed;
		height: 80upx;
		line-height: 80upx;
		width: 80%;
		bottom: 20upx;
		color: #fff;
		font-size: 32upx;
		left: 50%;
		transform: translateX(-50%);
		border-radius: 40upx;
		// background: rgba(199, 215, 254, 1);

		&.disabled {
			// background: rgba(67, 122, 249, 0.5);
		}
	}


	@keyframes animate {
		0% {
			transform: scale(1, 0)
		}

		20% {
			transform: scale(1, 0.5)
		}

		50% {
			transform: scale(1, 1)
		}

		80% {
			transform: scale(1, 0.5)
		}

		100% {
			transform: scale(1, 0)
		}
	}

	.listen-wrap {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 300upx;
		height: 100upx;
		transform: translate3d(-50%, -50%, 0);
		// background: rgba(67, 122, 249, 0.5);
		border-radius: 50upx;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 99999;

		.text {
			font-size: 28upx;
			margin-right: 10upx;
		}

		.animate {
			height: 28upx;
			display: flex;
			justify-content: center;

			.one {
				animation: animate 0.6s infinite 0.1s;
				-webkit-animation: animate 0.6s infinite 0.1s;
			}

			.two {
				animation: animate 0.6s infinite 0.2s;
				-webkit-animation: animate 0.6s infinite 0.2s;
			}

			.three {
				animation: animate 0.6s infinite 0.3s;
				-webkit-animation: animate 0.6s infinite 0.3s;
			}

			.four {
				animation: animate 0.6s infinite 0.4s;
				-webkit-animation: animate 0.6s infinite 0.4s;
			}

			.five {
				animation: animate 0.6s infinite 0.5s;
				-webkit-animation: animate 0.6s infinite 0.5s;
			}

			.one,
			.two,
			.three,
			.four,
			.five {
				width: 4upx;
				height: 100%;
				margin-left: 6upx;
				border-radius: 50upx;
				display: inline-block;
			}
		}
	}
</style>
