<template>
  <div class="app-container coupon">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="" >
        <el-input v-model="formInline.user"  style="width:300px" placeholder="优惠券名称" clearable>
          <i
            class="el-icon-search el-input__icon"
            slot="prefix">
          </i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="addVoucher">添加优惠券</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label='序号' >
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="分类" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.voucher_cate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="券名"  align="center">
        <template slot-scope="scope">
          {{scope.row.voucher_title}}
        </template>
      </el-table-column>
      <el-table-column label="使用条件" align="center">
        <template slot-scope="scope">
          {{scope.row.voucher_usage_condition}}
        </template>
      </el-table-column>
      <el-table-column label="领取条件" align="center">
        <template slot-scope="scope">
          {{scope.row.voucher_claim_condition}}
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          {{computActivity(scope.row.voucher_activity)}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="有效期">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.voucher_valid_to}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.voucher_create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="undercarriage(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
     <editConfig ref="editConfig" @success="fetchData" :editForm="editForm"></editConfig>
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
import editConfig from './components/editConfig'
export default {
  components: {
    editConfig
  },
  data() {
    return {
      list: null,
      listLoading: true,
      formInline: {
        user: ''
      },
      editForm: {},
      formLabelWidth: '120px',
      dialogFormVisible: false,
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
      let res = await this.$http.get('voucher/list',{
        params: {
          voucher_keyword: this.formInline.user,
          current_page:  this.currentPage,
          number_per_page: this.pageSize
        }
      })
      if(res.errno === 0) {
        this.list = res.data.data
        this.totalPages = res.data.totalPages
      }
      this.listLoading = false
    },
    computActivity (type) {
      if(type === 'new') {
        return '新增'
      } else if(type === 'disabled') {
        return '已下架'
      } else {
        return '已激活'
      }
    },
    onSubmit() {
      console.log(this.formInline)
      this.fetchData()
    },
    addVoucher() {
      this.editForm =  {}
      this.$nextTick(() => {
        this.$refs.editConfig.show()
      })
    },
    undercarriage (row) {
      console.log(row)
      this.editForm =  row
      this.$nextTick(() => {
        this.$refs.editConfig.show()
      })
      // this.$confirm('此操作将下架该优惠券, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   center: true
      // }).then(() => {
      //   this.$message({
      //     type: 'success',
      //     message: '下架成功!'
      //   });
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消'
      //   });
      // })
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
.coupon{
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


