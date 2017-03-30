<template>
  <div class="hello">
   <div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            日程表
            <a class="isSet" @click="changeSet">{{setMsg}}</a>
  </div>
  <div class="calen-body">
    <h3 class="time-title">{{year}}年</h3>
    <div class="time-top">
      <ul class="clear">
        <li @click="prevMonth" v-show="showTop" class="fl"></li>
        <li>{{month|urlDecode}}</li>
        <li @click="nextMonth" v-show="showNext" class="fr"></li>
      </ul>
    </div>
      <ul class="calen-week clear clear">
          <li  v-for="day in week" class="fl">
            {{day.dscp}}
          </li>
      </ul>
      <div class="bor">
        <p></p>
      </div>
      <div v-show="isSetting">
        <ul class="cal-tab">
            <li v-for='d in date' class="clear">
              <div v-for='s in d' class="fl" @click="setUpNo(s,d)" >
                   <ul>
                      <li class="font-wei" :class="{'isChoice':s.isNotWork||s.isNot}"><span>{{s.msg}}</span></li>
                      <li>{{s.status}}</li>
                   </ul>
                </div>
              </li>
        </ul>
        <div class="bor">
          <p></p>
        </div>
        <div class="cal-btn">
          <button @click="isSectiing">{{setting}}</button>
        </div>
       
      </div>
      <div v-show="!isSetting">
        <ul class="cal-tab">
            <li v-for='d in date' class="clear">
              <div v-for='(s,$index) in d' class="fl">
                   <ul @click="clickWork(s)"
                   :class="{
                          'isfree':isFree(d[$index-1],s,d[$index+1]),
                          'isFrTop':isFrTop(d[$index-1],s,d[$index+1]),
                          'isFrAll':isFrAll(d[$index-1],s,d[$index+1]),
                          'isFrNext':isFrNext(d[$index-1],s,d[$index+1]),

                          'isNotfree':isNotfree(d[$index-1],s,d[$index+1]),
                          'isNotTop':isNotTop(d[$index-1],s,d[$index+1]),
                          'isNotAll':isNotAll(d[$index-1],s,d[$index+1]),
                          'isNotNext':isNotNext(d[$index-1],s,d[$index+1]),

                          'isWorkfree':isWorkfree(d[$index-1],s,d[$index+1]),
                          'isWorkTop':isWorkTop(d[$index-1],s,d[$index+1]),
                          'isWorkAll':isWorkAll(d[$index-1],s,d[$index+1]),
                          'isWorkNext':isWorkNext(d[$index-1],s,d[$index+1])

                        }">
                      <li class="font-wei" >
                        <span>{{s.msg}}</span>
                      </li>
                      <li>
                        <span v-show="!s.isClick">{{s.status}}</span>
                        <i v-show="s.isClick" class="redCir"></i>
                      </li>
                   </ul>
              </div>
            </li>
        </ul>
        <div class="bor">
          <p></p>
        </div>
        <div class="cal-bor"></div>
         <div class="cal-det-msg" v-show="isWorkShow">
          <p>{{showMsg.day}} 备注</p>
          <div class="bor">
            <p></p>
          </div>
          <div class="cal-msg-min">
            <p>
              <i></i>
              <span>工作</span>
            </p>
            <ul>
              <li class="clear">
                <label class="fl">上班时间: </label>
                <span class="fl">{{showMsg.workHours}}-{{showMsg.offHours}}</span>
              </li>
              <li class="clear">
                <label class="fl">工作地点:</label>
                <div class="fl" >
                  <p>(门店) {{showMsg.storeName}}</p>
                  <p>(地址) {{showMsg.address}}</p>
                </div>
              </li>
              <li  class="clear">
                <label class="fl">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注: </label>
                <div class="fl">{{showMsg.jobDesc}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var dateTest=function (year,mon,day){
    if(!day||!mon){
      return false
    }
    if(new Date(year,mon,day).getTime()<new Date('1900-1-1')){
					return false
		}
    if(new Date(`${year}-${mon}-${day}`).getTime()>new Date().getTime()){
      return !1;
    }
    if(year%4==0&&(year%100!=0||year%400==0)){
      if(mon==2){
        if(day<=29){
          return true;
        }else{
          return !1;
        }
      }
    }else{
      if(mon==2){
        if(day<=28){
          return true;
        }else{
          return false;
        }
      }
    }
    if(mon==1 || mon==3 || mon==5 || mon==7 || mon==8 || mon==10 || mon==12){
        if(day<=31){
          return true;
        }else{
          return false;
        }
    }else if(mon==4 || mon==6 || mon==9 || mon==11){
        if(day<=30){
          return true;
        }else{
          return false;
        }
    }else if(mon!=2){
      return false;
    }
  }
import Vue from 'Vue';
  import ApiUtil from '../js/utils/api-util.js';
import { Toast,Field,Popup,Picker,Indicator,MessageBox,DatetimePicker } from 'mint-ui';
  Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
   Vue.component(DatetimePicker.name, DatetimePicker);
export default {
  name: 'hello',
  data () {
    return {
      week:[{dscp:'一',cd:1}, {dscp:'二',cd:2},{dscp:'三',cd:3}, {dscp:'四',cd:4}, {dscp:'五',cd:5}, {dscp:'六',cd:6},{dscp:'日',cd:7}],
      date:[],
      year:new Date().getFullYear(),
      month:'',
      showNext:true,
      showTop:true,
      isWorkShow:false,
      showMsg:{},
      dataList :{
        // "20170302": {
        //   "workStatus": 1,
        //   "workInfo": {
        //     "workHours": "9:00",
        //     "offHours": "18:00",
        //     "storeName": "门店测试0012",
        //     "address": "是打发似的发",
        //     "jobDesc": "备注备注"
        //   }
        // },
        // "20170328": {
        //   "workStatus": 2,
        //   "workInfo": {
        //     "workHours": "9:00",
        //     "offHours": "18:00",
        //     "storeName": "门店测试0012",
        //     "address": "是打发似的发",
        //     "jobDesc": "备注备注"
        //   }
        // },
        // "20170330": {
        //   "workStatus": 2,
        //   "workInfo": {
        //     "workHours": "9:00",
        //     "offHours": "18:00",
        //     "storeName": "门店测试0012",
        //     "address": "是打发似的发",
        //     "jobDesc": "备注备注"
        //   }
        // },
        // "20170325": {
        //   "workStatus": 2,
        //   "workInfo": {
        //     "workHours": "9:00",
        //     "offHours": "18:00",
        //     "storeName": "门店测试0012",
        //     "address": "是打发似的发",
        //     "jobDesc": "备注备注"
        //   }
        // },
        // "20170311": {
        //   "workStatus": 2,
        //   "workInfo": {
        //     "workHours": "9:00",
        //     "offHours": "18:00",
        //     "storeName": "门店测试0012",
        //     "address": "是打发似的发",
        //     "jobDesc": "备注备注"
        //   }
        // }
      },
      setting:'设置为不接单',
      isNotRepeat:false,
      isNotWorkRepeat:false,
      isNot:'',
      isNotWork:'',
      isSetting:false,
      setMsg:'设置',
      topInfo:{}
    }
  },
  created(){
    
    let mon=new Date().getMonth()+1;
   this.getMsg(mon);
  },
  methods:{
    getMsg(mon){
        let data={};
        if(mon<10){
          mon='0'+mon;
        }
        console.log(this.year)
        data.month=this.year+''+mon;
        let me=this;
       ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/agenda',data)
                .then(
                    (suc)=>{
                        if(suc.status==0){
                            me.dataList=suc.data;
                            this.readerDate(me.year,me.month);
                        }else{
                              Toast({
                                  message: suc.errmsg,
                                  position: 'middle',
                                  duration: 2000
                                })
                               this.readerDate(me.year,me.month);
                        }
                    },(err)=>{
                      Toast({
                          message: '服务器错误',
                          position: 'middle',
                          duration: 2000
                       })
                       this.readerDate(me.year,me.month);
                    }
                )
    },
    clickWork(info,msg){
      if(this.topInfo!=info){
        this.topInfo.isClick=false;
        this.isWorkShow=false;
      }
      if(info.status=='工作'){
        info.isClick=!info.isClick;
        this.isWorkShow=!this.isWorkShow;
        this.showMsg=info;
        this.showMsg.day=`${this.year}年${this.month}月${this.showMsg.msg}日`;
      }
      this.topInfo=info;
    },
     isWorkNext(top,now,next){
      if(now&&top&&(now.status=='工作'&&!next||(now.status=='工作'&&top.status&&top.status=='工作'&&next.status!='工作'))){
        return true;
      }
      return false;
    },
    isWorkAll(top,now,next){
      if(now&&top&&next&&now.status=='工作'&&top.status&&top.status=='工作'&&next.status=='工作'){
        return true;
      }
      return false;
    },
    isWorkTop(top,now,next){
      if(now.status=='工作'
        &&(
          (!top&&next&&next.status=='工作')
          ||(now.status=='工作'&&top&&next&&top.status!='工作'&&next.status=='工作')
          )
        ){
        return true;
      }
      return false;
    },
    isWorkfree(top,now,next){
      if(now.status=='工作'
        &&(
          (!next&&top&&top.status!='工作')||
          (!top&&next.status!='工作')||
          (top&&top.status!='工作'&&next.status!='工作')
          )
        ){
        return true;
      }
      return false;
    },
    isNotNext(top,now,next){
      if(now&&top&&(now.status=='不接单'&&!next||(now.status=='不接单'&&top.status&&top.status=='不接单'&&next.status!='不接单'))){
        return true;
      }
      return false;
    },
    isNotAll(top,now,next){
      if(now&&top&&next&&now.status=='不接单'&&top.status&&top.status=='不接单'&&next.status=='不接单'){
        return true;
      }
      return false;
    },
    isNotTop(top,now,next){
      if(now.status=='不接单'
        &&(
          (!top&&next&&next.status=='不接单')
          ||(now.status=='不接单'&&top&&next&&top.status!='不接单'&&next.status=='不接单')
          )
        ){
        return true;
      }
      return false;
    },
    isNotfree(top,now,next){
      if(now.status=='不接单'
        &&(
          (!next&&top&&top.status!='不接单')||
          (!top&&next.status!='不接单')||
          (top&&top.status!='不接单'&&next.status!='不接单')
          )
        ){
        return true;
      }
      return false;
    },
    isFrNext(top,now,next){
      if(now&&top&&(now.status=='空闲'&&!next||(now.status=='空闲'&&top.status&&top.status=='空闲'&&next.status!='空闲'))){
        return true;
      }
      return false;
    },
    isFrAll(top,now,next){
      if(now&&top&&next&&now.status=='空闲'&&top.status&&top.status=='空闲'&&next.status=='空闲'){
        return true;
      }
      return false;
      // s.status=='空闲'&&d[$index-1].status!='空闲'&&d[$index+1].status!='空闲';
    },
    isFrTop(top,now,next){
      if(now.status=='空闲'
        &&(
          (!top&&next&&next.status=='空闲')
          ||(now.status=='空闲'&&top&&next&&top.status!='空闲'&&next.status=='空闲')
          )
        ){
        return true;
      }
      return false;
      // s.status=='空闲'&&d[$index-1].status!='空闲'&&d[$index+1].status!='空闲';
    },
    isFree(top,now,next){
      if(now.status=='空闲'
        &&(
          (!next&&top&&top.status!='空闲')||
          (!top&&next.status!='空闲')||
          (top&&top.status!='空闲'&&next.status!='空闲')
          )
        ){
        return true;
      }
      return false;
      // s.status=='空闲'&&d[$index-1].status!='空闲'&&d[$index+1].status!='空闲';
    },
    // 点击设置时
    changeSet(){  
      this.isSetting= !this.isSetting;
      if(this.setMsg=='设置'){
        this.setMsg='取消设置';
      }else if(this.setMsg=='取消设置'){
         this.setMsg='设置';
      }
    },
    setOther(data){
        ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/dayoff',data)
                .then(
                    (suc)=>{
                        if(suc.status==0){
                            Toast({
                                  message: '设置成功',
                                  position: 'middle',
                                  duration: 2000
                                })
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
    // 设置空闲
    isSectiing(){
      if(this.isNotRepeat&&this.isNotWorkRepeat){
        MessageBox.alert('请选择一种状态进行设置').then(action => {
        });
        return 
      }
      if(this.isNotRepeat&&!this.isNotWorkRepeat){
        let data={date:[],type:'2'};
        let month,day;
        if(this.month<10){
          month='0'+this.month;
        }else{
          month=this.month;
        }
        for(var i=0;i<this.date.length;i++){
        for(var key in this.date[i]){
          if(this.date[i][key].isNot){
            this.date[i][key].status='空闲';
            this.date[i][key].isNot=false;
            day=this.date[i][key].msg;
            if(this.date[i][key].msg<10){
              day='0'+this.date[i][key].msg
            }
            data.date.push(`${this.year}${month}${day}`);
          }
        }
      }
      this.setOther(data);
      this.setMsg='设置';
      this.isSetting=false;
      this.isNotRepeat=false;
    }
      if(!this.isNotRepeat&&this.isNotWorkRepeat){
         let data={date:[],type:'1'};
        let month,day;
        if(this.month<10){
          month='0'+this.month;
        }else{
          month=this.month;
         } 
         for(var i=0;i<this.date.length;i++){
        for(var key in this.date[i]){
          if(this.date[i][key].isNotWork){
            this.date[i][key].status='不接单';
            this.date[i][key].isNotWork=false;
            // data.push()
            day=this.date[i][key].msg;
             if(this.date[i][key].msg<10){
              day='0'+this.date[i][key].msg;
            }
            data.date.push(`${this.year}${month}${day}`);
          }
        }
      }
      this.setOther(data);
      this.setMsg='设置';
      this.isSetting=false;
      this.isNotWorkRepeat=false;
      }
    },
    // 选中后设置
    setUpNo(info){
      if(info.status!='工作'){
        if(info.status=='不接单'){
          info.isNot=!info.isNot;
          this.setting="设置为空闲";
        }else if(info.status=='空闲'){
          info.isNotWork=!info.isNotWork;
          this.setting="设置为不接单";
        }
      }
      let s=0,h=0;
      for(var i=0;i<this.date.length;i++){
        for(var key in this.date[i]){
          if(this.date[i][key].isNot){
            this.isNotRepeat=true;
            s++;
          }
          if(this.date[i][key].isNotWork){
            this.isNotWorkRepeat=true;
            h++;
          }
        }
      }
      s==0&&(this.isNotRepeat=false);
      h==0&&(this.isNotWorkRepeat=false);
      if(this.isNotRepeat&&this.isNotWorkRepeat){
        MessageBox.alert('请选择一种状态进行设置').then(action => {
          if(info.status=='不接单'){
            info.isNot=false;
            this.isNotRepeat=false;
            this.setting="设置为不接单";
          }else if(info.status=='空闲'){
            info.isNotWork=false;
            this.isNotWorkRepeat=false;
            this.setting="设置为空闲";
          }
        });
        return 
      }
    },
    // 上一月
    prevMonth(){
      this.isWorkShow=false;
      this.showNext=true;
      this.month--;
      if(this.month==0){
        this.month=12;
         this.year--;
      }
       for(var i=0;i<this.date.length;i++){
        for(var key in this.date[i]){
            this.date[i][key].isNot=false;
            this.date[i][key].isNotWork=false;
        }
      }
      console.log(this.month)
      if((this.month+1)==(new Date().getMonth()+1)){
        this.showTop=false;
      }
      this.getMsg(this.month);
      // this.readerDate(this.year,this.month)
    },
     // 下一月
     nextMonth(){
       this.showTop=true;
        this.isWorkShow=false;
      this.month++;
      if(this.month==13){
        this.month=1;
        this.year++;
      }
      for(var i=0;i<this.date.length;i++){
        for(var key in this.date[i]){
            this.date[i][key].isNot=false;
            this.date[i][key].isNotWork=false;
        }
      }
       if((this.month-1)==(new Date().getMonth()+1)){
        this.showNext=false;
      }
      this.getMsg(this.month);
      // this.readerDate(this.year,this.month)
     },
     readerDate(years,mons){
        let date = new Date();
     
        let year=years||date.getFullYear();
        this.year=year;
        let mon=mons||date.getMonth()+1;
        this.month=mon;
        // let mon=2;
        let day=date.getDate();
        let week=date.getDay();
        if(year%4==0&&(year%100!=0||year%400==0)){
          if(mon==2){
              this.render(year,2,29)
          }
        }else{
          if(mon==2){
            this.render(year,2,28)
          }
        }
        if(mon==1 || mon==3 || mon==5 || mon==7 || mon==8 || mon==10 || mon==12){
            this.render(year,mon,31)
        }else if(mon==4 || mon==6 || mon==9 || mon==11){
             this.render(year,mon,30)
        }
     },
     render(y,m,msg){
       m-=1;
        this.date=[[],[],[],[],[],[]];
        let oneWek=(new Date(y,m,1).getDay());
     
        if(oneWek!=1){
          for(var s=0;s<oneWek-1;s++){
              this.date[0].push({msg:'',status:''})
          }
        }
                   for(var i=1;i<msg+1;i++){
                      if(this.date[0].length!=7){
                          this.date[0].push({msg:i,status:'空闲',isNot:false,isNotWork:false,isClick:false});
                      }else if(this.date[1].length!=7){
                         this.date[1].push({msg:i,status:'空闲',isNot:false,isNotWork:false,isClick:false});
                      }else if(this.date[2].length!=7){
                         this.date[2].push({msg:i,status:'空闲',isNot:false,isNotWork:false,isClick:false});
                      }else if(this.date[3].length!=7){
                         this.date[3].push({msg:i,status:'空闲',isNot:false,isNotWork:false,isClick:false});
                      }else if(this.date[4].length!=7){
                         this.date[4].push({msg:i,status:'空闲',isNot:false,isNotWork:false,isClick:false});
                      }else if(this.date[5].length!=7){
                         this.date[5].push({msg:i,status:'空闲',isNot:false,isNotWork:false,isClick:false});
                      }
                  }
        for(var key in this.dataList){
            for(var i=0;i<this.date.length;i++){
               let year=key.slice(0,4);
               let mon=key.slice(4,6);
               let day=key.slice(6);
               for(var fn in this.date[i]){
                if(this.date[i][fn].msg
                  &&new Date(year,mon,day).getTime()==new Date(this.year,this.month,this.date[i][fn].msg).getTime()){
                    console.log(this.dataList[key].workStatus)
                  if(this.dataList[key].workStatus==1){
                    this.date[i][fn].status='工作';
                  }else if(this.dataList[key].workStatus==2){
                     this.date[i][fn].status='不接单';
                  }
                  for(var keys in this.dataList[key].workInfo){
                    this.date[i][fn][keys]=this.dataList[key].workInfo[keys];
                  }
                 }
               }
               
            }
        }
     },
     goBack(){
       history.go(-1);
     }
  },
  filters:{
   urlDecode(value) {
      var val='';
      switch (value){
        case 1:
          val="一";
          break;
        case 2:
          val="二";
          break;
        case 3:
          val="三";
          break;
        case 4:
          val="四";
          break;
        case 5:
          val="五";
          break;
        case 6:
          val="六";
          break;
        case 7:
          val="七";
          break;
        case 8:
          val="八";
          break;
        case 9:
          val="九";
          break;
        case 10:
          val="十";
          break;
        case 11:
          val="十一";
          break;
        case 12:
          val="十二";
          break;
      }
        return val
    }
  }
}
</script>

<style lang='scss'>
.cal-det-msg{
   padding-top: 15px;
   padding-bottom: 26px;
   >p{
     text-align: center;
     padding-bottom: 15px;
   }
   .bor{
    margin-bottom: 10px;
   }
}
.cal-bor{
  border-top:10px solid #eaeaea;
}
.cal-msg-min{
  margin-top:15px;
  >p{
    padding-left:15px;
    i{
      display: inline-block;
      width: 14px;
      height:14px;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      border-radius: 50%;
       background: #f66666;
    }
  }
  li{
    padding:0 35px;

    margin-top: 13px;
    label{
      margin-right: 10px;
    }
    span{
      color: #666;
    }
    div{
      color: #666;
    }
  }
}
.redCir{
  /*.font-wei{*/
      display: inline-block;
  width: 12px;
  height:12px;
  background: #f66666;
 -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  box-shadow: 0 0 5px #888888;
  /*}*/

}
.isWorkNext{
  .font-wei{
   background: #fee7e7;
  
   -moz-border-top-right-radius: 30px;
  -webkit-border-top-right-radius:30px;
  border-top-right-radius:30px;
 -moz-border-bottom-right-radius: 30px;
  -webkit-border-bottom-right-radius:30px;
  border-bottom-right-radius:30px;
}
   span{color:#505666;}
}
.isWorkAll{
  .font-wei{
  background: #fee7e7;
  color:#505666;
}
span{color:#505666;}
}
.isWorkTop{
  .font-wei{
  background: #fee7e7;
 
   -moz-border-top-left-radius: 30px;
  -webkit-border-top-left-radius:30px;
  border-top-left-radius:30px;
 -moz-border-bottom-left-radius: 30px;
  -webkit-border-bottom-left-radius:30px;
  border-bottom-left-radius:30px;
    }
   span{color:#505666;}
}
.isWorkfree{
  .font-wei{
  background: #fee7e7;
  -moz-border-radius: 30px;
  -webkit-border-radius:30px;
  border-radius:30px;
    }
   span{color:#505666;}
}
.isNotNext{
  .font-wei{
   background: #f5f5f5;
  
   -moz-border-top-right-radius: 30px;
  -webkit-border-top-right-radius:30px;
  border-top-right-radius:30px;
 -moz-border-bottom-right-radius: 30px;
  -webkit-border-bottom-right-radius:30px;
  border-bottom-right-radius:30px;
}
   span{color:#abbac9;}
}
.isNotAll{
  .font-wei{
  background: #f5f5f5;
  /*color:#abbac9;*/
}
span{color:#abbac9;}
}
.isNotTop{
  .font-wei{
  background: #f5f5f5;
 
   -moz-border-top-left-radius: 30px;
  -webkit-border-top-left-radius:30px;
  border-top-left-radius:30px;
 -moz-border-bottom-left-radius: 30px;
  -webkit-border-bottom-left-radius:30px;
  border-bottom-left-radius:30px;
  }
   span{color:#abbac9;}
}
.isNotfree{
  .font-wei{
  background: #f5f5f5;
  -moz-border-radius: 30px;
  -webkit-border-radius:30px;
  border-radius:30px;
}
   span{color:#abbac9;}
}
.isFrNext{
  .font-wei{
   background: #e8f3db;
   -moz-border-top-right-radius: 30px;
  -webkit-border-top-right-radius:30px;
  border-top-right-radius:30px;
 -moz-border-bottom-right-radius: 30px;
  -webkit-border-bottom-right-radius:30px;
  border-bottom-right-radius:30px;
}
}
.isFrAll{
  .font-wei{
  background: #e8f3db;
}
}
.isFrTop{
  .font-wei{
  background: #e8f3db;
   -moz-border-top-left-radius: 30px;
  -webkit-border-top-left-radius:30px;
  border-top-left-radius:30px;
 -moz-border-bottom-left-radius: 30px;
  -webkit-border-bottom-left-radius:30px;
  border-bottom-left-radius:30px;
}
}
.isfree{
  .font-wei{
  background: #e8f3db;
  -moz-border-radius: 30px;
  -webkit-border-radius:30px;
  border-radius:30px;
}
}
.isSet{
  font-size: 16px;
  color:#666;
  position: absolute;
  right: 15px;
  padding-left: 20px; 
}
.cal-btn{
  background: #fff;
  padding: 10px 15px 23px 15px;
  button{
    width:100%;
    border: 1px solid #878787;
    -moz-border-radius: 4px;
    -webkit-border-radius:4px;
    border-radius:4px;
    font-size: 16px;
    color:#878787;
    background: #fff;
    height:40px;
    line-height: 40px;
  }
}
.bor{
  padding:0 3%;
  margin-bottom: 15px;
  p{
    border-top:1px solid #e8eaef;
  }
}
.font-wei{
        color: #666;
      }
.cal-tab{
  .fl{
    width:14.2%;
    text-align: center;
    color:#b4dab5;
    li{
      height:25px;
      line-height: 25px;
    }
     
      .isChoice.font-wei{
        span{
          display: inline-block;
          width:23px;
          height: 23px;
          line-height: 23px;
          text-align: center;
         -moz-border-radius: 50%;
          -webkit-border-radius:50%;
          border-radius:50%;
          background: #666;
          color:#fff;
        }
       
      }
    margin-bottom:10px;
  }
}
.calen-body{
  background: #fff;
  margin-top:1px;
}
.calen-week{
   /*   display: -moz-box; 
    display: -webkit-box;
    display: -o-box;
    display: box; */
    margin-bottom: 15px;
     margin-top: 20px;
  li{
   /*  box-flex: 1;
     -moz-box-flex: 1;
      -webkit-box-flex: 1;*/
      width:14.2%;
      text-align: center;
      font-size: 16px;
      color:#cccdd1;
  }
}
.time-title{
  font-size:15px;
  font-weight:bold;
  color:#a3b3c3;
  text-align:center;
  padding-top: 10px;
}
.time-top{
  ul{
       box-pack:justify; 
       margin-top: 10px;
       position: relative;
    li{
      &:first-child{
        height:16px;
        width:40px;
        padding-left: 35px;
        background: url('../assets/icon/leftArrow.png') no-repeat 30px;
        background-size: 10px;
      }
       &:nth-child(2){
        color:#505666;
        font-size:16px;
        position: absolute;
        top:-3px;
        left:50%;
         -ms-transform:translateX(-50%);     
                    -moz-transform:translateX(-50%);    
                    -webkit-transform:translateX(-50%); 
                    -o-transform:translateX(-50%);
                     transform:translateX(-50%);
      }
      &:nth-child(3){
        height:17px;
        width:40px;
        padding-right: 35px;
        background: url('../assets/icon/leftArrow.png') no-repeat 30px;
         background-size: 10px;
          -ms-transform: rotate(180deg);
        -moz-transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
        -o-transform: rotate(180deg);
        transform: rotate(180deg);
      }
    }
  }
}
</style>
