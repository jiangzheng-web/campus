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
      // sessionStorage.getItem('imgUrl')&&(this.imgUrl=JSON.parse(sessionStorage.getItem('imgUrl')));
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
    let subject={};
      if(sessionStorage.getItem('subject')){
        subject=JSON.parse(sessionStorage.getItem('subject'));
      }
    this.subject=subject['3'];
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
        sessionStorage.setItem('subject',JSON.stringify(subject));
          let me=this;
          let data={};
          data.question_result=encodeURIComponent(JSON.stringify(subject));
          ApiUtil.getHttp('http://baby.api.cform.cn/api/service/question/submit',data)
            .then(
              (suc)=>{
              if(suc.status==0){
                // 跳到编辑简历页面
                sessionStorage.setItem('check',false);
                MessageBox.alert('已获得6元现金红包，将会在首次完成兼职任务后与薪资一起发放','恭喜您成功通过测试').then(action => {
                   window.location.href='#/edit_resume';
                }); 
             }else{
                if(suc.data&&suc.data.length){
                  let question=JSON.parse(sessionStorage.getItem('question'));
                  console.log(question)
                  let ss;
                  for(var i=0;i<question.length;i++){
                    for(var r=0;r<suc.data.length;r++){
                      if(question[i].id==suc.data[r]){
                        if(i==0){
                          MessageBox.alert('请重做第一题').then(action => {
                           window.location.href='#/survey';
                          }); 
                        }else if(i==1){
                          MessageBox.alert('请重做第二题').then(action => {
                             window.location.href='#/survey2';
                          }); 
                        }else if(i==2){
                          MessageBox.alert('请重做第三题').then(action => {
                             window.location.href='#/survey3';
                          }); 
                        }
                        ss=true;
                      }
                    }
                    if(ss){
                      break;
                    }
                  }
                }
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
         window.location.href='#/survey2';
      }
  }
}
</script>

<style lang="scss">
  @import '../../style/survey.scss';
</style>
