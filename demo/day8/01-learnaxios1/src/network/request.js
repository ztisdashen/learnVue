import axios from 'axios'
export function instances(config,success,failure) {
  const instance1 = axios.create({
    baseURL:"http://123.207.32.32:8000/api/hy",
    timeout:5000,
    headers:{}
  });
  instance1.interceptors.request.use(config=>{
    console.log(config);
    //一定要给config返回出去，否则将config拦截
    return config
  },err=>{
    console.log(err)
  });
  instance1.interceptors.response.use(response=>{
    console.log(response)
    return response.data
  },err=>{
    console.log(err)
  });
  return instance1(config)
  // instance1(config).then(res=>{
  //   success(res)
  // }).catch(err=>{
  //   failure(err)
  // })
}
// export function instances(config) {
//   return new Promise(((resolve, reject) => {
//     const instance1 = axios.create({
//       baseURL:"http://123.207.32.32:8000",
//       timeout:5000
//     });
//     instance1(config).then(res=>{
//       resolve(res)
//     }).catch(err=>{
//       reject(err)
//     })
//   }))
// }
