# laravel

```

```



# 1.路由

## 定义

将用户的请求按照事先规划的方案提交给制定的控制器或者功能函数来进行处理

## 路由配置文件

位置:routers/web.php



## 有效的路由方法

可以用多种方法来响应http请求

```
Route::get($url,$callback);
Route::post($url,$callback);
Route::put($url,$callback);
Route::patch($url,$callback);
Route::delete($url,$callback);
Route::options($url,$callback);
```

注册路由响应多种http请求--可以match

```
Route::match(['get','post'],'/',function(){})
```

语法上match比get/post/any多一个参数   Route::match(匹配请求类型,地址,回调函数)

匹配请求类型要求是数组格式的声明，建议使用短数组

any方法注册一个路由响应所有http请求

```
Route::any(['foo',function(){})
```

## 路由参数

//必选参数

```
Route::get('/user/{id}',function($id){})
```

//可选参数，但这种参数需要在回调中给定默认值，否则会出问题

```
Route::get('/user2/{id?}',function($id=null){})
```

//通过?形式来传递get参数

```
Route::any('/test5',function(){
	echo '当前用户id是'.$_GET['id']
})
```

## 路由别名

Route::any('/test5',function(){})->name('别名')

调用该路由则可以写成:route('别名')

## 路由群组

语法: Route:group(公共属性数组,回调函数)

比如后台有如下路由

```
/admin/login
/admin/logout
/admin/index
/admin/user/add
/admin/user/del
```

共同点为都有/admin/前缀，为了管理方便，可以把他们放到一个路由分组中。

使用prefix属性指定路由前缀

比如，为所有路由urls前添加前缀admin

```php
Route::group(['prefix'=>'admin'],function(){
	Route::get('users',function(){
		//匹配"/admin/users"的url
	});
	Route::get('users2',function(){
		//匹配"/admin/users2"的url
	});
	Route::get('users3',function(){
		//匹配"/admin/users3"的url
	});
})
```

## 路由中间件

位置:HTTP/Middleware下

定义：在程序接收HTTP请求时，拦截后进行过滤和处理

框架自带的中间件：CSRF令牌

创建自定义中间件：比如用命令创建check中间件：

​			php artisan make:middleware Check

### 前置中间件

让拦截处理在跳转之前执行

```php
    //固定格式，固定方法，固定参数
    public function handle(Request $request, Closure $next)
    {
      //拦截处理代码
      if ($request->get('id')!=1) {
        return redirect(url('login'));
      }
      //固定返回，让其继续执行往下的主题代码
        return $next($request);
    }
```

### 后置中间件

```php
    //固定格式，固定方法，固定参数
    public function handle(Request $request, Closure $next)
    {
    //先执行主题代码
    $response=$next($request);
      //拦截处理代码
      if ($request->get('id')!=1) {
        return redirect(url('login'));
      }
      //固定返回，让其继续执行往下的主题代码
        return $response;
    }
```



### 使用流程:

1.命令创建中间件

2.注册

​		在Http/Kernel.php文件，在路由配置中间件的区域进行注册;

```
路由中间件位置:
 protected $routeMiddleware = [
       'check'=>\App\Http\Middleware\TrustProxies::class,
         ];
```

3.在路由中使用:

```php
Route::get('login',[LoginController::class,'login'])->middleware('Check');
```



### 进阶

**1.在路由中间件，我们可以设置多个中间件进行调用**

​		->middleware('check','auth');



**2.如果没有在配置中注册中间件，可以采用**

​		->middleware(\App\Http\Middleware\Check:class);



**3.全局中间件，直接配置在$middleware属性即可，每次执行必然调用**

​		php artisan make:middleware Every;

