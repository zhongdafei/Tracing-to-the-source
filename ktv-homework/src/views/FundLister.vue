<template>
  <div class="demo">
    <el-table ref="filterTable" :data="tableData" style="width: 100%">
      <el-table-column label="日期" width="180" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="inOrOut"
        label="收支"
        width="100"
        :filters="[{ text: '收入', value: '收入' }, { text: '支出', value: '支出' }]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.inOrOut === '收入' ? 'primary' : 'danger'"
            disable-transitions
          >{{scope.row.inOrOut}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="数额" width="180" align="center">
        <template slot-scope="scope">
          <i class="fa fa-usd" aria-hidden="true"></i>
          <span style="margin-left: 10px">{{ scope.row.number}}</span>
        </template>
      </el-table-column>

      <el-table-column
        prop="way"
        label="支付方法"
        width="100"
        :filters="[{ text: '支付宝', value: '支付宝' }, { text: '微信', value: '微信' }]"
        :filter-method="filterWay"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.way === '支付宝' ? 'primary' : 'success'"
            disable-transitions
          >{{scope.row.way}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
          number: "+5",
          way: "支付宝"
        },
        {
          date: "2016-05-04",
          inOrOut: "支出",
          number: "-15",
          way: "支付宝"
        },
        {
          date: "2016-05-01",
          inOrOut: "收入",
          number: "+25",
          way: "微信"
        },
        {
          date: "2016-05-03",
          inOrOut: "支出",
          number: "-25",
          way: "微信"
        }
      ]
    };
  },
  methods: {
    filterTag(value, row) {
      return row.inOrOut === value;
    },
    filterWay(value, row) {
      return row.way === value;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>