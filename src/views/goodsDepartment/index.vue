<template>
  <el-card shadow="never" class="henader-card">
    <div class="flx-row">
      <div style="flex: 1">
        <el-button type="primary" @click="dialogVisibleShow">
          +添加商品
        </el-button>
      </div>
      <div class="flex-right" style="color: crimson">
        请严格按照考试说明答题，否则本题分数可能无效
      </div>
    </div>
  </el-card>
  <el-card shadow="never">
    <el-table :data="tableData" :header-cell-style="{ backgroundColor: '#ecf5ff' }" border stripe style="width: 100%">
      <el-table-column v-for="item in options" :key="item.type" :prop="item.props" :label="item.label"
        :width="item.width" :align="item.align" show-overflow-tooltip :fixed="item.fixed">
        <template v-slot:default="scope" v-if="item.props === 'actions'">
          <div class="operationGroup">
            <el-button type="primary" @click="setRecommendPicture" link>
              推荐图设置
            </el-button>
            <el-button type="primary" @click="editorClick" link>
              编辑商品
            </el-button>
            <el-popconfirm confirm-button-text="确认" cancel-button-text="取消" :icon="InfoFilled" icon-color="#626AEF"
              title="确认删除该商品?" @confirm="DeleteItem(index)">
              <template #reference>
                <p class="flx-center" style="color: #ff5722">
                  <el-icon class="icon-dele">
                    <Delete />
                  </el-icon>
                  删除商品
                </p>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination small background :page-size="queryData.size" layout="prev, pager, next" :total="total" class="mt-4"
      @current-change="handleCurrentChange" />
  </el-card>

  <el-dialog v-model="goodsClassdialogVisible" title="商品分类添加" :width="dialogWidth"
    :hide-required-asterisk="dialogData.isView" draggable>
    <el-form :model="dialogData.FormData" :rules="rules" ref="FormRef" class="demo-ruleForm">
      <el-form-item label="商品编号：" :label-width="formLabelWidth" prop="username">
        <el-input v-model="dialogData.FormData.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="商品名称：" :label-width="formLabelWidth" prop="username">
        <el-input v-model="dialogData.FormData.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="价格：" :label-width="formLabelWidth" prop="username">
        <el-input v-model="dialogData.FormData.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="库存量：" :label-width="formLabelWidth" prop="username">
        <el-input v-model="dialogData.FormData.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="订货点：" :label-width="formLabelWidth" prop="username">
        <el-input v-model="dialogData.FormData.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上架时间：" :label-width="formLabelWidth" prop="email">
        <el-date-picker v-model="dialogData.FormData.username" type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item label="下架时间：" :label-width="formLabelWidth" prop="content">
        <el-date-picker v-model="dialogData.FormData.username" type="date" placeholder="Pick a date" clearable />
      </el-form-item>
      <el-form-item label="是否补货；" :label-width="formLabelWidth" prop="username">
        <el-input v-model="dialogData.FormData.username" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit()">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog v-model="goodsImgdialogVisible" title="商品推荐图设置" :width="dialogWidth"
    :hide-required-asterisk="dialogData.isView" draggable>
    <el-upload ref="ImageChang" v-model:file-list="imageListArr"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" list-type="picture-card"
      :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="handleChange">
      <el-icon>
        <Plus />
      </el-icon>
    </el-upload>

  </el-dialog>
  <el-dialog v-model="imgDialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup>
import { Edit, Delete, InfoFilled, View } from '@element-plus/icons-vue'
import { getUserList, addUserList, listUpdate } from '@api/apis.js'
import { useDialogWidth } from '@/hooks/useDialogWidth.js'
import { options } from './options.js'
import { onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getDateTime } from '@/utils/index.js'
import Sortable from 'sortablejs';
import { useRouter } from 'vue-router'
const router = useRouter()
const queryData = ref({
  page: 1,
  size: 10,
})
const FormRef = ref()
const formLabelWidth = '140px'
const dialogData = reactive({
  isView: true,
  title: '添加',
  FormData: {
    username: '',
    email: '',
    address: '',
    content: '',
  },
})


const rules = reactive({
  username: [{ required: true, message: '分类名称', trigger: 'change' }],
  email: [{ required: true, message: '请填写邮箱', trigger: 'change' }],
  address: [{ required: true, message: '描述', trigger: 'change' }],
})
const dialogVisible = ref(false)
const tableData = ref([])
const total = ref(0)

