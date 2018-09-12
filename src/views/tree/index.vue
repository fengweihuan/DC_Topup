<template>
  <div class="app-container client_wrap">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="" >
        <el-input v-model="formInline.user"  style="width:300px" placeholder="运营商名称" clearable>
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
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.customer_avatar" alt="" class="awater">
        </template>
      </el-table-column>
      <el-table-column label="微信昵称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.customer_nickname ? scope.row.customer_nickname : '暂无'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机"  align="center">
        <template slot-scope="scope">
          {{scope.row.customer_mobile}}
        </template>
      </el-table-column>
      <el-table-column label="城市" align="center">
        <template slot-scope="scope">
          {{scope.row.customer_city ? scope.row.customer_city : '暂无'}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="关注状态" align="center">
        <template slot-scope="scope">
          {{scope.row.is_subscribed === 'yes' ? '已关注' : '未关注'}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="关注时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.subscribe_time}}</span>
        </template>
      </el-table-column>
    </el-table>
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
        user: '',
        order_status: ''
      },
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
     let res = await this.$http({
        method:'get',
        url:'customer/list',
        params:{
          user_keyword: this.formInline.user,
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
    onSubmit() {
      console.log(this.formInline)
      this.fetchData()
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
.client_wrap{
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

