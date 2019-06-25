<template>
  <div class="farm">
    <div class="title">
      <h2>录入员工信息</h2>
    </div>
    <div class="w"></div>
    <div class="biaoge">
      <div style="margin: 20px;"></div>
      <!-- 添加工人信息 -->
      <el-form
        label-width="80px"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="ruleForm.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="post">
          <el-input v-model="ruleForm.post" placeholder="请输入工号"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="ruleForm.department" placeholder="请输入部门"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script>
export default {
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
    return {
      ruleForm: {
        name: "",
        phone: "",
        department: "",
        post: ""
      },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        phone: [{validator: checkPhone, trigger: 'blur'}],
        department: [
          { required: true, message: "部门不能为空", trigger: "change" }
        ],
        post: [
          { required: true, message: "工号不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    resetForm(Form) {
      this.ruleForm.name = this.ruleForm.phone = this.ruleForm.department = this.ruleForm.post =
        "";
    },
    submitForm(Form) {
      this.$axios
        .post("/api/worker", this.ruleForm, {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          this.$message({
            message: "恭喜你，加入成功",
            type: "success"
          });
          this.ruleForm.name = this.ruleForm.phone = this.ruleForm.department = this.ruleForm.post =
            "";
        });
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.farm {
  width: 700px;
  height: 100%;
  margin: 10px auto;
  background-color: rgb(223, 233, 221);
}
.title h2 {
  line-height: 50px;
  font-weight: 700;
  font-family: STFangsong;
  text-align: center;
}
.w {
  width: 300px;
  height: 400px;
  background-color: #fff;
}
.biaoge {
  padding: 10px 30px;
  box-sizing: border-box;
}
.farm > div {
  width: 100%;
  height: 50px;
}

.el-button + .el-button {
  margin-left: 330px !important;
}
.el-form-item {
  margin-top: 40px;
  margin-bottom: 28px;
}
</style>
