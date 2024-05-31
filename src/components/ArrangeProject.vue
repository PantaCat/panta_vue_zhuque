<template>
  <el-avatar :size="60">
    <img src="../assets/image3.png" @click="goBack"/>
  </el-avatar>
  <div class="flat-background">
    <el-table
        :data="user"
        style="width: 100%"
        :row-class-name="myclass"
    >
      <el-table-column type="index" label="Da2te" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">
            Detail
          </el-button>
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref,onMounted,reactive } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data() {
    return {
      file: null,
      abc:''
    };
  },
  setup() {
    const data = ref(null);
    const imgFile = ref(null);
    const visible = ref(false)
    const form = reactive({
      name: '',
      number: '',
      linkAddress: ''
    })

    const user = reactive(
        [
          {
            date: '2016-05-03',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-02',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-04',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
          {
            date: '2016-05-01',
            name: 'Tom',
            address: 'No. 189, Grove St, Los Angeles',
          },
        ]
    )

    const handleFileChange = (event) => {
      imgFile.value = event.target.files[0];
    }

    const onSubmit = () => {
          if (form.number.trim() === '') {
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
            visible.value = false;
            ElMessage({
              message: response.data,
              type: 'success',
            });
            window.location.reload();
          })
          .catch(error => {
            // 处理错误情况
            console.error(error);
          });
    }

    const onDelete = (id) => {
      axios.post('/api/link/deleteData', {"id":id})
          .then(response => {
            // 处理响应数据
            ElMessage({
              message: response.data,
              type: 'success',
            });
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
      onSubmit,
      handleFileChange,
      onDelete,
      user
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },

    // 修改单元格样式的方法
    myclass({ row, column, rowIndex, columnIndex }) {
     
      // 还可以设置对应单元格颜色
      // 表格的第二行-起始下标0
      if (rowIndex === 1) {
          return "warning-row";
      }
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

.el-table .warning-row {
  --el-table-tr-bg-color: #fde2e2;
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
