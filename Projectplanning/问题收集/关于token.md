# token过期机制

![img](https://images2017.cnblogs.com/blog/1276478/201711/1276478-20171122151628024-63059215.jpg)

服务端token保存至数据库，客户端token暂存至cookie并设置时长。

但是建议，安装redis，redis服务器保存token，不仅解决cookie不同源问题实现单点登录，还可以设置过期时间

