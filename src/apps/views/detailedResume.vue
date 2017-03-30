<template>
<div  class="detail-body">
  <div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
           简历详情
        </div>
    <div class="detail-main">
        <div class="detail-res">
            <ul>
                <li class='detail-title clear'>
                    <dl>
                        <dt><img :src="detail.headerImg" alt=""></dt>
                        <dd>{{detail.name}}</dd>
                    </dl>
                    <div class="detail-add">
                        <!-- <i></i> -->
                        <span>{{detail.distance}}</span>
                    </div>
                </li>
                <li class="detail-msg">
                    <ol class="clear detail-msg-1">
                        <li>
                           <em>年龄:</em>
                           <span>{{detail.age}}</span>
                        </li>  
                        <li>
                            <em>性别:</em>
                            <span>{{detail.sexual}}</span>
                        </li>
                        <li>
                            <em>电话:</em>
                            <span>{{detail.mobile}}</span>
                        </li>
                    </ol>
                    <ol class="clear  detail-msg-2">
                        <li>
                           <em>兼职平台次数:</em>
                           <span>{{detail.taskTime}}次</span>
                        </li>  
                        <li>
                            <em>评分:</em>
                            <span>{{detail.score}}分</span>
                        </li>
                    </ol>
                </li>   
                <li class="detail-border"></li>
                <li class='detail-label'>
                    <ol class="clear">
                        <li v-for="tag in detail.tag">{{tag}}</li>
                    </ol>
                </li>
            </ul>
        </div>
        
        <div class="detail-main-msg">
            <div class="school-msg">
                <p>
                   <i></i>
                        <span>{{detail.collegeName}}</span>
                </p>
                <ul class=" clear">
                    <li>
                        
                         <em>入学:</em>
                        <span>{{detail.enteringSchoolDate}}</span>
                    </li>
                    <li>
                        <em>专业:</em>
                        <span>{{detail.specialtyName}}</span>
                    </li>
                </ul>
                
            </div>
            <!-- <div class="detail-border"></div> -->
            <div class="detail-evaluate">
                <p>自我评价</p>
                <div>{{detail.selfEvaluation}}</div>
            </div>
            <div class="detail-photo">
                <p>附件照片 （学生证）</p>
                <div v-for="img in detail.studentCardImg" v-show="img">
                    <div v-show="!img">学生证照片</div>
                    <img :src="img">
                </div>
            </div>
        </div>
        </div>
        <div class="detail-edit-res" @click="editResume">
            编辑简历
        </div>
    </div>
