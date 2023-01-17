[Chinese Version](README_CN.md)

# Go Language Transfer Learning

## Preface

Transfer learning refers to using existing knowledge and experience to acquire new knowledge and skills.

We can use our familiar programming language to learn Go language development quickly.

According to a knowledge point needed in the development of a Web application system, this paper describes the realization of website development by Go language.

## Content

1. Variable type and type conversion

2. Process control

3. Structures and functions

4. Interface and package

5. Exception handling

6. String

7. Date

8. Array

9. Hash table

10. File access

11. Network access

12. Database access

13. Goroutine


## 1. Variable type and type conversion

### 1.1 Basic Types

```go
// Integer type
var x int32 = -1
var x uint32 = 1
// Floating-point type
var x float64 = 1.0
// Boolean type
var x bool = true
// String type
var x string = "abc"
// UTF-8 character type
var x string = "你好"
// The length of variable x is 6.
len(x) 
z := []rune(x)
// The length of the variable z is 2.
len(z)
```

### 1.2 Composite Type
```go
// Structure type
type Rect struct {
    w uint32
    h uint32
}
x := Rect{
    w:50,
    h:50,
}
// Interface type
type BookSearch interface {
    do()
}
// Array type
x := [5]int{1,2,3,4,5}
// Slice type
x := []int{1,2,3,4,5}
// Hash table type
x := make(map[string]string)
// Pointer type
var x_ptr *int32
x_ptr = &x
```

### 1.3 Number to string

Mode 1
```go
y := fmt.Sprintf("%d", 123)
```

Mode 2
```go
y := strconv.Itoa(123)
```

### 1.4 String to number

Mode 1
```go
y, error := strconv.Atoi("123")
if error == nil {
	fmt.Println(y)
}
```

Mode 2
```go
y, error := strconv.ParseFloat("123.1", 64)
if error == nil {
	fmt.Println(y)
}
```

### 1.5 Defining constant
```go
const X int32 = 1
```

### 1.6 View variable types
Mode 1
```go
fmt.Printf("%T", "abc")
```

Mode 2
```go
fmt.Println(reflect.TypeOf("abc"))
```
## 2.Process control

### 2.1 Conditional statement
```go
if true{
}
else if true{
} 
else{
}
```

### 2.2 Multi-branch selection statement

There is no need to add a break statement to each case branch.

```go
x := 3
switch(x){
    case 1: 
    case 2:
    default:
}
```

### 2.3 Loop statement
```go
x := [3]int{1, 2, 3}
for i := 0; i < len(x); i++ {
    fmt.Printf("%d,%d\n", i, x[i])
}
```

### 2.4 Iterative statement
```go
x := [3]int{1, 2, 3}
for index, item := range x {
    fmt.Printf("index:%d,item:%d\n", index, item)
}
```

## 3.Structures and functions

### 3.1 Functions

```go
func myFunc(a int, b int) int{
    return a+b
}
```

### 3.2 Structure

```go
type Rect struct {
    w uint32
    h uint32
} 
rect := Rect {w: 50, h:50} 
// Access in the form of "Structure.Field"
rect.w = 100
```

### 3.3 Instance method of class
```go
type Book struct {
	title string
}
func (book Book) setTitleInvalid(title string) {
	// The modification of the field "title" of the struct "book" is invalid.
	book.title = title
}
func (book *Book) setTitle(title string) {
	// Let the struct "book" use a pointer, and it is effective to modify the field "title" of the struct "book".
	book.title = title
}
func (book Book) getTitle() string {
	return book.title
}
func main() {
	book := Book{title: "Go language"}
	book.setTitle("Title 1")
	book.setTitleInvalid("Title 2")
	title := book.getTitle()
	// Output the text "Title 1"
	fmt.Println(title)
}
```

### 3.4 Static methods of the class
```go
// There is no static method, and ordinary functions are used instead.
func area(w uint32, h uint32) uint32{
    return w * h
}
fmt.Println(area(50,50))
```

### 3.5 Get the current object

Go language does not have the object "this" in other languages.

## 4.Interface and package

