# PHP

# 1.PHP基础

## 超全局

https://www.w3school.com.cn/php/php_superglobals.asp

PHP 中的许多预定义变量都是“超全局的”，这意味着它们在一个脚本的全部作用域中都可用。在函数或方法中无需执行 global $variable; 就可以访问它们。

这些超全局变量是：

- $GLOBALS
- $_SERVER
- $_REQUEST
- $_POST
- $_GET
- $_FILES
- $_ENV
- $_COOKIE
- $_SESSION

### $_GET

PHP $_GET 也可用于收集提交 HTML 表单 (method="get") 之后的表单数据。

$_GET 也可以收集 URL 中的发送的数据。

假设我们有一张页面含有带参数的超链接：

```
<html>
<body>

<a href="test_get.php?subject=PHP&web=W3school.com.cn">测试 $GET</a>

</body>
</html>
```

或者是提交带有参数的表单,action是指向的welcome.php

```
<html>
<body>

<form action="welcome.php" method="GET">
Name: <input type="text" name="name"><br>
E-mail: <input type="text" name="email"><br>
<input type="submit">
</form>

</body>
</html>
```

当用户点击链接 "测试 $GET"，参数 "subject" 和 "web" 被发送到 "test_get.php"，然后您就能够通过 $_GET 在 "test_get.php" 中访问这些值了。提交表单同理

```
$subject=$_GET['subject']
echo $subject;  //PHP

```

### $_POST

```
<form action="welcome.php" method="post">
Name: <input type="text" name="name"><br>
E-mail: <input type="text" name="email"><br>
<input type="submit">
</form>
```

此为POST方式提交表单

获取参数方式为$_POST['参数名']

### $_SESSION

session可以跨页面使用数据，使用session前需要开启session功能

```
session_start();//开启session功能
$_SESSION['username']=$userName;   //如此可以存取session
```

但当其他页面要判断session是否为空时(可能不止没有值，甚至没有键)

```
比如判断上个页面传来的username，因为可能session里根本没username，所以要加@
if(@$_SESSION['username']==""){

}
```

### $_REQUEST

可以获取get/post/cookie数据

### $_SERVER

主要包含了http请求行和消息头的消息，同时还有服务器自己的一些信息，比如DOCUMENT_ROOT,SCRIPT_FILENAME....

### $_FILE

与文件上传相关

### $_COOKIE

与cookie相关

### $_SESSION

与session相关

### $GLOBALS

包含了全部不变量的全局组合数组

## 数组

### *索引数组* 

带有数字索引的数组，就是我们平常使用的用数字作为下标的数组

索引数组的创建

```
<?php
$cars=array("porsche","BMW","Volvo");
echo count($cars);
?>
```

索引数组的遍历

```
<?php
$cars=array("porsche","BMW","Volvo");
$arrlength=count($cars);

for($x=0;$x<$arrlength;$x++) {
  echo $cars[$x];
  echo "<br>";
}
?>
```

### *关联数组*

带有指定键的数组

创建关联数组

```
$age=array("Bill"=>"35","Steve"=>"37","Elon"=>"43");
```

或者

```
$age['Bill']="63";
$age['Steve']="56";
$age['Elon']="47";
```

### *多维数组*

包含一个或多个数组的数组

### 数组遍历

1.普通的for循环

2.foreach

```
<?php
$age=array("Bill"=>"63","Steve"=>"56","Elon"=>"47");

foreach($age as $x=>$x_value) {
  echo "Key=" . $x . ", Value=" . $x_value;
  echo "<br>";
}
?>
```

## 作用域

局部和全局作用域

在所有函数外部定义的变量，拥有全局作用域。除了函数外，全局变量可以被脚本中的任何部分访问，要在一个函数中访问一个全局变量，需要使用 global 关键字。

在 PHP 函数内部声明的变量是局部变量，仅能在函数内部访问：

# 2.PHP操作数据库

https://www.w3school.com.cn/php/php_mysql_intro.asp

## 开启mysql函数库功能

先到php.ini查找mysql保证下面这一行前无分号

![image-20210824105232834](C:\Users\xiangfeng\AppData\Roaming\Typora\typora-user-images\image-20210824105232834.png)

## php操作mysql流程

1.链接数据库

| servername | 可选。规定要连接的服务器。默认是 "localhost:3306"。          |
| ---------- | ------------------------------------------------------------ |
| username   | 可选。规定登录所使用的用户名。默认值是拥有服务器进程的用户的名称。 |
| password   | 可选。规定登录所用的密码。默认是 ""。                        |

```
$link=mysql_connect(servername,username,password);//用一个变量link来接受连接结果;如果有报错，mysql前加@符号
if($link){
echo "连接成公"
}
else{
echo "连接失败"
}
```

