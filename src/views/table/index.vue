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
      <el-form-item label="">
        <el-select v-model="formInline.order_status" placeholder="请选择订单状态" clearable>
          <el-option :label="item.name" :value="item.value" v-for="(item, index) in orderStatus" :key="index"></el-option>
        </el-select>
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
      <el-table-column label="订单编号" align="center">
        <template slot-scope="scope">
          {{scope.row.id}}
        </template>
      </el-table-column>
      <el-table-column label="订单ID" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.order_id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户手机"  align="center">
        <template slot-scope="scope">
          {{scope.row.tel}}
        </template>
      </el-table-column>
       <el-table-column label="充值面额" align="center">
        <template slot-scope="scope">
          {{scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="订单状态" align="center">
        <template slot-scope="scope">
          {{scope.row.order_status}}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="添加时间">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="120px" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editHandle(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="订单ID" :label-width="formLabelWidth">
          <el-input v-model="form.order_id" auto-complete="off" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-select v-model="form.order_status" placeholder="请选择订单状态" clearable>
            <el-option :label="item.order_status" :value="item.value" v-for="(item, index) in orderStatus" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeList">确 定</el-button>
      </div>
    </el-dialog>
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
import { getList } from '@/api/table'

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
      orderStatus: [
        {
          name: '新订单',
          value: '新订单'
        },
        {
          name: '已接订单',
          value: '已接订单'
        },
        {
          name: '已完成订单',
          value: '已完成订单'
        },
        {
          name: '失败订单',
          value: '失败订单'
        },
      ],
      form: {
        order_id: '',
        order_status: ''
      },
      currentPage: 1,
    }
  },
  filters: {
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
          id: 342027191,
          order_id: '2018080181SDASDFASDA',
          tel: '13136107533',
          money: 102,
          order_status: '已接单',
          time: '2018-08-14'
        }
        data.push(json)
      }
      this.list = data
      this.listLoading = false
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
    changeList () {
      console.log(this.form)
      this.dialogFormVisible = false
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

