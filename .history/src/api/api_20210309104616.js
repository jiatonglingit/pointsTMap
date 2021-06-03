import { getAction,postAction } from "@/api/manage";

let api = "";
/**
 * 看板操作方法
 */
const getData = params => postAction(api + "/nodes", params);
const getLocation = params => getAction("http://41.246.116.161:10602/ws/coord/v1/translate", params);//经纬度转换
const getAddress = params => getAction("http://41.246.116.161:10602/ws/geocoder/v1", params);//地址解析
const getSerchGround = params => getAction("http://41.246.116.161:10602/ws/place/v1/search", params);//地点搜索
const getLatlng = params => getAction("http://41.246.116.161:10602/ws/geocoder/v1", params);//输入经纬度查询
export { getData,getLocation,getAddress,getSerchGround,getLatlng };