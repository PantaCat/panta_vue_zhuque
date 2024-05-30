<template>
  <dev class="background" v-if="!$route.meta.shovalues">
    <router-link to="/home">
      <el-avatar :size="150">
        <img src="./assets/image1.jpeg" />
      </el-avatar>
    </router-link>
  </dev>
  <router-view/>
</template>

<style>
.background {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #79bbff;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