2.选择数据库并设置编码

```
$sel=mysqli_select_db($link,"text");
if(!$sel){
  echo "选择数据库失败";
}
mysqli_query($link,"set names utf8");
```

3.准备sql语句

```
$sql="select * from test";
$sql1="insert a into test values(123,123)";
```

4.发送sql语句到mysql服务器

5.接受返回的结果集资源

```
//mysqli_query对于查询类语句返回结果，对于操作类语句返回执行成功与否
$res=mysqli_query($link,$sql);
```

6.解析结果集资源

```

//解析结果集
//mysqli_fetch_assoc将结果取出一行，但下次执行会拿到下一行
while($row=mysqli_fetch_assoc($res)){
  var_dump($row);
}
```

7.关闭连接资源

```
mysqli_close($link);
```



# 3.变量,常量,运算符

## 魔术常量--预定义常量

https://www.runoob.com/php/php-magic-constant.html

## 数据转换

自动转换:在特定用法下会自动转换

用 . 

```
$num1=1;//整型
$num2=2;//整型
echo $num1 . $num2 ;//输出"12"，string类型
```

强制转换：

可以使用一些特殊的方式来强制改变类型，转换方式如同java

## 错误抑制运算符

@,放置在一些php表达式之前

目的是为了抑制一些不重要的错误

## 字符串连接符

. 符号: 进行拼接字符串

 .=符号  :拼接字符串后并赋值(赋值拼接后的结果)

# 4.流程控制

## 文件加载

加载方式:

include

require

include_once

require_once

# 5.函数

## 可变函数

当普通变量名加括号，PHP会尝试将其解析为函数

用变量的值作为函数的名，但是可能存在函数名undefined的情况

```
$a='sum';
function sum($num1,$num2){
	return $num1+$num2;
}
$num=$a(1,2);
echo $num;//输出3
```

## 匿名函数

匿名函数就是没有名称的函数，这时候需要一个变量来存储函数

实际上就相当于字面量定义函数

$sum = function(){

}

## 析构函数

析构函数会在某个对象的所有引用都被删除或当对对象被显示销毁时执行

析构函数最重要的作用，就是释放对象创建的资源，比如数据库连接，文件句柄等

析构函数的定义方式

```
class 类名{
public function _destruct(){
	//函数体

}
}
```

析构函数的执行时机:

​		销毁对象前;

## 递归调用

在一个函数内部再次有条件调用自己，这时候就成为递归调用

# 6.对象

## 对象的定义与创建

```php
class Cat{

public $name;

public $age;

//默认构造函数
public functuion _construct($in_name,$in_age){
	$this->name=$in_name;
	$this->age=$in_age;
}
//对象方法
public function run(){

}

}

$cat =new Cat
$cat->name='小白'
```

若是使用默认构造方法创建对象

```
$cat =new Cat()
```

## 对象销毁

对象显式销毁三种方式:

1.unset(对象名)

2.$对象名=null;

3.$对象名='abc'

## 类的自动加载

类的引入原本是用 require一个一个引用，很麻烦

为了解决在一个文件中引用很多个类，使用类的自动加载；

当程序员直接使用到一个未定义的类时，就会自动触发_autoLoad()函数，尝试到函数里面指定的路径按照类名寻找对应的类，该函数名由系统提供。



简单地按类名自动寻找类

```php
function __autoload($class_name){
	require '类的路径'.$class_name.'class.php' 
        				//因为类的命名规范，.php前都加class
}
```



按类名寻找不同路径下的类，要用关联数组做一个引用；

如此，_ _autoload就会根据关联数组去寻找类名对应的类文件

```
$class_map=array{
'Dog'=>'./Dog.class.php',
'Cat'=>'./Cat.class.php',
'Tiger'=>'./ct/Tiger.class.php',
'Pig'=>'./ct/Pig.class.php',

}

function __autoload($class_name){
global $class_map
	require $class_map[$class_name]
}
```

## 静态属性

在类中设置静态变量属性，这个静态变量会被所有对象共享

在类外部访问静态变量  ,  类名::$静态变量名   (前提是public)

在类内部访问静态变量,  self::$静态变量名

```php
class Cat{
	public static $total;
	
	public function count(){
	self::$total++;//在类中访问静态变量，要加self::
}
}
```

## 静态方法

静态方法专门用于操作静态属性，调用方式类似于静态变量，不过还可以用

对象名->静态变量名(不好)

静态方法不能访问非静态属性(特别注意)，非静态方法都可以访问

```
class Cat{
	public static $total;
	
	public static function count(){
	self::$total++;//在类中访问静态变量，要加self::
}
}
```

## 单例模式

让一个类只能存在一个实例对象

