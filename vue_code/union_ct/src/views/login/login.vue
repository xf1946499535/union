<template>
  <div class="login">
    <el-button class="changebtn" color="#626aef" @click="isloginpage = !isloginpage" plain>{{ isloginpage ? '去注册' :
        '去登陆'
    }}</el-button>
    <div class="lside">
      <div class="sidetitle"><img src="https://vvbin.cn/next/assets/logo.63028018.png" alt="" srcset=""> 联 军 政 务 平 台
        <div class="sideimg"><img src="https://vvbin.cn/next/assets/login-box-bg.9027741f.svg" alt="" srcset=""></div>
      </div>
    </div>
    <div class="rside">
      <div class="loginbox">
        <div class="formtitle"><strong>{{ isloginpage ? '登录' :
            '注册'
        }}</strong></div>
        <div class="loginform">
          <el-form v-show="isloginpage" :label-position="loginform" style="max-width: 460px" size="large">
            <el-form-item>
              <el-input v-model="loginform.account" />
            </el-form-item>
            <el-form-item>
              <el-input type="password" show-password v-model="loginform.password" />
            </el-form-item>
            <el-form-item>
              <el-button class="loginBtn" color="#626aef" @click="loginbtn">登 录</el-button>
            </el-form-item>
          </el-form>
          <el-form v-show="!isloginpage" :label-position="loginform" style="max-width: 460px" size="large">
            <el-form-item>
              <el-input v-model="loginform.account" />
            </el-form-item>
            <el-form-item>
              <el-input type="password" show-password v-model="loginform.password" />
            </el-form-item>
            <el-form-item>
              <el-button class="loginBtn" color="#626aef">注 册</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onBeforeMount, onMounted, MethodOptions } from 'vue'
import { login } from '@/apis/users'
export default defineComponent({
  name: '',
  setup() {
    const data = reactive({
      loginform: {
        account: '',
        password: ''
      },
      //注册页和登录页切换按钮
      isloginpage: true,
      loginbtn() {
        login(data.loginform.account, data.loginform.password).then(res => {
          sessionStorage.setItem('myid', res.data.userid)
          console.log('登陆成功');
        }, err => {
          console.log('登陆失败');
        })
      }
    })
    onBeforeMount(() => {
      //2.组件挂载页面之前执行----onBeforeMount
    })
    onMounted(() => {
      //3.组件挂载到页面之后执行-------onMounted
    })
    return {
      ...toRefs(data),
    }
  },
})

</script>
<style lang='less'>
.login {
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;

  .changebtn {
    position: absolute;
    right: 0;
    top: 0;
  }

  .lside {
    width: 55%;
    height: 100%;
    background-image: url('@/assets/login/login-bg.svg');
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    text-align: center;

    .sidetitle {
      width: 100%;
      text-align: center;
      font-size: 1.5rem;
      color: #fff;
      margin-top: 3rem;

      img {
        position: relative;
        top: .5rem;
        height: 2.5rem;
        width: 2.5rem;

      }
    }

    .sideimg {
      width: 100%;
      height: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10rem;

      img {
        width: 20rem;
        height: 100%;
      }
    }
  }

  .rside {
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .loginbox {
      width: 24rem;
      height: 30rem;
      // background-color: gold;

      .formtitle {
        font-size: 1.8rem;
      }

      .loginform {
        margin-top: 1rem;
        width: 100%;

        .loginBtn {
          width: 100%;
        }
      }
    }
  }
}
</style>