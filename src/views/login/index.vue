<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import type { LoginDataType } from '@/api/auth/type'
import { useUserStore } from '@/store'

const form = ref<FormInstance>()
const loginForm = ref<LoginDataType>({
  mobile: '13800000002',
  password: 'hm#qd@23!',
  isAgree: true,
})
const userStore = useUserStore()

const loginRules = computed(() => {
  return {
    mobile: [
      {
        required: true,
        trigger: 'blur',
        message: 'Please enter Mobile',
      },
      {
        pattern: /^1[3-9]\d{9}$/,
        message: 'Please enter the correct Mobile number',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        trigger: 'blur',
        message: 'Please enter Password',
      },
      {
        min: 6,
        max: 16,
        message: 'The password is between 6 and 16',
        trigger: 'blur',
      },
    ],
    isAgree: [
      {
        validator: (rule: any, value: any, callback: any) => {
          value ? callback() : callback(new Error('Please agree to the user platform use agreement'))
        },
      },
    ],
  }
})

async function handleLogin() {
  try {
    await userStore.login(loginForm.value)
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="login-container">
    <div class="logo" />
    <div class="form">
      <h1>Login</h1>
      <el-card shadow="never">
        <el-form ref="form" :model="loginForm" :rules="loginRules">
          <el-form-item prop="mobile">
            <el-input v-model="loginForm.mobile" placeholder="Please enter the mobile" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" show-password placeholder="Please enter the password" />
          </el-form-item>
          <el-form-item prop="isAgree">
            <el-checkbox v-model="loginForm.isAgree">
              The user platform use agreement
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width:350px" type="primary" @click="handleLogin">
              Login
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  align-items: stretch;
  height: 100vh;
  .logo {
    flex: 3;
    background: rgba(38, 72, 176) url(../../assets/common/login_back.png)
      no-repeat center / cover;
    border-top-right-radius: 60px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    padding: 0 100px;
    .icon {
      background: url(../../assets/common/logo.png) no-repeat 70px center /
        contain;
      width: 300px;
      height: 50px;
      margin-bottom: 50px;
    }
  }
  .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
    .el-card {
      border: none;
      padding: 0;
    }
    h1 {
      padding-left: 20px;
      font-size: 24px;
    }
    .el-input {
      width: 350px;
      height: 44px;
      .el-input__inner {
        background: #f4f5fb;
      }
    }
    .el-checkbox {
      color:#606266;
    }
  }
}
</style>
