<template>
  <div class="loginpage">
    <vue-particles
      color="#fff"
      :particle-opacity="0.8"
      :particles-number="70"
      shape-type="circle"
      :particle-size="4"
      lines-color="#fff"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.4"
      :lines-distance="150"
      :move-speed="2"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
      class="lizi"
      style="height: 100%"
    />

    <div class="main_box">
      <div class="title">Union</div>
      <div class="loginbox" @keydown.enter="loginsubmit('ruleForm')">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model.number="ruleForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pwd">
            <el-input
              type="password"
              v-model="ruleForm.pwd"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="submit_b" @click="loginsubmit('ruleForm')">
          <span style="margin-right: 20px; display: inline-block">登</span
          ><span>录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import router from "";
import { login } from "@/api/loginAPI";
import { setCookie, getCookie } from "@/utils/sso";
import { getUserByToken } from "@/api/users";
export default {
  created() {
    console.log(getCookie("token"));
  },
  data() {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pwd: "",
        account: ""
      },
      rules: {
        pwd: [{ validator: validatePass, trigger: "blur" }],
        account: [{ validator: checkAccount, trigger: "blur" }]
      }
    };
  },
  methods: {
    //登录前检查本地token与服务端token一致性
    tokencheck() {},

    loginsubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var query = {
            adminName: this.ruleForm.account,
            adminPassword: this.ruleForm.pwd
          };
          login(query)
            .then(res => {
              // console.log(res);
                setCookie("token", res.data.token, "1h");
                getUserByToken().then(res => {
                  console.log(res);
                  sessionStorage.setItem("me", JSON.stringify(res.data.data));
                  this.$router.push("/");
                });
            })
            .catch(err => {
              this.$notify.error({
                title: "登陆失败",
                message: "请检查用户名和密码是否正确"
              });
              console.log("error submit!!");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/un_color.scss";
.loginpage {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 500px;
  background-color: $UN_main;
  .main_box {
    position: absolute;
    width: 700px;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
  }
  .loginbox {
    width: 40rem;
    height: 40rem;
    font-size: 2rem;
  }
  .title {
    color: $font;
    font-size: 5rem;
    width: 100%;
    text-align: center;
    margin: 2rem 0;
  }
  .submit_b {
    height: 2.5rem;
    line-height: 2.5rem;
    color: #fff;
    background-color: #0f6edb;
    margin: 0 auto;
    width: 60%;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
  }
  .submit_b:hover {
    background-color: #3180da;
  }
}
</style>