<template>
  <div class="home">
    <div class="w">
      <!-- 小间 -->
      <div class="small-rooms">
        <div class="title" id="1">
          <p>
            <a href="#1">小间</a> &nbsp;&nbsp;
            <a href="#2">中间</a> &nbsp;&nbsp;
            <a href="#3">大间</a>
          </p>
        </div>
        <div class="first-sr" v-for="( item, index ) in items1" :key="item.id">
          <!-- 序号 -->
          <div class="serial" @click="clean(index)">{{item.id}}</div>
          <!-- 时间提醒 -->
          <div class="time">剩余5小时</div>
          <!-- 内容 -->
          <div class="content">
            <ul>
              <li>可容纳6人</li>
              <li>标价10元每小时</li>
            </ul>
          </div>
          <div class="btn">
            <el-button
              type="primary"
              plain
              :disabled="item.disabled"
              class="btn1"
              @click="full(index)"
            >{{item.fullbtn}}</el-button>
            <el-button
              type="success"
              plain
              class="btn2"
              :disabled="item.disabled"
              @click="order(index)"
            >{{item.orderbtn}}</el-button>
          </div>
        </div>
      </div>
      <!-- 中间 -->
      <div class="small-rooms">
        <div class="title" id="2">
          <p>
            <a href="#1">小间</a> &nbsp;&nbsp;
            <a href="#2">中间</a> &nbsp;&nbsp;
            <a href="#3">大间</a>
          </p>
        </div>
        <div class="first-mr" v-for="( item, index ) in items2" :key="item.id">
          <!-- 序号 -->
          <div class="serial" @click="clean2(index)">{{item.id}}</div>
          <!-- 时间提醒 -->
          <div class="time">剩余5小时</div>
          <!-- 内容 -->
          <div class="content">
            <ul>
              <li>可容纳10人</li>
              <li>标价15元每小时</li>
            </ul>
          </div>
          <div class="btn">
            <el-button
              type="primary"
              plain
              :disabled="item.disabled"
              class="btn1"
              @click="full2(index)"
            >{{item.fullbtn}}</el-button>
            <el-button
              type="success"
              plain
              :disabled="item.disabled"
              class="btn2"
              @click="order2(index)"
            >{{item.orderbtn}}</el-button>
          </div>
        </div>
      </div>
      <!-- 大间 -->
      <div class="small-rooms">
        <div class="title" id="3">
          <p>
            <a href="#1">小间</a> &nbsp;&nbsp;
            <a href="#2">中间</a> &nbsp;&nbsp;
            <a href="#3">大间</a>
          </p>
        </div>
        <div class="first-br" v-for="( item, index ) in items3" :key="item.id">
          <!-- 序号 -->
          <div class="serial" @click="clean3(index)">{{item.id}}</div>
          <!-- 时间提醒 -->
          <div class="time">剩余5小时</div>
          <!-- 内容 -->
          <div class="content">
            <ul>
              <li>可容纳15人</li>
              <li>标价20元每小时</li>
            </ul>
          </div>
          <div class="btn">
            <el-button
              type="primary"
              plain
              class="btn1"
              ref="test"
              :disabled="item.disabled"
              @click="full3(index)"
            >{{item.fullbtn}}</el-button>
            <el-button
              type="success"
              plain
              :disabled="item.disabled"
              @click="order3(index)"
            >{{item.orderbtn}}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import func from '../../vue-temp/vue-editor-bridge';
