<template>
  <div class="container">
    <div class="login-wrapper">
      <div class="header">Login</div>
      <div class="form-wrapper">
        <input type="text" v-model="data.userName" placeholder="username" class="input-item">
        <input type="password" v-model="data.passWord" placeholder="password" class="input-item">
        <div class="btn" :onclick="commitLogin">Go</div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import { useRouter } from 'vue-router';
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name:"Login",
  setup(){
    const router = useRouter();
    const data = reactive({
      userName:'',
      passWord:''
    });
    const commitLogin = () => {
      axios.post('/api/main/login', data)
      .then(response => {
        if(response.data.code != "200"){
          ElMessage({
            message: response.data.msg,
            type: 'error',
          });
        }else{
          // 处理响应数据
          router.push('/home');
        }
      })
      .catch(error => {
        // 处理错误情况
        console.error(error);
      });
    }
    
    return {
      data,
      commitLogin
    }
  }
}
</script>

<style scoped>


.container {
  /* margin-top: 5%; */
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(to right, #fbc2eb, #a6c1ee);
}
.login-wrapper {
  background-color: #fff;
  width: 358px;
  height: 588px;
  border-radius: 15px;
  padding: 0 50px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.header {
  font-size: 38px;
  font-weight: bold;
  text-align: center;
  line-height: 200px;
}
.input-item {
  display: block;
  width: 100%;
  margin-bottom: 20px;
  border: 0;
  padding: 10px;
  border-bottom: 1px solid rgb(128, 125, 125);
  font-size: 15px;
  outline: none;
}
.input-item placeholder {
  text-transform: uppercase;
}
.btn {
  text-align: center;
  padding: 10px;
  margin: 0 auto;
  width: 100%;
  margin-top: 40px;
  background-image: linear-gradient(to right, #a6c1ee, #fbc2eb);
  color: #fff;
}
.msg {
  text-align: center;
  line-height: 88px;
}
a {
  text-decoration-line: none;
  color: #abc1ee;
}

</style>