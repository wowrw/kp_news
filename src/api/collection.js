import http from "@/utils/request";  //axios

//获取收藏列表
export function getCollectionListArticle(params) {
    return http.request({
        url: "/zjffabc/Collection/getCollectionListArticle",
        method: "get",
        params: params,
    });
}
//添加收藏
AddCollection
export function AddCollection(params) {
    return http.request({
        url: "/zjffabc/Collection/AddCollection",
        method: "post",
        params: params,
    });
}
//删除收藏记录
export function DelCollection(params) {
    return http.request({
        url: "/zjffabc/Collection/DelCollection",
        method: "DELETE",
        params: params,
    });
}


//获取历史记录列表
export function getHistoryListArticle(params) {
    return http.request({
        url: "/zjffabc/History/getHistoryListArticle",
        method: "get",
        params: params,
    });
}
//添加记录
export function AddHistory(params) {
    return http.request({
        url: "/zjffabc/History/AddHistory",
        method: "post",
        params: params,
    });
}
//删除历史记录
export function DelHistory(params) {
    return http.request({
        url: "/zjffabc/History/DelHistory",
        method: "DELETE",
        params: params,
    });
}




//获取订阅列表
export function getSubscribeNewList(params) {
    return http.request({
        url: "/zjffabc/Subscribe/getSubscribeNewList",
        method: "get",
        params: params,
    });
}
//添加订阅
export function AddSubscribe(params) {
    return http.request({
        url: "/zjffabc/Subscribe/AddSubscribe",
        method: "post",
        params: params,
    });
}
//删除订阅
export function DelSubscribeByFuserid(params) {
    return http.request({
        url: "/zjffabc/Subscribe/DelSubscribeByFuserid",
        method: "DELETE",
        params: params,
    });
}