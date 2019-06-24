<template>
  <div class="infoshow">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="10">
        <el-page-header @back="goBack"></el-page-header>
        <div class="user">
          <img src="http://www.gravatar.com/avatar/anything?s=200&d=mm" class="avatara" alt>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="userinfo">
          <el-button type="text" @click="dialogVisible = true" class="btn">修改信息</el-button>

          <el-dialog title="编辑资料" :visible.sync="dialogVisible" width="30%">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="名称">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="formLabelAlign.phone"></el-input>
              </el-form-item>
              <el-form-item label="email">
                <el-input v-model="formLabelAlign.email"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="formLabelAlign.addr"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>

          <div class="user-item">
            <i class="fa fa-user"></i>
            <span>{{userName}}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-envelope"></i>
            <span>{{userEmail}}</span>
          </div>
          <div class="user-item">
            <i class="fa fa-mobile-phone"></i>
            <span>{{userPhone}}</span>
          </div>
          <div class="user-add">
            <i class="fa fa-map-marker"></i>
            <span>{{userAddr}}</span>
          </div>
          <div class="user-add">
            <i class="fa fa-clock-o" aria-hidden="true"></i>
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
    return {
      userName: "",
      userPhone: "",
      userAddr: "",
      userEmail: "",
      userCreateTime: "",
      labelPosition: "right",
      dialogVisible: false,
      formLabelAlign: {
        name: "",
        phone: "",
        addr: "",
        email: ""
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
          this.userCreateTime = res.data.data.createTime;
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
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            // 清空
            // this.formLabelAlign.name = "";
            // this.formLabelAlign.phone = "";
            // this.formLabelAlign.address = "";
            // this.formLabelAlign.email = "";
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
      this.formLabelAlign.address = "";
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
  top: 30%;
}
.user img {
  width: 150px;
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
