package com.zhj.utity;

import org.junit.jupiter.api.Test;

import java.util.Base64;


public class Encryption {
   public String encryption(String str) { // 编码
       try {
           final Base64.Encoder encoder = Base64.getEncoder();
           final byte[] textByte = str.getBytes("UTF-8");
           final String encodedText = encoder.encodeToString(textByte);
           return encodedText;

       }catch (Exception e){
           return null;
       }

   }

   public String decrypt(String str){ // 解码
       try{
           final Base64.Decoder decoder = Base64.getDecoder();
           String encodedText = new String(decoder.decode(str), "UTF-8");
           return encodedText;

       }catch (Exception e){
           return null;
       }
   }

   @Test
    public void test() {
       String pre =encryption("123456");
       String aft = decrypt(pre);
       System.out.println(pre);
       System.out.println(aft);
   }

}
