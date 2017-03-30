<template>
  <div class="loanCity temp" @touchmove="touchmove($event)">
      <div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            选择城市
        </div>
      <div class="loanCityBody isChina" v-show="isChina">
        <mt-index-list  ref='meIndex'>
          <div class="title location-tit">
	          <p>定位城市</p>
	          <ul>
	            <li class="cityLocation" @click='cityChoice(locationCity)'>
	              <span >{{locationCity.areaName}}</span></li>
	            <li class="locationNone"></li>
	            <li class="locationNone"></li>
	          </ul>
	        </div>
         <div class="title hot-city">
          <p>热门城市</p>
          <ul>
            <li v-for="city in isHotCity.first" @click="cityChoice(city)">{{city.areaName}}</li>
       <!--      <li @click="cityChoice('北京')">北京</li>
            <li @click="cityChoice('上海')">上海</li>
            <li @click="cityChoice('广州')">广州</li> -->
          </ul>
          <ul>
            <!-- 如果li里的值写成变量，页面样式里的弹性盒子会有问题，总会有一个元素多十几像素-->
            <li v-for="city in isHotCity.second" @click="cityChoice(city)">{{city.areaName}}</li>
            <!-- <li @click="cityChoice('深圳')">深圳</li>
            <li @click="cityChoice('杭州')">杭州</li>
            <li @click="cityChoice('重庆')">重庆</li> -->
          </ul>
        </div>
          <mt-index-section v-for="(item,index) in cityList" :key="item" :index="index">
            <mt-cell v-for="city in item" ref="mint" :key="item.areaNo" :title="isMtCityCdDscp(city)" @click.native="cityChoice(city)"></mt-cell>
          </mt-index-section>
        </mt-index-list>
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import ApiUtil from '../../js/utils/api-util.js';
import Util from '../../js/utils/util.js';
  import { IndexList, IndexSection,Toast,Indicator,Cell } from 'mint-ui';
  Vue.component(IndexList.name, IndexList);
  Vue.component(IndexSection.name, IndexSection);
  Vue.component(Cell.name,Cell);
  // import DicApi from '../js/rest-api/dictionary-api';
  // import ApiUtil from '../js/utils/api-util';
  // let dicApi=new DicApi();
  let mouse={};
  export default {
    name:'loan-city',
    data(){
    return {
      isChina:true,
      cityList:{
        A:[],
        B:[],
        C:[],
        D:[],
        E:[],
        F:[],
        G:[],
        H:[],
        I:[],
        J:[],
        K:[],
        L:[],
        M:[],
        N:[],
        O:[],
        P:[],
        Q:[],
        R:[],
        S:[],
        T:[],
        U:[],
        V:[],
        W:[],
        X:[],
        Y:[],
        Z:[]
      },
      isMask:false,
      searchCity:'',
      loadingLoca:0,
      showSearch:false,
      searchResult:false,
      positionCity:'',
      searchList:[],
      detailListHeight:'',
      isShow:false,
      locationCity:{},
      add:{},
      isHotCity:{
        first:[
          {areaNo: 100000, areaName: "北京市", parentID: "430816", pinyin: "beijing", initial: "B"},
          {areaNo: 110000, areaName: "上海市", parentID: "430814", pinyin: "shanghahi", initial: "S"},
          {areaNo: 162100, areaName: "广州市", pinyin: "guangzhou", parentID: 160000, initial: "G"}
        ],
        second:[
          {areaNo: 161900, areaName: "深圳市", pinyin: "shenzhen", parentID: 160000, initial: "S"},
          {areaNo: 351100, areaName: "杭州市", pinyin: "hangzhou", parentID: 350000, initial: "H"},
          {areaNo: 130000, areaName: "重庆市", parentID: "430818", pinyin: "chongqing", initial: "C"}
        ]
      }
    }
  },
  watch:{
    searchCity:{
      handler (newVal,old) {
        if(newVal!=old){
          this.searchResult=!1;
        }
      },deep:true
    }
  },
  created(){
    let data={
        app_id:'orcR2wvWPUKJblhHZ7Re_wNLrFs0',
                header_img:'http://api.gdbbe.cn/swagger-ui/#!/263812115326041/createUser_0_1_2_3_4_5_6_7_8',
    };
      data.location=JSON.parse(localStorage.getItem('location'));
      let me=this;
                   Indicator.open({
                              text: '请稍候...',
                              spinnerType: 'fading-circle'
                            });
            ApiUtil.getHttp('http://api.gdbbe.cn/api/common/citylist',data)
                .then(
                    (suc)=>{
                      Indicator.close();
                        if(suc.status==0){
                          let allCity=suc.data.allCity;
                          for(var i=0;i<allCity.length;i++){
                            if(allCity[i].initial){
                              this.cityList[allCity[i].initial].push(allCity[i])
                            }
                          }
                          me.locationCity=suc.data.locationCity;
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
  },
  mounted(){

  },
  updated(){
    if(this.$refs&&this.$refs.mint&&this.$refs.mint.style){
      console.log(this.$refs.mint.style)
        this.$refs.mint.style.height="100vh";
    }
  
  }, 
  methods:{
    goBack(){
       history.go(-1);
    },
    touchmove(e){
        e.stopPropagation();
    },

//      请求数据方法
    cityPorts(ctry){
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      let me=this;
      // ApiUtil.dealResponse(dicApi.getCityLetter(this.$http,ctry),
      //   function(data){
      //     if(data){
      //       me.cityList=data[0].ctry;
      //       Indicator.close();
      //     }else{
      //       Indicator.close();
      //       me.isMask=true;
      //       Toast({
      //         message: '服务器错误',
      //         position: 'middle',
      //         duration: 2000
      //       })
      //     }
      //   },function(){
      //     Indicator.close();
      //     me.isMask=true;
      //     Toast({
      //       message: '服务器错误',
      //       position: 'middle',
      //       duration: 2000
      //     })
      //   })
    },
//      页面数据表达式方法
    isMtCityCdDscp(city){
      if(city.mtCityCdDscp=='市辖区'||city.mtCityCdDscp=='县'||city.mtCityCdDscp=='省直辖县级行政区划'||city.mtCityCdDscp=='自治区直辖县级行政区划'){
        return city.mtCityCdDscp+='('+city.mtStateCdDscp+')'
      }
      return  city.areaName
    },
//      选择城市
    cityChoice(city){
      this.urlParams = Util.getUrlParams();
      this.searchResult=false;
      this.searchCity='';
      sessionStorage.setItem('city',JSON.stringify(city));
      if(this.urlParams.http){
       window.location.href=this.urlParams.http+"#/job_list";
      }else{
        window.location.href="#/job_list";
      }
    },
    searchVal(){
      this.searchList=[];
      this.searchResult=!0;
      if(this.searchCity){
        let r=this.cityList;
        for(let key in r){
          this.searchCity==key&&(this.searchList=r[key]);
          for(let i=0;i< r[key].length;i++){
            if(r[key][i].mtCityCdDscp.indexOf(this.searchCity)>=0){
              this.searchList.push(r[key][i]);
              if(this.searchList.length>10){
              }
            }
          }
        }
      }
    }
  }
  }

</script>
<style lang='scss'>

.loanCity .top-nav{
  margin-bottom: 1PX;
}
.loanCity .hot-city.title{
	background: #fff;
	padding-top:15px;
	padding-bottom:15px;
	margin-bottom: 10px;
}
.loanCity .location-tit.title {
  padding-top: 15PX;
	background: #fff;
	padding-bottom: 10px;
	margin-bottom: 10px;
}
  .loanCity{
  width:100%;
  height:100vh;
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
  .btn-return{
    padding:0 70px;
  }
  .cityTitle{
    width:100%;
    height:67px;
    line-height: 67px;
    display:-moz-box;
    display:-webkit-box;
    display:box;
    li{
      box-flex: 1;
      -moz-box-flex: 1;
      -webkit-box-flex: 1;
      text-align: center;
      padding:0 43px;
      span{
        display: block;
        text-align: center;
        &.isChoice{
          color:#0084ff;
          border-bottom: 2px solid #0084ff;
        }
      }
      &:first-child{
        border-right:1px solid #f6f8fc;
      }
    }
  }

  .title{
    padding:0 30px 0 15px;
    p{
      color:#999;
    }
    ul{
      width:100%;
      display:-moz-box;
      display:-webkit-box;
      display:box;
      margin:10px 0;
      li{
        box-flex: 1;
        -moz-box-flex: 1;
        -webkit-box-flex: 1;
        text-align: center;
        height:40px;
        line-height: 40px;
        border:1px solid #d9d9d9;
        -moz-border-radius:40px;
                -webkit-border-radius:40px;
                border-radius:40px;
        background: #fff;
        &:nth-child(2){
          margin:0 12px;
        }
        &.locationNone{
          visibility: hidden;
        }
        &.cityLocation{
          img{
            height:18px;
            width:18px;
            position:relative;
            top:-3px;
          }
          span{
            margin-left:5px;
          }
        }
      }
    }
  }
  .mint-indexlist{
    overflow: scroll;
  }

  .mint-indexlist-nav{
    background:transparent;
    border:none;

  }
  .mint-indexlist-indicator{
    top:28%;
  }
  //.other{
  //  .mint-indexlist-nav{
  //    .mint-indexlist-navlist{
  //      position: absolute;
  //      top: 0;
  //      right:0;
  //    }
  //  }
  //}
}
.mint-indexlist-content{
  overflow: scroll;
}
.mint-popup.checkBox2{
    width:100%;
    overflow-y: scroll;
    height:100%;
}

.loanCity.temp {
  .isChina{
    .mint-indexlist-navlist{
      position: fixed;
      top: 120px;
      right:0;
      z-index:2500;
      display: -webkit-box;
      .mint-indexlist-navitem{
        font-size: 13px;
        padding:1px 12px;
        padding-left:25px;
      }
      &:after{
        content:' ';
        display: block;
        clear: both;
      }
    }
    &:after{
      content:' ';
      display: block;
      clear: both;
    }
  }


}
.loanCity{
  .mint-indexlist-navlist{
    position: fixed;
    top: 180px;
    right:0;
    z-index:2500;
    display: -webkit-box;
     .mint-indexlist-navitem{
        font-size: 13px;
        padding:1px 12px;
          padding-left:25px;
      }
  }
}
.listMask.mask{
  background:#f9f9f9;
  z-index: 2501;
  height:120%;
}
.searchDropBox{
  .btn{
    position:relative;
    z-index: 2502;
  }
  .searchVal{
    z-index: 2503;
  }
}
.mint-popup.mint-popup-right{
  top:0;
  transform:none;
}
</style>
