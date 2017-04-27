<template>
  <div id="app">
    	<transition name="router-fade" mode="out-in">
    		<router-view></router-view>
    	</transition>
  </div>
</template>

<script>
 import Vue from 'vue';

  import VueResource from 'vue-resource';
 Vue.use(VueResource);
   import { IndexList, IndexSection,Toast,Indicator,Cell } from 'mint-ui';
  Vue.component(IndexList.name, IndexList);
  Vue.component(IndexSection.name, IndexSection);
  Vue.component(Cell.name,Cell);
  var vue = new Vue();
  // vue.$http.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf7d4bbe761bb5e24&secret=e357fe3dfcfafb14b442e30760426c53')
  //               .then(
  //                   (suc)=>{
  //                     alert(suc.access_token)
  //                     alert(JSON.stringify(suc));
  //                   },(err)=>{
  //                     alert(JSON.stringify(err));
  //                     alert(err.access_token)
  //                       Toast({
  //                                 message: err,
  //                                 position: 'middle',
  //                                 duration: 10000
  //                               })
  //                   }
  //               )
                
                
 // var vue=new Vue();
 	// var useragent = navigator.userAgent;
  //   if (useragent.match(/MicroMessenger/i) != 'MicroMessenger') {
  //       // 这里警告框会阻塞当前页面继续加载
  //       alert('已禁止本次访问：您必须使用微信内置浏览器访问本页面！');
  //       // 以下代码是用javascript强行关闭当前页面
  //       var opened = window.open('about:blank', '_self');
  //       opened.opener = null;
  //       opened.close();
    // }
    //  if(navigator.geolocation)
    // {
    //     navigator.geolocation.getCurrentPosition(function (p) {
    //         var latitude = p.coords.latitude//纬度
    //         var longitude = p.coords.longitude;
    //         createmap(latitude, longitude);
    //       localStorage.setItem('location',JSON.stringify([longitude,latitude]));
    //       alert(localStorage.location)
    //     }, function (e) {//错误信息
    //         var aa = e.code + "\n" + e.message;
    //         Toast({
    //             message: aa,
    //              position: 'middle',
    //            duration: 2000
    //         })
    //     }
    //     );
    // }else{
    // 	Toast({
    //             message: '此浏览器暂不支持定位',
    //              position: 'middle',
    //            duration: 2000
    //         })
    // }
   

   		// window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4478ab3401d15b4d&redirect_uri=${encodeURIComponent('http://employ.gdbbe.cn/service')}&response_type=code&scope=snsapi_userinfo&state=state#wechat_redirect`;
    
    
		// wx.config({
		//     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		//     appId: 'wx4478ab3401d15b4d', // 必填，公众号的唯一标识
		//     timestamp:new Date().getTime() , // 必填，生成签名的时间戳
		//     nonceStr:Math.random() * (99999999999999999999999999 - 100000000000000000000000) + 100000000000000000000000, // 必填，生成签名的随机串
		//     signature: 'qRuhupsud4cTTF7WquS7HuHzjRIn3sUTOq1seuf3BCvgfJOnu6bZ9JTdZJAeZjiPVQdhmOtJnZ89TmMgj9_IzsWyyvio0lgOtt3LN63pkiNpf-sHEle6ABSHsDdoJH47CYDaACAOKP',// 必填，签名，见附录1
		//     jsApiList: ['getLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		// });0
		// wx.getLocation({
		//     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
		//     success: function (res) {
		//         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
		//         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
		//         var speed = res.speed; // 速度，以米/每秒计
		//         var accuracy = res.accuracy; // 位置精度
		//     }
		// });
		// console.log(vue)
		// vue.$http.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx4478ab3401d15b4d&secret=e31f2a3ad2d9f94098dd6cd0a5bdf2b2').then(
		// 		(suc)=>{
		// 			alert(suc)
		// 		},(err)=>{

		// 		}
		// 	)

export default {
		
  name: 'app'
}
</script>

<style lang="scss">
  @import './style/common';
	@import './style/main';
	.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .1s;
	}
	.router-fade-enter, .router-fade-leave-active {
	  	opacity: 0;
	}
</style>
