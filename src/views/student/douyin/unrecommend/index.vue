<!--
 * @Descripttion: 
 * @version: 
 * @Author: ankeji
 * @Date: 2024-03-13 14:05:29
 * @LastEditors: ankeji
 * @LastEditTime: 2024-03-29 17:15:40
-->
<template>
  <el-card shadow="never" class="henader-card">
    <div class="flx-row">
      <el-form :inline="true" :model="queryData" style="flex: 1">
        <el-input placeholder="请输入搜索内容" v-model="queryData.keyWord">
        </el-input>
        <el-date-picker
          class="ml20"
          v-model="queryData.date"
          type="datetimerange"
          :shortcuts="shortcuts"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form>
      <div class="flex-right">
        <el-button type="primary" :icon="Search" @click="initData" class="ml20"
          >搜索</el-button
        >
        <el-button type="primary" @click="dialogVisibleShow">+添加</el-button>
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
        :fixed="item.fixed"
        show-overflow-tooltip
      >
        <template v-slot:default="scope" v-if="item.props === 'actions'">
          <el-tooltip
            class="box-item"
            effect="dark"
            content="运行"
            placement="top"
          >
            <el-icon class="icon-view runing" v-if="handleIsRun(scope.row)"
              ><Refresh
            /></el-icon>
            <el-icon class="icon-view" @click="Run(scope.row)" v-else>
              <CaretRight />
            </el-icon>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="查看"
            placement="top"
          >
            <el-icon class="icon-view" @click="ItemView(scope.row)"
              ><View
            /></el-icon>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="编辑"
            placement="top"
          >
            <el-icon class="icon-edit" @click="editorClick(scope.row)"
              ><Edit
            /></el-icon>
          </el-tooltip>
          <el-tooltip
            class="box-item"
            effect="dark"
            content="日志"
            placement="top"
          >
            <el-icon class="icon-edit" @click="logClick(scope.row)"
              ><HelpFilled
            /></el-icon>
          </el-tooltip>

          <el-popconfirm
            confirm-button-text="确认"
            cancel-button-text="取消"
            :icon="InfoFilled"
            icon-color="#626AEF"
            title="确认删除该用户?"
            @confirm="DeleteItem(scope.row)"
          >
            <template #reference>
              <el-icon class="icon-dele"><Delete /></el-icon>
            </template>
          </el-popconfirm>
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
    v-model="logDialogVisible"
    title="日志"
    :width="dialogWidth"
    draggable
  >
    <div class="log-box">
      <div
        class="log-list"
        :style="
          item.type === 'SUCCESS'
            ? 'color:green'
            : item.type === 'ERROR'
            ? 'color:red'
            : item.type === 'close'
            ? 'color:blue'
            : ''
        "
        v-for="item in logDialogData"
        :key="item.id"
      >
        {{ item.data }}
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="logDialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog
    v-model="dialogVisible"
    :title="`${dialogData.title}用户（需要新版抖音cookie和token）`"
    :width="dialogWidth"
    :hide-required-asterisk="dialogData.isView"
    draggable
  >
    <el-form
      :model="dialogData.FormData"
      :rules="rules"
      ref="FormRef"
      :disabled="dialogData.isView"
      class="demo-ruleForm"
    >
      <el-form-item
        label="抖音名"
        :label-width="formLabelWidth"
        prop="dy_name"
      >
        <el-input v-model="dialogData.FormData.dy_name" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="抖音号"
        :label-width="formLabelWidth"
        prop="dy_id"
      >
        <el-input v-model="dialogData.FormData.dy_id" autocomplete="off" />
        <el-popover
          :width="500"
          popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
        >
          <template #reference>
            <el-icon class="icon-edit"><QuestionFilled /></el-icon>
          </template>
          <template #default>
            <div
              class="demo-rich-conent"
              style="display: flex; gap: 16px; flex-direction: column"
            >
              <img src="../../../assets/images/userid.png" alt="">
              <div>
                <p
                  class="demo-rich-content__name"
                  style="margin: 0; font-weight: 500"
                >
                  https://www.douyin.com/user/<font color="red">MS4wLjABAAAAbitfxguXXXXXXXXXXXX4tlFhdZkopnis5iElQyFQzskJS8kpC08</font>红色的就是userid
                </p>
              </div>
            </div>
          </template>
        </el-popover>
      </el-form-item>
      <el-form-item
        label="userid"
        :label-width="formLabelWidth"
        prop="userid"
      >
        <el-input v-model="dialogData.FormData.userid" autocomplete="off" />
      </el-form-item>
      <el-form-item label="cookie" :label-width="formLabelWidth" prop="cookie">
        <el-input
          v-model="dialogData.FormData.cookie"
          autocomplete="off"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="token" :label-width="formLabelWidth" prop="token">
        <el-input
          v-model="dialogData.FormData.token"
          autocomplete="off"
          type="textarea"
        />
      </el-form-item>

      <el-form-item label="gorgon" :label-width="formLabelWidth" prop="gorgon">
        <el-input v-model="dialogData.FormData.gorgon" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button v-if="!dialogData.isView" type="primary" @click="onSubmit()"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import axios from "axios";
