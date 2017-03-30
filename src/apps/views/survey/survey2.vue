<template>
  <div >
    	<div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            问卷测试题
        </div>
         <div class="survey-img">
           <img :src="imgUrl">
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
        imgUrl:'',
        subject:'',
        question:{}
      }
  },
  created(){
    if(sessionStorage.getItem('question')){
      this.question=JSON.parse(sessionStorage.getItem('question'))[1];
      sessionStorage.getItem('imgUrl')&&(this.imgUrl=JSON.parse(sessionStorage.getItem('imgUrl')));
    }else{
      MessageBox.alert('请先填写第一题').then(action => {
           window.location.href='#/survey';
        });
    }
    
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
          subject['2']=this.subject;
          sessionStorage.setItem('subject',JSON.stringify(subject));
          window.location.href='#/survey3';
      },
      goBack(){
        history.go(-1);
      }
  }
}
</script>

<style lang="scss">
  @import '../../style/survey.scss';
</style>
