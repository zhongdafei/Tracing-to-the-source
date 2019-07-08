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

              <!-- 重新编辑员工信息编辑弹框   form-->
              <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="form.sex" autocomplete="off"></el-input>
                  </el-form-item>
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
                <div>
                  <el-button type="primary" @click="submit(scope.row)">确 定</el-button>
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
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
      <!-- 添加员工编辑弹框   form1-->
      <el-dialog title="添加员工信息" :visible.sync="dialogInfoFormVisible" append-to-body>
        <el-form>
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
import { constants } from "crypto";
export default {
  data() {
    return {
      index: "",
      tableData: [
        {
          name: "王二小",
          sex: "男",
          age: "18",
          tel: 18870772580,
          QQ: 3044057,
          money: 3000,
          adr: "上海市普陀区金沙江路 1518 弄"
        },
        {
          name: "李晓明",
          sex: "女",
          age: "26",
          tel: 18870662880,
          QQ: 9044057,
          money: 3000,
          adr: "江西理工大学应用科学学院"
        },
        {
          name: "上官大婷",
          sex: "女",
          age: "20",
          tel: 18870772369,
          QQ: 1903557,
          money: 3000,
          adr: "江西省上饶市鄱阳县"
        },
        {
          name: "黎明",
          sex: "男",
          age: "40",
          tel: 18870772880,
          QQ: 1903044057,
          money: 3000,
          adr: "北京市普陀区金沙江路 1518 弄"
        }
      ],
      dialogFormVisible: false,
      dialogInfoFormVisible: false,
      form: {
        name: "",
        sex: "",
        age: "",
        tel: "",
        QQ: "",
        adr: "",
        money: "",
        type: []
      },
      form1: {
        name: "",
        sex: "",
        age: "",
        tel: "",
        QQ: "",
        adr: "",
        money: ""
      },
      formLabelWidth: "60px"
    };
  },
  methods: {
    handleEdit(index, row) {
      this.dialogFormVisible = true;
      // console.log(index, row);
      this.index = index;
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      // console.log(index, row);
    },
    // 修改信息提交
    submit(row) {
      // console.log(row, this.index,this.tableData);
      this.dialogFormVisible = false;
      if (!this.form.name == "") {
        this.tableData[this.index].name = this.form.name;
        this.tableData[this.index].sex = this.form.sex;
        this.tableData[this.index].age = this.form.age;
        this.tableData[this.index].tel = this.form.tel;
        this.tableData[this.index].QQ = this.form.QQ;
        this.tableData[this.index].adr = this.form.adr;
        this.tableData[this.index].money = this.form.money;
      }
      this.form.name = this.form.sex = this.form.age = this.form.tel = this.form.adr = this.form.money = this.form.QQ =
        "";
    },
    // 添加信息提交
    submit1() {
      this.dialogInfoFormVisible = false;
      this.tableData.push(this.form1);
      this.form1 = [];
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
.add {
  width: 150px;
  height: 150px;
  background-color: #b1b479;
  border-radius: 30px;
  position: fixed;
  top: 100px;
  right: 100px;
  animation: myadd 10s linear infinite alternate;
}
@keyframes myadd {
  0% {
    top: 15%;
    right: 5%;
  }
  100% {
    top: 75%;
    right: 5%;
  }
}
.add p {
  display: block;
  width: 150px;
  height: 70px;
  line-height: 70px;
  font-size: 24px;
  /* background-color: #fff; */
  text-align: center;
  font-family: STKaiti;
}
.add .el-button {
  margin: 0% 36%;
}
.infolist {
  position: relative;
  float: left;
  top: 200px;
  left: 100px;
  width: 100px;
  height: 300px;
  background-color: #b1b479;
  /* display:inline-block; */
  border-radius: 50px;
  transition: 1s ease-in-out;
}
.infolist:hover,
.infolist p:hover {
  transform: rotate(360deg);
}
.slip {
  width: 24px;
  height: 300px;
  float: left;
  position: relative;
  left: 40px;
  /* background-color: pink; */
}
.infolist p {
  position: absolute;
  display: inline-block;
  font-size: 24px;
  font-family: STKaiti;
  margin-top: 70px;
  color: forestgreen;
}
</style>