```php
class Cat{
	public $name;
	public $age;

	private static $instance=null;//是一个静态属性，表示是Cat的唯一实例
	//构造方法
	private function __construct($name,$age){
	$this->name=$name ........
	}
	
	//写一个静态方法，用于创建对象实例
	public static function getSingleton($name,$age){
		//通过这个方法来创建对象，通过对instance判断来让这个类只new一次
		if(self::$instance==null){
			self:$instance=new Cat($name,$age)
		}
		//返回创建的对象
		return self::$instance;
	}
    
    //阻止克隆
    private function __clone(){}

}

```

## 对象序列化

### 序列化

```
serialize($对象名)
```

​		对象序列化是指:将一个对象转换成一个字符串，这个字符串包括属性名，属性值，属性类型和该对象对应的类名。就是把一个对象的数据和数据类型转换成字符串。	

​		保存对象至文件前，需要先将对象序列化

### 反序列化

```
unserialize(序列化的字符串)
```

​		反序列化就是将一个序列化的字符串重新恢复成对应的对象

### 序列化好处

作用：利于对象的保存和传输；可以让多个文件共享对象，将序列化后的对象保存到文件中，还可以在不同时间段操作该对象

## 类与对象相关函数

class_exists('类名')    判断类是否存在

method_exists($类名,"方法名")  判断方法是否存在

property_exists($类名,"属性名")  判断属性是否存在

get_class($对象)  返回对象的类名

# 6.类

## 封装

### 访问控制修饰符

public:类内部，外部，子类都可以访问

protected:表示受保护的，只有本类和子类可以访问

private:表示私有的，只有本类内部可以访问

### 外部访问private和protected三种方式

1.使用魔术方法_ _ get和_ _ set

​		优点:简单，一对_ _ get和_ _ set就搞定所有的private,protected属性

​		缺点:不够灵活，没办法对各个属性进行控制和验证

2.为每个private和protected成员变量提供一对getXxxx()和setXxx()方法

​		优点:可以对每个属性进行验证，因此很灵活

​		缺点:会造成有比较多的set和get方法，但是没有什么大问题

3.推荐使用，写一个成员方法，可以根据业务逻辑，一次性对多个属性进行批量操作

## 继承

```
class A extends B{

}
```

## 重载

传统意义上的重载指的是一个标识符被用作多个方法名，且通过方法的参数个数和参数类型将同名的方法区分开而不会发生调用混淆。

```
class Person{
	public function getval($val){
	
	}
	public function getval($val1,$val2){
	
	}
}
```

## 重写

子类和父类的方法名，参数个数一样，就可以实现重写

## 抽象类

抽象类存在的价值，是让其他类来继承他，并实现他写的抽象方法，重在设计

定义为抽象类则不能被实例化，被定义为抽象的方法智能生命调用方式（参数），不能提供具体功能



注意:

如果一个类继承了抽象类，那么他必须实现抽象类中定义的抽象方法。除非他自己也是个抽象类

抽象类可以没有抽象方法

抽象方法不能有函数体

```
abstract class xxx{
	//强制子类定义的方法
	abstract protected function xxx1();
	abstract protected function xxx2();
	//普通方法
	public function xxx3()
}
```

## 接口

interface:可以指定某个类必须实现哪些方法，但不需要定义这些方法的具体内容

接口是通过interface关键字来定义的，接口中方法的定义必须是公有的

接口命名规范，驼峰法，首字母小写i

接口不能继承其他类，但是可以继承别的接口

接口定义

```
interface 接口{

}
```

接口使用

```
class A implements 接口{

}

//实现多个接口
class A implements 接口1,接口2{
}
```

## final关键字

当某个成员方法不希望被子类重写时，可以使用final关键字

当某个类不希望被继承时，我们可以将该类修饰为final类

## 类常量

在类中始终不变的值定义为常量，定义时不需要使用$符号，类常量的值必须是一个定值

常量名定义规范是 XXX_YYY，全部大写，可以使用下划线间隔(定义时不能用public等修饰符)

访问类常量方式是  

​		外部是：类名::常量名   接口名::常量名

​		在内部： 类名::常量名 或者  self::常量名 

```
class 类名{
	const 常量名=初始值;
}
```

## traits

在单继承的情况下实现高效代码复用

按照下面这种写法， 可以在A类和B类中都快速包含my_code中的两个方法

```
trait my_code{
	function getSum(){
	a++
	}
	function getSub(){
	a--
	}
}

class A{
	use my_code;
}
class B{
 	use my_code;
}
```



# 7.魔术方法

所有魔术方法名都是系统提供的，所有魔术方法前面都是以__开头的

魔术方法是在满足某个条件时，系统就自动调用了

##  _ _get和 _ _set

当程序员去使用不可访问的属性时，系统就会调用__get方法

不可访问的属性指的是(1.改属性不存在;2.直接访问了protect的属性或者private的属性)

