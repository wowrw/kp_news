
import http from "@/utils/request";

//查询用户积分
export function getpointById(params) {
    return http.request({
        url: "/zjffabc/Point/GetPointByFuserid",
        method: "get",
        params:params
    });
}

//积分加一
export function addPoint(params) {
    return http.request({
        url: "/zjffabc/Point/addPointbyFuserid",
        method: "post",
        params:params
    });
}

