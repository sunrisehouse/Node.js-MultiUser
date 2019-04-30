# 간단한 Node.js + MySQL 회원 가입, 로그인 만들기

## 목표

* 간단하게 로그인 회원가입 기능 되는 web application

## TODO

1. DB
    1. DB 설계
        * User Table 정보 : ID, Password, email, name
    2. DB 만들기

2. Front
    * Sign In Page
        * Input : ID , Password
        * Button : Sign In , Sign Up
    * Sign Up Page
        * Input : ID , Password , email , name
        * Button : Sign Up

3. Back
    1. Connect DB
    2. app.get
        * Sign In page
        * Sign Up page
    3. app.post
        * Sign In : ID, Password
        * Sign Up : ID , Password, email, name 으로 Create

## 추가 해야할 것

* app.js 에 있는 db 정보 숨기기
* password 암호화
* id or email 중복 검사 기능
* 글자 수 제한 기능
* email, password 등 형식 검사 기능

* authentication 기능
* ID/Password 찾기 기능
* cookie 이용해 login 상태 유지시키기

## 사용한 sql 문

1. DataBase 만들기
    ```
        create database study_db;
    ```

2. Table 만들기
    ```
        create table users(
            _id int primary key auto_increment,
            id varchar(32) not null,
            password varchar(32) not null,
            name varchar(32) not null,
            email varchar(64) not null
        )
    ```
3. Insert
    ```
        // command line 에서 사용
        insert into users (id,password,name,email) valuew ('a','b','c','d')
    ```
    ```
        // app.js 에서 사용
        insert into user SET ?
    ```
4. Select
    ```
        // command line 에서 사용
        select * from users
        select * from users where id = 'a'
        select id from users where id = 'a'
    ```
    ```
        // app.js 에서 사용
        select * from user where id = ?
    ```