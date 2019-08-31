<template>
  <div class="dashboard-container" >
    <div class="dashboard-text">
      匹配开关:&nbsp;&nbsp;
      <div >
        <el-row >
          <el-button type="primary" plain @click="changeOpen">{{ isOpen }}</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  data() {
    return {
      isOpen: "开启"
    }
    changeOpen(){

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
</style>
