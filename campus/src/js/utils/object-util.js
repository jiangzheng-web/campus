/**
 * 对象操作类
 * @anthor eleven
 */
export default class ObjectUtil{


  constructor(){
    throw new error('Cannot initialize this class.');
  };

  /**
   * 对象克隆
   * @param source {Object} 源对象
   * @return {Object} 克隆返回对象
   */
  static clone = function( source){

    let str, newobj = source.constructor === Array ? [] : {};
    //非对象类型数据不执行拷贝操作
    if(typeof source !== 'object'){
      return;
    }
    else{
        str    = JSON.stringify(source);
        newobj = JSON.parse(str); //还原
    }
    return newobj;
  };

  /**
   * 比较两个对象属性是否相等
   * @param source  {Object} 源对象
   * @param target  {Object} 比较目标对象
   * @returns {boolean}
   */
  static equals = function( source,target){

    if( source === null || target === null){
      return false;
    }
    //值对象比较
    if( source === target){
      return true;
    }

    //非对象类型数据不进行比较
    if(typeof source !== 'object' || typeof target !== 'object'){
      return false;
    }
    //比较对象构造不一样
    if( source.constructor !==  target.constructor){
      return false;
    }


    let  sourceLength,targetLength;
    //数组类型对象
    if( source.constructor === Array){
      sourceLength = source.length;
      targetLength = target.length;

      //同为数组，但是长度不一致
      if( sourceLength != targetLength){
        return false;
      }

      for( let i = 0 ; i < sourceLength ; i++){
         let result = ObjectUtil.compare( source[i],target[i]);
         if( !result){
           return result;
         }
      }

    }else {
      //循环源对象key判断目标对象和源对象里的属性值是否相等
      let result = true;
      for( let key in source){
        result = ObjectUtil.compare(source[key],target[key]);
        if( !result){
          return false;
        }
      }
      result = true;
      //循环目标对象key判断目标对象和源对象里的属性值是否相等
      for(let key in target){
        result = ObjectUtil.compare(source[key],target[key]);
        if( !result){
          return false;
        }
      }

    }
    return true;
  }


}
