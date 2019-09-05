<template>
  <div class="dashboard-container">
    <div class="dashboard-text" style="text-align:center">
      <el-table v-loading="listLoading" :data="listData" border style="width: 100%;">
        <el-table-column align="center" prop="boyNumber" label="男孩编号" width="197" />
        <el-table-column align="center" prop="boyName" label="男孩姓名" width="200" />
        <el-table-column align="center" prop="girlNumber" label="女孩编号" width="197" />
        <el-table-column align="center" prop="girlName" label="女孩姓名" width="200" />
        <el-table-column align="center" label="操作" width="300">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstname: "",
        gender: "",
        mobile: "",
        number: ""
      },
      formLabelWidth: "120px",
      pageSizes: [10, 20, 30, 50],
      total: 0,
      listQuery: {
        page: 1,
        size: 10
      },
      listLoading: false,
      isOpen: "开启"
    };
  },
  methods: {}
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