### 4.1 Define interface
```go
type BookSearch interface {
     do()
}
```

### 4.2 Using Interface to Realize Class Polymorphism
```go
type Book struct {
	title string
}
type Student struct {
	title string
}
// implementing the interface "Booksearch" with the structure "Book"
func (book Book) do() {
	fmt.Println("Book")
}
// implementing the interface "Booksearch" with the structure "Student"
func (student Student) do() {
	fmt.Println("Student")
}
// Declare the variable "search" of the interface "BookSearch".
var search BookSearch
// Create an object "Book" and assign it to the variable "search".
search = Book{title: "Book"}
// Output the text "Book"
search.do()
// Create an object "Student" and assign it to the variable "search".
search = Student{title: "Student"}
// Output the text "Student"
search.do()
```

### 4.3 Define package

File name: calc.go

```go
package calc
// Capitalize the first letter of the method "Add".
func Add(a int32, b int32) int32{
    return a + b
}
```

### 4.4 Reference package

Step 1: Place the referenced package file "calc.go" in a subdirectory "/calc" of the project.

Directory structure of the project:
/calc/calc.go
/main.go

Step 2: Run the command in the root directory of the project to create the file "go.mod".
```go
go mod init example.com/demo/v1
```

File name：/go.mod
```go
module example.com/demo/v1 
go 1.16  
```

The directory structure of the project is below.
/calc/calc.go
/main.go
/go.mod

Step 3: Define the name "calc" of the referenced package.

File name: /calc/calc.go
```go
package calc
// Capitalize the first letter of the method "Add".
func Add(a int32, b int32) int32{
    return a + b
}
```
Step 4: Import the package in the form of "module name / package name".

Module name in go.mod file: http://example.com/demo/v1

Package Name: calc

Name imported from outside: http://example.com/demo/v1/calc

File name: /main.go

```go
package main
import (
	"fmt"
	"example.com/demo/v1/calc"
)
func main() {
	// Output the text "3"
    fmt.Println(calc.Add(1, 2))
}
```

Common errors in referencing package

Q1：Prompt "cannot find package example/demo/v1/calc"?

A：Run the command to set the environment variables of Go language: go env -w GO111MODULE=on

Q2：Prompt "package is not in GOROOT"？

A：It is incorrect to refer to the package outside the Go language environment variable GOROOT directory, such as import "calc" and import “calc/calc ". The correct spelling is "module name / package name", such as import "example/demo/v1/calc".


### 4.5 Public and private

Public and private are relatively different package names.

The three rules are below.

1. If it is same package name, there is no distinction between public and private.

2. If they are in the same directory, the package names of go files are all the same.

3. Methods and fields that start with uppercase letters are public, while those that start with lowercase letters are private.

```go
package main
type Rect struct{
    // the private field "w"
    w uint32
    // the publice field "H"
    H uint32
} 
// the private method "add"
func add(a int, b int) int{
    return a + b
}
// the publice method "Sub"
func Sub(a int, b int) int{
    return a - b
}
```

## 5. Exception handling

### 5.1 Catch predictable anomalies

```go
x:="hello"
number, error := strconv.Atoi(x)
if error == nil {
    fmt.Println(number)
}else {
    fmt.Println(error)
}
```

### 5.2 Developers actively throw exceptions.

```go
x :="hello"
number, error := strconv.Atoi(x)
if error == nil {
    fmt.Println(number)
}else {
    // Throw an exception actively, and if the upper layer call does not catch the exception, the program will exit.
    panic(error) 
}
```

### 5.3 Catch unpredictable exceptions

```go
defer func() {
     if err := recover(); err != nil {
          // Output the text "Custom Exception"
	  fmt.Println(err)
     }
}()
// An exception occurs and jumps into the function "defer func()".
panic("Custom Exception")  
// This line of code cannot be run. 
fmt.Println("Program exit")
```

## 6.String

### 6.1 The number of characters encoded in ASCII.
```go
var x string = "hello world"
z := len(x)
fmt.Println(z)
```

