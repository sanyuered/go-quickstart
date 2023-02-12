# Go语言快速入门

## 前言

迁移学习指利用已有的知识和经验，获得新的知识和技能。

我们可以利用自己熟悉的编程语言，快速地学习Go语言开发。

本文按照一个Web应用系统开发需要的知识点，描述了Go语言实现网站开发。

## 目录

1. 变量类型和类型转换

2. 流程控制

3. 结构体和函数

4. 接口和package

5. 异常处理

6. 字符串

7. 日期

8. 数组

9. 哈希表

10. 文件访问

11. 网络访问

12. 数据库访问

13. 协程（Goroutine）


## 1. 变量类型和类型转换

### 1.1 基本类型

```go
// 整型
var x int32 = -1
var x uint32 = 1
// 浮点类型
var x float64 = 1.0
// 布尔类型
var x bool = true
// 字符串类型
var x string = "abc"
// UTF-8字符类型
var x string = "你好"
// 变量x的长度为6
len(x) 
z := []rune(x)
// 变量z的长度为2
len(z)
```

### 1.2 复合类型
```go
// 结构体类型
type Rect struct {
    w uint32
    h uint32
}
x := Rect{
    w:50,
    h:50,
}
// 接口类型
type BookSearch interface {
    do()
}
// 数组类型
x := [5]int{1,2,3,4,5}
// 切片类型
x := []int{1,2,3,4,5}
// 哈希表类型
x := make(map[string]string)
// 指针类型
var x_ptr *int32
x_ptr = &x
```

### 1.3 数字转为字符串
方式1
```go
y := fmt.Sprintf("%d", 123)
```
方式2
```go
y := strconv.Itoa(123)
```

### 1.4 字符串转为数字

方式1
```go
y, error := strconv.Atoi("123")
if error == nil {
	fmt.Println(y)
}
```

方式2
```go
y, error := strconv.ParseFloat("123.1", 64)
if error == nil {
	fmt.Println(y)
}
```

### 1.5 定义常量
```go
const X int32 = 1
```

### 1.6 查看变量类型
方式1
```go
fmt.Printf("%T", "abc")
```

方式2
```go
fmt.Println(reflect.TypeOf("abc"))
```
## 2. 流程控制

### 2.1 条件语句
```go
if true{
}
else if true{
} 
else{
}
```

### 2.2 多分支选择语句

每个case分支，不需要break。

```go
x := 3
switch(x){
    case 1: 
    case 2:
    default:
}
```

### 2.3 循环语句
```go
x := [3]int{1, 2, 3}
for i := 0; i < len(x); i++ {
    fmt.Printf("%d,%d\n", i, x[i])
}
```

### 2.4 迭代语句
```go
x := [3]int{1, 2, 3}
for index, item := range x {
    fmt.Printf("index:%d,item:%d\n", index, item)
}
```

## 3. 结构体和函数

### 3.1 函数

```go
func myFunc(a int, b int) int{
    return a+b
}
```

### 3.2 结构体

```go
type Rect struct {
    w uint32
    h uint32
} 
rect := Rect {w: 50, h:50} 
// 使用“结构体.字段属性”形式访问
rect.w = 100
```

### 3.3 类的实例方法
```go
type Book struct {
	title string
}
func (book Book) setTitleInvalid(title string) {
	// 对book的字段title修改无效
	book.title = title
}
func (book *Book) setTitle(title string) {
	// 让book使用指针，对book的字段title修改才有效
	book.title = title
}
func (book Book) getTitle() string {
	return book.title
}
func main() {
	book := Book{title: "go语言"}
	book.setTitle("标题1")
	book.setTitleInvalid("标题2")
	title := book.getTitle()
	// 输出文字“标题1”
	fmt.Println(title)
}
```

### 3.4 类的静态方法
```go
// 无静态方法，使用普通函数代替。
func area(w uint32, h uint32) uint32{
    return w * h
}
fmt.Println(area(50,50))
```

### 3.5 获取当前对象

Go语言没有其他语言中的this对象。

## 4. 接口和package

