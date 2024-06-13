<script setup lang="ts">
import FileSaver from 'file-saver'
import { ElDialog, ElMessage, ElUpload } from 'element-plus'
import {
  addEmployeeAPI,
  deleteCurrentEmployeeAPI,
  editCurrentEmployeeAPI,
  exportEmployeeListAPI,
  getCurrentEmployeeDetailAPI,
  getEmployeeListAPI,
  importEmployeeListAPI,
  importEmployeeTemplateAPI,
} from '@/api/employee'
import type { EmployeeItemType, EmployeeParamsType } from '@/api/employee/types'
import useDepartmentList from '@/hooks/useDepartmentList'
import { employmentTypes } from '@/enums/TableEnum'

defineOptions({
  name: 'Employee',
  inheritAttrs: false,
})
const { getDepartmentList, departmentList, departmentId, departmentListLoading } = useDepartmentList()
const employeeList = ref<EmployeeItemType[]>([])
const employeeQueryParams = reactive<EmployeeParamsType>({
  page: 1,
  size: 10,
  departmentId: null,
  keyword: '',
})
const loading = ref(false)
const employeeTotal = ref<number>(0)
const departmentTreeRef = ref(ElTree)
const exportButtonLoading = ref<boolean>(false)
const dialog = reactive({
  visible: false,
  title: '',
  loading: false,
  type: '',
  submitLoading: false,
})
const importData = reactive({
  fileList: [],
  file: undefined,
})
const uploadRef = ref(ElUpload)
const employeeFormRef = ref(ElForm)
const formData = ref<EmployeeItemType>({})
const rules = reactive({
  username: [
    {
      required: true,
      message: '請輸入姓名',
      trigger: 'blur',
    },
    {
      min: 2,
      max: 4,
      message: '姓名為2-4位',
    },
  ],
  mobile: [
    {
      required: true,
      message: '請輸入手機號',
      trigger: 'blur',
    },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: '手機號格式不正確',
      trigger: 'blur',
    },
  ],
  formOfEmployment: [
    {
      required: true,
      message: '請選擇聘用形式',
      trigger: 'blur',
    },
  ],
  departmentId: [
    {
      required: true,
      message: '請選擇部門',
      trigger: 'blur',
    },
  ],
  timeOfEntry: [
    {
      required: true,
      message: '請選擇入職時間',
      trigger: 'blur',
    },
  ],
  correctionTime: [{ required: true, message: '請選擇轉正時間', trigger: 'blur' }, {
    validator: (rule: any, value: any, callback: any) => {
      if (formData.value.timeOfEntry) {
        if (new Date(formData.value.timeOfEntry) > new Date(value)) {
          callback(new Error('轉正時間不能小於入職時間'))
          return
        }
      }
      callback()
    },
  }],
})
const treeDataProps = ref({
  value: 'id',
  label: 'name',
  checkStrictly: true,
  children: 'children',
})