​		protected $middleware=[

​		\App\Http\Middleware\Every:class



**4.中间件的核心方法可以有第三个参数，可以在控制器调用时传递**

```
     //固定格式，固定方法，固定参数
    public function handle(Request $request, Closure $next,$params)
    {
      //拦截处理代码
      if ($request->get('id')!=1) {
        return redirect(url('login'));
      }
      //固定返回，让其继续执行往下的主题代码
        return $next($request);
    }
```



**5.中间件组，如果有一些需要固定调用多个中间件，我们可以将它群组**

```php
    protected $middlewareGroups = [
        'api' => [
            // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],
    ];
```



**6.中间件的terminate()方法，可以在中间件响应完之后(return $next)再调用**

```
public function terminate($request,$response){
echo 'http响应完后调用'
}
```



# 2.控制器

## 位置

文件位于 app/Http/Controllers

## 命名

命名方式为:  大驼峰的控制器名+Controller.php

## 控制器代码结构

控制器基础代码结构不需要自己手动编写，可以通过artisan命令行来生成

因此记住此命令

```
#php artisan make:controller 控制器名
```

## 控制器路由

使用路由规则调用控制器下的方法，而不再走回调函数

路由设置格式基本相同，只是将匿名函数换成 ' 控制器类名@方法名'

定义格式如下(laravel8新格式)

```
Route::请求方法(路由表达式,[控制器类名::class],'方法名')
```

```
//调用控制器的路由
Route::get('/ct',[TestController::class,'test1']);
```

## 控制器分目录管理(新版本有些问题)

![image-20210826114634108](C:\Users\xiangfeng\AppData\Roaming\Typora\typora-user-images\image-20210826114634108.png)

在Controllers目录下创建前台分组Home文件，后台分组Admin文件来建立分区目录

用命令#php artisan make:controller Admin(或者Home)/控制器名   命令创建IndexController.php文件

# 3.DB类操作数据库

## 连接数据库

1.创建数据库

2.数据库连接配置 在.env 文件里面

3.在控制器中引入DB门面，DB门面在app.php中已定义别名DB，可以直接use,不需要些完整路径

```
use DB
```

## 增加信息

对数据库某个表新增数据可以有两个函数实现，分别是insert()和insertGetId()

insert()可以同时增加多条，返回值是布尔类型

insertGetId()只能增加一条数据，返回自增的id

注意：DB::table('无前缀的表名')

```php
 public function add(){
        echo '新增';
        //定义操作的表
        $db=DB::table('table1');
        //添加了两条数据
       $res= $db->insert([
          [
            'id'=>'2',
            'age'=>'111',
            'name'=>'xf'
          ],
          [
            'id'=>'3',
            'age'=>'111',
            'name'=>'ww'
          ]
        ]);
        if($res){
         echo '添加成功';
        }
        else{
          echo '添加失败';
        }
      }
```

## 修改数据

修改数据可以使用update(),increment()和decrement()函数来实现

Update表示可以修改整个记录中的全部字段，返回值为修改的函数

Increment和decrement表示可以修改数字字段的数值（递增或者递减)，典型的应用，记录登录次数，积分的增加

```
补充:在laravel中如果想友好输出打印内容，可以用dd方法
语法:dd(答应内容);[dump+die]
```

修改

update的使用

```php
        //将id为1的人名修改为哈哈哈
        $db=DB::table('table1');
        $res=$db->where('id','=','1')->update([
          'name'=>'哈哈哈'
        ]);
        dd($res);
```

Increment的使用

```
   //将id为1的age加2
        $db=DB::table('table1');
        $res=$db->where('id','=','1')->increment('age',2);
        dd($res);
```

## 查询

**查询所有数据,返回的是一个集合对象，每一行都是对象的形式，不是数组**

```php
   $db=DB::table('table1');
        $res=$db->get()
        dd($res);
        
        //遍历取出数据
      foreach($data as $key =>$value){
      echo $value->id;
      }
```

**根据条件查数据**

->where()->where()  这种语法是并且关系语法

->where()->orwhere()  这种语法是或者关系语法

```php
   $db=DB::table('table1');
        $res=$db->where('id','<','4')->where('id','>','0')->get()
        dd($res);
        
        //遍历取出数据
      foreach($data as $key =>$value){
      echo $value->id;
      }
```



**取出指定字段的值**

->value 只返回单行数据

```
 //取出id=4的人的name
 $res=$db->where('id','4')->value('name')
```



**获取某些字段数据(多个字段)**