### 4.1 定义接口
```go
type BookSearch interface {
     do()
}
```

### 4.2 使用接口实现类的多态性
```go
type Book struct {
	title string
}
type Student struct {
	title string
}
// 结构体Book实现接口BookSearch 的方法
func (book Book) do() {
	fmt.Println("课本")
}
// 结构体Student实现接口BookSearch 的方法
func (student Student) do() {
	fmt.Println("学生")
}
// 声明接口的变量search
var search BookSearch
// 创建Book对象并赋值给search
search = Book{title: "课本"}
// 输出文字“课本”
search.do()
// 创建Student对象并赋值给search
search = Student{title: "学生"}
// 输出文字“学生”
search.do()
```

### 4.3 定义package

文件名：calc.go

```go
package calc
// 方法Add的首字母大写
func Add(a int32, b int32) int32{
    return a + b
}
```

### 4.4 引用package

第1步：将被引用package的文件calc.go放置在项目的一个子目录/calc中。

项目的目录结构：
/calc/calc.go
/main.go

第2步：在项目的根目录中运行命令，创建go.mod文件。
```go
go mod init example.com/demo/v1
```

文件名：/go.mod
```go
module example.com/demo/v1 
go 1.16  
```

项目的目录结构变为：
/calc/calc.go
/main.go
/go.mod

第3步：定义被引用package的名称“calc”

文件名：/calc/calc.go
```go
package calc
// 方法Add的首字母大写
func Add(a int32, b int32) int32{
    return a + b
}
```
第4步：导入package，形式为"module名称/package的名称”

go.mod文件中的module名称：http://example.com/demo/v1

package的名称：calc

从外部导入的名称：http://example.com/demo/v1/calc

文件名：/main.go
```go
package main
import (
	"fmt"
	"example.com/demo/v1/calc"
)
func main() {
// 输出内容“3”
    fmt.Println(calc.Add(1, 2))
}
```
引用package的常见错误

Q1：提示cannot find package "example/demo/v1/calc"？

A：运行命令设置Go语言的环境变量：go env -w GO111MODULE=on

Q2：提示package is not in GOROOT？

A：引用了Go语言环境变量GOROOT目录之外的package，例如import “calc”和import “calc/calc”是不正确的写法。 正确写法是“module名称/package名称”，例如import "example/demo/v1/calc"。


### 4.5 public和private访问权限

public和private访问权限，是相对不同的package名称来说。

3条规则如下：

1. 相同的package名称，不区分public和private访问权限。

2. 同一个目录中，go文件的package名称都是相同的。

3. 方法和字段以大写字母开头，是public访问权限。以小写字母开头，是private访问权限。

```go
package main
type Rect struct{
    // private访问权限的w字段
    w uint32
    // public访问权限的H字段
    H uint32
} 
  // private访问权限的add方法
func add(a int, b int) int{
    return a + b
}
  // public访问权限的Sub方法
func Sub(a int, b int) int{
    return a - b
}
```

## 5. 异常处理

### 5.1 捕获可预见的异常

```go
x:="hello"
number, error := strconv.Atoi(x)
if error == nil {
    fmt.Println(number)
}else {
    fmt.Println(error)
}
```

### 5.2 开发者主动抛出异常

```go
x :="hello"
number, error := strconv.Atoi(x)
if error == nil {
    fmt.Println(number)
}else {
    // 主动抛出异常，若上层调用不捕获该异常，则程序退出。
    panic(error) 
}
```

### 5.3 捕获不可预见的异常

```go
defer func() {
     if err := recover(); err != nil {
          // 输出文字“自定义异常”
	  fmt.Println(err)
     }
}()
// 发生异常并跳转到defer func()函数内
panic("自定义异常")  
// 该行代码无法被运行 
fmt.Println("程序结束")
```

## 6. 字符串

### 6.1 ASCII编码的字符数
```go
var x string = "hello world"
z := len(x)
fmt.Println(z)
```

### 6.2 UTF-8编码的字符数
```go
var x string = "你好"
z := []rune(x)
// 输出内容“6”
fmt.Println(len(x))
// 输出内容“2”
fmt.Println(len(z))
```

