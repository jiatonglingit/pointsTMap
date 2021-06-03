<template>
  <div id="app">
    <div class="container">
      <div class="main">
        <!-- <div style=""> -->
        <div class="main-container"
             ref="box"
             style="width: 1920px;height: 1080px;">
          <!-- <div
          class="main-container"
          ref="box"
          style="width: 1920px;height: 1080px;"
          :style="{ transform: `scale(${ratio}, ${ratio})`, margin: `auto` }"
        > -->
          <router-view> </router-view>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  components: {
    // NavArr
  },
  data () {
    return {
      ratio: 1,
      swidth: 0,
      sheight: 0
    };
  },
  methods: {
    getscale (val) {
      const width = 1920;
      const height = 1080;
      window.onresize = () => {
        this.swidth = window.innerWidth;
        this.sheight = window.innerHeight;
        if (val === 1) {
          this.ratio = window.innerWidth / width;
        } else {
          this.ratio = window.innerHeight / height;
        }
        // console.log(this.$refs.box.children[0].style.height, 'box')
      };
    }
  },
  mounted () {
    const width = 1920;
    const wws = window.innerWidth / width;
    this.swidth = window.innerWidth;
    this.sheight = window.innerHeight;
    this.ratio = wws;
    window.addEventListener("resize", this.getscale());
    this.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", this.getscale());
    });
  },
  watch: {
    swidth () {
      this.getscale(1);
    },
    sheight () {
      this.getscale(2);
    }
  },
  created () { }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  width: 100%;
  height: 100%;
  .container {
    transition: 0.3s;
    width: 100%;
    height: 100%;
    position: relative;
    .main {
      // overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .main-container {
        position: relative;
        user-select: none;
        width: 100%;
        height: 100%;
        transform-origin: 0 0;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
        transition: all 0.3s linear;
        overflow: hidden;
        background: url("./assets/images/background.png");
        background-size: 100% 100%;
      }
    }
  }
}
.v-modal {
  display: none !important;
}
</style>
