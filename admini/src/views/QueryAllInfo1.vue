<template>
  <div>
    <!-- 查看员工全部信息 -->
    <el-dialog width="30%" title="修改工人信息" :visible.sync="innerVisible" append-to-body>
    <el-form label-width="80px" :model="formLabelAlign">
      <el-form-item label="姓名">
        <el-input v-model="formLabelAlign.name"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="formLabelAlign.phone"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-input v-model="formLabelAlign.apartment"></el-input>
      </el-form-item>
      <el-form-item label="工号">
        <el-input v-model="formLabelAlign.post"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm1('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
    <el-table :data="gridData" style="width: 100%">
              <el-table-column label="日期" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
              </el-table-column>
              <el-table-column label="姓名" width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>电话: {{ scope.row.phone }}</p>
                    <p>部门: {{ scope.row.department }}</p>
                    <p>工号: {{ scope.row.post }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
       // 查看工人信息
      dialogTableVisible: false,
      innerVisible: false,
      // 编辑工人信息
      formLabelAlign: {
        name: "",
        phone: "",
        department: "",
        post: ""
      },
      gridData: [
        
      ],
    }
  },
  beforeMount(){
    this.getAllInfo();
  },
  methods:{
    // 获取用户所有信息
    getAllInfo(){
      this.$axios.get("/api/worker",{headers:{token:localStorage.getItem("eleToken")}}).then(res=>{
        console.log(res.data);
        // this.gridData.push(res.data)
      })
    },
     // 查看所有工人信息
    handleEdithandleEdit(index, row) {
      this.innerVisible = true;

      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.get("/api/worker").then(res => {
            // 获取工人信息成功成功
            console.log(res.data);
            if (res.data.code == 200) {
             
              console.log(res.data);
            } else {
              this.$message({
                message: res.data.msg,
                type: "error"
              });
            }
          });
        }
      });

      console.log(index, row.name);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
  }
};
</script>
<style>
</style>
