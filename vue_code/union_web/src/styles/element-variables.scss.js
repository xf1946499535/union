/**
 * variables.scss.js中变量的命名规则如下：
 * 1.驼峰命名法
 * 使用方式如下：
 * 1.在scss变量中使用是正常的scss变量：$sideBarWidth
 * 2.在js中使用是定义时的变量格式：import { sideBarWidth } from "@/style/variables.scss.js";
 * */
 module.exports = {
  // sideBar
  $colorPrimary:'#1890ff',
  $colorSuccess:'#13ce66',
  $colorWarning:'#FFBA00',
  $colorDanger: '#ff4949',
  $colorInfo: '#1E1E1E',

  $buttonFontWeight:400,
  
  $colorTextRegular: '#1f2d3d',
  $borderColorLight: '#dfe4ed',
  $borderColorLighter: '#e6ebf5',
  $tableBorder:'1px solid #dfe6ec',
}