### 6.2 The number of characters encoded in UTF-8.
```go
var x string = "你好"
z := []rune(x)
// Output the text "6"
fmt.Println(len(x))
// Output the text "2"
fmt.Println(len(z))
```

### 6.3 String concatenation
```go
x := "hello"
y := x + "world"
fmt.Println(y)
```

### 6.4 Character position

ASCII encoding
```go
y := strings.Index("hello", "e")
// Output the text "1"
fmt.Println(y)
```

UTF-8 encoding, the character position is incorrect. Other methods should be used.
```go
z := strings.Index("你好", "好")
// Output the text "3"
fmt.Println(y)
```

### 6.5 Replace
Replace once
```go
x := "hello hello"
y := strings.Replace(x, "e", "a", 1)
// Output the text "hallo hello", and replace one of the results.
fmt.Println(y)
```

Replace all
```go
y := strings.Replace(x, "e", "a", -1)
// Output the content "hallo hallo" and replace all the results.
fmt.Println(y)
```

### 6.6 Substring
```go
x := "hello"
y := x[1:2]
fmt.Println(y)
```

### 6.7 String segmentation
```go
x := "hello world"
z := strings.Split(x, " ")
fmt.Println(z)
```

### 6.8 String Trim
```go
x := " hello world "
z := strings.TrimSpace(x)
fmt.Println(z)
```

## 7. Date and Time

### 7.1 Get the current time
```go
import "time"
now := time.Now()
// Output the text "2021-01-01 00:00:00"
fmt.Println(now)

seconds := now.Unix()
// Output the text "1617958378" (10 digits, accurate to second)
fmt.Println(seconds)	

nanoSeconds := now.UnixNano()
// Output the text "161795837800000000" (19 digits, accurate to nanosecond)
fmt.Println(nanoSeconds)
```

### 7.2 String converted to date type
```go
now := time.Now()
x := "2021-04-09 17:27:01"
// The first input parameter of the method "ParseInLocation" must be "2006-01-02 15:04:05".
y, error := time.ParseInLocation("2006-01-02 15:04:05", x, time.Local)
if error == nil {
	fmt.Println(y)
}
```

### 7.3 Date type converted to string
Date format
```go
now := time.Now()
// The format string must be "2006-01-02"
date := now.Format("2006-01-02")
fmt.Println(date)
```

Time format
```go
// The format string must be "2006-01-02 15:04:05"
date := now.Format("2006-01-02 15:04:05")
fmt.Println(date)
```

### 7.4 Time interval between two dates.
```go
now := time.Now()
x := "2021-04-09 17:27:01"
y, error := time.ParseInLocation("2006-01-02 15:04:05", x, time.Local)
if error == nil {
	x := now.Sub(y)
    // time span
	fmt.Println(x.Seconds())
}
```

## 8.Array

### 8.1 Create an array

Specify the array length
```go
arr := [4]int{1, 2, 3, 4}
```

Let the compiler infer the array length.
```go
arr := [...]int{1, 2, 3, 4}

```
Create slices. Slices can be added elements, but arrays can't.
```go
arr := []int{1, 2, 3, 4}
```

### 8.2 Array length
```go
arr := [4]int{1, 2, 3, 4}
fmt.Println(len(arr))
```

### 8.3 Connect more than two arrays.
```go
arr := [2]int{1, 2}
y := [2]int{3,4}
// Convert an array into a slice
// Output rhe text "[1,2,3,4]"
fmt.Println(append(arr[:], y[:]...))
```

### 8.4 Convert an array into a slice
```go
arr := [4]string{"1", "2", "3", "4"}
fmt.Println(strings.Join(arr[:], ","))
```

### 8.5 Array slice
```go
arr := [4]int{1, 2,3,4}
// The format is [Start Position: End Position], but the end position is not included.
fmt.Println(arr[0:4])
```

### 8.6 Search
Go language package "strings" has no "search" method.
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
// Find the position of the number and output the text "1"
fmt.Println(indexOf(len(arr), func(i int) bool { return arr[i] == 2 }))

arr2 := [4]string{"1", "2", "3", "4"}
// Find the position of the string and output the text "1"
fmt.Println(indexOf(len(arr2), func(i int) bool { return arr2[i] == "2" }))
```

### 8.7 Sort
```go
import "sort"

