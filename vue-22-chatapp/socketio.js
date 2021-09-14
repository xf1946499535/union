//后端socketio
let socketio = {}
//因为需要用到数据库。所以要引入sql
let sqlQuery = require('./module/lcMysql')
//拿到www中的io并使用，因为这个函数是在www中被调用的，所以拿的socketio.io中
//的io是www中的
function getSocket(server) {
    //解决客户端和服务器的跨域问题
    socketio.io = require("socket.io")(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    let io = socketio.io;
    io.on('connection', function (socket) {
        console.log(socket.id + "连接服务器");
        // //接受登陆事件
        socket.on('login', async function (user) {
            //判断是否该账号有人登陆，如果已经有人登陆，那么把之前登陆的人断开连接
            let sqlstr1 = 'select * from user where isonline=? and username=?'
            let result1 = await sqlQuery(sqlstr1, ['true', user.username])
            //如果长度大于0，表示能够查询到该登陆用户
            if (result1.length > 0) {
                //根据前登陆用户的socketid找到对应房间，触发登录挤出的事件，并告知其被挤出
                socket.to(result1[0].socketid).emit('logOut', {
                    content: "有人异地登录，将你挤出"
                })
            }
            //修改数据库登录信息(socketid,isonline)
            //设置数据库更新语句
            let sqlStr = "update user set socketid=?,isonline=? where username=?"
            let result = await sqlQuery(sqlStr, [socket.id, 'true', user.username])
            //告诉前端登陆成功
            socket.emit('login', {
                state: 'ok',
                content: '登录成功 '
            })

            //广播，当有新用户登录时，让其他已登录的用户更新对新登录用户的信息
            let sqlStr2 = "select * from user"
            //等待获取mysql查询结果 是异步操作，使用await，并在function前用async
            let result2 = await sqlQuery(sqlStr2)
            io.sockets.emit('users', Array.from(result2))

            //新登录的用户接收之前没有收到的消息，从数据库拿到并发送给前端
            let sqlStr3 = 'select * from chat where isread=? and `to`=?'
            let result3 = await sqlQuery(sqlStr3, ['false', user.username])
            socket.emit('unreadMsg', Array.from(result3))
            console.log("后端接受登录请求成功");
        })

        //监听用户断开连接事件
        socket.on('disconnect', async function (data) {
            //修改数据库登录信息(socketid,isonline)
            //设置数据库更新语句，把数据库中的sockid和isonline清除
            let sqlStr = "update user set socketid=?,isonline=? where socketid=?"
            let result = await sqlQuery(sqlStr, [null, false, socket.id])

        })

        //根据用户名或QQ账号查询单个用户信息
        socket.on('MsgByUsername', async function (logmsg) {
            let sqlStr = "select * from user where username=?||accountnum=?"
            let result = await sqlQuery(sqlStr, [logmsg, logmsg])
            // console.log(result);
            socket.emit('getMsgByName', result[0])
        })

        //根据自己和对方名字查询双方聊天记录
        socket.on('contentByNames', async function (myname, toname) {
            let sqlStr1 = "select * from chat where (`from`=? and `to`=?) or (`from`=? and `to`=?)"
            console.log(myname + "和" + toname);
            let result = await sqlQuery(sqlStr1, [myname, toname, toname, myname])
            //将查询到的信息返回给前端,数组形式
            socket.emit('getContent', result)
        })

        //监听获取用户信息事件，专门为前端返回用户信息
        socket.on('users', async function () {
            //此处需要进行mysql连接操作，已安装mysql模块
            //在此处写sql语句查询用户列表可完成操作并将得到的结果保存在res中
            let sqlStr = "select * from user"
            //等待获取mysql查询结果 是异步操作，使用await，并在function前用async
            let result = await sqlQuery(sqlStr)
            socket.emit('users', Array.from(result))
        })

        //监听前端聊天框发送的消息并保存到数据库和转发
        socket.on('sendMsg', async function (msg) {
            // console.log(msg);
            //判断消息接收方是否在线
            let strSql = 'select * from user where username=? and isonline=?'
            let result = await sqlQuery(strSql, [msg.to, 'true'])
            if (result.length > 0) {
                //即此人在线，则根据sockid发送消息
                let toid = result[0].socketid
                socket.to(toid).emit("getEventonline", msg)

                //将聊天内容保存到数据库
                //设置isread字段的原因：如果对方没有再在线，则isread为false，
                //表示信息暂时不发送过去，留着下次再发
                //如果isread为true，说明对方在线，当场就已经接收到消息或者已经接受到消息了
                //并且，因为from ,to这一类的是关键字，所以插入时要用反引号
                let strSql1 = 'insert into chat (`from`,`to`,`content`,`time`,isread) values (?,?,?,?,?)'
                sqlQuery(strSql1, [msg.from, msg.to, msg.content, msg.time, 'true'])
            } else {
                //如果不在线，则直接把信息存到数据库，下次再发
                let strSql1 = 'insert into chat (`from`,`to`,`content`,`time`,isread) values (?,?,?,?,?)'
                sqlQuery(strSql1, [msg.from, msg.to, msg.content, msg.time, 'false'])

            }
        })

    });


}
socketio.getSocket = getSocket;
module.exports = socketio