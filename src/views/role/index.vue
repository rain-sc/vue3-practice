<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { addRoleAPI, deleteCurrentRoleAPI, editCurrentRoleAPI, getCurrentRoleDetailAPI, getRoleListAPI } from '@/api/role'
import type { RoleItemType, RoleListParamsType } from '@/api/role/types'
import { State } from '@/enums/TableEnum'

defineOptions({
  name: 'Role',
  inheritAttrs: false,
})
const roleParams = reactive<RoleListParamsType>({
  page: 1,
  pagesize: 10,
  total: 0,
})
const roleList = ref<RoleItemType[]>([])
const loading = ref(false)
const roleTableRef = ref(ElForm)
const dialog = reactive ({
  visible: false,
  title: '',
  loading: false,
})
const formData = reactive<RoleItemType>({
  name: '',
  state: 0,
  description: '',
})
const roleFormRef = ref(ElForm)
const rules = reactive({
  name: [
    {
      required: true,
      message: '角色名稱不能為空',
      trigger: 'blur',
    },
  ],
  description: [
    {
      required: true,
      message: '角色描述不能為空',
      trigger: 'blur',
    },
  ],
})
const buttonActionType = ref<string>('')

async function getRoleList() {
  loading.value = true
  try {
    const res = await getRoleListAPI(roleParams)
    const resData = res.data.data
    roleList.value = resData!.rows
    Object.assign(roleParams, { total: resData!.total })
  }
  catch (error) {
    console.error(error)
  }
  finally {
    loading.value = false
  }
}

function openMenuDialog() {

}

async function openDialog(actionType: string, data: RoleItemType) {
  buttonActionType.value = actionType

  if (buttonActionType.value !== 'add') {
    dialog.visible = true
    const resData = await getCurrentRoleDetail(data)
    if (!resData)
      return
  }

  if (data.id) {
    dialog.visible = true
    dialog.title = '修改角色'
  }
  else {
    dialog.visible = true
    dialog.title = '新增角色'
  }
}

async function handleDelete(data: RoleItemType) {
  try {
    await ElMessageBox.confirm('您確認要刪除該角色嗎', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
    })
    loading.value = true
    const resData = await getCurrentRoleDetail(data)
    if (!resData)
      return
    await deleteCurrentRoleAPI(data)
    ElMessage.success('刪除成功')
    await getRoleList()
  }
  catch (error) {
    console.error(error)
  }
  finally {
    closeDialog()
  }
}

function closeDialog() {
  dialog.visible = false
  dialog.title = ''
  resetForm()
}

function resetForm() {
  roleFormRef.value.resetFields()
  roleFormRef.value.clearValidate()

  Object.assign(formData, {
    name: '',
    state: 0,
    description: '',
    id: '',
    permIds: [],
  })
}

async function handleSubmit() {
  if (!roleFormRef.value)
    return
  try {
    dialog.loading = true
    const validateForm = () => new Promise((resolve) => {
      roleFormRef.value.validate((valid: any) => {
        resolve(valid)
      })
    })
    const isValid = await validateForm()
    if (isValid) {
      const roleId = formData.id
      if (roleId) {
        const res = await editCurrentRoleAPI(formData)
        const resData = res.data
        if (resData.code === 40001 && !resData.success) {
          ElMessage({ type: 'error', message: '缺少參數或者此角色不存在' })
          closeDialog()
          await getRoleList()
          return
        }
        ElMessage.success('修改成功')
      }
      else {
        await addRoleAPI(formData)
        ElMessage.success('新增成功')
      }
      closeDialog()
      await getRoleList()
    }
  }
  catch (error) {
    console.error(error)
  }
  finally {
    dialog.loading = false
  }
}

async function getCurrentRoleDetail(data: RoleItemType) {
  try {
    dialog.loading = true
    const res = await getCurrentRoleDetailAPI(data)
    const resData = res.data
    if (!resData.success && resData.code === 10000) {
      ElMessage({ type: 'error', message: '此角色不存在' })
      dialog.visible = false
      await getRoleList()
      return null
    }
    Object.assign(formData, { ...resData.data })
    return resData
  }
  catch (error) {
    console.error(error)
  }
  finally {
    dialog.loading = false
  }
}

onMounted(() => {
  getRoleList()
})
</script>

<template>
  <div class="container">
    <div class="app-container">
      <el-card shadow="never" class="table-container">
        <template #header>
          <el-button type="primary" @click="openDialog('add', {})">
            <el-icon><Plus /></el-icon>新增角色
          </el-button>
        </template>
        <el-table
          ref="roleTableRef"
          v-loading="loading"
          :data="roleList"
          highlight-current-row
          border
        >
          <el-table-column prop="name" align="center" width="200" label="角色" />
          <el-table-column
            align="center" width="200" label="啟用"
          >
            <template #default="scope">
              <span>
                {{ scope.row.state === State.ENABLED ? '已啟用'
                  : scope.row.state === State.DISABLED ? '未啟用'
                    : '無' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="description" align="center" label="描述" />
          <el-table-column fixed="right" label="操作" width="220">
            <template #default="scope">
              <el-button
                type="primary"
                size="small"
                link
                @click="openMenuDialog(scope.row)"
              >
                <el-icon><Position /></el-icon>分配權限
              </el-button>
              <el-button
                type="primary"
                size="small"
                link
                @click="openDialog('edit', scope.row)"
              >
                <el-icon><Edit /></el-icon>编辑
              </el-button>
              <el-button
                type="primary"
                size="small"
                link
                @click="handleDelete(scope.row)"
              >
                <el-icon><Delete /></el-icon>删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-if="roleParams.total > 0"
          v-model:total="roleParams.total"
          v-model:page="roleParams.page"
          v-model:limit="roleParams.pagesize"
          layout="prev, pager, next"
          @pagination="getRoleList"
        />

        <el-dialog
          v-model="dialog.visible"
          :title="dialog.title"
          width="500px"
          @close="closeDialog"
        >
          <div v-loading="dialog.loading">
            <el-form
              ref="roleFormRef"
              :model="formData"
              :rules="rules"
              label-width="100px"
            >
              <el-form-item label="角色名稱" prop="name">
                <el-input v-model="formData.name" placeholder="請輸入角色名稱" />
              </el-form-item>
              <el-form-item label="啟用" prop="state">
                <el-switch
                  v-model="formData.state"
                  :active-value="State.ENABLED"
                  :inactive-value="State.DISABLED"
                />
              </el-form-item>
              <el-form-item prop="description" label="角色描述">
                <el-input
                  v-model="formData.description"
                  type="textarea"
                  :rows="5"
                  style="width:300px"
                  resize="none"
                  placeholder="請輸入角色描述"
                />
              </el-form-item>
              <div class="dialog-footer text-end">
                <el-button type="primary" @click="handleSubmit">
                  確定
                </el-button>
                <el-button @click="closeDialog">
                  取消
                </el-button>
              </div>
            </el-form>
          </div>
        </el-dialog>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
