<template>
  <div class="layout">
    <div class="nav-top">
      <v-NavArr></v-NavArr>
    </div>
    <div class="content">
      <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive> -->
      <router-view></router-view>
      
    </div>
  </div>
</template>

<script>
import NavArr from "../components/NavArr";
export default {
  name: "layout",
  components: {
    "v-NavArr": NavArr
  },
  data () {
    return {};
  }
};
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;
  .nav-top {
    width: 100%;
    height: 10%;
  }
  .content {
    width: 100%;
    height: 100%;
  }
}
</style>
