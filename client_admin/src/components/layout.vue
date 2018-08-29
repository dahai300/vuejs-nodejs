<template>
	<div class="layout-container">
		<div class="header">
			<h1 class="logo">MYWEBADMIN</h1>
			<div class="user-info">
				<span class="logout" @click="logout">退出</span>
			</div>
		</div>
		<div class="layout-content">
			<div class="aside">
				<ul class="menu">
				    <li class="item"><router-link class="itema" to="/users">用户</router-link></li>
				    <li class="item"><router-link class="itema" to="/products">产品</router-link></li>
				    <li class="item"><router-link class="itema" to="/news">新闻</router-link></li>
				</ul>
			</div>
			<div class="content">
				<router-view/>
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		methods:{
			logout(){
				this.$store.commit('LOGOUT');
				this.$router.push('/login');
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.layout-container{
		height:100%;
		position:relative;
		width:100%;
		.header{
			height:80px;
			width:100%;
			background-color:#000;
			position:absolute;
			left:0;
			top:0;
			color:#fff;
			.logo{
				height:80px;
				line-height:80px;
				text-indent:12px;
				font-size:16px;
			}
			.user-info{
				position:absolute;
				right:12px;
				bottom:12px;
				.logout{
					padding:12px;
					cursor:pointer;
					color:#ccc;
				}
			}
		}
		.layout-content{
			position:absolute;
			left:0;
			width:100%;
			height:100%;
			top:80px;
			display:flex
			.aside{
				flex: 0 0 140px;
				background-color:#000;
				height:100%;
				.menu{
					margin-top:40px;
					.item{
						width:100%;
						height:40px;
						line-height:40px;
						display:block;
						text-indent:12px;
						.itema{
							width:100%;
							height:100%;
							display:block;
						}
						.router-link-exact-active{
							background-color:#fff
						}
					}
				}
			}
			.content{
				flex:1;
				width:100%;
				height:100%;
			}
		}
	}
</style>