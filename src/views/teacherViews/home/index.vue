<template>
  <div>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="店铺名称：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="店铺资金：">
        <el-input v-model="form.name" :suffixIcon="() => '元'" />
      </el-form-item>
      <el-form-item label="主营商品：">
        <el-input v-model="form.name" type="textarea" />
      </el-form-item>
      <el-form-item label="店铺招牌：">
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" />
        </el-table>
      </el-form-item>
      <el-form-item label="P图说明：">
        <el-input v-model="form.name" type="textarea" />
      </el-form-item>
      <el-form-item label="相关图片上传：">
        <el-upload v-model:file-list="fileList" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="店铺公告：">
        <el-input v-model="form.name" type="textarea" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from "vue";
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const fileList = ref([])
const tableRowClassName = ({
  row,
  rowIndex,
}) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const tableData = [
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
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
const onSubmit = () => { }
onMounted(() => { })
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
