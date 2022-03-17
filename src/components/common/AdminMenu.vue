<template>
  <el-menu
    class="categories"
    default-active="/fyl/xys/home"
    active-text-color="red"
    background-color="#FAFAFA"
    :default-openeds="[]">
    <el-submenu :index="item.url + '' " v-for="(item,index) in navList" :key="index"   style="text-align: left">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span style="text-align: left">{{item.title}}</span>
      </template>
      <el-menu-item :index="citem.url" v-for="(citem,i) in item.data" :key="i"  style="margin-left: 20px"  >
          <span >{{citem.title}}</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'AdminMenu',
  data () {
    return {
      navList: [
        {
          id: '1',
          url: 'fyl/xys/home/first',
          title: '首页',
          data: []
        },
        {
          id: '2',
          url: 'fyl/xys/home',
          title: '系统管理',
          data: [{id: '11', url: '/fyl/xys/userManage', title: '用户管理'}, {id: '12', url: 'fyl/diary/2', title: '角色管理'}, {url: 'fyl/diary/3', title: '菜单管理'}, {url: 'fyl/diary/4', title: '部门管理'}, {url: 'fyl/diary/5', title: '岗位管理'}, {url: 'fyl/diary/7', title: '字典管理'}, {url: 'fyl/diary/8', title: '任务调度'}]
        },
        {
          id: '3',
          url: 'fyl/xys/home/sys',
          title: '系统监控',
          data: [{url: 'fyl/diary', title: '在线用户'}, {url: 'fyl/diary/1', title: '操作日志'}, {url: 'fyl/diary/2', title: '异常日志'}, {url: 'fyl/diary/3', title: '服务监控'}, {url: 'fyl/diary/4', title: 'SQL监控'}]
        },
        {
          id: '4',
          url: 'fyl/xys/home/mange',
          title: '运维管理',
          data: [{url: 'fyl/diary1', title: '服务器'}, {url: 'fyl/diary/2', title: '应用管理'}, {
            url: 'fyl/diary/1',
            title: '部署管理'
          }, {url: 'fyl/diary/2', title: '部署备份'}, {url: 'fyl/diary/4', title: '数据库管理'}]
        },
        {
          id: '5',
          url: 'fyl/xys/home/tools',
          title: '系统工具',
          data: [{url: 'fyl/diary', title: '代码生成'}, {url: 'fyl/diary/2', title: '存储管理'}, {
            url: 'fyl/diary/3',
            title: '邮件工具'
          }, {url: 'fyl/diary/4', title: '接口文档'}, {url: 'fyl/diary/5', title: '支付宝工具'}]
        },
        {
          id: '6',
          url: 'fyl/xys/home/',
          title: '组件管理',
          data: [{url: 'fyl/diary', title: '图表库'}, {url: 'fyl/diary/2', title: '图表库'}, {
            url: 'fyl/diary/3',
            title: '富文本'
          }, {url: 'fyl/diary/4', title: 'MarkDown'}, {url: 'fyl/diary/5', title: 'Yaml编辑器'}]
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
