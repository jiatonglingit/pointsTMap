<template>
    <div class="content">
    </div>
</template>

<script>
    import points_Json from '../assets/json/Sheet1.json'
    import {
        getLocation,
        getAddress,
        getSerchGround,
        getLatlng
    } from '../api/api'
    export default {
        data() {
            return {
                locatOptions: '',
                addResssList: [],
                addressList1: [],
                addressList2: [],
                index_change: [-50, 0],
                count: 0
            }
        },
        methods: {
            getLoactions_base_poi() {
                var arr = []
                this.locatOptions = ""
                console.log(this.index_change[0], this.index_change[1])
                let pData = points_Json.RECORDS.slice(this.index_change[0], this.index_change[1])
                // console.log(pData)
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
            },
            //经纬度绘制(转换后-poi关键字):
            btnClickNow() {
                this.getLoactions_base_poi()
                let info = {
                    locations: this.locatOptions,
                    from_type: 5,
                    to_type: 2
                }
                //经纬度转换完成后 得到新的经纬度 当 附近查询的点位 ，地址：获取json的地址
                getLocation(info).then((res) => {
                    console.log(res)
                    let latlng = res.locations
                    let pData = points_Json.RECORDS.slice(this.index_change[0], this.index_change[1])
                    let formData = {}
                    for (let k = 0; k < latlng.length; k++) { //循环获取经纬度
                        formData = {
                            boundary: "nearby(" + latlng[k].lat + "," + latlng[k].lng + ",2000,1)",
                            orderby: '_distance',
                            // _raw:'1',
                            page_size: '10',
                            page_index: '1',
                            keyword: pData[k].address,
                        }
                        getSerchGround(formData).then(res1 => {
                            let errData = {
                                '数据库原始及纬度': pData[k].address,
                                'data': 'null'
                            }
                            if (!res1.count) {
                                // console.log(this.count)
                                this.count++
                                this.addressList1.push(errData)
                            }
                            let json_test = {
                                '数据库原始及纬度': pData[k].address,
                                '搜索到的地址': res1.data[0].address,
                                '搜索到的经纬度': res1.data[0].location.lat + "," + res1.data[0].location
                                    .lng,
                            }
                            if (res1.count) {
                                this.addressList1.push(json_test)
                            }

                        }).catch(err => {})
                    }
                }).catch((error) => {
                    //console.log(error);
                })

                window.out1 = this.addressList1
                // window.out2 = this.json_options2
                // let aa = JSON.parse(JSON.stringify(out1))

            },
            //经纬度绘制(转换后-地理编码):
            btnClicPlace() {
                // let pData = points_Json.RECORDS.slice(this.index_change[0], this.index_change[1])
                let pData = points_Json.RECORDS.slice(0, 100)
                for (let j = 0; j < pData.length; j++) {
                    let formData = {
                        address: pData[j].address,
                        region: '台州'
                    }
                    getAddress(formData).then(res1 => {
                        // console.log(res1)
                        let latlng = res1.result.location
                        let errData = {
                            // '数据库原始及纬度': pData[j].address,
                            'data': 'null'
                        }
                        let json_test = {
                            '序号':pData[j].id,
                            '县市区':pData[j].xsq,
                            '数据库原始地址': pData[j].address,
                            '搜索到的地址': res1.result.title,
                            '搜索到的经纬度': latlng.lat + "," + latlng.lng,
                            '辖区派出所':pData[j].xqpcs
                        }
                        if (res1.result) {
                            // console.log(111)
                            this.addressList1.push(json_test)
                        } else {
                            // console.log(222)
                            this.count++
                            this.addressList1.push(errData)
                        }
                    }).catch(err => {})

                    // window.out2 = this.json_options2
                    // let aa = JSON.parse(JSON.stringify(out1))

                }
                window.out1 = this.addressList1
                console.log(this.addressList1)
                console.log(212112)
                // var content = JSON.stringify(out1)
                // var eleLink = document.createElement('a')
                // eleLink.download = "da.json"
                // eleLink.style.display = 'none'
                // var blob = new Blob([content])
                // eleLink.href = URL.createObjectURL(blob)
                // document.body.appendChild(eleLink)
                // eleLink.click()
                // document.body.removeChild(eleLink)

            },
        },
        mounted() {
            let pData = points_Json.RECORDS.length
            console.log(pData)
            // for (let i = 0; i < 811; i++) {
            this.index_change[0] += 50
            this.index_change[1] += 50
            this.btnClicPlace()

            // }
            // var content = JSON.stringify(this.addressList1)
            // var eleLink = document.createElement('a')
            // eleLink.download = "dadad.json"
            // eleLink.style.display = 'none'
            // var blob = new Blob([content])
            // eleLink.href = URL.createObjectURL(blob)
            // document.body.appendChild(eleLink)
            // eleLink.click()
            // document.body.removeChild(eleLink)
            // pData

        }
    };
</script>
<style lang="less" scoped>
</style>