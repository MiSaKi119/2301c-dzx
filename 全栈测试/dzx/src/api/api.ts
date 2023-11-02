import axios from "axios";

class Http {
   baseURL: string
   dzx: any
   constructor(baseURL: string) {
      this.baseURL = baseURL
      this.dzx = axios.create({
         baseURL: this.baseURL
      })
      this.dzx.interceptors.request.use((config: any) => {
         config.headers.Authorization = { 'Content-Type': 'application/x-www-form-urlencoded' }
         return config
      })

      this.dzx.interceptors.response.use((res: any) => {
         return res
      })
   }

   post(url: string, data?: any) {
      console.log(data);

      return this.dzx.post(url, data)
   }
   get(url: string, data?: any) {
      return this.dzx.get(url, { params: { data } })
   }
   put(url: string, data?: any) {
      return this.dzx.put(url, data)
   }
}
export default new Http('https://api.it120.cc/xiaochengxu/')
