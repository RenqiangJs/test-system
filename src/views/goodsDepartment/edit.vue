<template>
  <div>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="商品分类：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商品名称：">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="计量单位：">
        <el-input v-model="form.name" :suffixIcon="() => '个'" />
      </el-form-item>
      <el-form-item label="市场售价：">
        <el-input v-model="form.name" :suffixIcon="() => '元'" />
      </el-form-item>
      <el-form-item label="销售价格：">
        <el-input v-model="form.name" :suffixIcon="() => '元'" />
      </el-form-item>
      <el-form-item label="上架时间：" :label-width="formLabelWidth" prop="email">
        <el-date-picker v-model="form.name" type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item label="下架时间：" :label-width="formLabelWidth" prop="email">
        <el-date-picker v-model="form.name" type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.name" />
      </el-form-item>
      <el-form-item label="缩略图：">
        <el-upload v-model:file-list="fileList" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="主图设置：">
        <el-upload v-model:file-list="fileList" action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="关键词优化：">
        <el-input v-model="form.name" type="textarea" />
      </el-form-item>
      <el-form-item label="">
        <p>根据材料1产品信息列表内容，完成宝贝详情，选择描述证券的选项，结合产品inxi列表中的商品介绍，以下宝贝详情描述正确的是：</p>
        <el-checkbox-group v-model="chooseRadio" @change="">
          <el-checkbox value="A" label="名称:挖土铲;品牌:前程;类型:钢材铁柄;产品适用:阳台花园、园艺等;检测标准:4C认证;特点:优质钢材、良好设计，不易生锈;" />
          <el-checkbox value="B" label="名称:挖土铲;品牌:前程;类型:钢材铁柄;产品适用:阳台花园、园艺等;检测标准:3C认证;特点:鲜花植物绿植盆载松土专用，适合种植鲜花植物;" />
          <el-checkbox value="C" label="名称:挖土铲;品牌:前程;类型:钢材铁柄;产品适用:阳台花园、园艺等;检测标准:3C认证;特点:手柄采用PVC防滑材料，使用方便。" />
          <el-checkbox value="D"
            label="名称:挖土铲;品牌:前程;类型:钢材铁柄;产品适用:阳台花园、园艺等;检测标准:3C认证;适宣人群:老少皆直;特点:鲜花植物绿植盘栽松土专用，适合种植鲜花植物;" disabled />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="P图说明：">
        <el-input v-model="form.name" type="textarea" />
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

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
const chooseRadio = ref([])
const onSubmit = () => { }
onMounted(() => { })
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
