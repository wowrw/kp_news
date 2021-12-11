import http from "@/utils/request";  //axios
// 查询视频全部评论
export function getCommentListVideo(params) {

    return http.request({

        url: "/zjffabc/Comment/getCommentListVideo",

        method: "get",

        params: params,

    });

}
// 添加视频评论
export function AddCommentVideo(params) {

    return http.request({

        url: "/zjffabc/Comment/AddCommentVideo",

        method: "post",

        params: params,

    });

}
// 查询新闻全部评论
export function getCommentListArticle(params) {

    return http.request({

        url: "/zjffabc/Comment/getCommentListArticle",

        method: "get",

        params: params,

    });

}

// 添加新闻评论
export function AddComment(params) {

    return http.request({

        url: "/zjffabc/Comment/AddComment",

        method: "post",

        params: params,

    });

}