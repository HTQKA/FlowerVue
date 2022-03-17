<template>
  <el-container  >
    <el-aside style="width: 13%;margin-top: 10px;">
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
  name: 'FYLWechat',
  components: {CommonMenu}

}
</script>

<style scoped>

</style>
