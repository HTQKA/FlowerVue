<template>
  <div class="permission-management">
    <div class="operation-bar">
      <el-button type="primary" @click="handleAdd">新增菜单/权限</el-button>
    </div>

    <el-table
      :data="tableData"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="type" label="类型" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.type === 1 ? 'primary' : 'success'">
            {{ scope.row.type === 1 ? '菜单' : '按钮' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="path" label="路由路径"></el-table-column>
      <el-table-column prop="component" label="组件路径"></el-table-column>
      <el-table-column prop="permission" label="权限标识"></el-table-column>
      <el-table-column prop="icon" label="图标" width="100">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" width="80"></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button 
            size="mini" 
            type="primary" 
            @click="handleAdd(scope.row)"
            v-if="scope.row.type === 1">添加子项</el-button>
          <el-button 
            size="mini" 
            @click="handleEdit(scope.row)">编辑</el-button>
          <el-button 
            size="mini" 
            type="danger" 
            @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 表单对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="600px">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="上级菜单">
          <el-tree-select
            v-model="form.parentId"
            :data="menuTree"
            :props="defaultProps"
            placeholder="请选择上级菜单"
            clearable>
          </el-tree-select>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">菜单</el-radio>
            <el-radio :label="2">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="路由路径" prop="path" v-if="form.type === 1">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="组件路径" prop="component" v-if="form.type === 1">
          <el-input v-model="form.component"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="permission">
          <el-input v-model="form.permission"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon" v-if="form.type === 1">
          <el-input v-model="form.icon">
            <template slot="append">
              <el-button @click="showIconSelect">
                <i :class="form.icon"></i>
                选择图标
              </el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" :min="0" :max="999"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 图标选择器 -->
    <el-dialog title="选择图标" :visible.sync="iconDialogVisible" width="800px">
      <div class="icon-list">
        <div 
          v-for="icon in iconList" 
          :key="icon"
          class="icon-item"
          @click="selectIcon(icon)">
          <i :class="icon"></i>
          <span>{{ icon }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'PermissionManagement',
  data() {
    return {
      tableData: [],
      menuTree: [],
      dialogVisible: false,
      iconDialogVisible: false,
      dialogType: 'add',
      currentNode: null,
      form: {
        parentId: null,
        type: 1,
        name: '',
        path: '',
        component: '',
        permission: '',
        icon: '',
        sort: 0
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        path: [
          { required: true, message: '请输入路由路径', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '请输入组件路径', trigger: 'blur' }
        ]
      },
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      iconList: [
        'el-icon-menu',
        'el-icon-setting',
        'el-icon-user',
        'el-icon-s-tools',
        'el-icon-s-platform',
        // ... 更多图标
      ]
    }
  },
  computed: {
    dialogTitle() {
      const typeText = this.form.type === 1 ? '菜单' : '按钮'
      return this.dialogType === 'add' ? `新增${typeText}` : `编辑${typeText}`
    }
  },
  created() {
    this.fetchPermissionList()
  },
  methods: {
    // 获取权限列表
    async fetchPermissionList() {
      try {
        const res = await this.$axios.get('/permission/list')
        this.tableData = res.data.data
        this.menuTree = this.tableData.filter(item => item.type === 1)
      } catch (error) {
        this.$message.error('获取权限列表失败')
      }
    },
    // 新增
    handleAdd(row) {
      this.dialogType = 'add'
      this.form = {
        parentId: row ? row.id : null,
        type: 1,
        name: '',
        path: '',
        component: '',
        permission: '',
        icon: '',
        sort: 0
      }
      this.dialogVisible = true
    },
    // 编辑
    handleEdit(row) {
      this.dialogType = 'edit'
      this.form = { ...row }
      this.dialogVisible = true
    },
    // 删除
    handleDelete(row) {
      this.$confirm('确认删除该菜单/权限?', '提示', {
        type: 'warning'
      }).then(async () => {
        try {
          await this.$axios.delete(`/permission/${row.id}`)
          this.$message.success('删除成功')
          this.fetchPermissionList()
        } catch (error) {
          this.$message.error('删除失败')
        }
      }).catch(() => {})
    },
    // 显示图标选择器
    showIconSelect() {
      this.iconDialogVisible = true
    },
    // 选择图标
    selectIcon(icon) {
      this.form.icon = icon
      this.iconDialogVisible = false
    },
    // 提交表单
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        try {
          if (this.dialogType === 'add') {
            await this.$axios.post('/permission', this.form)
            this.$message.success('新增成功')
          } else {
            await this.$axios.put(`/permission/${this.form.id}`, this.form)
            this.$message.success('编辑成功')
          }
          this.dialogVisible = false
          this.fetchPermissionList()
        } catch (error) {
          this.$message.error(this.dialogType === 'add' ? '新增失败' : '编辑失败')
        }
      })
    }
  }
}
</script>

<style scoped>
.permission-management {
  padding: 20px;
}

.operation-bar {
  margin-bottom: 20px;
}

.icon-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  max-height: 400px;
  overflow-y: auto;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border: 1px solid #eee;
  border-radius: 4px;
}

.icon-item:hover {
  background-color: #f5f7fa;
}

.icon-item i {
  font-size: 24px;
  margin-bottom: 5px;
}

.icon-item span {
  font-size: 12px;
  color: #666;
}
</style> 