### 6.3 拼接
```go
x := "hello"
y := x + "world"
fmt.Println(y)
```

### 6.4 字符位置

ASCII编码
```go
y := strings.Index("hello", "e")
// 输出内容“1”
fmt.Println(y)
```

UTF-8编码，字符位置不正确。应该使用其他方法。
```go
z := strings.Index("你好", "好")
// 输出内容“3”
fmt.Println(y)
```

### 6.5 替换
替换1次
```go
x := "hello hello"
y := strings.Replace(x, "e", "a", 1)
// 输出内容“hallo hello”，将查找结果中的1个替换。
fmt.Println(y)
```

全部替换
```go
y := strings.Replace(x, "e", "a", -1)
// 输出内容“hallo hallo”，将查找结果全部替换。
fmt.Println(y)
```

### 6.6 截取
```go
x := "hello"
y := x[1:2]
fmt.Println(y)
```

### 6.7 分割
```go
x := "hello world"
z := strings.Split(x, " ")
fmt.Println(z)
```

### 6.8 移除首尾空白
```go
x := " hello world "
z := strings.TrimSpace(x)
fmt.Println(z)
```

## 7. 日期

### 7.1 获取当前时间
```go
import "time"
now := time.Now()
// 输出内容“2021-01-01 00:00:00”
fmt.Println(now)

seconds := now.Unix()
// 输出内容“1617958378”（10位数字，精确到秒）
fmt.Println(seconds)	

nanoSeconds := now.UnixNano()
// 输出内容“1617958378000000000”（19位数字，精确到纳秒）
fmt.Println(nanoSeconds)
```

### 7.2 字符串转换为日期类型
```go
now := time.Now()
x := "2021-04-09 17:27:01"
// ParseInLocation方法的第一个输入参数必须是"2006-01-02 15:04:05"
y, error := time.ParseInLocation("2006-01-02 15:04:05", x, time.Local)
if error == nil {
	fmt.Println(y)
}
```

### 7.3 日期类型转换为字符串
日期格式
```go
now := time.Now()
// format字符串必须是"2006-01-02"
date := now.Format("2006-01-02")
fmt.Println(date)
```

时间格式
```go
// format字符串必须是"2006-01-02 15:04:05"
date := now.Format("2006-01-02 15:04:05")
fmt.Println(date)
```

### 7.4 两个日期相差的时间
```go
now := time.Now()
x := "2021-04-09 17:27:01"
y, error := time.ParseInLocation("2006-01-02 15:04:05", x, time.Local)
if error == nil {
	x := now.Sub(y)
        // 相差的多少秒
	fmt.Println(x.Seconds())
}
```

## 8. 数组

### 8.1 创建

指定数组长度
```go
arr := [4]int{1, 2, 3, 4}
```

让编译器推断数组长度
```go
arr := [...]int{1, 2, 3, 4}

```
创建切片：切片可以增加元素，而数组不能。
```go
arr := []int{1, 2, 3, 4}
```

### 8.2 长度
```go
arr := [4]int{1, 2, 3, 4}
fmt.Println(len(arr))
```

### 8.3 连接两个以上数组
```go
arr := [2]int{1, 2}
y := [2]int{3,4}
// 将数组转换为切片
// 输出内容“[1,2,3,4]”
fmt.Println(append(arr[:], y[:]...))
```

### 8.4 变为一个字符串
```go
arr := [4]string{"1", "2", "3", "4"}
fmt.Println(strings.Join(arr[:], ","))
```

### 8.5 截取
```go
arr := [4]int{1, 2,3,4}
// 切片格式为[起始位置:结束位置]，但不包含结束位置。
fmt.Println(arr[0:4])
```

