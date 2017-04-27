<template>
  <div >
    	<div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            问卷测试题
        </div>
        <div class="survey-img">
           <img :src="question.picUrl">
        </div>
        <div class="survey-subject">
           <div>{{question.title}}</div>
           <ul>
             <li v-for="data in question.option">
               <label >
                <input type="radio" name="subject" v-model="subject" :value="data.order">
                <span :class="subject==data.order?'subject-checked':''">{{data.order}}. {{data.content}}</span>
              </label>
             </li>
           </ul>
        </div>
        <div class="survey-submit">
           <button @click="submit">下一题</button>
        </div>
  </div>
</template>
<script>
import Vue from 'vue';
import ApiUtil from '../../../js/utils/api-util.js';
import Util from '../../../js/utils/util.js';
import { Toast,Field,Popup,Picker,Indicator,MessageBox,DatetimePicker } from 'mint-ui';
Vue.component(Popup.name,Popup);
Vue.component(Picker.name,Picker);
Vue.component(DatetimePicker.name, DatetimePicker);
export default {
  name: 'app',
  data(){
      return {
        subject:'',
        imgUrl:'',
        question:{}
      }
  },
  created(){
    sessionStorage.setItem('check',true);

             let me=this;
             let data={};
            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/question/list',data)
                .then(
                    (suc)=>{
                      
                        if(suc.status==0){
                          me.imgUrl=suc.data.questionBanner;
                            me.question=suc.data.questionList[0];
                            sessionStorage.setItem('question',JSON.stringify(suc.data.questionList));
                            // sessionStorage.setItem('imgUrl',JSON.stringify(suc.data.questionBanner));
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
      submit(){
        //   跳到编辑简历页面
          if(!this.subject){
            MessageBox.alert('请选择答案');
            return 
          }
          let subject={};
          if(sessionStorage.getItem('subject')){
            subject=JSON.parse(sessionStorage.getItem('subject'));
          }
        subject['1']=this.subject;
        sessionStorage.setItem('subject',JSON.stringify(subject));
        window.location.href='#/survey2';
      },
      goBack(){
        window.location.href='#/job_list';
      }
  }
}
</script>

<style lang="scss">
  @import '../../style/survey.scss';
</style>
