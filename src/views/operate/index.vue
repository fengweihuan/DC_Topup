<template>
  <div class="app-container operate">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item style="float:right">
        <el-button type="primary" @click="onSubmit">添加工号</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="operatorData" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label='序号' >
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="运营商名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.operator_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="运营商账号"  align="center">
        <template slot-scope="scope">
          {{scope.row.operator_account}}
        </template>
      </el-table-column>
      <el-table-column label="运营商密码" align="center">
        <template slot-scope="scope">
          {{scope.row.operator_password ? "********" : '暂无'}}
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="undercarriage(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="popTitle" :visible.sync="dialogFormVisible1">
      <el-form :model="form1" ref="form1" :rules="rules1">
        <el-form-item label="账户" prop="operator_account"  :label-width="formLabelWidth">
          <el-input v-model="form1.operator_account" auto-complete="off" placeholder="请填写账户"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="operator_password"  :label-width="formLabelWidth">
          <el-input v-model="form1.operator_password" auto-complete="off" placeholder="请填写密码"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="operator_name"  :label-width="formLabelWidth">
          <el-input v-model="form1.operator_name" auto-complete="off" placeholder="请填写用户名"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="addOperatorHndle">确 定</el-button>
      </div>
    </el-dialog>
    <el-pagination 
      class="pagination_wrap"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalPages">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      operatorData: null,
      listLoading: true,
      dialogFormVisible1: false,
      form1: {
        operator_id:'',
        operator_account: '',
        operator_password: '',
        operator_name: ''
      },
      rules1: {
        operator_account: [
          { required: true, message: '请填写账户', trigger: 'change' }
        ],
        operator_password: [
          { required: true, message: '请填写密码', trigger: 'change' }
        ],
        operator_name: [
          { required: true, message: '请填写用户名', trigger: 'change' }
        ]
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      currentPage: 1,
      pageSize: 10,
      totalPages: 0,
      currentPassword: '',
      popTitle: '添加工号'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      let res = await this.$http.get('operator/list')
      if(res.errno === 0) {
        this.operatorData = res.data
      }
      this.listLoading = false
    },
    addOperatorHndle() {
      this.$refs.form1.validate(async (valid) => {
        if (valid) {
          console.log(this.form1)
          
          
          if (this.form1.operator_id || this.form1.operator_id === 0) {
            this.form1.operator_id = this.form1.operator_id.toString()
          }
          let json = Object.assign({}, this.form1)
          if(this.form1.operator_password === '********') {
            json.operator_password = this.currentPassword
          }
          let url = this.popTitle === '添加工号' ? 'operator/add' : 'operator/edit'
          let res  = await this.$http.post(url, json)
          console.log(res)
          if(res.errno === 0) {
            this.dialogFormVisible1 = false
            this.$message({
              type:'success',
              message: this.popTitle === '添加工号' ? '添加成功' :'修改成功'
            })
            for(let i in this.form1) {
              this.form1[i] = ''
            }
            this.fetchData()
          } else {
            this.$message({
              type: 'error',
              message: '添加失败'
            })
          }
        } else {
          console.log('error submit!!');
        }
      })
    },
    onSubmit() {
      this.popTitle = '添加工号'
      for(let i in this.form1) {
        this.form1[i] = ''
      }
      this.dialogFormVisible1 = true
    },
    undercarriage (row) {
      this.popTitle = '编辑工号'
      this.form1
      for(let i in this.form1) {
        this.form1[i] = row[i]
      }
      this.form1.operator_password = '********'
      this.currentPassword = row.operator_password
      this.dialogFormVisible1 = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.fetchData()
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.operate{
  .pagination_wrap{
    margin-top: 40px;
    text-align: center;
  }
  .awater{
    width: 80px;
    height: 80px;
  }
}
</style>


