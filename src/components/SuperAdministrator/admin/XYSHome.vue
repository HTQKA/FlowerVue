<template>
  <div>
    <el-container  >
      <el-aside style="width: 13%;margin-top: 10px;">
        <switch></switch>
        <AdminMenu></AdminMenu>
      </el-aside>
      <router-view></router-view>

    </el-container>
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
