<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  addDepartmentAPI,
  deleteCurrentDepartmentAPI,
  editCurrentDepartmentAPI,
  getCurrentDepartmentDetailAPI,
  getDepartmentHeadListAPI,
  getDepartmentListAPI,
} from '@/api/department'
import type { DepartmentListBaseType, DepartmentListType } from '@/api/department/types'
import type { ResponseData } from '@/types/global'
import useDepartmentList from '@/hooks/useDepartmentList'

defineOptions({
  name: 'Department',
  inheritAttrs: false,
})

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
const buttonActionType = ref<string>('')
const currentId = ref<string>('')
const { getDepartmentList, departmentList, loading } = useDepartmentList()

async function openDialog(rowData: DepartmentListBaseType, type: string) {
  try {
    buttonActionType.value = type

    if (buttonActionType.value !== 'delete') {
      dialog.visible = true
      dialog.loading = true
    }

    const isCurrentDepartmentDetailLoaded = await currentDepartmentDetailResponse(rowData)
    if (!isCurrentDepartmentDetailLoaded)
      return

    await getDepartmentHeadList()

    currentId.value = rowData.id!.toString()

    switch (type) {
      case 'add':
        dialog.title = '新增子部門'
        break
      case 'edit':
        dialog.title = '編輯部門'
        await getCurrentDepartmentDetail(rowData)
        break
      case 'delete':
        await handleDeleteDepartment(rowData)
        break
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    dialog.loading = false
  }
}

function handleResponseMessage(res: ResponseData<DepartmentListBaseType>) {
  if (res.code === 40001) {
    dialog.visible = false
    ElMessage({ type: 'warning', message: '刪除部門失敗：部門資訊已不存在' })
  }
  else if (res.code === 50001) {
    ElMessage({ type: 'error', message: '初始化資料不可以刪除修改,請選擇其他資料操作' })
  }
  else if (res.code === 10000 && !res.success) {
    ElMessage({ type: 'warning', message: '部門不存在' })
    dialog.visible = false
    return null
  }
}

function closeDialog() {
  dialog.visible = false
  dialog.loading = false
  dialog.title = ''
  resetForm()
}

async function handleSubmit() {
  if (!deptFormRef.value)
    return

  try {
    dialog.loading = true

    const validateForm = () => new Promise((resolve) => {
      deptFormRef.value.validate((valid: any) => {
        resolve(valid)
      })
    })

    const isValid = await validateForm()
    if (isValid) {
      const action = buttonActionType.value === 'add'
        ? addDepartmentAPI({ ...formData, pid: currentId.value })
        : editCurrentDepartmentAPI(formData)

      const res = await action
      handleResponseMessage(res.data)

      if (res.data.code === 10000 && res.data.success) {
        ElMessage({
          type: 'success',
          message: buttonActionType.value === 'add' ? '新增成功' : '編輯成功',
        })
      }

      closeDialog()
      await getDepartmentList()
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    dialog.loading = false
  }
}

async function getDepartmentHeadList() {
  try {
    const res = await getDepartmentHeadListAPI()
    const resData = res.data.data!
    departmentHeadList.value = resData
  }
  catch (error) {
    console.error(error)
  }
}

function resetForm() {
  deptFormRef.value?.resetFields()
  deptFormRef.value?.clearValidate()
  Object.assign(formData, { code: '', introduce: '', managerId: '', name: '', pid: '' })
}

async function validateField(fieldName: string, errorMessage: string, value: any, callback: any) {
  try {
    const res = await getDepartmentListAPI()
    const resData = res.data.data!
    const filteredData = formData.id ? resData.filter(item => item.id !== formData.id) : resData
    if (filteredData.some((item: any) => item[fieldName] === value))
      callback(new Error(errorMessage))
    else
      callback()
  }
  catch (error) {
    console.error(error)
  }
}

async function checkCodeValid(rule: any, value: any, callback: any) {
  await validateField('code', '部門中已經有該編碼了', value, callback)
}

async function checkNameValid(rule: any, value: any, callback: any) {
  await validateField('name', '部門中已經有該名稱了', value, callback)
}

async function currentDepartmentDetailResponse(data: DepartmentListBaseType) {
  const res = await getCurrentDepartmentDetailAPI(data)
  handleResponseMessage(res.data)
  return res.data.data
}

async function getCurrentDepartmentDetail(data: DepartmentListBaseType) {
  try {
    if (!data)
      return
    Object.assign(formData, data)
    dialog.visible = true
  }
  catch (error) {
    console.error(error)
  }
  finally {
    dialog.loading = false
  }
}

async function handleDeleteDepartment(rowData: DepartmentListBaseType) {
  try {
    await ElMessageBox.confirm('您確認要刪除該部門嗎', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    loading.value = true
    const res = await deleteCurrentDepartmentAPI(rowData)
    handleResponseMessage(res.data)
    ElMessage({ type: 'success', message: '刪除部門成功' })
  }
  catch (error) {
    console.error(error)
  }
  finally {
    await getDepartmentList()
  }
}

onMounted(async () => {
  await getDepartmentList()
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
              @click.stop="openDialog(scope.row, 'delete')"
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
