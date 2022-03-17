<template>
  <div>
    <el-container  >
      <el-aside style="width: 13%;margin-top: 10px;">
        <switch></switch>
        <AdminMenu></AdminMenu>
      </el-aside>
    </el-container>
    <router-view></router-view>
  </div>
</template>

<script>
import AdminMenu from '../../common/AdminMenu'
export default {
  name: 'XYSHome',
  components: {AdminMenu}
}
</script>

<style scoped>

</style>
