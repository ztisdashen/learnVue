# day9 vue.js

[TOC]



## axios

```javascript
axios({
  url:'http://localhost:8888/test/demo',
  method:'get'
}).then(res=>{
  console.log(res)
  // Vue.$root.$refs[0].data = res.data
});
axios({
  method: "get",
  url:"http://localhost:8888/test/dpage",
  params:{
    page:1
  }
}).then(res=>{
  console.log(res)
  // Vue.$root.$refs[0].data = res.data
});
```

### 配置

```javascript
axios.defaults.baseURL = "http://123.207.32.32:8000";
axios.defaults.timeout = 5000;
axios.all([axios({
  url:"/home/multidata"
}),axios({
  url: "/home/data",
  params:{
    type:'sell',
    page:1
  }
})]).then(axios.spread((res1,res2)=>{
  console.log(res1)
  console.log("--------------")
  console.log(res2)
}));
```

### 多个Base URL时

> 创建axios实例

```javascript
  baseURL:"http://123.207.32.32:8000",
  timeout:5000
});
instance1({
  url:"/home/multidata"
}).then(res=>{
  console.log(res)
})
```

包装1

```javascript
// export function instances(config,success,failure) {
//   const instance1 = axios.create({
//     baseURL:"http://123.207.32.32:8000",
//     timeout:5000
//   });
//   instance1(config).then(res=>{
//     success(res)
//   }).catch(err=>{
//     failure(err)
//   })
// }
```

```javascript
instances({url:'/home/multidata'},res=>{
  console.log(res)
},err=>{
  console.log(err)
})
```

包装2

```javascript
export function instances(config) {
  return new Promise(((resolve, reject) => {
    const instance1 = axios.create({
      baseURL:"http://123.207.32.32:8000",
      timeout:5000
    });
    instance1(config).then(res=>{
      resolve(res)
    }).catch(err=>{
      reject(err)
    })
  }))


}
```

```javascript
instances({url:'/home/multidata'}).then(res=>{
  console.log(res)
}).catch(err=>{
  console.log(err
  )
})
```

### axios拦截器

![TIM截图20200205092158](\img\TIM截图20200205092158.jpg)

```javascript
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
```