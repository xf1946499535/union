<template>
  <div class="loginpage">
    <div class="title">WO系统</div>
    <div class="loginbox">
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

        <el-form-item>
          <el-button
            type="primary"
            size="medium "
            @click="loginsubmit('ruleForm')"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// import router from "";
import { login } from "@/api/loginAPI";
export default {
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
        account: "",
      },
      rules: {
        pwd: [{ validator: validatePass, trigger: "blur" }],
        account: [{ validator: checkAccount, trigger: "blur" }],
      },
    };
  },
  methods: {
    //登录前检查本地token与服务端token一致性
    tokencheck(){

    },

    loginsubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var query = {
            admin_name: this.ruleForm.account,
            admin_password: this.ruleForm.pwd,
          };
          login(query)
            .then((res) => {
              console.log(res);
              localStorage.setItem("token", res.data.token);
              sessionStorage.setItem("me", JSON.stringify(res.data.data));
              this.$router.push("/");
            })
            .catch((err) => {
              this.$notify.error({
                title: "登陆失败",
                message: "请检查用户名和密码是否正确",
              });
              console.log("error submit!!");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss">
@import "@/styles/un_color.scss";
.loginpage {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color: $UN_main;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .loginbox {
    width: 40rem;
    height: 40rem;
    font-size: 2rem;
    background-color: $UN_main;
  }
  .title {
    color: $font;
    font-size: 5rem;
    margin: 2rem 0;
  }
}
</style>