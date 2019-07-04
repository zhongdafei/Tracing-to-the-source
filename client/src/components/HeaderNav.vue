<template>
  <div class="zhanwei">
    <header class="head-nav">
      <el-row>
        <el-col :span="7" class="logo-container">
          <img src="../assets/logo.png" class="logo" alt />
          <span class="title">
            <router-link to="/home">生产过程跟踪及产品溯源系统</router-link>
          </span>
        </el-col>
        <el-col :span="13" class="user">
          <div class="container">
            <div class="he_nav">
              <ul>
                <el-autocomplete
                  popper-class="my-autocomplete"
                  v-model="state"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入产品编号"
                >
                  <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"></i>
                </el-autocomplete>

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
                  <el-button type="text" @click="download" slot="reference">下载App</el-button>
                </li>
                <li>
                  <i class="fa fa-registered" aria-hidden="true"></i>
                  <router-link to="/register">
                    <el-button type="text">注册</el-button>
                  </router-link>
                </li>
                <li>
                  <i class="fa fa-sign-in" aria-hidden="true"></i>
                  <router-link to="/login">
                    <el-button type="text">登入</el-button>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="userinfo">
            <img src="../assets/頭像.jpeg" class="avatar" alt />
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
                    首页
                  </el-dropdown-item>
                  <el-dropdown-item command="info">
                    <i class="fa fa-id-card"></i>
                    个人信息
                  </el-dropdown-item>

                  <el-dropdown-item command="dingdan">
                    <i class="fa fa-reorder"></i>
                    我的订单
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
      firstProcessData: [],
      restaurants: [],
      state: "",
      labelPosition: "top",
      gridData: [
        {
          tel: "18870772550",
          email: "18870772550@qq.com",
          address: "江西理工大学应用科学学院"
        }
      ]
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
     // 時間轉換函數
    changeTime(obj) {
      let date = new Date(obj);
      let y = date.getFullYear();
      let m = date.getMonth();
      let d = date.getDate();
      let h = date.getHours();
      let f =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
      let s =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
        // console.log(y + "-" + m + "-" + d + "  " + h + ":" + f + ":" + s)
      return y + "-" + m + "-" + d + "  " + h + ":" + f + ":" + s;
    },
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
    // 获取指定产品工序参数
    handleIconClick(ev) {
      let id = this.state;
      this.$axios.get(`/api/product/${id}`).then(res => {
        if (res.data.code === 200) {
          console.log(res.data);
          let data=res.data.data;
          const h = this.$createElement;
          data.first.createTime=this.changeTime(data.first.createTime);
          data.second.createTime=this.changeTime(data.second.createTime);
          data.third.createTime=this.changeTime(data.third.createTime);
          data.fourth.createTime=this.changeTime(data.fourth.createTime);
          this.$msgbox({
            title: "生产过程数据",
            message: h("p", null, [
              h("h1", {style:'color: teal;'}, "第一道工序:"),
              h("span", {style:'margin-right:150px'}, "工人号:" + data.first.workerId),
              h("span", null, "产品编号:" + data.first.productId),
              h("br", null, null),
              h("span", {style:'margin-right:98px'}, "含铜量:" + data.first.copper),
              h("span", null, "含锡量:" + data.first.tin),
              h("br", null, null),
              h("span",null, "含锌量:" + data.first.zinc),
              h("br", null, null),
              h("span", null, "上传时间:" + data.first.createTime),
              h("br", null, null),
              h("h1", {style:'color: teal;'}, "第二道工序:"),
              h("span", {style:'margin-right:150px'}, "工人号:" + data.second.workerId),
              h("span", null, "产品编号:" + data.second.productId),
              h("br", null, null),
              h("span", {style:'margin-right:98px'}, "长度:" + data.second.length),
              h("span", null, "直径:" + data.second.diameter),
              h("br", null, null),
              h("span", null, "重量:" + data.second.weight),
              h("br", null, null),
              h("span", null, "上传时间:" + data.second.createTime),
              h("br", null, null),
              h("h1", {style:'color: teal;'}, "第三道工序:"),
              h("span", {style:'margin-right:150px'}, "工人号:" + data.third.workerId),,
              h("span", null, "产品编号:" + data.third.productId),
              h("br", null, null),
              h("span", {style:'margin-right:98px'}, "长度:" + data.third.length),
              h("span", null, "直径:" + data.third.diameter),
              h("br", null, null),
              h("span", null, "重量:" + data.third.weight),
              h("br", null, null),
              h("span", null, "上传时间:" + data.third.createTime),
              h("br", null, null),
              h("h1", {style:'color: teal;'}, "第四道工序:"),
              h("span", {style:'margin-right:150px'}, "工人号:" + data.fourth.workerId),
              h("span", null, "产品编号:" + data.fourth.productId),
              h("br", null, null),
              h("span", {style:'margin-right:98px'}, "长度:" + data.fourth.length),
              h("span", null, "直径:" + data.fourth.diameter),
              h("br", null, null),
              h("span", {style:'margin-right:98px'}, "重量:" + data.fourth.weight),
              h("span", null, "拉伸强度:" + data.fourth.tensile),
              h("br", null, null),
              h("span", null, "上传时间:" + data.fourth.createTime),
            ]),
            confirmButtonText: "确定"
          });
        }
      });
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
    main() {
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
    getUserName() {
      this.$axios
        .get("/api/customer", {
          headers: { token: localStorage.getItem("eleToken") }
        })
        .then(res => {
          // console.log(res);
          this.userName = res.data.data.name;
        });
    },
    // 下载APP
    download() {
      window.location.href = "http://119.23.243.252:8080/api/download/origins";
    }
  }
};
</script>


<style scoped>
.zhanwei {
  height: 61px;
}
.head-nav {
  width: 100%;
  min-width: 1456px;
  height: 61px;
  min-width: 600px;
  background-color: #324057;
  color: #fff;
  border-bottom: 1px solid #1f2d3d;
  position: fixed;
  z-index: 2000;
}
.logo-container {
  line-height: 60px;
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
  margin: 0 10px;
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
.el-button {
  background: #324057;
  color: #fff;
  border: 1px solid #324057;
  padding: 12px 0;
}
a router-link:hover {
  color: bule;
}
</style>
