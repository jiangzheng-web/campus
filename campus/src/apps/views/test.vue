<template>
	<div class="test">
	<img src="../../assets/test.png" height="1222" width="100%">
		<div>
			<button @click="login"></button>
		</div>
	</div>
</template>
<script>
import Util from '../../js/utils/util.js';
import ApiUtil from '../../js/utils/api-util.js';
 import Vue from 'vue';
  import VueResource from 'vue-resource';
  import { Toast,Field,Popup,Picker,Indicator,Loadmore,MessageBox,DatetimePicker } from 'mint-ui';
  Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
   Vue.component(Loadmore.name, Loadmore);
   Vue.component(DatetimePicker.name, DatetimePicker);
 Vue.use(VueResource);
	export default{
		data(){
			return{

			}
		},
		created(){
			   this.urlParams = Util.getUrlParams();
   
            if(this.urlParams&&this.urlParams.code){
              // this.$http.get('http://api.gdbbe.cn/api/getwechatuserinfo?code='+this.urlParams.code)
              //   .then(
              //       (suc)=>{
              //         alert(JSON.tringify(suc))
              //         alert(3333333333)
              //         if(suc.body.status==0&&!suc.body.data.errcode){
              //          localStorage.setItem('msg',JSON.stringify({
              //           app_id:suc.body.data.openid,
              //           header_img:suc.body.data.headimgurl
              //           }))
              //           // window.location.href='#/test';
              //         }
              //        },(err)=>{
              //           Toast({
              //                     message: err,
              //                     position: 'middle',
              //                     duration: 10000
              //                   })
              //       }
              //   );
              Indicator.open({
                text: '正在获取信息，请稍候...',
                spinnerType: 'fading-circle'
              });
                localStorage.setItem('msg','');
                ApiUtil.getHttp('http://api.gdbbe.cn/api/getwechatuserinfo',{code:this.urlParams.code})
                    .then(
                        (suc)=>{
                          Indicator.close();
                            if(suc){
		                      if(!suc.data.errcode){
		                       localStorage.setItem('msg',JSON.stringify({
		                        app_id:suc.data.openid,
		                        header_img:suc.data.headimgurl
		                        }))
                           suc.data.city&&(localStorage.setItem('city',suc.data.city));
                           suc.data.province&&(localStorage.setItem('province',suc.data.province));
                           this.urlParams = Util.getUrlParams();
                            window.location.href=this.urlParams.http+"#/job_list";
                            
		                   	}
                            }else{
                              Indicator.close();
                                Toast({
                                    message: suc.errmsg||'服务器异常',
                                    position: 'middle',
                                    duration: 2000
                                })
                                history.go(-1);
                            }
                         },(err)=>{
                          Indicator.close();
                         	 Toast({
                                    message: err||'服务器异常',
                                    position: 'middle',
                                    duration: 2000
                                })
                           history.go(-1);
                        }
                    )
            }
		},
		methods:{
			login(){
				this.urlParams = Util.getUrlParams();
				window.location.href=this.urlParams.http+"#/job_list";
			}
		}
	}
</script>
<style lang='scss'>
	.test{
		button{
			width:30px;
			height:15px;
			background: transparent;
		}
		div{
			text-align: center;
			position: fixed;
			top:0;
			right: 0;
		}
	}
</style>