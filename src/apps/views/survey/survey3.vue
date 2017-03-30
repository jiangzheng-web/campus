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
      this.question=JSON.parse(sessionStorage.getItem('question'))[2];
      sessionStorage.getItem('imgUrl')&&(this.imgUrl=JSON.parse(sessionStorage.getItem('imgUrl')));
    }else{
      MessageBox.alert('请先填写第一题').then(action => {
           window.location.href='#/survey';
        });
    }
    if(sessionStorage.getItem('check')+''=='false'){
      // MessageBox.alert('请先填写第一题').then(action => {
        window.location.href='#/job_list';

      // });
    }
  },
  methods:{
      submit(){
        if(!this.subject){
            MessageBox.alert('请选择答案');
            return 
        }
        let subject={}
        if(sessionStorage.getItem('subject')){
          subject=JSON.parse(sessionStorage.getItem('subject'));
        }
        subject['3']=this.subject;
         let me=this;
          let data={};
          data.question_result=encodeURIComponent(JSON.stringify(subject));
          console.log(decodeURIComponent(data.question_result))
          ApiUtil.getHttp('http://baby.api.cform.cn/api/service/question/submit',data)
            .then(
              (suc)=>{
              if(suc.status==0){
                //   跳到编辑简历页面
                sessionStorage.setItem('check',false);
                MessageBox.alert('已获得6元现金红包，将会在首次完成兼职任务后与薪资一起发放','恭喜您成功通过测试').then(action => {
                   window.location.href='#/edit_resume';
                }); 
             }else{
                Toast({
                  message: suc.errmsg,
                  position: 'middle',
                 duration: 2000
                })
              }
            },(err)=>{
              // Toast({
              //     message:'服务器异常',
              //     position: 'middle',
              //    duration: 2000
              //   })
            }
        )
        
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
