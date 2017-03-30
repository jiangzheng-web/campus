/**
 * Created by eleven on 16/11/18.
 */

import Vue from 'vue'
 Vue.filter( 'urlDecode' , function(value) {
      var val='';
      console.log(value)
      console.log(12312)
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
  });
// register
Vue.filter('number', function (value,val2) {
  var val=val2==0?0:(val2 || 2);
  // return processed value
  if (!isNaN(parseFloat(value)) && isFinite(value)) {
    // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
    // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
    // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
    // 的值变成了 12312312.123456713
    let num = Number(value);
    // 处理小数点位数
    num = num.toFixed(val) ;
    // 分离数字的小数部分和整数部分
    let parts = num.split('.');
    // 整数部分加[separator]分隔, 借用一个著名的正则表达式
    parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' +  ',');

    return parts.join('.');
  }
  return '';
});
// register
Vue.filter('whether', function (value) {
  // return processed value
  if (value === 'Y') {
    return '是'
  }
  else if( value === 'N'){
    return '否';
  }
  return '-';
});
Vue.filter('length', function (value,num) {
  // return processed value
  var str=value.toString();
  if(num){
    return str.substring(0,num);
  }
  if (str.length>18) {
    return str.substring(0,18)+'…';
  }else{
    return str;
  }
});
Vue.filter('data', function (value,num) {
  // return processed value
  var str=value.toString();
  if(num){
    return str.substring(0,num);
  }
  return str;
});


Vue.filter('date', function (value) {
  if(!value)
    return '-';
  return value.substr(0,10);
});

Vue.filter('fileSize',  function (size) {
    if(size/1024/1024/1024>1){
      return parseInt(size*100/(1024*1024*1024))/100+'G';
    }else if(size/1024/1024>1){
      return parseInt(size*100/(1024*1024))/100+'M';
    }else if(size/1024>1){
      return parseInt(size*100/1024)/100+'K';
    }else{
      return size+'B';
    }
  }
);

Vue.filter('urlDecode',  function (url) {
    if(url){
      return window.decodeURIComponent( url);
    }
    return "-";
  }

);

Vue.filter("datetime",function(timeall){
    if(timeall){


      return timeall.split(" ")[0].split("-").join(".");

    }
});

Vue.filter("clocktime",function(timeall){
   if(timeall){

       return timeall.split(" ")[1].split("-").join(".").substring(0,5);
   }

});

Vue.filter("addUint",function(value,unit){
  if(parseFloat(value)){
    return value+unit;
  }else{
    return '-';
  }
});

Vue.filter("ifNull",function(value){
  if(value){
    return value;
  }else{
    return '-';
  }
});
Vue.filter("prevServiceUint",function (value,unit) {
  if(parseFloat(value)){
    return value+unit;
  }else{
    return '';
  }
})


