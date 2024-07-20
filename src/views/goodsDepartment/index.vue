<template>
  <el-card shadow="never" class="henader-card">
    <div class="flx-row">
      <div style="flex: 1">
        <el-button type="primary" @click="dialogVisibleShow"
          >+添加商品</el-button
        >
      </div>
      <div class="flex-right" style="color: crimson">
        请严格按照考试说明答题，否则本题分数可能无效
      </div>
    </div>
  </el-card>
  <el-card shadow="never">
    <el-table
      :data="tableData"
      :header-cell-style="{ backgroundColor: '#ecf5ff' }"
      border
      stripe
      style="width: 100%"
    >
      <el-table-column
        v-for="item in options"
        :key="item.type"
        :prop="item.props"
        :label="item.label"
        :width="item.width"
        :align="item.align"
        show-overflow-tooltip
        :fixed="item.fixed"
      >
        <template v-slot:default="scope" v-if="item.props === 'actions'">
          <div class="operationGroup">
            <div>推荐图设置</div>
            <div>编辑商品</div>
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="取消"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="确认删除该商品?"
              @confirm="DeleteItem(index)"
            >
              <template #reference>
                <p class="flx-center" style="color: #ff5722;">
                  <el-icon class="icon-dele"><Delete /></el-icon> 删除商品
                </p>
              </template>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      :page-size="queryData.size"
      layout="prev, pager, next"
      :total="total"
      class="mt-4"
      @current-change="handleCurrentChange"
    />
  </el-card>

  <el-dialog
    v-model="dialogVisible"
    title="商品分类添加"
    :width="dialogWidth"
    :hide-required-asterisk="dialogData.isView"
    draggable
  >
    <el-form
      :model="dialogData.FormData"
      :rules="rules"
      ref="FormRef"
      class="demo-ruleForm"
    >
      <el-form-item
        label="分类名称"
        :label-width="formLabelWidth"
        prop="username"
      >
        <el-input v-model="dialogData.FormData.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="分类图片" :label-width="formLabelWidth" prop="email">
        <el-upload
          v-model:file-list="fileList"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth" prop="content">
        <el-input v-model="dialogData.FormData.content" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit()">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { Edit, Delete, InfoFilled, View } from "@element-plus/icons-vue";
import { getUserList, addUserList, listUpdate } from "@api/apis.js";
import { options } from "./options.js";
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { getDateTime } from "@/utils/index.js";
const queryData = ref({
  page: 1,
  size: 10,
});
const FormRef = ref();
const formLabelWidth = "140px";
const dialogData = reactive({
  isView: true,
  title: "添加",
  FormData: {
    username: "",
    email: "",
    address: "",
    content: "",
  },
});

const dialogWidth = ref("0");
const rules = reactive({
  username: [{ required: true, message: "分类名称", trigger: "change" }],
  email: [{ required: true, message: "请填写邮箱", trigger: "change" }],
  address: [{ required: true, message: "描述", trigger: "change" }],
});
const dialogVisible = ref(false);
const tableData = ref([]);
const total = ref(0);

const initData = () => {
  getUserList(queryData.value).then((res) => {
    total.value = res.data.data.total;
    tableData.value = res.data.data.userList;
  });
};

const dialogVisibleShow = () => {
  dialogData.FormData = {
    username: "",
    email: "",
    address: "",
    content: "",
  };
  dialogVisible.value = true;
};
const onSubmit = () => {
  FormRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      if (dialogData.FormData.id) {
        listUpdate(dialogData.FormData).then((res) => {
          console.log("编辑数据成功");
          console.log(ElMessage);
          ElMessage({
            message: "编辑用户成功",
            type: "success",
          });
          tableData.value = res.data.data;
        });
      } else {
        dialogData.FormData.date = getDateTime("");
        addUserList(dialogData.FormData)
          .then((res) => {
            ElMessage({
              message: "添加用户成功",
              type: "success",
            });
            dialogData.FormData.id = res.data.data.id;
            tableData.value.unshift(dialogData.FormData);
          })
          .catch((err) => {});
      }
      dialogVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};
const handleCurrentChange = (val) => {
  queryData.value.page = val;
  initData(queryData.value);
};
const editorClick = (item) => {
  dialogVisible.value = true;

  dialogData.FormData = item;
  console.log(dialogData.FormData);
  dialogData.isView = false;
  dialogData.title = "编辑";
};

const ItemView = (item) => {
  dialogVisible.value = true;
  dialogData.FormData = item;
  dialogData.isView = false;
  dialogData.title = "";
};

const DeleteItem = (index) => {
  console.log(index);
  tableData.value.splice(index, 1);
};
const cancelEvent = () => {
  console.log("cancel!");
};
const setDialogWidth = () => {
  console.log(document.body.clientWidth);
  var val = document.body.clientWidth;
  const def = 800; // 默认宽度
  if (val < def) {
    dialogWidth.value = "100%";
  } else {
    dialogWidth.value = def + "px";
  }
};
onMounted(() => {
  setDialogWidth();
  window.onresize = () => {
    return (() => {
      setDialogWidth();
    })();
  };
  initData();
});
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
