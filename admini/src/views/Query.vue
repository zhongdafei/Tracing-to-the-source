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
            <el-table-column prop="orderId" label="订单Id" width="180"></el-table-column>
            <el-table-column prop="producibleId" label="产品ID" width="180"></el-table-column>
            <el-table-column prop="number" label="数量" width="60"></el-table-column>
            <el-table-column prop="diameter" label="直径" width="60"></el-table-column>
            <el-table-column prop="length" label="长度" width="60"></el-table-column>
            <el-table-column prop="weight" label="重量" width="60"></el-table-column>
            <el-table-column prop="customerId" label="用户Id" width="180"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="180"></el-table-column>
            <el-table-column label="操作">
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
          已处理订单
          <i class="fa fa-check-square-o" aria-hidden="true"></i>
        </h1>
      </div>
      <div class="space"></div>
      <div class="order">
        <template>
          <el-table :data="doneData" style="width: 100%">
            <el-table-column prop="orderId" label="订单Id" width="200"></el-table-column>
            <el-table-column prop="producibleId" label="产品ID" width="200"></el-table-column>
            <el-table-column prop="number" label="数量" width="80"></el-table-column>
            <el-table-column prop="diameter" label="直径" width="80"></el-table-column>
            <el-table-column prop="length" label="长度" width="80"></el-table-column>
            <el-table-column prop="weight" label="重量" width="80"></el-table-column>
            <el-table-column prop="customerId" label="用户Id" width="200"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="200"></el-table-column>
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
      tableData: [
      ],
      // 已处理的订单
      doneData: [],
      refuseData:[],
    };
  },
  beforeMount() {
    this.getAllOrderInfo();
    this.getAllHandledInfo();
  },
  methods: {

    // 获取所有已处理的订单信息
    getAllHandledInfo(){
      // this.$axios.get("/api/handle",{headers:{token:localStorage.getItem("eleToken")}}).then(res=>{
      //   console.log(res);
      // })
    },
    // 获取所有订单信息
    getAllOrderInfo() {
      this.$axios.get("/api/order/admin",{headers:{"token":localStorage.getItem
      ("eleToken")}}).then(res=>{
        // console.log(res.data.data);
        let data = res.data.data;
        this.tableData = [];
        this.doneData = [];
        for(let x of data) {
          if (x.status.orderStatus === 'CREATE') {
            this.tableData.push(x.order);
            // console.log(this.status);
          } else if(x.status.orderStatus === 'ACCEPT'){
              this.doneData.push(x.order);
          }else{
            this.refuseData.push(x.order);
          }
          
        }
        // console.log(this.tableData.length);
      })
    },
    // 同意订单操作
    handleEdit(index, row) {
      // console.log(index, row);
      var id=row.orderId;
      this.$axios.put(`/api/handle/${id}`, { status: "ACCEPT" }, {headers :{token:localStorage.getItem("eleToken")}}).then(res=>{
        // let data = res.data.data;
        // console.log(res);
        this.getAllOrderInfo();
        this.$message({
            type: "success",
            message: "訂單成立!"
          });
      })
     
    },
    handleDelete(index, row) {
      console.log(index, row);
       var id=row.orderId;
      this.$axios.put(`/api/handle/${id}`,{ status: "REFUSE" },{headers :{token:localStorage.getItem("eleToken")}}).then(res=>{
      })
      this.getAllOrderInfo();
    }
  }
};
</script>
<style scoped>
.up,
.down {
  width: 100%;
  height: 100%;
  margin: 10px 10px;
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
