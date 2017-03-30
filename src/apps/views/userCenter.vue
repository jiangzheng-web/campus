<template>
    <div>
        <div class="user-title">
            <ul class="clear">
                <li class="user-img" @click="openAccount">
                    <img :src="user.headerImg" alt="">
                    <!-- <img src="../../assets/photoExa.png" height="721" width="613"> -->
                </li>
                <li class="user-name-info">
                    <p class="user-name">{{user.name}}</p>
                    <p class="user-name-msg">
                        <span>
                            <a>任务次数：</a>
                            <i>{{user.taskTime}}次</i>
                        </span>
                        <span>
                            <a>评分：</a>
                            <i>{{user.score}}分</i>
                        </span>
                    </p>
                </li>
            </ul>
        </div>
        <div class="user-task">
            <ul class="clear">
                <li class='new-task' @click="openNewTask">
                   <i></i>  已收到的邀请
                </li>
                <li class='user-calendar' @click="userCalendar">
                   <i></i> 日程表
                </li>
            </ul>
        </div>
        <div class="user-task-list" >
            <ul class="clear">
                <li @click="isCarryOn" >
                    <dl>
                        <dt><img src="../../assets/icon/onGoing.png" alt=""></dt>
                        <dd>进行中<span v-show="user.underwayTaskNum">{{user.underwayTaskNum}}</span></dd>
                    </dl>
                    
                </li>
                <li @click="pendEvaluate">
                    <dl>
                        <dt><img src="../../assets/icon/evaluate.png" alt=""></dt>
                        <dd>待评价<span v-show="user.needEvaluateNum">{{user.needEvaluateNum}}</span></dd>
                    </dl>
                    
                </li>
                <li @click="pendSettlement">
                    <dl>
                        <dt><img src="../../assets/icon/settlement.png" alt=""></dt>
                        <dd>待结算<span v-show="user.needSettlementNum">{{user.needSettlementNum}}</span></dd>
                    </dl>
                    
                </li>
                <li  @click="completed">
                    <dl>
                        <dt><img src="../../assets/icon/complete.png" alt=""></dt>
                        <dd>已完成<span v-show="user.doneNum">{{user.doneNum}}</span></dd>
                    </dl>
                    
                </li>
            </ul>
        </div>
        <div class="user-info" >
            <ul>
                <li @click="openResume">
                    <i class="user-center-resume user-info-fir-img"></i>
                    <span>我的简历</span>
                    <i class="right-arrow"></i>
                </li>
                <li @click="feedback">
                    <i class="user-center-feedback user-info-fir-img"></i>
                    <span>意见反馈</span>
                    <i class="right-arrow"></i>
                </li>
                <li @click="mintMsgbox=true">
                    <i class="user-center-contact user-info-fir-img"></i>
                    <span >联系客服</span>
                    <i class="right-arrow"></i>
                </li>
            </ul>
        </div>
        <bot-nav :flag="'user-center'" v-on:jump="jump"></bot-nav>
        <div class="mint-msgbox" v-show="mintMsgbox==true">
            <div class="mint-msgbox-content-tit">
                - 客服电话 -
            </div>
            <div class="mint-msgbox-title">
               400-400-400 
            </div>
             <div class="mint-msgbox-content">
                <p>工作日 9:00-22:00</p>
                <p>节假日 10:00-18:00</p>
            </div>
            <div class="mint-msgbox-btns">
                <button class="mint-msgbox-btn mint-msgbox-cancel" @click="mintMsgbox=false">取消</button>
                <button class="mint-msgbox-btn mint-msgbox-confirm " @click="callSomeWhere">拨打</button>
            </div>
        </div>
        <div class="mint-mask" v-show="mintMsgbox==true" @click="mintMsgbox=false"></div>
    </div>
</template>
<script>
 import Vue from 'vue';
  import ApiUtil from '../../js/utils/api-util.js';
 import { Toast,Field,Popup,Picker,Indicator,DatetimePicker,MessageBox } from 'mint-ui';
