<template>
	<div>
		<div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            上班签到
        </div>
        <div class="change-body">
        	<form name="fileinfo" id='fileinfo'>
        	<div>
        		<p>请上传一张与产品货架合影并佩戴工牌的照片:</p>
        		<div>
        		 	<input type="file" ref="multiple" class="img-upload" name="file"  @change="onFileChange($event)"/>
                    <input type="hidden" name="filePath" value="123456"/>
        			<img :src="images[0]" v-show="images[0]">
        			<span class="delete" v-show="images.length"  @click="deleImg(images[0])"></span>
        			<i></i>
        		</div>
        	</div>
        	</form>
        </div>
        <div class="btnFa">
        	<button @click="submits" type="button" :disabled="btnDis">提交</button>
        </div>
	</div>
</template>
<script >
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
 import Vue from 'vue';
 import ApiUtil from '../../js/utils/api-util.js';
 import { Toast,Field,Popup,Picker,Indicator,DatetimePicker,MessageBox } from 'mint-ui';
 import Util from '../../js/utils/util.js';
  import inputTest from '../../components/inputTest';
  Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
  Vue.component(DatetimePicker.name, DatetimePicker);
	export default{
		data(){
			return{	
				images:[],
				files:'',
				showFile:true,
				cacheImg:'',
				btnDis:false
			}
		},
		created(){
			this.urlParams = Util.getUrlParams();
		},
		methods:{
			deleImg(num){
				 MessageBox({
                          title: '提示',
                          message:'确定放弃此照片吗？',
                          confirmButtonText:'确定' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                            this.images.remove(num);
                            this.showUpImg=true;
                            this.files='';
                            let data=document.getElementById("fileinfo");
                            data.reset();
                            if( this.cacheImg!=num){
                            	this.showFile=!this.showFile;
                            }
                            this.cacheImg=num;
                          }else{
                           // console.log('取消')
                          }
                        })
			},
			submits(){
				Indicator.open({
                    text: '正在上传，请稍候...',
                    spinnerType: 'fading-circle'
                });
				if(!this.images.length){
	               MessageBox.alert('请先选择学生证照片').then(
	               	()=>{
	               		Indicator.close();
	               	},()=>{

	               	}
	               	)
	                  return 
	            }
                this.btnDis=true;
				let data=new FormData(document.getElementById("fileinfo"));
				let me=this;
				let msg={};
				if(window.localStorage.getItem('msg')){
	              msg=JSON.parse(window.localStorage.getItem('msg'));
	            }
	             this.$http.post(
              `http://baby.api.cform.cn/api/common/upload?app_id=${msg.app_id}&header_img=${msg.header_img}&type=2`,data)
                .then(
                    (suc)=>{
                        if(suc.body.status==0){
                            // me.check=suc.data;
                            // sessionStorage.setItem('check',suc.data);
                            let data={};
                            data.taskID=this.urlParams.taskID;
                            data.sign_img=encodeURIComponent(suc.body.data.fileUrl);
                            data.location=localStorage.getItem('location');
                            ApiUtil.getHttp('http://baby.api.cform.cn/api/service/user/sign',data)
                            .then(
                                (suc)=>{
                                    if(suc.status==0){
                                       Indicator.close();
                                        Toast({
		                                  message: '签到成功',
		                                  position: 'middle',
		                                  duration: 2000
		                              })
                                        history.go(-1);
                                    }else{
                                          Toast({
                                              message: suc.errmsg,
                                              position: 'middle',
                                              duration: 2000
                                            })
                                          Indicator.close();
                                          me.btnDis=false;
                                    }
                                },(err)=>{
                                    Indicator.close();
                                     me.btnDis=false;
                                }
                            )
                        }else{
                          Indicator.close();
                              Toast({
                                  message: suc.body.errmsg,
                                  position: 'middle',
                                  duration: 2000
                                })
                               me.btnDis=false;
                        }
                    },(err)=>{
                      Indicator.close();
                       me.btnDis=false;
                      // Toast({
                      //             message: '服务器异常',
                      //             position: 'middle',
                      //             duration: 2000
                      //           })
                    }
                )
			},
			onFileChange (e) {
				
	          	var files = e.target.files || e.dataTransfer.files;
	          	var type = '|' + files[0].type.slice(files[0].type.lastIndexOf('/') + 1) + '|';
	          	// if('|jpg|png|jpeg|bmp|gif|'.indexOf(type) === -1){
	          	//     MessageBox.alert('请上传正常格式的图片').then(action => {
	          	//   });
	          	//     return
	          	// }
	          	if (!files.length) return
	          	this.createImage(files)
	          
	        },
	        createImage (file) {
	          var vm = this
	          var reader = null
	          var leng = file.length
	          for (var i = 0; i < leng; i++) {
	            reader = new window.FileReader()
	            reader.readAsDataURL(file[i])
	            reader.onload = function (e) {
	              vm.images.push(e.target.result)
	            }
	          }
	          // this.dubFile=file[0].name;
	        },
			goBack(){
				 history.go(-1);
			}
		}
	}
</script>
<style lang='scss'>

	.change-body{
		padding: 10px 20px;
		>p{
			text-align: center;
		}
		.delete{
		    position: absolute;
		    top:-8px;
		    right: -8px;
		    display:inline-block;
		    width:20px;
		    height:20px;
		    border-radius: 50%;
		    background: red url('../../assets/clear.png') no-repeat;
		    background-size:20px;
		  }
		>form>div{
			margin-top: 45px;
			div{
				width:100%;
				height:250px;
				border: none;
				margin-top: 10px;
				position: relative;
				background:#fff url('../../assets/upload.png') no-repeat 50% 50%;
                background-size: 80px; 
				img{
					width:100%;
					height:100%;
					position: absolute;
					top:0;
					left:0;
				}
				.img-upload{
					height:250px;
				}
			/*	i{
					width:80px;
					height:80px;
					position: absolute;
					top:50%;
                    left:50%;
                    -ms-transform:translate(-50%,-50%);     
                    -moz-transform:translate(-50%,-50%);    
                    -webkit-transform:translate(-50%,-50%); 
                    -o-transform:translate(-50%,-50%);
                     transform:translate(-50%,-50%);
				}*/
			}
		}
	}
</style>