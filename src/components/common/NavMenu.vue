<template>
  <el-menu
    :default-active="'/fyl/index'"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1300px">
    <img src="../../assets/img.png" style="width: 50px;height: 47px;float: left;margin-right: 1px;" >
    <a href="#nowhere" style="color: #222;float: left;padding: 20px;margin-left: 1px;">公众号</a>
<!--    <img v-bind:src="'../../assets/'+img.imgUrl" style="width: 50px;height: 47px;float: left">-->
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <el-submenu index="2" style="color: #222;float: right;">
      <template slot="title">更多功能</template>
      <el-menu-item index="2-1">账号认证</el-menu-item>
      <el-menu-item index="2-2">认证功能</el-menu-item>
      <el-menu-item index="2-3">退出登录</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">功能设置</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
<!--    <a href="#nowhere" style="color: #222;float: right;padding: 20px;">更多功能</a>-->
    <i class="el-icon-menu" style="float: right;font-size: 40px;color: #222;padding-top: 8px"></i>
    <span style="position: absolute;padding-top: 18px;right: 35%;font-size: 20px;font-weight: bold">Jasmine Flower Diary - 茉莉花日记</span>
  </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/fyl/index', navItem: '首页'},
        {name: '/fyl/diary', navItem: '日记本'},
        {name: '/fyl/wechat', navItem: '朋友圈'},
        {name: '/fyl/self', navItem: '个人中心'},
        {name: '/fyl/xys/home', navItem: '系统设置'}
      ],
      img: [
        {
          msg: 'Hello Vue',
          imgUrl: 'img.png',
          myLink: 'http://www.baidu.com',
          myBGColor: '#ff0000',
          isRed: false,
          isValid: false,
          hasMore: true,
          myHtml: '<h1>it is a footer</h1>'
        }
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
