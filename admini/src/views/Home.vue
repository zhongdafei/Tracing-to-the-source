<template>
  <div class="home">
    <el-carousel height="400px" direction="vertical" :interval="3000">
      <el-carousel-item v-for="item in images" :key="item.id">
        <img :src="item.idView" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data(){
    return{
      images:[
        {id:0,idView:require("../assets/铜丝.jpg")},
        {id:1,idView:require("../assets/铜柱.jpg")},
        {id:2,idView:require("../assets/铜片.jpg")},
        {id:3,idView:require("../assets/铜棒.jpg")},
      ]
    }
  }
}
</script>


<style scoped>
.home {
  width: 100%;
  height: 100%;
}
 img {
  height: 400px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
.el-carousel {
  margin:20px auto;
  width: 1400px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>