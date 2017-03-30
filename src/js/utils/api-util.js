/**
 * Created by eleven on 16/10/12.
 */

/**
 *  restapi 工具类
 * */
import { Toast,Field,Popup,Picker,MessageBox,Indicator } from 'mint-ui';
 import Vue from 'vue';
 import VueResource from 'vue-resource';
 Vue.use(VueResource);
   Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
 var vue = new Vue();
export default class ApiUtil{
  constructor(){
    throw new error('Cannot initialize this class.');
  };
  static getHttp = function(url,data){
            if(window.localStorage.getItem('msg')){
              let msg=JSON.parse(localStorage.getItem('msg'));
              for(var keys in msg){
                data[keys]=msg[keys];
              }
            }

            let params = "";
            for(var key in data){
                  if( data[key] != undefined){
                    params += key + "=" + data[key] + "&";
                  }
            }
            if(params.length > 0){
                params = params.substr(0,params.length - 1);
                url +="?" +params;
                data = {};
            }
           return new Promise(
               (resolve,reject)=>{
                vue.$http.get(url)
                .then(
                    (suc)=>{
                        resolve(suc.body)
                    },(err)=>{
                        Toast({
                                  message: err,
                                  position: 'middle',
                                  duration: 10000
                                })
                        reject(err);
                    }
                )
           })
        }

}
