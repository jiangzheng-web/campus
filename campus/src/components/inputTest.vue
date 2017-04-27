<template>
  <div class="inputTest">
    <div class="inputBox">
      <label for="i1" v-show='label' >
          <span v-if="label.length>4">{{label}}</span>
          <ul v-else class="input-tit">
            <li>{{label[0]}}</li>
            <li v-if="!label[2]">{{label[1]}}：</li>
            <li v-else>{{label[1]}}</li>
            <li v-show="label[2]">{{label[2]}}：</li>
          </ul>
      </label>
      <input  id="i1" :type=inputType :placeholder="placeholder"
              @click="showX=true" @blur="isPersonSubmit()" :class="{'unitsInput':Units}" :value="inputMsg" @input="isInput" />
      <span class="cancelVal" :class="{'haveUnits':Units}" v-show="showX && inputMsg" @click="cancelVal()">
          <a href="javascript:;"></a>
      </span>
      <div v-show="Units">
        <span v-show="Units" class="Units">{{Units}}</span>
        <i></i>
      </div>
    </div>
    <p class="fontRed" v-show="errorInfo"><a></a>{{errorInfo}}</p>
  </div>
</template>
<script>
  var verification=function(msg,reg){
    return reg.test(msg);
  };
  export default {
    name:'input-test',
   props:['placeholder','inputType','lengthError','label','inputId','value','model','Units','required','pattern','patternError','maxLength','minLength'],
    data(){
      return{
        errorInfo:'',
        inputMsg:this.value,
        showX:false,
        test:true
      }
    },
  watch:{
    inputMsg:{
      handler (newVal,old) {
        if(newVal!=old){
          this.errorInfo='';
          if(!this.verifierValue()){
              this.test=!1;
              this.$emit('inputBlur','');
          }else{
              this.test=!0;
              this.$emit('input', this.inputMsg);
              let value = {};
              value[this.inputId]=this.inputMsg;
              this.$emit('inputBlur',value);
          }
        }
      },deep:false
    }
    ,
    value:function ( val , oldVal) {
       if( val!= oldVal ){
        this.inputMsg = val;
       }
    }
  },
  created(){
    if(this.inputMsg){
      this.test=!0;
    }else{
       this.test=this.required?!1:!0;
    }
  },
    methods:{
      verifierValue(err){
        //请安装下面代码修改各自的验证代码
        if (this.required) { //字段为必填项
          if (!this.inputMsg) {
            if(err){
              this.errorInfo = this.placeholder;
            }
            return false;
          }
        }
        //判断字段长度
        if (((this.maxLength && this.maxLength >0 ) || (this.minLength && this.minLength > 0)) && this.inputMsg) {
          if (this.inputMsg.length > this.maxLength || this.inputMsg.length < this.minLength) {
            if(err){
              this.errorInfo = this.lengthError || this.placeholder;
            }
            return false;
          }
        }
        //正则判断
        if (this.pattern && this.inputMsg && !verification(this.inputMsg, this.pattern)) {
          if(err){
             this.errorInfo = this.patternError || this.placeholder;
          }
          return false;
        }
        return true;
      },

      isPersonSubmit(){
          if(this.verifierValue('err')){
              this.test = true;
              this.$emit('inputBlur',{blur:this.inputId});
          }else{
            this.test= false ;
          }

        this.$emit('input', this.inputMsg);
        setTimeout(()=>{
          this.showX=false;
        },300)
      },
      isInput(evt){
      
        this.inputMsg = evt.target.value;
      },
      cancelVal(){
        this.inputMsg='';
        this.personErr='';
          this.$emit('input', '');
          this.$emit('inputBlur','');
      }
    }
  }
