<template>
  <div class="role-management">
    <div class="operation-bar">
      <el-button type="primary" @click="handleAdd">新增角色</el-button>
    </div>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="code" label="角色编码"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click="handlePermission(scope.row)">权限配置</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 角色表单对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px">
      <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="roleForm.code"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="textarea" v-model="roleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 权限配置对话框 -->
    <el-dialog title="权限配置" :visible.sync="permissionDialogVisible" width="600px">
      <el-tree
        ref="permissionTree"
        :data="permissionTree"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedPermissions"
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="permissionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePermissions">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'RoleManagement',
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      dialogType: 'add',
      permissionDialogVisible: false,
      currentRole: null,
      roleForm: {
        name: '',
        code: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入角色编码', trigger: 'blur' }
        ]
      },
      permissionTree: [],
      checkedPermissions: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  computed: {
    dialogTitle() {
      return this.dialogType === 'add' ? '新增角色' : '编辑角色'
    }
  },
  created() {
    this.fetchRoleList()
    this.fetchPermissionTree()
  },
  methods: {
    // 获取角色列表
    async fetchRoleList() {
      try {
        const res = await this.$axios.get('/role/list')
        this.tableData = res.data.data
      } catch (error) {
        this.$message.error('获取角色列表失败')
      }
    },
    // 获取权限树
    async fetchPermissionTree() {
      try {
        const res = await this.$axios.get('/permission/tree')
        this.permissionTree = res.data.data
      } catch (error) {
        this.$message.error('获取权限树失败')
      }
    },
    // 新增角色
    handleAdd() {
      this.dialogType = 'add'
      this.roleForm = {
        name: '',
        code: '',
        description: ''
      }
      this.dialogVisible = true
    },
    // 编辑角色
    handleEdit(row) {
      this.dialogType = 'edit'
      this.roleForm = { ...row }
      this.dialogVisible = true
    },
    // 删除角色
    handleDelete(row) {
      this.$confirm('确认删除该角色?', '提示', {
        type: 'warning'
      }).then(async () => {
        try {
          await this.$axios.delete(`/role/${row.id}`)
          this.$message.success('删除成功')
          this.fetchRoleList()
        } catch (error) {
          this.$message.error('删除失败')
        }
      }).catch(() => {})
    },
    // 打开权限配置
    async handlePermission(row) {
      this.currentRole = row
      try {
        const res = await this.$axios.get(`/role/permissions/${row.id}`)
        this.checkedPermissions = res.data.data
        this.permissionDialogVisible = true
      } catch (error) {
        this.$message.error('获取角色权限失败')
      }
    },
    // 保存权限配置
    async savePermissions() {
      if (!this.currentRole) return
      try {
        const checkedNodes = this.$refs.permissionTree.getCheckedNodes()
        const halfCheckedNodes = this.$refs.permissionTree.getHalfCheckedNodes()
        const permissionIds = [...checkedNodes, ...halfCheckedNodes].map(node => node.id)
        
        await this.$axios.put(`/role/permissions/${this.currentRole.id}`, {
          permissionIds
        })
        this.$message.success('权限配置成功')
        this.permissionDialogVisible = false
      } catch (error) {
        this.$message.error('权限配置失败')
      }
    },
    // 提交表单
    submitForm() {
      this.$refs.roleForm.validate(async valid => {
        if (!valid) return
        try {
          if (this.dialogType === 'add') {
            await this.$axios.post('/role', this.roleForm)
            this.$message.success('新增成功')
          } else {
            await this.$axios.put(`/role/${this.roleForm.id}`, this.roleForm)
            this.$message.success('编辑成功')
          }
          this.dialogVisible = false
          this.fetchRoleList()
        } catch (error) {
          this.$message.error(this.dialogType === 'add' ? '新增失败' : '编辑失败')
        }
      })
    }
  }
}
</script>

<style scoped>
.role-management {
  padding: 20px;
}
.operation-bar {
  margin-bottom: 20px;
}
</style>