当程序员给不可访问的属性赋值时，系统会调用__set方法



//魔术方法的名字是固定的 ，由系统提供

//魔术方法的形参是成员属性名

property_exists()可以判断对象的属性是否存在，可以在_ _get和 _ _post里用

```php
class cat{
	private $name="111";//此时为私有变量，只能通过魔术方法来访问
	public function __get($pro_name){
	//判断属性是否存在
		if(property_exists($this,$pro_name)){
			echo $pro_name . '哈哈哈'
		}
		else{
			return '没有该属性，无法访问'
		}
	}
    
    public function __set($pro_name,$pro_val){
        
    }
}
$cat=new cat
echo $cat->name;//输出 111哈哈哈
```

##  _ _toString

当我们将一个对象直接输出时，就会输出toString，如果此时没定义重写_ _toString，那么就会报错

## _ _clone

要区分对象的克隆与赋值，克隆生成的对象互相不会干扰

新创建的对象(克隆生成的对象)中的_ _clone方法会被调用，可用于对象复制后修改属性值，

如果需要阻止克隆，可以将_ _clone方法申明为private

```
$对象1=clone $对象2   会触发__clone方法
```

## _ _call

调用时机:当我们调用一个不可访问(不存在，private,protected)的成员方法时，_ _call会被调用



//method_exists，判断是否有$method_name这个函数

```php
public function __call($method_name,$parameters){
    if(method_exists($this,$method_name)){
        	//两个参数分别是函数名，和 参数数组
	echo $this->$method_name($parameters[0])
    }
    else{
        echo '没有这个函数'
    }
}
```

# 8.反射

## 反射类

reflectionClass类报告了一个类的所有有关信息

```
//要获取一个类的相关信息，初步接触反射机制
class A{
	public function __toString(){
		//创建一个反射对象
		$reflection_obj=new ReflectionClass($this)
		//通过反射对象的方法返回目标对象的相关信息
		//获取类名
		echo $reflection_obj->getName();
		//所有成员方法
		echo var_dump($reflection_obj->getMethods());
		//所有属性
		echo var_dump($$reflection_obj->getProperties());
	}
}
```

## 反射机制作用位置

1.框架底层，例如TP框架底层的控制器调度

2.扩展功能

3.管理大量的未知类

## 反向代理调用

1.使用反射机制，查看类的结构

ReflectionClass::export($class_name)

2.使用反射实现代理调用（这个也是反射最核心的价值）

```
eg:使用反射机制实现代理调用
class Cat(){
	public $name;
	public function cry(){}
}

//创建一个ReflectionClass对象['CAT']
$reflect_obj=new ReflectionClass('Cat')
//创建一个Cat对象实例(不能使用new Cat)，使用newInstance调用目标类的构造器
$cat=reflect_obj->newInstance(目标类构造器的参数)
//得到反射方法cry
$reflect_method_cry=$reflect_obj->getMethod('cry')
//通过反射方法调用cry
$reflect_method_cry->invoke($cat,方法参数)
```

# 9.http协议

## http请求

包括 请求行 请求头 实体内容

# 10.文件

## 文件获取

![image-20210825163635990](C:\Users\xiangfeng\AppData\Roaming\Typora\typora-user-images\image-20210825163635990.png)

```php
//定位文件的路径
$file_full_path='d:/abc.txt';
//判断文件是否存在
if(file_exists($file_full_path)){
	//打开该文件，拿到文件指针,r为只读
	$fp=fopen($file_full_path,'r');
	//获取文件信息
	date_default_timezone_set('PRC');//解决date()报错
	$fileinfo_arr=fstat($fp);//此时包含的是文件杂七杂八的信息，数组形式
	$fileinfo_arr['size'];//文件大小
    $file_size=filesize($file_full_path);//也是获取文件的大小,函数形式
	echo date('Y-m-d H:i:s',$fileinfo_arr['ctime']);//文件创建时间
	echo date('Y-m-d H:i:s',$fileinfo_arr['atime']);//文件访问时间
	echo date('Y-m-d H:i:s',$fileinfo_arr['mtime']);//文件修改时间
}
```

文件内容读取

```
$con_str=fread($fp,$file_size)
echo $con_str
```

关闭文件

```
fclose($fp)
```

## 文件创建并写入

```
//定位文件的路径
$file_full_path='d:/abc.txt';
//判断文件是否存在
if(file_exists($file_full_path)){
	//打开该文件，拿到文件指针,w为读写或创建
	//创建或打开成功
	if($fp=fopen($file_full_path,'w')){
	$con="hello"
	//写入
	fwrite($fp,$con);
	//关闭
	fclose($fp)
	}
	else{
		echo "文件已经存在了"
	}
}
```