```
//查询所有人的name和age字段
 $res=$db->where('id','<','4')->select('name','age')->get()
```



**排序操作**

desc降序

asc升序

```
//字段排序，按照id倒序排列
$res=$db->orderBy('id','desc')->get()
```



分页操作

限制输出

```
DB:table('test')->limit(3)->offset(2)->get();
Limit:表示限制输出的条数
Offset:从什么地方开始
```

这里表示从第2号数据开始，输出3行数据



## 删除

Delete() 表示删除记录 返回收到影响的条数

Truncate 表示清空整个数据表

```
//删除id为4的记录
 $res=$db->where('id','4')->delete()
```

## 任意sql语句

1.影响记录的使用statement语法

```
DB:statement('insert into test values(null,1)')
```

2.不影响记录的使用select语法

```
$res=DB::select("select * from test")
```

# 4.视图

## 视图文件名与渲染

1.文件名小写

2.文件名后缀是  .blade.php  （因为laravel里面有一套模板引擎是使用blade,可以直接使用标签语法{{$tytle}}）,也可以使用原生的php语法显示数据

3.只有 .blade.php文件可以使用{{$title}}，元素php文件显示数据要使用<?php echo $title;?>

如果两个名称的文件都有，优先显示 .blade.php 的文件

4.视图文件中变量显示要{{$变量}}

## 控制器展示视图

```
//展示视图的方法
return view("视图文件的名称")

//视图可以进行分目录管理的 ，例如要展示home/test/test3视图，可以写成
return view('home/test/test3)  或者  return view('home.test.test3)

```

## 变量分配与展示

语法

```
view(模板文件名称,数组)  //数组就是需要分配的变量集合
view(模板文件名称)->with(数组)
view(模板文件名称)-with(名称,值)->with(名称,值)  //也是传递集合，不过是一个一个值的传递
```

在view()方式渲染一个视图之后，在.blade.php视图文件中，模板中输出的变量使用{{$变量}}来展示

## compact函数传参

Compact函数，是php内置函数，用于打包数组，可以将变量名作为键，变量值作为值

```php
//例如为view传值
$date=0101
$day='今日'
return view('home/test3/test3',compact('date','day'))
```

## 循环与分支语法标签

//在视图里面遍历数据(重点)

//当视图拿到控制器传过来的数据

```php
在laravel中模板中循环输出数据，需要遵循laravel中的语法:
//php写法
foreach($对象 as $key=>$val){
//循环体
}

//laravel中视图的写法
@foreach($对象 as $key=>$val)
    //循环体
    {{$val}}<br/>
@endforeach
```



分支if语句

```
//php写法
if(){

}elseif(){

}else{}

//laravel中视图if语句
@if()
//执行的语句1
@elseif()
//执行的语句2
@else
//默认执行语句
@endif
```

## 模板继承/包含（未学习）

继承不仅在php类中存在，在视图中同样存在，一般用于做公共部分的页面

@yield('可变页面')

## 外部静态文件引入方式(未学习)

# 5.CSRF攻击

CSRF跨站请求伪造的缩写

larave框架中避免CSRF攻击很简单：laravel自动为每个用户session生成一个CSRF token，该token可用于验证登录用户和发起请求者是否是同一人，如果不是则请求失败。

Laravel提供了一个全局帮助函数csrf token来获取token值，因此只需要在视图提交表单中添加如下html即可在请求中带上token

```
<input type="hidden" name="_token" value="<?php echo csrf_token();?>">
```

## laravel中避免CSRF攻击

.babel.php文件中

csrf_token 只是输出整个token的值

csrf_field 输出整个Input的隐藏域

```
<input type="hidden" name="_token" value="{{csrf_token()}}">
```

# 6.操作模型(AR模式)

laravel自带的ORM提供了一个与数据库打交道的ActiveRecord实现，每张数据表都对应了一个与该表进行交互的Model模型，模型允许你在表中进行查询，以及插入，更新，删除等操作

```
AR模型三个核心(映射)
每个数据表-》与数据表进行交互的Model模型映射(实例化模型)
记录表中的字段->与模型类的属性映射(给属性赋值)
表中的每个记录->与一个完整的请求实例映射(具体的CURD操作)
```

