<template>
	<div>
		<div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            申请改派
        </div>
        <div class="change-body">
        	<p>当月剩余改派次数：3次</p>
        	<div class="textFa">
        		<p>申请改派原因:</p>
        		<textarea v-model="dscp"  maxlength="200"></textarea>
        		 <span class="ident">{{fontNum}}/200</span>
        	</div>
        </div>
        <div class="btnFa">
        	<button @click="submit">提交</button>
        </div>
	</div>
</template>
<script >
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
				dscp:'',
				fontNum:0
			}
		},
		created(){
			 this.urlParams = Util.getUrlParams();
		},
		watch:{
			dscp(newVal){
				this.fontNum=newVal.length;
			}	
		},
		methods:{
			submit(){
				let data={};
					data.taskID=this.urlParams.taskID ;
					data.desc=this.dscp;
					 Indicator.open({
                              text: '正在提交，请稍候...',
                              spinnerType: 'fading-circle'
                            });
					ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/reassignment',data)
                            .then(
                                (suc)=>{
                                	Indicator.close(); 
                                    if(suc.status==0){
                                       Indicator.close();
                                       Toast({
					                        message: '提交成功',
					                        position: 'middle',
					                        duration: 2000
					                    })
                                       history.go(-1);
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
                                    // Toast({
                                    //           message: '服务器异常',
                                    //           position: 'middle',
                                    //           duration: 2000
                                    //         })
                                }
                            )
			},
			goBack(){
				 history.go(-1);
			}
		}
	}
</script>
<style lang='scss'>
	.change-body{
		padding: 10px 20px;
		>p{
			text-align: center;
		}
		>div{
			margin-top: 30px;
			textarea{
				width:100%;
				height:250px;
				resize: none;
				border: none;
				margin-top: 10px;
				padding: 15px;
			}
		}
	}
</style>