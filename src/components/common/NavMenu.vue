<template>
  <el-menu
    :default-active="'/fyl/index'"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1300px">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <a href="#nowhere" style="color: #222;float: right;padding: 20px;">更多功能</a>
    <i class="el-icon-menu" style="float: right;font-size: 45px;color: #222;padding-top: 8px"></i>
    <span style="position: absolute;padding-top: 20px;right: 35%;font-size: 20px;font-weight: bold">Jasmine Flower Diary - 茉莉花日记</span>
  </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/fyl/index', navItem: '首页'},
        {name: '/fyl/jotter', navItem: '笔记本'},
        {name: '/fyl/library', navItem: '图书馆'},
        {name: '/fyl/admin', navItem: '个人中心'},
        {name: '/fyl/xys/home', navItem: '系统设置'}
      ]
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
span {
  pointer-events: none;
}
</style>
