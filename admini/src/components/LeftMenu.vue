<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
        class="el-menu-vertical-demo"
      >
        <router-link to="/task">
          <el-menu-item index="0">
            <i class="fa fa-margin fa-server"></i>
            <span slot="title">任务清单</span>
          </el-menu-item>
          <template v-for="item in items">
            <el-submenu v-if="item.children" :index="item.path" :key="item.path">
              <template slot="title">
                <i :class="'fa fa-margin '+item.icon"></i>
                <span slot="title">{{item.name}}</span>
              </template>
              <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
                <el-menu-item :index="citem.path">
                  <span slot="title">{{citem.name}}</span>
                </el-menu-item>
              </router-link>
            </el-submenu>
          </template>
        </router-link>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "leftmenu",
  data() {
    return {
      items: [
        {
          icon: "fa-handshake-o",
          name: "订单",
          path: "fund",
          children: [{ path: "query", name: "查询并处理订单" }]
        },
        {
          icon: "fa-asterisk",
          name: "信息管理",
          path: "info",
          children: [
            { path: "addinfo", name: "信息录入" },
            { path: "queryallinfo", name: "查看全部员工信息" }
          ]
        },
        {
          icon: "fa-plus-square-o",
          name: "生产管理",
          path: "create",
          children: [
            { path: "addgoods", name: "生成产品列表" },
            { path: "doneupgoods", name: "已上架产品列表" }
          ]
        },
        {
          icon: "fa-plus-square-o",
          name: "任务清单",
          path: "task"
        }
      ]
    };
  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 60px;
  left: 0;
  min-height: 100%;
  background-color: #324057;
  z-index: 99;
}
.el-menu {
  border: none;
}
.fa-margin {
  margin-right: 5px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
