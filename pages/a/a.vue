<template>
	<view>
		
		<button class="bottom" type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">授权登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			
			return {
				
			}
		},
		onLoad() {
			this.changeLogin();
		},
		methods: {
			changeLogin(){
				// 授权
				// 获取用户详细信息, 可以获取到说明已经授权过, 直接拿到用户信息
				uni.getUserInfo({
					provider: 'weixin',
					//授权成功的回调
					success(res) {
						uni.showToast({
						    title:'授权成功',
							icon:'none'
						})
						console.info(res.data)
						//that.login(res.data);//授权成功调用自己的登录方法就可以了
					},
					//第一次进入小程序
					fail() {
						uni.showToast({
							title: '请点击授权进行登录',
							icon: 'none'
						});
					}
				});
			  }

            
		},
		onGotUserInfo(e) {
		    console.info(e.detail)
		    console.info(e.detail.userInfo);
		}
		
	}
	
</script>

<style>

</style>
