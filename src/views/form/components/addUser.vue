<template>
  <div class="addUser app-container">
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" >
      <el-form :model="form" style="padding-right:60px; padding-left: 30px" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="user_name">
          <el-input v-model="form.user_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户号码" :label-width="formLabelWidth" prop="user_id">
          <el-input v-model="form.user_id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" :label-width="formLabelWidth" prop="user_mobile">
          <el-input v-model="form.user_mobile" type="number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="账户状态" :label-width="formLabelWidth" prop="account_name">
          <el-radio v-model="form.account_name" label="启用" style="margin-left:20px;">启用</el-radio>
          <el-radio v-model="form.account_name" label="不启用">不启用</el-radio>
        </el-form-item>
        <el-form-item label="是否为管理员" :label-width="formLabelWidth" prop="is_admin">
          <el-radio v-model="form.is_admin" label="是" style="margin-left:20px;">是</el-radio>
          <el-radio v-model="form.is_admin" label="否">否</el-radio>
        </el-form-item>
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
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
    var mobile_validator = (rule, value, callback) => {
      if(value.length === 0) {
        callback(new Error('请输入手机号'))
      } else {
        let test=/^[1][3,4,5,7,8][0-9]{9}$/
        if(test.test(value)) {
          callback()
        } else {
          callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      dialogFormVisible: false,
      form: {
        user_name: '',
        user_id: '',
        user_mobile: '',
        is_admin: '否',
        account_name: '不启用'
      },
      rules: {
        user_name: [
          { required: true, message: '请填写姓名', trigger: 'change' },
        ],
        user_id: [
          { required: true, message: '请填写账户号码', trigger: 'change' }
        ],
        user_mobile: [
          { required: true, validator: mobile_validator, trigger: 'change' }
        ],
      },
      formLabelWidth: '120px',
      confirFun: null,
      cancelFun: null
    }
  },
  props: {
    addType: {
      type: String,
      default: 'add',
      required: true
    },
    editForm: {
      type: Object,
      default: null
    },
  },
  methods: {
    show () {
      this.dialogFormVisible = true
      if (this.addType === 'edit') {
        for(let i in this.form) {
          this.form[i] = this.editForm[i]
        }
      } else {
        this.$refs.form.resetFields()
      }
    },
    cancleHandle () {
      this.dialogFormVisible = false
    },
    confirmHandle () {
      this.$refs.form.validate((valid) => {
      if (valid) {
        console.log('提交数据')
        console.log(this.form)
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
.addUser {
  
}
</style>
