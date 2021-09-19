package com.zhj.utity;

import org.junit.jupiter.api.Test;

import java.util.Random;

public class Token {
    final static char[] arr = {'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R'
    ,'S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'};


    public static String getTokenByRandom(){
        Random random =new Random();
        String s = "";
        for (int i=0;i<15;i++){
            int k = random.nextInt(62);
            s += Character.toString(arr[k]);
        }
        return s;
    }

    @Test
    public void test(){
        String kk = getTokenByRandom();
        System.out.println(kk);
    }

}
