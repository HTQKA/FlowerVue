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
    <span style="position: absolute;padding-top: 20px;right: 35%;font-size: 20px;font-weight: bold">Jasmine Flower Diary</span>
  </el-menu>
</template>

<script>
export default {
  name: 'XYSMenu',
  data () {
    return {
      navList: [
        {name: '/fyl/index', navItem: '首页'},
        {name: '/fyl/diary', navItem: '日记本'},
        {name: '/fyl/wechat', navItem: '朋友圈'},
        {name: '/fyl/self', navItem: '个人中心'},
        {name: '/fyl/xys/home', navItem: '系统设置'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
