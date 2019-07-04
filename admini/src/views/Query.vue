<template>
  <div class="big">
    <div class="up">
      <div class="title-up">
        <h1>
          未处理订单
          <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
        </h1>
      </div>
      <div class="space"></div>
      <div class="order">
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="orderId" label="订单号" align="center" width="280"></el-table-column>
            <el-table-column prop="producibleId" label="产品ID" align="center" width="280"></el-table-column>
            <el-table-column prop="number" label="数量" align="center" width="60"></el-table-column>
            <el-table-column prop="diameter" label="直径" align="center" width="60"></el-table-column>
            <el-table-column prop="length" label="长度" align="center" width="60"></el-table-column>
            <el-table-column prop="weight" label="重量" align="center" width="60"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" width="160"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center" width="160"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="success"
                  @click="handleEdit(scope.$index, scope.row)"
                >同意</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >拒绝</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>

    <div class="up" style="margin-top:50px;background-color: rgb(223, 233, 221);">
      <div class="title-up">
        <h1>
          已同意订单
          <i class="fa fa-check-square-o" aria-hidden="true"></i>
        </h1>
      </div>
      <div class="space"></div>
      <div class="order">
        <template>
          <el-table :data="doneData" style="width: 100%">
            <el-table-column prop="orderId" label="订单号" align="center" width="300"></el-table-column>
            <el-table-column prop="producibleId" label="产品ID" align="center" width="300"></el-table-column>
            <el-table-column prop="number" label="数量" align="center" width="80"></el-table-column>
            <el-table-column prop="diameter" label="直径" align="center" width="80"></el-table-column>
            <el-table-column prop="length" label="长度" align="center" width="80"></el-table-column>
            <el-table-column prop="weight" label="重量" align="center" width="80"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" width="200"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center" width="200"></el-table-column>
          </el-table>
        </template>
      </div>
    </div>

    <div class="last" style="margin-top:50px;background-color: rgb(186, 222, 240);">
      <div class="title-up">
        <h1>
          已拒絕订单
          <i class="fa fa-window-close" aria-hidden="true"></i>
        </h1>
      </div>
      <div class="space"></div>
      <div class="order">
        <template>
          <el-table :data="refuseData" style="width: 100%">
            <el-table-column prop="orderId" label="订单号" align="center" width="300"></el-table-column>
            <el-table-column prop="producibleId" label="产品ID" align="center" width="300"></el-table-column>
            <el-table-column prop="number" label="数量" align="center" width="80"></el-table-column>
            <el-table-column prop="diameter" label="直径" align="center" width="80"></el-table-column>
            <el-table-column prop="length" label="长度" align="center" width="80"></el-table-column>
            <el-table-column prop="weight" label="重量" align="center" width="80"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" width="200"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center" width="200"></el-table-column>
          </el-table>
        </template>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      // 未处理的订单
      tableData: [],
      tableName: [],
      // 已处理的订单
      doneData: [],
      refuseData: [],
      name:[]
    };
  },
  beforeMount() {
    this.getAllOrderInfo();
    // this.getUserName();
  },
  methods: {
    // 時間轉換函數
    changeTime(obj) {
      let date = new Date(obj);
      let y = date.getFullYear();
      let m = date.getMonth();
      let d = date.getDate();
      let h = date.getHours();
      let f =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
      let s =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
      // console.log(y + "-" + m + "-" + d + "  " + h + ":" + f + ":" + s)
      return y + "-" + m + "-" + d + "  " + h + ":" + f + ":" + s;
    },
    // 获取所有订单信息
    getAllOrderInfo() {
      this.$axios
        .get("/api/order/admin", {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          // console.log(res.data.data);
          let data = res.data.data;
          this.tableData = [];
          this.doneData = [];
          this.refuseData = [];
          for (let x of data) {



            // 未经处理订单
            if (x.status.orderStatus === "CREATE") {
              x.order.createTime = this.changeTime(x.order.createTime);
              x.order.updateTime = this.changeTime(x.order.updateTime);
              // 获取用户name
            //  var name= this.getUserName(x.order.customerId);
              // console.log(name)
              this.tableData.push(x.order);



              // 已接收的订单
            } else if (x.status.orderStatus === "ACCEPT") {
              x.order.createTime = this.changeTime(x.order.createTime);
              x.order.updateTime = this.changeTime(x.order.updateTime);
              this.doneData.push(x.order);



              // 已拒绝的订单
            } else {
              x.order.createTime = this.changeTime(x.order.createTime);
              x.order.updateTime = this.changeTime(x.order.updateTime);
              this.refuseData.push(x.order);
            }
          }
        });
    },
    // 管理员通过客户ID获取用户姓名
    // getUserName(id) {
    //   var that=this;
    //   this.$axios
    //     .get(`/api/customer/${id}`, {
    //       headers: { token: localStorage.getItem("eleToken") }
    //     })
    //     .then(res => {
    //       that.name=res.data.data.name;
    //     });
    //     return that.name;
    // },
    // 同意订单操作
    handleEdit(index, row) {
      console.log(index, row);
      var id = row.orderId;
      this.$axios
        .put(
          `/api/handle/${id}`,
          { status: "ACCEPT" },
          { headers: { token: localStorage.getItem("eleToken") } }
        )
        .then(res => {
          this.getAllOrderInfo();
          this.$message({
            type: "success",
            message: "订单成立!"
          });
        });
    },
    handleDelete(index, row) {
      // console.log(index, row);
      var id = row.orderId;
      this.$axios
        .put(
          `/api/handle/${id}`,
          { status: "REFUSE" },
          { headers: { token: localStorage.getItem("eleToken") } }
        )
        .then(res => {});
      this.getAllOrderInfo();
    }
  }
};
</script>
<style scoped>
.up,
.down,
.last {
  width: 100%;
  max-width: 1350px;
  height: 100%;
  margin: 10px auto;
}
.up {
  background-color: rgb(243, 213, 208);
  width: 100%;
}
.down {
  background-color: rgb(223, 233, 221);
  width: 100%;
}

.title-up,
.title.down {
  width: 100%;
  height: 50px;
}
.title-up > h1,
.title-down > h1 {
  line-height: 50px;
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 18px;
  font-family: STFangsong;
  display: inline-block;
}
.space {
  width: 100%;
  height: 10px;
  background-color: #fff;
}
.order {
  width: 96%;
  margin: 10px auto;
}
/* 表格样式 */
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
