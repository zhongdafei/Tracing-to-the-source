<template>
  <div class="farm">
    <div class="title">
      <h2>商品上架</h2>
    </div>
    <div class="w"></div>

    <el-row>
      <el-col :span="8" :offset="8">
        <div id="upload">

          <!--elementui的form组件-->
          <el-form
          ref="form" 
          :model="form" 
          label-width="80px" 
          :rules="rules">
            <el-form-item label="图片地址" prop="image">
              <el-input v-model="form.image"  style="width:360px;"></el-input>
            </el-form-item>
            <el-form-item label="产品名称" prop="name">
              <el-input v-model="form.name" style="width:360px;" placeholder="字数请控制在10个字以内"></el-input>
            </el-form-item>
            <el-form-item label="产品描述" prop="desc">
              <el-input v-model="form.desc" style="width:360px;" placeholder="字数请控制在55个字以内"></el-input>
            </el-form-item>
            <el-form-item label="产品类型" prop="type">
              <el-input v-model="form.type" style="width:360px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>

     
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // dialogImageUrl: '',
      // dialogVisible: false
      rules: {
        image: [
          { required: true, message: "图片不能为空", trigger: "change" },
        ],
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        desc: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 10, max: 55, message: "长度在 10 到 55 个字符", trigger: "blur" }
        ],
        type: [
          { required: true, message: "不能为空", trigger: "change" },
        ],
      },

      form: {
        //form里面的参数
        name: "",
        desc: "",
        type: "",
        image: ""
      }
     
    };
  },
  methods: {
   
    onSubmit() {
      let config = {
        "headers": {
          "token": localStorage.getItem("eleToken")
        }
      };

      // console.log(config)
      this.$axios
        .post("/api/producible", this.form, config)
        .then(function(result) {
          // console.log(result.data.code);
          
          // if(result.data)
        });
        this.$message({
          message: '恭喜你，添加成功',
          type: 'success'
        });
        this.form.name=
        this.form.desc=
        this.form.type=
        this.form.image="";
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
  height: 93%;
  margin: 20px auto;
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
.el-form-item {
  margin-top: 40px;
  margin-bottom: 28px;
}

.el-col-offset-8[data-v-7eda5aef] {
  margin-left: 15.33333%;
  margin-top: 50px;
}
</style>
