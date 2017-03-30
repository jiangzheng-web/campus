<template>
	<div>
		<div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            注册协议
        </div>
		<div v-html="jobList" style="padding:20px;">
			
		</div>
	</div>
</template>
<script>
	 import Vue from 'vue';
   import ApiUtil from '../../js/utils/api-util.js';
import { Toast,Field,Popup,Picker,Indicator,Loadmore,MessageBox,DatetimePicker } from 'mint-ui';
  Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
   Vue.component(Loadmore.name, Loadmore);
   Vue.component(DatetimePicker.name, DatetimePicker);
	export default{
		data(){
			return{
				jobList:''
			}
		},
		created(){
			let me=this;
			let data={articleID:'2'};
            ApiUtil.getHttp('http://baby.api.cform.cn/api/common/article',data)
                .then(
                    (suc)=>{
                        console.log(suc)
                        if(suc.status==0){
                            me.jobList=suc.data;
                        }else{
                              Toast({
                                  message: suc.errmsg,
                                  position: 'middle',
                                  duration: 2000
                                })
                        }
                    },(err)=>{
                    	// Toast({
                     //        message: '服务器错误',
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