<template>
  <dev class="background" v-if="!$route.meta.shovalues">
    <table style="text-align: center;">
      <tr>
        <td>
          <router-link to="/home">
            <el-avatar :size="150">
              <img :src="localImage1" />
            </el-avatar>
          </router-link>
          <router-link to="/arrange">
            <el-avatar :size="150">
              <img :src="localImage2" />
            </el-avatar>
          </router-link>
        </td>
      </tr>

      <tr>
        <td>
          <router-link to="/fileUpload">
            <el-avatar :size="150">
              <img :src="localImage3" />
            </el-avatar>
          </router-link>
        </td>
      </tr>
    </table>
  </dev>

  <router-view/>
</template>

<script>
export default {
  data() {
    return {
      // 使用require来导入本地图片
      localImage1: require('@/assets/image1.jpeg'),
      localImage2: require('@/assets/image2.jpeg'),
      localImage3: require('@/assets/image6.png')
    };
  }
};
</script>

<style>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/image3.jpg');
  background-size: cover; /* 背景图片覆盖整个元素区域 */
  background-position: center; /* 背景图片居中 */
}
</style>
