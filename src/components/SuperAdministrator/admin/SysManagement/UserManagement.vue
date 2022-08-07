<template>
  <div class="app-container">
    <el-row :gutter="40">
      <!--侧边部门数据-->
      <el-col :xs="9" :sm="6" :md="5" :lg="4" :xl="4">
        <div class="head-container">
          <el-input
            v-model="deptName"
            clearable
            size="small"
            placeholder="输入部门名称搜索"
            prefix-icon="el-icon-search"
            class="filter-item"
            @input="getDeptDatas"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserManagement',
  data () {
    return {
      deptName: ''
    }
  },
  methods: {
  // 获取左侧部门数据
    getDeptDatas (node, resolve) {
      const sort = 'id,desc'
      const params = {sort: sort}
      if (typeof node !== 'object') {
        if (node) {
          params['name'] = node
        }
      } else if (node.level !== 0) {
        params['pid'] = node.data.id
      }
    }
  }
}
</script>

<style scoped>

</style>
