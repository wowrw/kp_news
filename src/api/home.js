import http from "@/utils/request";

//获取轮播列表  
export function getCarouselList() {
    return http.request({
        url: "/zjffabc/Swiper/GetSwiperImg",
        method: "get",
    });
}
// 获取文章内容
export function getcontentList() {
    return http.request({
        url: "/zjffabc/Article/getArticle",
        method: "get",
    });
}

// 获取视频内容
export function getvideoList() {
    return http.request({
        url: "/zjffabc/Video/getVideo",
        method: "get",
    });
}
