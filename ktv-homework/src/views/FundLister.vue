<template>
  <div class="home">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
      <el-tab-pane name="first">
        <span slot="label">
          <i class="el-icon-loading"></i> 小间
        </span>
        <div class="small-rooms" >
          <div class="first-sr" v-for="(item,index) in tableData" :key="item.id">
            <!-- 序号 -->
            <div class="serial" >{{item.id}}</div>
            <!-- 更新 -->
            <div class="updata" @click="clean(index)">
              <i class="el-icon-refresh" style="font-size:22px"></i>
            </div>
            <!-- 计时器 -->
            <div class="time">
              <Timer></Timer>
            </div>
            <!-- 内容 -->
            <div class="content">
              <ul>
                <li>可容纳6人</li>
                <li>标价10元每小时</li>
              </ul>
            </div>
            <!-- 按钮 -->
            <div class="btn">
            <el-button 
            plain
            :type="item.fullbtn === '已满'?'danger':'primary'" 
            :disabled="item.fullbtn === '空'? false : true "
            disable-transitions
            @click="full(index)">{{item.fullbtn}}</el-button>
            <el-button 
            plain
            :type="item.orderbtn === '已预定'?'danger':'success'" 
            :disabled="item.orderbtn === '预定'? false : true "
            disable-transitions
            @click="order(index)">{{item.orderbtn}}</el-button>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="中间" name="second">
         <div class="small-rooms" >
          <div class="second-sr" v-for="(item,index) in formData" :key="item.id">
            <!-- 序号 -->
            <div class="serial" >{{item.id}}</div>
            <!-- 更新 -->
            <div class="updata" @click="formclean(index)">
              <i class="el-icon-refresh" style="font-size:22px"></i>
            </div>
            <!-- 计时器 -->
            <div class="time">
              <Timer></Timer>
            </div>
            <!-- 内容 -->
            <div class="content">
              <ul>
                <li>可容纳10人</li>
                <li>标价15元每小时</li>
              </ul>
            </div>
            <!-- 按钮 -->
            <div class="btn">
            <el-button 
            plain
            :type="item.fullbtn === '已满'?'danger':'primary'" 
            :disabled="item.fullbtn === '空'? false : true "
            disable-transitions
            @click="formfull(index)">{{item.fullbtn}}</el-button>
            <el-button 
            plain
            :type="item.orderbtn === '已预定'?'danger':'success'" 
            :disabled="item.orderbtn === '预定'? false : true "
            disable-transitions
            @click="formorder(index)">{{item.orderbtn}}</el-button>
            </div>
          </div>
         </div>
      </el-tab-pane>
      <el-tab-pane label="大间" name="third">
         <div class="small-rooms" >
          <div class="third-sr" v-for="(item,index) in bigData" :key="item.id">
            <!-- 序号 -->
            <div class="serial" >{{item.id}}</div>
            <!-- 更新 -->
            <div class="updata" @click="bigclean(index)">
              <i class="el-icon-refresh" style="font-size:22px"></i>
            </div>
            <!-- 计时器 -->
            <div class="time">
              <Timer></Timer>
            </div>
            <!-- 内容 -->
            <div class="content">
              <ul>
                <li>可容纳15人</li>
                <li>标价20元每小时</li>
              </ul>
            </div>
            <!-- 按钮 -->
            <div class="btn">
            <el-button 
            plain
            :type="item.fullbtn === '已满'?'danger':'primary'" 
            :disabled="item.fullbtn === '空'? false : true "
            disable-transitions
            @click="bigfull(index)">{{item.fullbtn}}</el-button>
            <el-button 
            plain
            :type="item.orderbtn === '已预定'?'danger':'success'" 
            :disabled="item.orderbtn === '预定'? false : true "
            disable-transitions
            @click="bigorder(index)">{{item.orderbtn}}</el-button>
            </div>
          </div>
         </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Timer from "./Timer";