</script>
<style lang="scss">
.input-tit{
     display: -moz-box; 
        display: -webkit-box;
         display: -o-box;
         display: box; 
          -moz-box-pack:justify; -webkit-box-pack:justify; -o-box-pack:justify; box-pack:justify;
}
 .inputTest{
   padding-right:15px;
   .inputBox{
     height:42px;
   }
  >.inputBox>label{
      display: inline-block;
      width:70px;
      height:42px;
      line-height:42px;
    }
    input{
      border:none;
      height:42px;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow: hidden;
      padding-right:20px;
       padding-left:10px;
       border-radius:2px;
      &.unitsInput{
        padding-right:40px;
      }
    }
    .Units{
      height:46px;
      line-height: 46px;
      position:absolute;
      left:-24px;
    }
    .cancelVal{
      display: inline-block;
      width:100%;
      height:46px;
      position:relative;
      left:-16px;
      a{
        position: absolute;
        top:50%;
        -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        display: block;
        width:14px;
        height:14px;
        background: url('../assets/icon/Clear.svg') no-repeat;
        vertical-align: middle;
        z-index: 5;
      }
    }
    .haveUnits{
      left:-40px;
    }
    i{
      float:right;
      vertical-align: middle;
      width:17px;
    }
 }
    .fontRed{
      margin-top:8px;
      margin-bottom: 15px;
      text-align:center;
      a{
        display: inline-block;
        width:19px;
        height:16px;
        vertical-align: middle;
        margin-top:-3px;
        background: url('../assets/icon/warn.svg') no-repeat;
      }
    }

 div.inputBox,div.listBox{
      display:-moz-box;
      display:-webkit-box;
      display:box;
      width:100%;
      position: relative;
      input,.isRadio{
        display: block;
        width:auto;
        box-flex: 5;
        -moz-box-flex: 5;
        -webkit-box-flex: 5;
      }
      div{
        width:26px;
       position:relative;
       display:-webkit-flex;
        display:-moz-flex;
        display:-o-flex;
        display:-ms-flex;
        display:flex;
        -webkit-align-items:center;
        -moz-align-items:center;
        -o-align-items:center;
        -ms-align-items:center;
        align-items:center;
      }
    }
.loanBody{
  .isDoubleErr.prevService{
    height:86px;
  }
  >li{

    &.prevService{
      display:-moz-box;
      display:-webkit-box;
      display:box;
      >.inputTest{
        >p{
          position: absolute;
          left:15px;
        }
        .inputBox{
          .cancelVal{
            left:-45px;
          }
          >div{
            position:absolute;
            right:-7px;
          }
        }
        input{
          margin-left: 16px;
        }
        &:first-child{
          box-flex: 3;
          -moz-box-flex: 3;
          -webkit-box-flex: 3;
        }
        &:nth-child(2){
          box-flex: 2;
          -moz-box-flex:2;
          -webkit-box-flex: 2;
          .inputBox{
            >div{
              right:8px;
            }
          }
          label{
            display: none;
          }
          input{
            box-flex: 3;
            -moz-box-flex: 3;
            -webkit-box-flex: 3;
          }
        }
      }
    }
  }
}

 .fontRed{
      margin-bottom: 15px;
      a{
        display: inline-block;
        width:19px;
        height:16px;
        vertical-align: middle;
        margin-top:-3px;
        // background: url('../assets/icon/warn.svg') no-repeat;
      }
    }
/*微信同手机号*/
.loanBody{
  .weChat{
  position:relative;
      input{
        padding-right:66px;
      }
      .cancelVal{
        left:-67px;
      }
  .clickPhone{
    position:absolute;
    top:15px;
    right:14px;
    color:#0084FF;
  }
}
}
.isRadio{

  .radioChoice{
    display: inline-block;
    width:45px;
    position: relative;
    input{
      display: inline-block;
     margin-left:0px;
    }
    input[type=radio]{
      -webkit-appearance:none;
      //  background: #fff url('../../assets/icon/radio2.png') no-repeat;
       background-size:14px; 
       background-position: 0 17px;
       &:checked{
          // background: #fff url('../../assets/icon/radio.png') no-repeat;
          background-size:14px; 
          background-position: 0 17px;
       }
    }
    span{
      display: inline-block;
      height:50px;
      line-height: 50px;
      position: absolute;
      top:50%;
      -webkit-transform: translateY(-50%);
        -moz-transform: translateY(-50%);
        -ms-transform: translateY(-50%);
        -o-transform: translateY(-50%);
        transform: translateY(-50%);
        margin-left:7px;
    }
    &:first-child{
      margin-right:45px;
      
    }
  }
}
</style>