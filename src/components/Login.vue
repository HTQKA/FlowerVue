<template>
  <div class="login-wrapper">
    <div class="login-container">
      <h2 class="login-title">公众号管理系统</h2>

      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="rules"
        class="login-form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
          ></el-input>
        </el-form-item>

        <div class="login-options">
          <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
          <el-link type="primary" :underline="false">忘记密码?</el-link>
        </div>

        <el-form-item>
          <el-button
            type="primary"
            class="login-button"
            :loading="loading"
            @click="handleLogin"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: '',
        remember: false
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) return

        this.loading = true
        try {
          // 调用登录接口
          const res = await this.$axios.post('user/login', {
            username: this.loginForm.username,
            password: this.loginForm.password
          })

          if (res.data.code === 200) {
            // 保存 token
            localStorage.setItem('token', res.data.token)

            // 保存用户信息
            this.$store.commit('SET_USER_INFO', res.data.userInfo)

            // 记住密码
            if (this.loginForm.remember) {
              localStorage.setItem('username', this.loginForm.username)
              localStorage.setItem('password', this.loginForm.password)
            }

            this.$message.success('登录成功')

            // 跳转到首页或者上一个页面
            const redirect = this.$route.query.redirect || '/'
            this.$router.push(redirect)
          } else {
            this.$message.error(res.data.message || '登录失败')
          }
        } catch (error) {
          console.error('登录出错:', error)
          this.$message.error('登录失败，请稍后重试')
        } finally {
          this.loading = false
        }
      })
    }
  },
  created () {
    // 如果之前记住了密码，自动填充
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    if (username && password) {
      this.loginForm.username = username
      this.loginForm.password = password
      this.loginForm.remember = true
    }
  }
}
</script>

<style scoped>
.login-wrapper {
  height: 100vh;
  width: 100%;
  background: url('../assets/bg.jpg') no-repeat center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 400px;
  padding: 30px 35px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.login-title {
  text-align: center;
  margin-bottom: 30px;
  color: #303133;
  font-size: 24px;
  font-weight: 500;
}

.login-form {
  margin-top: 20px;
}

.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.login-button {
  width: 100%;
  margin-top: 10px;
  padding: 12px 15px;
  font-size: 16px;
}

/* 输入框样式优化 */
.el-input /deep/ .el-input__inner {
  height: 42px;
  line-height: 42px;
}

/* 图标样式优化 */
.el-input /deep/ .el-input__prefix {
  font-size: 16px;
}

/* 复选框样式优化 */
.el-checkbox /deep/ .el-checkbox__label {
  color: #606266;
}
</style>
