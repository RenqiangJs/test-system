<template>
  <el-card shadow="never" class="henader-card">
    <el-table :data="tableData" :header-cell-style="{ backgroundColor: '#ecf5ff' }" border stripe style="width: 100%">
      <el-table-column v-for="item in options" :type="item?.type" :key="item.props" :prop="item.props"
        :label="item.label" :width="item.width" :align="item.align" show-overflow-tooltip :fixed="item.fixed">
        <template v-slot:default="scope" v-if="item.props === 'explain'">
          <div class="operationGroup">
            <el-button type="primary" size="small" link>
              上传
            </el-button>
            <el-button type="primary" size="small" link>
              预览
            </el-button>
            <el-button type="primary" size="small" link>
              下载
            </el-button>
          </div>
        </template>
        <template v-slot:default="scope" v-if="item.props === 'resource'">
          <div class="operationGroup">
            <el-button type="primary" size="small" link>
              上传
            </el-button>
            <el-button type="primary" size="small" link>
              下载
            </el-button>
          </div>
        </template>
        <template v-slot:default="scope" v-if="item.props === 'setting'">
          <div class="operationGroup">
            <el-button type="primary" size="small" @click="setQuestionBank" link>
              设置
            </el-button>
          </div>
        </template>
        <template v-slot:default="scope" v-if="item.props === 'scoreSetting'">
          <div class="operationGroup">
            <el-button type="primary" size="small" link>
              设置
            </el-button>
          </div>
        </template>
        <template v-slot:default="scope" v-if="item.props === 'actions'">
          <div class="operationGroup">
            <el-button type="primary" size="small" link>
              修改
            </el-button>
            <el-button type="primary" size="small" link>
              删除
            </el-button>
            <el-button type="primary" size="small" link>
              导入
            </el-button>
            <el-button type="primary" size="small" link>
              导出
            </el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55" key="selection" />
    </el-table>
    <el-pagination small background :page-size="queryData.size" layout="prev, pager, next" :total="total" class="mt-4"
      @current-change="handleCurrentChange" />
  </el-card>
</template>

<script setup>
import { getUserList } from '@api/apis.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { options } from './options.js'
const router = useRouter()
const queryData = ref({
  page: 1,
  size: 10,
})

const total = ref(0)
const tableData = [
  {
    username: '2',
    email: 'Aleyna Kutzner',
    explain: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
    resource: '1',
    setting: '2',
    scoreSetting: '3',
    actions: '4'
  }
]
const initData = () => {

}
const setQuestionBank = () => {
  router.push({ path: '/home' })
}



onMounted(() => {
  // initData()
})
const handleCurrentChange = () => {

}
</script>

<style lang="scss" scoped>
.henader-card {
  margin-top: 50px;
  width: 70vw;
}

.operationGroup {
  width: 100%;
  display: flex;
  color: #2f60c2;
  justify-content: center;

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