arr := [4]int{1, 2, 4, 3}
sort.Slice(arr[:], func(i int, j int) bool {
		return arr[i] < arr[j]
})
```

## 9.Hash table

### 9.1 Create
```go
// You must use the method "make" to initialize.
var map1 = make(map[string]string)
map1["a"] = "1"
map1["b"] = "2"
map1["c"] = "3"

fmt.Println(map1)
```

### 9.2 Add and modify
```go
map1["a"] = "11"
```

### 9.3 Delete
```go
delete(map1, "a")
```

### 9.4 Get the value according to the key
```go
// the existing key
fmt.Println(map1["a"])
// Keys that may not exist
item1, hasKey := map1["e"]
if hasKey {
    fmt.Println(item1)
} else {
	fmt.Println("not found")
}
```

### 9.5 range
```go
for key, item := range map1 {
  fmt.Printf("key:%s, value:%s\n", key, item)
}
```

## 10.File access

### 10.1 Read a binary content

```go
import "io/ioutil"

file, err := ioutil.ReadFile("./go.mod")
if err != nil {
	fmt.Println(err)
} else {
    // Output content: byte array
	fmt.Println(file)
}
```

### 10.2 Read a text content

```go
import "io/ioutil"

file, err := ioutil.ReadFile("./go.mod")
if err != nil {
	fmt.Println(err)
} else {
    // Output content: string
	fmt.Println(string(file))
}
```

## 11.Network access

### 11.1 Send a Get request
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

### 11.2 Send a Post request
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

### 11.3 Set HTTP request header
```go
import "net/http"

url := "http://127.0.0.1"
values := "{}"
request, _ := http.NewRequest("POST", url, strings.NewReader(values))
// Set the header of http request.
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

### 11.4 Get HTTP response header
```go
url := "http://127.0.0.1"
res, err := http.Get(url)
if err != nil {
	fmt.Println(err)
}
// Get the header of http response.
for k, v := range res.Header {
	fmt.Println(k, v)
}
```

### 11.5 Object to JSON
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
    // output the text {"a":"1","b":[1,2,3],"c":{"Width":50,"Height":50}}
    fmt.Println(result)
}
```

### 11.6 JSON to object
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
    // output the text {200 [{1 1} {2 2}] ok}
	fmt.Println(result)
}
```

## 12.Database access

### 12.1 Import dependent package.

1. In the project directory, run the following command to download the third-party package.

```go
go get github.com/go-sql-driver/mysql 
```

2. The underscore "_" in front of the package name indicates that only the init () method of the package will be executed when the package is imported.

```go
import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)
```

### 12.2 Open database connection

Connection string of the database.

username: a user name

password: a password

dbname: a database name

```go
// username: a user name, password: a password, dbname: a database name
const connString string = "username:password@tcp(127.0.0.1:3306)/dbname"
// Database connection object
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

### 12.3 Add a record
```go
type User struct {
	// Capitalize the first letter.
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
	// parameterized query
	result, err := stmt.Exec(user.Title, user.Id)
	if err != nil {
		fmt.Println("Exec", err)
		return
	}
	// The number of rows affected
	nums, err := result.RowsAffected()
	if err != nil {
		fmt.Println("RowsAffected", err)
		return
	}
	fmt.Println("RowsAffected", nums)
}

user1 := User{Id: "1", Title: "a"}
// add a record
createOrUpdateRecord(user1, false)
```

### 12.4 Update a record
```go
user1 := User{Id: "1", Title: "a"}
// The method of modifying records is the same as that of adding records, but the SQL statements executed are different.
user1.Title = "b"
createOrUpdateRecord(user1, true)
```

### 12.5 Query record
```go
type User struct {
	// Capitalize the first letter.
	Id    string
	Title string
}
// Get the attributes of the structure object by reflection.
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

	// parameterized query
	rows, err := stmt.Query(0, 5)
	if err != nil {
		fmt.Println("Query", err)
		return
	}

	for rows.Next() {
		user := User{}
		// Because the input parameter of "rows.Scan" needs to fill in multiple attribute names, use the method "getColumns" to get multiple attribute names of the object "User".
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

    // Output records
	for _, user := range users {
		fmt.Println(user)
	}
}

