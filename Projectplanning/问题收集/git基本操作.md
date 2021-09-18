本地安装git，有github账号是前提。

（1）先在github创建一个空的仓库，并复制链接地址。使用https，以.git结尾的那个地址。

（2）初始化本地仓库，并提交内容到本地

　　要先打开命令行终端，然后通过cd命令切换到需要添加到github的项目的目录下，然后依次执行如下命令，具体命令及其含义如下：

　　touch README.md　　--创建说明文档

　　git init　　--初始化本地仓库

　　git add .　　--添加当前命令下全部已经修改的文件，准备commit 提交，该命令效果等同于git add -A

　　git commit -m '提交说明'　　--将修改后的文件提交到本地仓库，如：git commit -m '增加README.md说明文档'

　　git remote add origin 远程仓库地址　　--远程仓库地址，就是你自己新建的那个仓库的地址

　　git push -u origin master　　--创建一个上传流，并将本地代码通过这个流推送到别名为origin的仓库中的master分支上

等待一段时间，需要输入密码，即你的github登录密码。第一次上传需要一段时间。

至此，本地项目已经上传到了github上。以后对于代码的修改提交，只需要进行下面几个操作：

　　git pull　　--如果是多人协作开发，一定要先pull，将 github 最新的代码拉取到本地，避免冲突

　　（修改代码）

　　git status  -- 查看修改状态，会显示修改了哪些文件，哪些文件add，但是未提交

　　git add .　　--添加全部修改的代码到暂存区，准备提交。或者git add 文件名称

　　git commit -m ’提交说明’　　--将修改后的代码先提交到本版本库

　　git push　　--将代码推送到 github , 默认推送到 别名为 origin 的远程仓库中的 master 分支上。