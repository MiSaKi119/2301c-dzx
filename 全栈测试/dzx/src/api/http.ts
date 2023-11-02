import Http from "./api";


//获取图形验证码
export const yzm = (data: any) => Http.get('/verification/pic/gett', data)
//登录
export const dl = (data: any) => Http.post('/user/m/login', data)
//首页轮播
export const sy = (data: any) => Http.get('/banner/list', data)
//首页商品
export const sp = (data: any) => Http.post('/shop/goods/list/v2', data)
//分类
export const fl = (data: any) => Http.get('/shop/goods/category/all', data)
//分类2
export const fl2 = (data: any) => Http.get('/shop/goods/list/v2', data)