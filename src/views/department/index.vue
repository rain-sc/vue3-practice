<script setup lang="ts">
import { getDepartmentListAPI } from '@/api/department'
import type { DepartmentListType } from '@/api/department/types'

defineOptions({
  name: 'Department',
  inheritAttrs: false,
})

const departmentList = ref<DepartmentListType[]>([])
const loading = ref<boolean>(false)
const dialog = reactive({
  title: '',
  visible: false,
})
const rules = reactive({
  managerId: [
    {
      required: true,
      message: '部門負責人不能為空',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: '部門編碼不能為空',
      trigger: 'blur',
    },
    {
      min: 2,
      max: 10,
      message: '部門編碼的長度為2-10個字符',
      trigger: 'blur',
    },
    // {
    //   trigger: 'blur',
    //   validator: async (rule, value, callback) => {
    //     const result = await getDepartmentList()

    //     if (result.data.data.some(item => item.code === value))
    //       callback(new Error('部門中已經有該編碼了'))
    //     else
    //       callback()
    //   },
    // },
  ],
  name: [
    {
      required: true,
      message: '部門名稱不能為空',
      trigger: 'blur',
    },
    {
      min: 2,
      max: 10,
      message: '部門名稱的長度為2-10個字符',
      trigger: 'blur',
    },
    // {
    //   trigger: 'blur',
    //   validator: async (rule, value, callback) => {
    //     const result = await getDepartmentList()
    //     if (result.data.data.some(item => item.name === value))
    //       callback(new Error('部门中已经有该名称了'))
    //     else
    //       callback()
    //   },
    // },
  ],
  introduce: [
    {
      required: true,
      message: '部門介紹不能為空',
      trigger: 'blur',
    },
    {
      min: 1,
      max: 100,
      message: '部門介紹的長度為1-100個字符',
      trigger: 'blur',
    },
  ],
})
const formData = reactive({
  code: '',
  introduce: '',
  managerId: 0,
  name: '',
  pid: 0,
})
const deptFormRef = ref(ElForm)

async function getDepartmentList() {
  try {
    loading.value = true
    const { data } = await getDepartmentListAPI()
    departmentList.value = transListToTreeData(data.data, 0)
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

function transListToTreeData(list: DepartmentListType[], rootValue: number) {
  const treeArray: DepartmentListType[] = []
  list.forEach((item) => {
    if (item.pid === rootValue) {
      const children = transListToTreeData(list, item.id)
      if (children.length)
        item.children = children
      treeArray.push(item)
    }
  })
  return treeArray
}

function openDialog(id: number, type: string) {
  dialog.visible = true
  if (type === 'add')
    dialog.title = '新增子部門'

  else if (type === 'edit')
    dialog.title = '編輯部門'

  else
    dialog.title = '刪除部門'
}

function closeDialog() {
  dialog.visible = false
}

async function handleSubmit() {
  try {
    deptFormRef.value.validate((valid: any) => {
    })
  }
  catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getDepartmentList()
})
</script>

<template>
  <div class="app-container">
    <el-card shadow="never" class="table-container">
      <el-table
        v-loading="loading"
        border
        :data="departmentList"
        row-key="id"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="Departments" min-width="150" />
        <el-table-column prop="managerName" label="Position" min-width="150" />
        <el-table-column label="Actions" fixed="right" align="left" width="230">
          <template #default="scope">
            <ElButton
              type="primary"
              @click.stop="openDialog(scope.row.id, 'add')"
            >
              新增
            </ElButton>
            <ElButton
              type="success"
            >
              編輯
            </ElButton>
            <ElButton
              type="danger"
            >
              刪除
            </ElButton>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="dialog.visible"
      :title="dialog.title"
      width="600px"
      @closed="closeDialog"
    >
      <el-form
        ref="deptFormRef"
        :model="formData"
        :rules="rules"
        label-width="100px"
      >
        <el-form-item prop="name" label="部門名稱">
          <el-input v-model="formData.name" placeholder="2-10個字符" />
        </el-form-item>
        <el-form-item label="部門編碼" prop="code">
          <el-input v-model="formData.code" placeholder="2-10個字符" />
        </el-form-item>
        <el-form-item label="部門負責人" prop="managerId">
          <el-select v-model="formData.managerId" placeholder="請選擇負責人" />
        </el-form-item>
        <el-form-item label="部門介紹" prop="introduce">
          <el-input v-model="formData.introduce" placeholder="1-100個字符" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">
            確定
          </el-button>
          <el-button>
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">

</style>
