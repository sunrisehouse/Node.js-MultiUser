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

6. passport.js 개발
    - passport 는 sign.js 개발할 필요가 없다!