### 8.6 查找
Go语言的package“strings”，没有字符串查找方法。
```go
func indexOf(length int, detect func(i int) bool) int {
	for i := 0; i < length; i++ {
		if detect(i) {
			return i
		}
	}
	return -1
}

arr := [4]int{1, 2, 3, 4}
// 查找数字的位置，输出内容“1”
fmt.Println(indexOf(len(arr), func(i int) bool { return arr[i] == 2 }))

arr2 := [4]string{"1", "2", "3", "4"}
// 查找字符串的位置，输出内容“1”
fmt.Println(indexOf(len(arr2), func(i int) bool { return arr2[i] == "2" }))
```

### 8.7 排序
```go
import "sort"

arr := [4]int{1, 2, 4, 3}
sort.Slice(arr[:], func(i int, j int) bool {
		return arr[i] < arr[j]
})
```

## 9.哈希表

### 9.1 创建
```go
// 必须使用make方法进行初始化
var map1 = make(map[string]string)
map1["a"] = "1"
map1["b"] = "2"
map1["c"] = "3"

fmt.Println(map1)
```

### 9.2 添加和修改
```go
map1["a"] = "11"
```

### 9.3 删除
```go
delete(map1, "a")
```

### 9.4 根据键获取值
```go
// 存在的键
fmt.Println(map1["a"])
// 可能不存在的键
item1, hasKey := map1["e"]
if hasKey {
    fmt.Println(item1)
} else {
	fmt.Println("not found")
}
```

### 9.5 遍历
```go
for key, item := range map1 {
  fmt.Printf("key:%s, value:%s\n", key, item)
}
```

## 10. 文件访问

### 10.1 读取二进制内容

```go
import "io/ioutil"

file, err := ioutil.ReadFile("./go.mod")
if err != nil {
	fmt.Println(err)
} else {
    // 输出内容：字节数组
	fmt.Println(file)
}
```

### 10.2 读取文本内容

```go
import "io/ioutil"

file, err := ioutil.ReadFile("./go.mod")
if err != nil {
	fmt.Println(err)
} else {
    // 输出内容：字符串
	fmt.Println(string(file))
}
```

## 11. 网络访问

### 11.1 发送Get请求
```go
import "net/http"

url := "http://127.0.0.1"
res, err := http.Get(url)
if err != nil {
    fmt.Println(err)
}

defer res.Body.Close()

body, err := ioutil.ReadAll(res.Body)
if err != nil {
	fmt.Println(err)
} else {
	fmt.Println(string(body))
}
```

### 11.2 发送Post请求
```go
import "net/http"

url := "http://127.0.0.1"
values := "{}" 
res, err := http.Post(url, "application/json", strings.NewReader(values))
if err != nil {
	fmt.Println(err)
}

defer res.Body.Close()

body, err := ioutil.ReadAll(res.Body)
if err != nil {
	fmt.Println(err)
} else {
	fmt.Println(string(body))
}
```

### 11.3 设置HTTP请求头
```go
import "net/http"

url := "http://127.0.0.1"
values := "{}"
request, _ := http.NewRequest("POST", url, strings.NewReader(values))
// 设置http请求的header
request.Header.Add("Content-type", "application/json")
client := http.Client{}

res, err := client.Do(request)
if err != nil {
    fmt.Println(err)
}

defer res.Body.Close()

body, err := ioutil.ReadAll(res.Body)
if err != nil {
	fmt.Println(err)
} else {
	fmt.Println(string(body))
}
```

### 11.4 获取HTTP响应头
```go
url := "http://127.0.0.1"
res, err := http.Get(url)
if err != nil {
	fmt.Println(err)
}
// 获取http响应的header
for k, v := range res.Header {
	fmt.Println(k, v)
}
```

### 11.5 对象转换为JSON
```go
import  "encoding/json"

func convertObjectToJson(params map[string]interface{}) string {
	data, err := json.Marshal(params)
	if err != nil {
		return ""
	} else {
		return string(data)
	}
}

func main() {
    var body = make(map[string]interface{})
    body["a"] = "1"
    body["b"] = [3]int{1, 2, 3}
    body["c"] = Rect{Width: 50, Height: 50}
    result := convertObjectToJson(body)
    // 输出内容“{"a":"1","b":[1,2,3],"c":{"Width":50,"Height":50}}”
    fmt.Println(result)
}
```