selectRecord()
```

### 12.6 Delete record
```go
func deleteRecord(id string) {
	sql := "delete from team where id = ?;"
	stmt, err := db.Prepare(sql)
	if err != nil {
		fmt.Println("Prepare", err)
		return
	}

	defer stmt.Close()

	// parameterized query
	result, err := stmt.Exec(id)
	if err != nil {
		fmt.Println("Exec", err)
		return
	}
    
	// the number of rows affected
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

### 12.7 Close the database connection
```go
var db *sql.DB

func closeDB() {
	db.Close()
}
closeDB()
```

## 13.Goroutine

### 13.1 Define asynchronous methods

```go
func work1() {
	fmt.Println("work1")
}
func work2() {
	fmt.Println("work2")
}
func main() {
    for i := 0; i < 2; i++ {
    // Use a keyword "go"
	go work1()
	work2()
   }}
    // There is no "work1" in the output, because the main thread ended without waiting for the work1 thread.
    /*
    work2
    work2
    */
}
```

### 13.2 Waiting for asynchronous method
```go
import "sync"
var waitGroup sync.WaitGroup

func work1() {
    fmt.Println("work1")
    // Notifies the thread that its work is completed.
    waitGroup.Done()
}
func work2() {
    fmt.Println("work2")
}
func main() {
    // The number "2" means waiting for two threads to complete.
	waitGroup.Add(2)
	for i := 0; i < 2; i++ {
	    go work1()
	    work2()
	}
    waitGroup.Wait()
	// The output contains "work2" and "work1", because "work1" is executed asynchronously, so it is displayed after "work2".
    /*
    work2
    work2
    work1
    work1
    */
}
```

### 13.3 Wait for multiple asynchronous methods to complete.

Input parameters of "waitGroup.Add()".

Number 0：waitGroup.Wait() is not blocked。

Number 1：waitGroup.Wait() waits for one thread to complete, and then does not block.

Number 2：waitGroup.Wait() waits for both threads to complete, and then does not block.

Number 3：waitGroup.Wait() When waiting for three threads to finish, but there are no three threads, the prompt "fatal error: all go routines are asleep-deadlock!".

```go
func main() {
    waitGroup.Add(2)

    for i := 0; i < 2; i++ {
        // Loop twice, creating two thread execution methods "work1".
        go work1()
        work2()
    }

    // The current thread is blocked.
    waitGroup.Wait()
}
```

### 13.4 Send and receive messages between Goroutines.

1.The channel "make(chan string)" has no buffer by default.

After sending the message, the "work2" becomes blocked, and after waiting for the "work1" to receive the message, the "work2" cancels the blocking state.

2.The channel "make(chan string, 10)" has a buffer, and the second parameter of the method indicates that the buffer size is 10 bytes.

The message sent by the "work2" will not be blocked. After the size of the sent message exceeds the buffer, the "work2" will be blocked. After waiting for the "work1" to receive the message, the work2 will unblock the state.

3.Use "select" and "case" statements to manage multiple channels. one "case" statement corresponds to one "channel".

The rules are as follows.

If none of the case statements run, the "select" will block until one "case" statement can run. However, if there is a "default" statement, the "default" statement will run.

If several "case" statements can be run, the "select" will randomly select one "case" statement to run, and other "case" statements will be ignored.

```go
var chanel chan string
func work1() {
	// Block until a message is received.
	msg := <-chanel
	fmt.Println("work1", msg)
}
func work2() {
	msg := "hello"
	// Send a message and block it until the other party receives it.
	chanel <- msg
	fmt.Println("work2")
}
func main() {
    // the variable "channel" initialization
	chanel = make(chan string)
	for i := 0; i < 2; i++ {
	    go work1()
	    work2()
	}
	// output the text
    /* 
    work1 hello
    work2
    work1 hello
    work2
    */
}
```
