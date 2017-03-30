<template>
	<div class="account">
		<div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            账户信息
        </div>
		<div class="account-img">
			<dl>
				<dt><img :src="images[0]"></dt>
				<dd>{{user.name}}</dd>
			</dl>
			<div class="changImg"> 
				<form name="fileinfo" id='fileinfo'>
				<span>更换头像<input type="file" ref="multiple" name="file" class="img-upload feed-upload" @change="onFileChange($event)"/></span>
				</form>
			</div>
		</div>
		<div class="account-name">
			<ul>
				<li class="account-app">
					<div class="fl">
						<i></i>
						<span>姓名</span>
					</div>
					<div class="fr">{{user.name}}</div>
				</li>
				<!-- <li class="account-num">
					<div class="fl">
						<i></i>
						<span>账号</span>
					</div>
					<div class="fr">86251547</div>
				</li> -->
		<!-- 	</ul>	
		</div>
		<div class="account-name account-opera">
			<ul> -->
				<li class="account-phone">
					<div class="fl">
						<i></i>
						<span>绑定手机</span>
					</div>
					<div class="fr" @click="editPhone">
						<span>{{user.mobile}}</span>
						<i></i>
					</div>
				</li>
				<li class="account-pwd">
					<div class="fl">
						<i></i>
						<span>登录密码</span>
					</div>
					<div class="fr" @click="editPwd">
						<span>修改</span>
						<i></i>
					</div>
				</li>
			</ul>	
		</div>
		<div class="signOut">
			<button @click="back">退出登录</button>
		</div>
	</div>
</template>
<script >
 import Vue from 'vue';
  import ApiUtil from '../../js/utils/api-util.js';
 import { Toast,Field,Popup,Picker,Indicator,DatetimePicker,MessageBox } from 'mint-ui';
import BotNav from '../components/bot-nav.vue';

   Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
  Vue.component(DatetimePicker.name, DatetimePicker);
	export default{
		data(){
			return{
				user:{},
				images:[]
			}
		},
		created(){
			if(sessionStorage.getItem('back')+''=='true'){
				alert(sessionStorage.getItem('back'))
				window.location.href="#/login?hide=1";
			}
               let data={}
                let me=this;
            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/personalcenter',data)
                .then(
                    (suc)=>{
                        if(suc.status==0){
                            me.user=suc.data;
                            if(me.user.headerImg){
                            	me.images[0]=me.user.headerImg;
                            }
                        }else{
                              Toast({
                                  message: suc.errmsg,
                                  position: 'middle',
                                  duration: 2000
                                })
                        }
                    },(err)=>{

                    }
                )
        },
		methods:{
			back(){
				 MessageBox({
                          title: '提示',
                          message:'确定要退出登录吗？',
                          confirmButtonText:'退出' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                          	sessionStorage.setItem('back','true')
                            window.location.href="#/login?hide=1";
                          }else{
                           // console.log('取消')
                          }
                        })
			},
			goBack(){
				history.go(-1);
			},
			editPwd(){
				window.location.href="#/pwd";
			},
			editPhone(){
				window.location.href="#/phone";
			},
			onFileChange (e) {
	          var files = e.target.files || e.dataTransfer.files;
	          var type = '|' + files[0].type.slice(files[0].type.lastIndexOf('/') + 1) + '|';
	          // if('|jpg|png|jpeg|bmp|gif|'.indexOf(type) === -1){
	          //     MessageBox.alert('请上传正常格式的图片').then(action => {
	            
	          //   });
	          //     return
	          // }
	          if (!files.length) return
	          this.createImage(files)
	        },
	        createImage (file) {
	        this.images=[];
	          var vm = this;
	          var reader = null;
	          var leng = file.length;
	          console.log(file)
	          for (var i = 0; i < leng; i++) {
	            reader = new window.FileReader()
	            reader.readAsDataURL(file[i])
	            reader.onload = function (e) {
	              vm.images.push(e.target.result)
	            }
	          }
	          let data=new FormData(document.getElementById("fileinfo"));
				let me=this;
				let msg={};
				if(window.localStorage.getItem('msg')){
	              msg=JSON.parse(window.localStorage.getItem('msg'));
	            }
	             Indicator.open({
                              text: '正在更换，请稍候...',
                              spinnerType: 'fading-circle'
                            });
	         this.$http.post(
              `http://baby.api.cform.cn/api/common/upload?app_id=${msg.app_id}&header_img=${msg.header_img}&type=1`,data)
                .then(
                    (suc)=>{
                        if(suc.body.status==0){
                            // me.check=suc.data;
                            // sessionStorage.setItem('check',suc.data);
                            let data={};
                            data.typeID=1;
                            // data.new_header_img=encodeURIComponent(JSON.stringify(suc.body.data.fileUrl));
                            data.new_header_img=encodeURIComponent(suc.body.data.fileUrl);
                            ApiUtil.getHttp('http://baby.api.cform.cn/api/common/headimg/change',data)
                            .then(
                                (suc)=>{
                                    if(suc.status==0){
                                       Indicator.close();
                                        Toast({
		                                  message: '更换成功',
		                                  position: 'middle',
		                                  duration: 2000
		                              })
                                    }else{
                                          Toast({
                                              message: suc.errmsg,
                                              position: 'middle',
                                              duration: 2000
                                            })
                                          Indicator.close();
                                    }
                                },(err)=>{
                                    Indicator.close();
                                }
                            )
                        }else{
                          Indicator.close();
                              Toast({
                                  message: suc.body.errmsg,
                                  position: 'middle',
                                  duration: 2000
                                })
                              me.images[0]=me.user.headerImg;
                        }
                    },(err)=>{
                      Indicator.close();
                      // Toast({
                      //             message: '服务器异常',
                      //             position: 'middle',
                      //             duration: 2000
                      //           })
                       me.images[0]=me.user.headerImg;
                    }
                )
	        }
		}
	}
