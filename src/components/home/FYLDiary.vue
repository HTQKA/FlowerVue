<template>
  <el-container  >
    <el-aside style="width: 200px;margin-top: 20px;">
      <switch></switch>
      <CommonMenu></CommonMenu>
    </el-aside>
    <el-main>
    </el-main>
  </el-container>
</template>

<script>
import CommonMenu from '../common/CommonMenu'
export default {
  name: 'FYLDiary',
  components: {CommonMenu}
}
</script>

<style scoped>
.el-aside {
  color: #333;
}
</style>
