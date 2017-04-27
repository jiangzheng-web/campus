/**
 * Created by eleven on 16/10/13.
 */
export default class Util{

  constructor(){
    throw new error('Cannot initialize this class.');
  };


  static Regular = {
    PHONE:/^1[3|4|5|7|8]\d{9}$/, //手机号
    RATE:/^([0-9]|([1-9]\d)|(99))(\.\d{1,2})?$/, //利率
    AMOUNT:/^([0-9]|([1-9]\d{0,11}))(\.\d{1,2})?$/,// 可以等于0,0-999,999,999,999
    AMOUNT_NONZERO:/^([1-9]\d{0,11})(\.\d{1,2})?$/ // 不能等于0,1-999,999,999,999
  };


  /**
   * 获取所有参数
   * @retrun {paramsName:paramValue}
   * */
  static  getUrlParams = function( urlStr ){

    var url = urlStr || location.href; //获取url中"?"符后的字串
    var params = {};
    if (url.indexOf("?") != -1) {

      var str  = url.substr(url.indexOf("?") + 1);
      params['http'] = url.substring(0,url.indexOf("?"));
      var strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
        params[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
      }
    }
    return params;

  };
  /**
   * 过滤继承
   * @retrun {paramsName:paramValue}
   * */
  static  extendUrlParams = function( obj ,obj2){
    var  son={};
    for(var i in obj){
      obj[i]=='undefined'?son[i]='':son[i]=obj[i];
      if(i=='type'&&son[i]==''){
        son[i]='CS';
      }
    }
    for(var i in obj2){
      if(!son[i]){
        obj2[i]=='undefined'?son[i]='':son[i]=obj2[i];
      }
    }
    return son;
  };

  /**
   * 根据指定参数名称获取参数值
   * @name    参数名称
   * @return  参数值
   * */
  //

  static getUrlParamsValue = function(name ,url){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r;
    if( url == undefined)
      r = window.location.href.substr(1).match(reg);  //匹配目标参数
    else
      r = url.substr(1).match(reg);
    if (r != null)
      return decodeURI(r[2]);

    return null; //返回参数值
  };

