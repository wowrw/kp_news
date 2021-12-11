
import MockJs from 'mockjs'; // 引入 Mock
import Url from "url";  //可以对url进行解释
const config = require('../config');

// 自动化导入模拟api
// require.context(directory,useSubdirectories,regExp)
// directory:表示检索的目录
// useSubdirectories：表示是否检索子文件夹
// regExp:匹配文件的正则表达式,一般是文件名


const files = require.context('./modules', false, /\.js$/)
files.keys().forEach(key => {
  let file = files(key).default || files(key)
  file.forEach(item => {
    MockJs.mock(config.baseApi + item.url, item.type, item.response)
  })
})


//=======================================================
//以下是练习mockjs用到的代码  具体调用看App.vue  created()方法中的代码
let GoodsList = MockJs.mock({
  "data|100": [   //意思是data数组中有100条数据
    {   //这个对象是用来写数据模板的
      "id|+1": 0,   //初始值是0每次id都+1
      "goodsName": "@ctitle(3, 5)",   //看官网，这个名字是3-5之间的
      "goodsPrice|+1": 100,   //这个类似上面的id一个，只是初始值是从100开始的
      "address": "@county(true)",   //这个是地址，@county(true)  对象的属性值都是mock.mock()提供的方法，直接拿过来用就可以了
      "tel": /^1(3|5|7|8|9)\d{9}$/,   //正则写的电话后面1开头，正则不懂自己去学！！！！！！！！！！！很重要
      "goodsImg": "@image('200x100', '#894FC4', '#FFF', 'alley')", // 图片
      "date": '@date("yyyy-MM-dd M:dd:d")',  //时间
      "email": "@email()"  //邮箱
    }
  ]
});


//去拦截AJAX，用了正则，因为url中还有参数，整个url串时不确定的
MockJs.mock(/\/goods\/list/, "get", function (options) {
  console.log(options)
  // Url.parse(urlStr, [parseQueryString], [slashesDenoteHost])
  // 参数1：必填 {string} 要解析的url地址
  // 参数2：{boole} 将查询（query）参数解析成对象形式，默认为false
  // 参数3：{boole} 如果为真，在文字字符串//之后和下一个/之前的第一个标记将被解释为主机。例如，给定//foo/bar，结果将是{host: ‘foo’， pathname: ‘/bar’}，而不是{pathname: ‘//foo/bar’}。默认值:false。

  let { limit, page } = Url.parse(options.url, true).query;// 解构赋值，结合使用时的参数就能理解了
  let result = {}
  result.code = 200;
  result.msg = "Success";
  //result.data = GoodsList.data.slice(0,4);//获取0-4条的数据，在app.vue 中可以打印查看
  result.data = GoodsList.data.slice((page - 1) * limit, (limit * page) - 1)  //GoodsList.data是上面自动生成的数据
  return result;
})

// post调用，参考以下
//参数1：是一个rul ，是正则来写的，意思是：/good/list
// Mock.mock("/goods/list","post",function(options){
//     console.log(options);
//     let {limit,page} = JSON.parse(options.body);
//     return data.data.slice((page-1)*limit,(limit*page)-1)
// })
//原文链接：https://blog.csdn.net/weixin_45000381/article/details/98234684