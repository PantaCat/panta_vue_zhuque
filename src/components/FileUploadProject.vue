<template>
  <div class="background-image">
    <el-button type="primary" :icon="Back" size="large" @click="goBack">返回</el-button>
    <div class="background-file">
      <div class="flat-background" style="width: 50%;text-align: center;">
        <el-upload
            v-model:file-list="fileList"
            multiple
            :on-preview="handlePreview"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
        >
          <el-button type="primary">文件上传</el-button>
        </el-upload>
      </div>
    </div>
  </div>
  </template>
<script>
import { ref,onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'

export default {
  name: 'FileUploadProject',
  setup() {
    const fileList = ref([])
    //初始化数据方法
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/function/fileUpload/queryDataList');
        response.data.forEach(item => {
          let newFile = {};
          newFile.uid = item.fileUid;
          newFile.name = item.fileName;
          newFile.url = item.fileUrl;
          fileList.value.push(newFile);
        });

      } catch (error) {
        console.error('获取数据失败：', error);
      }
    }
    onMounted(fetchData);

    //常规方法
    const router = useRouter();

    const beforeUpload = (file) =>{
      handHttpRequst(file)
      return false;
    }
    const handHttpRequst = (file) => {
      axios.post('/api/function/fileUpload/commitFileUpload', {file : file },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        // 处理响应数据
        let newFile = {};
        newFile.uid = response.data.fileUid;
        newFile.name = response.data.fileName;
        newFile.url = response.data.fileUrl;
        fileList.value.push(newFile);
      })
      .catch(error => {
        // 处理错误情况
        console.error(error);
      });
    }

    const handlePreview = (file) => {
      window.open(file.url)
    }
    const handleRemove = (file) => {
      axios.post('/api/function/fileUpload/deleteFileUpload', {fileUid : file.uid },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        // 处理响应数据
        return true;
      })
      .catch(error => {
        // 处理错误情况
        console.error(error);
      });
    }


    const goBack = () => {
      router.go(-1)
    }

    
    return {
      fileList,
      beforeUpload,
      handHttpRequst,
      handlePreview,
      handleRemove,
      goBack
    };
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.flat-background {
  background: #fff; /* 背景色 */
  border: 1px solid #ccc; /* 边框 */
  border-radius: 0; /* 无圆角 */
  box-shadow: none; /* 无阴影 */
}

.background-image {
  position: fixed;
  width: 100%; /* 设置宽度 */
  height: 100%; /* 设置高度 */
  background-image: url('~@/assets/image5.jpg');
  background-size: cover; /* 背景图片覆盖整个元素区域 */
  background-position: center; /* 背景图片居中 */
}

.background-file {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;/*设置成100就会居中在屏幕正中央 */
}
</style>
