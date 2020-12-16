<template>
	<view class="wrap">
		<navigator url="../teacher/teacher">去名师导读</navigator>
		<navigator url="../fenxiang/fenxiang">去分享</navigator>
		<navigator url="../jieshu/jieshu">去借书</navigator>
		<navigator url="../lanDetail/lanDetail">去栏目详情</navigator>
		<navigator url="../pinglun/pinglun">去评论</navigator>
		<navigator url="../shou/shou">去收藏</navigator>
		<navigator url="../xunzhang/xunzhang">去勋章</navigator>
		<navigator url="../xiaofei/xiaofei">去消费</navigator>
		<navigator url="../about/about">关于我们</navigator>
	</view>
	
</template>
 
<script>
	export default{
	      data(){
		   return{
			
		   }
		},
		methods:{
		   
		}
	}
</script>
 
<style lang="scss">
	.wrap{
		navigator{
			
			width: 50px;
			padding: 10px 20px;
			background-color: pink;
			margin: 0 auto;
			margin-top: 20px;
		}
 }
</style>