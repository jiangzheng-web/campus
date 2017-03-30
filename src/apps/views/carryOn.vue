 <template>
    <div>
        <div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            进行中
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
                            <li @click="openDetail(job)">查看详情</li>
                            <li @click="openOther(job)" v-show="job.other">{{job.other}}</li>
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
 import { Toast,Field,Popup,Picker,Indicator,DatetimePicker,MessageBox } from 'mint-ui';
   Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
  Vue.component(DatetimePicker.name, DatetimePicker);
    export default{
        data (){
            return {
                 jobList:[
                    // {
                    //     positionName:'翻译',
                    //     cityName:'深圳',
                    //     number:'20',
                    //     storeName:'门店测试0012',
                    //     startDate:'2017-02-25',
                    //     endDate:'2017-02-25',
                    //     salary:'20/天'
                    // },
                    //  {
                    //     positionName:'翻译',
                    //     cityName:'深圳',
                    //     number:'20',
                    //     storeName:'门店测试0012',
                    //     startDate:'2017-02-25',
                    //     endDate:'2017-02-25',
                    //     salary:'20/天'
                    // }
                ]      
            }
        },
        created(){
            let data={
                 status:3,
                app_id:'orcR2wvWPUKJblhHZ7Re_wNLrFs0',
                header_img:'http://api.gdbbe.cn/swagger-ui/#!/263812115326041/createUser_0_1_2_3_4_5_6_7_8',
            }
            let me=this;
            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/task',data)
                .then(
                    (suc)=>{
                        if(suc.status==0){
                            me.jobList=suc.data;
                            for(var i=0;i<me.jobList.length;i++){
                                if( me.jobList[i].allowReassignment+''=='true'){
                                     me.jobList[i].other="申请改派";
                                }else{
                                    let now=new Date().getTime();
                                    let start=new Date(me.jobList[i].startDate+' 00:00:00').getTime();
                                    let end=new Date(me.jobList[i].endDate+' 23:59:59').getTime();
                                    if(now>=start&&now<=end||now==start||now==end){
                                        me.jobList[i].other="上班签到";
                                    }
                                }
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
            openOther(info){
                if(info.other=="申请改派"){
                    window.location.href="#/change_work?taskID="+info.taskID;
                }else if(info.other=="上班签到"){
                    window.location.href="#/sign_work?taskID="+info.taskID;
                }
            },
            // 顶部退回方法
            goBack(){
                history.go(-1);
            },
            // 查看详情
            openDetail(job){
                 window.location.href="#/particular_job?requirementID="+job.jobID+'&subShow=1';
            }
        }
    }
</script>
<style lang="scss">
   @import '../style/list.scss'
</style>