<template>
  <div class="app-container configure">
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label='序号' >
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="配置名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.config_name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="配置代号"  align="center">
        <template slot-scope="scope">
          {{scope.row.config_id}}
        </template>
      </el-table-column>
      <el-table-column label="配置数值" align="center">
        <template slot-scope="scope">
          {{scope.row.config_value}}
        </template>
      </el-table-column>
      <el-table-column label="配置单位" align="center">
        <template slot-scope="scope">
          {{scope.row.config_unit}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="undercarriage(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <editConfig ref="editConfig" @success="fetchData" :editForm="editForm"></editConfig>
    <!-- <el-pagination 
      class="pagination_wrap"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination> -->
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
      dialogFormVisible: false,
      currentPage: 1,
      editForm: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.listLoading = true
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      let res = await this.$http.get('config/list')
      console.log(res)
      if(res.errno === 0) {
        this.list = res.data
        this.listLoading = false
      }
    },
    onSubmit() {
      console.log(this.formInline)
      this.fetchData()
    },
    undercarriage (row) {
      console.log(row)
      this.editForm =  row
      this.$nextTick(() => {
        this.$refs.editConfig.show()
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
.configure{
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


