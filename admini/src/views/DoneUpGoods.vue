<template>
  <div class="all">
    <div class="center">
      <div class="otherspace"></div>
      <div class="space">
        <p>所有已上架商品信息</p>
      </div>
      <el-table :data="tableData">
        <el-table-column label="序号" width="60">
          <template slot-scope="scope">
            <span style="margin-left: 10px;">
              <p style="text-align: center;">{{ scope.$index+1 }}</p>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="图片" width="160">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              <img :src="scope.row.image" width="100" height="100" alt>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>产品姓名: {{ scope.row.name }}</p>
              <p>产品 ID: {{ scope.row.producibleId }}</p>
              <p>产品规格: {{ scope.row.type }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="产品描述" width="220">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              <p>{{ scope.row.producibleDesc }}</p>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除该产品</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { constants } from "crypto";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  beforeMount() {
    this.getAllProductList();
  },
  methods: {
    getAllProductList() {
      this.$axios.get("/api/producible").then(res => {
        // console.log(res.data.data);
        for (var i = 0; i < res.data.data.length; i++) {
          this.tableData.push(res.data.data[i]);
        }
      });
    },
    // 删除产品信息

    handleDelete(index, row) {
      //   console.log(row);
      var id = row.producibleId;
      this.$axios
        .delete(`/api/producible/${id}`, {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          console.log(res);
           this.$confirm('此操作将永久删除该商品信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData.splice(index, 1);
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
    }
  }
};
</script>
<style scoped>
.center {
  width: 900px;
  height: 100%;
  margin: 0px auto;
}

.all {
  width: 100%;
  height: 210%;
  margin-top: 0;
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
.el-table td,
.el-table th {
  text-align: center !important;
  overflow: hidden;
}
.el-button {
  margin: 12px !important;
}
</style>
