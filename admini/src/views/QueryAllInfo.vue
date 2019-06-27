<template>
  <div class="all">
    <div class="w">
      <div class="otherspace"></div>
      <div class="space">
        <p>所有員工信息</p>
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>部门: {{ scope.row.department }}</p>
              <p>工号: {{ scope.row.workerId }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="电话" width="180">
          <template slot-scope="scope">
            <i class="el-icon-phone"></i>
            <span style="margin-left: 10px">{{ scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column label="职位" width="180">
          <template slot-scope="scope">
            <i class="el-icon-postcard"></i>
            <span style="margin-left: 10px">{{ scope.row.post}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="dialogVisible=true">编辑</el-button>
            <el-dialog title="选项框" :visible.sync="dialogVisible" width="30%">
              <el-form
                :model="ruleForm"
                status-icon
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
               
                <el-form-item label="姓名" prop="name">
                  <el-input v-model.number="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                  <el-input v-model.number="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="部门" prop="department">
                  <el-input v-model.number="ruleForm.department"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="post">
                  <el-input v-model.number="ruleForm.post"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm',scope.row,scope.$index)">提交</el-button>
                  <el-button @click="resetForm('ruleForm',scope.row,scope.$index)">重置</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>

            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="phone" label="电话" width="120"></el-table-column>
        <el-table-column prop="workerId" label="工号" width="300"></el-table-column>
        <el-table-column prop="department" label="部门" width="120"></el-table-column>
        <el-table-column prop="post" label="身份" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="resetRow(scope.$index, tableData)"
              type="text"
              size="small"
            >修改</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>-->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      labelPosition: "top",
      ruleForm: {
        name:'',
        phone:'',
        department:'',
        post:''
      }
    };
  },
  beforeMount() {
    this.getAllInfo();
  },
  methods: {
    // 提交修改信息列表
    submitForm(formName,row,index) {
      console.log(index,row);
      let id = row.workerId;
      this.dialogVisible = false;
        this.$refs[formName].validate(valid => {
          if (valid) {
            this.$axios
              .put(`/api/worker/${id}`, this.ruleForm, {
                headers: { token: localStorage.getItem("eleToken") }
              })
              .then(res => {
                console.log(res);
              });
            alert("submit!");
          } else {
            console.log("error submit!!");
            return false;
          }
        });
    },
    // 修改信息列表重置
    resetForm(formName) {
      this.dialogVisible = false, 
      this.$refs[formName].resetFields();
    },

    // 删除员工信息
    handleDelete(index, rows) {
      var id = rows.workerId;
      // console.log(rows);
       this.$confirm('此操作将永久删除该员工信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.$axios
        .delete(`/api/worker/${id}`, {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          // console.log(res);
        });
          rows.splice(index, 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

    },
    //   获取所有员工信息
    getAllInfo() {
      this.$axios
        .get("/api/worker", {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          //   console.log(res);
          for (var i = 0; i < res.data.data.length; i++) {
            this.tableData.push(res.data.data[i]);
          }
        });
    }
  }
};
</script>
<style scope>
.all {
  width: 100%;
  height: 100%;
  margin-top: 0;
  position: relative;
  background-color: rgb(223, 233, 221);
}
.otherspace {
  width: 900px;
  height: 30px;
  background-color: rgb(223, 233, 221);
}
.space {
  width: 900px;
  height: 90px;
  margin: 0 auto;
  background-color: rgb(223, 233, 221);
}
.space p {
  line-height: 50px;
  font-weight: 700;
  font-family: STFangsong;
  text-align: center;
  background-color: #fff;
}
.w {
  width: 900px;
  margin: 0 auto;
  height: 100%;
  background-color: rgb(223, 233, 221);
  /* position: absolute;
    top:10px; */
}
.el-table__row .el-button{
  margin:0 3px;
}
</style>
