let socketio = {}
//拿到www中的io并使用
function getSocket(server) {
    //解决客户端和服务器的跨域问题
    socketio.io = require("socket.io")(server, {
        cors: {
            origin: "http://127.0.0.1:81",
            methods: ["GET", "POST"]
        }
    });



    // let socketio = require('./socketio');
    let io = socketio.io;
    io.on('connection', function (socket) {
        //此处的socket是连接当前游览器与服务器的连接对象
        socket.emit('news', {
            hello: 'world'
        });
        //当新的用户链接进来时，向所有人广播此人的id
        io.sockets.emit('addUser', {
            id: socket.id,
            content: "新用户加入"
        })





        socket.on('my other event', function (data) {
            console.log(socket.id);
            console.log(data);

            socket.emit('hello', {
                content: "此处是后端的回复"
            })
        });

        //向某个用户发送信息
        socket.on('sendUser', function (data) {
            // data = {
            //     from: '发送者ID',
            //     to: "接受者ID",
            //     content: "xxxxxx"
            // }
            console.log(data);
            socket.to(data.to).emit('sendClient', data)
        })

        //在控制台中这么写以验证sendUser事件
        // con.emit('sendUser',{from:发送者ID,to:接受者ID,content:"小红发送给小绿的信息"})



        //加入连接群聊房间事件
        socket.on('addRoom', function (data) {
            console.log(data);
            //根据前端传送的房间名称进入群聊，并且返回一个房间对象
            let roomObj = socket.join(data.room);
            console.log(roomObj);
        })

        //，监听群聊时间根据房间名称向某个房间的所有人发送一条消息
        socket.on('sendMsgRoom', function (data) {
            console.log(data);
            //根据data.room向某房间发送消息，并触发'qunliao'事件
            socket.to(data.room).emit('qunliao', data)
        })
    });



    //用qq来接受3000:qq的命名空间
    let qq = io.of('/qq')
    qq.on("connection", function () {
        qq.emit('news', {
            content: "qq命名空间发送过来的内容"
        })
    });

    //用wx来接受3000:wx的命名空间
    let wx = io.of('/wx')
    wx.on("connection", function () {
        wx.emit('news', {
            content: "wx命名空间发送过来的内容"
        })
    });

}
socketio.getSocket = getSocket;
module.exports = socketio