## 定义位置

定义模型位置默认在app/Models目录下,但是可以分目录创建

比如可以在app下创建，home文件夹和admin文件夹，分别保存模型类

## 创建模型

可以使用artisan命令

```
php artisan make:model 模型类名
```

## 模型定义

模型定义注意事项

1.(必做)定义一个$table属性，值是不要前缀的表名,如果不指定则使用类名的复数形式作为表名。修饰词:protected

2.定义$primaryKey属性，值是主键名称，如果需要使用AR模式的find方法，则需要指定主键(Model:find(n))。修饰词为:protected

3.定义$timestamps属性，值是false，如果不设置为false，则默认会操作表中的created_at和update_at字段，我们表中一般没有这两个字段，所有设置为false,表示不要操作这两个字段。修饰词:public

4.定义$fillable属性，表示使用模型插入数据时，允许插入到数据库的字段信息。修饰词:protected

```
class user extends Model
{
    use HasFactory;
    ////指定表明
    protected $table='user';
    //指定主键
    protected $primartKey='id';
    //关闭模型created_at和updated_at字段
    public $timestamps=false;
    //设置模型操作时能够允许入库的字段
    protected $fillable=['id','age','name'];
}
```

注意:在模型中使用create插入数据时，要设置$fillable允许入库的字段。使用$guarded是设置排除入库的字段

## 模型控制器中调用

在控制器中引入模型类

```
//引入user模型类
use App\Models\Admin\user;
```



模型的使用:在控制器中模型使用方式主要有2种

1.直接像使用DB门面一样的操作方式，以调用静态方法为主的形式，该形势下需要实例化，例如Member::get()相当于DB::('表名')->get()；

2.实例化模型然后再去使用模型类(普通)

​		例如:   $model=new user(); $model->get();

## 定义测试路由

路由可以使用路由群组的方式进行定义

## 基本操作

### 添加操作

在laravel里面完成数据的添加可以使用两种方式:

方式1(AR模式):

使用AR模式必须要先实例化模型：(这种方式可以完成数据插入，但是不建议使用，可以使用laravel提供的更高级操作)

注意:在laravel里面添加数据的时候，需要先实例化模型，然后为模型设置属性，最后调用save方法即可

```
$user=new user();  //映射关系1：将表映射到了模型
$user->name=value;	//映射关系2：将字段映射到了属性，属性名和字段名一致
$user->save(); //映射关系3：将记录映射到了实例
```



方式2:(表单形式)

在 .babel.php视图文件中建立表单,表单存在姓名，年龄等字段，要求能提交

在控制器文件中引入Request这个类

```
use Illuminate\Http\Request;
//Request类的使用
1.对象传递
2.request语法
$request->all()
$request->input('name')
$request->get('name')
$request->has('name')
$request->only(['name1','name2'])
$request->except(['name1','name2'])
```

注意：在方法中要用到$request对象时，需要将其作为形参传入

```
//添加操作
public function add(Request $request){
	//User是模型类
	User::create($request->all())//返回值是一个对象
}
```



方式3:直接像使用DB门面一样的操作方式，参照 **模型控制器的调用**

### 查询操作

**find()**

获取指定主键的一条数据,其默认结果集是一个对象

```
//查询指定主键记录
public function sel(){
$data=User::find(4)
}
```

如果需要在laravel中将默认结果集转化为数组，需要在最终添加方法的调用:->toArray()



**获取符合条件的第一条记录**

User::where('id','>','4')->first()



**查询多行并且指定字段**

User::all()

User::all([字段1,字段2])  //与get方法区别，all不支持连接其他辅助查询方法

相当于get方法

User::get()

User::get([字段1,字段2])



**按条件查询多个字段**

User::where('id','>','4')->get(['列1','列2']);//数组选列

User::where('id','>','4')->select('列1','列2')->get();//字符串选列

User::where('id','>','4')->selecy(['列1','列2'])->get();//字符串选列

### 修改数据

