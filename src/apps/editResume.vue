<template>
    <div>
        <div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            编辑简历
        </div>
        <div class="main">
        <p class='edit-title font-title'>为了更好的匹配到兼职学生，请尽量完善职位需求内容。</p>
        <div>
            <p class="main-title edit-main-title">基本信息</p>
            <ul class="edit-ul">
                <li>
                    <input-test
                        v-model="isPerson.name"
                        :inputId="'name'"
                        v-on:inputBlur="inputBlur"
                        :required="true"
                        :label="'姓名'"
                         ref='name'
                        :inputType="'text'"
                        :placeholder="''"
                        :maxLength="10" :lengthError="'请输入10位字符以内的姓名'"
                    ></input-test>
                </li>
                <li >
                    <div class="inputTest" @click="isPromptBox('sex')">
                        <div class="inputBox">
                            <label for="i1" >
                                <ul class="input-tit">
                                    <li>性</li>
                                    <li>别：</li>
                                </ul>                          
                            </label>
                            <input  id="i1" type='text' v-model='isPerson.sexualDscp' readonly="readonly" disabled="disabled"/>
                        </div>
                    </div>
                </li>
                <li>
                     <input-test
                        v-model="isPerson.age"
                        :inputId="'age'"
                        v-on:inputBlur="inputBlur"
                        :label="'年龄'"
                         ref='age'
                         :required="true"
                        :inputType="'text'"
                        :placeholder="''"
                        :pattern="/^[0-9]+$/"
                        :patternError="'请输入数字'"
                        :maxLength="50" :lengthError="''"
                    ></input-test>
                </li>
                <li>
                    <input-test
                        v-model="isPerson.mobile"
                        :inputId="'mobile'"
                        v-on:inputBlur="inputBlur"
                        :label="'联系电话：'"
                         ref='mobile'
                         :required="true"
                        :inputType="'text'"
                        :placeholder="''"
                        :pattern="/^1[3|4|5|7|8]\d{9}$/"
                        :patternError="'请输入正确的手机号'"
                    ></input-test>
                </li>
                <li>
                    <label>自评标签：</label>
                    <ul class="evaluate-list">
                        <li v-for="msg in tag" @click="msg.focus=!msg.focus" :class="{'focus':msg.focus}" >{{msg.name}}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div>
            <p class="main-title edit-main-title">教育信息</p>
            <ul class="edit-ul">
                <li>
                    <input-test
                        v-model="isPerson.collegeName"
                        :inputId="'collegeName'"
                        v-on:inputBlur="inputBlur"
                        :label="'所读院校：'"
                         ref='collegeName'
                         :required="true"
                        :inputType="'text'"
                        :placeholder="''"
                        :maxLength="50" :lengthError="''"
                    ></input-test>
                </li>
                <li>
                       <input-test
                        v-model="isPerson.specialtyName"
                        :inputId="'specialtyName'"
                        v-on:inputBlur="inputBlur"
                        :label="'所读专业：'"
                         ref='specialtyName'
                         :required="true"
                        :inputType="'text'"
                        :placeholder="''"
                        :maxLength="50" :lengthError="''"
                    ></input-test>
                </li>
                <li>
                      <div class="inputTest">
                        <div class="inputBox">
                            <label for="i1" >
                                入学时间：                        
                            </label>
                            <input  id="i1" type='text' readonly="readonly" v-model='isPerson.enteringSchoolDate' @click="isIssueOpen"/>
                            <!--<span class="changeSex changeTime">
                                <a @click=""></a>
                                <a ></a>
                            </span>-->
                        </div>
                    </div>
                </li>
                <li >
                    <div v-show="images[0]" class="showImg">
                        <img :src="images[0]">
                        <span class="delete" @click="deleImg(images[0],file[0])"></span>
                    </div>
                    <div v-show="images[1]" class="showImg">
                        <img :src="images[1]">
                        <span class="delete" @click="deleImg(images[1],file[1])"></span>
                    </div>
                    <div class="inputTest" >
                        <span>上传学生证照片：</span>
                        <span class="fr" @click="photoExa=true">示例照片</span>
                    </div>
                </li>
                <li @click="uploadImg" v-show="images.length<=1">
                <form name="fileinfo" id='fileinfo'>
                    <div class="upload">
                        <input type="file" ref="multiple" accept="image/*" class="img-upload" name="file" @change="onFileChange($event)"/>
                        <input type="hidden" name="filePath" value="123456"/>
                        <img src="../assets/upload.png" >
                    </div>
                    <!-- <div class="imgUp" >
                      <button @click="imgUp">上传照片</button>
                    </div> -->
                  </form>
                </li>
                <li>
                    <div class="imgUp" v-show="showUpImg">
                      <button @click="imgUp">上传照片</button>
                    </div>
                    <p><span class="upload-alert-msg">1.学生证需实拍；</span><span>2.且清晰可见、不得涂改；</span></p>
                    <p class="alert-msg">注：宝贝儿承诺将不以任何形式泄露您的学生证信息！</p>
                    
                </li>
            </ul>
        </div>
        <div>
            <p class="main-title edit-main-title">自我评价</p>
            <ul class="edit-ul">
                <li>
                    <div class="inputTest">
                        <span>自我评价：</span>
                    </div>
                </li>
                <li class="textFa">
                    <textarea class="textarea" v-model="isPerson.selfEvaluation" maxlength="200">
                    </textarea>
                    <span class="ident">{{fontNum}}/200</span>
                </li>
            </ul>
        </div>
        <div class="photoExa" v-show="photoExa">
          <div>
            <p>示例图片</p>
            <img src="../assets/photoExa.png" height="721" width="613">
            <i @click="photoExa=false"></i>
          </div>
        </div>
        <div class="mask" v-show="photoExa" @click="photoExa=false"></div>
        <div class="edit-submit">   
            <button @click="firstSubmit">提交</button>
        </div>
        <mt-popup  v-model="popupVisible1" position="bottom">
          <ul class="titleList">
            <li @click="popupVisible1=false">关闭</li>
            <li></li>
            <li @click="personAssignment">完成</li>
          </ul>
          <mt-picker :slots="slots" v-if="personListShow.personSexList"  @change="personSexList"></mt-picker>
        </mt-popup>
         <mt-datetime-picker
            ref="isIssue"
            type="date"
             :value="isPerson.enteringSchoolDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="isIssueConfirm"
            :endDate="isLongEffecEndDate"
            >
         </mt-datetime-picker>
         </div>
    </div>
