<template>
  <div class="app-container deposit">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="" >
        <el-input v-model="formInline.user"  style="width:300px" placeholder="客户名、手机" clearable>
          <i
            class="el-icon-search el-input__icon"
            slot="prefix">
          </i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label='序号' >
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.customer_nickname ? scope.row.customer_nickname : '暂无'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机"  align="center">
        <template slot-scope="scope">
          {{scope.row.customer_mobile}}
        </template>
      </el-table-column>
      <el-table-column label="提现金额" align="center">
        <template slot-scope="scope">
          {{scope.row.withdraw_amount ? scope.row.withdraw_amount / 1000 : '0'}}元
        </template>
      </el-table-column>
      <el-table-column label="申请状态" align="center">
        <template slot-scope="scope">
          {{ compotStatus(scope.row.application_status)}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="申请时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.application_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="undercarriage(scope.row)">审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="更新提现" :visible.sync="dialogFormVisible" >
      <el-form :model="form" style="padding-right:60px; padding-left: 30px"  ref="form">
        <el-form-item label="提现状态" :label-width="formLabelWidth" prop="config_value">
          <el-select v-model="form.withdraw_status" placeholder="请选择提现状态">
            <el-option :label="item.name" :value="item.value" v-for="(item, index) in statusArr" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmHandle">确 定</el-button>
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
      list: null,
      listLoading: true,
      formInline: {
        user: ''
      },
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {
        withdraw_id: '',
        withdraw_status: ''
      },
      statusArr: [
        {
          name: '失败',
          value: 'fail'
        },
        {
          name: '成功',
          value: 'success'
        }
      ],
      currentPage: 1,
      pageSize: 10,
      totalPages: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      let res = await this.$http.get('withdraw/list', {
        params:{
          withdraw_keyword: this.formInline.user,
          current_page:  this.currentPage,
          number_per_page: this.pageSize
        }
      })
      console.log(res)
      if(res.errno === 0) {
        this.list = res.data.data
        this.totalPages = res.data.totalPages
      }
      this.listLoading = false
    },
    async confirmHandle () {
      console.log(this.form)
      let res = await this.$http.post('withdraw/update', this.form)
      if(res.errno === 0) {
        this.$message({
          type: 'success',
          message: '更新成功!'
        });
        this.fetchData()
      } else {
        this.$message({
          type: 'warning',
          message: '更新失败!'
        });
      }
      this.dialogFormVisible = false
    },
    compotStatus(type) {
      if(type === 'new') {
        return '待处理'
      } else if (type === 'success') {
        return '成功'
      } else {
        return '失败'
      }
    },
    onSubmit() {
      console.log(this.formInline)
      this.fetchData()
    },
    undercarriage (row) {
      this.form.withdraw_id = row.withdraw_id
      this.form.withdraw_status = row.withdraw_status
      this.dialogFormVisible = true
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
.deposit{
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



