export const setssoLocal = (token) => {
    document.cookie = `token=${token}; expires=${new Date()}; domain=${window.location.host.split(":")[0]};path=/`
}

export const getssoLocal =()=>{
  return document.cookie.split('=')[1]
}
//删除全局同源token
export const delssoLocal=()=>{
var exp = new Date();
exp.setTime(exp.getTime() - 1);
document.cookie= "token" + "="+"undefined"+";expires="+exp.toGMTString();
}

//JS操作cookies方法!
//写cookies
export function setCookie(name,value,time){
var strsec = getsec(time);
var exp = new Date();
exp.setTime(exp.getTime() + strsec*1);
document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";domain="+window.location.host.split(":")[0]+";path="+'/';
}
function getsec(str){
var str1=str.substring(1,str.length)*1; 
var str2=str.substring(0,1); 
if (str2=="s"){
return str1*1000;
}else if (str2=="h"){
return str1*60*60*1000;
}else if (str2=="d"){
return str1*24*60*60*1000;
}
}
//读取cookies
export function getCookie(name)
{
var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
if(arr=document.cookie.match(reg)) return unescape(arr[2]);
else return null;
}
//删除cookies
export function delCookie(name)
{
var exp = new Date();
exp.setTime(exp.getTime() - 1);
var cval=getCookie(name);
if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";domain="+window.location.host.split(":")[0]+";path="+'/';
}