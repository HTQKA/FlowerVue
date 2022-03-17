<template>
  <el-menu
    class="categories"
    default-active="0"
    active-text-color="red"
    background-color="#FAFAFA"
    :default-openeds="['1', '3']">
    <el-submenu :index="item.id + '' " v-for="(item,index) in navList" :key="index"   style="text-align: left">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span style="text-align: left">{{item.title}}</span>
      </template>
      <el-menu-item :index="item.id" v-for="(citem) in item.data" :key="citem.url" style="margin-left: 20px"  >
        <template slot="title">
          <span >{{citem.title}}</span>
        </template>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'CommonMenu',
  data () {
    return {
      navList: [
        {
          id: '1',
          url: 'fyl/diary/a',
          title: '内容活动',
          data: [{url: 'fyl/diary', title: '草稿箱'}, {url: 'fyl/diary/2', title: '素材箱'}, {
            url: 'fyl/diary/3',
            title: '发表记录'
          }]
        },
        {
          id: '2',
          url: 'fyl/diary/b',
          title: '数据',
          data: [{url: 'fyl/diary', title: '内容分析'}, {url: 'fyl/diary/2', title: '用户分析'}]
        },
        {
          id: '3',
          url: 'fyl/diary/c',
          title: '广告与服务',
          data: [{url: 'fyl/diary', title: '广告主'}, {url: 'fyl/diary/1', title: '流量主'}]
        },
        {
          id: '1',
          url: 'fyl/diary/a',
          title: '内容活动',
          data: [{url: 'fyl/diary', title: '草稿箱'}, {url: 'fyl/diary/2', title: '素材箱'}, {
            url: 'fyl/diary/3',
            title: '发表记录'
          }]
        },
        {
          id: '1',
          url: 'fyl/diary/a',
          title: '内容活动',
          data: [{url: 'fyl/diary', title: '草稿箱'}, {url: 'fyl/diary/2', title: '素材箱'}, {
            url: 'fyl/diary/3',
            title: '发表记录'
          }]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
