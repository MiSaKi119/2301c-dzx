# 微信小程序相关

### 	1 小程序有几个文件？

- `WXML`：微信自己定义的一套组件
- `WXSS` : 用于描述 `WXML` 的组件样式
- `js` : 逻辑处理
- `json` : 小程序页面配置



### 2 小程序怎么跟随事件传值

> 在 页面标签上通过 绑定 `dataset-key = value` ， 然后绑定点击通过`e.currentTarget.dataset.key` 来获取标签上绑定的值。

```text
<button bindtap="get"  data-name="测试"> 拿到传值</button>

get(e){
    console.log(e.currentTarget.dataset.name)
  },
```

### 3 小程序WXSS与CSS 的区别

> **`WXSS`**

- `wxss` 背景图片只能引入外链，不能使用本地图片
- 小程序样式使用 `@import` 引入 外联样式文件，地址为相对路径。
- 尺寸单位为 `rpx` , `rpx` 是响应式像素,可以根据屏幕宽度进行自适应。



### 4 小程序的双向绑定和Vue哪里不一样?

> 小程序 直接使用`this.data.key = value` 是 不能更新到视图当中的。
> 必须使用 `this.setData({ key ：value })` 来更新值。

### 5 小程序的生命周期函数

- `onLoad` : 页面加载时触发。一个页面只会调用一次，可以在 `onLoad`的参数中获取打开当前页面路径中的参数
- `onShow` : 页面显示 / 切入前台时触发调用。
- `onReady` : 页面初次渲染完成时触发,一个页面只会调用一次。
- `onHide` : 页面隐藏 / 切入后台时触发，如 `navigateTo` 或底部 `tab`切换到其他页面，小程序切入后台等
- `onUnload` : 页面卸载时触发。如 `redirectTo`或 `navigateBack` 到其他页面时.



### 6 小程序怎么实现下拉刷新

> **两种方案**
> **方案 一 ：**

- 通过在 `app.json` 中， 将 `"enablePullDownRefresh": true,` 开启全局下拉刷新。
- 或者通过在 `组件 .json` ， 将 `"enablePullDownRefresh": true,` 单组件下拉刷新。

**方案二：**

- `scroll-view` ：使用该滚动组件 自定义刷新，通过 `bindscrolltoupper` 属性， 当滚动到顶部/左边，会触发 `scrolltoupper`事件，所以我们可以利用这个属性，来实现下拉刷新功能。



### 7 bindtap和catchtap区别

> 相同点： `都是点击事件`
> 不同点： `bindtap` 不会阻止冒泡， `catchtap` 可以阻止冒泡。

### 8 小程序有哪些传递数据的方法

> **1. 使用全局变量**

- 在 `app.js` 中的 `this.globalData = { }` 中放入要存储的数据。
- 在 `组件.js` 中， 头部 引入 `const app = getApp();` 获取到全局变量
- 直接使用 `app.globalData.key` 来进行赋值和获取值。

**2. 使用 路由**

- `wx.navigateTo` 和 `wx.redirectTo` 时，可以通过在 `url` 后 拼接 + 变量， 然后在 `目标页面` 通过在 `onLoad` 周期中，通过参数来获取传递过来的值。

**3. 使用本地缓存**

### 9  简述下wx.navigateTo(),wx.redirectTo(),wx.switchTab(),wx.navigateBack(),wx.reLaunch() **区别**

- `wx.navigateTo()` : 保留当前页面，跳转到应用内的某个页面。但是不能跳到 `tabbar` 页面
- `wx.redirectTo()` : 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 `tabbar` 页面
- `wx.switchTab()` : 跳转到 `TabBar` 页面，并关闭其他所有非 `tabBar` 页面
- `wx.navigateBack()` : 关闭当前页面，返回上一页面或多级页面。可通过 `getCurrentPages()` 获取当前的页面栈，决定需要返回几层
- `wx.reLaunch()` : 关闭所有页面，打开到应用的某个页面。



### 10 小程序wx:if和 hidden`的区别

- `wx:if` : 有更高的切换消耗。
- `hidden` : 有更高的初始渲染消耗。

**使用**

- 频繁切换使用 `hidden`, 运行时条件变化使用 `wx: if`



### 11 app.json全局配置文件描述

- `pages` : 用于存放当前小程序的所有页面路径
- `window` : 小程序所有页面的顶部背景颜色，文字颜色配置。
- `tabBar` : 小程序底部的 `Tab` ,最多5个，最少2个。



### 12. 如何封装小程序请求

- 封装 `wx.request` 请求传递需要的参数( `url` , `data` , `method` , `success 成功回调` ， `fail 失败回调` ) , 封装常用方法 `POST` , `GET` , `DELETE` , `PUT` .... 最后导出这些方法

- 然后新建一个 `api.js` 文件，导入封装好的方法，然后调取相应的方法，传递数据。

**wx.request 封装**

```text
var app = getApp(); //获取小程序全局唯一app实例
var host = '******************'; //接口地址
 

 
//POST请求
function post(url, data, success,fail) {
  request(url, postData, "POST", doSuccess, doFail);
}
 
//GET请求
function get(url, data, success, fail) {
  request(url, postData, "GET", doSuccess, doFail);
}
 
function request(url, data, method, success, fail) {
  wx.showLoading({
    title: "正在加载中...",
  })
  wx.request({
    url: host + url, //请求地址
    method: method, //请求方法
    header: { //请求头
      "Content-Type": "application/json;charset=UTF-8"
    },
    data: data, //请求参数    
    dataType: 'json', //返回数据格式
    responseType: 'text', //响应的数据类型
    success: function(res) {
      wx.hideLoading();
      //成功执行方法，参数值为res.data,直接将返回的数据传入
      success(res.data);
    },
    fail: function() {
      //失败执行方法
      fail();
    },
  })
}
module.exports = {
  postRequest: post,
  getRequest: get,
}
```

