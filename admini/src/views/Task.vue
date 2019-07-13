<template>
  <div class="task">
    <div class="tasklist">
      <div class="create">

        <el-button class="add" type="text" @click="dialogFormVisible = true"> 添加任务</el-button>


        <el-dialog title="添加内容" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="任务单号" :label-width="formLabelWidth">
              <el-input v-model="form.taskId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="定单号" :label-width="formLabelWidth">
              <el-input v-model="form.orderId" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="原产量" :label-width="formLabelWidth">
              <el-input v-model="form.priority" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="小卷" :label-width="formLabelWidth">
              <el-input v-model="form.third" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="中卷" :label-width="formLabelWidth">
              <el-input v-model="form.second" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="大卷" :label-width="formLabelWidth">
              <el-input v-model="form.first" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="最后期限" :label-width="formLabelWidth">
              <div class="block">
                <el-date-picker v-model="form.deadline" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
              </div>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>



      </div>
      <!-- 输入框 -->
      <el-input popper-class="my-autocomplete" placeholder="请输入任务号，查询进度" v-model="state3">
        <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick">
        </i>
      </el-input>
      <div class="space"></div>
      <el-table :data="tableData" style="width: 100%" max-height="500" height="380">
        <el-table-column prop="taskId" label="任务号" sortable width="100" align="center"></el-table-column>
        <el-table-column prop="deadline" label="截止日期" sortable width="150" align="center"></el-table-column>
        <el-table-column prop="priority" label="产品数量" width="80" align="center"></el-table-column>
        <el-table-column prop="first" label="大卷" width="70" align="center"></el-table-column>
        <el-table-column prop="second" label="中卷" width="70" align="center"></el-table-column>
        <el-table-column prop="third" label="小卷" width="70" align="center"></el-table-column>
        <el-table-column prop="creatTime" label="创建时间" sortable width="180" align="center"></el-table-column>
        <el-table-column prop="orderId" label="订单号" width="180" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        form: {
          taskId: '',
          orderId: '',
          priority: '',
          first: '',
          second: '',
          third: '',
          deadline: ''
        },
        formLabelWidth: '120px',
        state3: ''
      };
    },
    beforeMount() {
      this.getTaskList();
    },
    methods: {
      // 時間轉換函數
      changeTime(obj) {
        let date = new Date(obj);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();
        let h = date.getHours();
        let f =
          date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
        let s =
          date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
        // console.log(y + "-" + m + "-" + d + "  " + h + ":" + f + ":" + s)
        return y + "-" + m + "-" + d + "  " + h + ":" + f + ":" + s;
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      // 创建一个任务清单
      submit() {
        // getTime()时间戳转换
        this.form.deadline = this.form.deadline.getTime();
        if (this.form.orderId === '') {
          this.form.orderId = 1;
        }
        // console.log(this.form.deadline);
        this.$axios.post("/api/task", this.form, {
          headers: { token: localStorage.getItem("eleToken") }
        })
          .then(res => {
            if (res.data.code == 200) {
              this.tableData.push(res.data);
              // console.log(this.tableData);
              this.$message({
                message: "创建成功!",
                type: "success"
              })
            }
            // console.log(res);
          }),
          this.dialogFormVisible = false;
      },
      // 获取所有任务列表
      getTaskList() {
        this.$axios
          .get("/api/task", {
            headers: { token: localStorage.getItem("eleToken") }
          })
          .then(res => {
            // this.tableData.push(res.data.data);
            res.data.data.forEach(element => {
              element.creatTime = this.changeTime(element.creatTime);
              element.deadline = this.changeTime(element.deadline);
              // console.log(element.creatTime)
              this.tableData.push(element);
            });
            // console.log(this.tableData);
          })
      },
      // 通过taskid 查询生产进度
      handleIconClick(ev) {
        var taskId = this.state3;
        this.$axios.get(`/api/task/${taskId}/process`, {
          headers: { token: localStorage.getItem("eleToken") }
        }).then(
          res => {
            // console.log(res.data.data);
            if (res.data.data.first === null && res.data.data.second === null && res.data.data.third === null) {
              const h = this.$createElement;

              this.$notify({
                title: '提示',
                message: h('i', { style: 'color: teal' }, '还未开始生产，请耐心等待！')
              });

            } else {
              const h = this.$createElement;

              this.$notify({
                title: '生产进度',
                dangerouslyUseHTMLString: true,
                message: '</br><p>工序一</p></br><h1>已生产数量:' + res.data.data.first.doneNum + '</h1><h1>更新时间：' + this.changeTime(res.data.data.first.uploadTime) + '</h1></br><p>工序二</p></br><h1>已生产数量:' + res.data.data.second.doneNum + '</h1><h1>更新时间：' + this.changeTime(res.data.data.second.uploadTime) + '</h1></br><p>工序三</p></br><h1>已生产数量:' + res.data.data.third.doneNum + '</h1><h1>更新时间：' + this.changeTime(res.data.data.third.uploadTime) + '</h1>',
                duration: 0
              });
            }
          })
        // console.log(ev);
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
    width: 85%;
    height: 100%;
    background-color: #fff;
    margin: 0 auto;
    overflow: hidden;
  }

  .create {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: rgb(223, 233, 221);
  }

  .create .add {
    font-size: 22px;
    letter-spacing: 3px;
    font-weight: 700;
    width: 100%;
    text-align: center;
    font-family: STKaiti;
    margin: 0 auto;
  }

  .space {
    width: 100%;
    height: 10px;
  }
</style>