async function getEmployeeList() {
  loading.value = true
  try {
    const res = await getEmployeeListAPI(employeeQueryParams)
    const resData = res.data.data!
    employeeList.value = resData.rows
    employeeTotal.value = resData.total
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

async function currentChange(node: any) {
  Object.assign(employeeQueryParams, { departmentId: node.id, page: 1 })
  await getEmployeeList()
}

async function handleSearchEmployeeList() {
  Object.assign(employeeQueryParams, { page: 1 })
  await getEmployeeList()
}

async function handleExportEmployeeList() {
  if (exportButtonLoading.value)
    return
  try {
    exportButtonLoading.value = true
    const res = await exportEmployeeListAPI()
    FileSaver.saveAs(res.data, '員工列表.xlsx')
  }
  catch (error) {
    console.error(error)
  }
  finally {
    exportButtonLoading.value = false
  }
}

async function handleDownloadEmployeeTemplate() {
  try {
    const res = await importEmployeeTemplateAPI()
    FileSaver.saveAs(res.data, '員工導入模板.xlsx')
  }
  catch (error) {
    console.error(error)
  }
}

async function openDialog(type: string, data?: EmployeeItemType) {
  dialog.visible = true
  dialog.type = type
  if (dialog.type === 'employeeForm') {
    if (data?.id) {
      dialog.title = '員工詳情'
      await getCurrentEmployeeDetail(data!)
    }
    else {
      dialog.title = '新增員工'
    }
  }
  else if (dialog.type === 'importEmployeeList') {
    dialog.title = '員工列表導入'
  }
}

function closeDialog() {
  dialog.visible = false

  if (dialog.type === 'employeeForm') {
    employeeFormRef.value.resetFields()
    employeeFormRef.value.clearValidate()
    formData.value = {}
  }
  else if (dialog.type === 'importEmployeeList') {
    importData.file = undefined
    importData.fileList = []
  }
  dialog.loading = false
  dialog.type = ''
  dialog.submitLoading = false
}

function handleFileChange(file: any) {
  importData.file = file.raw
}

function handleFileExceed(files: any) {
  uploadRef.value.clearFiles()
  const file = files[0]
  uploadRef.value!.handleStart(file)
  importData.file = file
}

const handleSubmit = useThrottleFn(async () => {
  if (dialog.submitLoading)
    return
  dialog.submitLoading = true
  if (dialog.type === 'importEmployeeList') {
    if (!importData.file) {
      ElMessage.warning('上傳Excel文件不能為空')
      return false
    }
    try {
      await importEmployeeListAPI(importData.file)
      ElMessage.success('導入成功')
    }
    catch (error) {
      console.error(error)
    }
    finally {
      closeDialog()
      getEmployeeList()
      getDepartmentList()
    }
  }
  else if (dialog.type === 'employeeForm') {
    const validateForm = () => new Promise((resolve) => {
      employeeFormRef.value.validate((valid: any) => {
        resolve(valid)
      })
    })
    const isValid = await validateForm()
    try {
      if (isValid) {
        const id = formData.value.id
        if (id) {
          const res = await editCurrentEmployeeAPI(formData.value)
          if (res.data.code === 10000 && res.data.success) {
            ElMessage.success('修改成功')
            closeDialog()
            getEmployeeList()
            getDepartmentList()
          }
        }
        else {
          const res = await addEmployeeAPI(formData.value)
          if (res.data.code === 10000 && res.data.success) {
            ElMessage.success('新增成功')
            closeDialog()
            getEmployeeList()
            getDepartmentList()
          }
        }
      }
    }
    catch (error) {
      console.error(error)
    }
    finally {
      dialog.submitLoading = false
    }
  }
}, 3000)

async function handleDeleteCurrentEmployee(id: number) {
  try {
    await ElMessageBox.confirm('確認刪除用戶?', '警告', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    await deleteCurrentEmployeeAPI(id)
    ElMessage.success('删除成功')
  }
  catch (error) {
    console.error(error)
  }
  finally {
    await getEmployeeList()
    await getDepartmentList()
  }
}
function changeDepartmentId(list: any) {
  if (list.length === 0)
    return
  formData.value.departmentId = list[list.length - 1]
}

async function getCurrentEmployeeDetail(data: EmployeeItemType) {
  dialog.loading = true
  try {
    const res = await getCurrentEmployeeDetailAPI(data)
    const resData = res.data.data
    formData.value = resData!
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
  // departmentTreeRef.value.setCurrentKey(departmentId.value)
  getEmployeeList()
})
</script>

<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :lg="4" :xs="24" class="mb-[12px]">
        <el-card shadow="never">
          <el-input
            v-model="employeeQueryParams.keyword"
            type="text"
            size="small"
            placeholder="輸入員工姓名"
            @input="handleSearchEmployeeList"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
          <el-tree
            ref="departmentTreeRef"
            v-loading="departmentListLoading"
            :props="{ children: 'children', label: 'name', disabled: '' }"
            :expand-on-click-node="false"
            default-expand-all
            :highlight-current="true"
            class="mt-2"
            :data="departmentList"
            node-key="id"
            :current-node-key="departmentId"
            @current-change="currentChange"
          />
        </el-card>
      </el-col>

      <el-col :lg="20" :xs="24">
        <div class="search-container">
          <el-row class="opeate-tools gap-x-2" type="flex" justify="end">
            <el-button type="primary" @click="openDialog('employeeForm')">
              新增員工
            </el-button>
            <el-dropdown split-button>
              導入
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="handleDownloadEmployeeTemplate">
                    <el-icon><Download /></el-icon>下載模板
                  </el-dropdown-item>
                  <el-dropdown-item @click="openDialog('importEmployeeList')">
                    <el-icon><Top /></el-icon>excel導入
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <el-button
              :loading="exportButtonLoading"
              @click="handleExportEmployeeList"
            >
              excel導出
            </el-button>
          </el-row>
        </div>
        <el-card shadow="never" class="table-container">
          <el-table
            v-loading="loading"
            :data="employeeList"
          >
            <el-table-column prop="staffPhoto" align="center" label="頭像">
              <template #default="{ row }">
                <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30" />
                <span v-else class="username">{{ row.username?.charAt(0) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="username" label="姓名" />
            <el-table-column prop="mobile" label="手機號碼" sortable />
            <el-table-column prop="workNumber" label="員工編號" sortable />
            <el-table-column prop="formOfEmployment" label="聘用形式">
              <template #default="{ row }">
                <span v-if="row.formOfEmployment === employmentTypes.regular">正式</span>
                <span v-else-if="row.formOfEmployment === employmentTypes.irregular">非正式</span>
                <span v-else>無</span>
              </template>
            </el-table-column>
            <el-table-column prop="departmentName" label="部門" />
            <el-table-column prop="timeOfEntry" label="入職時間" sortable />
            <el-table-column label="操作" fixed="right" width="220">
              <template #default="scope">
                <el-button
                  type="primary"
                  link
                  size="small"
                  @click="openDialog('employeeForm', scope.row)"
                >
                  <el-icon><Edit /></el-icon>編輯
                </el-button>
                <el-button
                  size="small"
                  link
                  type="primary"
                  @click="handleDeleteCurrentEmployee(scope.row.id)"
                >
                  <el-icon><Delete /></el-icon>刪除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-if="employeeTotal > 0"
            v-model:total="employeeTotal"
            v-model:page="employeeQueryParams.page"
            v-model:limit="employeeQueryParams.size"
            layout="prev, pager, next"
            @pagination="getEmployeeList"
          />
        </el-card>
      </el-col>
    </el-row>
    <ElDialog
      v-model="dialog.visible"
      custom-class="dialogLoading"
      :title="dialog.title"
      width="500px"
      append-to-body
      @close="closeDialog"
    >
      <el-form
        v-if="dialog.type === 'importEmployeeList'"
        :model="importData"
        label-width="100px"
      >
        <el-form-item label="Excel文件">
          <ElUpload
            ref="uploadRef"
            action=""
            drag
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            :limit="1"
            :auto-upload="false"
            :file-list="importData.fileList"
            :on-change="handleFileChange"
            :on-exceed="handleFileExceed"
          >
            <el-icon size="50">
              <UploadFilled />
            </el-icon>
            <div class="el-upload__text">
              將文件拖到此處,或
              <em>點擊上傳</em>
            </div>
            <template #tip>
              <div>xls/xlsx files</div>
            </template>
          </ElUpload>
        </el-form-item>
      </el-form>

      <div
        v-if="dialog.type === 'employeeForm'"
        v-loading="dialog.loading"
      >
        <el-form

          ref="employeeFormRef"
          :model="formData"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="姓名" prop="username">
            <el-input
              v-model="formData.username"
              placeholder="請輸入姓名"
            />
          </el-form-item>
          <el-form-item label="員工編號" prop="workNumber">
            <el-input
              v-model="formData.workNumber"
              readonly
              :disabled="true"
            />
          </el-form-item>
          <el-form-item label="手機號碼" prop="mobile">
            <el-input
              v-model="formData.mobile"
              placeholder="請輸入手機號碼"
              :readonly="formData.id ? true : false"
              :disabled="formData.id ? true : false"
            />
          </el-form-item>
          <el-form-item label="部門" prop="departmentId">
            <el-cascader
              v-model="formData.departmentId"
              :options="departmentList"
              :props="treeDataProps"
              separator="-"
              :value="formData.departmentId"
              placeholder="請選擇部門"
              @change="changeDepartmentId"
            />
          </el-form-item>
          <el-form-item label="聘用形式" prop="formOfEmployment">
            <el-select
              v-model="formData.formOfEmployment"
              placeholder="請輸入聘用形式"
            >
              <el-option label="正式" :value="employmentTypes.regular" />
              <el-option label="非正式" :value="employmentTypes.irregular" />
            </el-select>
          </el-form-item>
          <el-form-item label="入職時間" prop="timeOfEntry">
            <el-date-picker
              v-model="formData.timeOfEntry "
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="請輸入入職時間"
            />
          </el-form-item>

          <el-form-item label="轉正時間" prop="correctionTime">
            <el-date-picker
              v-model="formData.correctionTime"
              type="date"
              value-format="YYYY-MM-DD"
              placeholder="請輸入轉正時間"
            />
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer">
        <el-button
          :loading="dialog.submitLoading"
          type="primary"
          @click="handleSubmit"
        >
          確定
        </el-button>
        <el-button @click="closeDialog">
          取消
        </el-button>
      </div>
    </ElDialog>
  </div>
</template>

<style scoped lang="scss">
.username{
  display: inline-block;
  height: 30px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  background: #04c9be;
  font-size: 12px;
}

:deep(.el-dropdown__caret-button){
  &:focus-within{
    outline: none;
  }
}
</style>
