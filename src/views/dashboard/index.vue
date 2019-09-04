<template>
  <div class="dashboard-container">
    <div class="addButton" style="text-align:right;margin:0px auto 0px auto;">
      <el-button type="primary" @click="addInfo">新增</el-button>
    </div>
    <div class="dashboard-text" style="text-align:center">
      <el-table :data="listData" border style="width: 100%;" v-loading="listLoading">
        <el-table-column align="center" prop="firstname" label="姓名" width="400"></el-table-column>
        <el-table-column align="center" prop="mobile" label="手机号" width="500"></el-table-column>
        <el-table-column align="center" prop="number" label="编号" width="400"></el-table-column>
        <el-table-column align="center" label="操作" width="349">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {selectUser} from "@/api/user"

export default {
  name: "Dashboard",
  created(){
    this.getList()
  },
  data() {
    return {
      pageSizes: [10, 20, 30, 50],
      total: 0,
      listQuery:{
        page:1,
        size:10
      },
      listLoading: false,
      isOpen: "开启",
      listData: []
    };
  },
  methods: {
    getList(){
      this.listLoading = true;
      selectUser(this.listQuery).then(response=>{
        this.listData = response.data.records;
        this.total = response.data.total;
        this.listLoading = false;
      })
    },
    handleClick(row) {
      console.log(row);
    },
    addInfo() {},
    changeOpen() {
     },
     handleSizeChange(val) {
      this.listQuery.size = val;
      this.listQuery.page = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    }
  }
};
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
