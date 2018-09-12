<template>
  <div class="addUser app-container">
    <el-dialog title="运营商登陆" :visible.sync="dialogFormVisible" >
      <el-form :model="form" style="padding-right:200px; padding-left: 30px" :rules="rules" ref="form">
        <el-form-item label="工号"  clearable prop="work_num" :label-width="formLabelWidth">
          <el-select v-model="form.operator_id" placeholder="请选择工号">
            <el-option :label="item.operator_name" :value="item.operator_id" v-for="(item, index) in operatorData" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth" prop="mobile_text">
          <el-input v-model="form.mobile_text" auto-complete="off"></el-input>
          <el-button :type="sendType" style="width:112px;" @click="sendPhone" class="send_phone">{{sendText}}</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleHandle">取 消</el-button>
        <el-button type="primary" @click="confirmHandle">登陆</el-button>
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
        operator_id: '',
        mobile_text: '',
      },
      rules: {
        mobile_text: [
          { required: true, message: '请填写验收吗', trigger: 'change' }
        ],
        operator_id: [
          { required: true, message: '请选择工号', trigger: 'change' }
        ]
      },
      formLabelWidth: '120px',
      confirFun: null,
      cancelFun: null,
      sendText: '获取验证码',
      sendType: 'primary',
      operatorData: []
    }
  },
  created () {
    this.getOperatorList()
  },
  methods: {
    async sendPhone() {
      if(!this.form.operator_id && this.form.operator_id !== 0) {
        this.$message({
          type: 'warning',
          message: '请先选择工号'
        })
        return false
      }
      if(this.sendType !== 'primary') {
        return false
      }
      let json = {}
      for(let i =0; i < this.operatorData.length; i ++) {
        if(this.operatorData[i].operator_id === this.form.operator_id) {
          json.operator_account = this.operatorData[i].operator_account
          json.operator_password = this.operatorData[i].operator_password
          break
        }
      }
    let res = await this.$http.post('operator/sms', json)
    console.log(res)
    if(res.errno === 0) {
      this.$message({
        type: 'success',
        message: '短信验证码已发送，请注意查收'
      })
      this.sendType = 'info'
      this.sendText = 60
      var timer = setInterval(() => {
        if(this.sendText > 0) {
          this.sendText -= 1
        } else {
          this.sendText = '获取验证码'
          this.sendType = 'primary'
          clearInterval(timer)
        }
      }, 1000)
    }
    },
    async getOperatorList() {
      let res = await this.$http.get('operator/list')
      if(res.errno === 0) {
        this.operatorData = res.data
      }
    },
    show () {
      this.dialogFormVisible = true
    },
    cancleHandle () {
      this.dialogFormVisible = false
    },
    confirmHandle () {
      this.$refs.form.validate(async (valid) => {
      if (valid) {
        let json = {
          mobile_text: this.form.mobile_text
        }
        for(let i =0; i < this.operatorData.length; i ++) {
          if(this.operatorData[i].operator_id = this.form.operator_id) {
            json.operator_account = this.operatorData[i].operator_account
            json.operation_password = this.operatorData[i].operator_password
            break
          }
        }
        console.log(json)
        let res = await this.$http.post('operator/login', json)
        if(res.errno === 0) {
          this.dialogFormVisible = false
          this.$message({
            message: '运营商登陆成功',
            type: 'success'
          })
          this.form.operator_id = ''
          this.form.mobile_text = ''
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
.addUser {
  .send_phone{
    position: absolute;
    right: -140px;
    top: 0;
  }
}
</style>