import {
  Search,
  Edit,
  Delete,
  UserFilled,
  InfoFilled,
  View,
  CaretRight,
} from "@element-plus/icons-vue";
import { addUserList, listUpdate } from "@api/apis.js";
import { options } from "./options.js";
import { nextTick, onMounted, reactive, ref, toRefs, watch } from "vue";
import { ElMessage } from "element-plus";
import { getDateTime } from "../../../utils/index.js";
import {
  addUsers,
  delUsers,
  getUsersLists,
  updateUsers,
} from "../plugin/system.api.js";
const queryData = ref({
  page: 1,
  limit: 10,
});
const FormRef = ref();
const formLabelWidth = "140px";
const dialogData = reactive({
  isView: true,
  title: "添加",
  FormData: {
    dy_name: "",
    dy_id: "",
    userid: "",
    cookie: "",
    token: "",
    gorgon: "",
  },
});

const dialogWidth = ref("0");
const rules = reactive({
  cookie: [{ required: true, message: "请填写用户cookie", trigger: "change" }],
  token: [{ required: true, message: "请填写用户token", trigger: "change" }],
  userid: [{ required: true, message: "请填写用户userid", trigger: "change" }],
  gorgon: [{ required: false, message: "请填写用户gorgon", trigger: "change" }],
});
const oldTableData = ref([]);
const dialogVisible = ref(false);
const tableData = ref([]);
const total = ref(0);

const initData = () => {
  getUsersLists(queryData.value).then((res) => {
    console.log(res);
    total.value = res.data?.total;
    tableData.value = res.data?.data;
  });
};

const dialogVisibleShow = () => {
  dialogData.FormData = {
    cookie: "",
    token: "",
    gorgon: "",
  };
  dialogVisible.value = true;
  dialogData.isView = false;
};

const onSubmit = () => {
  console.log(dialogData.FormData);
  FormRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      if (dialogData.FormData.id) {
        updateUsers(dialogData.FormData)
          .then((res) => {
            console.log("编辑数据成功");
            console.log(ElMessage);
            if (res.data.success) {
              ElMessage({
                message: "编辑用户成功",
                type: "success",
              });
            } else {
              ElMessage({
                message: "编辑用户失败",
                type: "error",
              });
            }
          })
          .finally(() => {
            initData(queryData.value);
          });
      } else {
        addUsers(dialogData.FormData)
          .then((res) => {
            if (res.data.status_code == 200) {
              ElMessage({
                message: "添加用户成功",
                type: "success",
              });
            } else {
              ElMessage({
                message: "添加用户失败",
                type: "error",
              });
            }
          })
          .catch((err) => {})
          .finally(() => {
            initData(queryData.value);
          });
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
  dialogData.isView = false;
  dialogData.title = "编辑";
};

const ItemView = (item) => {
  dialogVisible.value = true;
  dialogData.FormData = item;
  dialogData.isView = true;
  dialogData.title = "";
};

const DeleteItem = (row) => {
  delUsers(row.id).then((res) => {
    console.log(res);
    if (res.data.success) {
      ElMessage({
        message: "删除用户成功",
        type: "success",
      });
    }
    initData(queryData.value);
  });
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

const logData = reactive({});
// 运行的方法
const Run = (row) => {
  if (!row?.userid) {
    ElMessage({
      message: "删除用户成功",
      type: "waring",
    });
    return
  }
  const socket = new WebSocket("ws://110.42.222.77:3004/socket");
  // const socket = new WebSocket("ws://127.0.0.1:3004/socket");
  socket.onopen = () => {
    socket.send(
      JSON.stringify({
        command: "unrecommend.js",
        args: row,
      })
    );
    handleIsRun(row);
  };

  socket.onmessage = (event) => {
    // 处理从服务器接收到的消息
    let data = JSON.parse(event.data);
    // 判断logData对象里是否包含某个字段
    if (logData.hasOwnProperty(data.threadName)) {
      logData[data.threadName].push(data);
      // 如果logData[data.threadName]数组长度超过30,则删除第一个元素
      if (logData[data.threadName].length > 30) {
        logData[data.threadName].shift();
      }
    } else {
      logData[data.threadName] = [data];
    }
  };
};

// 日志窗口
const logDialogVisible = ref(false);
const logDialogData = reactive([]);
const logClick = (row) => {
  logDialogVisible.value = true;
  const data = reactive(logData[row.id] || []);
  logDialogData.splice(0, logDialogData.length, ...data);
};

// 处理是否在运行的函数
const handleIsRun = (row) => {
  const data = reactive(logData[row.id] || []);
  if (data.length) {
    if (
      data.some((item) => item.type === "close") ||
      data.some((item) => item.type === "ERROR")
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
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
.icon-view {
  font-size: 20px;
  color: #673ab7;
  margin: 0 10px;
}
.icon-edit {
  font-size: 20px;
  color: #2f60c2;
  margin: 0 10px;
}
.icon-dele {
  font-size: 20px;
  color: #ff5722;
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
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.log-box {
  background: #333;
  color: white;
  padding: 16px;
  min-height: 200px;
  max-height: 350px;
  overflow: hidden;
  overflow-y: scroll;
}

.runing {
  animation: rotate 2s linear infinite; /* 使用名为"rotate"的动画，持续时间2秒，线性运动，无限循环 */
}

@keyframes rotate {
  from {
    transform: rotate(0deg); /* 从0度开始旋转 */
  }
  to {
    transform: rotate(360deg); /* 旋转360度 */
  }
}
</style>
