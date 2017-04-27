/**
 * Created by eleven on 16/12/14.
 * 备份处理类
 * @anthor eleven
 */


export default class BackupHandler{


  /**
   * 备份类型:操作备份
   */
  static  OPERATION = "OPERATION";


  /***
   * 更新备份信息
   * @param backupType {string}  备份类型
   * @param backup     {Object}  备份信息
   */
   static updateBackup = function( backupType,backup){

      let appKey    = localStorage.getItem('app');
      let appBackup = localStorage.getItem( appKey +'_BACKUP');
      if( ! appBackup)
        return ;
      try{
        let temp = JSON.parse( appBackup);
        temp[backupType] = backup;
        localStorage.setItem( appKey +'_backup',JSON.stringify(temp));
      }
      catch( e ){
        return ;
      }
   };


    /***
     * 添加备份信息
     * @param backup  {Object}  备份信息
     */
    static addBackup = function( backupType, backup){

      let appKey    = localStorage.getItem('app');
      let appBackup = localStorage.getItem( appKey +'_BACKUP');

      try{
        //此产品备份第一次添加
        if( !appBackup){
          appBackup = {};
        } //产品备份不是第一次添加
        else {
          appBackup = JSON.parse( appBackup);
        }
        appBackup[backupType] = backup;
        localStorage.setItem( appKey +'_BACKUP',JSON.stringify(appBackup));
      }
      catch( e ){
        return ;
      }
    };


    /***
     * 移除指定产品的备份
     * @param backupType  {string}  备份类型
     */
    static removeByBackupType = function( backupType ){
        let appKey    = localStorage.getItem('app');
        localStorage.removeItem(appKey +'_BACKUP');
    };


    /***
     * 移除所有备份
     */
    static removeAll = function(){

       for ( var key in localStorage){
         if(key.indexOf('_backup') > 0){

           localStorage.removeItem(key );
         }
       }
    };


  /**
   * 根据备份类型获取备份
   * @param backupType  {string}  备份类型
   * @return {Object} 备份信息
   */
    static getBackUpByType = function( backupType){

        let appKey    = localStorage.getItem('app');
        let appBackup = localStorage.getItem( appKey +'_BACKUP');
        if( ! appBackup)
          return null;

        try{
           let temp = JSON.parse( appBackup);
           return temp[backupType];
        }
        catch( e ){
          return null;
        }

    }
}
