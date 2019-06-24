<template>
  <div class="fillContainer">
    <div class="table_container">
      <el-table v-id="tableData.length>0" :data="tableData" max-height="450" style="width: 100%">
        <el-table-column type="index" align="center" label="序号" width="70"></el-table-column>
        <el-table-column prop="data" align="center" label="创建时间" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
      
        <el-table-column prop="income" align="center" label="收入" width="170">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" align="center" label="支出" width="170">
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" align="center" label="账户现金" width="170">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" align="center" label="备注" width="220"></el-table-column>
        <el-table-column label="操作" prop="operation" align="center" fixed="right" width="320">
          <template slot-scope="scope">
            <el-button
              type="warning"
              size="small"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              ico="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "fundList",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      // this.$axios
      // .get("/api/profiles")
      // .then(res => {
      //   //   console.log(res);
      //   this.tableData = res.data;
      // })
      // .catch(err => {
      //   console.log(err);
      // });
    },
    handleEdit(index, row) {},
    handleDelete(index, row) {}
  }
};
</script>

<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