</template>
<script>
 import Vue from 'vue';
 import { Toast,Field,Popup,Picker,Indicator,DatetimePicker,MessageBox } from 'mint-ui';
  Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
  Vue.component(DatetimePicker.name, DatetimePicker);
 import ApiUtil from '../../js/utils/api-util.js';
    export default{
        data(){
            return {
                photoShow:false,
                detail:{
                    // realName:'王俊凯',
                    // "distance": "<500m", //距离
                    // "age": "24岁",  //年龄
                    // "sexual": "男", //性别
                    // "mobile": "18817893609", //手机号
                    // "tag": [   //标签
                    //   "有健康证",
                    //   "沟通能力强",
                    //   "亲和力强"
                    // ],
                    // "taskTime": "8", //兼职次数
                    // "score": "8.8",  //评分
                    // "collegeName": "清华大学", //学校
                    // "specialtyName": "计算机", //专业
                    // "enteringSchoolDate": "2009-09", //入学时间
                    // "selfEvaluation": "阿斯顿发斯蒂芬阿斯顿发生打算打发沙发斯蒂芬阿斯顿发斯蒂芬阿萨帝fasd 法师打发是打发是打发似的发阿萨帝", //自我评价
                    // "studentCardImg": {  //学生证照片
                    //   "1": "http://bbegf2017.oss-cn-shenzhen.aliyuncs.com/timg.jpeg",
                    //   "2": "http://bbegf2017.oss-cn-shenzhen.aliyuncs.com/timg.jpeg"
                    // }
                }
            }
        },
        created(){
            let data={
                }
                let me=this;
            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/resume/detail',data)
                .then(
                    (suc)=>{
                        console.log(suc)
                        if(suc.status==0){
                            this.detail=suc.data;
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
            editResume(){
                window.location.href='#/edit_resume';
            },
            goBack(){
                history.go(-1);
            },
            getHttp(url,data){
                let params = "";
                for(var key in data){
                      if( data[key] != undefined)
                        params += key + "=" + data[key] + "&";
                }
                if(params.length > 0){
                    params = params.substr(0,params.length - 1);
                    url +="?" +params;
                    data = {};
                }
               return new Promise(
                   (resolve,reject)=>{
                    this.$http.get(url,params)
                    .then(
                        (suc)=>{
                            resolve(suc.body)
                        },(err)=>{
                            reject(err);
                        }
                    )
               })
            },
        }
    }
</script>
<style lang='scss'>

.detail-body{
    padding-bottom:50px;
}
.detail-edit-res{
    width:100%;
    height:45px;
    line-height:45px;
    text-align:center;
    position:fixed;
    bottom:0;
    font-size:15px;
    color:#3dbd81;
    background:#fff;
     -moz-border-radius:4px;
                -webkit-border-radius:4px;
                border-radius:4px;
}
.detail-photo{
    padding:15px;
    p{
        text-align:center;  
        color:#ccc;
        margin-bottom: 10px;
    }
    div{
        height:380px;
        line-height:380px;
        img{
            width:100%;
            height:380px;
        
        }
        text-align:center;  
        background:#ccc;
        color:#666;
        margin-bottom: 15px;
    }
}
.detail-evaluate{
    padding:15px;
    font-size:15px;
    margin-bottom:10px;
    p{
        text-align:center;  
        color:#ccc;
    }
    div{
        color:#878787;
    }
}   
.detail-main-msg{
    margin-top:10px;
    padding-bottom: 10px; 
    div{
        background:#fff;
    }
    .school-msg{
        padding:15px;
        padding-bottom: 10px;
        margin-bottom: 10px;
        p{
            margin-bottom: 10px;
        }
        i{
                    display:inline-block;
                    width:18px;
                    height:18px;
                    background:url('../../assets/icon/school.png') no-repeat;
                    background-size:18px;
                    position:relative;
                    top:4px;
                }
        li{
            float:right;
            &:first-child{
                float:left;
                
            }
            em{
                color:#ccc;
            }
        }
    }
    p{
        em{
            color:#ccc;
        }
    }
}
.detail-main{
    padding:15px;
}
    .detail-res{
        background:#fff;
        padding-bottom: 10px;
    }
    .detail-title{
        padding:15px;
        dl{
            float:left;
            dt{
                display:inline-block;
                width:40px;
                height:40px;
                -moz-border-radius:50%;
                -webkit-border-radius:50%;
                border-radius:50%;
                background:red;
                overflow: hidden;
                img{
                    width:40px;
                height:40px;
                }
            }
            dd{
                float:right;
                display:inline-block;
                height:40px;
                line-height:40px;
                margin-left:10px;
                color:#303030;
                img{
                    width:40px;
                    height:40px;
                }
            }
        }
    }
    .detail-add{
        float:right;
        height:40px;
        line-height:40px;
        i{
            display:inline-block;
            width:10px;
            height:14px;
            background:url('../../assets/icon/add.png') no-repeat;
            background-size:10px;
            margin-top:3px;
            position:relative;
            top:1px;
        }
    }
    /*年龄等信息*/
    .detail-msg{
        padding:0 15px;
       ol.detail-msg-1{
            position:relative;
            li{
                float:left;
                margin-bottom:10px;
                &:nth-child(2){
                    /*margin-left: 15%;*/
                    position:absolute;
                    left:38%;
                    -ms-transform:translateX(-50%);     
                    -moz-transform:translateX(-50%);    
                    -webkit-transform:translateX(-50%); 
                    -o-transform:translateX(-50%);
                     transform:translateX(-50%);
                }
                &:nth-child(3){
                    float:right;
                } 
            }
        }
        ol.detail-msg-2{
            position:relative;
            li{
                float:left;
                margin-bottom:10px;
                &:nth-child(2){
                   width:127px;
                   float:right;
                }
                
            }
        }
        em{
            font-style:normal;
            display:inline-block;
            color:#ccc;
        }
        span{
            display:inline-block;
        }
    }
    /*中间的横线*/
    .detail-border{
        border-top:1px solid #eaeaea;
        margin-bottom:10px;
    }
    .detail-label{
        padding:0 15px;
        li{
            float:left;
            width:31%;
            height:33px;
            line-height:33px;
            text-align:center;
            margin-bottom:5px;
            border:1px solid #eaeaea;
            -moz-border-radius:30px;
            -webkit-border-radius:30px;
            border-radius:30px;
            color:#ccc;
            margin-left:3%;
            &:nth-child(1),&:nth-child(4),&:nth-child(7),&:nth-child(10),&:nth-child(13){
                 margin-left:0;
            }
        }
    }
</style>