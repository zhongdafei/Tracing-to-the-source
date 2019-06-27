<template>
  <header class="head-nav">
    <el-row>
      <el-col :span="7" class="logo-container">
        <img src="../assets/logo.png" class="logo" alt>
        <span class="title">
          <router-link to="/query">生产过程跟踪及产品溯源系统</router-link> </span>
      </el-col>

      <el-col :span="3" class="user">
        <div class="userinfo">
          <img src="../assets/頭像.jpeg" class="avatar" alt>
          <div class="welcome">
            <p class="name comename">欢迎</p>
            <p class="name avatarname">{{adminName}}</p>
          </div>
          <span class="username">
            <el-dropdown trigger="click" @command="setDialogInfo">
              <span class="el-dropdown-link">
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="info">
                  <i class="fa fa-id-card"></i>
                  个人信息
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
      <el-col :span="3" class="app">
        <router-link to="/register">
          <i class="fa fa-registered" aria-hidden="true"></i>
          注册&nbsp;&nbsp;&nbsp;/
        </router-link>
        <router-link to="/login">
          &nbsp;
          <i class="fa fa-sign-in" aria-hidden="true"></i>
          登入
        </router-link>
      </el-col>
      <el-col :span="3" class="app">
        <a href="#">下载app</a>
      </el-col>
    </el-row>
  </header>
</template>
<script>
import { longStackSupport } from "q";
export default {
  // name: "head-nav",
  data() {
    return {
      adminName: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  beforeMount() {
    this.getAdminInfo();
  },
  methods: {
    setDialogInfo(cmditem) {
      if (!cmditem) {
        console.log("test");
        this.$message("菜单选项缺少command属性");
        return;
      }
      switch (cmditem) {
        case "info":
          this.showInfoList();
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    showInfoList() {
      // 个人信息
      this.$router.push("/infoshow");
    },
    logout() {
      // 清除token
      localStorage.removeItem("eleToken");
      this.$store.dispatch("clearCurrentState");

      // 页面跳转
      this.$router.push("/login");
    },
    getAdminInfo() {
      this.$axios
        .get("/api/admin", {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          // console.log(res);
          this.adminName = res.data.data.name;
        });
    }
  }
};
</script>

<style scoped>
.head-nav {
  width: 100%;
  height: 60px;
  min-width: 600px;
  padding: 5px;
  background: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
}
.logo-container {
  line-height: 65px;
  min-width: 400px;
}
.logo {
  height: 50px;
  width: 50px;
  margin: 0 15px;
  vertical-align: middle;
  display: inline-block;
}
.title {
  vertical-align: middle;
  font-size: 22px;
  font-family: "Microsoft YaHei";
  letter-spacing: 3px;
}

.user,
.app {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 30px;
}

a {
  text-decoration: none;
  color: #fff;
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
.el-dropdown {
  color: #fff;
}
</style>
