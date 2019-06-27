<template>
  <div class="register">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">酷狗KTV管理系统</span>
      </div>
    </section>
  </div>
</template>
<script>
export default {};
</script>

<style scoped>
.register{
  width: 100%;
  height: 100%;
  position: relative;
  background: url(../assets/蓝紫色bgc.jpg) no-repeat center center;
  background-size: 100% 100%;
  z-index:1;
  -webkit-filter: blur(5px);
  filter: blur(15px); 
  overflow: hidden;
}
.manage_tip {
  position: absolute;
  top: 15%;
  left: 45%;
}
.manage_tip .title{
  font-size:24px;
  font-family: STFangsong;
  font-weight: 700;
  color:#fff;
  z-index:222;
}
/* .register {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: -1;
  -webkit-filter: blur(5px);
  filter: blur(15px); 
  transform: scale(1.5);
  background: url(../assets/蓝紫色bgc.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.register::after{
    content: '';
    z-index:2;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 40%;
    left: 40%;
    background-size:100% 100%; 
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: STFangsong;
  font-weight: 700;
  font-size: 26px;
  color: #fff;
  z-index:2;
} */
</style>