export default {
  components: { Timer },
  data() {
    return {
      activeName: "first",
      tableData: [
        { id: 1, fullbtn: "空", orderbtn: "预定"},
        { id: 2, fullbtn: "空", orderbtn: "预定"},
        { id: 3, fullbtn: "空", orderbtn: "预定"},
        { id: 4, fullbtn: "空", orderbtn: "预定"},
        { id: 5, fullbtn: "空", orderbtn: "预定"},
        { id: 6, fullbtn: "空", orderbtn: "预定"},
        { id: 7, fullbtn: "空", orderbtn: "预定"},
        { id: 8, fullbtn: "空", orderbtn: "预定"},
        ],
      formData: [
        { id: 1, fullbtn: "空", orderbtn: "预定"},
        { id: 2, fullbtn: "空", orderbtn: "预定"},
        { id: 3, fullbtn: "空", orderbtn: "预定"},
        { id: 4, fullbtn: "空", orderbtn: "预定"},
        { id: 5, fullbtn: "空", orderbtn: "预定"},
        { id: 6, fullbtn: "空", orderbtn: "预定"},
        ],
      bigData: [
        { id: 1, fullbtn: "空", orderbtn: "预定"},
        { id: 2, fullbtn: "空", orderbtn: "预定"},
        { id: 3, fullbtn: "空", orderbtn: "预定"},
        { id: 4, fullbtn: "空", orderbtn: "预定"}
        ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 小间
    full(index){
      if(this.tableData[index].fullbtn === "空"){
        this.tableData[index].fullbtn = "已满";
        this.tableData[index].orderbtn = "已满";
      }
    },
    order(index){
      if(this.tableData[index].orderbtn === "预定"){
        this.tableData[index].orderbtn = "已预定";
        this.tableData[index].fullbtn = "已预定";
      }
    },
    clean(index){
      this.tableData[index].orderbtn="预定";
      this.tableData[index].fullbtn = "空";
    },
    // 中间
    formfull(index){
      if(this.formData[index].fullbtn === "空"){
        this.formData[index].fullbtn = "已满";
        this.formData[index].orderbtn = "已满";
      }
    },
    formorder(index){
      if(this.formData[index].orderbtn === "预定"){
        this.formData[index].orderbtn = "已预定";
        this.formData[index].fullbtn = "已预定";
      }
    },
    formclean(index){
      this.formData[index].orderbtn="预定";
      this.formData[index].fullbtn = "空";
    },
    // 大间
    bigfull(index){
      if(this.bigData[index].fullbtn === "空"){
        this.bigData[index].fullbtn = "已满";
        this.bigData[index].orderbtn = "已满";
      }
    },
    bigorder(index){
      if(this.bigData[index].orderbtn === "预定"){
        this.bigData[index].orderbtn = "已预定";
        this.bigData[index].fullbtn = "已预定";
      }
    },
    bigclean(index){
      this.bigData[index].orderbtn="预定";
      this.bigData[index].fullbtn = "空";
    },
  }
};
</script>
<style scoped>
/* 面包屑头部导航栏 */
.el-tabs {
  width: 70%;
  height: 100%;
  min-height: 678px;
  margin: 0 auto;
  font-family: STKaiti;
}
/* 小间 */
.small-rooms {
  width: 100%;
  height: 100%;
  min-height: 610px;
  overflow: hidden;
}
/* 第一间房间 */
.first-sr,
.second-sr,
.third-sr{
  height: 290px;
  margin: 10px;
  display: inline-block;
  border-radius: 15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
}
.first-sr{
  width: 23%;
}
.second-sr{
  width: 31%;
}
.third-sr{
  width: 48%;
}
.first-sr:hover,
.second-sr:hover,
.third-sr:hover {
  background-color: #d9cd9042;
}
/* 序号 */
.serial {
  width: 25px;
  height: 25px;
  display: inline-block;
  border: 2px dashed tomato;
  border-radius: 50%;
  margin: 10px;
  line-height: 25px;
  text-align: center;
}
/* 更新键 */
.updata{
  display: inline-block;
  right: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
}
/* 文字部分 */
.content {
  width: 200px;
  height: 90px;
  font-size: 18px;
  border: 1px solid #fff;
  margin: 0 auto;
}
.content ul {
  margin-top: 15px;
}
li {
  list-style: none;
  text-decoration: none;
  display: block;
  line-height: 25px;
  text-align: center;
  margin: 5px;
}
/* 计时器 */
.time {
  width: 200px;
  height: 72px;
  margin: 10px auto;
  padding: 5px;
  line-height: 25px;
  font-size: 14px;
  text-align: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
/* 按钮 */
.first-sr .btn .el-button,
.second-sr .btn .el-button,
.third-sr .btn .el-button{
  display: inline-block;
  margin-top: 15px;
}
.first-sr .btn .el-button{
  margin-left: 38px;
}
.second-sr .btn .el-button{
  margin-left: 65px;
}
.third-sr .btn .el-button{
  margin-left: 130px;
}
</style>
