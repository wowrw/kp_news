import http from "@/utils/request";

///  查询新闻详情


export function getvideosDetailById(params) {
    return http.request({
        url: "/zjffabc/Video/GetVideoById",
        method: "get",
        params: params,
    });

}
// 查询全部评论
export function getCommentListVideo(params) {

    return http.request({

        url: "/zjffabc/Comment/getCommentListVideo",

        method: "get",

        params: params,

    });

}

// 评分
export function postUpdateStar(params) {

    return http.request({

        url: "/zjffabc/Video/UpdateStar",

        method: "post",

        params: params,

    });

}
// 查询用户
export function getVideoFrom(params) {

    return http.request({

        url: "/zjffabc/Video/getVideoFrom",

        method: "get",

        params: params,

    });

}