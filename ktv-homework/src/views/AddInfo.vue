<template>
  <div class="addinfo">
    <div class="infolist">
      <div class="slip">
      <p>员工信息表</p>
      </div>
    </div>
    <div class="w">
      <div class="form">
        <el-table :data="tableData" stripe border style="width: 100%">
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" width="80" align="center"></el-table-column>
          <el-table-column prop="age" label="年龄" width="80" align="center"></el-table-column>
          <el-table-column prop="tel" label="电话" width="120" align="center"></el-table-column>
          <el-table-column prop="QQ" label="QQ号" width="120" align="center"></el-table-column>
          <el-table-column prop="money" label="月工资" width="100" align="center"></el-table-column>
          <el-table-column prop="adr" label="地址" width="180" align="center"></el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>

              <!-- 编辑弹框 -->
              <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="form.age" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.tel" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="QQ号" :label-width="formLabelWidth">
                    <el-input v-model="form.QQ" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="form.adr" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="月工资" :label-width="formLabelWidth">
                    <el-input v-model="form.money" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submit(scope.$index, scope.row)">确 定</el-button>
                </div>
              </el-dialog>
              
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="add">
      <p>添加员工</p>
      <el-button icon="el-icon-plus" circle @click="dialogInfoFormVisible=true"></el-button>
       <!-- 编辑弹框 -->
              <el-dialog title="添加员工信息" :visible.sync="dialogInfoFormVisible" append-to-body>
                <el-form >
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form1.name" autocomplete="on"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="form1.sex" autocomplete="on"></el-input>
                  </el-form-item>
                  <el-form-item label="年龄" :label-width="formLabelWidth">
                    <el-input v-model="form1.age" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form1.tel" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="QQ号" :label-width="formLabelWidth">
                    <el-input v-model="form1.QQ" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="form1.adr" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="月工资" :label-width="formLabelWidth">
                    <el-input v-model="form1.money" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submit1()">确 定</el-button>
                </div>
              </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "王小虎",
          sex: "男",
          age: "18",
          tel: 18870772880,
          QQ: 1903044057,
          money: 3000,
          adr: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          sex: "女",
          age: "26",
          tel: 18870772880,
          QQ: 1903044057,
          money: 3000,
          adr: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          sex: "女",
          age: "30",
          tel: 18870772880,
          QQ: 1903044057,
          money: 3000,
          adr: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "王小虎",
          sex: "男",
          age: "18",
          tel: 18870772880,
          QQ: 1903044057,
          money: 3000,
          adr: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      dialogFormVisible: false,
      dialogInfoFormVisible: false,
      form: {
        age: "",
        tel: "",
        QQ: "",
        adr: "",
        money: "",
        type: []
      },
      form1: {
        name:"",
        sex:"",
        age: "",
        tel: "",
        QQ: "",
        adr: "",
        money: "",
      },
      formLabelWidth: "60px"
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      console.log(index, row);
    },
    // 修改信息提交
    submit(index, row) {
      this.dialogFormVisible = false;
      console.log(index, row);
    },
    // 添加信息提交
    submit1(){
      this.dialogInfoFormVisible=false;
      this.tableData.push(this.form1);
      this.form1=[];
    }
  }
};
</script>

<style scoped>
.addinfo {
  width: 100%;
  height: 100%;
  min-height: 697px;
  background-color: #fdfcf8;
  overflow: hidden;
  position: relative;
}
.w {
  width: 1000px;
  height: 100%;
  background-color: blue;
  overflow: hidden;
  margin: 40px auto;
}
.add{
  width: 130px;
  height: 150px;
  background-color: #b1b479;
  border-radius: 50px;
  position: fixed;
  top: 100px;
  right: 100px;
  animation: myadd 10s linear infinite alternate;
}
@keyframes myadd {
  0%{
    top: 15%;
    right: 5%;
  }
  100%{
    top: 75%;
    right: 5%;
  }
}
.add p{
  display: block;
  width: 130px;
  height: 70px;
  line-height: 70px;
  font-size: 24px;
  /* background-color: #fff; */
  text-align: center;
  font-family: STKaiti;
}
.add .el-button{
  margin: 0% 36%;
}
.infolist{
  position: fixed;
  top: 200px;
  left: 100px;
  width: 100px;
  height: 300px;
  background-color: #b1b479;
  display:inline-block;
  border-radius: 50px;
  transition: 1s ease-in-out ;
}
.infolist:hover,.infolist p:hover{
  transform: rotate(360deg);
}
.slip{
  width: 24px;
  height: 300px;
  position: fixed;
  left: 135px;
  /* background-color: pink; */
}
.infolist p{
  position: absolute;
  display:inline-block; 
  font-size: 24px;
  font-family: STKaiti;
  margin-top: 70px;
  color:forestgreen;
}
</style>
