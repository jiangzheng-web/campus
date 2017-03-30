/**
 * Created by eleven on 16/11/17.
 */

import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import apiUtil from './js/utils/api-util.js';
import filters from './js/filters.js';
import 'mint-ui/lib/style.css';


Vue.use(VueResource);
Vue.use(VueRouter);

const routes=[
  {path:'/login',component:r => require.ensure([],() => r(require('./apps/login/login.vue'))), title:'登录'},//主页面
  {path:'/',component:r => require.ensure([],() => r(require('./apps/views/jobList.vue'))), title:'职位列表'},//主页面
  {path:'/register',component:r => require.ensure([],() => r(require('./apps/login/register.vue'))), title:'注册'},//主页面
  {path:'/pwd',component:r => require.ensure([],() => r(require('./apps/login/pwd.vue'))), title:'密码找回'},//主页面
  {path:'/phone',component:r => require.ensure([],() => r(require('./apps/login/phone.vue'))), title:'密码找回'},//主页面
   {path:'/feedback',component:r => require.ensure([],() => r(require('./apps/views/feedback.vue'))), title:'密码找回'},//主页面
    {path:'/agreement',component:r => require.ensure([],() => r(require('./apps/views/agreement.vue'))), title:'密码找回'},//主页面
  {
      path:'/edit_resume',
      component:r => require.ensure([],() => r(require('./apps/editResume.vue'))),
      title:'编辑简历'
  },
   {
      path:'/survey',
      component:r => require.ensure([],() => r(require('./apps/views/survey/survey.vue'))),
      title:'问卷调查'
  },
    {
      path:'/survey2',
      component:r => require.ensure([],() => r(require('./apps/views/survey/survey2.vue'))),
      title:'问卷调查'
  },
    {
      path:'/survey3',
      component:r => require.ensure([],() => r(require('./apps/views/survey/survey3.vue'))),
      title:'问卷调查'
  },
   {
      path:'/user_calendar',
      component:r => require.ensure([],() => r(require('./components/userCalendar.vue'))),
      title:'日程表'
  },
    {
      path:'/job_list',
      component:r => require.ensure([],() => r(require('./apps/views/jobList.vue'))),
      title:'职业列表'
  },
    {
      path:'/user_center',
      component:r => require.ensure([],() => r(require('./apps/views/userCenter.vue'))),
      title:'个人中心'
  },
    {
      path:'/carry_on',
      component:r => require.ensure([],() => r(require('./apps/views/carryOn.vue'))),
      title:'任务进行中'
  },
    {
      path:'/detail_resume',
      component:r => require.ensure([],() => r(require('./apps/views/detailedResume.vue'))),
      title:'简历详情'
  },
    {
      path:'/particular_job',
      component:r => require.ensure([],() => r(require('./apps/views/particularJob.vue'))),
      title:'职位详情'
  },
    {
      path:'/account',
      component:r => require.ensure([],() => r(require('./apps/views/account.vue'))),
      title:'账户信息'
  },
    {
      path:'/city_choice',
      component:r => require.ensure([],() => r(require('./apps/views/cityChoice.vue'))),
      title:'选择城市'
  },
    {
      path:'/new_task',
      component:r => require.ensure([],() => r(require('./apps/views/newTask.vue'))),
      title:'新发布的工作任务'
  },
    {
      path:'/pend_evaluate',
      component:r => require.ensure([],() => r(require('./apps/views/pendEvaluate.vue'))),
      title:'待评价'
  },{
      path:'/edit_evaluate',
      component:r => require.ensure([],() => r(require('./apps/views/editEvaluate.vue'))),
      title:'待评价'
  },
    {
      path:'/pend_settlement',
      component:r => require.ensure([],() => r(require('./apps/views/pendSettlement.vue'))),
      title:'待结算'
  },
    {
      path:'/completed',
      component:r => require.ensure([],() => r(require('./apps/views/completed.vue'))),
      title:'已完成'
  },
    {
      path:'/job_detail',
      component:r => require.ensure([],() => r(require('./apps/views/jobDetail.vue'))),
      title:'签到详情'
  },
    {
      path:'/change_work',
      component:r => require.ensure([],() => r(require('./apps/views/changeWork.vue'))),
      title:'申请改派'
  },
    {
      path:'/sign_work',
      component:r => require.ensure([],() => r(require('./apps/views/signWork.vue'))),
      title:'申请改派'
  },
    {
      path:'/test',
      component:r => require.ensure([],() => r(require('./apps/views/test.vue'))),
      title:'测试页面'
  }
]

const router=new VueRouter(
  {
    routes:routes
  }
);

new Vue({
    router:router,
  render: h => h(App)
}).$mount('#app');

