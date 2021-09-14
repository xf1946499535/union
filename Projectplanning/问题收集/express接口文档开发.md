在前端开发中，避免少不了接口文档，但是手动去写，似乎又太麻烦，于是乎，出现了各种各样的自动化生成的API文档框架，其中比较出名的有Swagger。今天我们不说Swagger，我们说说NodeJs-Express中的apidoc。先看个Api图示：

![img]()

Api文档配图

那下面我们就具体看看怎么使用这个ApiDoc框架吧！

> 登录ApiDoc官网，熟悉官方文档 [ApiDoc官网](https://link.jianshu.com/?t=http%3A%2F%2Fapidocjs.com%2F)

由官网所知，我们使用WebStorm创建好Express项目后，需要安装一个ApiDoc库，代码如下：

```
npm i apidoc -g   #全局安装
```

> 接着配置api-doc

方式一：根目录配置**apidoc.json**

```
{
  "name": "example",
  "version": "0.1.0",
  "description": "apiDoc basic example",
  "title": "Custom apiDoc browser title",
  "url" : "https://api.github.com/v1"
}
```

方式二：项目**package.json**配置api-doc

```
{
  "name": "helo",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "start": "node ./bin/www"
  },
  "dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "ejs": "~2.5.7",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "morgan": "~1.9.0"
  },
  "devDependencies": {
    "express-session": "^1.15.6",
    "mysql": "^2.15.0"
  },
  "apidoc": {  //配置api-doc
    "title": "接口文档", //Api-Doc的网页Title
    "url": "http://localhost:3000" //Api测试需要这个地址，地址必须正确
  }
}
```

> 编写api代码

然后通过在项目的**public**文件夹下面新建一个**apidoc**目录。接着，我们需要编写**router**里的代码，创建一个**api**目录，里面编写一个**User.js**接口的东西。

文件目录如下：

![img]()

项目结构图

范例：

```
let express = require('express');
let router = express.Router();

/**
 * @api {post} /api/user/submit-login 用户登录
 * @apiDescription 用户登录
 * @apiName submit-login
 * @apiGroup User
 * @apiParam {string} loginName 用户名
 * @apiParam {string} loginPass 密码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *          "name" : "loginName",
 *          "password" : "loginPass"
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/api/user/submit-login
 * @apiVersion 1.0.0
 */
router.post('/submit-login', function (req, res, next) {
    let loginName = req.body.loginName;
    let loginPass = req.body.loginPass;
    res.json({
        success: true,
        result: {
            name: loginName,
            password: loginPass
        }
    });
});

module.exports = router;
```

具体的注解参数可以查看这个地址： [ApiDoc官网注解说明链接](https://link.jianshu.com/?t=http%3A%2F%2Fapidocjs.com%2F%23param-api)

> 项目terminal执行命令行：

```
apidoc -i routes/ -o public/apidoc/
```

> 运行

生成成功后，我们就可以测试运行api文档了，访问路径：**[http://localhost:3000/apidoc/index.html](https://link.jianshu.com/?t=http%3A%2F%2Flocalhost%3A3000%2Fapidoc%2Findex.html)**