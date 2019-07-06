<template>
  <div class="content">
    <div class="left">
      <div class="image">
        <img
          src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2665752539,2910740997&fm=27&gp=0.jpg"
          alt
        />
      </div>
      <div class="info">
        <h3>个人信息</h3>
        <p>姓名：{{ruleForm1.name}}</p>
        <p>年龄：{{ruleForm1.age}}</p>
        <p>性别：{{ruleForm1.sex}}</p>
        <p>电话：{{ruleForm1.phone}}</p>
        <p>QQ号：{{ruleForm1.qq}}</p>
        <p>职位：{{ruleForm1.position}}</p>
      </div>
    </div>
    <div class="center">
      <div class="qiu"></div>
      <div class="qiu1"></div>
      <p>个</p>
      <p>人</p>
      <p>信</p>
      <p>息</p>
      <div class="qiu1"></div>
    </div>
    <div class="right">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="50px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model.number="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model.number="ruleForm.sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="ruleForm.age"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model.number="ruleForm.position"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model.number="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="QQ号" prop="qq">
          <el-input v-model.number="ruleForm.qq"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { parse } from 'path';
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var checkname = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("姓名不能为空"));
      }
    };
    var checksex = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("性别不能为空"));
      }
    };
    var checkposition = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("职位不能为空"));
      }
    };
    var checkqq = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("QQ号不能为空"));
      }
    };
    var checkphone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        // console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      ruleForm1: {
        name: "胡英俊",
        age: "25",
        sex: "男",
        position: "主管",
        phone: "18870772880",
        qq: "19030440257"
      },
      ruleForm: {
        name: "",
        age: "",
        sex: "",
        position: "",
        phone: "",
        qq: ""
      },
      rules: {
        name: [{ validator: checkname, trigger: "blur" }],
        sex: [{ validator: checksex, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        position: [{ validator: checkposition, trigger: "blur" }],
        phone: [{ validator: checkphone, trigger: "blur" }],
        qq: [{ validator: checkqq, trigger: "blur" }]
      }
    };
  },
  beforeMount(){
    this.createToken();
  },
  methods: {
    createToken(){
      // localStorage.setItem("info",stringify(this.ruleForm1));
    },
    submitForm(formName) {
      if(!this.ruleForm.name==""){
      localStorage.setItem("info",JSON.stringify(this.ruleForm));
     if(localStorage.info){
       this.ruleForm1=JSON.parse(localStorage.info);
     }else{
       this.ruleForm=this.ruleForm1
     }
    //  this.ruleForm=[];
     }
    //  this.ruleForm=[];
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.content {
  width: 100%;
  height: 100%;
  position: relative;
}
.left,
.right {
  width: 30%;
  height: 465px;
  position: absolute;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.center {
  width: 100px;
  height: 470px;
  position: absolute;
  top: 110px;
  right: 46.5%;
  background-color: #b1b479;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.55), 0 0 6px rgba(0, 0, 0, 0.04);
}
.left {
  left: 200px;
  top: 40px;
  background-color: #fdfcf8;
}
.right {
  right: 200px;
  top: 190px;
  background-color: rgba(224, 150, 89, 0.13);
}
.el-form {
  padding: 30px;
}
.el-input__inner:hover {
  border: 1px solid rgb(101, 170, 235);
}
.el-button {
  margin: 0 50px;
}
.image {
  margin: 15px auto;
}
.image,
img {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.info {
  width: 45%;
  height: 210px;
  /* background-color: pink; */
  margin: 10px auto;
}
h3 {
  font-family: STKaiti;
  font-size: 20px;
}
p,
h3 {
  display: block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: seagreen;
}
.center p{
    /* display: inline-block; */
    font-size: 24px;
    font-weight: 700;
    font-family: STKaiti;
    margin-top: 50px;
}
.qiu,
.qiu1 {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  position: absolute;
  animation-play-state: running;
}
.qiu {
  animation: myqiu 5s linear infinite alternate;
  background-color: rgb(73, 73, 133);
}
.qiu1{
 animation: myqiu1 5s linear infinite alternate;
  background-color: rgb(73, 73, 133);
}
@keyframes myqiu {
 0% {
    top: 0px;
    left: 80px;
  }
  33% {
    top: 55px;
    left: 15px;
  }
  48% {
    top: 140px;
    left: 65px;
  }
  60% {
    top: 220px;
    left: 15px;
  }
  75% {
    top: 300px;
    left: 65px;
  }
  100% {
    top: 450px;
    left: 0px;
  }
}
@keyframes myqiu1 {
  0% {
    top: 0px;
    left: 0px;
  }
  33% {
    top: 55px;
    left: 65px;
  }
  48% {
    top: 140px;
    left: 15px;
  }
  60% {
    top: 220px;
    left: 65px;
  }
  75% {
    top: 300px;
    left: 15px;
  }
  100% {
    top: 450px;
    left: 80px;
  }
}
</style>