const initData = () => {
  getUserList(queryData.value).then((res) => {
    total.value = res.data.data.total
    tableData.value = res.data.data.userList
  })
}
const goodsClassdialogVisible = ref(false)
const dialogVisibleShow = () => {
  dialogData.FormData = {
    username: '',
    email: '',
    address: '',
    content: '',
  }
  goodsClassdialogVisible.value = true
}
const onSubmit = () => {
  FormRef.value.validate(async (valid) => {
    if (!valid) return
    try {
      if (dialogData.FormData.id) {
        listUpdate(dialogData.FormData).then((res) => {
          console.log('编辑数据成功')
          console.log(ElMessage)
          ElMessage({
            message: '编辑用户成功',
            type: 'success',
          })
          tableData.value = res.data.data
        })
      } else {
        dialogData.FormData.date = getDateTime('')
        addUserList(dialogData.FormData)
          .then((res) => {
            ElMessage({
              message: '添加用户成功',
              type: 'success',
            })
            dialogData.FormData.id = res.data.data.id
            tableData.value.unshift(dialogData.FormData)
          })
          .catch((err) => { })
      }
      dialogVisible.value = false
    } catch (error) {
      console.log(error)
    }
  })
}
const handleCurrentChange = (val) => {
  queryData.value.page = val
  initData(queryData.value)
}
/* 编辑商品 */
const editorClick = (item) => {
  router.push({ path: '/goodsDepartmentEdit' })
}
/* 删除商品 */
const DeleteItem = (index) => {
  console.log(index)
  tableData.value.splice(index, 1)
}

/* 删除图片 */
const handleRemove = (file) => {
  console.log(file)
}
/* 图片预览 */
const dialogImageUrl = ref('')
const imgDialogVisible = ref(false)
const handlePictureCardPreview = (file) => {
  dialogImageUrl.value = file.url
  imgDialogVisible.value = true
}
const goodsImgdialogVisible = ref(false)
/* 查看推荐图片设置 */
const setRecommendPicture = () => {
  goodsImgdialogVisible.value = true
}

const imageListArr = ref([])
/*  */
const handleChange = (file) => {
  console.log(file, 237)
  //上传前对图片的大小和类型进行限制
  const isJPG = file.raw.type === 'image/jpeg';
  const isPNG = file.raw.type === 'image/png';
  const isGIF = file.raw.type === 'image/gif';
  if (!isJPG && !isPNG && !isGIF) {
    ElMessage.error('上传图片只能是 JPG/PNG/GIF 格式!')
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2; // 上传图片大小限制2M
  if (!isLt2M) {
    ElMessage.error('上传图片大小不能超过 2MB!')
    return false;
  }
  let url = URL.createObjectURL(file.raw);
  let obj = {
    raw: file.raw, //点击确定按钮，将图片上传给后端时后端需要的参数
    imgUrl: url
  }
  imageListArr.value.push(obj)
  //过滤一下imgUrl为空的数据
  imageListArr.value = imageListArr.value.filter(item => {
    return item.imgUrl != ''
  });
  //上传的图片和回显的图片进行重新排序
  imageListArr.value.map((item, index) =>
    item.sortNum = index + 1
  )

}

const ImageChang = ref(null)
watch(imageListArr, () => {
  initDragSort()
})
/* 图片拖拽排序 */
const initDragSort = () => {
  const el = document.querySelectorAll('.el-upload-list')[0];
  Sortable.create(el, {
    onEnd: ({ oldIndex, newIndex }) => {
      // 交换位置
      const arr = imageListArr.value
      const page = arr[oldIndex];
      arr.splice(oldIndex, 1);
      arr.splice(newIndex, 0, page);
    }
  })
}
let dialogWidth = useDialogWidth()
onMounted(() => {
  window.onresize = () => {
    return (() => {
      dialogWidth = useDialogWidth()
    })()
  }
  initData()
})
</script>

<style lang="scss" scoped>
.henader-card {
  margin-bottom: 20px;
}

.operationGroup {
  width: 100%;
  display: flex;
  flex-direction: column;
  color: #2f60c2;

  .icon-view {
    font-size: 14px;
    margin: 0 10px;
  }

  .icon-edit {
    font-size: 14px;
    margin: 0 10px;
  }

  .icon-dele {
    font-size: 14px;
  }
}

.mt-4 {
  float: right;
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}

.el-button--text {
  margin-right: 15px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
