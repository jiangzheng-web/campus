<template>
	<div class='feedback'>
		<div class="top-nav">
            <span @click="goBack">
                <i></i>
            </span>
            意见反馈
        </div>
        <div class="feed-mian">
        	<p>请详细描述您的问题或建议，我们将及时跟进与解决。</p>
        	<div class="textFa" style="margin:20px 0">
        		<textarea v-model="feed.content" maxlength="200"></textarea>
        		  <span class="ident">{{fontNum}}/200</span>
        	</div>
        	<div v-show="images[0]" class="feed-img">
                <img :src="images[0]">
                <span class="delete" @click="deleImg(images[0])"></span>
            </div>
            <div v-show="!images.length" class="feed-uplod" >
            	<form name="fileinfo" id='fileinfo'>
                	<input type="file" ref="multiple" class="feed-upload" name="file" @change="onFileChange($event)"/>
                </form>
            </div>
        </div>
        <div class="btnFa">
        	<button @click="feedSubmit">提交</button>
        </div>
	</div>
</template>
<script>
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
 import Vue from 'vue';
 import ApiUtil from '../../js/utils/api-util.js';
 import { Toast,Field,Popup,Picker,Indicator,DatetimePicker,MessageBox } from 'mint-ui';
  Vue.component(Popup.name,Popup);
  Vue.component(Picker.name,Picker);
  Vue.component(DatetimePicker.name, DatetimePicker);
	export default{
		data(){
			return{
				images:[],
				feed:{
					content:''
				},
				imgUrl:[],
				fontNum:0
			}
		},
		watch:{
			'feed.content'(newVal){
				this.fontNum=newVal.length;
			}
		},
		methods:{
			feedSubmit(){
				if(!this.feed.content){
					 // MessageBox.alert('请填写意见或者上传图片')
					MessageBox.alert('请填写意见');
				}else{
					let data={};
					data.typeID='1';
					 Indicator.open({
                              text: '正在提交，请稍候...',
                              spinnerType: 'fading-circle'
                            });
					this.imgUrl[0]&&(data.img=encodeURIComponent(JSON.stringify({'1':this.imgUrl[0]})));
					data.content=this.feed.content;
					ApiUtil.getHttp('http://baby.api.cform.cn/api/common/feedback',data)
                            .then(
                                (suc)=>{
                                	Indicator.close(); 
                                    if(suc.status==0){
                                       Indicator.close();
                         //               Toast({
					                    //     message: '提交成功',
					                    //     position: 'middle',
					                    //     duration: 2000
					                    // })
                                       MessageBox.alert('提交成功，感谢您的宝贵意见！').then(
                                       	()=>{
                                       		 history.go(-1);
                                       	}
                                       	)
                                      
                                    }else{
                                          Toast({
                                              message: suc.errmsg,
                                              position: 'middle',
                                              duration: 2000
                                            })
                                          Indicator.close();
                                    }
                                },(err)=>{

                                    Indicator.close();
                                    // Toast({
                                    //           message: '服务器异常',
                                    //           position: 'middle',
                                    //           duration: 2000
                                    //         })
                                }
                            )
					
                   
				}
			},
			deleImg(num){
            	MessageBox({
                          title: '提示',
                          message:'确定放弃此图片吗？',
                          confirmButtonText:'确定' ,
                          cancelButtonText:'取消',
                          showCancelButton: true,
                          closeOnClickModal:true
                        }).then((up)=>{
                          if(up=='confirm'){
                          	let data=document.getElementById("fileinfo");
                            data.reset();
                            this.images.remove(num);
                          }else{
                           // console.log('取消')
                          }
                        })
			},
			goBack(){
				history.go(-1);
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
	          var vm = this;
	          var reader = null;
	          var leng = file.length;
	          console.log(file)
	          for (var i = 0; i < leng; i++) {
	            reader = new window.FileReader()
	            reader.readAsDataURL(file[i])
	            reader.onload = function (e) {
	              vm.images.push(e.target.result)
	            }
	          }
	          let data=new FormData(document.getElementById("fileinfo"));
				let me=this;
				let msg={};
				if(window.localStorage.getItem('msg')){
	              msg=JSON.parse(window.localStorage.getItem('msg'));
	            }
	             Indicator.open({
                              text: '正在上传，请稍候...',
                              spinnerType: 'fading-circle'
                            });
	         this.$http.post(
              `http://baby.api.cform.cn/api/common/upload?app_id=${msg.app_id}&header_img=${msg.header_img}`,data)
                .then(
                    (suc)=>{
                        if(suc.body.status==0){
                            // me.check=suc.data;
                            // sessionStorage.setItem('check',suc.data);
                            me.imgUrl[0]=suc.body.data.fileUrl;
                              Indicator.close(); 
                              Toast({
                                  message: '上传成功',
                                  position: 'middle',
                                  duration: 2000
                              })
                        }else{
                          Indicator.close();
                              Toast({
                                  message: suc.body.errmsg,
                                  position: 'middle',
                                  duration: 2000
                                })
                   
                        }
                    },(err)=>{
                      Indicator.close();
                      // Toast({
                      //             message: '服务器异常',
                      //             position: 'middle',
                      //             duration: 2000
                      //           })
             
                    }
                )
	        },
		}
		
	}
</script>
<style lang='scss'>
.feedback{
	.btnFa{
		padding-bottom: 30px;
	}
}
.feed-img{
	width:100px;
		height:100px;
		position: relative;
		img{
			width:100px;
			height:100px;
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
}
	.feed-uplod{
		width:100px;
		height:100px;
		background: url('../../assets/add.svg') no-repeat;
		background-size:100px;
		form{
			width:100%;
			height:100%;
		}
		input{
			opacity: 0;
			width:100%;
			height:100%;
		}
	}
	.feed-mian{
		background: #fff;
		margin-top: 10px;
		padding: 15px 20px;
		p{
			text-align: center;
		}
		textarea{
			resize: none;
			width:100%;
			height:250px;
			border: none;
			background: #f0f0f0;
			padding: 15px;
		}
	}
</style>