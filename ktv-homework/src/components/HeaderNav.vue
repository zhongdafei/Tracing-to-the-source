<template>
<div class="zhanwei">
  <header class="head-nav">
    <el-row>
      <el-col :span="7" class="logo-container">
        <img src="../assets/logo3.png" class="logo" alt />
        <span class="title">
          <router-link to="/home">ktv管理系统</router-link>
        </span>
      </el-col>
      <el-col :span="6" class="user">
        <div class="container">
          <div class="he_nav">
            <ul>
              <li>
                <a href="javascript:0;">
                  <router-link to="/register">
                    <i class="fa fa-registered" aria-hidden="true"></i>
                    注册&nbsp;&nbsp;&nbsp;/
                  </router-link>
                  <router-link to="/login">
                    &nbsp;
                    <i class="fa fa-sign-in" aria-hidden="true"></i>
                    登入
                  </router-link>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="userinfo">
          <img
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2665752539,2910740997&fm=27&gp=0.jpg"
            class="avatar"
            alt
          />
          <div class="welcome">
            <p class="name comenane">欢迎</p>
            <p class="name avatarname">
              <!-- {{userName}} -->
              米斯特务
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
                  <i class="fa fa-bars"></i>
                  首页
                </el-dropdown-item>
                <el-dropdown-item command="info">
                  <i class="fa fa-user-circle"></i>
                  个人信息
                </el-dropdown-item>
                <el-dropdown-item command="addinfo">
                  <i class="fa fa-id-card"></i>
                  员工信息
                </el-dropdown-item>
                <el-dropdown-item command="moneylist">
                  <i class="fa fa-jpy"></i>
                  资金流水
                </el-dropdown-item>
                <el-dropdown-item command="logout">
                  <i class="fa fa-reply-all"></i>
                  退出
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </span>
        </div>
      </el-col>
    </el-row>
  </header>
  </div>
</template>
<script>
import { constants } from "crypto";

export default {
  name: "head-nav",
  data() {
    return {
      userName: "",
      restaurants: [],
      state: "",
      labelPosition: "top"
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  beforeMount() {
    this.getUserName();
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
        // 首页main
        case "main":
          this.showhome();
          break;
        // 个人信息
        case "info":
          this.showInfoList();
          break;
        case "addinfo":
          this.showAddInfoList();
          break;
        case "moneylist":
          this.MoneyList();
          break;
        // 退出
        case "logout":
          this.logout();
          break;
      }
    },
    MoneyList(){
      this.$router.push("./fundlist");
    },
    showhome() {
      this.$router.push("./home");
    },
    showInfoList() {
      //   console.log('个人信息');
      this.$router.push("./infoshow");
    },
    showAddInfoList() {
      this.$router.push("./addinfo");
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

    getUserName() {}
  }
};
</script>


<style scoped>
.zhanwei{
  width: 100%;
  height: 60px;
}
.head-nav {
  width: 100%;
  min-width: 1456px;
  height: 60px;
  min-width: 600px;
  /* padding: 5px; */
  background-color: #4c4948;
  color: #fff;
  border-bottom: 1px solid #b1b479;
  position: fixed;
  z-index: 20000;
}
.logo-container {
  height: 60px;
  line-height: 60px;
  min-width: 400px;
}
.logo {
  height: 60px;
  width: 80px;
  margin: 0 0px 0 15px;
  vertical-align: top;
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
</style>