export default {
  data() {
    return {
      items1: [
        { id: 1, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 2, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 3, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 4, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 5, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 6, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 7, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 8, fullbtn: "空", orderbtn: "预定", disabled: false }
      ],
      items2: [
        { id: 9, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 10, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 11, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 12, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 13, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 14, fullbtn: "空", orderbtn: "预定", disabled: false }
      ],
      items3: [
        { id: 15, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 16, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 17, fullbtn: "空", orderbtn: "预定", disabled: false },
        { id: 18, fullbtn: "空", orderbtn: "预定", disabled: false }
      ]
    };
  },
  // mounted(){
  //   this.move();
  // },
  methods: {
    // move(){
    //   let width=document.getElementsByClassName('time').getBoundingClientRect().width ;
    //   let distance=0;
    //   setInterval(function(){
    //     distance=distance-1;
    //     if(-distance>=width){
    //       distance=16;
    //     }
    //   },500);
    // },
    // 小间
    full(index) {
      console.log(this.items1[index]);
      this.items1[index].fullbtn = "已满";
      this.items1[index].disabled = !this.items1[index].disabled;
    },
    order(index) {
      this.items1[index].orderbtn = "已预定";
      this.items1[index].disabled = !this.items1[index].disabled;
      console.log(index);
    },
    clean(index) {
      this.items1[index].disabled = false;
      this.items1[index].orderbtn = "预定";
      this.items1[index].fullbtn = "空";
    },
    // 中间
    full2(index) {
      // console.log(this.items2[index]);
      this.items2[index].fullbtn = "已满";
      this.items2[index].disabled = !this.items2[index].disabled;
    },
    order2(index) {
      this.items2[index].orderbtn = "已预定";
      this.items2[index].disabled = !this.items2[index].disabled;
      // console.log(index);
    },
    clean2(index) {
      this.items2[index].disabled = false;
      this.items2[index].orderbtn = "预定";
      this.items2[index].fullbtn = "空";
    },
    // 大间
    full3(index) {
      // console.log(this.items2[index]);
      this.items3[index].fullbtn = "已满";
      this.items3[index].disabled = !this.items3[index].disabled;
    },
    order3(index) {
      this.items3[index].orderbtn = "已预定";
      this.items3[index].disabled = !this.items3[index].disabled;
      // console.log(index);
    },
    clean3(index) {
      this.items3[index].disabled = false;
      this.items3[index].orderbtn = "预定";
      this.items3[index].fullbtn = "空";
    }
  }
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  /* background-color: #B19693; */
  overflow: hidden;
}
.w {
  width: 1000px;
  height: 100%;
  margin: 10px auto;
  background-color: #fedfe1;
  overflow: hidden;
}
.small-rooms {
  width: 1000px;
  height: 650px;
  margin: 0 auto;
  background-color: #fff;
  overflow: hidden;
}
/* 标题区 */
.title {
  width: 95%;
  height: 50px;
  margin: 20px auto;
  background-color: #fff;
  border-radius: 40px;
  border: 1px solid #ccc;
  background-color: #b1b479;
}
.title p {
  line-height: 50px;
  text-align: center;
  font-family: STKaiti;
  font-size: 24px;
  font-weight: 700;
}
a {
  color: blue;
}
a:hover {
  color: black;
}
/* 房间 */
.first-sr,
.first-mr,
.first-br {
  height: 250px;
  display: inline-block;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 15px 0 15px 22px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
/* 第一个小房间 */
.first-sr {
  width: 220px;
}
/* 第一个中间 */
.first-mr {
  width: 300px;
}
/* 第一个大间 */
.first-br {
  width: 462px;
}
.first-sr:hover,
.first-mr:hover,
.first-br:hover {
  background-color: #D9CD90;
}
/* 序号 */
.serial {
  width: 25px;
  height: 25px;
  border: 2px dashed tomato;
  border-radius: 50%;
  margin: 5px;
  line-height: 25px;
  text-align: center;
}
/* 时间提醒 */
.time {
  width: 200px;
  height: 25px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px auto;
  border-radius: 50px;
  line-height: 25px;
  text-align: center;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
}
/* 内容区 */
.content {
  width: 200px;
  height: 100px;
  border: 1px solid #fff;
  margin: 0 auto;
}
.content ul {
  margin-top: 20px;
}
li {
  list-style: none;
  text-decoration: none;
  display: block;
  line-height: 25px;
  text-align: center;
  margin: 5px;
}
/* 按钮 */
.btn {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  position: relative;
}
.btn1 {
  position: absolute;
  left: 20px;
}
.btn2 {
  position: absolute;
  right: 20px;
}
.el-button + .el-button {
  margin-left: 353px;
}
</style>
