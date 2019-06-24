<template>
  <div class="order">
    <div class="maininfo">
      <el-table :data="items" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品数量">
                  <span>{{ props.row.number }}</span>
              </el-form-item>
              <el-form-item label="商品直径">
                <span>{{ props.row.diameter }}</span>
              </el-form-item>
              <el-form-item label="商品长度">
                <span>{{ props.row.length }}</span>
              </el-form-item>
              <el-form-item label="商品重量">
                <span>{{ props.row.weight }}</span>
              </el-form-item>

              <el-form-item label="更新时间">
                <span>{{ props.row.updateTime }}</span>
              </el-form-item>
              <el-form-item label="操作">
                <el-button size="mini" @click="dialogVisible=true" type="success">修改订单</el-button>

                <el-dialog title="选项框" :visible.sync="dialogVisible"  width="30%">
                  <el-form :model="formLabelAlign">
                    <el-form-item label="产品ID">
                      <el-input v-model="formLabelAlign.producible_id" 
                      ></el-input>
                    </el-form-item>
                    <el-form-item label="选购数量">
                      <el-input v-model="formLabelAlign.number"></el-input>
                    </el-form-item>
                    <el-form-item label="产品直径">
                      <el-input v-model="formLabelAlign.diameter"></el-input>
                    </el-form-item>
                    <el-form-item label="产品长度">
                      <el-input v-model="formLabelAlign.length"></el-input>
                    </el-form-item>
                    <el-form-item label="产品重量">
                      <el-input v-model="formLabelAlign.weight"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        type="primary"
                        @click="submitForm(props.$index, props.row)"
                        style="margin-right:5px"
                      >修改</el-button>
                      <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="商品 ID" prop="orderId"></el-table-column>
        <el-table-column label="所属店铺">生产过程跟踪及产品溯源系统</el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { constants } from "crypto";
export default {
  data() {
    return {
      checked: true,
      num: 1,
      // index1:'',
      dialogVisible: false,
      formLabelAlign: {
        number: "",
        diameter: "",
        length: "",
        weight: "",
        producible_id: ""
      },
      
      // 存放所有订单的所有信息
      items: []
    };
  },
  computer: {},
  beforeMount() {
    this.getCurrentUserOrder();
  },
  methods: {
    getCurrentUserOrder() {
      this.$axios
        .get("/api/order", {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          // console.log(res.data.data);
          for (var i = 0; i < res.data.data.length; i++) {
            this.items.push(res.data.data[i].handle);
          }
          // console.log(this.items[0].handle);
        });
    },
    // 修改订单
    submitForm(index, row) {
      //立即创建
      // console.log(row);
      this.dialogVisible = false;
      var id1 = row.orderId;
      this.$axios
        .put(`/api/order/${id1}`, this.formLabelAlign, {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          console.log(res);
        });
    },
    resetForm() {}
  }
};
</script>

<style scoped>
.order {
  width: 990px;
  height: 100%;
  margin: 20px auto;
  /* background-color: pink; */
}
.fistgood {
  height: 300px;
  background-color: #fff4e8;
  border-top: 1px solid #f1f1f1;
  position: relative;
  margin-bottom: 10px;
}

/* 图片信息 */
.maininfo {
  width: 948px;
  height: 108px;
  margin-left: 42px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.el-form-item .el-button {
  margin-right: 15px;
  margin-left: 15px;
}
/* .el-dialog .el-form-item{
  display: block;
} */
.el-input__inner {
  width: 400px !important;
}
.el-dialog .el-button {
  margin-top: 40px;
}
</style>
