<template>
  <div class="editConfig app-container">
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" >
      <el-form :model="form" style="padding-right:60px; padding-left: 30px" :rules="rules" ref="form">
        <el-form-item label="配置名称" :label-width="formLabelWidth" prop="config_name">
          <el-input v-model="form.config_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="配置单位" :label-width="formLabelWidth" prop="config_unit">
          <el-input v-model="form.config_unit" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="配置数值" :label-width="formLabelWidth" prop="config_value">
          <el-input v-model="form.config_value" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleHandle">取 消</el-button>
        <el-button type="primary" @click="confirmHandle">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'addUser',
  data () {
    return {
      dialogFormVisible: false,
      form: {
        config_name: '',
        config_unit: '',
        config_value: ''
      },
      rules: {
        config_name: [
          { required: true, message: '请填写配置名称', trigger: 'change' },
        ],
        config_unit: [
          { required: true, message: '请填写配置单位', trigger: 'change' }
        ],
        config_value: [
          { required: true, message: '请填写配置数值', trigger: 'change' }
        ],
      },
      formLabelWidth: '120px',
      confirFun: null,
      cancelFun: null
    }
  },
  props: {
    editForm: {
      type: Object,
      default: null
    },
  },
  created () {
  },
  methods: {
    show () {
      this.dialogFormVisible = true
      for(let i in this.form) {
        this.form[i] = this.editForm[i]
      }
      this.form.config_id = this.editForm.config_id
      console.log(this.form)
    },
    cancleHandle () {
      this.dialogFormVisible = false
    },
    confirmHandle () {
      this.$refs.form.validate(async (valid) => {
      if (valid) {
        console.log('提交数据')
        console.log(this.form)
        this.form.config_value += ''
        let res = await this.$http.post('config/edit', this.form)
        if(res.errno === 0) {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.$emit('success')
        }
        this.dialogFormVisible = false
      } else {
        console.log('error submit!!');
      }
    });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editConfig {
  
}
</style>

