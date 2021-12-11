import http from "@/utils/request";  //axios

/***** 用户(User) 模块 *******/
export function isLogin() {
    return http.request({
        url: "/zjffabc/Admin/GetUserByUserName",
        method: "get",
    });
}

//========================新的后端
export function login(params) {
    return http.request({
        url: "/zjffabc/Admin/DoLogin",   //http://114.55.59.237:8080/zjffabc/Admin/DoLogin     /user/login
        method: "get",
        params: params,
    });
}  //


export function register(params) {
    return http.request({
        url: "/zjffabc/Admin/registerUser",
        method: "get",
        params: params,
    });
}


//==========================================================

// 上传用户头像
export function uploadAvatar(file, detail) {
    let formData = new FormData();
    formData.append(detail.name, file.file);
    return http.post("/zjffabc/Admin/UpdateUserImg", formData, {
        headers: {
            'enctype': 'multipart/form-data'  //multer必须指定 enctype="multipart/form-data".
        },
        //params:{path:"user_profile"} //也可以传递参数的
    });
}

// 用户编辑 By 用户ID 
export function updateById(params) {
    return http.request({
        url: "/zjffabc/Admin/UpdateUser",
        method: "post",
        params: params,
    });
}

// 用户修改密码 By用户Id 
export function updatePwdById(params) {
    return http.request({
        url: "/user/updatePwdById",
        method: "post",
        data: params,
    });
}

// 用户信息 By用户Id 
export function getDetailById(params) {
    return http.request({
        url: "/zjffabc/Admin/GetUserById",
        method: "get",
        params: params,
    });
}