**组件使用 封装好的请求**

```text
var http = require('../../utils/request.js'); //相对路径


var params = {//请求参数
  id:this.data.userId
}
http.postRequest("user/delUser", params, function(res) {
  console.log("修改成功！");
  
}, function(res) {
  console.log("修改失败！！！")
})
```

### 13 小程序运行机制

- `热启动` ：假如用户已经打开了某个小程序，在一定时间内再次打开小程序的话，这个时候我们就不再需要重新启动了，这需要把我们的后台打开的小程序切换到前台来使用。
- `冷启动`：用户首次打开小程序或被微信主动销毁再次打开的情况，此时小程序需要重新加载启动。



### 14 小程序什么时候会主动销毁？

> 小程序在进入后台之后，客户端会帮我们在一定时间内维持我们的一个状态，超过五分钟后，会被微信主动销毁.
> **官方也没有明确说明 什么时候销毁， 在不同机型表现也不一样，**
> 2019年开发时：时间官方文档没有说明，但是经过询问一般指5分钟内
> 2020年开发时：时间官方文档没有说明，实测安卓没有固定时间，内存足够情况下，有时候一天了还在，有时候几分钟就没了

### 15 uniapp通过什么方式进行跨度兼容

通过条件编译的方式实现跨度的兼容，条件语法 #ifdef  哪个C端    #endif  也可以通过#ifndef来排除哪个端 

条件编译可以在逻辑 样式  视图 配置文件中使用

### 16   分析微信小程序的优劣势？

优势：

容易上手，基础组件库比较全，基本不需要考虑兼容问题
开发文档比较完善，开发社区比较活跃，支持插件式开发
良好的用户体验，无需下载，通过搜索和扫一扫就可以打开，打开速度快，安卓上可以添加到桌面，与原生APP差不多
开发成本比APP要低
为用户提供良好的保障（小程序发布，严格是审查流程）

劣势：

限制较多，页面大小不能超过1M，不能打开超过5个层级的页面
样式单一，部分组件已经是成型的，样式不可修改，例如：幻灯片，导航
推广面窄，不能分享朋友圈，只能通过分享给朋友，附加小程序推广
依托与微信，无法开发后台管理功能

### 17  小程序关联微信公众号如何确定用户的唯一性