### 11.6 JSON转换为对象
```go
type Rect struct {
	Width int32
	Height int32
}
type ResponseData struct {
	Status  int32
	Data    []Rect
	Message string
}
func convertJsonToObject(params []byte) ResponseData {
	var res ResponseData
	err := json.Unmarshal(params, &res)
	if err != nil {
		fmt.Println(err)
	}
	return res
}
func main() {
    jsonStr := `
    {
		"Status": 200,
		"Data": [
			{"Width":1,
			"Height":1},
			{"Width":2,
			"Height":2}],
		"Message": "ok"
    }`
	result := convertJsonToObject([]byte(jsonStr))
    // 输出内容“{200 [{1 1} {2 2}] ok}”
	fmt.Println(result)
}
```

## 12. 数据库访问

### 12.1 导入依赖的package

1、在项目目录中，运行以下命令，下载第三方package。
```go
go get github.com/go-sql-driver/mysql 
```

2、package名称前面的下划线“_”表示导入package时，只执行package的init()方法。
```go
import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)
```

### 12.2 打开数据库连接

数据库的连接字符串

username：用户名

password：密码

dbname：数据库名

```go
// username：用户名，password：密码，dbname：数据库名
const connString string = "username:password@tcp(127.0.0.1:3306)/dbname"
// 数据库连接对象
var db *sql.DB
func open() {
	var err error
	db, err = sql.Open("mysql", connString)
	if err != nil {
		fmt.Println("Open", err)
		return
	}
	fmt.Println("Open", "Succeed")
}
```

### 12.3 添加记录
```go
type User struct {
	// 属性的首字母大写
	Id    string
	Title string
}
func createOrUpdateRecord(user User, isUpdate bool) {
	sql := ""
	if isUpdate {
		sql = "update team set title = ? where id = ?;"
	} else {
		sql = "insert into team(title, id) values(?, ?);"
	}
	stmt, err := db.Prepare(sql)
	if err != nil {
		fmt.Println("Prepare", err)
		return
	}
	defer stmt.Close()
	// 参数化查询
	result, err := stmt.Exec(user.Title, user.Id)
	if err != nil {
		fmt.Println("Exec", err)
		return
	}
	// 受影响行数
	nums, err := result.RowsAffected()
	if err != nil {
		fmt.Println("RowsAffected", err)
		return
	}
	fmt.Println("RowsAffected", nums)
}

user1 := User{Id: "1", Title: "a"}
// 添加记录
createOrUpdateRecord(user1, false)
```

### 12.4 修改记录
```go
user1 := User{Id: "1", Title: "a"}
// 修改记录和添加记录的方法相同，只是执行的SQL语句不一样。
user1.Title = "b"
createOrUpdateRecord(user1, true)
```

### 12.5 查询记录
```go
type User struct {
	// 属性的首字母大写
	Id    string
	Title string
}
// 通过反射获取结构体对象的属性
func getColumns(obj interface{}) []interface{} {
	el := reflect.ValueOf(obj).Elem()
	fields := el.NumField()
	columns := make([]interface{}, fields)

	for j := 0; j < fields; j++ {
		field := el.Field(j)
		columns[j] = field.Addr().Interface()
	}

	return columns
}
func selectRecord() {
	users := []User{}
	stmt, err := db.Prepare("select id, title from team limit ?,?;")
	if err != nil {
		fmt.Println("Prepare", err)
		return
	}

	defer stmt.Close()

	// 参数化查询
	rows, err := stmt.Query(0, 5)
	if err != nil {
		fmt.Println("Query", err)
		return
	}

	for rows.Next() {
		user := User{}
                // 因为rows.Scan的输入参数需要填写多个属性名，所以使用getColumns方法获取User对象的多个属性名。
		columns := getColumns(&user)
		err = rows.Scan(columns...)
		if err != nil {
			fmt.Println("Scan", err)
			break
		}
		users = append(users, user)
	}
	if err := rows.Err(); err != nil {
		fmt.Println("Err", err)
		return
	}

	defer rows.Close()

    // 输出记录信息
	for _, user := range users {
		fmt.Println(user)
	}
}

selectRecord()
```

