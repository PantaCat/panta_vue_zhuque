<template>
  <div class="background-image">
    <el-button type="primary" :icon="Back" size="large" @click="goBack">返回</el-button>
    <el-button type="success" color="#F08080" :icon="Pointer" size="large" @click="addVisible = true;form.linuxAddress = '';form.executeCommand = '';">新增</el-button>
    <el-dialog
        v-model="addVisible"
        title="新增部署内容"
        width="500"
    >
      <el-form :model="form" label-width="auto">
        <el-form-item label="项目名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="服务器路径">
          <el-input v-model="form.linuxAddress" />
        </el-form-item>
        <el-form-item label="执行命令">
          <textarea style="width: 100%;height: 50px;" v-model="form.executeCommand"></textarea>
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
        title="修改部署内容"
        width="500"
    >
      <el-form :model="form" label-width="auto">
        <el-form-item label="项目名称">
          <el-input v-show="false" v-model="formUpdate.id" />
          <el-input v-model="formUpdate.name" />
        </el-form-item>
        <el-form-item label="服务器路径">
          <el-input v-model="formUpdate.linuxAddress" />
        </el-form-item>
        <el-form-item label="执行命令">
          <textarea style="width: 100%;height: 50px;" v-model="formUpdate.executeCommand"></textarea>
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

    <el-dialog
        v-model="arrangeVisible"
        title="部署"
        width="500"
    >
      <el-form label-width="auto">
        <el-form-item label="部署包">
          <el-input v-show="false" v-model="form.linuxAddress" />
          <el-input v-show="false" v-model="form.executeCommand" />
          <input id="fileArrange" type="file" ref="fileInput" @change="handleFileChange">
        </el-form-item>
        <el-form-item>
          <div style="width: 100%;text-align: center; margin: 0">
            <el-button size="small" text @click="arrangeVisible = false">
              <el-icon><CloseBold /></el-icon>
            </el-button>

            <el-button size="small" type="primary" @click="onArrange">
              <el-icon><Select /></el-icon>
            </el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="flat-background">
      <el-table
          :data="data"
          style="width: 100%"
          :row-class-name="myclass"
      >
        <el-table-column type="index" label="序号" width="180" />
        <el-table-column prop="name" label="项目名称" width="180" />
        <el-table-column prop="linuxAddress" label="服务器路径" />
        <el-table-column label="执行命令">
          <template #default="scope">
            <div v-html="wrapText(scope.row.executeCommand)"></div>
          </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="180">
          <template #default="scope">
            <el-tooltip content="部署" effect="customized" placement="top">
              <el-button type="success" :icon="Promotion" circle @click="arrangeVisibleParam(scope.row)"/>
            </el-tooltip>
            &nbsp;
            <el-tooltip content="修改" effect="customized" placement="top">
              <el-button color="#626aef" :icon="EditPen" circle @click="updateVisibleParam(scope.row)"/>
            </el-tooltip>
            &nbsp;
            <el-popconfirm title="确定删除?"
                           confirm-button-text='是的'
                           cancel-button-text='算了'
                           icon='Delete'
                           placement="top"
                           @confirm='onDelete(scope.row)'
            >
              <template #reference>
                <div class="no-wrap">
                  <el-tooltip content="删除" effect="customized" placement="top">
                    <el-button type="danger" :icon="Delete" circle />
                  </el-tooltip>
                </div>
              </template>
            </el-popconfirm>

          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  </template>
<script>
import { ref,onMounted,reactive } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import {Back, Check, Delete, EditPen, Pointer, Promotion} from "@element-plus/icons-vue";

export default {
  name: 'ArrangeProject',
  computed: {
    EditPen() {
      return EditPen
    },
    Pointer() {
      return Pointer
    },
    Promotion() {
      return Promotion
    },
    Check() {
      return Check
    },
    Delete() {
      return Delete
    },
    Back() {
      return Back
    }
  },
  setup() {
    const data = ref(null);
    const pkgFile = ref(null);
    const addVisible = ref(false);
    const updateVisible = ref(false);
    const arrangeVisible = ref(false);

    const form = reactive({
      name: '',
      linuxAddress: '',
      executeCommand: ''
    });

    const formUpdate = reactive({
      id:null,
      name: '',
      linuxAddress: '',
      executeCommand: ''
    });

    const handleFileChange = (event) => {
      pkgFile.value = event.target.files[0];
    }

    const onAddSubmit = () => {
          if (form.name.trim() === '') {
            alert('项目名称不能为空!');
            return;
          }
          if (form.linuxAddress.trim() === '') {
            alert('服务器地址不能为空!');
            return;
          }
          if (form.executeCommand.trim() === '') {
            alert('执行命令不能为空!');
            return;
          }

          axios.post('/api/arrange/saveData', form)
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
    }

    const onUpdateSubmit = () => {
      if (formUpdate.name.trim() === '') {
        alert('项目名称不能为空!');
        return;
      }
      if (formUpdate.linuxAddress.trim() === '') {
        alert('服务器地址不能为空!');
        return;
      }
      if (formUpdate.executeCommand.trim() === '') {
        alert('执行命令不能为空!');
        return;
      }

      axios.post('/api/arrange/updateData', formUpdate)
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
    }

    const onDelete = (row) => {
      axios.post('/api/arrange/deleteData',  {"id":row.id})
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
    }

    const onArrange = (row) => {
      if (pkgFile.value === null) {
        alert('请上传部署包!');
        return;
      }
      form.pkgFile = pkgFile;
      axios.post('/api/arrange/arrangeData', form,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
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
    }

    const updateVisibleParam = (row) => {
      updateVisible.value = true;
      formUpdate.id = row.id;
      formUpdate.name = row.name;
      formUpdate.linuxAddress = row.linuxAddress;
      formUpdate.executeCommand = row.executeCommand;
    }

    const arrangeVisibleParam = (row) => {
      arrangeVisible.value = true;
      if(document.getElementById('fileArrange') != null){
        document.getElementById('fileArrange').value = null;
      }
      form.linuxAddress = row.linuxAddress;
      form.executeCommand = row.executeCommand;
    }

    const fetchData = async () => {
      try {
        const response = await axios.post('/api/arrange/queryDataList');
        data.value = response.data;
      } catch (error) {
        console.error('获取数据失败：', error);
      }
    }

    onMounted(fetchData);
    
    return {
      data,
      form,
      onAddSubmit,
      onUpdateSubmit,
      onDelete,
      addVisible,
      updateVisible,
      arrangeVisible,
      onArrange,
      updateVisibleParam,
      arrangeVisibleParam,
      formUpdate,
      handleFileChange
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    // 修改单元格样式的方法
    myclass({rowIndex }) {
      // 还可以设置对应单元格颜色
      // 表格的第二行-起始下标0
      if (rowIndex %2 === 0) {
          return "color1";
      }else{
          return "color2";
      }
    },
    wrapText(text) {
      return text.replace(/\n/g, '<br>');
    }
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

.el-table .color1 {
  --el-table-tr-bg-color: #f8e3c5;
}
.el-table .color2 {
  --el-table-tr-bg-color: #c6e2ff;
}

.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}

.background-image {
  position: fixed;
  width: 100%; /* 设置宽度 */
  height: 100%; /* 设置高度 */
  background-image: url('~@/assets/image5.jpg');
  background-size: cover; /* 背景图片覆盖整个元素区域 */
  background-position: center; /* 背景图片居中 */
}

.no-wrap {
  display: inline-block;
}

/* 控制单元格内文本的换行 */
.el-table .cell {
  white-space: pre-wrap; /* 保留空白符，自动换行 */
}
</style>