</script>
<style lang='scss'>
	.changImg{
		span{
			display: block;
			width:58px;
			position: relative;
			margin:0 auto;
			margin-top: 5px;
			color:#fff;
			opacity:.68;
			input{
				width:58px;
				position: absolute;
				left: 0;
				top: 0;
				opacity: 0;
			}
			input.img-upload{
				width:58px;
				height:auto;
				position: absolute;
				left: 0;
				top: 0;
				opacity: 0;
			}
		}
	}
.signOut{
	padding:0 17px;
	button{
		width:100%;
		height:43px;
		line-height: 43px;
		margin-top:25px;
		background: #fff;
		color:#666;
		font-size:15px;
	}
}
.account{
	.top-nav{
		background: #f66666;
		color:#fff;
	}
}
	.account-name{
		margin-top: 10px;
		li{
			height:45px;
			background: #fff;
			margin-bottom: 1px;
			padding-right: 20px;
			div{
				height:45px;
				line-height: 45px;
			}
			i{
				display: inline-block;
				width:18px;
				height:18px;
				margin-left: 19px;
				margin-right:9px;
				position:relative;
				top:3px;
			}
			.fr{
				color:#000;
			}
		}
		.account-app{
			i{
				background:url('../../assets/icon/name.png') no-repeat;
				background-size:18px;
			}
		}
		.account-num{
			i{
				background:url('../../assets/icon/accountNum.png') no-repeat;
				background-size:18px;
			}
		}
		.account-phone{
			.fl i{
				background:url('../../assets/icon/accountPhone.png') no-repeat;
				background-size:18px;
			}
			.fr i{
				margin:0;
				width:12px;
				height:17px;
				background:url('../../assets/icon/right-arrow.png') no-repeat;
				background-size:10px;
			}
		}
		.account-pwd{
			.fl i{
				background:url('../../assets/icon/accountPwd.png') no-repeat;
				background-size:18px;
			}
			.fr i{
				margin:0;
				width:12px;
				height:17px;
				background:url('../../assets/icon/right-arrow.png') no-repeat;
				background-size:10px;
			}
		}
	}
	.account-img{
		background: #f66666;
		padding-bottom: 15px;
		dl{
			padding-top: 12px;
			text-align: center;
			dt{
				width:70px;
				height:70px;
				-moz-border-radius:50%;
                -webkit-border-radius:50%;
                border-radius:50%;
                border:3px solid #f99d9d;
                margin:0 auto;
                overflow: hidden;
                img{
                	width:70px;
					height:70px;

                }
			}
			dd{
				margin-top: 15px;
				color:#fff;
				font-size:16px; 
			}
		}
		p{
			text-align: center;
			color: #fff;
			opacity: 0.68;
			font-size:15px;
			margin-top: 10px;
			padding-bottom: 19px;
		}
	}
</style>