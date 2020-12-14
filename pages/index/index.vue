<template>
	<view class="wrap">
		<navigator url="../teacher/teacher">去名师导读</navigator>
	</view>
	
</template>
 
<script>
	export default{
	      data(){
		   return{
			isFload: true 
		   }
		},
		methods:{
		    fload(){
                          //改变isFload的状态
			  this.isFload = !this.isFload;
		    }
		}
	}
</script>
 
<style>
	.wrap{
		width:700upx;
		display: flex;
		font-size:26upx;
		justify-content: space-between;
		margin: 0 auto;
		position: relative;
	}
	.fload{
		width:600upx;
		height: auto;
		display: -webkit-box;
		word-break: break-all;
		-webkit-box-orient: vertical;
		/* 要显示多少行就改变line-clamp的数据,此处折叠起来显示一行*/
		-webkit-line-clamp: 3;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-right: 40upx;
		background-color:#F5F5F5;
	}
	.hide{
		display: -webkit-box;
	}
	.show{
		display: block;
	}
	.icon-bofang{
		position: absolute;
		bottom: 0;
	}
 
</style>