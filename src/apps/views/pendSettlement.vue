<template>
    <div>
    <div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            待结算
        </div>
        <ul class="job-list-main">
            <li v-for="job in jobList">
                <div class="job-list">
                    <ul>
                        <li>
                            <span class="job-title">{{job.positionName}}</span>
                            <span class="job-money">{{job.salary}}</span>
                        </li>
                        <li class="add-people">
                            <span class="job-add">
                                <img src="../../assets/icon/add.png" alt="">
                                {{job.city}}
                            </span>
                            <span class="job-people" v-show="job.number">
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
                    <div class="job-ope">
                        <ul>
                            <li @click="openDetail(job)">任务详情</li>
                            <li @click="handResume(job)">签到详情</li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
 import Vue from 'vue';
   import ApiUtil from '../../js/utils/api-util.js';
import { Toast,Field,Popup,Picker,Indicator,MessageBox,DatetimePicker } from 'mint-ui';
  Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
   Vue.component(DatetimePicker.name, DatetimePicker);
    export default{
        data (){
            return {
                jobList:[
                 
                ]        
            }
        },
            created(){
            let data={
                status:8
            }
                let me=this;
            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/task',data)
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

                    }
                )
        },
        methods:{
            // 查看详情
            openDetail(job){
                 window.location.href="#/particular_job?requirementID="+job.jobID+'&subShow=1';
            },
            // 顶部退回方法
            goBack(){
                history.go(-1);
            },
           
            // 投递简历
            handResume(job){
                 window.location.href="#/job_detail?taskID="+job.taskID;
            }
        }
    }
</script>
<style lang="scss">
   @import '../style/list.scss'
</style>