<template>
  <div class="fundlist">
    <div class="w">
      <el-table :data="tableData" style="width: 100%">
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

            <el-dialog :visible.sync="dialogInfoFormVisible" append-to-body>
              <el-form>
                <el-form-item label="时间" :label-width="formLabelWidth">
                  <!-- <el-input v-model="inputData.date" autocomplete="on"></el-input> -->
                  <el-date-picker
                    v-model="inputData.date"
                    align="top"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                  ></el-date-picker>
                </el-form-item>
                <el-form-item label="收支" :label-width="formLabelWidth">
                  <!-- <el-input v-model="inputData.inOrOut" autocomplete="on"></el-input> -->
                  <el-select v-model="inputData.inOrOut" placeholder="收支">
                    <el-option label="收入" value="收入"></el-option>
                    <el-option label="支出" value="支出"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="数额" :label-width="formLabelWidth">
                  <el-input v-model="inputData.number" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="支付方式" :label-width="formLabelWidth">
                  <!-- <el-input v-model="inputData.way" autocomplete="off"></el-input> -->
                  <el-select v-model="inputData.way" placeholder="支付方式">
                    <el-option label="微信" value="微信"></el-option>
                    <el-option label="支付宝" value="支付宝"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit(scope)">确 定</el-button>
              </div>
            </el-dialog>

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
      dialogInfoFormVisible: false,
      formLabelWidth: "80px",
      index: "",
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
      ],
      inputData: {
        date: "",
        number: "",
        inOrOut: "",
        way: ""
      },
      // 日期选择
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  methods: {
    // 時間轉換函數
    changeTime(obj) {
      let date = new Date(obj);
      let y = date.getFullYear();
      let m =
        date.getMonth() + 1 >= 10 ? date.getMonth() : "0" + date.getMonth();
      let d = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();

      return y + "-" + m + "-" + d;
    },
    // 收支标签
    filterTag(value, row) {
      return row.inOrOut === value;
    },
    // 支付方式标签
    filterWay(value, row) {
      // console.log(value, row);
      return row.way === value;
    },
    // 编辑方法
    handleEdit(index, row) {
      this.dialogInfoFormVisible = true;
      this.index = index;
      // console.log(index, row);
    },
    // 删除的方法
    handleDelete(index, row) {
      // console.log(index, row);
      this.tableData.splice(index, 1);
    },
    submit(index, row) {
      this.dialogInfoFormVisible = false;
      // console.log(this.tableData[this.index].date)
      this.tableData[this.index].date = this.changeTime(this.inputData.date);
      this.tableData[this.index].inOrOut = this.inputData.inOrOut;
      this.tableData[this.index].number = this.inputData.number;
      this.tableData[this.index].way = this.inputData.way;
      this.inputData = [];
    }
  }
};
</script>
<style scoped>
.fundlist {
  width: 100%;
  height: 100%;
  background-color: #e2d8b036;
}
.w {
  width: 70%;
  height: 100%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fdfcf8;
  overflow: hidden;
  min-height: 697px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.55), 0 0 6px rgba(0, 0, 0, 0.04);
}
.el-table {
  margin: 35px auto;
  width: 90%;
}
.el-dialog{
  width: 25%!important;
}
</style>
