
<template>
  <div class="wrapper">
    <h1 id="mytime">{{str}}</h1>
    <el-button type="text" id="stop" name="button" @click="stop">停止</el-button>
    <el-button type="text" id="start" name="button" @click="start">开始</el-button>
    <el-button type="text" id="reset" name="button" @click="reset">重置</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      h: 0, //定义时，分，秒，毫秒并初始化为0；
      m: 0,
      ms: 0,
      s: 0,
      time: 0,
      str: "",
      mytime: ""
    };
  },
  methods: {
    timer() {
      //定义计时函数
      this.ms = this.ms + 50; //毫秒
      if (this.ms >= 1000) {
        this.ms = 0;
        this.s = this.s + 1; //秒
      }
      if (this.s >= 60) {
        this.s = 0;
        this.m = this.m + 1; //分钟
      }
      if (this.m >= 60) {
        this.m = 0;
        this.h = this.h + 1; //小时
      }
      this.str =
        this.toDub(this.h) +
        ":" +
        this.toDub(this.m) +
        ":" +
        this.toDub(this.s) +
        "" /*+this.toDubms(this.ms)+"毫秒"*/;
      //   document.getElementById('mytime').innerHTML=h+"时"+m+"分"+s+"秒"+ms+"毫秒";
    },

    reset() {
      //重置
      clearInterval(this.time);
      this.h = 0;
      this.m = 0;
      this.ms = 0;
      this.s = 0;
      this.str = "00:00:00";
    },

    start() {
      //开始
      this.time = setInterval(this.timer, 50);
    },

    stop() {
      //暂停
      clearInterval(this.time);
    },

    toDub(n) {
      //补0操作
      if (n < 10) {
        return "0" + n;
      } else {
        return "" + n;
      }
    },

    toDubms(n) {
      //给毫秒补0操作
      if (n < 10) {
        return "00" + n;
      } else {
        return "0" + n;
      }
    }
  },
  //实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el 还不可用。需要初始化处理一些数据时会比较有用
  created: function() {}
};
</script>
<style scoped>
#mytime {
  background: #827979;
  margin-bottom: 8px;
  color: #fffcfce8;
  display: block;
}
#mytime h1{
    display: inline-block;
    height: 25px;
    line-height: 25px; 
}
.wrapper {
  text-align: center;
  width: 60%;
  margin: 2px auto;
}
#start,
#reset,
#stop {
  margin: 2px 4px;
  padding: 0;
  /* border: none; */
  /* background-color: #fff; */
}
</style>