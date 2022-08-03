import axios from 'axios'

//Domain API
export const DOMAIN = 'https://jiranew.cybersoft.edu.vn'

// KeyName
export const KEY_TOKEN_CYBERSOFT = 'TokenCybersoft';
export const KEY_AUTHORIZATION_CYBERSOFT = 'Authorization';

export const TOKEN_CYBERSOFT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNzIiLCJIZXRIYW5TdHJpbmciOiIzMS8wMS8yMDIzIiwiSGV0SGFuVGltZSI6IjE2NzUxMjMyMDAwMDAiLCJuYmYiOjE2NTAzODc2MDAsImV4cCI6MTY3NTI3MDgwMH0.AIuCmZwqwz4ytkjLFFDsoctOuwji561du2mf20MNwnc'



//Cấu hình interceptor cho axios (Tất cả request gọi = axios đều được cấu hình) (1 dự án làm 1 duy nhất)
export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000,
});

http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        [KEY_TOKEN_CYBERSOFT]: TOKEN_CYBERSOFT, //qui định của cybersoft tất cả mọi request
        [KEY_AUTHORIZATION_CYBERSOFT]: 'Bearer ' + localStorage.getItem('accessToken')  //Token mà người dùng đăng nhập (401 token không hợp lệ, 403 không đủ quyền truy cập)
    }
    return config;
}, (errors) => {
    return Promise.reject(errors)
})
