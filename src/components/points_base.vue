<template>
    <div class="map-space">
        <div class="left">
            <div class="li">
                <div class="btnRouter">
                    <el-button type="primary" @click="btnRouter">点位信息标注图</el-button>
                </div>
            </div>
            <div class="li">
                <div class="label">
                    <span class="span1">●</span>
                     经纬度绘制(转换前:数据库原始经纬度):
                </div>
                <div class="input">
                    <el-button type="primary" @click="btnClickLast">运行</el-button>
                </div>
            </div>
            <div class="li">
                <div class="label">
                    <span class="span2">●</span>
                    经纬度绘制(转换后:方圆1公里之内):
                </div>
                <div class="input">
                    <el-button type="primary" @click="btnClickNow">运行</el-button>
                </div>
            </div>
            <div class="li">
                <div class="label">
                    <span class="span3">●</span>
                    经纬度绘制(转换后:地理编码):
                </div>
                <div class="input">
                    <el-button type="primary" @click="btnClicPlace">运行</el-button>
                </div>
            </div>
            <div class="li">
                <div class="label">
                    清除地图重新绘制:
                </div>
                <div class="input">
                    <el-button @click="deletePoints">清除</el-button>
                </div>
            </div>

        </div>
        <div class="right">
            <div id="container"></div>
        </div>
    </div>
</template>

