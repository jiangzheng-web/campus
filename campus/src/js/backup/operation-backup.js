/**
 * Created by eleven on 16/12/14.
 * 操作备份类
 */


export default class OperationBackup{

  /**
   * 操作类型:修改 modify
   */
  static  MODIFY = "MODIFY";


  /**
   * 流程状态:添加 add
   */
  static  ADD = "ADD";


  constructor(){

  }

  operator;
  appAccessID;
  operatorType;
  backupInfo;


}