  /*
   * 转MD5码
   * @anthor     eleven
   * **/
  static ToMD5 = function ( str ) {
    "use strict";

    var hex_chr = "0123456789abcdef";
    function rhex(num)
    {
      str = "";
      for( let j = 0; j <= 3; j++)
        str += hex_chr.charAt((num >> (j * 8 + 4)) & 0x0F) +
          hex_chr.charAt((num >> (j * 8)) & 0x0F);
      return str;
    }
    function str2blks_MD5(str)
    {
      let nblk = ((str.length + 8) >> 6) + 1;
      let blks = new Array(nblk * 16);
      for( var i = 0; i < nblk * 16; i++)
        blks[i] = 0;
      for( var i = 0; i < str.length; i++)
        blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
      blks[i >> 2] |= 0x80 << ((i % 4) * 8);
      blks[nblk * 16 - 2] = str.length * 8;
      return blks;
    }
    function add(x, y)
    {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }
    function rol(num, cnt)
    {
      return (num << cnt) | (num >>> (32 - cnt));
    }
    function cmn(q, a, b, x, s, t)
    {
      return add(rol(add(add(a, q), add(x, t)), s), b);
    }
    function ff(a, b, c, d, x, s, t)
    {
      return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    function gg(a, b, c, d, x, s, t)
    {
      return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    function hh(a, b, c, d, x, s, t)
    {
      return cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function ii(a, b, c, d, x, s, t)
    {
      return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    let x = str2blks_MD5(str);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    for(let i = 0; i < x.length; i += 16)
    {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;
      a = ff(a, b, c, d, x[i+ 0], 7 , -680876936);
      d = ff(d, a, b, c, x[i+ 1], 12, -389564586);
      c = ff(c, d, a, b, x[i+ 2], 17, 606105819);
      b = ff(b, c, d, a, x[i+ 3], 22, -1044525330);
      a = ff(a, b, c, d, x[i+ 4], 7 , -176418897);
      d = ff(d, a, b, c, x[i+ 5], 12, 1200080426);
      c = ff(c, d, a, b, x[i+ 6], 17, -1473231341);
      b = ff(b, c, d, a, x[i+ 7], 22, -45705983);
      a = ff(a, b, c, d, x[i+ 8], 7 , 1770035416);
      d = ff(d, a, b, c, x[i+ 9], 12, -1958414417);
      c = ff(c, d, a, b, x[i+10], 17, -42063);
      b = ff(b, c, d, a, x[i+11], 22, -1990404162);
      a = ff(a, b, c, d, x[i+12], 7 , 1804603682);
      d = ff(d, a, b, c, x[i+13], 12, -40341101);
      c = ff(c, d, a, b, x[i+14], 17, -1502002290);
      b = ff(b, c, d, a, x[i+15], 22, 1236535329);
      a = gg(a, b, c, d, x[i+ 1], 5 , -165796510);
      d = gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
      c = gg(c, d, a, b, x[i+11], 14, 643717713);
      b = gg(b, c, d, a, x[i+ 0], 20, -373897302);
      a = gg(a, b, c, d, x[i+ 5], 5 , -701558691);
      d = gg(d, a, b, c, x[i+10], 9 , 38016083);
      c = gg(c, d, a, b, x[i+15], 14, -660478335);
      b = gg(b, c, d, a, x[i+ 4], 20, -405537848);
      a = gg(a, b, c, d, x[i+ 9], 5 , 568446438);
      d = gg(d, a, b, c, x[i+14], 9 , -1019803690);
      c = gg(c, d, a, b, x[i+ 3], 14, -187363961);
      b = gg(b, c, d, a, x[i+ 8], 20, 1163531501);
      a = gg(a, b, c, d, x[i+13], 5 , -1444681467);
      d = gg(d, a, b, c, x[i+ 2], 9 , -51403784);
      c = gg(c, d, a, b, x[i+ 7], 14, 1735328473);
      b = gg(b, c, d, a, x[i+12], 20, -1926607734);
      a = hh(a, b, c, d, x[i+ 5], 4 , -378558);
      d = hh(d, a, b, c, x[i+ 8], 11, -2022574463);
      c = hh(c, d, a, b, x[i+11], 16, 1839030562);
      b = hh(b, c, d, a, x[i+14], 23, -35309556);
      a = hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
      d = hh(d, a, b, c, x[i+ 4], 11, 1272893353);
      c = hh(c, d, a, b, x[i+ 7], 16, -155497632);
      b = hh(b, c, d, a, x[i+10], 23, -1094730640);
      a = hh(a, b, c, d, x[i+13], 4 , 681279174);
      d = hh(d, a, b, c, x[i+ 0], 11, -358537222);
      c = hh(c, d, a, b, x[i+ 3], 16, -722521979);
      b = hh(b, c, d, a, x[i+ 6], 23, 76029189);
      a = hh(a, b, c, d, x[i+ 9], 4 , -640364487);
      d = hh(d, a, b, c, x[i+12], 11, -421815835);
      c = hh(c, d, a, b, x[i+15], 16, 530742520);
      b = hh(b, c, d, a, x[i+ 2], 23, -995338651);
      a = ii(a, b, c, d, x[i+ 0], 6 , -198630844);
      d = ii(d, a, b, c, x[i+ 7], 10, 1126891415);
      c = ii(c, d, a, b, x[i+14], 15, -1416354905);
      b = ii(b, c, d, a, x[i+ 5], 21, -57434055);
      a = ii(a, b, c, d, x[i+12], 6 , 1700485571);
      d = ii(d, a, b, c, x[i+ 3], 10, -1894986606);
      c = ii(c, d, a, b, x[i+10], 15, -1051523);
      b = ii(b, c, d, a, x[i+ 1], 21, -2054922799);
      a = ii(a, b, c, d, x[i+ 8], 6 , 1873313359);
      d = ii(d, a, b, c, x[i+15], 10, -30611744);
      c = ii(c, d, a, b, x[i+ 6], 15, -1560198380);
      b = ii(b, c, d, a, x[i+13], 21, 1309151649);
      a = ii(a, b, c, d, x[i+ 4], 6 , -145523070);
      d = ii(d, a, b, c, x[i+11], 10, -1120210379);
      c = ii(c, d, a, b, x[i+ 2], 15, 718787259);
      b = ii(b, c, d, a, x[i+ 9], 21, -343485551);
      a = add(a, olda); 
      b = add(b, oldb);
      c = add(c, oldc);
      d = add(d, oldd);
    }
    return rhex(a) + rhex(b) + rhex(c) + rhex(d);
  }

  static guid( length ){
    length = length || 16;
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < length; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

    var uuid = s.join("");
    return uuid;
  }

  // 判断出生日期是否正确（但是加上了不能超过今年的判断）
  static dateTest (year,mon,day){
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





}

