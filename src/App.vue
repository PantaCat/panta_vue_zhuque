<template>
  <dev  v-if="!$route.meta.shovalues">
    <Login></Login>
  </dev>

  <router-view/>
</template>

<script>
import Login from '@/views/Login.vue'

export default {
  components: {
    Login
  }
};
</script>
