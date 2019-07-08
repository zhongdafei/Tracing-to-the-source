<template>
  <div class="task">
    <div class="tasklist">
      <div class="create">
        <el-button class="add" type="text" @click="dialogFormVisible = true">添加任务</el-button>

        <el-dialog title="添加内容" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="产品Id" :label-width="formLabelWidth">
              <el-input v-model="form.id" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="小拉产量" :label-width="formLabelWidth">
              <el-input v-model="form.xiala" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="绕线产量" :label-width="formLabelWidth">
              <el-input v-model="form.raoxian" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="粗线产量" :label-width="formLabelWidth">
              <el-input v-model="form.cuxian" auto-complete="off"></el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit(scope)">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" sortable width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" :formatter="formatter"></el-table-column>
        <el-table-column
          prop="tag"
          label="标签"
          width="100"
          :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '家' ? 'primary' : 'success'"
              close-transition
            >{{scope.row.tag}}</el-tag>
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
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          tag: "家"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          tag: "公司"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          tag: "家"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          tag: "公司"
        }
      ],
       dialogFormVisible: false,
        form: {
         id:'',
         xiaola:'',
         raoxian:'',
         cuxian:''
        },
        formLabelWidth: '120px'
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    submit(a){
        console.log(a);
    }
  }
};
</script>
<style scoped>
.task {
  width: 100%;
  height: 100%;
  background-color: rgb(223, 233, 221);
  overflow: hidden;
}
.tasklist {
  width: 60%;
  height: 100%;
  background-color: #fff;
  margin: 0 auto;
  overflow: hidden;
}
.create{
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: rgb(223, 233, 221);
}
.create .add{
    font-size: 22px;
    letter-spacing: 3px;
    font-weight: 700;   
    width: 100%;
    text-align: center;
    font-family: STKaiti;
    margin: 0 auto;
}
</style>
