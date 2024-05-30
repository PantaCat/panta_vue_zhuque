<template>
  <div class="flat-background">
    <el-container style="height: 97vh;background-color: #EBEDF0;">
      <el-main style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <el-row gutter="80">
          <el-col span="6" v-for="lm in data">
            <a :href="lm.linkAddress" target="_blank">
              <img style="width: 300px;height: 200px;" :src="lm.imgAddress" />
            </a>
          </el-col>

          <el-col span="6" style="display: flex; justify-content: center; align-items: center; height: 200px;">
            <el-popover :visible="visible" placement="top" :width="500">
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
                <el-form-item label="图片地址">
                  <el-input v-model="form.imgAddress" />
                </el-form-item>
                <el-form-item>
                  <div style="width: 100%;text-align: center; margin: 0">
                    <el-button size="small" text @click="visible = false">
                      <el-icon><CloseBold /></el-icon>
                    </el-button>

                    <el-button size="small" type="primary" @click="onSubmit">
                      <el-icon><Select /></el-icon>
                    </el-button>
                  </div>
                </el-form-item>
              </el-form>

              <template #reference>
                <el-button @click="visible = true" type="primary"  size="large">
                  新增<el-icon class="el-icon--right"><Promotion /></el-icon>
                </el-button>
              </template>
            </el-popover>

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

export default {
  name: 'HelloWorld',
  setup() {
    const data = ref(null);
    const visible = ref(false)
    const form = reactive({
      name: '',
      number: null,
      linkAddress: '',
      imgAddress: ''
    })

    const onSubmit = () => {
      axios.post('/api/link/saveData', form)
          .then(response => {
            // 处理响应数据
            visible.value = false;
            ElMessage(response.data);
            window.location.reload();
          })
          .catch(error => {
            // 处理错误情况
            console.error(error);
          });
    }

    const fetchData = async () => {
      try {
        const response = await axios.post('/api/link/queryDataList');
        data.value = response.data;
      } catch (error) {
        console.error('获取数据失败：', error);
      }
    };

    onMounted(fetchData);

    return {
      data,
      visible,
      form,
      onSubmit
    };
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
</style>
