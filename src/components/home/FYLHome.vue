<template>
  <div>
    <nav-menu></nav-menu>
    <router-view/>
  </div>
</template>

<script>
import NavMenu from '../common/NavMenu'
export default {
  name: 'FYLHome',
  components: {NavMenu},
  comments: {NavMenu}
}
</script>

<style scoped>

</style>
