<template>
  <div class="zhanwei">
    <div class="login">
      <section class="form_container">
        <div class="manage_tip">
          <span class="title">ktv管理系统</span>
        </div>

        <el-form
          :model="loginUser"
          :rules="rules"
          class="loginForm"
          ref="loginForm"
          label-width="80px"
        >
          <el-form-item label="用户名" prop="name">
            <el-input v-model="loginUser.name" placeholder="请输入用户名"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登入</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>
              还没有账号？现在
              <router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
// 解析token
import jwt_decode from "jwt-decode";

export default {
  name: "login",
  components: {},
  data() {
    return {
      loginUser: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          {
            type: "",
            required: true,
            message: "用户名格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(JSON.parse(localStorage.userInfo).name);

          if (
            JSON.parse(localStorage.userInfo).name == this.loginUser.name &&
            JSON.parse(localStorage.userInfo).password ==
              this.loginUser.password
          ) {
            this.$message({
              message: "登入成功",
              type: "success"
            });
            this.$router.push("/index");
          } else {
            this.$message({
              message: "用户名 / 密码  错误",
              type: "error"
            });
          }
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>

<style scoped>
.zhanwei {
  width: 100%;
  height: 100%;
}
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/蓝紫色bgc.jpg) no-repeat center center;
  background-size: 100% 100%;
  min-height: 757px;
}
.form_container {
  width: 370px;
  position: absolute;
  top: 20%;
  left: 40%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Times New Roman", Times, serif;
  text-shadow: 2px 2px 1px #ccc;
  font-weight: bold;
  font-size: 26px;
  color: #fff;
  letter-spacing: 6px;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>


