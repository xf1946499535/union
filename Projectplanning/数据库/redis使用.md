# redis使用

打开一个 **cmd** 窗口 使用 cd 命令切换目录到 **redis所在的目录** 运行：

```
redis-server.exe redis.windows.conf
```

这时候另启一个 cmd 窗口，原来的不要关闭，不然就无法访问服务端了。

切换到 redis 目录下运行:

```
redis-cli.exe -h 127.0.0.1 -p 6379
```

设置键值对:

```
set myKey abc
```

取出键值对:

```
get myKey
```

