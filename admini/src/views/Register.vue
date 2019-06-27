<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">生产过程跟踪及产品溯源系统</span>
      </div>
      <el-form
        :model="registerUser"
        :rules="rules"
        class="registerForm"
        ref="registerForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="registerUser.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="registerUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
         <el-form-item label="电话" prop="phone">
          <el-input v-model="registerUser.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input v-model="registerUser.password2" placeholder="请确认密码" type="password"></el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">注 册</el-button>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
     var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          // console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerUser: {
        name: "",
        email: "",
        phone:"",
        password: "",
        password2: "",
        identity: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        phone:[
          {validator: checkPhone, trigger: 'blur'},
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/admin", this.registerUser).then(res => {
            // 注册成功
            console.log(res.data);
            if (res.data.code > 300) {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            } else {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.$router.push("/login");
            }
          });
        }
      });
    }
  }
};
</script>


<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/adminbg0.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip{
  width: 400px;
  height: 50px;
  line-height: 50px;
  margin:10px auto;
}
.registerForm[data-v-63ae9146] {
  margin:20px auto!important;
}
.form_container .manage_tip .title {
  font-family: "Times New Roman", Times, serif;
  text-shadow: 2px 2px 1px #ccc;
  font-weight: 900;
  font-size: 26px;
  color: purple;
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>