注意:在laravel中如果需要更新数据(ORM模型方式)，需要先调用模型的find方法获取对应的记录，返回一个模型对象，然后为该对象设置要更新的数据(对象的属性)，最后调用save()方法即可

例如

ORM模型(AR模式)

```;
$user=User::find($id);
$user->title=$_POST['title'];
$user->content=$_POST['content'];
return $user->save()?'OK':'fail';
```



也可以使用update方法进行更新

```
$ss=$user->where('id','7')->update(['age'=>'10'])
```

### 删除数据

注意:在laravel中如果需要删除数据(ORM模型方式)，需要先调用模型的find方法获取对应的记录，返回一个模型对象，最后调用delete()方法即可

ORM模型方式删除:

```
$user=User::find($id);
return $user->delete()?'ok':'fail'
```

# 7.验证

准备工作:使用有表单的页面(视图)，此处可以使用checking.blad.php

## 基本验证规则

注意:多个验证规则可以通过'|'字符进行隔开

required:不能为空

max:255 最长255个字符

min: 最少1个字符

email: 验证邮箱是否合法

confirmed: 验证两个字段是否相同，如果验证的字段是password，则必须输出一个与之匹配的password_confirmation字段

integer: 验证字段必须是整型

IP： 验证字段必须是IP地址

numeric 验证字段必须是数值

max:value 验证字段必须小于等于最大值，和字符串，数值，文件字段的size规则一起使用

min:value

size:value 验证字段必须有和给定值value相匹配的尺寸，就字符串而言，value 是响应的字符数目，对于数值，value是给定的整型值，对文件而言，value是相应的文件字节数

string:验证字段必须是字符串

unique:表名，字段，需要排除的ID



## 验证方式

### 控制器方式验证

1.基本语法

​	使用控制器中的validate方法来完成，$this->validate($request,[验证规则]);如果验证失败，laravel会自动将用户重定向回上一个位置，并将验证错误信息一次性存放到session中。如果验证通过，控制器将会正常运行

```php
 //显示表单和验证表单功能二合一，自己提交给自己
  public function form()
  {
    $request = new Request();
    //判断请求是否是http请求,否则就显示页面
    if ($request->method() == 'POST') {
      # code...
      //自动验证的代码
      $this->validate($request,[
        'name'=>'required|unique:posts|max:255',
        'age'=>'required',
      ]);
      //继续执行的代码
    } else {
      //展示视图
      return view('/checking');
    }
  }
```



# 8.文件

## 文件表单

注意:想要文件表单能够上传，必须具备以下属性

​		1.具有fom标签，method必须为post，必须具备enctype属性

​		2.至少有一个Input类型为file类型

​		3.得具备一个提交按钮

```html
<form action=" method="post" enctype="multipart/form-data">
 <input type="file" />
                   {{csrf_field()}}
 <input type="submit" value="提交"/>
                                                          </form>
```

## 获取上传文件

文件的上传在HTTP--请求中

Http/Request实例提供的file方法或者动态属性来访问上传文件

```php
$file=$request->file('photo');//photo就是file的name值
$file=$request->photo;
```

hasFile方法判断文件是否在请求中存在

```php
if($request->hasFile('photo')){
//
}
```

验证文件是否上传成功

使用isValid方法判断文件在上传过程中是否出错

```php
if($request->file('photo')->isValid()){
//
}
```

移动保存文件到某一目录

```php
  //移动文件  
//   './file'是相对路径文件保存位置  
//move函数是为新位置文件命名
//getClientOriginalExtension是获取文件后缀
 $request->file('testfile')->store('./file',md5(time().rand(100000,99999)).'.'.$request->file('testfile')->getClientOriginalExtension());
         
```

## 静态资源注意:

如果给php引用url,用 ‘ ./’ ，  如果给浏览器用就用 '/'

# 9.列表分页

使用分页类

路径:vendor\laravel\framework\src\Illuminate\Contracts\Pagination\Paginator.php

步骤: 

​		a.查询符合分页条件的记录数

​		b.计算总页数(总记录数/每页记录数，向上取整)

​		c.拼凑分页的链接

