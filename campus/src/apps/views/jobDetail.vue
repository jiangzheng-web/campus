<template>
	<div>
		<div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            签到详情
        </div>
        <div class="job-detail">
        	<ul>
        		<li  v-for="info in detail">
        			<p><label>签到时间: </label><span>{{info.signTime}}</span></p>
        			<div>
        				<img :src="info.signImg">
        			</div>
        		</li>
        	</ul>
        </div>
	</div>
</template>
<script>
 import Vue from 'vue';
import ApiUtil from '../../js/utils/api-util.js';
import Util from '../../js/utils/util.js';
import { Toast,Field,Popup,Picker,Indicator,MessageBox,DatetimePicker } from 'mint-ui';
  Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
   Vue.component(DatetimePicker.name, DatetimePicker);
	export default{
		data(){
			return{
				detail:[]
			}
		},
		created(){
			// if(!this.detail.length){
			// 	MessageBox.alert('暂无签到信息').then(action => {
		 //          history.go(-1);
		 //        });
			// }
			this.urlParams = Util.getUrlParams();
			let data={};
			data.taskID=this.urlParams.taskID;
			let me=this;
            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/sign/detail',data)
                .then(
                    (suc)=>{
                        if(suc.status==0){
                            
                            
                            // for(var i=0;i<suc.data.length;i++){
                            // 	if(suc.data[i].signImg){
	                           //  	suc.data[i].signImg=suc.data[i].signImg;
	                           //  }
                            // }
                            me.detail=suc.data;
                        }else{
                              Toast({
                                  message: suc.errmsg,
                                  position: 'middle',
                                  duration: 2000
                                })
                        }
                    },(err)=>{
                    	// Toast({
                     //        message: '服务器异常',
                     //        position: 'middle',
                     //        duration: 2000
                     //    })
                    }
                )
		},
		methods:{
			goBack(){
				history.go(-1);
			}
		}
	}
</script>
<style lang='scss'>
	.job-detail{
		margin: 10px 15px;
		background: #fff;
		padding:0 15px;
		padding-bottom: 15px;
		li{
			padding-top: 10px;
		}
		p{
			margin-bottom: 10px;
			label{
				color:#ccc;
				margin-right: 8px;
			}
			span{
				color:#878787;
			}
		}
		div{
			/*height:310px;*/
			background: #f0f0f0;
			img{
				height:255px;
				width: 100%;
			}
		}
	}
</style>