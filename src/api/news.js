
import http from "@/utils/request";

// 1.7.1 查询新闻资讯列表
// 参数名	参数说明	备注
// 无参数
export function getNewsList()
{
    return http.request({
        url: "news/list",
        method: "get",         
    });
}

//==============================================//
// 1.7.2 根据id查询新闻详情 news/show
// 参数名	参数说明	备注
// id	新闻id
export function getNewDetailById(params)
{
    return http.request({
        url: "news/detail",
        method: "get", 
        params,
    });
}