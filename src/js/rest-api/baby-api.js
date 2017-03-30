/**
 * Created by jiang on 17/3/7.
 *  本文件定义 用户相关接口
 */
 import Vue from 'vue';
 import VueResource from 'vue-resource';
 Vue.use(VueResource)
export default class BabyApi {
    constructor() {
       this.baseUrl = "http://baby.api.cform.cn";
       this.login=this.baseUrl+'/api/user/login'; 
    
    }
    
}
