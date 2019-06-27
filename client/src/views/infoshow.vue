<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="10">
        <el-page-header @back="goBack"></el-page-header>
        <div class="user">
          <img src="../assets/頭像.jpeg" class="avatara" alt>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="userinfo">
          <el-button type="text" @click="dialogVisible = true" class="btn">修改信息</el-button>

          <el-dialog title="编辑资料" :visible.sync="dialogVisible" width="30%">
            <el-form
              :rules="rules"
              :label-position="labelPosition"
              ref="formLabelAlign"
              label-width="80px"
              :model="formLabelAlign"
            >
              <el-form-item label="名称" prop="name">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="电话" prop="phone">
                <el-input v-model="formLabelAlign.phone"></el-input>
              </el-form-item>
              <el-form-item label="email" prop="email">
                <el-input v-model="formLabelAlign.email"></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="addr">
                <el-input v-model="formLabelAlign.addr"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <div class="user-item">
            <i class="fa fa-user"></i>&nbsp;&nbsp;
            <span>{{userName}}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-map-marker"></i>&nbsp;&nbsp;
            <span>{{userEmail}}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-mobile-phone"></i>&nbsp;&nbsp;
            <span>{{userPhone}}</span>
          </div>
          <div class="user-add">
            <i class="fa fa-envelope"></i>&nbsp;&nbsp;
            <span>{{userAddr}}</span>
          </div>
          <div class="user-add">
            <i class="fa fa-clock-o" aria-hidden="true"></i>&nbsp;&nbsp;
            <span>{{userCreateTime}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // name: "infoshow",
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      userName: "",
      userPhone: "",
      userAddr: "",
      userEmail: "",
      userCreateTime: "",
      labelPosition: "top",
      dialogVisible: false,
      formLabelAlign: {
        name: "",
        phone: "",
        addr: "",
        email: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        addr: [{ required: true, message: "地址不能为空", trigger: "blur" }]
      },
      formLabelWidth: "120px"
    };
  },

  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  beforeMount() {
    this.getUserInfo();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      this.$axios
        .get("/api/customer", {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          this.userName = res.data.data.name;
          this.userPhone = res.data.data.phone;
          this.userEmail = res.data.data.email;
          this.userAddr = res.data.data.addr;
          let date = new Date(res.data.data.createTime);
          let y = date.getFullYear();
          let m = date.getMonth();
          let d = date.getDate();
          let h = date.getHours();
          let f =
            date.getMinutes() >= 10
              ? date.getMinutes()
              : "0" + date.getMinutes();
          let s =
            date.getSeconds() >= 10
              ? date.getSeconds()
              : "0" + date.getSeconds();
          this.userCreateTime =
            y + "-" + m + "-" + d + "  " + h + ":" + f + ":" + s;
        });
    },
    // 退出
    goBack() {
      this.$router.push("/home");
    },
    submitForm(formName, item) {
      //立即创建
      this.dialogVisible = false;
      // const id=JSON.parse(localStorage.getItem('id')).value;
      this.$axios
        .put("/api/customer", this.formLabelAlign, {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          console.log(res.data.data);
          if (res.data.code == 200) {
            this.formLabelAlign.name = this.formLabelAlign.phone = this.formLabelAlign.email = this.formLabelAlign.addr =
              "";
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.getUserInfo();
          } else {
            this.$message({
              message: res.data.msg,
              type: "error"
            });
          }
        });
    },
    resetForm(formName) {
      //重置

      this.formLabelAlign.name = "";
      this.formLabelAlign.phone = "";
      this.formLabelAlign.addr = "";
      this.formLabelAlign.email = "";

      // this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.infoshow {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* padding: 16px; */
}
.row-bg {
  width: 100%;
  height: 100%;
}
.user {
  text-align: center;
  position: relative;
  top: 20%;
}
.user img {
  width: 300px;
  border-radius: 50%;
}
.user span {
  display: block;
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.userinfo {
  height: 100%;
  background-color: #eee;
}
.user-item,
.user-add {
  position: relative;
  top: 15%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}

.userinfo .btn {
  margin-top: 20px;
  margin-right: 55px;
  float: right;
}
.el-dialog {
  height: 400px;
}
el-dialog .dialog-footer {
  padding: 0 20px;
}
</style>
