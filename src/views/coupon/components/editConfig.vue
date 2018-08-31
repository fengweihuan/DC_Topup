<template>
  <div class="editConfig app-container">
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" >
      <el-form :model="form" style="padding-right:60px; padding-left: 30px"  ref="form">
        <el-form-item label="优惠券名称" :label-width="formLabelWidth" prop="config_name">
          <el-input v-model="form.voucher_title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="优惠券地址" :label-width="formLabelWidth" prop="config_unit">
          <el-input v-model="form.voucher_url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="优惠券分类" :label-width="formLabelWidth" prop="config_value">
          <el-select v-model="form.voucher_cate" placeholder="请选择优惠券分类">
            <el-option :label="item.name" :value="item.value" v-for="(item, index) in cateArr" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优惠券状态" :label-width="formLabelWidth" prop="config_value">
          <el-select v-model="form.voucher_status" placeholder="请选择优惠券状态">
            <el-option :label="item.name" :value="item.value" v-for="(item, index) in statusArr" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用条件" :label-width="formLabelWidth" prop="config_unit">
          <el-input v-model="form.voucher_usage_condition" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="领取条件" :label-width="formLabelWidth" prop="config_unit">
          <el-input v-model="form.voucher_claim_condition" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="优惠券使用状态" :label-width="formLabelWidth" prop="config_value">
          <el-select v-model="form.voucher_activity" placeholder="请选择使用状态">
            <el-option :label="item.name" :value="item.value" v-for="(item, index) in activityArr" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效期" :label-width="formLabelWidth" prop="config_unit">
          <el-date-picker
            v-model="form.voucher_valid_to"
            type="datetime"
            format="yyyy-MM-dd hh:mm:ss"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="选择有效期">
          </el-date-picker>
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
        voucher_id: '',
        voucher_cate: '',
        voucher_title: '',
        voucher_url: '',
        voucher_status:'',
        voucher_usage_condition: '',
        voucher_claim_condition:'',
        voucher_valid_to: '',
        voucher_activity: ''
      },
      cateArr: [
        {
          value: '微信/QQ',
          name: '微信/QQ' 
        },
        {
          value: '银行',
          name: '银行' 
        },
        {
          value: '其他',
          name: '其他' 
        }
      ],
      statusArr: [
        {
          value: 'new',
          name: '新增' 
        },
        {
          value: 'claimed',
          name: 'claimed' 
        }
      ],
      activityArr: [
        {
          value: 'new',
          name: '新增' 
        },
        {
          value: 'disabled',
          name: '下架' 
        },
        {
          value: 'enabled',
          name: '激活' 
        }
      ],
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
    async confirmHandle () {
      let res = await this.$http.post('voucher/edit', this.form)
      if(res.errno === 0) {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        this.$emit('success')
      }
      this.dialogFormVisible = false
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.editConfig {
  
}
</style>