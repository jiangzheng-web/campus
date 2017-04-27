<template>
    <div>
        <div class="job-add-resu ">
          <ul class="clear">
            <li class="fl" @click="openAdd">
              <i></i>
              <span>{{isCity.areaName}}</span>
            </li>
            <li class="fr" @click="opRes">
              <span>我的简历</span>
            </li>
          </ul>
        </div>  
        <mt-loadmore :bottom-method="bottomHandler" ref="loadmore" @bottom-status-change="handleTopChange" :bottomAllLoaded="bottomAllLoaded">
        <ul class="job-list-main jobList">
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
                        <li class="job-time">招聘截止日：{{job.applyDeadline}}</li>
                    </ul>
                    <div class="job-ope">
                        <ul>
                            <li @click="openParticular(job)">查看详情</li>
                            <li  @click="handResume(job)" v-show="!job.isSend">投递简历</li>
                             <li v-show="job.isSend">已投递</li>
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
        <bot-nav :flag="'job-list'" v-on:jump="jump"></bot-nav>
    </div>
</template>
<script>
 import Vue from 'vue';
   import ApiUtil from '../../js/utils/api-util.js';
     import Util from '../../js/utils/util.js';
import BotNav from '../components/bot-nav.vue';
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
                isCity:{},
                searchParam:{
                  page:0
                },
                bottomStatus:'',
                bottomAllLoaded:false,
                login:false,
                isRes:false,
                check:false,
                pageShow:true,
                canPage:false     
            }
        },
        components:{BotNav},
        created(){
          Indicator.open({
            text: '请稍候...',
            spinnerType: 'fading-circle'
          });
          var me=this;
          if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function (p) {
                var latitude = p.coords.latitude//纬度
                var longitude = p.coords.longitude;
              localStorage.setItem('location',latitude+','+longitude);
              Indicator.close();
            }, function (e) {//错误信息
                var aa = e.code + "\n" + e.message;
                // Toast({
                //     message: '未获取到坐标',
                //      position: 'middle',
                //    duration: 2000
                // })
                Indicator.close();
            }
            );
          }else{
            Indicator.close();
            Toast({
                      message: '此浏览器暂不支持定位',
                       position: 'middle',
                     duration: 2000
                  })
          }
          me.getCity();
              // localStorage.setItem('msg',JSON.stringify({
              //           app_id:'orcR2wvWPUKJblhHZ7Re_wNLrFs0',
              //           header_img:'http://api.gdbbe.cn/swagger-ui/#!/263812115326041/createUser_0_1_2_3_4_5_6_7_8'
              //           }))
              // localStorage.setItem('location',37.802087+','+-122.419399);
           
        },
        mounted(){
          if(sessionStorage.getItem('subject')){
            sessionStorage.setItem('subject','');
          }
          if(localStorage.getItem('msg')&&localStorage.getItem('location')){
            // localStorage.setItem('location',JSON.stringify([37.802087,-122.419399]));
                let data={
                };
                 // let loc=JSON.parse(localStorage.getItem('location'));
                 // if(Object.prototype.toString.call(loc) === '[object Array]'){
                 //    data.location=loc[0]+','+loc[1];
                 // }else{
                 //  data.location=localStorage.getItem('location');
                 // }
                data.location=localStorage.getItem('location');
                let me=this;
                   // Indicator.open({
                   //            text: '请稍候...',
                   //            spinnerType: 'fading-circle'
                   //          });
            ApiUtil.getHttp('http://api.gdbbe.cn/api/common/citylist',data)
                .then(
                    (suc)=>{
                      Indicator.close();
                        if(suc.status==0){
                          // this.isCity=suc.data.locationCity;
                          if(!sessionStorage.getItem('city')){
                            sessionStorage.setItem('city',JSON.stringify(suc.data.locationCity[0]));
                          }
                          let me=this;
                          // alert(sessionStorage.getItem('city'));
                          me.isCity=JSON.parse(sessionStorage.getItem('city'));
                          me.canPage=true;
                          me.bottomHandler();
                        }else{
                              Toast({
                                  message: suc.errmsg,
                                  position: 'middle',
                                  duration: 2000
                                })
                        }
                    },(err)=>{
                      Indicator.close();
                      // Toast({
                      //       message: '服务器异常',
                      //       position: 'middle',
                      //       duration: 2000
                      //   })
                    }
                )
          }
          if(localStorage.getItem('msg')){
                      let msg={};
                      let me=this;
                          ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/checklogin',msg)
                            .then(
                                (suc)=>{
                                    if(suc.status==0){
                                        me.login=suc.data;
                                        sessionStorage.setItem('login',suc.data);
                                        if(me.login+''=='true'){
                                          return 
                                        }
                                        let data={};
                                  ApiUtil.getHttp('http://baby.api.cform.cn/api/service/question/check',data)
                                      .then(
                                          (suc)=>{
                                              if(suc.status==0){
                                                  me.check=suc.data;
                                                  // me.check=true;
                                                  sessionStorage.setItem('check',suc.data);
                                                   let msgs={}
                                                   // alert('check '+suc.data)
                                                    ApiUtil.getHttp('http://baby.api.cform.cn/api/service/resume/check',msgs)
                                                      .then(
                                                          (suc)=>{
                                                              if(suc.status==0){
                                                                  me.isRes=suc.data;
                                                                  sessionStorage.setItem('resume',suc.data);
                                                                  // alert('resume '+suc.data)
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
        },
        methods:{
          getCity(){
            Indicator.close();
             this.urlParams = Util.getUrlParams();
            if(this.urlParams&&this.urlParams.code){
              // this.$http.get('http://api.gdbbe.cn/api/getwechatuserinfo?code='+this.urlParams.code)
              //   .then(
              //       (suc)=>{
              //         if(!suc.body.data.errcode){
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
              //   )
                ApiUtil.getHttp('http://api.gdbbe.cn/api/getwechatuserinfo',{code:this.urlParams.code})
                    .then(
                        (suc)=>{
                          // Indicator.close();
                        if(suc){
                          if(!suc.data.errcode){
                           localStorage.setItem('msg',JSON.stringify({
                            app_id:suc.data.openid,
                            header_img:suc.data.headimgurl
                            }))
                           if(!sessionStorage.getItem('city')){
                              // setTimeout(suc=>{
                              //  Indicator.close();
                              // Toast({
                              //   message: '获取定位失败，请选择所在城市',
                              //   position: 'middle',
                              //   duration: 2000
                              // })
                              //   localStorage.setItem('location',JSON.stringify([37.802087,-122.419399]));
                              //   window.location.href="#/city_choice";
                              // },2000)
                            }
                           suc.data.city&&(localStorage.setItem('city',suc.data.city));
                           suc.data.province&&(localStorage.setItem('province',suc.data.province));
                            // ApiUtil.getHttp('https://api.weixin.qq.com/sns/oauth2/access_token',
                            //   {code:this.urlParams.code,appid:'wxf7d4bbe761bb5e24',secret:'e357fe3dfcfafb14b442e30760426c53',grant_type:'authorization_code'})
                            // .then(
                            //     suc=>{
                            //       alert(JSON.stringify(suc))
                            //       if(localStorage.location){
                            //         this.urlParams = Util.getUrlParams();
                            //         window.location.href=this.urlParams.http+"#/job_list";
                            //       }
                            //     },err=>{
                            //       alert(JSON.stringify(err))
                            //     }
                            //   )
                            if(localStorage.location){
                                    this.urlParams = Util.getUrlParams();
                                    window.location.href=this.urlParams.http+"#/job_list";
                                  }
                          }
                            }else{
                              // Indicator.close();
                                Toast({
                                    message: suc.errmsg||'服务器异常',
                                    position: 'middle',
                                    duration: 2000
                                })
                                history.go(-1);
                            }
                         },(err)=>{
                          // Indicator.close();
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
          opRes(){

            if(this.login+''=='true'){
                MessageBox({
                          title: '提示',
                          message:'您还未登录，是否登录？',
                          confirmButtonText:'确定' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            window.location.href="#/login";
                          }else{
                           // console.log('取消')
                          }
                        })
                return
              }else  if(this.check+''=='true'){
                    MessageBox({
                          title: '提示',
                          message:'请先完成问卷调查？',
                          confirmButtonText:'确定' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            window.location.href="#/survey";
                          }else{
                           // console.log('取消')
                           // window.location.href="#/detail_resume";
                          }
                        })
              }else  if(this.isRes+''=='true'){
                    MessageBox({
                          title: '提示',
                          message:'现在去完善简历？',
                          confirmButtonText:'去完善' ,
                          cancelButtonText:'暂时不用',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            window.location.href="#/edit_resume";
                          }else{
                            // window.location.href="#/detail_resume";
                          }
                        })
              }else{
                 window.location.href="#/detail_resume";
              }
          },
            openAdd(){
              window.location.href='#/city_choice';
            },
            // 打开职位详情
            openParticular(job){
              if(job.isSend){
                window.location.href='#/particular_job?requirementID='+job.jobID+'&subShow=1';
              }else if(!job.isSend){
                window.location.href='#/particular_job?requirementID='+job.jobID;
              }
            },
            jump(){
              if(this.login+''=='true'){
                MessageBox({
                          title: '提示',
                          message:'您还未登录，是否登录？',
                          confirmButtonText:'确定' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            window.location.href="#/login";
                          }else{
                           // console.log('取消')
                           // window.location.href="#/user_center";
                          }
                        })
                return
              }else  if(this.check+''=='true'){
                    MessageBox({
                          title: '提示',
                          message:'请先完成问卷调查？',
                          confirmButtonText:'确定' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            window.location.href="#/survey";
                          }else{
                           // console.log('取消')
                           // window.location.href="#/user_center";
                          }
                        })
              }else  if(this.isRes+''=='true'){
                    MessageBox({
                          title: '提示',
                          message:'现在去完善简历？',
                          confirmButtonText:'去完善' ,
                          cancelButtonText:'暂时不用',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            window.location.href="#/edit_resume";
                          }else{
                           // window.location.href="#/user_center";
                          }
                        })
              }else{
                 window.location.href="#/user_center";
              }
            },
            // 投递简历
            handResume(job){
              // this.login=true;
              // this.isRes=true;
              if(this.login+''=='true'){
                MessageBox({
                          title: '提示',
                          message:'您还未登录，是否登录？',
                          confirmButtonText:'确定' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            window.location.href="#/login";
                          }else{
                           // console.log('取消')
                             // window.location.href="#/survey";
                          }
                        })
                return
              }else  if(this.check+''=='true'){
                    MessageBox({
                          title: '提示',
                          message:'请先完成问卷调查？',
                          confirmButtonText:'确定' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            window.location.href="#/survey";
                          }else{
                           // console.log('取消')
                             // window.location.href="#/survey";
                          }
                        })
              }else  if(this.isRes+''=='true'){
                    MessageBox({
                          title: '提示',
                          message:'现在去完善简历？',
                          confirmButtonText:'去完善' ,
                          cancelButtonText:'暂时不用',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            window.location.href="#/survey";
                          }else{
                           // console.log('取消')
                             // window.location.href="#/survey";
                          }
                        })
              }else{
                MessageBox({
                          title: '提示',
                          message:'确定向该职位投递简历吗？',
                          confirmButtonText:'确认' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            let data={jobID:job.jobID};
                            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/sendresume',data)
                            .then(
                                (suc)=>{
                                    if(suc.status==0){
                                       Indicator.close();
                                       job.isSend=true;
                                       Toast({
                                              message: suc.data,
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
              }
                  
                 //        
                 //        
                  
            },
            handleTopChange(status){
              this.bottomStatus = status;
            },
             bottomHandler( id ){
              if( !localStorage.getItem('msg')){
                return
              }
              if(!sessionStorage.getItem('city')){
                return 
              }
              if(!this.canPage){
                return
              }
              if(!this.pageShow){
                return 
              }
              let that = this;
              Indicator.open({
                text: '列表数据加载中...',
                spinnerType: 'fading-circle'
              });
              that.isCity=JSON.parse(sessionStorage.getItem('city'));
              that.searchParam.page ++;
              that.searchParam.cityID=that.isCity.areaNo||'1';
              that.searchParam.cityName=localStorage.city;
              that.searchParam.location=localStorage.location;
              that.searchParam.province=localStorage.province;
              // that.searchParam.filter=that.status.cd;
               ApiUtil.getHttp('http://baby.api.cform.cn/api/service/requirement/list',that.searchParam)
                .then(
                    (suc)=>{
                        if(suc.status==0){
                          // if(suc.data.list.length<20){
                          //   that.pageShow=false;
                          // }
                           Indicator.close();
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
                                    },100)
                                  }

                                }
                              }
                              if (that.jobList.length === suc.data.totalNum) {
                                that.pageShow = false;
                              }
                        }else{
                          that.bottomAllLoaded = true;
                          that.pageShow=false;
                              that.$refs.loadmore.onBottomLoaded();
                              // if(that.searchParam.page!=1){
                                Toast({
                                  message:  suc.errmsg,
                                  position: 'middle',
                                  duration: 2000
                                })
                              // }
                             
                              Indicator.close();
                        }
                    },(err)=>{
                      Indicator.close();
                      that.bottomAllLoaded = true;
                      // Toast({
                      //             message: '服务器异常',
                      //             position: 'middle',
                      //             duration: 2000
                      //           })
                    }
                )
          }
        }
    }
</script>
<style lang='scss'>
   @import '../style/list.scss';
   .job-add-resu{
      background:#fff;
      margin-top: 1px;
      height:45px;
       line-height:45px;
       font-size: 16px;
       color:#666;
       li{
          padding:0 15px;
          &.fl{
            padding-right:25px;
            i{
              display: inline-block;
              width:15px;
              height:16px;
              background: url('../../assets/icon/add.png') no-repeat;
              background-size:12px; 
              position:relative;
              top:2px;
              left:2px;
            }

          }
           &.fr{
            padding-left:25px;
          }
       }
   } 

</style>