<script>
    import points_Json from '../assets/json/points.json'
    import {
        getLocation,
        getAddress,
        getSerchGround
    } from '../api/api'
    export default {
        data() {
            return {
                map: null,
                dot: null,
                markerLayer: null,
                dataPoints1: [],
                dataPoints2: [],
                dataPoints3: [],
                infoWindow: null,
                markerArr: [],
                locatOptions: '',
                locatOptions1: '',
            }
        },
        watch: {
            'dataPoints1': {
                handler: function (val) {
                    //console.log(this.dataPoints)
                    if (val.length == 0) {
                        this.deleteMap()
                        this.init()
                    }
                },
                deep: true
            },
            'locatOptions': {
                handler: function (val) {
                    //console.log(val)
                    this.locations = val
                },
                deep: true
            },
        },
        methods: {
            btnRouter() {
                this.$router.push({
                    path: '/index'
                })
            },
            //src_lat、src_lng
            //因数据库的经纬度是高德 
            //故先要转为腾讯经纬度5-2
            getLoactions() {
                var arr = []
                this.locatOptions = ""
                let pData = points_Json.RECORDS.slice(0, 50)
                //console.log(pData)
                for (let j = 0; j < pData.length; j++) {
                    let str = pData[j].src_lat + "," + pData[j].src_lng
                    arr.push(str)
                }
                //console.log(arr)
                for (let i = 0; i < arr.length; i++) {
                    if (i === arr.length - 1) {
                        //console.log("相等")
                        this.locatOptions += arr[i]
                    } else {
                        this.locatOptions += arr[i] + ";"
                    }
                }
                //console.log(this.locatOptions)
            },
            //lat、lng
            //因数据库的经纬度是腾讯地图poi关键字搜索出来并且进行转换后的
            //故先要转为腾讯经纬度 5-1
            getLoactions1() {
                var arr = []
                this.locatOptions1 = ""
                let pData = points_Json.RECORDS.slice(0, 40)
                // console.log(pData)
                for (let j = 0; j < pData.length; j++) {
                    let str = pData[j].lat + "," + pData[j].lng
                    arr.push(str)
                }
                // console.log(arr)
                for (let i = 0; i < arr.length; i++) {
                    if (i === arr.length - 1) {
                        console.log("相等")
                        this.locatOptions1 += arr[i]
                    } else {
                        this.locatOptions1 += arr[i] + ";"
                    }
                }
                // console.log(this.locatOptions1)
            },
            // 经纬度绘制(转换前):
            btnClickLast() {
                this.getLoactions()
                let info = {
                    locations: this.locatOptions,
                    from_type: 5,
                    to_type: 2
                }
                getLocation(info).then((res) => {
                    //console.log(res)
                    let pData = res.locations
                    for (let j = 0; j < pData.length; j++) {
                        let lists = {
                            lat: Number(pData[j].lat),
                            lng: Number(pData[j].lng),
                            styleId: 'redCircle'
                        }
                        this.dataPoints1.push(lists)
                    }
                    this.setPoints(this.dataPoints1)
                }).catch((error) => {
                    //console.log(error);
                })

            },
            //经纬度绘制(转换后-poi关键字):
            btnClickNow() {
                // let pData = points_Json.RECORDS.slice(0, 50)
                // for (let j = 0; j < pData.length; j++) {
                //     let formData = {
                //         boundary: 'region(台州,0)',
                //         page_size: '1',
                //         page_index: '1',
                //         keyword: pData[j].address,
                //     }
                //     getSerchGround(formData).then(res => {
                //         console.log(res.data[0].location)
                //         let pData = res.data[0].location
                //         let lists = {
                //             lat: pData.lat,
                //             lng: pData.lng,
                //             styleId: 'blueStyleColor'
                //         }
                //         this.dataPoints1.push(lists)
                //         this.setPoints(this.dataPoints1)
                //     }).catch(err => {})
                // }
                this.getLoactions1()
                let info = {
                    locations: this.locatOptions1,
                    from_type: 5,
                    to_type: 1
                }
                getLocation(info).then((res) => {
                    //console.log(res)
                    let pData = res.locations
                    for (let j = 0; j < pData.length; j++) {
                        let lists = {
                            lat: Number(pData[j].lat),
                            lng: Number(pData[j].lng),
                            styleId: 'blueStyleColor'
                        }
                        this.dataPoints1.push(lists)
                    }
                    this.setPoints(this.dataPoints1)
                }).catch((error) => {
                    //console.log(error);
                })


            },
            //经纬度绘制(转换后-地理编码):
            btnClicPlace() {
                let pData = points_Json.RECORDS.slice(0, 50)
                for (let j = 0; j < pData.length; j++) {
                    let formData = {
                        address: pData[j].address,
                        region: '台州'
                    }
                    getAddress(formData).then(res => {
                        //console.log(res.result.location)
                        let pData = res.result.location
                        let lists = {
                            lat: pData.lat,
                            lng: pData.lng,
                            styleId: 'greenStyleColor'
                        }
                        this.dataPoints1.push(lists)
                        this.setPoints(this.dataPoints1)
                    }).catch(err => {})
                }
            },
            init() {
                // 创建地图
                // //console.log(typeof ());
                let info = {
                    center: new TMap.LatLng(28.66361, 121.431878),
                    viewMode: '2D', //地图视图模式，支持2D和3D，默认为3D。2D模式下不可对地图进行拖拽旋转，pitch和rotation始终保持为0
                    showControl: false, //是否显示地图上控件
                    zoom: 12, //设置地图缩放级别
                    // mapStyleId: 'style' + this.styleNo.toString() //个性化地图样式设置
                }
                this.map = new TMap.Map('container', info);
            },
            // 删除覆盖物
            deletePoints() {
                this.dataPoints1 = []
                this.dot.remove()
            },
            //	销毁图层对象。
            deleteMap() {
                if (this.map) {
                    this.map.destroy()
                }
            },
            // 创建散点图
            setPoints(data) {
                this.dot = new TMap.visualization.Dot({
                    faceTo: 'screen', // 设置散点朝向
                    styles: {
                        'redCircle': { // 定义一个红色圆形样式
                            type: 'map',
                            fillColor: '#FF0000'
                        },

                        'blueStyleColor': {
                            type: "map", //圆形样式
                            fillColor: "#387cea", //填充颜色
                        },
                        'greenStyleColor': {
                            type: "map", //圆形样式
                            fillColor: "#10a162", //填充颜色
                        }
                    }

                }).addTo(this.map); // 通过addTo()添加到指定地图实例
                // 设置数据，若需要更新数据则再次调用setData方法即可
                this.dot.setData(data);
                this.dot.on('click', evt => {
                    console.log(evt)
                })
            },
        },
        mounted() {
            this.init();
        }
    }
</script>
<style scoped lang="less">
    .map-space {
        width: 100%;
        height: 90%;
        display: flex;

        .left {
            width: 20%;
            height: 70%;
            // // background: whitesmoke;
            // background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;

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
                    width: 80%;
                    font-size: 18px;
                    color: white;
                    font-family: "Courier New", Courier, monospace;

                    .span1 {
                        font-size: 25px;
                        color: #FF0000;
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