<template>
  <div class="home">
    <div class="container">
      <!-- 轮播图 -->
      <div class="lunbotu">
        <el-carousel indicator-position="outside" :interval="4000" height="400px">
          <el-carousel-item v-for="item in images" :key="item.id">
            <img :src="item.idView" alt>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 产品列表 -->
      <div class="goodlist">
        <div class="goods">
          <div class="firstgood" v-for="(item1,index) in items" :key="item1.id">
            <div>
              <img :src="item1.image" alt>
            </div>
            <h3>{{item1.name}}</h3>
            <p>{{item1.producibleDesc}}</p>

            <div class="btn">
              <!-- 查看信息 -->
              <el-button type="info" icon="el-icon-info" circle @click="info(index)"></el-button>
              <!-- 加入购物车 -->

              <!-- 下单 -->
              <div>
                <el-button type="success" icon="el-icon-s-claim" circle @click="dialogVisible=true"></el-button>

                <el-dialog title="选项框" :visible.sync="dialogVisible" width="30%">
                  <el-form
                    :label-position="labelPosition"
                    label-width="80px"
                    :model="formLabelAlign"
                  >
                    <!-- <el-form-item label="产品ID">
                      <el-input v-model="formLabelAlign.producible_id"></el-input>
                    </el-form-item>-->
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
                      <el-button type="primary" @click="submitForm('ruleForm',item1, index)">提交</el-button>
                      <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="center">
          <!-- 电话 邮箱 地址 -->
          <p>电话：18870072550</p>
          <p>邮箱：18870072550@qq.com</p>
          <p>地址：江西理工大学应用科学学院</p>
        </div>
      </div>
      <!-- 回到顶部 -->
      <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
    </div>
  </div>
</template>
<script>
import { constants } from "crypto";
export default {
  // name: "home",
  data() {
    return {
      labelPosition: "right",
      dialogVisible: false,
      formLabelAlign: {
        number: "",
        diameter: "",
        length: "",
        weight: "",
        producible_id: ""
      },
      formLabelWidth: "120px",
      // 轮播图
      images: [
        { id: 0, idView: require("../assets/tongsi.jpg") },
        { id: 1, idView: require("../assets/tongzhu.jpg") },
        { id: 2, idView: require("../assets/tongbang.jpg") },
        { id: 3, idView: require("../assets/tongpian.jpg") }
      ],
      // 产品列表
      items: []
    };
  },

  computed: {},
  beforeMount() {
    this.getAllProductList();
  },
  methods: {
    // 加载所有可上架商品信息
    getAllProductList() {
      this.$axios.get("/api/producible").then(res => {
        // console.log(res.data.data);
        for (var i = 0; i < res.data.data.length; i++) {
          this.items.push(res.data.data[i]);
        }
      });
    },
    // 加载商品信息
    info(index) {
      const h = this.$createElement;
      this.$msgbox({
        title: "详细信息",
        message: h("p", null, [
          h("span", null, "名称:" + this.items[index].name),
          h("br", null, null),
          h("span", null, "type:" + this.items[index].type),
          h("br", null, null),
          h("span", null, "商品ID:" + this.items[index].producibleId)
        ]),
        confirmButtonText: "确定"
      });
    },
    // 将表单提交
    submitForm(formName, item, index) {
      //立即创建
      this.dialogVisible = false;
      this.formLabelAlign.producible_id = this.items[index].producibleId;
      this.$axios
        .post("/api/order", this.formLabelAlign, {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          this.formLabelAlign.number = this.formLabelAlign.diameter = this.formLabelAlign.length = this.formLabelAlign.weight =
            "";
          this.$message({
            message: "恭喜你，下单成功",
            type: "success"
          });
          // console.log(res);
        });
    },
    resetForm(formName) {
      //重置
      
       this.formLabelAlign.number = this.formLabelAlign.diameter = this.formLabelAlign.length = this.formLabelAlign.weight ="";
    }
  }
};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
}
.container {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
/* 轮播图 */
.lunbotu{
  width: 100%;
  height: 400px;
}
.lunbotu::-webkit-scrollbar{
  display: none;
}
.lunbotu img {
  width: 100%;
  height: 400px;
}
.el-carousel__item h3 {
  margin: 0 auto;
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item p {
  display: inline-block;
  overflow: hidden;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/* card产品展示 */
.goodlist {
  height: 120%;
  width: 1200px;
  margin: 0 auto;
  display: inline-block;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.goods {
  margin: 20px auto;
  width: 1200px;
}
.goodlist .firstgood {
  width: 230px;
  height: 370px;
  margin-top: 10px;
  margin-left: 40px;
  border: 1px solid #ccc;
  padding: 10px 9px;
  display: inline-block;
}
.goodlist .firstgood img {
  width: 220px;
  height: 220px;
}
.goodlist .firstgood > div {
  width: 220px;
  height: 220px;
  margin: 5px auto;
  vertical-align: middle;
}
.firstgood h3 {
  font-size: 20px;
  height: 22px;
  display: inline-block;
  color: #e4393c;
  margin: 8px 0 8px;
}
.firstgood p {
  color: #666;
  font-size: 14px;
  letter-spacing: 0.3ch;
  margin: 0 0 10px;
  height: 40px;
  text-indent: 1.5em;
}
.time {
  font-size: 13px;
  color: #999;
}
.goodlist .firstgood .btn {
  width: 220px;
  height: 50px;
  line-height: 65px;
}
button.el-button.el-button {
  margin: 0 33px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.bottom el-button {
  margin-top: 5px;
}
.button {
  padding: 0;
  float: right;
}
.btn div {
  display: inline-block;
}
.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
/* 底部 */
.footer{
    width: 100%;
    height: 100px;
    background-color:rgba(7, 7, 7, 0.5);
}
.footer .center{
  width: 30%;
  height: 100%;
  /* background-color: pink; */
  margin: 0 auto;
}
.center p{
  display: block;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #ccc;
  font-family: STFangsong;
}
.center p.hover{
  cursor:pointer;
}
</style>
