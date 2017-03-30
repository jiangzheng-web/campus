<template>
	<div>
	<div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            职位详情
        </div>
		 <ul class="job-list-main">
            <li>
                <div class="job-list">
                    <ul>
                        <li>
                            <span class="job-title">{{job.positionName}}</span>
                            <span class="job-money">{{job.salary}}</span>
                        </li>
                        <li class="add-people">
                            <span class="job-add">
                                <img src="../../assets/icon/add.png" alt="">
                                {{job.address}}
                            </span>
                            <span class="job-people" >
                                 <img src="../../assets/icon/people.png" alt="">
                                {{job.number}}人
                            </span>
                        </li>
                        <li class="detailed-add">{{job.storeName}}</li>
                        <li class="job-time">
                            <span class="start">{{job.startDate}}</span>
                            到
                            <span class="end">{{job.endDate}}</span>
                        </li>
                    </ul>
                    <div class="describe-ass">
                    	<ul class="clear">
                    		<li v-for="data in job.requirementsTagID">{{data}}</li>
                    		<!-- <li>热情活泼</li>
                    		<li>团结友爱</li>
                    		<li>大力发展</li>
                    		<li>共产主义</li> -->
                    	</ul>
                    </div>
                </div>
            </li>
            <li class="describe-job">
            	<p>职位描述</p>
            	<ul>
            		<li>
            			<em class="clear">
                            <span class="fl">薪</span>
                            <span class="fr">资:</span>
                        </em>
            			<p>
            				<span>{{job.salaryDetail}}</span> 
            				<br>
            				<span></span>
            			</p>
            		</li>
            		<li>
            			<em>工作日期:</em>
            			<p><span>{{job.startDate}}</span>至<span>{{job.endDate}}</span></p>
            		</li>
            		<li>
            			<em>工作时间:</em>
            			<p>{{job.officeHours}}</p>
            		</li>
            		<li>
            			<em>职位描述:</em>
            			<p>
            				{{job.jobDesc}}
            			</p>
            		</li>
            	</ul>
            </li>
        </ul>
        <div class="subJob" v-show="!urlParams.subShow" @click="handResume(job)">
        	投递简历
        </div>
        <div class="btnList" v-show="urlParams.subShow&&urlParams.isSend">
            <ul class="clear">
                <li class="fl">
                    <button @click="ignoreResume(job)">忽略</button>
                </li>
                <li class="fl">
                    <button @click="handResume(job)">接受</button>
                </li>
            </ul>
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
			return{
				job: {
                        positionName:'翻译',
                        cityName:'深圳',
                        number:'20',
                        storeName:'门店测试0012',
                        startDate:'2017-02-25',
                        endDate:'2017-02-25',
                        salary:'20/天'
                    },
                urlParams:{subShow:false}
			}
		},
        created(){
            this.urlParams = Util.getUrlParams();
            let data={
                requirementID:this.urlParams.requirementID
            }
            let me=this;
            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/requirement/detail',data)
                .then(
                    (suc)=>{
                        if(suc.status==0){
                            me.job=suc.data;
                            
                        }else{
                              Toast({
                                  message: suc.errmsg,
                                  position: 'middle',
                                  duration: 2000
                                })
                        }
                    },(err)=>{
                         // Toast({
                         //          message: '服务器异常',
                         //          position: 'middle',
                         //          duration: 2000
                         //        })
                    }
                )
        },
		methods:{
             // 忽略简历
            ignoreResume(job){
               let me=this;
                  MessageBox({
                          title: '提示',
                          message:'确定忽略该简历吗？',
                          confirmButtonText:'确认' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            let data={jobID:job.id}
                            ApiUtil.getHttp('http://api.gdbbe.cn/api/service/user/ignoreinvite',data)
                            .then(
                                (suc)=>{
                                    if(suc.status==0){
                                       Indicator.close();
                                       Toast({
                                              message: '忽略成功',
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
                                }
                            )
                          }else{
                           // console.log('取消')
                          }
                        })
            },
            handResume(job){
                MessageBox({
                          title: '提示',
                          message:'确定向该职位投递简历吗？',
                          confirmButtonText:'确认' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            let data={jobID:job.id};
                            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/sendresume',data)
                            .then(
                                (suc)=>{
                                    if(suc.status==0){
                                       Indicator.close();
                                       Toast({
                                              message: '投递成功',
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
                                }
                            )
                          }else{
                           // console.log('取消')
                          }
                        })
            },
			goBack(){
				history.go(-1)
			}
		}
	}
</script>
<style lang='scss'>
.btnList{
    ul{
        li{
            width:50%;
            padding:10px 15px;
            button{
                width:100%;
                text-align: center;
                    border-radius: 4px;
                    background: #f66666;
                    color: #fff;
                    font-size: 17px;
                    height: 42px;
                    line-height: 42px;
                    text-align: center;
            }
        }
    }
}
 @import '../style/list.scss';
 	.describe-ass{
 		padding:0 15px;
 		>ul>li{
 			float: left;
		    width: 31%;
		    height: 33px;
		    line-height: 33px;
		    text-align: center;
		    margin-bottom: 5px;
		    border: 1px solid #eaeaea;
		     -moz-border-radius:30px;
                -webkit-border-radius:30px;
                border-radius:30px;
		    color: #ccc;
		    margin-left: 3%;
		    &:nth-child(1),&:nth-child(4),&:nth-child(7),&:nth-child(10),&:nth-child(13){
		    	 margin-left:0;
		    }
 		}
 	}
 	.subJob{
 		margin:32px;
        margin-top: 10px;
 		-moz-border-radius:4px;
                -webkit-border-radius:4px;
                border-radius:4px;
        background: #f66666;
        color:#fff;   
        font-size:17px;     
        height:42px;
        line-height:42px;
        text-align: center;
 	}
	.describe-job{
		padding:15px;
		margin-top:15px;
		background: #fff;
		>p{
			font-size:16px;
			color:#303030;
			margin-bottom:15px;
		}
		li{
			 display: -moz-box; 
	         display: -webkit-box;
	          display: -o-box;
	          display: box; 
	          margin-bottom: 15px;
	          em{
	          	 box-flex: 1;
	            -moz-box-flex: 1;
	            -webkit-box-flex: 1;
	            width:63px;
	            display:inline-block;
	            color:#adadad;
                margin-right: 10px;
	          }
	          p{
	          	box-flex: 5;
	            -moz-box-flex: 5;
	            -webkit-box-flex: 5;
	              color:#878787;
	          }
		}
	}
</style>