<template>
  <div class="shopcar">
    <div class="fistgood" v-for="(item, index) in items" :key="item.id">
      <div class="maininfo">
        <el-checkbox v-model="item.checked" ></el-checkbox>
        <div class="goodimg">
          <img :src="item.idView" alt>
        </div>
        <div class="goodtitle">
          <p>{{item.title}}</p>
        </div>
        <div class="price">
          <span class="price1">￥{{item.price}}</span>
          <el-input-number
            v-model="items[index].num"
            @change="handleChange(index)"
            size="mini"
            :min="1"
            :max="1000"
            label="描述文字"
          ></el-input-number>
          <span class="total">￥{{item.total}}</span>
          <el-button type="text" @click="open">删除</el-button>
        </div>
      </div>
    </div>
    <div class="zongjia">
      <div class="w">
        <ul>
          <li class="quanxuan">
            <el-checkbox v-model="checked" >全选</el-checkbox>
          </li>
          <li>
            <el-button type="text" @click="empty" class="btn">清空购物车</el-button>
          </li>
          <li class="zongjia1">
            <span>总价：￥{{}}</span>
          </li>
          <li>
            <el-button type="button" @click="accounts">去结算</el-button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checked: false,
      items: this.$store.getters.items,
    };
  },
  computer: {},
  beforeMount() {},
  methods: {
    // total(price) {
    //   return price * 2;
    // },
    handleChange(index) {
      this.items[index].total = this.items[index].num * this.items[index].price;
    },
    // 删除
    open() {
      this.$confirm("此操作将永久删除该商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.items.pop();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    empty() {
      this.$confirm("此操作将永久删除所有商品, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.items.splice(0, this.items.length),
            this.$message({
              type: "success",
              message: "删除成功!"
            });
        })
        .catch(() => {  
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    accounts() {
      // console.log(this.$store.getters.items[this.$store.getters.items.length-1])
    },
   
  }
};
</script>

<style scoped>
.shopcar {
  height: 100%;
  width: 100%;
  margin: 20px auto;
  position: relative;
  /* background-color: pink; */
}
.fistgood {
  height: 109px;
  width: 990px;
  margin: 0 auto;
  background-color: #fff4e8;
  border-top: 1px solid #f1f1f1;
  position: relative;
}
.el-checkbox {
  margin: 10px 10px;
  position: absolute;
  top: 10px;
  left: 15px;
}
/* 图片信息 */
.maininfo {
  width: 948px;
  height: 108px;
  margin-left: 42px;
}
.goodimg {
  width: 121px;
  height: 108px;
  padding: 4px 0;
  position: absolute;
  top: 0;
  display: inline-block;
}
.goodimg img {
  height: 101px;
  width: 101px;
  margin: 0 10px;
  /* display: inline-block; */
  vertical-align: text-top;
}
.goodtitle {
  display: inline-block;
  width: 300px;
  height: 108px;
  margin-top: 5px;
  position: absolute;
  top: 6px;
  left: 158px;
}
.goodtitle p {
  text-indent: 1.5em;
  font-size: 12px;
  line-height: 20px;
  /* display: inline-block; */
  overflow: hidden;
}
/* 价格信息 */
.price {
  width: 400px;
  height: 108px;
  float: right;
}
.price span {
  display: inline-block;
  line-height: 108px;
  margin: 0 10px;
}
.el-input-number {
  margin: 0 10px;
}
.el-button {
  margin: 10px 20px;
}
/* 总价格 */
.zongjia {
  position: fixed;
  bottom: 10px;
  width: 100%;
  height: 60px;
  z-index: 999;
  box-shadow: 0 -1px 8px rgba(0, 1, 1, 0.08);
}
.w {
  width: 990px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.zongjia li {
  line-height: 100%;
  display: inline-block;
  white-space: nowrap;
}
.quanxuan {
  width: 100px;
  float: left;
  height: 60px;
}
.zongjia1{
  height: 60px;
}
.zongjia1 span{
  display: inline-block;
  line-height: 60px;
  margin-left: 500px ;
  margin-right: 30px;
}

</style>