使用wx.getUserlnfo方法 [withCredentials](https://so.csdn.net/so/search?q=withCredentials&spm=1001.2101.3001.7020)为true时，可获取encryptedData，里面有union_id，后端需要进行对称解密

### 18 使用wx.navigateTo()跳转十次会发生什么

跳转十次会出现无法跳转的情况，一个应用同时只能打开5个页面，请避免多层级的交互方式，，中途需要wx.redirectTo()进行配合使用



### 19  微信小程序和H5的区别？

首先是操作环境的差异

传统的HTML5运行环境是浏览器，包括webview。然而，微信小程序的运行环境并不是一个完整的浏览器。它是微信开发团队基于浏览器内核完全重构的内置解析器。它专门针对小程序进行了优化，并使用自己定义的开发语言标准，提高了小程序的性能。

二是开发成本的差异

它只在微信中运行，因此您不必担心浏览器兼容性和生产环境中的意外错误

第3条：对系统级权限的不同访问

访问系统级权限可以无缝链接到微信小程序

### 20  小程序的appid,openid,unionid的区别

appid: 某个应用的单独标识

openid: 每一个应用下面每一个用户下都有一个唯一的openid,用来标识此用户在此应用下面的身份标识

Unionid: 同一个主题下,不同应用他们之间确定唯一身份的标识就是unionid

### 21 微信小程序如何调用摄像头、二维码、获取手机号以及具体代码?

- 微信小程序调用摄像头需要使用 wx.chooseImage 和 wx.chooseVideo API，调用二维码需要使用 wx.scanCode API，获取手机号需要使用 wx.login 和 wx.getUserInfo API，其中在获取手机号时需要用户授权才能获取。

- 调用摄像头：

  ```javascript
  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success: function (res) {
      var tempFilePaths = res.tempFilePaths
      // TODO: 处理图片
    }
  })
  
  ```

  ```javascript
  wx.chooseVideo({
    sourceType: ['album', 'camera'],
    maxDuration: 60,
    camera: 'back',
    success: function (res) {
      var tempFilePath = res.tempFilePath
      // TODO: 处理视频
    }
  })
  
  ```

- 调用二维码：

  ```javascript
  wx.scanCode({
    success: function (res) {
      var result = res.result
      // TODO: 处理扫描结果
    }
  })
  
  ```

- 获取手机号：

  ```javascript
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.getUserInfo({
          success: function (res) {
            var encryptedData = res.encryptedData
            var iv = res.iv
            // TODO: 解密 encryptedData 获取手机号
          }
        })
      }
    }
  })
  ```

  在获取手机号时需要用户授权才能获取，可以在 `app.json 文件中`配置 `"requiredUserInfo" `来提醒用户授权。具体使用方式可以参考微信小程序官方文档和示例代码。

  ### 22. 小程序的支付功能怎么实现的？

  ```js
    1.当小程序启动的时候,调用wx.login获取小程序的code码
  	2	获取到小程序的code码之后,调用获取openid接口,获取到openid
  	3	将获取到的openid以及其他信息保存到本地
  	4	点击确认支付按钮时调用统一下单接口,将对应的参数发送给后台,其中有一个签名非常重要,使用的md5进行的加密  paySign
  	5	当统一下单接口调用成功之后,后台会给我们返回支付所需要的相关信息取到支付相关的信息之后,调用封装的微信支付方法,拉起支付,把对应支付信息传进去就能够完成支付功能
  ```

  

  ### 23. 小程序的登录功能怎么实现的？

  ```js
  通过 wx.login() 获取到用户的code判断用户是否授权读取用户信息，调用wx.getUserInfo 读取用户数据。
  通过 wx.request() 方法请求业务方服务器，后端把 appid , appsecret **|丝可润特|** 和 code 一起发送到微信服务器。
  微信服务器返回了 openid 及本次登录的会话密钥 session_key **塞申 **。
  后端从数据库中查找 openid ，如果没有查到记/录，说明该用户没有注册，如果有记录，则继续往下走
  session_key 是对用户数据进行加密签名的密钥。为了自身应用安全，session_key 不应该在网络上传输
  然后生成 session并返回给小程序
  小程序把 session 存到 storage 里面
  下次请求时，先从 storage 里面读取，然后带给服务端
  服务端对比 session 对应的记录，然后校验有效期
  ```

  ### 24. 什么是分包加载，如何使用分包加载？

  ```js
  - 1.概念 减少首屏加载时间，用户在使用时按需进行加载
    2.使用
     	1. 在app.json中配置项目分包结构
         2. 配置`subpackages`属性
            subpackages: {
                   "root": "分包的根目录",
                   "pages": [""] // 需要按需加载的包所在路径
               }
  ```


## JavaScript

### 1. Js有哪些数据类型

JavaScript共有八种数据类型

基本数据类型： Undefined、Null、Boolean、Number、String、Symbol、BigInt。

引用数据类型：object,function,array

其中 Symbol 和 BigInt 是ES6 中新增的数据类型：

- Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。
- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

### 2. 数据类型检测的方式有哪些

然后判断数据类型的方法一般可以通过：**typeof**、**instanceof**、**constructor**、**toString**四种常用方法

| 不同类型的优缺点 | typeof                                                     | instanceof                         | constructor                                 | Object.prototype.toString.call   |
| ---------------- | ---------------------------------------------------------- | ---------------------------------- | ------------------------------------------- | -------------------------------- |
| 优点             | 使用简单                                                   | 能检测出`引用类型`                 | 基本能检测所有的类型（除了null和undefined） | 检测出所有的类型                 |
| 缺点             | 只能检测出除null外的基本数据类型和引用数据类型中的function | 不能检测出基本类型，且不能跨iframe | constructor易被修改，也不能跨iframe         | IE6下，undefined和null均为Object |

### 3.null和undefined区别

- 首先 Undefined 和 Null 都是基本数据类型，这两个基本数据类型分别都只有一个值，就是 undefined 和 null。
- undefined 代表的含义是**未定义**，null 代表的含义是**空对象**。一般变量声明了但还没有定义的时候会返回 undefined，null主要用于赋值给一些可能会返回对象的变量，作为初始化。
- undefined 在 JavaScript 中不是一个保留字，这意味着可以使用 undefined 来作为一个变量名，但是这样的做法是非常危险的，它会影响对 undefined 值的判断。我们可以通过一些方法获得安全的 undefined 值，比如说 void 0。
- 当对这两种类型使用 typeof 进行判断时，Null 类型化会返回 “object”，这是一个历史遗留的问题。当使用双等号对两种类型的值进行比较时会返回 true，使用三个等号时会返回 false。



### 4.如何判断 this 的指向

- 第一种是**函数调用模式**，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。
- 第二种是**方法调用模式**，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。
- 第三种是**构造器调用模式**，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。
- 第四种是 **apply 、 call 和 bind 调用模式**，这三个方法都可以显示的指定调用函数的 this 指向。其中 apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。



### 5. for...in和for...of的区别

for…of 是ES6新增的遍历方式，允许遍历一个含有iterator接口的数据结构（数组、对象等）并且返回各项的值，和ES3中的for…in的区别如下

- for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
- for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
- 对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；

**总结：** for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

### 6. 数组的遍历方法有哪些

| **方法**                  | **是否改变原数组** | **特点**                                                     |
| ------------------------- | ------------------ | ------------------------------------------------------------ |
| forEach()                 | 否                 | 数组方法，不改变原数组的长度，没有返回值                     |
| map()                     | 否                 | 数组方法，不改变原数组的长度，有返回值，可链式调用           |
| filter()                  | 否                 | 数组方法，过滤数组，返回包含符合条件的元素的数组，可链式调用 |
| for...of                  | 否                 | for...of遍历具有Iterator迭代器的对象的属性，返回的是数组的元素、对象的属性值，不能遍历普通的obj对象，将异步循环变成同步循环 |
| every() 和 some()         | 否                 | 数组方法，some()只要有一个是true，便返回true；而every()只要有一个是false，便返回false. |
| find() 和 findIndex()     | 否                 | 数组方法，find()返回的是第一个符合条件的值；findIndex()返回的是第一个返回条件的值的索引值 |
| reduce() 和 reduceRight() | 否                 | 数组方法，reduce()对数组正序操作；reduceRight()对数组逆序操作 |

### 7. forEach和map方法有什么区别

这方法都是用来遍历数组的，两者区别如下：

- forEach()方法会针对每一个元素执行提供的函数，如果遍历的元素是引用数据类型，则可以改变指针指向的堆内存里的值，该方法没有返回值；
- map()方法返回一个新数组，新数组中的值为原数组调用函数处理之后的值，如果遍历的元素是引用数据类型，则可以改变指针指向的堆内存里的值

### 8. 说说你对浅拷贝和深拷贝的理解

浅拷贝：

- 浅拷贝，指的是创建新的数据，这个数据有着原始数据属性值的一份精确拷贝
- 如果属性是基本类型，拷贝的就是基本类型的值。如果属性是引用类型，拷贝的就是内存地址
- 即浅拷贝是拷贝一层，深层次的引用类型则共享内存地址

常见的浅拷贝：

- Object.assign
- Object.create
- slice
- concat()
- 展开运算符

**深拷贝**

深拷贝开辟一个新的栈，两个对象属完成相同，但是对应两个不同的地址，修改一个对象的属性，不会改变另一个对象的属性

常见的深拷贝方式有：

- _.cloneDeep()。loadsh
- jQuery.extend()
- JSON.stringify()
- 手写循环递归



### 9.什么是闭包？

- ✅ 官方说法：闭包就是指有权访问另一个函数作用域中的变量的函数。
- ✅ MDN说法：闭包是一种特殊的对象。它由两部分构成：函数，以及创建该函数的环境。环境由闭包创建时在作用域中的任何局部变量组成。

**深度回答**

浏览器在加载页面会把代码放在栈内存（ ECStack ）中执行，函数进栈执行会产生一个私有上下文（ EC ），此上下文能保护里面的使用变量（ AO ）不受外界干扰，并且如果当前执行上下文中的某些内容，被上下文以外的内容占用，当前上下文不会出栈释放，这样可以保存里面的变量和变量值，所以我认为闭包是一种保存和保护内部私有变量的机制。

### 10.闭包的作用

闭包有两个常用的用途；

- 闭包的第一个用途是使我们在函数外部能够访问到函数内部的变量。通过使用闭包，可以通过在外部调用闭包函数，从而在外部访问到函数内部的变量，可以使用这种方法来**创建私有变量**。
- 闭包的另一个用途是使已经运行结束的函数上下文中的**变量对象继续留在内存中**，因为闭包函数保留了这个变量对象的引用，所以这个变量对象不会被回收。



### 11.闭包在项目中的引用场景，以及带来的问题

在实际的项目中，会基于闭包把自己编写的模块内容包裹起来，这样编写就可以保护自己的代码是私有的，防止和全局变量或者是其他的代码冲突，这一点是利用保护机制。

但是不建议过多的使用闭包，因为使用不被释放的上下文，是占用栈内存空间的，过多的使用会导致导致内存泄漏。

解决闭包带来的内存泄漏问题的方法是：使用完闭包函数后手动释放。



### 12.闭包的使用场景

1. `return` 回一个函数  
2. 函数作为参数
3. IIFE（自执行函数）
4. 循环赋值
5. 使用回调函数就是在使用闭包
6. 节流防抖
7. 函数柯里化

### 13.什么是作用域链

当在`js`中使用一个变量的时候，首先`js`引擎会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域，这样的变量作用域访问的链式结构, 被称之为作用域链

**深度回答**

作用域链的本质上是一个指向变量对象的指针列表。变量对象是一个包含了执行环境中所有变量和函数的对象。作用域链的前端始终都是当前执行上下文的变量对象。全局执行上下文的变量对象（也就是全局对象）始终是作用域链的最后一个对象。



### 14.作用域链的作用

作用域链的作用是**保证对执行环境有权访问的所有变量和函数的有序访问，通过作用域链，可以访问到外层环境的变量和函数。**

### 15.说说Js中的预解析？

JS 引擎在运行一份代码的时候，会按照下面的步骤进行工作：

1.把变量的声明提升到当前作用域的最前面，只会提升声明，不会提升赋值

2.把函数的声明提升到当前作用域的最前面，只会提升声明，不会提升调用

3.先提升 function，在提升 var



# Vue2面试题

### 1. vue生命周期,父组件和子组件生命周期钩子执行顺序是什么??

![生命周期.png](https://img-blog.csdnimg.cn/img_convert/a5eeb478acd07ce15ff8352ff766c888.webp?x-oss-process=image/format,png)

```js
vue生命周期就是`vue实例从创建到销毁的整个过程`我们称之为vue的生命周期,通过vue的生命周期我们可以在不同的阶段进行不同的逻辑操作. vue生命周期常用的钩子函数一共有8个，分别对应的钩子函数为beforeCreate 创建前、 created创建后、beforeMount 挂载前、mounted挂载后、beforeUpdate 更新前、updated更新后、beforeDestory 销毁前、 destoryed销毁后, `页面一开始加载的时候就会触发创建前后和挂载前后的钩子函数`, 而更新的钩子函数需要当我们改变data的时候才能触发,销毁的钩子函数必须得当组件进行切换的时候就会进行销毁.在项目开发过程中,我经常使用到的钩子函数有created,我们经常`在created进行数据请求,或者获取本地存储的数据`,还有一些其他的操作. 除了created还有mounted,我们经常`在mounted里面获取dom元素` (有时候也存在获取不到dom元素的情况,这个时候我们一般用$nextTick方法来解决).

每个生命周期钩子具体发生的事情：
⑴beforeCreate(创建前)：在此生命周期函数执行的时候，data 和 methods 中的数据都还没有初始化。

⑵created(创建后)：在此生命周期函数中，data 和 methods 都已经被初始化好了，如果要调用 methods 中的方法，或者操作 data 中的数据，最早只能在 created 中操作。

⑶beforeMount(载入前)：在此生命周期函数执行的时候，模板已经在内存中编译好了，但是尚未挂载到页面中去，此时页面还是旧的。

⑷mounted(载入后)：此时页面和内存中都是最新的数据，这个钩子函数是最早可以操作 dom 节点的方法。

⑸beforeUpdate(更新前)：此时页面中显示的数据还是旧的，但是 data 中的数据是最新的，且页面并未和最新的数据同步。

⑹Updated(更新后)：此时页面显示数据和最新的 data 数据同步。

⑺beforeDestroy(销毁前)：当执行该生命周期函数的时候，实例身上所有的 data，所有的 methods 以及过滤器…等都处于可用状态，并没有真正执行销毁。

⑻destroyed(销毁后)：此时组件以及被完全销毁，实例中的所有的数据、方法、属性、过滤器…等都已经不可用了。
//下面两个钩子函数一般配合使用

⑼activated(组件激活时)：和上面的 beforeDestroy 和 destroyed 用法差不多，但是如果我们需要一个实例，在销毁后再次出现的话，用 beforeDestroy 和 destroyed 的话，就太浪费性能了。实例被激活时使用，用于重复激活一个实例的时候

⑽deactivated(组件未激活时)：实例没有被激活时。

⑾errorCaptured(错误调用)：当捕获一个来自后代组件的错误时被调用

结合实践：

**beforeCreate**：通常用于插件开发中执行一些初始化任务

**created**：组件初始化完毕，可以访问各种数据，获取接口数据等

**mounted**：dom已创建，可用于获取访问数据和dom元素；访问子组件等。

**beforeUpdate**：此时`view`层还未更新，可用于获取更新前各种状态

**updated**：完成`view`层的更新，更新后，所有状态已是最新

**beforeDestroy**：实例被销毁前调用，可用于一些定时器或订阅的取消

**destroyed**：销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器
```

补充:

```js
父组件和子组件生命周期钩子执行顺序:
`加载渲染过程`:
父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted
`更新过程`:
父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated
`销毁过程`:
父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

父组件可以监听到子组件的生命周期,使用$emit或者使用@hook:
```

### 2. vuex的理解?

```js
所谓的vuex其实就是vue官方给我们提供的一个`状态管理工具`,通过vuex我们可以`实现组件之间数据共享的问题`. vuex一共有5大核心,分别是`state`,里面保存的是状态,也可以理解为是数组, 接下来是`getters`,他们用来获取state里面的状态,并且可以对state的数据进行处理之后在返回,有点类似于vue的计算属性, 接下来还有`mutations`,他的作用主要是用来修改state里面的数据,不过在`mutations里面只能进行同步的操作`,还有actions,这个actions也可以去改变state的状态,不过在`actions`里面定义的方法`可以进行异步操作`,最后一个是`modules`,如果当我们的项目比较大的时候,那么保存的状态也会增加,如果都写到index.js文件里面,文件的内容就会变得特别臃肿,后期难以维护,所以我们可是使用modules进行模块化的处理,将多个状态抽离到对应js文件里面,最后在modules进行合并,这样后期就方便维护了.

如果我们要获取state里面的状态,我们可以通过`this.$store.state`来进行获取,如果要调用getters里面的方法,我们可以通过`this.$store.getters`来进行调用,如果要调用muations里面的方法我们需要使用`this,$store.commit`来触发,如果调用actions里面的方法,我们一般通过`this.$store.dispacth`来进行触发. 除了这种方式以外,我们还可以通过辅助函数的方式来进行调用和触发(`mapState, mapMutation,mapAction,mapGetters`)mapState、mapGetters在computed里调用，mapMutation,mapAction在methods里调用

在项目当中如果要改变state的状态,我们一般是在组件里面调用this.$store.dispatch方式来触发actions里面的方法,在actions里面的方法通过commit来调用mutations里面定义的方法来改变state,同时这也是vuex的执行机制

不过vuex也有一些弊端,比如浏览器刷新的时候,vuex的数据会丢失,我们一般结合本地存储来解决,当我们在mutations里面改变state的时候在通过localStorage或者sessionStorage存储到本地,然后在state的状态的属性值那块写一个三元表达式,如果本地存在数据的话则读取本地存储的数据,否则就赋值为null在项目当中我一般使用vuex会保存用户信息和token以及其他的一些状态. 以上就是我对vuex的理解.
```

### 3. vue路由有几种模式?有什么区别?原理是什么?

```js
vue的路由模式一共有两种,分别是哈希和history. 他们的区别是hash 就是指 url 尾巴后的#号以及后面的字符，history没有带#，外观上比hash 模式好看些.hash模式不会包含在http请求当中,并且hash不会重新加载页面,hash模式的主要原理就是`onhashchange()事件`

而使用history模式的话,如果前端的url和后端发起请求的url不一致的话,会报404错误,所以使用history模块的话我们需要和后端进行配合.

history api可以分为两大部分，切换历史状态和修改历史状态：
`修改历史状态`：包括了 HTML5 中新增的 pushState() 和 replaceState() 方法，
`切换历史状态`： 包括forward()、back()、go()三个方法
```

### 4. vue路由守卫?

```js
所谓的路由守卫就是当我们`进行页面跳转的时候会触发的钩子函数`,我们把它称之为vue路由守卫. vue一共给我们提供了三种路由守卫,第一种`全局路由守卫`,第二种是`组件内路由守卫`,第三种`路由独享守卫`,这个是写在路由里面. 全局路由守卫包含：beforeEach 前置守卫，beforeResolve 路由解析守卫，afterEach 后置守卫 ，组件内路由守卫：beforeRouteEnter 路由进入之前，beforeRouteUpdate 路由更新之前，beforeRouteLeave 路由离开之前，路由独享守卫：beforEnter 路由进入之前，这几个钩子函数里面都有一个回调函数,这个回调函数里面会有三个参数,分别是`to,from,next`,分别对应的是要进入的路由、离开之前的路由,以及进入写一个路由在项目中我们经常使用路由守卫实现页面的鉴权. 

比如:当用户登录之后,我们会把后台返回的token以及用户信息保存到vuex和本地,当页面进行跳转的时候,我们会在路由守卫里面获取vuex里面的token,如果token存在的话,我们则使用next让他进入要跳转的页面,如果token不存在的话我们使用next方法让他回到登录页
```

### 5. v-if与v-show的区别?

```js
v-if和v-show都是控制元素的显示与隐藏, 
不过v-if控制元素的显示和隐藏的时候会删除对用的dom元素,当每一个显示的时候,都会重新创建dom和渲染. 
而v-show则是通过css的`display`:none和display:block来控制元素的显示与隐藏.v-if比较耗费性能,

    所以我们涉及到`频繁的显示隐藏操作`我们建议使用`v-show`,如果不是频繁操作的话,我们可以v-if在项目中我会经常使用v-if和v-show,比如我们在搜索功能的时候,他有一个历史记录,这个时候我们根据是否有搜索的结果来判断历史记录的显示与隐藏,这块我就可以使用v-if ,当然用v-show也可以.
```

### 6. v-for与v-if的优先级那个高?如果同时使用v-for和v-if怎么解决?

```js
v-for的优先级高. 因为v-for的时候我们才开始渲染dom元素,这个v-if还无法进行判断.v-for和v-if不能同时使用,我们可以通过标签,比如div或者template标签来进行包裹,把v-if写到包裹的标签上面(写到v-for外面）
```

### 7. methods、computed和watch的区别?

```js
首先呢,methods是`用来定义方法的区域`,methods定义的方法需要调用才能触发. 不具备缓存，

- computed是计算属性；watch是监听，监听data中的数据变化。
- computed`支持缓存`，当其依赖的属性的值发生变化时，计算属性会重新计算，反之，则使用缓存中的属性值；       watch`不支持缓存`，当对应属性发生变化的时候，响应执行。
- computed`不支持异步`，有异步操作时无法监听数据变化；watch`支持异步操作`。
- computed`第一次加载时就监听`；watch默认第一次加载时不监听(immediate 组件创建时刻执行与否,
  immediate: true,第一次加载时监听（默认为false）,deep 深度监听 不推荐使用(非常的消耗性能))
- computed中的函数必须调用return；watch不是。
  使用场景：
- computed：一个属性受到多个属性影响，如：购物车商品结算。
- watch：一个数据影响多条数据，如：搜索数据。
- 数据变化响应，执行异步操作，或高性能消耗的操作，watch为最佳选择
```

### 8. vue组件通信（多说点一共有8个）? 写组件的目的是什么？要解决什么？props选项有啥作用  ?说一下组件化开发的理解?(必问)`*********`?

```js
1.`父传子` 在子组件的标签上定义属性 子组件通过props来进行接受,可以通过数组的方式进行接受,也可以通过对象的方式来进行接收,如果父组件没有传递属性,子组件可以default来设置默认值

2.`子传父` 子组件通过this.$emit("自定义的事件",要传给父组件的数据), 父组件通过子组件的标签监听自定义的事件,通过方法来接收传递的数据

3.`非父子组件通信`   通过中央事件总线,我们也称之为eventBus,
 我们需要创建一个空的js文件,导出这个空的vue实例
 传数据的时候 this.$bus.$emit 传
 接数据的时候是在 钩子函数 created 中 this.$bus.$on 接收 第一个参数是事件名称 第二个参数是一个回调函数   包含了要接受的数据,以上就是非父子组件通信的方式
```

补充：

```js
4.利用 `vuex` 进行组件通信 把公共的数据存在 vuex 里就可以实现组件之间都能使用这个数据了
5.其实` v-model` 也能实现组件通信 因为 v-model 就是 :value 和 @input 事件的合写 如果在一个子组件上使用 v-model 也能实现父子组件之间的通信
6.用`本地存储 `来 完成组件通信
7.通过`ref和refs`实现组件之间的通信
8.`.sync` 修饰符
9.`$parent和$children`
在子组件内可以直接通过$parent对父组件进行操作，在父组件内可以直接通过$children 对子组件进行操作
在父组件调用子组件时候要加下标也就是$children 是一个数组 因为可以有很多个子组件
10.`provide 和 inject`
父组件通过通过 provide 提供变量 子组件中通过 inject 注入变量，不论嵌套了几层子组件 都能通过 inject 来调用 provide 的数据
11.`$attr+$listener`
如果父组件 A 下面有子组件 B 子组件 B 下面又有子组件 C 如果 a 组件的变量和方法想要传给组件 C 的时候 就用到这个方法 适用于多级组件传值
在 B 组件中给 C 组件绑定 v-bind="$attrs" v-on="$listeners" 然后在 C 组件中就可以直接使用 a 传来的属性和方法了（简单来说：$attrs与$listeners 是两个对象，$attrs 里存放的是父组件中绑定的非 Props 属性，$listeners 里存放的是父组件中绑定的非原生事件。）

组件通信目的：传递或共享某些数据，解决组件间数据无法共享的问题
props选项作用：设置和获取标签上的属性值的
vue组件化理解：
1.组件是独立和可复用的代码组织单元。组件系统是Vue核心特性之一，它使开发者使用小型、独立和通常可复用的组件构建大型应用；
2.组件化开发能大幅`提高应用开发效率、测试性、复用性`等；
3.组件使用按分类有：页面组件、业务组件、通用组件；
4.vue的组件是基于配置的，我们通常编写的组件是组件配置而非组件，框架后续会生成其构造函数，它们基于VueComponent，扩展于Vue；
5.vue中常见组件化技术有：属性prop，自定义事件，插槽等，它们主要用于组件通信、扩展等；
6.合理的划分组件，有助于提升应用性能；
7.组件应该是高内聚、低耦合的；
8.遵循单向数据流的原则。
```

### 9. $nextTick方法有什么作用?

```js
$nextTick也叫做异步更新队列方法,而$nextTick方法的主要作用就是等待dom元素加载完毕之后才会执行的回调函数,我们经常会在$nextTick方法里面`获取dom元素`
比如：beforeCreated获取DOM元素、获取最新的滚动列表
```

### 10. 说一下什么是mvvm模式?

```js
MVVM 是Model代表数据模型，数据和业务逻辑都在Model层中定义；View代表UI视图，负责数据的展示；ViewModel负责监听Model中数据的改变并且控制视图的更新，处理用户交互操作；

View 的变化会自动更新到 ViewModel ， ViewModel 的变化也会自动同步到 View 上显示。这种自动同步是因为 ViewModel 中的属性实现了 Observer ，当属性变更时都能触发对应的操作。
```

### 11. vue双向数据绑定原理?

```js
vue.js 则是采用 `数据劫持` 结合 `发布者-订阅者 模式`的方式，通过 Object.defineProperty() 来劫持各个属性的 set， get ，在数据变动时发布消息给订阅者，触发相应的监听回调。这个时候就可以实现数据的双向绑定
```

```js
Object.defineproperty可以接收三个参数

Object.defineproperty(`obj, prop, desc`)
obj :  第一个参数就是要在哪个对象身上添加或者修改属性
prop : 第二个参数就是添加或修改的属性名
desc ： 配置项，一般是一个对象

第三个参数里面还有6个配置控住属性
writable：	是否可重写 
value：  	当前值
get：    	读取时内部调用的函数
set：        写入时内部调用的函数
enumerable： 是否可以遍历
configurable:是否可再次修改配置项

注意：当使用了getter或setter方法，不允许使用writable和value这两个属性(如果使用，会直接报错滴)
　　get 是获取值的时候的方法，类型为 function ，获取值的时候会被调用，不设置时为undefined
　　set 是设置值的时候的方法，类型为 function ，设置值的时候会被调用，undefined
　　get或set不是必须成对出现，任写其一就可以
```

### 12. vue常用的指令有哪些?

```js
v-if

v-show

v-html

v-text

v-on

v-bind

v-model

v-for
```

### 13. vue常用的修饰符有哪些?

```js
.trim 去除首尾多余的空格

.stop 阻止事件冒泡

.once 只渲染一次

.self 事件只作用在元素本身

.number 将值转化为number类型

.capter 组件之间捕获

.prevent 阻止元素的默认行为

.native 事件穿透,让我们可以在自定义组件上定义事件和方法
```

### 14. vue如何封装可复用的组件?以及请举例说明你封装过的组件?

```js
1. 分析项目的所有页面结构和业务功能,抽离出相同的页面结构和业务功能

2. 在src目录下创建一个components这个的文件夹

3. 在这个文件夹内创建可复用的组件. 在需要的用的组件里面引入创建的这个可复用的组件,并进行注册,以标签的形式写在对应的地方

4. 接下来就需要对可复用的组件内容要进行封装,那么在封装的时候我们要注意组件的封闭性和开放性以及粗细粒度

5. 所谓的这个封闭性就是当我们在组件内部定义好之后外部是无法进行修改的,比如当前有一个关闭的符号,或者有一个箭头,我们需要不管任何人使用该组件时候都能够显示这个箭头,无法从外部进行修改

6. 所谓的开放性就是我们需要将动态的内容以及组件通信的方式进行数据传递,保证组件的可扩展性

7. 而所谓的粗细力度就是我们可以把一整个页面当作一个组件去进行封装,也可以一个页面包含了多个组件,至于到底选择哪种呢,这个是没有一个标准的,我们需要根据自己的业务需求去进行判断

8. 总结来说,所谓的如何封装可复用组件其实技术核心就是通过我们vue提供的组件通信在结合slot插槽来进行分装

比如:封装一个搜索框组件:

1. 在components里面创建search.vue

2. 在search.vue里面实现搜索框的布局

3. 在props里面接受 title, bgColor, size , icon,以及当点击搜索按钮或者点击回车键的时候,触发一个方法,通过this.$emit将输入框输入的值传递给父组件

4. 接下来要使用这个搜索组件,我们需要通过import 在父组件内引入子组件,并在componetns属性里面进行注册,

5. 在页面就可以使用,这个时候我们可以通过传递titile控制子组件搜索框显示的内容,通过bgcolor可以控制搜索框的背景颜色,也可以通过size设置搜索框字体的大小,也可以通过icon来设置搜索框的图标, 通过监听$emit里面定义的方法来获取搜索框输入的值
```

### 15. vue如何封装可复用的组件?以及请举例说明你封装过的组件?

```js
1. 分析项目的所有页面结构和业务功能,抽离出相同的页面结构和业务功能

2. 在src目录下创建一个components这个的文件夹

3. 在这个文件夹内创建可复用的组件. 在需要的用的组件里面引入创建的这个可复用的组件,并进行注册,以标签的形式写在对应的地方

4. 接下来就需要对可复用的组件内容要进行封装,那么在封装的时候我们要注意组件的封闭性和开放性以及粗细粒度

5. 所谓的这个封闭性就是当我们在组件内部定义好之后外部是无法进行修改的,比如当前有一个关闭的符号,或者有一个箭头,我们需要不管任何人使用该组件时候都能够显示这个箭头,无法从外部进行修改

6. 所谓的开放性就是我们需要将动态的内容以及组件通信的方式进行数据传递,保证组件的可扩展性

7. 而所谓的粗细力度就是我们可以把一整个页面当作一个组件去进行封装,也可以一个页面包含了多个组件,至于到底选择哪种呢,这个是没有一个标准的,我们需要根据自己的业务需求去进行判断

8. 总结来说,所谓的如何封装可复用组件其实技术核心就是通过我们vue提供的组件通信在结合slot插槽来进行分装

9. 比如:封装一个搜索框组件:

10. 在components里面创建search.vue

11. 在search.vue里面实现搜索框的布局

12. 在props里面接受 title, bgColor, size , icon,以及当点击搜索按钮或者点击回车键的时候,触发一个方法,通过this.$emit将输入框输入的值传递给父组件

13. 接下来要使用这个搜索组件,我们需要通过import 在父组件内引入子组件,并在componetns属性里面进行注册,

14. 在页面就可以使用,这个时候我们可以通过传递titile控制子组件搜索框显示的内容,通过bgcolor可以控制搜索框的背景颜色,也可以通过size设置搜索框字体的大小,也可以通过icon来设置搜索框的图标, 通过监听$emit里面定义的方法来获取搜索框输入的值
```

举例: 以dialog为例封装组件

dialog子组件

```vue
// dialog组件(子组件)
<template>
  <div>
    <el-dialog :title="editId==-1?'添加':'编辑'" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false, //对话框的显示与隐藏
      form: {
        name: "",
        age: "",
      },
      editId:0,

    };
  },
  methods: {
    info(row) {
      console.log(row.name);
      console.log(this.form.name);
      this.editId=row.id
      this.form.name=row.name
      this.form.age=row.age
      this.dialogVisible = true;
    },
    /**确定按钮 */
    onSubmit() {
      this.$emit('addEdit',this.form,this.editId)
      this.dialogVisible=false
    }
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>
```

```vue
<template>
  <div>
    <el-button type="primary" style="margin: 50px" @click="add">添加</el-button>

    <el-table :data="list" border style="width: 45%">
      <el-table-column prop="id" label="ID" width="220"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="220"> </el-table-column>
      <el-table-column prop="age" label="年龄" width="220"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="edit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <about ref="susu" @addEdit="addEdit"></about>
  </div>
</template>

<script>
import about from "../views/Dialog.vue";
export default {
  data() {
    return {
      list: [
        { id: 1, name: "苏苏1.0", age: 18 },
        { id: 2, name: "苏苏2.0", age: 28 },
        { id: 3, name: "苏苏3.0", age: 38 },
        { id: 4, name: "苏苏4.0", age: 48 },
        { id: 5, name: "苏苏5.0", age: 58 },
        { id: 6, name: "苏苏6.0", age: 68 },
      ],
    };
  },
  methods: {
    /**添加按钮 */
    add() {
      this.$refs.susu.info({id:-1,form:{}});
    },
    /**编辑按钮 */
    edit(row) {
      console.log(row);
      this.$refs.susu.info(row);
    },

    
    addEdit(form, editId) {
      console.log(this.list.length);
      if (editId == -1) {
        this.list.push({
          id: this.list.length + 1,
          name: form.name,
          age: form.age,
        });
      }
      else{
        this.list.forEach(i=>{
          if(i.id==editId){
            i.name=form.name
            i.age=form.age
          }
        })
      }
      console.log(form);
    },
  },
  created() {},
  mounted() {},
  components: { about },
  computed: {},
  watch: {},
};
</script>

<style lang='scss' scoped>
</style>

```

**总结**: 以dialog为例,封装可复用组件

           1. 调用dialog组件,入参需要绑定添加函数,通过ref控制子组件弹框的显隐
           2. 关闭dialog弹框的时候,需要子组件触发父组件方法,通知父组件修改和调用其他方法

