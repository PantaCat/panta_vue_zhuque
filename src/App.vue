<template>
  <dev class="background" v-if="!$route.meta.shovalues">
    <Login></Login>
  </dev>

  <router-view/>
</template>

<script>
import Login from '@/views/Login.vue'

export default {
  data() {
    return {
      // 使用require来导入本地图片
      localImage1: require('@/assets/image1.jpeg'),
      localImage2: require('@/assets/image2.jpeg'),
      localImage3: require('@/assets/image6.png')
    };
  }, 
  components: {
    Login
  }
};
</script>
