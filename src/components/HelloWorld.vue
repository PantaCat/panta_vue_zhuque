<template>
  <div class="flat-background">
    <el-dialog
        v-model="addVisible"
        title="添加"
        width="500"
    >
      <el-form :model="form" label-width="auto">
        <el-form-item label="序号">
          <el-input type="number" oninput="if(!/^[0-9]+$/.test(value)) value=value.replace(/\D/g,'');if(value>100)value=100;if(value<0)value=null" v-model="form.number"  />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="form.linkAddress" />
        </el-form-item>
        <el-form-item label="图片封面">
          <input type="file" ref="fileInput" @change="handleFileChange">
        </el-form-item>
        <el-form-item>
          <div style="width: 100%;text-align: center; margin: 0">
            <el-button size="small" text @click="addVisible = false">
              <el-icon><CloseBold /></el-icon>
            </el-button>

            <el-button size="small" type="primary" @click="onAddSubmit">
              <el-icon><Select /></el-icon>
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
        v-model="updateVisible"
        title="修改"
        width="500"
    >
      <el-form :model="formUpdate" label-width="auto">
        <el-form-item label="序号">
          <el-input v-show="false" v-model="formUpdate.id" />
          <el-input type="number" oninput="if(!/^[0-9]+$/.test(value)) value=value.replace(/\D/g,'');if(value>100)value=100;if(value<0)value=null" v-model="formUpdate.number"  />
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="formUpdate.name" />
        </el-form-item>
        <el-form-item label="链接地址">
          <el-input v-model="formUpdate.linkAddress" />
        </el-form-item>
        <el-form-item label="图片封面">
          <input id="fileUpdate" type="file" ref="fileInput" @change="handleFileChange">
        </el-form-item>
        <el-form-item>
          <div style="width: 100%;text-align: center; margin: 0">
            <el-button size="small" text @click="updateVisible = false">
              <el-icon><CloseBold /></el-icon>
            </el-button>

            <el-button size="small" type="primary" @click="onUpdateSubmit">
              <el-icon><Select /></el-icon>
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    
    <el-container style="height: 97vh;background-color: #EBEDF0;" class="background-image">
      <el-button type="primary" :icon="Back" size="large" @click="goBack">返回</el-button>
      <el-main style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <el-row gutter="80">
          <el-col span="6" v-for="lm in data">
            <a :href="lm.linkAddress" target="_blank">
              <img style="width: 300px;height: 200px;" :src="lm.imgAddress" />
            </a>
            <br />
            <dev style="display: flex;justify-content: center;">
              <el-icon @click="updateVisibleParam(lm)" ><EditPen /></el-icon>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <el-popconfirm title="确定删除?"
                             confirm-button-text='是的'
                             cancel-button-text='算了'
                             icon=''
                             @confirm='onDelete(lm.id)'
              >
                <template #reference>
                  <el-icon><Delete /></el-icon>
                </template>
              </el-popconfirm>
            </dev>
          </el-col>

          <el-col span="6" style="display: flex; justify-content: center; align-items: center; height: 200px;">
            <el-button type="primary" size="large" :icon="Plus" circle @click="addVisible = true" />
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ref,onMounted,reactive } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import {Back, Plus, Promotion} from "@element-plus/icons-vue";

export default {
  name: 'HelloWorld',
  computed: {
    Plus() {
      return Plus
    },
    Promotion() {
      return Promotion
    },
    Back() {
      return Back
    }
  },
  setup() {
    const data = ref(null);
    const imgFile = ref(null);
    const addVisible = ref(false);
    const updateVisible = ref(false);
    const form = reactive({
      name: '',
      number: '',
      linkAddress: ''
    });
    const formUpdate = reactive({
      id:null,
      name: '',
      number: '',
      linkAddress: ''
    });

    const handleFileChange = (event) => {
      imgFile.value = event.target.files[0];
    }

    const onAddSubmit = () => {
          if (form.number === '') {
            alert('序号不能为空!');
            return;
          }
          if (form.name.trim() === '') {
            alert('名称不能为空!');
            return;
          }
          if (form.linkAddress.trim() === '') {
            alert('链接地址不能为空!');
            return;
          }
          
          if (imgFile.value === null) {
            alert('请上传图片!');
            return;
          }
      
          form.imgFile= imgFile;
          axios.post('/api/link/uploadFile', form,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(response => {
            // 处理响应数据
            delete form.imgFile;
            form.imgAddress = response.data.toString();
            return axios.post('/api/link/saveData', form);
          })
          .then(response => {
            // 处理响应数据
            ElMessage({
              message: response.data,
              type: 'success',
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch(error => {
            // 处理错误情况
            console.error(error);
          });
    };

    const onUpdateSubmit = () => {
      if (formUpdate.number === '' ) {
        alert('序号不能为空!');
        return;
      }
      if (formUpdate.name.trim() === '') {
        alert('名称不能为空!');
        return;
      }
      if (formUpdate.linkAddress.trim() === '') {
        alert('链接地址不能为空!');
        return;
      }

      if (imgFile.value === null) {
        axios.post('/api/link/updateData', formUpdate)
            .then(response => {
              // 处理响应数据
              ElMessage({
                message: response.data,
                type: 'success',
              });
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            })
            .catch(error => {
              // 处理错误情况
              console.error(error);
              return;
            });
      }

      formUpdate.imgFile= imgFile;
      axios.post('/api/link/uploadFile', formUpdate,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        // 处理响应数据
        delete formUpdate.imgFile;
        formUpdate.imgAddress = response.data.toString();
        return axios.post('/api/link/updateData', formUpdate);
      })
      .then(response => {
        // 处理响应数据
        ElMessage({
          message: response.data,
          type: 'success',
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch(error => {
        // 处理错误情况
        console.error(error);
      });
    };

    const onDelete = (id) => {
      axios.post('/api/link/deleteData', {"id":id})
          .then(response => {
            // 处理响应数据
            ElMessage({
              message: response.data,
              type: 'success',
            });
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          })
          .catch(error => {
            // 处理错误情况
            console.error(error);
          });
    };

    const fetchData = async () => {
      try {
        const response = await axios.post('/api/link/queryDataList');
        data.value = response.data;
      } catch (error) {
        console.error('获取数据失败：', error);
      }
    };

    const updateVisibleParam = (lm) => {
      delete formUpdate.imgFile;
      if(document.getElementById('fileUpdate') != null){
        document.getElementById('fileUpdate').value = null;
      }
      updateVisible.value = true;
      formUpdate.id = lm.id;
      formUpdate.name = lm.name;
      formUpdate.number = lm.number;
      formUpdate.linkAddress = lm.linkAddress;
    };

    onMounted(fetchData);

    return {
      data,
      addVisible,
      updateVisible,
      form,
      formUpdate,
      onAddSubmit,
      onUpdateSubmit,
      handleFileChange,
      updateVisibleParam,
      onDelete
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flat-background {
  background: #fff; /* 背景色 */
  border: 1px solid #ccc; /* 边框 */
  border-radius: 0; /* 无圆角 */
  box-shadow: none; /* 无阴影 */
}
.background-image {
  width: 100%; /* 设置宽度 */
  height: 100%; /* 设置高度 */
  background-image: url('~@/assets/image4.jpg');
  background-size: cover; /* 背景图片覆盖整个元素区域 */
  background-position: center; /* 背景图片居中 */
}
</style>
