<template>
  <div>
    <side-menu></side-menu>
    <router-view/>
  </div>
</template>

<script>
import SideMenu from '../common/SideMenu'
export default {
  name: 'FYLSelf',
  components: {SideMenu}
}
</script>

<style scoped>

</style>
