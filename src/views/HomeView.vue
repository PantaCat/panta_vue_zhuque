<template>
  <dev class="background1">
    <dev style="float: right;">
      <el-button type="primary" :icon="Back" size="large" @click="logout">登出</el-button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    </dev>
    <dev class="background2">
      <table style="text-align: center;">
        <tr>
          <td>
            <router-link to="/hello">
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
  </dev>

  <router-view/>
</template>

<script>

import {Back} from "@element-plus/icons-vue";
import { useRouter } from 'vue-router';
import axios from "axios";
import {ElMessage} from "element-plus";


export default {
  name:"home",
  computed: {
    Back() {
      return Back
    }
  },
  data() {
    return {
      // 使用require来导入本地图片
      localImage1: require('@/assets/image1.jpeg'),
      localImage2: require('@/assets/image2.jpeg'),
      localImage3: require('@/assets/image6.png')
    };
  },
  setup(){
    const router = useRouter();
    const logout = () => {
      axios.post('/api/main/logout')
      .then(response => {
        router.push('/login');
      })
      .catch(error => {
        // 处理错误情况
        console.error(error);
      });
    }
        
    return {
      logout
    }
  }
};
</script>

<style>
.background1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('~@/assets/image3.jpg');
  background-size: cover; /* 背景图片覆盖整个元素区域 */
  background-position: center; /* 背景图片居中 */
}
.background2 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  height: 50vh;
}
</style>