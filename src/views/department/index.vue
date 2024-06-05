<script setup lang="ts">
import { ElMessage } from 'element-plus'
import {
  addDepartmentAPI,
  getCurrentDepartmentDetailAPI,
  getDepartmentHeadListAPI,
  getDepartmentListAPI,
} from '@/api/department'
import type { DepartmentListBaseType, DepartmentListType } from '@/api/department/types'

defineOptions({
  name: 'Department',
  inheritAttrs: false,
})

const departmentList = ref<DepartmentListType[]>([])
const loading = ref<boolean>(false)
const dialog = reactive({
  title: '',
  visible: false,
  loading: false,
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
    {
      trigger: 'blur',
      asyncValidator: checkCodeValid,
    },
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
    {
      trigger: 'blur',
      asyncValidator: checkNameValid,
    },
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
const formData = reactive<DepartmentListBaseType>({
  code: '',
  introduce: '',
  managerId: '',
  name: '',
  pid: '',
})
const deptFormRef = ref(ElForm)
const departmentHeadList = ref<DepartmentListBaseType[]>([])
const buttionActionType = ref<string>('')
const currentId = ref<string>('')

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

function transListToTreeData(list: DepartmentListType[], parentId: string | number) {
  const treeArray: DepartmentListType[] = []
  list.forEach((item) => {
    if (item.pid === parentId) {
      const children = transListToTreeData(list, item.id!)
      if (children.length)
        item.children = children
      treeArray.push(item)
    }
  })
  return treeArray
}

async function openDialog(rowData: DepartmentListBaseType, type: string) {
  await getDepartmentHeadList()
  dialog.visible = true
  buttionActionType.value = type
  currentId.value = rowData.id!
  if (buttionActionType.value === 'add') {
    dialog.title = '新增子部門'
  }
  else if (buttionActionType.value === 'edit') {
    dialog.title = '編輯部門'
    await getCurrentDepartmentDetail(rowData)
  }
  else {
    dialog.title = '刪除部門'
  }
}

function closeDialog() {
  dialog.visible = false
  dialog.loading = false
  resetForm()
}

async function handleSubmit() {
  if (!deptFormRef.value)
    return

  deptFormRef.value.validate(async (valid: any) => {
    if (valid) {
      dialog.loading = true
      try {
        if (buttionActionType.value === 'add') {
          await addDepartmentAPI({ ...formData, pid: currentId.value })
          ElMessage({ type: 'success', message: '新增成功' })
        }
      }
      catch (error) {
        console.error(error)
      }
      finally {
        closeDialog()
        await getDepartmentList()
      }
    }
  })
}

async function getDepartmentHeadList() {
  try {
    const { data } = await getDepartmentHeadListAPI()
    departmentHeadList.value = data.data
  }
  catch (error) {
    console.error(error)
  }
}

function resetForm() {
  deptFormRef.value.resetFields()
  deptFormRef.value.clearValidate()

  formData.code = ''
  formData.introduce = ''
  formData.managerId = ''
  formData.name = ''
  formData.pid = ''
}

async function validateField(fieldName: string, errorMessage: string, rule: any, value: any, callback: any) {
  try {
    const { data } = await getDepartmentListAPI()
    if (data.data.some((item: any) => item[fieldName] === value))
      callback(new Error(errorMessage))
    else
      callback()
  }
  catch (error) {
    console.error(error)
  }
}

async function checkCodeValid(rule: any, value: any, callback: any) {
  await validateField('code', '部門中已經有該編碼了', rule, value, callback)
}

async function checkNameValid(rule: any, value: any, callback: any) {
  await validateField('name', '部門中已經有該名稱了', rule, value, callback)
}

async function getCurrentDepartmentDetail(data: DepartmentListBaseType) {
  try {
    dialog.loading = true
    const res = await getCurrentDepartmentDetailAPI(data)
    const resData = res.data.data
    Object.assign(formData, resData)
  }
  catch (error) {
    console.error(error)
  }
  finally {
    dialog.loading = false
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
              @click.stop="openDialog(scope.row, 'add')"
            >
              新增
            </ElButton>
            <ElButton
              type="success"
              @click.stop="openDialog(scope.row, 'edit')"
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
      <div v-loading=" dialog.loading">
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
            <el-select v-model="formData.managerId" placeholder="請選擇負責人">
              <el-option
                v-for="item in departmentHeadList"
                :key="item.id"
                :label="item.username"
                :value="item.id!"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="部門介紹" prop="introduce">
            <el-input v-model="formData.introduce" placeholder="1-100個字符" type="textarea" :rows="4" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="dialog.loading"
              @click="handleSubmit"
            >
              確定
            </el-button>
            <el-button @click="closeDialog">
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">

</style>
