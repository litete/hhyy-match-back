<template>
  <div class="dashboard-container">
    <div class="addButton" style="text-align:right;margin:0px auto 0px auto;">
      <el-button type="primary" @click="dialogFormVisible = true">新增</el-button>
    </div>
    <div class="dashboard-text" style="text-align:center">
      <el-table v-loading="listLoading" :data="listData" border style="width: 100%;">
        <el-table-column align="center" prop="firstname" label="姓名" width="400" />
        <el-table-column align="center" prop="mobile" label="手机号" width="500" />
        <el-table-column align="center" prop="number" label="编号" width="400" />
        <el-table-column align="center" label="操作" width="349">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      v-show="total>0"
      :total="total"
      :page-sizes="pageSizes"
      :page-size="listQuery.size"
      :current-page="listQuery.page"
      background
      layout="prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @pagination="getList"
    />

    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.firstname" autocomplete="off" />
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select
            v-model="form.gender"
            placeholder="请选择性别"
            clearable
          >
            <el-option
              v-for="(lable, value,index) in genderStatus"
              :key="index"
              :label="lable"
              :value="value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off" />
        </el-form-item>
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.number" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { selectUser, addUser } from '@/api/user'
import { genderStatus } from '@/js/marriage.js'

export default {
  name: 'Dashboard',
  data() {
    return {
      dialogFormVisible: false,
      genderStatus: genderStatus,
      form: {
        firstname: '',
        gender: '',
        mobile: '',
        number: ''
      },
      formLabelWidth: '120px',
      pageSizes: [10, 20, 30, 50],
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      listLoading: false,
      listData: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      selectUser(this.listQuery).then(response => {
        this.listData = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    openDialog() {
      this.dialogFormVisible = true
    },
    addUser() {
      this.dialogFormVisible = false
      var formData = new FormData()
      formData.append('firstname', this.form.firstname)
      formData.append('gender', this.form.gender)
      formData.append('mobile', this.form.mobile)
      formData.append('number', this.form.number)
      addUser(formData).then(res => {
        if (res.code == 200) {
          this.openSuccess(res.data)
        } else if ((res.code = 500)) {
          this.openError(res.data.message)
        }
      })
    },
    handleClick(row) {
      console.log(row)
    },
    changeOpen() {},
    handleSizeChange(val) {
      this.listQuery.size = val
      this.listQuery.page = 1
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    openSuccess(message) {
      this.$notify({
        title: '成功',
        message: message,
        type: 'success'
      })
    },
    openError(message) {
      this.$notify.error({
        title: '失败',
        message: message
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
    display: flex;
  }
}

.dashboard-text {
  margin-top: 30px;
}

.addButton {
}
</style>
