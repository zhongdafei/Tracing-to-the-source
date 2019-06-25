<template>
  <div class="all">
    <div class="w">
      <div class="otherspace"></div>
      <div class="space">
        <p>所有員工信息</p>
      </div>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="name" label="姓名" width="150"></el-table-column>
        <el-table-column prop="phone" label="电话" width="120"></el-table-column>
        <el-table-column prop="workerId" label="工号" width="300"></el-table-column>
        <el-table-column prop="department" label="部门" width="120"></el-table-column>
        <el-table-column prop="post" label="身份" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  beforeMount() {
    this.getAllInfo();
  },
  methods: {
    deleteRow(index, rows) {
      // console.log();
      //
      var id = rows[index].workerId;
      this.$axios
        .delete(`/api/worker/${id}`, {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          // console.log(res);
           this.$confirm('此操作将永久删除该员工信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
  },
  data() {
    return {
      tableData: []
    };
  }
};
</script>
<style scope>
.all {
  width: 100%;
  height: 200%;
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
  height: 900px;
  background-color: rgb(223, 233, 221);
  /* position: absolute;
    top:10px; */
}
</style>
