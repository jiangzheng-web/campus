<template>
    <div class="bot-nav">
        <ul class="clear">
            <li @click="clickJob" :class="flag=='job-list'?'nav-job-list-native':'nav-job-list'">
                <i ></i>
                <span>职位列表</span>
            </li>
            <li @click="clickUser" :class="flag=='user-center'?'nav-user-center-native':'nav-user-center'">
                <i></i>
                <span>个人中心</span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        name:'botNav',
        props:['flag'],
        data(){
            return {

            }
        },

        methods:{
            clickUser(){
               if(this.flag!='user-center'){
                  this.$emit('jump','');
               }
            },
            clickJob(){
               if(this.flag!='job-list'){
                  // window.location.href="#/job_list";
                  this.$emit('jump','');
               }
            }
        }
    }
</script>
<style lang='scss'>
    .bot-nav{
       background:#fff;
        position:fixed;
        bottom:0;
        width:100%;
        ul{
           display: -moz-box; 
            display: -webkit-box;
            display: -o-box;
            display: box; 
        }
        li{
            box-flex: 1;
            -moz-box-flex: 1;
            -webkit-box-flex: 1;
            height:45px;
            line-height:45px;
            text-align:center;
            &:first-child{
                border-right:1px solid  #e5e5e5;
            }
            i{
                display:inline-block;
                width:22px;
                height:23px;
                position:relative;
                top:6px;
            }
        }
    }
    .nav-job-list{
        i{
            background:url('../../assets/icon/jobList.png') no-repeat;
            background-size:22px;
        }
    }
    .nav-job-list-native{
        color:#666;
       i{
            background:url('../../assets/icon/jobListNative.png') no-repeat;
            background-size:22px;
        }
    }
    .nav-user-center{
        i{
            background:url('../../assets/icon/userCenter.png') no-repeat;
            background-size:22px;
        }
    }
    .nav-user-center-native{
       color:#666;
       i{
            background:url('../../assets/icon/userCenterNative.png') no-repeat;
            background-size:22px;
        }
    }
    
</style>