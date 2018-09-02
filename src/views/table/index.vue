<template>
  <div class="orderList app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="" >
        <el-input v-model="formInline.user"  style="width:300px" placeholder="订单编号、手机号、充值金额等" clearable>
          <i
            class="el-icon-search el-input__icon"
            slot="prefix">
          </i>
        </el-input>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-select v-model="formInline.order_status" placeholder="请选择订单状态" clearable>
          <el-option :label="item.name" :value="item.value" v-for="(item, index) in orderStatus" :key="index"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item >
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
      <el-form-item style="display:float;float:right">
         <el-button type="primary" @click="carrieLogin">运营商登陆</el-button>
        <el-button type="primary" @click="toggleLock(0)">锁单</el-button>
        <el-button type="primary" @click="toggleLock(1)">停止锁单</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" v-loading="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" width="100px" label='序号' >
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="订单编号" align="center">
        <template slot-scope="scope">
          {{scope.row.order_code}}
        </template>
      </el-table-column>
      <el-table-column label="订单ID" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.order_id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户手机"  align="center">
        <template slot-scope="scope">
          {{scope.row.mobile_no}}
        </template>
      </el-table-column>
       <!-- <el-table-column label="充值面额" align="center">
        <template slot-scope="scope">
          {{scope.row.money}}
        </template>
      </el-table-column> -->
      <el-table-column class-name="status-col" label="订单状态" align="center">
        <template slot-scope="scope">
          {{scope.row.order_status}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.order_create_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editHandle(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="更新订单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="订单ID" :label-width="formLabelWidth">
          <el-input v-model="form.order_id" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-select v-model="form.order_status" placeholder="请选择订单状态" clearable>
            <el-option :label="item.name" :value="item.value" v-for="(item, index) in orderStatus" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeList">确 定</el-button>
      </div>
    </el-dialog>
    <addUser ref="addUser" ></addUser>
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
import { getList } from '@/api/table'
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
      orderStatus: [
        {
          name: '新增',
          value: 'new'
        },
        {
          name: '成功',
          value: 'success'
        },
        {
          name: '失败',
          value: 'fail'
        },
        {
          name: '进行中',
          value: 'in_progress'
        },
        {
          name: '超时',
          value: 'timeout'
        },
      ],
      form: {
        order_id: '',
        order_status: ''
      },
      currentPage: 1,
      pageSize: 10,
      totalPages: 0
    }
  },
  filters: {
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
      let res = await this.$http({
        method:'get',
        url:'order/list',
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
    carrieLogin () {
      this.$nextTick(() => {
        this.$refs.addUser.show()
      })
    },
    toggleLock(num){
      let url = num === 0 ? 'order/lock' : 'order/unlock'
      let message = num === 0 ? '锁单' : '停止锁单'
      this.$http.get(url).then((res) => {
        if(res.errno === 0) {
          this.$message({
            type: 'success',
            message: message + '成功'
          })
        } else {
          this.$message.error(message + '失败')
        }
      }).catch((error) => {
        this.$message.error(message + '失败')
      })
    },
     // 编辑列表
    editHandle (row) {
      console.log(row)
      for(let i in this.form) {
        this.form[i] = row[i]
      }
      this.dialogFormVisible = true
    },
    // 编辑确定
    async changeList () {
      console.log(this.form)
      let res = await this.$http.post('order/update', {
        order_id: this.form.order_id,
        order_status:this.form.order_status
      })
      console.log(res)
      if(res.errno === 0) {
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '修改失败',
          type: 'warning'
        })
      }
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
.orderList{
  .pagination_wrap{
    margin-top: 40px;
    text-align: center;
  }
}
</style>

