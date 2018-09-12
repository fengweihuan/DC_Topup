<template>
  <div class="app-container client_wrap">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="" >
        <el-input v-model="formInline.user"  style="width:300px" placeholder="请输入姓名" clearable>
           <i
            class="el-icon-search el-input__icon"
            slot="prefix">
          </i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item style="float:right;margin-right:80px">
        <el-button type="primary" @click="addUser" >添加用户</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label='序号' >
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="用户名称" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.user_name	}}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户号码" align="center">
        <template slot-scope="scope">
          {{scope.row.user_id}}
        </template>
      </el-table-column>
      <el-table-column label="手机"  align="center">
        <template slot-scope="scope">
          {{scope.row.user_mobile}}
        </template>
      </el-table-column>
      <el-table-column label="是否为管理员" align="center">
        <template slot-scope="scope">
          {{scope.row.is_admin === 'yes' ? '是' : '否'}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="账户名称" align="center">
        <template slot-scope="scope">
          {{scope.row.account_name}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="创建时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editHandle(scope.row)">编辑</el-button>
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
      :total="totalPages">
    </el-pagination>
    <addUser ref="addUser" @success="addSuccess"  v-bind:addType="addType"  v-bind:editForm="editForm"></addUser>
  </div>
</template>

<script>
import addUser from './components/addUser.vue'
export default {
  components: {
    addUser
  },
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
      addType: '',
      editForm: null,
      totalPages: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    addSuccess () {
      this.fetchData()
    },
    async fetchData() {
      this.listLoading = true
      // getList(this.listQuery).then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
      let res = await this.$http({
        method:'get',
        url:'/user/list',
        params:{
          user_keyword: this.formInline.user,
          current_page:  this.currentPage,
          number_per_page: 10
        }
      })
      console.log(res)
      if(res.errno === 0) {
        this.list = res.data.data
        this.totalPages = res.data.totalPages
      }
      // let data = []
      // for(let i = 0; i < 8; i ++) {
      //   let json = {
      //     user_id: 'te_chen',
      //     user_name: '白百合',
      //     user_mobile: '13136107533',
      //     is_admin: '是',
      //     account_name: '启用',
      //     create_time: '2018-08-08 17:09:11'
      //   }
      //   data.push(json)
      // }
      // this.list = data
      this.listLoading = false
    },
    onSubmit() {
      console.log(this.formInline)
      this.fetchData()
    },
    addUser () {
      this.addType = 'add'
      this.$nextTick(() => {
        this.$refs.addUser.show()
      })
    },
    editHandle (row) {
      this.addType = 'edit'
      this.editForm = row
      this.$nextTick(() => {
        this.$refs.addUser.show()
      })
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