</template>
<script>
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
 import Vue from 'vue';
 import ApiUtil from '../js/utils/api-util.js';
 import { Toast,Field,Popup,Picker,Indicator,DatetimePicker,MessageBox } from 'mint-ui';
 import Util from '../js/utils/util.js';
  import inputTest from '../components/inputTest';
  import BabyApi from '../js/rest-api/baby-api.js';
  let babyApi=new BabyApi();
  Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
  Vue.component(DatetimePicker.name, DatetimePicker);
export default {
    data: function() {
        return {
          photoExa:false,
          fontNum:0,
          showUpImg:true,
          dele1:true,
          dele2:true,
           isPerson:{sex:"",enrol:'',selfEvaluation:''},
           tag:[
               {dscp:'有健康证',focus:false},
               {dscp:'沟通能力',focus:false},
               {dscp:'亲和力强',focus:false},
               {dscp:'携带学生证',focus:false},
               {dscp:'积极主动',focus:false},
               {dscp:'服从安排',focus:false},
               {dscp:'认真负责',focus:false},
               {dscp:'活泼开朗',focus:false},
               {dscp:'吃苦耐劳',focus:false}
           ], // 入学时间默认显示字段
         isIssueValue:new Date(new Date().getFullYear()-2,6,15),
         isLongEffecEndDate:new Date(),
            personErr:{
               personSex:''
            },
            personList:{
              personSexList:[
                    {cd:1,text:'男'},
                    {cd:2,text:'女'},            
              ]
            },
            personListShow:{
              personSexList:false
            },
            imageUrls:[],
    //            存储变量
            personStorage:{
              sexList:''
            },
            popupVisible1:false,
            slots: [
              {
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center'
              }
            ],
            images: [],
            file:[],
            dubFile:''
        }
    },
    components:{inputTest},
    watch:{
      'isPerson.selfEvaluation'(newVal){
        this.fontNum=newVal.length;
      }
    },
    created(){
      if(sessionStorage.getItem('subject')){
        sessionStorage.setItem('subject','')
      }
      
            let data={}
                let me=this;
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
             let datas={type:'self_evaluation'};
             ApiUtil.getHttp('http://baby.api.cform.cn/api/common/dict',datas)
                .then(
                    (suc)=>{
                        if(suc.status==0){
                          for(var i=0,r=suc.data.self_evaluation;i<r.length;i++ ){
                            r[i].focus=false;
                          }
                           me.tag=suc.data.self_evaluation;
                           if(sessionStorage.getItem('resume')+''=='false'){
                            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/resume/detail',data)
                          .then(
                              (suc)=>{
                                Indicator.close();
                                  if(suc.status==0){
                                      suc.data.sexualDscp=suc.data.sexual;
                                      me.isPerson=suc.data;
                                      for(var i=0,r=me.tag;i<r.length;i++){
                                          for(var key=0;key<me.isPerson.tag.length;key++){
                                              if(me.isPerson.tag[key] == r[i].name){
                                                  r[i].focus=true;
                                              }
                                          }
                                      }
                                      me.images=[];
                                       me.imageUrls=[];
                                      if(suc.data.studentCardImg.length){
                                        for(var i=0;i<suc.data.studentCardImg.length;i++){
                                          if(suc.data.studentCardImg[i]&&i<2){
                                            me.images.push(suc.data.studentCardImg[i]);
                                            me.imageUrls.push(suc.data.studentCardImg[i]);
                                          }
                                        }
                                        if(me.images.length>=2){
                                          me.showUpImg=false;
                                        }
                                      }
                                      
                                     //  let year=me.isPerson.enteringSchoolDate.slice(0,4);
                                     // let mon=me.isPerson.enteringSchoolDate.slice(4,6);
                                     // let day=me.isPerson.enteringSchoolDate.slice(6);
                                      me.isPerson.enteringSchoolDateDscp= me.isPerson.enteringSchoolDate;
                                  }else{
                                    Indicator.close();
                                        Toast({
                                            message: suc.errmsg,
                                            position: 'middle',
                                            duration: 2000
                                          })
                                  }
                              },(err)=>{
                                  Indicator.close();
                                //   Toast({
                                //   message: '服务器错误',
                                //   position: 'middle',
                                //   duration: 2000
                                // })
                              }
                          )
                        }else{
                           Indicator.close();
                        }
                        }else{
                          Indicator.close();
                              Toast({
                                  message: suc.errmsg,
                                  position: 'middle',
                                  duration: 2000
                                })
                            
                        }
                    },(err)=>{
                      Indicator.close();
                      // Toast({
                      //             message: '服务器错误',
                      //             position: 'middle',
                      //             duration: 2000
                      //           })
                    }
                )
    },
    methods:{
      // photo(){
      //  if(navigator.getUserMedia) {//调用html5拍摄接口
      //   alert(213213)
      //       navigator.getUserMedia(videoObj, function(stream) {
      //         alert(JSON.parse(stream))
      //           video.src = stream;//摄像机属于视频流，所以当然要输出到html5的video标签中了
      //           video.play();//开始播放
      //       }, errBack);
      //   } else if(navigator.webkitGetUserMedia) { //WebKit内核调用html5拍摄接口
      //     alert(11111)
      //       navigator.webkitGetUserMedia(videoObj, function(stream){
      //           video.src = window.webkitURL.createObjectURL(stream);//同上
      //           video.play();//同上
      //       }, errBack);
      //   }
      //   else if(navigator.mozGetUserMedia) { //moz内核调用html5拍摄接口
      //     alert(22222)
      //       navigator.mozGetUserMedia(videoObj, function(stream){
      //           video.src = window.URL.createObjectURL(stream);//同上
      //           video.play();//同上
      //       }, errBack);
      //   }
      // },
        imgUp(){
          if(!this.images.length){
             MessageBox.alert('请先选择待上传的学生证照片').then(action => {
                   window.location.href='#/edit_resume';
                });
          }else{
            // if(this.images.length==1){
            //   this.dele1=false;
            // }else if(this.images.length==2){
            //   this.dele1=false;
            //   this.dele2=false;
            // }
            let data=new FormData(document.getElementById("fileinfo"));
            let me=this;
            // data.append("name", "file");
            // ?app_id=r134edqe13eswe1ewe1e1wqd23d3e3e2
            // &header_img=http://img2.imgtn.bdimg.com/it/u=3637598656,3567466436%26fm=214%26gp=0.jpg
            let msg={}
            if(window.localStorage.getItem('msg')){
              msg=JSON.parse(window.localStorage.getItem('msg'));
            }
            if(!this.file.length){
               MessageBox.alert('请先选择学生证照片');
                  return 
            }
             Indicator.open({
                              text: '正在上传，请稍候...',
                              spinnerType: 'fading-circle'
                            });
            
            // me.imageUrls=[];
            var r=0;
            for(var i=0;i<this.file.length;i++){
              // msg.file=encodeURIComponent(JSON.stringify(data));&file=${msg.file}
              this.$http.post(
              `http://baby.api.cform.cn/api/common/upload?app_id=${msg.app_id}&header_img=${msg.header_img}&type=3`,this.file[i])
                .then(
                    (suc)=>{
                        if(suc.body.status==0){
                            me.imageUrls.push(suc.body.data.fileUrl);
                            // me.check=suc.data;
                            // sessionStorage.setItem('check',suc.data);
                        
                            if(r==this.file.length-1){
                              console.log(this.images.length)
                              if(this.images.length==2){me.showUpImg=false;}
                              Indicator.close(); 
                              Toast({
                                  message: '上传成功',
                                  position: 'middle',
                                  duration: 2000
                              })
                            }
                            r++;
                        }else{
                          Indicator.close();
                              Toast({
                                  message: suc.body.errmsg,
                                  position: 'middle',
                                  duration: 2000
                                })
                        }
                    },(err)=>{
                      Indicator.close();
                      // Toast({
                      //             message: '服务器异常',
                      //             position: 'middle',
                      //             duration: 2000
                      //           })
                    }
                )
            }

            
            
          }
        },
        deleImg(num,file){
            MessageBox({
                          title: '提示',
                          message:'确定放弃此照片吗？',
                          confirmButtonText:'确定' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            this.images.remove(num);
                            this.file.remove(file);
                            this.imageUrls.remove(num);
                            this.showUpImg=true;
                            let data=document.getElementById("fileinfo");
                            data.reset();
                          }else{
                           // console.log('取消')
                          }
                        })
        },
        uploadImg(){
            // console.dir(this.$refs.multiple);
            // this.$refs.multiple.click();
            // return false
        },
        onFileChange (e) {
          var files = e.target.files || e.dataTransfer.files;
          var type = '|' + files[0].type.slice(files[0].type.lastIndexOf('/') + 1) + '|';
          // if('|jpg|png|jpeg|bmp|gif|'.indexOf(type) === -1){
          //     MessageBox.alert('请上传正常格式的图片').then(action => {
          //   });
          //     return
          // }
          if (!files.length) return
          this.createImage(files)

        },
        createImage (file) {
          var vm = this
          var reader = null
          var leng = file.length
          for (var i = 0; i < leng; i++) {
            reader = new window.FileReader()
            reader.readAsDataURL(file[i])
            reader.onload = function (e) {
              vm.images.push(e.target.result)
            }
          }
          this.file.push(new FormData(document.getElementById("fileinfo")));
          // this.dubFile=file[0].name;
        },
        // 打开时间框
        isIssueOpen(){
          this.$refs.isIssue.open();
        },
        // 时间框回调
        isIssueConfirm(date){
          let mon=date.getMonth()+1;
          let day=date.getDate();
          if(mon<10){
            mon="0"+mon;
          }
          if(day<10){
            day="0"+day;
          }
         
          this.isPerson.enteringSchoolDate=date.getFullYear()+'-'+mon+'-'+day;
          this.$forceUpdate();
        // this.isIdentity.dtIssueDscp=date.getFullYear()+'年 '+(date.getMonth()+1)+'月 '+date.getDate()+'日';
        // this.isIssueValue = new Date(date.getFullYear(),date.getMonth(),date.getDate());
        // this.inputBlur();
      },
        firstSubmit(){
             // 跳到职位列表
              if(this.isPerson&&this.$refs.name.test&&this.isPerson.sexual
                &&this.$refs.age.test&& this.$refs.collegeName.test &&this.$refs.specialtyName.test
                && this.$refs.mobile.test 
                  &&this.isPerson.enteringSchoolDate&&this.isPerson.selfEvaluation){
                  let sub=false;
                if(this.imageUrls.length==0){
                  MessageBox.alert('请先上传学生证照片');
                  return 
                }
                let tag=[]
                  for(var i=0;i<this.tag.length;i++){
                    if(this.tag[i].focus){
                      tag.push(this.tag[i].value);
                      sub=true;
                    }
                  }
                  this.isPerson.tag=tag;
                  let isPerson={};
                  isPerson.name=this.isPerson.name;
                  isPerson.sexual=this.isPerson.sexual;
                  isPerson.age=this.isPerson.age;
                  isPerson.mobile=this.isPerson.mobile;
                  isPerson.tag=this.isPerson.tag;
                  isPerson.collegeName=this.isPerson.collegeName;
                  isPerson.specialtyName=this.isPerson.specialtyName;
                  isPerson.enteringSchoolDate=this.isPerson.enteringSchoolDate;
                  // ******************************************//
                  isPerson.studentCardImg=encodeURIComponent(JSON.stringify(this.imageUrls));
                  isPerson.selfEvaluation=this.isPerson.selfEvaluation;
                  if(isPerson.sexual=='男'){
                    isPerson.sexual='1';
                  }else if(isPerson.sexual=='女'){
                    isPerson.sexual='2';
                  }
                  
                  if(isPerson.enteringSchoolDate.indexOf('-') >= 0){
                    isPerson.enteringSchoolDate=isPerson.enteringSchoolDate.replace(/-/g,'');
                  }
                  if(sub){
                      MessageBox({
                          title: '提示',
                          message:'确认提交吗？',
                          confirmButtonText:'提交' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            Indicator.open({
                              text: '正在提交，请稍候...',
                              spinnerType: 'fading-circle'
                            });
                            let sef={};
                            let resume=sessionStorage.getItem('resume');
                            console.log(encodeURIComponent(JSON.stringify(this.imageUrls)))
                            if(resume+''=='false'){
                               ApiUtil.getHttp('http://baby.api.cform.cn/api/service/resume/edit',isPerson)
                              .then(
                                  (suc)=>{
                                       Indicator.close();
                                      if(suc.status==0){
                                            Toast({
                                                message: '提交成功',
                                                position: 'middle',
                                                duration: 2000
                                              })
                                             window.location.href='#/job_list';
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
                                     //            message: '服务器异常',
                                     //            position: 'middle',
                                     //            duration: 2000
                                     //          })
                                  }
                              )
                            }else if(resume+''=='true'||!resume){
                               ApiUtil.getHttp('http://baby.api.cform.cn/api/service/resume/add',isPerson)
                              .then(
                                  (suc)=>{
                                       Indicator.close();
                                      if(suc.status==0){
                                            Toast({
                                                message: '提交成功',
                                                position: 'middle',
                                                duration: 2000
                                              })
                                            window.location.href='#/job_list';
                                      }else{
                                            Toast({
                                                message: suc.errmsg,
                                                position: 'middle',
                                                duration: 2000
                                              })
                                           
                                      }
                                  },(err)=>{
                                    Indicator.close();
                                     Toast({
                                                message: '服务器异常',
                                                position: 'middle',
                                                duration: 2000
                                              })
                                  }
                              )
                            }
                           
                            
                          }else{
                           // console.log('取消')
                          }
                        })
                  }else{
                     MessageBox.alert('请填写所有信息');
                  }
              }else{
                 MessageBox.alert('请填写所有信息');
              }
               
        },
        inputBlur(){

        },
          isPromptBox(isWho){
            this.slots[0].values=[];
            switch (isWho) {
                case 'sex':
                    if (!this.personErr.personSex) {
                      this.slots[0].values.unshift('-请选择-');
                      for (var i = 0, r = this.personList.personSexList; i < r.length; i++) {
                        this.slots[0].values.push(r[i].text);
                      }
                      console.log(this.slots[0].values)
                      this.popupVisible1 = true;
                      this.personListShow.personSexList = true;
                    } else {
                      Toast({
                        message: this.personErr.personSexList,
                        position: 'middle',
                        duration: 2000
                      })
                    }
                    break;
            }
        },
         personAssignment(){
            // 证件类型下拉框赋值
            if (this.personListShow.personSexList) {
              this.test=!0;
              // 判断点击的是否与选中的一致
              console.log(this.personStorage.sexList)
              if(this.personStorage.sexList=='-请选择-'){
                this.isPerson.sexual="0";
                this.isPerson.sexualDscp="";
              }
               if(this.personStorage.sexList!=this.isPerson.mtCifIdTypCdDscp){
                //  不一致则清空证件号码
                    if(this.personStorage.sexList&&this.personStorage.sexList!='-请选择-'){
                      this.isPerson.sexualDscp = this.personStorage.sexList;
                      for (var i = 0, r = this.personList.personSexList; i < r.length; i++) {
                        if (r[i].text == this.isPerson.sexualDscp) {
                          this.isPerson.sexual = r[i].cd;
                        }
                      }
                    }
               }
              this.popupVisible1 =false;
              this.personListShow.personSexList = false;
            }
          },
          //      证件类型change方法
      personSexList(pic, val)
      {
        this.personStorage.sexList = val[0];
      },
        goBack(){
            history.go(-1);
        }
    }
}
</script>
<style lang='scss'>
.imgUp{
  margin-bottom: 10px;
  text-align: center;
  button{
    width:100px;
    height:25px;
    line-height: 25px;
    border-radius: 4px;
    background: #f66666;
    color:#fff;
  }
}
.showImg{
  margin-top: 10px;
  position: relative;
  img{
    width:100%;
  }
  .delete{
    position: absolute;
    top:-8px;
    right: -8px;
    display:inline-block;
    width:20px;
    height:20px;
    border-radius: 50%;
    background: red url('../assets/clear.png') no-repeat;
    background-size:20px;
  }
}
.mask{
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: #000;
  opacity: .4;
  z-index: 800;
}
.photoExa{
  width:90%;
  height:90%;
  position: fixed;
  top:50%;
  left:50%;
   -ms-transform:translate(-50%,-50%);     
   -moz-transform:translate(-50%,-50%);    
    -webkit-transform:translate(-50%,-50%); 
   -o-transform:translate(-50%,-50%);
   transform:translate(-50%,-50%);
   z-index: 1000;
   
   background: #fff;
   p{
    margin-top: 4px;
    margin-bottom: 15px;
    text-align: center;
   }
   img{
     width:100%;
     height: 90%;
   }
   div{
    padding:20px;
     width:100%;
     height: 100%;
    position: relative;
    i{
      position: absolute;
      top:5px;
      right: 5px;
      width: 20px;
      height:20px;
      background: url('../assets/icon/del.png') no-repeat;
      background-size:18px; 
    }
   }
}
    .img-upload{
         height:180px;
         width:100%;
        opacity: 0;
        position: relative;
        z-index:500;
    }
     .edit-title{
         font-size:14px;
         text-align:center;
         padding-top:10px;
         color:#8e8e8e;
     }
     .edit-main-title{
         margin-top:35px;
         margin-bottom:17px;
     }
     .edit-ul{
         li{
             margin-bottom:14px;
             .alert-msg{
               margin-top: 5px;
             }
         }
     }
     .evaluate-list{
        //  display: -moz-box; 
        // display: -webkit-box;
        //  display: -o-box;
        //  display: box; 
        //   -moz-box-pack:justify; -webkit-box-pack:justify; -o-box-pack:justify; box-pack:justify;
        margin-top:15px;
         li{
            float:left;
            width:31%;
            height:33px;
            line-height:33px;
            text-align:center;
            border:1px solid #e5e5e5;
            -moz-border-radius: 50%;
            -webkit-border-radius:50%;
            border-radius:30px;
            background:#fff;
            margin-right:3%;
            &:nth-child(3){
                margin-right:0;
            }
            &:nth-child(6){
                margin-right:0;
            }
            &:nth-child(9){
                margin-right:0;
            }
            &.focus{
                border-color:#f66666;
                color:#f66666;
            }
         }
         
         &:after{
             content:' ';
             display:block;
             clear:both;
         }
     }
     .edit-submit{
         padding:14px;
         button{
             width:100%;
             height:42px;
             background:#f66666;
             font-size:18px;
             color:#fff;
               -moz-border-radius:5px;
                -webkit-border-radius:5px;
                border-radius:5px;
         }
     }
     .changeSex{
         display:inline-block;
         width:42px;
           height: 42px;
           background:#DADADA url('../assets/icon/clickArrow.png') no-repeat 9px 2px;
            box-flex: 1;
            -moz-box-flex: 1;
            -webkit-box-flex: 1;
     }
     .changeTime{
         a{
             display:block;
             height:21px;
         }
     }
     .upload{
         height:180px;
         background:#fff;
         position:relative;
         img{
             width:80px;
             height:80px;
             position:absolute;
             left:50%;
             top:50%;
             /*z-index:2;*/
            transform:translate(-50%,-50%);
            -ms-transform:translate(-50%,-50%); 	
            -moz-transform:translate(-50%,-50%); 	
            -webkit-transform:translate(-50%,-50%); 
            -o-transform:translate(-50%,-50%);
         }
     }
    .upload-alert-msg{
        margin-right:10%;

    }
    .textarea{
        display:block;
        width:100%;
        resize: none;
        height:250px;
        padding:10px 11px;
        color:#666;
    }
</style>