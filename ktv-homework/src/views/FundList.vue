<template>
  <div class="fundlist">
    <div class="w">
      <el-table :data="tableData">
        <el-table-column label="日期" width="180"  align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="180"  align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>支出/收入: {{ scope.row.inOrOut }}</p>
              <p>资金流动方式: {{ scope.row.way }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.inOrOut }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作"  align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          inOrOut: "收入",
          way: "支付宝"
        },
        {
          date: "2016-05-04",
          inOrOut: "支出",
          way: "支付宝"
        },
        {
          date: "2016-05-01",
          inOrOut: "收入",
          way: "微信"
        },
        {
          date: "2016-05-03",
          inOrOut: "支出",
          way: "现金"
        }
      ]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style scoped>
.fundlist {
  width: 100%;
  height: 100%;
}
.w {
  width: 70%;
  height: 100%;
  margin: 0 auto;
  background-color: pink;
  overflow: hidden;
  min-height: 697px;
}
.el-table{
    margin: 35px auto;
    width: 93%;
}
</style>