### 12.6 删除记录
```go
func deleteRecord(id string) {
	sql := "delete from team where id = ?;"
	stmt, err := db.Prepare(sql)
	if err != nil {
		fmt.Println("Prepare", err)
		return
	}

	defer stmt.Close()

	// 参数化查询
	result, err := stmt.Exec(id)
	if err != nil {
		fmt.Println("Exec", err)
		return
	}
    
	// 受影响行数
	nums, err := result.RowsAffected()
	if err != nil {
		fmt.Println("RowsAffected", err)
		return
	}
	fmt.Println("RowsAffected", nums)
}

user1 := User{Id: "1", Title: "a"}
deleteRecord(user1.Id)

```

### 12.7 关闭数据库连接
```go
var db *sql.DB

func closeDB() {
	db.Close()
}
closeDB()
```

## 13. 协程

### 13.1 定义异步方法

```go
func work1() {
	fmt.Println("work1")
}
func work2() {
	fmt.Println("work2")
}
func main() {
    for i := 0; i < 2; i++ {
    // 使用go关键字
	go work1()
	work2()
   }}
    /* 输出内容中没有“work1”，因为主线程没有等待work1线程就结束了。
    work2
    work2
    */
}
```

### 13.2 等待异步方法
```go
import "sync"
var waitGroup sync.WaitGroup

func work1() {
    fmt.Println("work1")
    // 通知线程的工作完成。
    waitGroup.Done()
}
func work2() {
    fmt.Println("work2")
}
func main() {
    // 数字2表示等待2个线程完成。
	waitGroup.Add(2)
	for i := 0; i < 2; i++ {
	    go work1()
	    work2()
	}
    waitGroup.Wait()
    /* 输出内容包含了“work2”和“work1”，因为“work1”是异步执行，所以显示在“work2”后面。
    work2
    work2
    work1
    work1
    */
}
```

### 13.3 等待多个异步方法完成

waitGroup.Add()的输入参数

数字0：waitGroup.Wait()不阻塞。

数字1：waitGroup.Wait()等待1个线程完成，然后不阻塞。

数字2：waitGroup.Wait()等待2个线程都完成，然后不阻塞。

数字3：waitGroup.Wait()等待3个线程完成，但不存在第3个线程时，提示“fatal error: all goroutines are asleep - deadlock!”。

```go
func main() {
    waitGroup.Add(2)

    for i := 0; i < 2; i++ {
        // 循环了2次，创建了2个线程执行方法“work1”。
        go work1()
        work2()
    }

    // 阻塞当前线程
    waitGroup.Wait()
}
```

### 13.4 在协程之间发送和接收消息

1、make(chan string)的channel默认不带缓冲区。

协程work2发送消息后变成阻塞状态，等待协程work1接收消息后，work2取消阻塞状态。

2、make(chan string, 10)的channel带缓冲区，方法的第2个参数表示缓冲区大小为10个字节。

协程work2发送消息不会变成阻塞状态，在发送消息的大小超过缓冲区后，协程work2开始阻塞。等待work1接收消息后，work2取消阻塞状态。

3、使用select和case语句管理多个channel：一个case语句对应一个channel。

规则如下：

如果case语句全部不运行，则select会阻塞到有一个case语句可以运行。但是，如果有default语句，则运行default语句。

如果case语句有几个可以运行，则select会随机地选择一个case语句运行，其他case语句被忽略。

```go
var chanel chan string
func work1() {
	// 一直阻塞到接收了消息
	msg := <-chanel
	fmt.Println("work1", msg)
}
func work2() {
	msg := "hello"
	// 发送消息并一直阻塞到对方接收完成
	chanel <- msg
	fmt.Println("work2")
}
func main() {
    // 消息通道变量初始化
	chanel = make(chan string)
	for i := 0; i < 2; i++ {
	    go work1()
	    work2()
	}
    /* 输出内容
    work1 hello
    work2
    work1 hello
    work2
    */
}
```
