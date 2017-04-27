<template>
   <div >
     <div >
       <div class="top-navi">
          <!--<a  href="/apps/product.html">-->
            <!--<img src="../../../assets/icon/return.svg">-->
            <!--<span>返回</span>-->
          <!--</a>-->
        </div>
    <!--   <div class="loanNav" v-if="selected == 0||selected == 1 ">
         <ul>
           <li class="loanText isComplete">意向申请</li>
           <li class='enterListHolder'><i class="enterList isCompleteImg"></i></li>
           <li class="loanText">贷款申请</li>
           <li class='enterListHolder'><i class="enterList"></i></li>
           <li class="loanText">选择机构</li>
         </ul>
       </div>
       <mt-tab-container v-model="selected" >
         <mt-tab-container-item id="0" v-if="flag == 0 ">
           <person-intention></person-intention>
         </mt-tab-container-item>
         <mt-tab-container-item id="1" v-if="flag == 0 ">
           <company-intention></company-intention>
         </mt-tab-container-item>
         <mt-tab-container-item id="2">
            <bus-list v-if="selected == 2 "></bus-list>
         </mt-tab-container-item>
         <mt-tab-container-item id="3">
            <user-center></user-center>
         </mt-tab-container-item>
       </mt-tab-container>
     </div>
     <mt-tabbar v-model="selected" style="position: fixed">
       <mt-tab-item id="0" v-if="flag == 0 ">
         <img slot="icon" src="../../../assets/icon/personal-normal.svg" v-if="selected != 0">
         <img slot="icon" src="../../../assets/icon/personal-sel.svg" v-if="selected == 0">
         个人贷款
       </mt-tab-item>
       <mt-tab-item id="1" v-if="flag == 0 ">
         <img slot="icon" src="../../../assets/icon/enterprise.svg" v-if="selected != 1">
         <img slot="icon" src="../../../assets/icon/enterprise-sel.svg" v-if="selected == 1">
         企业贷款
       </mt-tab-item>
       <mt-tab-item id="2">
         <img slot="icon" src="../../../assets/icon/list.svg" v-if="selected != 2">
         <img slot="icon" src="../../../assets/icon/list-sel.svg" v-if="selected == 2">
         申请列表
       </mt-tab-item>
       <mt-tab-item id="3">
         <img slot="icon" src="../../../assets/icon/user-center-norml.svg" v-if="selected != 3">
         <img slot="icon" src="../../../assets/icon/user-center-sel.svg" v-if="selected == 3">
         个人中心
       </mt-tab-item>
     </mt-tabbar>-->
 </div>
   </div>
</template>
<script text="text/babel">
  import Vue from 'vue';
  import { Tabbar, TabItem ,Cell,TabContainer,TabContainerItem ,MessageBox} from 'mint-ui';
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  Vue.component(TabContainer.name, TabContainer);
  Vue.component(TabContainerItem.name, TabContainerItem);
  export default {
    data() {
      return {
        selected: '0',
        flag:0
      }
    },
  created()
  {

  },
  methods:{
  
  }
  }
</script>
<style>
  .page-tabbar {
    overflow: hidden;
  }
  .page-tabbar-container {
    overflow: auto;
  }
  .page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }

</style>
