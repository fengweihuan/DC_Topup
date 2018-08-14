<template>
  <div class="app-container operate">
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
      <el-table-column label="运营商名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号"  align="center">
        <template slot-scope="scope">
          {{scope.row.job}}
        </template>
      </el-table-column>
      <el-table-column label="工号归属" align="center">
        <template slot-scope="scope">
          {{scope.row.job_attach}}
        </template>
      </el-table-column>
      <el-table-column label="登陆状态" align="center">
        <template slot-scope="scope">
          {{scope.row.login_status}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="登陆时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.login_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="undercarriage(scope.row)">下线</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination 
      class="pagination_wrap"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
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
      currentPage: 1,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      let data = []
      for(let i = 0; i < 8; i ++) {
        let json = {
          nickname: '白百合',
          job: 'hstcq_hzdl062',
          job_attach: '石家庄电信',
          login_status: '未关注',
          login_time: '2018-08-08 17:09:11'
        }
        data.push(json)
      }
      this.list = data
      this.listLoading = false
    },
    onSubmit() {
      console.log(this.formInline)
      this.fetchData()
    },
    undercarriage (row) {
      console.log(row)
      this.$confirm('此操作将下线运营商, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$message({
          type: 'success',
          message: '下线成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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


