# passport

## 순서

1. npm init
2. express
3. router 로 router 정리
4. auth-router 에 router 만들기
    - get : signin , signup
    - post : signin, signup, signout

5. sign.js 개발
    - function - signIn(id,password) : 로그인 성공하면 true, 실패하면 false 반환
    - function - signOut(id) : 로그아웃 성공하면 true, 실패하면 false 반환
    - function - signUp(id,password,name,email) : 회원가입 성공하면 true, 실패하면 false 반환

6. id,password 등 post 로 전달받은 body 쓰기 위해 body-parser 

7. passport.js 개발
    - passport 는 sign.js 개발할 필요가 없었다.
    - 로그인, 로그아웃 처리를 해준다.
    - sign.js 에 회원가입만 있기에는 과투자 같다. auth.js 에서 처리하자.

8. sign.js 삭제

9. passport.js 개발
    1. passport.js 는 app 객체가 필요하고 auth.js 는 passport 객체가 필요하다.
        - 방법1 - 생활코딩
            1. app.js 에서 passport 로 app 을 전달해서 
            2. app 에서 passport 만들고 ( require(passport)(app) )
            3. auth.js 로 전달하기 ( require(auth)(passport) )
        - 방법2 - 내 생각
            1. app.js 에서 auth 로 app 을 전달하고 ( require(auth)(app) )
            2. auth 에서 passport 로 app 을 전달해서 passport 를 만든다. ( require(passport)(app) )
        - 방법1 선택. passport 란 라이브러리를 app 에서 사용하는게 더 명시적일 것 같다.
        - 이 app 이 passport 를 사용했다. 그리고 passport 는 app 전반에서 로그인 상태를 확인하기 때문에 이게 더 맞지 않을까 생각.
        - 하는데 module 에 매개변수 줄 때 마지막에 return router; or return passport; 안해서 애 먹었다.
    2. npm install passport module
        - package 이름이 passport 라서 install 이 안됐었음.
        - npm install 할 때 -s 를 안하니까 로그가 떴음
    3. npm install passport strategy
    4. passport 는 session 이 필요
        - npm install express-session
        - express-session require
        - 옵션 설정
        - session 저장 할 곳 선택 (file 저장 선택)  
    5. passport 전략 설정, post 받을 때 어떤 값 읽어 올지, 읽어서 어떻게 판단할지 설정
        - app.use(new LocalStrategy()) 부분
        - db library 에서 db.selectUser , db.insertUser 의 함수를 만들었으나 비동기적으로 db 가 처리되서 db sql 결과가 나오기 전에 value 가 return 돼서 value 가 undefiend 됐다.
        - 비동기 처리 관련 공부가 더 필요하다고 생각이 든다.
        - 그래서 일단은 db library 작성했던 것을 지운다.
    7. session 처리
        - serializeUser, deserializeUser 부분