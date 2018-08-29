<template>
	<div class="login-page">
	  <div class="form">
	   <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="signin">登录</el-button>
      </el-form-item>
    </el-form>
	  </div>
	</div>
</template>

<script>
  import axios from 'axios';
  import {SERVER_API_URL} from '@/basecomponents/var'

	export default{
    data(){
      return{
        form:{
          email:'',
          password:''
        } 
      }
    },
    methods:{
      signin(){
        var email=this.form.email;
        var password=this.form.password;
        var _this=this;
        if(!email || !password){
          return;
        }
        var url=`${SERVER_API_URL}/admin/signin`;
        axios.post(url,{
          email:email,
          password:password
        }).then((res)=>{
          if(res.data.code===1){
            var token=res.data.token;
            var refreshToken=res.data.refreshToken;
            _this.$store.commit("LOGIN",{
              token:token,
              refreshToken:refreshToken,
              user:email
            });
            var getRedirect=decodeURIComponent(_this.$route.query.redirect || '/');
            _this.$router.push({path:getRedirect});
          }
        })
      }
    }

	}
</script>

<style lang="stylus" scoped>
  .login-page{
    width:500px;
    margin:60px auto 0 auto;
  }
</style>