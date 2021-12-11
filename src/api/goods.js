import http from "@/utils/request";

/// 1 查询文章详情

export function getGoodsDetailById(params) {

    return http.request({

        url: "/zjffabc/Article/GetArticleById",

        method: "get",

        params: params,

    });

}