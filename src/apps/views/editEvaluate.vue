<template>
	<div class="edit-eva-main">
		<div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            待评价
        </div>
        <div class="edit-eva-title">
        	<p>是否愿意再次在宝贝儿招聘平台兼职？</p>
        	<div class="clear">
        		<label class="fl">
        			<input type="radio" name="editTitle" v-model="isAgain" value="1">
        			愿意
        		</label>
        		<label class="fr">
        			<input type="radio" name="editTitle" v-model="isAgain" value="2">
        			不愿意
        		</label>
        	</div>
        </div> 
        <div class="edit-eva-body" v-show="isAgain=='2'">
        	<p>请选择并说明原因:</p>
        	<ul>
        		<li>
        			<label>
        				<input type="radio" name="editBody" v-model="reason" value="1">
        				门店原因
        			</label>
        			<div v-show="reason=='1'"><textarea v-model="reasonDesc"></textarea></div>
        		</li>
        		<li>
        			<label>
        				<input type="radio" name="editBody" v-model="reason" value="2">
        				业务原因
        			</label>
        			<div v-show="reason=='2'"><textarea v-model="reasonDesc"></textarea></div>
        		</li>
        		<li>
        			<label>
        				<input type="radio" name="editBody" v-model="reason" value="3">
        				其他原因
        			</label>
        			<div v-show="reason=='3'"><textarea v-model="reasonDesc"></textarea></div>
        		</li>
        	</ul>
        </div>
        <div class="btnFa">
        	<button @click="evaSubmit">提交</button>
        </div>
	</div>
</template>
<script>
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
			return {
				reason:"1",
				isAgain:'',
				reasonDesc:''
				
			}
		},
		watch:{
			reason(newVal){
				newVal&&(this.reasonDesc='');
			}
		},
		created(){
			this.urlParams = Util.getUrlParams();
		
		},
		methods:{
			goBack(){
				  history.go(-1);
			},
			evaSubmit(){
				
				let me=this;
				if(!this.isAgain){
					MessageBox.alert('请选择是否愿意再次兼职');
					return
				}else if(this.isAgain=='2'){
					if(!this.reasonDesc){
						MessageBox.alert('请填写原因');
						return
					}
				}
				let data={};
				data.taskID=this.urlParams.taskID;
				data.isAgain=this.isAgain;
				data.reasonType=this.reason;
				data.reasonDesc=this.reasonDesc;
				// if(!data.isAgain){
				// 	 MessageBox.alert('请选择是否愿意再次兼职');
				// 	 return
				// }else if(!data.reasonDesc){
				// 	 MessageBox.alert('请填写原因');
				// 	 return
				// }
	            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/evaluation',data)
	                .then(
	                    (suc)=>{
	                        if(suc.status==0){
								Toast({
	                                  message: '提交成功',
	                                  position: 'middle',
	                                  duration: 2000
	                                })
								window.location.href="#/user_center";
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
			}
		}
	}
</script>
<style lang='scss'>
	.edit-eva-body{
		background: #fff;
		padding: 15px 0 30px 20px;
	
		p{
			font-size:16px;
			color:#878787;
		}
		label{
			display: block;
		}
		textarea{
			width:100%;
			height:120px;
			padding:10px;
			resize:none;
			margin-top: 10px;
			margin-bottom: 20px;
			background: #f0f0f0;
			border:none;
		}
		div{
			padding:0 15px;
		}
	}
	.edit-eva-title{
		background: #fff;
		margin-bottom: 15px;
		padding-bottom:32px; 
		p{
			text-align: center;
			padding-top: 22px;
			margin-top: 1px;
			font-size: 17px;
			color:#878787;
		}
		div{
			max-width:218px;
			min-width:100px;
			margin:0 auto;
			margin-top:28px; 
			label:first-child{
				
			}
			color:#666;
		}
		
	}
	.edit-eva-main{
		input[type="radio"]{
			border:none;
			-webkit-appearance: none;
			list-style: none;
			width:15px;
			height:15px;
			background: url('../../assets/icon/inputNo.png') no-repeat;
			background-size:15px;
			position: relative;
			top:2px;
		}
		input[type="radio"]:checked{
			background: url('../../assets/icon/radioChecked.png') no-repeat;
			background-size:15px;
			color:#666;
		}
	}
</style>