import BotNav from '../components/bot-nav.vue';

   Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
  Vue.component(DatetimePicker.name, DatetimePicker);
    export default{
        data(){
            return {
                user:{},
                mintMsgbox:false
            }
        },
        components:{BotNav},
        created(){
            // localStorage.setItem('msg',JSON.stringify({app_id:'r134edqe13eswe1ewe1e1wqd23d3e3e2',
            //     header_img:'http://img2.imgtn.bdimg.com/it/u=3637598656,3567466436%26fm=214%26gp=0.jpg'}))
               let data={}
                let me=this;
            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/personalcenter',data)
                .then(
                    (suc)=>{
                        if(suc.status==0){
                            me.user=suc.data;
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
            callSomeWhere(){
                window.location.href='tel:110';
            },  
            jump(){
                window.location.href="#/job_list";
            },
            feedback(){
                window.location.href="#/feedback";
            },
            // 日程表
            userCalendar(){
                window.location.href="#/user_calendar";
            },
            // 进行中
            isCarryOn(){
                window.location.href="#/carry_on";
            },
            // 简历详情
            openResume(){
                window.location.href="#/detail_resume";    
            },
            // 账户信息
            openAccount(){
                window.location.href="#/account";    
            },
            // 新发布任务
            openNewTask(){
                window.location.href="#/new_task";  
            },
            // 待评价
            pendEvaluate(){
                 window.location.href="#/pend_evaluate";  
            },
            // 待结算
            pendSettlement(){
                 window.location.href="#/pend_settlement";  
            },
            completed(){
                 window.location.href="#/completed";  
            }
        }
    }    
</script>
<style lang='scss'>
.mint-mask{
    width: 100%;
    height:100%;
    background: #000;
    opacity: .5;
    position: fixed;
    top:0;
    left:0;
}
.mint-msgbox-content-tit{
    text-align: center;
    padding-top: 10px;
    font-size: 12px;
}
.mint-msgbox{
    z-index: 1050;
    .mint-msgbox-content{
        padding-top: 2px;
        p{
            text-align: center;
            font-size: 12px;
            margin-bottom:3px;
        }
    }
}

    .user-title{
        padding:25px 0 25px 20px;
        background:#f66666;
        li{
            float:left;
        }
        .user-img{
            width:70px;
            height:70px;
            -webkit-border-radius:50%;
            -moz-border-radius:50%;
            border-radius:50%;
            border:3px solid #fbb0b0;
            opacity:.8;
            overflow: hidden;
            img{
                 width:70px;
                height:70px;

            }
        }
    }
    .user-name-info{
        margin-left:15px;
        color:#fff;
        margin-top:7px;
        .user-name{
            font-size:15px;
            margin-bottom:10px;
        }
        .user-name-msg{
             opacity:.8;
             a{
                 margin-right:6px;
             }
             span{
                 margin-right:27px;
             }
        }
    }
    .user-task{
        background:#fff;
        margin-bottom:10px;
        li{
            float:left;
            width:50%;
            height:45px;
            line-height:45px;
            color:#666;
            text-align:center;
           
            i{
                display:inline-block;
                width:23px;
                height:22px;
                position:relative;
                top:5px;
            }
        }
    }
    .new-task{
        border-right:1px solid #eaeaea;
        i{
            background:url('../../assets/icon/newTask.jpg') no-repeat;
        }
    }
    .user-calendar{
        i{
            margin-right:-4px;
             background:url('../../assets/icon/calendar.jpg') no-repeat ;
        }
    }
    .user-task-list{
        background:#fff;
        ul{
            display: -moz-box; 
            display: -webkit-box;
            display: -o-box;
            display: box; 
            padding:8px 0;
            height:70px;
        }
        li{
            // float:left;
             box-flex: 1;
            -moz-box-flex: 1;
            -webkit-box-flex: 1;
            text-align:center;
            border-left:1px solid #eaeaea;
            position: relative;
            &:first-child{
                border:none;
            }
            dl{
                margin-top:5px;
                position: relative;
                dt{
                    img{
                       width:30px;
                        height:30px;
                    }
                }
                dd{
                    margin-top:5px;
                    color:#666;
                    span{
                        display: inline-block;
                        width:14px;
                        height:14px;
                        line-height: 14px;
                        text-align: center;
                        -moz-border-radius:50%;
                        -webkit-border-radius:50%;
                        border-radius:50%;
                        background: #f66666;
                        color:#fff;
                        font-size:8px;
                        position: absolute;
                        top:-4px;
                        left:53%;
                    }
                }
            }
            
        }
    }
    .user-info{
        margin-top:10px;
        li{
            height:45px;
            line-height:45px;
            background:#fff;
            border-top:1px solid #eaeaea;
           .user-info-fir-img{
                margin-left:19px;
                margin-right:8px;
                display:inline-block;
                width:22px;
                height:21px;
                position: relative;
                top:5px;
           }
        }
    }
    // 我的简历
    .user-center-resume{
        background:url('../../assets/icon/myResume.png') no-repeat;
        background-size:20px;
    }
    // 意见反馈
    .user-center-feedback{
       background:url('../../assets/icon/feedback.png') no-repeat;
       background-size:20px;

    }
    // 联系客服
    .user-center-contact{
      background:url('../../assets/icon/contact.png') no-repeat;
      background-size:20px;
    }
    // 向右的箭头
 .right-arrow{
    float:right;
    width:10px;
    height:17px;
    margin-right:20px;
    background: url('../../assets/icon/right-arrow.png') no-repeat;
    background-size:10px;
    position:relative;
    top:50%;
    -ms-transform:translateY(-50%); 	
    -moz-transform:translateY(-50%); 	
    -webkit-transform:translateY(-50%); 
    -o-transform:translateY(-50%);
    transform:translateY(-50%);
    
}
</style>