<template>
  <div class="user-management">
    <div class="search-bar">
      <el-form :inline="true" :model="searchForm" class="search-form">
        <el-form-item label="用户名">
          <el-input v-model="searchForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="searchForm.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
          <el-button type="success" @click="handleAdd">新增用户</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="realName" label="真实姓名"></el-table-column>
      <el-table-column prop="roleName" label="角色"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除</el-button>
          <el-button
            size="mini"
            :type="scope.row.status === 1 ? 'warning' : 'success'"
            @click="handleStatusChange(scope.row)">
            {{ scope.row.status === 1 ? '禁用' : '启用' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.currentPage"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>

    <!-- 用户表单对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="dialogType === 'add'">
          <el-input v-model="userForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="realName">
          <el-input v-model="userForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleId">
          <el-select v-model="userForm.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="userForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserManagement',
  data () {
    return {
      searchForm: {
        username: '',
        roleId: ''
      },
      tableData: [],
      roleOptions: [],
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      dialogVisible: false,
      dialogType: 'add', // add or edit
      userForm: {
        username: '',
        password: '',
        realName: '',
        roleId: '',
        email: '',
        phone: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        roleId: [
          { required: true, message: '请选择角色', trigger: 'change' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    dialogTitle () {
      return this.dialogType === 'add' ? '新增用户' : '编辑用户'
    }
  },
  created () {
    this.fetchRoleOptions()
    this.fetchUserList()
  },
  methods: {
    // 获取角色列表
    async fetchRoleOptions () {
      try {
        const res = await this.$axios.get('/role/list')
        this.roleOptions = res.data.data
      } catch (error) {
        this.$message.error('获取角色列表失败')
      }
    },
    // 获取用户列表
    async fetchUserList () {
      try {
        const params = {
          page: this.pagination.currentPage,
          pageSize: this.pagination.pageSize,
          ...this.searchForm
        }
        const res = await this.$axios.get('/user/list', { params })
        this.tableData = res.data.data.list
        this.pagination.total = res.data.data.total
      } catch (error) {
        this.$message.error('获取用户列表失败')
      }
    },
    // 搜索
    handleSearch () {
      this.pagination.currentPage = 1
      this.fetchUserList()
    },
    // 重置搜索
    resetSearch () {
      this.searchForm = {
        username: '',
        roleId: ''
      }
      this.handleSearch()
    },
    // 新增用户
    handleAdd () {
      this.dialogType = 'add'
      this.userForm = {
        username: '',
        password: '',
        realName: '',
        roleId: '',
        email: '',
        phone: ''
      }
      this.dialogVisible = true
    },
    // 编辑用户
    handleEdit (row) {
      this.dialogType = 'edit'
      this.userForm = { ...row }
      this.dialogVisible = true
    },
    // 删除用户
    handleDelete (row) {
      this.$confirm('确认删除该用户?', '提示', {
        type: 'warning'
      }).then(async () => {
        try {
          await this.$axios.delete(`/user/${row.id}`)
          this.$message.success('删除成功')
          this.fetchUserList()
        } catch (error) {
          this.$message.error('删除失败')
        }
      }).catch(() => {})
    },
    // 修改用户状态
    async handleStatusChange (row) {
      try {
        await this.$axios.put(`/user/status/${row.id}`, {
          status: row.status === 1 ? 0 : 1
        })
        this.$message.success('状态修改成功')
        this.fetchUserList()
      } catch (error) {
        this.$message.error('状态修改失败')
      }
    },
    // 提交表单
    submitForm () {
      this.$refs.userForm.validate(async valid => {
        if (!valid) return
        try {
          if (this.dialogType === 'add') {
            await this.$axios.post('/user', this.userForm)
            this.$message.success('新增成功')
          } else {
            await this.$axios.put(`/user/${this.userForm.id}`, this.userForm)
            this.$message.success('编辑成功')
          }
          this.dialogVisible = false
          this.fetchUserList()
        } catch (error) {
          this.$message.error(this.dialogType === 'add' ? '新增失败' : '编辑失败')
        }
      })
    },
    handleSizeChange (val) {
      this.pagination.pageSize = val
      this.fetchUserList()
    },
    handleCurrentChange (val) {
      this.pagination.currentPage = val
      this.fetchUserList()
    }
  }
}
</script>

<style scoped>
.user-management {
  padding: 20px;
}
.search-bar {
  margin-bottom: 20px;
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
