<template>
	<div class="login">
			<div class="top-nav" v-show="topShow">
	            <span @click="goBack">
	                <i></i>
	            </span>
	            登录
	        </div>
			<div class="login-logo" style="margin-top:30px;">
				<img src="../../assets/logo.png" height="125" width="114">
			</div>
			<div class="login-min">
				<ul class="login-input">
					<li class="login-phone">
						<input type="text" name="" v-model="login.name" placeholder="请输入手机号码">
						<em @click="clearPhone"></em>
					</li>
					<li class="login-pwd" v-show="pwd">
						<input type="password" name="" v-model="login.passwd" placeholder="请输入密码">
						<em @click="clearPwd"></em>
						<i @click="pwd=!pwd"></i>
					</li>
					<li class="login-pwd" v-show="!pwd">
						<input type="text" name="" v-model="login.passwd" placeholder="请输入密码">
						<em @click="clearPwd"></em>
						<i @click="pwd=!pwd" class="look"></i>
					</li>
				</ul>
				<p @click="forgetPwd">忘记密码？</p>
				<ul class="btn-list">
					<li>
						<button type='button' @click="loginBut">登录</button>
					</li>
					<li>
						<button type='button' @click="register">注册</button>
					</li>
				</ul>
			</div>
	</div>
</template>
<script>
 var verification=function(msg,reg){
    return reg.test(msg);
  };
 import Vue from 'vue';
   import ApiUtil from '../../js/utils/api-util.js';
   import Util from '../../js/utils/util.js';
import { Toast,Field,Popup,Picker,Indicator,Loadmore,MessageBox,DatetimePicker } from 'mint-ui';
  Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
   Vue.component(Loadmore.name, Loadmore);
   Vue.component(DatetimePicker.name, DatetimePicker);
	export default{
		data(){
			return{
				login:{
					name:'',
					passwd:''
				},
				pwd:true,
				topShow:true
			}
		},
		created(){
			 this.urlParams = Util.getUrlParams();
			 if(this.urlParams.hide){
			 	this.topShow=false;
			 }
		},
		methods:{
			register(){
				window.location.href="#/register";
			},
			forgetPwd(){
				window.location.href="#/pwd";
			},
			loginBut(){
				if(!this.login.name||!verification(this.login.name,/^1[3|4|5|7|8]\d{9}$/ )){
					Toast({
                        message: "请输入正确的手机号",
                        position: 'middle',
                        duration: 2000
                    })
				}else if(!this.login.passwd){
					Toast({
                        message: "请输入密码",
                        position: 'middle',
                        duration: 2000
                    })
				}else{
					let login={};
					for(var key in this.login){
						login[key]=this.login[key];
					}
					login.type='1';
					login.passwd=md5(this.login.passwd); 

					ApiUtil.getHttp('http://baby.api.cform.cn/api/user/login',login)
	                .then(
	                    (suc)=>{
	                        console.log(suc)
	                        if(suc.status==0){
	                        	Toast({
	                                  message: '登录成功',
	                                  position: 'middle',
	                                  duration: 2000
	                                })
	                            window.location.href="#/user_center";
	                            sessionStorage.setItem('back','')
	                        }else{
	                              Toast({
	                                  message: suc.errmsg,
	                                  position: 'middle',
	                                  duration: 2000
	                                })
	                        }
	                    },(err)=>{
	                    	// Toast({
	                     //              message: '服务器异常',
	                     //              position: 'middle',
	                     //              duration: 2000
	                     //            })
	                    }
	                )
				}
				
			},
			clearPhone(){
				this.login.name="";

			},
			clearPwd(){
				this.login.passwd="";
			},
			goBack(){
				history.go(-1);
			}
		}
	}
</script>
<style lang='scss'>
 @import './login';
</style>