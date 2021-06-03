<template>
  <div class="navarr">
    <div class="nav-list">
      <div class="nav-cont">
        <div class="nav-left">
          <div class="nav-time">
            <span class="second">{{ times }}</span>
            <div class="week">
              <span>{{ currentDay }}</span>
              <span>{{ week }}</span>
            </div>
          </div>
        </div>
        <div class="nav-center">
          <span class="title">腾讯地图内网测试</span>
        </div>
        <div class="nav-right">
          <div class="user">
          </div>
        </div>
      </div>
      <div class="btn-list">
      </div>
    </div>
  </div>
</template>

<script>
export default {

  name: "navArr",
  data () {
    return {
      times: "",
      currentDay: "",
      week: "",
    };
  },
  methods: {
    // 左上角时间
    getNowDate () {
      var date = new Date();
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      this.week = new Array(
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六"
      )[date.getDay()];
      let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let minute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let second =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      this.times = hour + ":" + minute + ":" + second;
      this.currentDay = year + "-" + month + "-" + day;
    }
  },
  watch: {
  },
  mounted () {
    let timer = setInterval(() => {
      this.getNowDate();
    }, 1000);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(timer);
    });
  },
};
</script>

<style scoped lang="less">
.navarr {
  width: 100%;
  height: 100%;
  background: url("../assets/images/Header.png");
  // background-size: 100% 100%;
  .nav-list {
    .nav-cont {
      display: flex;
      margin: 0 24px;
      padding-top: 4px;
      .nav-left,
      .nav-right {
        width: 686px;
      }
      .nav-center {
        width: 500px;
        .title {
          font-size: 36px;
          padding: 5px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          // line-height: 40px;
          letter-spacing: 11px;
        }
      }
      .nav-left {
        display: flex;
        justify-content: space-between;
        .nav-time {
          .second {
            font-size: 20px;
            font-family: FZNewZongYi-M05S;
            font-weight: 400;
            color: rgba(7, 230, 237, 1);
          }
          .week {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            opacity: 0.8;
            span {
              &:first-child {
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