​		d.(核心)使用limit语法来限制分页的记录数

​		e.展示分页的页码和分页数据

## 基于Eloquent分页

基本语法:Model::paginate(每页显示记录数)    同样，paginate和get一样，支持where等辅助查询方法

```
$users=User:paginate(15); //15是每页显示15条记录
```

可以设置约束条件之后调用paginate,比如where子句:

```
$users=User::where('votes','>',100)->paginate(15);
```

在对Eloquen模型进行分页时可以用simplePaginate方法:   //只会生成上一页下一页，没有分页字符串

```
$users=User::where('vote','>',100)->simplePaginate(15);
```



视图上:

```
<div>
	@foreach($user as $user)
		{{$user->name}}
	@endforeach
</div>
	{{$user->links()}}		//通过数据对象的links方法显示分页的页码
```

语法:{{$保存数据的对象名->links()}}  //生成的页码链接



## 常用方法

``` 
分页数据对象->count() //当前页数据条数
分页数据对象->currenPage()  //当前页码
分页数据对象->firstItem() //当前页第一条数据的序号
分页数据对象->hasMorePage() //是否有后续页码
分页数据对象->lastItem()  //当前页最后一条数据的序号
分页数据对象->lastPage()  //最后页序号
分页数据对象->nextPageUrl() //下一页的链接地址
分页数据对象->perPage()  //每页显示数据条数
分页数据对象->total()  //记录总条数
分页数据对象->url(5)  //制作指定页码的链接地址
```



# 10.验证码

回顾之前:生成验证码需要经过:画画布，生成干扰线，生成噪点，生成验证码，生成验证码存入session，输入图片

## 验证码依赖安装

在packagist网站搜索验证码的代码依赖

搜索 captcha

进入mews/captcha(不能用Google那个，因为翻墙访问不了)

安装代码依赖composer require mews/captcha

在window系统中，需要在php.ini 中开启php_gb2.dll，也需要开启php.fileinfo.dll和php_mbstring.dll作为mews/captcha的依赖

配置修改配置文件: config/app.php

​		配置provider信息

```
			'providers'=>[
			//验证码服务注册
			Mews\Captcha\CaptchaServiceProvider::class,
			]
```

配置别名 aliases键，添加一个别名记录

```
'aliases'=>[
'Captcha'=>Mews\Captcha\CaptchaServiceProvider::class,
]
```

## 验证码使用

视图上

```
<p>验证码:<input type='text' name='captcha'/><img src="{{captcha_src()}}"/></p>
<input type="submit" value="提交"/>
```

验证器验证

验证码的有效性验证规则，手册里是没有的，如果使用mews验证码包的话，其验证码验证规则就是captcha

```
     //自动验证的代码
      $this->validate($request,[
        'name'=>'required|unique:posts|max:255',
        'age'=>'required',
        'captcha'=>'required|captcha'
      ]);
```



# 11.ajax

## ajax响应

常见的ajax响应数据类型:json和xml、text/html

# 12.会话控制

常见应用:增删改查

session默认保存到文件中

session文件目录:storage\framework\sessions



## 使用Session门面

由于session门面在app.php中已经定义好别名，所有在控制器引入的时候可以直接 

use Session

```
Session:put('key','val')  //保存一个变量

$value=Session:get（'key');  //获取一个变量

$value=Session:get('key','default'); //session中获取一个变量或者返回一个默认值（当变量不存在时）

$value=Session:get('key',function(){
	return 'default';
});

Session:all(); //获取session中所有变量

Session:has('key');  //检查一个变量在session中是否存在

Session:forget('key');//删除一个变量

Session:flush();  //删除session中所有变量

```

# 13.缓存操作

use Cache

设置缓存

```
Cache::put('key','val',$minutes)
注意：如果改键已经存在，则直接覆盖原来的值,有效期必须设置，单位是分钟
```



```
Cache::add('key','val',$minutes)
add方法只会在缓存项不存在的情况下添加数据到缓存，如果数据被成功添加到缓存返回true，否则返回false
```



永久存储数据
forever方法用于持久化存储数据到缓存，这些值必须通过forget方法手动从缓存中移除：

