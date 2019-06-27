<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="7" class="logo-container">
        <img src="../assets/logo.png" class="logo" alt>
        <span class="title"><router-link to="/home"> 生产过程跟踪及产品溯源系统</router-link></span>
      </el-col>
      <el-col :span="11" class="user">
        <div class="container">
          <div class="he_nav">
            <ul>
              <!-- <el-autocomplete
                popper-class="my-autocomplete"
                v-model="state"
                :fetch-suggestions="querySearch"
                placeholder="请输入产品编号"
              >
                <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"></i>
              </el-autocomplete> -->
             
              <li>
                <i class="fa fa-phone-square" aria-hidden="true"></i>
                <el-popover placement="top" width="700" trigger="click">
                  <el-table :data="gridData">
                    <el-table-column width="150" property="tel" label="联系电话"></el-table-column>
                    <el-table-column width="200" property="email" label="电子邮箱"></el-table-column>
                    <el-table-column width="350" property="address" label="公司地址"></el-table-column>
                  </el-table>
                  <el-button type="text" slot="reference">联系我们</el-button>
                </el-popover>
              </li>
             
              <li>
                <i class="fa fa-qrcode" aria-hidden="true"></i>
                <a href="#" @click="download">下载App</a>
              </li>
              <li>
                <a href="javascript:0;">
                  <router-link to="/register">
                  <i class="fa fa-registered" aria-hidden="true"></i>
                  注册&nbsp;&nbsp;&nbsp;/</router-link>
                  <router-link to="/login"> &nbsp;
                  <i class="fa fa-sign-in" aria-hidden="true"></i>
                  登入</router-link>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="userinfo">
          <img src="../assets/頭像.jpeg" class="avatar" alt>
          <div class="welcome">
            <p class="name comenane">欢迎</p>
            <p class="name avatarname">
              {{userName}}
              <!-- 米斯特务 -->
            </p>
          </div>
          <span class="username">
            <!-- 下拉箭头 -->
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="main">
                  <i class="fa fa-window-maximize"></i>
                  首页</el-dropdown-item>
                <el-dropdown-item command="info">
                  <i class="fa fa-id-card"></i>
                  个人信息</el-dropdown-item>
               
                <el-dropdown-item command="dingdan">
                  <i class="fa fa-reorder"></i>
                  我的订单</el-dropdown-item>
                <el-dropdown-item command="logout">
                  <i class="fa  fa-reply-all"></i>
                  退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
</template>
<script>
import { constants } from "crypto";

export default {
  name: "head-nav",
  data() {
    return {
      userName: '',
      
      restaurants: [],
      state: "",
      labelPosition: "top",
       gridData: [{
          tel: '18805028102',
          email: '王小虎@qq.com',
          address: '上海市普陀区金沙江路 1518 弄'
        }]
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  beforeMount(){
    this.getUserName()
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },

    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    handleIconClick(ev) {
        console.log(ev);
      },
    setDialogInfo(cmdItem) {
      //   console.log(cmdItem);
      switch (cmdItem) {
        // 个人信息
        case "main":
          this.main();
          break;
        case "info":
          this.showInfoList();
          break;
          // 退出
        case "logout":
          this.logout();
          break;
         
          // 订单
        case "dingdan":
          this.dingdan();
          break;
      }
    },
    main(){
      this.$router.push("./index");
    },
    showInfoList() {
      //   console.log('个人信息');
      this.$router.push("./infoshow");
    },
    logout() {
      //   console.log('退出');
      // 清除token
      localStorage.removeItem("eleToken");
      // 设置vuex store
      this.$store.dispatch("clearCurrentState");
      // 跳转
      this.$router.push("/login");
    },
   
    dingdan() {
      this.$router.push("./order");
    },
    getUserName(){
      this.$axios
      .get('/api/customer',{headers:{token: localStorage.getItem("eleToken")}})
      .then(res => {
        // console.log(res);
        this.userName = res.data.data.name;
        
      })
    },
    // 下载APP
    download(){
      window.location.href="http://119.23.243.252:8080/api/download/origins"
      
    }
  }
};
</script>


<style scoped>
.head-nav {
  width: 100%;
  min-width: 1456px;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin:0 15px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}
.user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
}
.name {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.userinfo {
  margin-left: 30px;
}
.el-dropdown {
  color: #fff;
}
.he_nav li {
  display: inline-block;
  line-height: 50px;
  color: #fff;
  font-size: 15px;
  margin: 0 20px;
  padding: 0 10px;
  cursor: pointer;
}
.he_nav li:hover {
  background-color: rgba(200, 200, 200, 0.3);
}
.user > div {
  float: left;
}
.fa {
  font-size: normal;
  margin-right: 5px;
}
a {
  text-decoration: none;
  color: #fff;
}

li {
  line-height: normal;
  padding: 7px;
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.addr {
  font-size: 12px;
  color: #b4b4b4;
}

.highlighted .addr {
  color: #ddd;
}
/* 联系我们 */
.el-button{
  background: #324057;
  color:#fff;
  border:1px solid #324057;
  padding:12px 0;

}
a router-link:hover{
  color:bule;
}
</style>
