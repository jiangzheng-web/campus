/**
 * Created by eleven on 16/11/23.
 */

export default class SessionUtil{

  constructor(){
    throw new error('Cannot initialize this class.');
  };

  /**
   * 获取sessionStorage 指定项
   * @param   key  {string}
   * @author   eleven
   */
  static getItem = function( key ){
    let itemStr;
    try{
       itemStr = sessionStorage.getItem( key );
       return JSON.parse( itemStr);
    }catch( e ){
       return itemStr ;
    }
  }

  /**
   * 以键值对的形式往session 里存值
   * @param key   {string}
   * @param item  {Object}
   */
  static setItem = function( key, item ){
    sessionStorage.setItem( key, JSON.stringify(item ))
  }

  /**
   * 获取sessionStorage 指定项的指属性定
   * @param key     {string}
   * @param subKey  {string}
   * @anthor  eleven
   */
    static getItemSubValue = function( key , subKey) {
      let itemStr;
        try{
          itemStr  = sessionStorage.getItem( key );
          let item = JSON.parse( itemStr);
          return item[subKey];
        }catch( e ){
            return itemStr ;
        }
    };

  /**
   * 设置sessionStorage 指定项的指属性值
   * @param key        {string}
   * @param subKey     {string}
   * @param subValue   {string}
   * @auntor  eleven
   */
  static setItemSubValue = function( key , subKey ,subValue){
    let itemStr;
    try{
      itemStr  = sessionStorage.getItem( key );
      let item = JSON.parse( itemStr);
      item[subKey] = subValue;
      SessionUtil.setItem( key ,item )
    }catch( e ){
      return itemStr ;
    }
  }


  /**
   * 清除除exceptItems以外的item
   * @param   exceptItems {Array}
   * @anthor  eleven
   */
    static clean = function(exceptItems = []) {
      for( var key in sessionStorage) {
        let flag = false;
        for (var i = 0; i < exceptItems.length; i++) {
          if (key == exceptItems[i]) {
            flag = true;
            break;
          }
        }
        if (!flag)
          sessionStorage.removeItem( key );
      }

    }

}