```
Cache::forever('key','value');
```

获取指定值

```
Cache::get('key');
```

获取指定值如不存在，则使用默认值替换

```
Cache::get('key','default')
```

回调函数方式返回默认值

```
Cache::get('key',function(){
return 'default';
})
```

判断值是否存在

```
Cache::has('key')
```



获取缓存项然后删除缓存

```
$value=Cache::pull('key');//若不存在返回null
一般用于设置一次性的存储数据
```

移除缓存项

```
Cache::forget('key');
```

清除所有缓存

```
Cache::flush();使用flush方法清除所有缓存，并且删除对应的目录
```

# 14.迁移文件

目录database\migrations

此目录下已经存在几个文件，如果不打算使用系统自带的认证模块的话需要删除掉

## 使用流程

1.创建迁移文件

```
//命令行
#php artisan make:migration 迁移文件名
```

2.创建出的迁移文件中存在两个方法，up方法是创建数据库，down是撤销数据表、创建数据库的撤销操作

3.为了让迁移代码实现对数据库的创建于撤销，可以参考项目初始化时提供的迁移文件

```php
   public function up()
    {
      Schema::create('users', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('email')->unique();
        $table->timestamp('email_verified_at')->nullable();
        $table->string('password');
        $table->rememberToken();
        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
      Schema::dropIfExists('users');
    }
```

创建数据表时的列遵循的语法

$table表示整个表的实例

语法:$table->列类型方法(字段名,[长度/值范围])->列修饰方法([修饰的值])  //列修饰方法为可选

列类型方法的作用：指定列的名称并设置列的类型或者其值的范围（仅针对枚举类型）

列修饰方法的作用:主要是补充列的一些特征，例如有些列不能为空，或者有默认值等

常见列类型:

```
//数据库中的VARCHAR列
$table->string('email');
//数据库VARCHAR列带一个长度
$table->string('name',100);
//数据库主键自增ID
$table->increments('id')
//数据库中的TINYINT类型
$table->tinyInteger('numbers')
//数据库中的INTEGER类型
$table->integer('votes');
//等同于数据库ENUM类型
$table->enum('choices',['foo','bar']);
```

常用列修饰列表（不包括索引修改器）

```
//不为空
->notNull()
//唯一
->unique()
//将该列置于另一列之后
->after('cloumn')
//添加注释信息
->comment('my comment')
//指定一个列的默认值
->default($value)
//将该列置为表中的第一个列
->first()
//允许该列的值为null
->nullable()
//创建有一个存储生成列
->storeAs($expression)
//设置integer列为UNSIGNED
->unsigned()
//创建一个虚拟生成列
->virtualAs($expression)
```

## 执行迁移文件

执行分为up执行和down执行

up方法的执行

```
//如果在当前项目中第一次执行迁移文件的话，需要先执行
#php artisan migrate:install
作用:用于创建记录迁移文件的记录数据表
```

需要执行up方法，则需要执行命令(注意:需要删除系统自带的迁移文件，只保留自己的)

#php artisan migrate



Down方法的执行:（回滚操作，删除数据表）

#php artisan migrate:rollback     [回滚最后一次的迁移操作]

```
#注意，删除（回滚）之后会删除上一个批次的迁移记录，并且同批次建立的数据表也会被删除，但是迁移文件依旧存在，方便后期继续迁移（创建数据表）
```

# 15.填充器

填充数据就是往数据表中写测试数据的操作

## 填充器的创建与编写

填充器默认所在目录:database\seeds

创建填充器:

```
#php artisan make:seeder 填充器名称    [约定俗成的写法:大写表名+TableSeeder]
```

【重点】编写填充器的代码，实现往数据表里写入数据

代码写在填充器run方法中

注意：在填充器文件中可以使用DB门面去新增数据，但是需要注意，DB门面在使用的时候不需要用户自己引入，一旦引入则报错，可以直接使用;建议使用DB门面方法写入新的数据

## 执行填充器文件

命令:

```
#php artisan db:seed -class=需要执行的种子文件名(不带.php)
```

