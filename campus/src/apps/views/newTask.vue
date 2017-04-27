 <template>
    <div>
        <div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            已收到的邀请
        </div>
        <mt-loadmore :bottom-method="bottomHandler" ref="loadmore" @bottom-status-change="handleTopChange" :bottomAllLoaded="bottomAllLoaded">
        <ul class="job-list-main">
            <li v-for="job in jobList">
                <div class="job-list">
                    <ul @click="openDetail(job)">
                        <li>
                            <span class="job-title">{{job.positionName}}</span>
                            <span class="job-money">{{job.salary}}</span>
                        </li>
                        <li class="add-people">
                            <span class="job-add">
                                <img src="../../assets/icon/add.png" alt="">
                                {{job.cityName}}
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
                        <li class="job-time" v-show="job.applyDeadline">招聘截止日：{{job.applyDeadline}}</li>
                    </ul>
                    <div class="job-ope">
                        <ul>
                            <li @click="ignoreResume(job)" v-show="showBtn(job)">忽略</li>
                            <li @click="handResume(job)" v-show="showBtn(job)">接受</li>
                            <li v-show="job.isSend" @click="openDetail(job)">查看详情</li>
                            <li v-show="job.isSend">已接受</li>
                        </ul>
                    </div>
                </div>
            </li>
        </ul>
        <div slot="bottom"  class="mint-loadmore-bottom list-loading">
                <span v-show="bottomStatus === 'drop'" >
                   <img src="../../assets/list/drop.svg" />
                  上拉更新</span>
                <span v-show="bottomStatus === 'pull'"  >
                   <img src="../../assets/list/pull.svg"/>
                  松开更新</span>
                <span v-show="bottomStatus === 'loading'">
                  <img src="../../assets/list/loading.gif"/>
                </span>
              </div>
         </mt-loadmore>
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
        data (){
            return {
                 jobList:[
                   
                ],
                searchParam:{
                  page:0
                },
                bottomStatus:'',
                bottomAllLoaded:false,
                pageShow:true           
            }
        },
        created(){
            // let data={
            //     app_id:'r134edqe13eswe1ewe1e1wqd23d3e3e2',
            //     header_img:'http://img2.imgtn.bdimg.com/it/u=3637598656,3567466436%26fm=214%26gp=0.jpg',
            //     city:1,
            //     page:1
            // }
            //     let me=this;
            // ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/invitelist',data)
            //     .then(
            //         (suc)=>{
            //             if(suc.status==0){
            //                 me.jobList=suc.data.list;
            //             }else{
            //                   Toast({
            //                       message: suc.errmsg,
            //                       position: 'middle',
            //                       duration: 2000
            //                     })
            //             }
            //         },(err)=>{

            //         }
            //     )
        },
        methods:{
            showBtn(job){
              if(job.isSend){
                return false
              }
              let time=new Date(job.startDate+'00:00:00').getTime();
              let now=new Date().getTime();
              if(time>now&&!job.isSend){
                return true
              }
              if(time<=now){
                return false
              }
            },
            // 顶部退回方法
            goBack(){
                history.go(-1);
            },
            // 查看详情
            openDetail(job){
              if(job.isSend){
                window.location.href='#/particular_job?requirementID='+job.jobID+'&subShow=1&isSend=1';
              }else if(!job.isSend){
                window.location.href='#/particular_job?requirementID='+job.jobID+'&subShow=1&isSend=0';
              }
            },
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
                            let data={jobID:job.jobID}
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
                                       // history.go(-1);
                                        location.reload() ;
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
            // 投递简历
            handResume(job){
              let me=this;
                  MessageBox({
                          title: '提示',
                          message:'确定接受该职位吗？',
                          confirmButtonText:'确认' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            let data={jobID:job.jobID}
                            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/sendresume',data)
                            .then(
                                (suc)=>{
                                    if(suc.status==0){
                                       Indicator.close();
                                       job.isSend=true;
                                       Toast({
                                              message: '操作成功',
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
                           // console.log('取消')
                          }
                        })
            },   
            handleTopChange(status){
              this.bottomStatus = status;
            },
             bottomHandler( id ){
              if(!this.pageShow){
                return 
              }
              let that = this;
              Indicator.open({
                text: '列表数据加载中...',
                spinnerType: 'fading-circle'
              });
              that.searchParam.page ++;
              // that.searchParam.filter=that.status.cd;
               ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/invitelist',that.searchParam)
                .then(
                    (suc)=>{
                        if(suc.status==0){
                           Indicator.close();
                          if(suc.data.list.length<20){
                            that.pageShow=false;
                          }
                              if( that.jobList.length == 0)
                                that.jobList = suc.data.list;
                              else
                                suc.data.list.forEach((item,i) => that.jobList.push(item));
                              if( that.searchParam.page == suc.data.page || suc.data.page == 0){
                                that.bottomAllLoaded = true;
                              }else{
                                if( that.$refs.loadmore ){
                                  that.$refs.loadmore.onBottomLoaded();
                                  if(that.searchParam.page==1){
                                    setTimeout(()=>{
                                      document.body.scrollTop=0;
                                    },50)
                                  }
                                }
                              }
                        }else{
                          that.pageShow=false;
                          that.bottomAllLoaded = true;
                          that.$refs.loadmore.onBottomLoaded();
                              Toast({
                                  message: '没有更多的数据了',
                                  position: 'middle',
                                  duration: 2000
                                })
                              Indicator.close();
                        }
                    },(err)=>{
                      that.bottomAllLoaded = true;
                        Indicator.close();
                    }
                )
          }
        }
    }
</script>
<style lang="scss">
   @import '../style/list.scss'
</style>