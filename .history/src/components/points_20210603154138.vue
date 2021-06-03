<template>
  <div class="map-space">
    <div class="left">
      <div class="top">
        <div class="li">
          <div class="btnRouter">
            <el-button type="primary" @click="btnRouter">散点图展示</el-button>
          </div>
        </div>
        <div class="li">
          <div class="No1">
            <!--<span class="span1">●</span>-->
            范围选择:
          </div>
          <div class="input1">
            <el-select
              v-model="change_val"
              placeholder="请选取要绘制数据范围"
              @change="changeOptions($event)"
            >
              <el-option v-for="item in options" :key="item.id" :value="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="li">
          <div class="label">
            <!--<span class="span1">●</span>-->
            (转换前:数据库经纬度):
          </div>
          <div class="input">
            <el-button type="primary" @click="btnClickLast">运行</el-button>
          </div>
        </div>
        <div class="li">
          <div class="label">
            <!--<span class="span2">●</span>-->
            (转换后:方圆1公里之内):
          </div>
          <div class="input">
            <el-button type="primary" @click="btnClickNow" v-clickDown>运行</el-button>
          </div>
        </div>
        <div class="li">
          <div class="label">
            <!--<span class="span3">●</span>-->
            (转换后:地理编码):
          </div>
          <div class="input">
            <el-button type="primary" @click="btnClicPlace">运行</el-button>
          </div>
        </div>
        <div class="li">
          <div class="label">清除地图重新绘制:</div>
          <div class="input">
            <el-button @click="removeMarker">清除</el-button>
          </div>
        </div>
      </div>
      <div class="down">
        <div class="textR">
          <div class="text_top">
            <span>匹配到的地址</span>
            <span>未匹配到的地址</span>
          </div>
          <div class="text_main">
            <div class="text_left">
              <ul>
                <li class="item_li_value" v-for="item in addressList1" :key="item.id">{{item.value}}</li>
              </ul>
            </div>
            <div class="text_right">
              <ul>
                <li class="item_li_value" v-for="item in addressList2" :key="item.id">{{item.value}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <div id="container"></div>
    </div>
  </div>
</template>
<script>
import points_Json from "../assets/json/points.json";
import { getLocation, getAddress, getSerchGround, getLatlng } from "../api/api";
export default {
  directives: {
    clickDown: {
      inserted(el) {
        // el.click()
        // setInterval(() => {
        //     el.click()
        // }, 2500)
      },
    },
  },
  data() {
    return {
      key: "TKTBZ-XPTKJ-FM3F4-FZOCS-7NFPS-XCB2A",
      map: null,
      markerLayer: null,
      change_val: "",
      options: [
        {
          label: "选择1",
          value: "0-50",
        },
        {
          label: "选择1",
          value: "50-100",
        },
        {
          label: "选择1",
          value: "100-150",
        },
        {
          label: "选择1",
          value: "150-200",
        },
        {
          label: "选择1",
          value: "200-250",
        },
        {
          label: "选择1",
          value: "250-300",
        },
        {
          label: "选择1",
          value: "300-350",
        },
        {
          label: "选择1",
          value: "350-400",
        },
        {
          label: "选择1",
          value: "400-450",
        },
        {
          label: "选择1",
          value: "450-500",
        },
        {
          label: "选择1",
          value: "500-550",
        },
        {
          label: "选择1",
          value: "550-600",
        },
        {
          label: "选择1",
          value: "600-650",
        },
        {
          label: "选择1",
          value: "650-700",
        },
        {
          label: "选择1",
          value: "700-750",
        },
        {
          label: "选择1",
          value: "750-800",
        },
        {
          label: "选择1",
          value: "800-850",
        },
        {
          label: "选择1",
          value: "850-900",
        },
        {
          label: "选择1",
          value: "900-950",
        },
        {
          label: "选择1",
          value: "950-1000",
        },
      ],
      infoWindow: null,
      markerArr: [],
      markerArr1: [],
      markerArr2: [],
      locatOptions: "",
      locatOptions1: "",
      addResssList: [],
      json_options1: [],
      json_options2: [],
      index_change: [0, 0],
      deletePoints: [],
      addressList1: [],
      addressList2: [],
    };
  },
  watch: {
    markerArr: {
      handler: function (val) {
        //// console.log(val)
        if (val.length == 0) {
          this.removeMap();
          this.init();
        }
      },
      deep: true,
    },
    markerArr1: {
      handler: function (val) {
        //// console.log(val)
        if (val.length == 0) {
          this.removeMap();
          this.init();
        }
      },
      deep: true,
    },
    markerArr2: {
      handler: function (val) {
        //// console.log(val)
        if (val.length == 0) {
          this.removeMap();
          this.init();
        }
      },
      deep: true,
    },
  },
  methods: {
    btnRouter() {
      this.$router.push({
        path: "/index1",
      });
    },
    /*
     *先要进行下拉选择
     */
    changeOptions(env) {
      this.index_change = [env.split("-")[0], env.split("-")[1]];
      if (
        this.markerArr.length != 0 ||
        this.markerArr1.length != 0 ||
        this.markerArr2.length != 0
      ) {
        this.removeMarker();
      }
      if (this.addressList1 || this.addressList2) {
        this.addressList1 = [];
        this.addressList2 = [];
      }
    },
    //src_lat、src_lng
    //因数据库的经纬度是高德
    //故先要转为腾讯经纬度5-2
    getLoactions() {
      var arr = [];
      this.locatOptions = "";
      this.addResssList = [];
      console.log(this.index_change[0], this.index_change[1]);
      let pData = points_Json.RECORDS.slice(
        this.index_change[0],
        this.index_change[1]
      );
      console.log(pData);
      for (let j = 0; j < pData.length; j++) {
        let str = pData[j].src_lat + "," + pData[j].src_lng;
        this.addResssList.push(pData[j].address);
        arr.push(str);
      }
      //console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
          //console.log("相等")
          this.locatOptions += arr[i];
        } else {
          this.locatOptions += arr[i] + ";";
        }
      }
      //// console.log(this.addResssList)
    },
    getLoactions_base_poi() {
      var arr = [];
      this.locatOptions = "";
      this.addResssList = [];
      console.log(this.index_change[0], this.index_change[1]);
      let pData = points_Json.RECORDS.slice(
        this.index_change[0],
        this.index_change[1]
      );
      console.log(pData);
      for (let j = 0; j < pData.length; j++) {
        let str = pData[j].src_lat + "," + pData[j].src_lng;
        this.addResssList.push(pData[j].address);
        arr.push(str);
      }
      //console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
          //console.log("相等")
          this.locatOptions += arr[i];
        } else {
          this.locatOptions += arr[i] + ";";
        }
      }
      //// console.log(this.addResssList)
    },
    //lat、lng
    //因数据库的经纬度是腾讯地图poi关键字搜索出来并且进行转换后的
    //故先要转为腾讯经纬度 5-1
    getLoactions1() {
      var arr = [];
      this.locatOptions1 = "";
      let pData = points_Json.RECORDS.slice(
        this.index_change[0],
        this.index_change[1]
      );
      //// console.log(pData)
      for (let j = 0; j < pData.length; j++) {
        let str = pData[j].lat + "," + pData[j].lng;
        arr.push(str);
      }
      //// console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        if (i === arr.length - 1) {
          // console.log("相等")
          this.locatOptions1 += arr[i];
        } else {
          this.locatOptions1 += arr[i] + ";";
        }
      }
      //// console.log(this.locatOptions1)
    },
    // 经纬度绘制(转换前):
    btnClickLast() {
      this.getLoactions();
      let info = {
        locations: this.locatOptions,
        from_type: 5,
        to_type: 2,
        key: this.key,
      };
      //经纬度转换完成后 得到新的经纬度 调用经纬度解析接口
      getLocation(info)
        .then((res) => {
          let pData = res.locations;
          for (let j = 0; j < pData.length; j++) {
            // // console.log(pData[j].lat + "," + pData[j].lng)
            let str = pData[j].lat + "," + pData[j].lng;
            let info1 = {
              location: str,
            };
            console.log(this.addResssList[j]);
            getLatlng(info1)
              .then((res1) => {
                //// console.log(res1)
                for (var key in res1) {
                  var position = new TMap.LatLng(
                    res1.result.location.lat,
                    res1.result.location.lng
                  );
                  this.markerArr.push({
                    position: position,
                    properties: {
                      idCode: j + "-转换前",
                      address_base: this.addResssList[j],
                      address: res1.result.address,
                    },
                  });
                }
                this.initMarker();
                //// console.log(this.markerArr)
                this.markerLayer.setGeometries(this.markerArr);
              })
              .catch((err) => {});
          }
        })
        .catch((error) => {
          //console.log(error);
        });
    },
    //经纬度绘制(转换后-poi关键字):
    btnClickNow() {
      this.getLoactions_base_poi();
      let info = {
        locations: this.locatOptions,
        from_type: 5,
        to_type: 2,
      };
      //经纬度转换完成后 得到新的经纬度 当 附近查询的点位 ，地址：获取json的地址
      getLocation(info)
        .then((res) => {
          // console.log(res)
          let latlng = res.locations;
          let pData = points_Json.RECORDS.slice(
            this.index_change[0],
            this.index_change[1]
          );
          let formData = {};
          for (let k = 0; k < latlng.length; k++) {
            //循环获取经纬度
            formData = {
              boundary:
                "nearby(" + latlng[k].lat + "," + latlng[k].lng + ",2000,1)",
              orderby: "_distance",
              // _raw:'1',
              page_size: "10",
              page_index: "1",
              keyword: pData[k].address,
            };
            getSerchGround(formData)
              .then((res1) => {
                //声明json
                // console.log(res1)
                let json_test = {
                  // id:k,
                  value: pData[k].address,
                  // '纬度': pData[k].src_lat,
                  // '经度': pData[k].src_lng,
                  // '数据': res1.data
                };
                if (res1.count != 0) {
                  this.addressList1.push(json_test);
                } else {
                  this.addressList2.push(json_test);
                }
                //    console.log([k]+pData[k].address+"-"+res1.data[0].location.lat,res1.data[0].location.lng+"---**-"+res1.data[0].address)
                // console.log(res1.data[0].location.lat,res1.data[0].location.lng)
                var position = new TMap.LatLng(
                  res1.data[0].location.lat,
                  res1.data[0].location.lng
                );
                //    this.map.setCenter(position)
                this.markerArr1.push({
                  position: position,
                  properties: {
                    idCode: k + "-附近1公里",
                    address_base: this.addResssList[k],
                    address: res1.data[0].address,
                  },
                });
                // this.map.setCenter(position)
                this.initMarker1();
                this.markerLayer.setGeometries(this.markerArr1);
              })
              .catch((err) => {});
          }
        })
        .catch((error) => {
          //console.log(error);
        });

      window.out1 = this.json_options1;
      window.out2 = this.json_options2;
    },
    //经纬度绘制(转换后-地理编码):
    btnClicPlace() {
      let pData2 = points_Json.RECORDS.slice(
        this.index_change[0],
        this.index_change[1]
      );
      for (let j = 0; j < pData2.length; j++) {
        let formData = {
          address: pData2[j].address,
          region: "台州",
        };
        getAddress(formData)
          .then((resp) => {
            // let pData = res.result.location
            // let lists = {
            //     lat: pData.lat,
            //     lng: pData.lng,
            //     styleId: 'greenStyleColor'
            // }
            // this.dataPoints1.push(lists)
            // this.setPoints(this.dataPoints1)
            let pData = resp.result.location;
            let str = pData.lat + "," + pData.lng;
            let info1 = {
              location: str,
            };
            getLatlng(info1)
              .then((res1) => {
                // console.log([j+3]+pData2[j].address+"-***---"+res1.result.formatted_addresses.recommend)
                for (var key in res1) {
                  var position = new TMap.LatLng(
                    res1.result.location.lat,
                    res1.result.location.lng
                  );
                  //// console.log(position)
                  this.markerArr2.push({
                    position: position,
                    properties: {
                      idCode: j + "-地理编码",
                      address_base: this.addResssList[j],
                      address: res1.result.address,
                    },
                  });
                }
                this.initMarker2();
                //// console.log(this.markerArr)
                this.markerLayer.setGeometries(this.markerArr2);
              })
              .catch((err) => {});
          })
          .catch((err) => {});
      }
    },
    init() {
      var center = new TMap.LatLng(28.66361, 121.431878); //设置中心点坐标
      //初始化地图
      this.map = new TMap.Map(container, {
        zoom: 13, // 设置地图缩放级别
        center: center, // 设置地图中心
      });
    },
    initMarker() {
      //创建并初始化MultiMarker
      this.markerLayer = new TMap.MultiMarker({
        // id: 'marker',
        map: this.map, //指定地图容器
        //点标记数据数组
        geometries: [],
        styles: {
          default: new TMap.MarkerStyle({
            width: 34,
            height: 42,
            anchor: {
              x: 17,
              y: 21,
            },
            src: require("../assets/red.png"),
          }),
        },
      });
      this.infoWindow = new TMap.InfoWindow({
        map: this.map,
        position: this.map.getCenter(),
        offset: {
          // 设置信息弹窗的偏移量，否则会和marker重合
          x: 0,
          y: -28,
        },
      }).close();
      this.markerLayer.on("click", (evt) => {
        // console.log(evt)
        let content = `
          <div>
          <p>序号: ${evt.geometry.properties.idCode}</p>
          <p>数据库地址: ${evt.geometry.properties.address_base}</p>
            <p>经纬度搜索地址: ${evt.geometry.properties.address}</p>
          </div>
        `;
        this.infoWindow.open();
        this.infoWindow.setPosition(evt.geometry.position); // 设置信息窗口的坐标
        this.infoWindow.setContent(content); // 设置信息窗口的内容
      });
    },
    initMarker1() {
      //创建并初始化MultiMarker
      this.markerLayer = new TMap.MultiMarker({
        id: "marker" + Math.random(),
        map: this.map, //指定地图容器
        styles: {
          default: new TMap.MarkerStyle({
            width: 34,
            height: 42,
            anchor: {
              x: 17,
              y: 21,
            },
            src: require("../assets/blue.png"),
          }),
        },
        //点标记数据数组
        geometries: [],
      });
      this.infoWindow = new TMap.InfoWindow({
        map: this.map,
        position: this.map.getCenter(),
        offset: {
          // 设置信息弹窗的偏移量，否则会和marker重合
          x: 0,
          y: -28,
        },
      }).close();
      this.markerLayer.on("click", (evt) => {
        // console.log(evt)
        let content = `
          <div>
          <p>序号: ${evt.geometry.properties.idCode}</p>
          <p>数据库地址: ${evt.geometry.properties.address_base}</p>
            <p>经纬度搜索地址: ${evt.geometry.properties.address}</p>
          </div>
        `;
        this.infoWindow.open();
        this.infoWindow.setPosition(evt.geometry.position); // 设置信息窗口的坐标
        this.infoWindow.setContent(content); // 设置信息窗口的内容
      });
    },
    initMarker2() {
      //创建并初始化MultiMarker
      this.markerLayer = new TMap.MultiMarker({
        id: "marker" + Math.random(),
        map: this.map, //指定地图容器
        styles: {
          default: new TMap.MarkerStyle({
            width: 34,
            height: 42,
            anchor: {
              x: 17,
              y: 21,
            },
            src: require("../assets/pink.png"),
          }),
        },
        //点标记数据数组
        geometries: [],
      });
      this.infoWindow = new TMap.InfoWindow({
        map: this.map,
        position: this.map.getCenter(),
        offset: {
          // 设置信息弹窗的偏移量，否则会和marker重合
          x: 0,
          y: -28,
        },
      }).close();
      this.markerLayer.on("click", (evt) => {
        // console.log(evt)
        let content = `
          <div>
          <p>序号: ${evt.geometry.properties.idCode}</p>
          <p>数据库地址: ${evt.geometry.properties.address_base}</p>
            <p>经纬度搜索地址: ${evt.geometry.properties.address}</p>
          </div>
        `;
        this.infoWindow.open();
        this.infoWindow.setPosition(evt.geometry.position); // 设置信息窗口的坐标
        this.infoWindow.setContent(content); // 设置信息窗口的内容
      });
    },
    //移除点位信息
    removeMarker() {
      if (this.markerLayer) {
        this.markerLayer.setMap(this.map);
        this.markerLayer = null;
      }
      this.markerArr = [];
      this.markerArr1 = [];
      this.markerArr2 = [];
    },
    //移除地图
    removeMap() {
      this.map.destroy();
    },
  },
  mounted() {
    if (this.map != null) {
      this.removeMap();
    }
    this.init();
  },
};
</script>
<style scoped lang="less">
.map-space {
  width: 100%;
  height: 90%;
  display: flex;

  .left {
    width: 20%;
    height: 100%;
    // // background: whitesmoke;
    // background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    // align-items: center;
    .top {
      width: 100%;
      height: 50%;

      .li {
        margin-top: 15px;
        width: 95%;
        height: 50px;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .btnRouter {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .label {
          padding: 5px;
          // width: 80%;
          font-size: 18px;
          color: white;
          font-family: "Courier New", Courier, monospace;

          .span1 {
            font-size: 25px;
            color: #ff0000;
          }

          .span2 {
            font-size: 25px;
            color: #387cea;
          }

          .span3 {
            font-size: 25px;
            color: #10a162;
          }
        }

        .No1 {
          padding: 5px;
          width: 30%;
          font-size: 20px;
          color: white;
          font-family: "Courier New", Courier, monospace;
        }

        .input {
          width: 36%;
          height: 100%;
        }

        .btnClick {
          width: 100%;
          height: 100%;
          // border: 1px solid red;
        }
      }
    }

    .down {
      width: 100%;
      height: 50%;
      background: white;

      .textR {
        width: 100%;
        height: 100%;

        .text_top {
          width: 100%;
          height: 15%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-bottom: 1px solid black;

          span {
            font-size: 15px;
          }
        }

        .text_main {
          width: 100%;
          height: 85%;
          display: flex;
          justify-content: space-between;
          align-item: center;

          .text_left {
            width: 50%;
            height: 100%;
            overflow: auto;
            border-right: 1px solid black;
            .item_li_value {
              width: 100%;
              height: 30px;
              font-size: 10px;
            }
          }

          .text_right {
            width: 50%;
            height: 100%;
            overflow: auto;
            .item_li_value {
              width: 100%;
              height: 30px;
              text-align: center;
              font-size: 10px;
            }
          }
        }
      }
    }
  }

  .right {
    width: 80%;
    height: 100%;
    border: 1px solid rgba(10, 67, 188, 1);
    box-shadow: 0px 0px 40px 0px rgba(0, 229, 255, 0.3);

    #container {
      width: 100%;
      height: 100%;
    }
  }
}
</style>