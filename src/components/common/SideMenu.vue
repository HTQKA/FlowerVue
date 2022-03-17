<template>
  <el-menu
    class="categories"
    default-active="0"
    active-text-color="red"
    :default-openeds="['1', '3']">
    <el-submenu index="1" >
      <template slot="title"><i class="el-icon-tickets"></i>内容活动</template>
      <el-menu-item index="1-1" style="text-align: left">
      <i class="el-icon-watermelon"></i>
      <span slot="title" style="text-align: left">草稿箱</span>
        </el-menu-item>
      <el-menu-item index="1-2" style="text-align: left">
        <i class="el-icon-grape"></i>
        <span slot="title">素材库</span>
      </el-menu-item>
      <el-menu-item index="1-3" style="text-align: left">
        <i class="el-icon-cherry"></i>
        <span slot="title">发表记录</span>
      </el-menu-item>
      <el-menu-item index="1-4"  style="text-align: left">
        <i class="el-icon-apple"></i>
        <span slot="title">原创</span>
      </el-menu-item>
      <el-menu-item index="1-5" >
        <i class=""></i>
        <span slot="title">----------------</span>
      </el-menu-item>
      <el-menu-item index="1-6"  style="text-align: left">
        <i class="el-icon-cherry"></i>
        <span slot="title">留言</span>
      </el-menu-item>
      <el-menu-item index="1-7"  style="text-align: left">
        <i class="el-icon-pear"></i>
        <span slot="title">消息</span>
      </el-menu-item>
      <el-menu-item index="1-8"  style="text-align: left">
        <i class="el-icon-coffee"></i>
        <span slot="title">赞赏</span>
      </el-menu-item>
      <el-menu-item index="1-9"  style="text-align: left">
        <i class="el-icon-ice-tea"></i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="1-10"  style="text-align: left">
        <i class="el-icon-ice-drink"></i>
        <span slot="title">---------</span>
      </el-menu-item>
      <el-menu-item index="1-11"  style="text-align: left">
      <i class="el-icon-milk-tea"></i>
      <span slot="title">自动回复</span>
    </el-menu-item>
      <el-menu-item index="1-12"  style="text-align: left">
      <i class="el-icon-potato-strips"></i>
      <span slot="title">自定义菜单</span>
    </el-menu-item>
      <el-menu-item index="1-13"  style="text-align: left">
      <i class="el-icon-lollipop"></i>
      <span slot="title">话题标签</span>
    </el-menu-item>
      <el-menu-item index="1-14"  style="text-align: left">
        <i class="el-icon-ice-cream-square"></i>
        <span slot="title">投票</span>
      </el-menu-item>
      <el-menu-item index="1-15"  style="text-align: left">
      <i class="el-icon-ice-cream-round"></i>
      <span slot="title">号内搜索</span>
    </el-menu-item>
    </el-submenu>
    <el-submenu index="1">
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {
      navList: [
        {url: '', title: ''},
        {url: '', title: ''},
        {url: '', title: ''}
      ]
    }
  }
}
</script>

<style scoped>
.categories {
  position: fixed;
  margin-left: 50%;
  left: -600px;
  top: 100px;
  width: 150px;
}
</style>
