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
                localStorage.setItem('msg','');
                ApiUtil.getHttp('http://api.gdbbe.cn/api/getwechatuserinfo',{code:this.urlParams.code})
                    .then(
                        (suc)=>{
                            if(suc){
		                      if(!suc.data.errcode){
		                       localStorage.setItem('msg',JSON.stringify({
		                        app_id:suc.data.openid,
		                        header_img:suc.data.headimgurl
		                        }))
		                   	}
                            }else{
                                Toast({
                                    message: suc.errmsg,
                                    position: 'middle',
                                    duration: 2000
                                })
                            }
                         },(err)=>{
                         	 Toast({
                                    message: err,
                                    position: 'middle',
                                    duration: 2000
                                })
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