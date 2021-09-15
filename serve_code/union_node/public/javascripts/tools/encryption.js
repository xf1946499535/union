let CryptoJS=require('../publicTools/crypto-js.min')
//DES 加密
function encryptByDES(message, key){
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString();
}
//DES 解密
function decryptByDES(ciphertext, key){
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  var decrypted = CryptoJS.DES.decrypt({
      ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
  }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
  });
  var result_value = decrypted.toString(CryptoJS.enc.Utf8);
  return result_value;
}
//DES调用
// var message = '111111';//需要加密的数据
// var key = '12345678';//加密密钥 key
// var desMessage = 'xxxxxxxxxx';
// //加密
// desMessage = encryptByDES(message, key);
// console.log(desMessage);
// //解密
// message = decryptByDES(desMessage,key)
// console.log(message);