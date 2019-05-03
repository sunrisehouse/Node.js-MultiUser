# Improve Project2 - SignUp and SignIn

## TODO

1. Hide db description 
2. Encrypt the password
3. Check the overlap of ID or email
4. Limit the number of character
5. Check the format of password or email
6. Make authentication
7. Make function finding ID or password
8. Maintain the signin state by using session and make logout

### Hide db description

1. db data 를 다른 파일에 모듈화 시킨 후 gitignore 로 그 dbdata 만 올리지 않는다.
    * gitignore 을 설정했는데 변화가 없었다 
    * git rm -r --cached . 로 캐쉬??를 지우고 다시 했더니 됐다.
    * 이미 올라가 있는 log 들 까지 지워줘야 했다.

### Encrypt the password

* PBKDF2(Password-Based Key Derivation Function2)
    1. npm 으로 모듈 설치
    2. table 에 salt 컬럼 추가
    3. database 에 password 컬럼 길이 변경 (varchar(10)->varchar(200))
    2. 회원가입 시 비밀번호 암호화 되어 저장되게
    3. 로그인 시 입력한 비밀번호 암호화 시켜서 db에 저장된 암호화 된 password 와 비교

* 이게 맞는 암호화인지는 잘 모르겠다.
* 참고 싸이트) https://swk3169.tistory.com/entry/Nodejs-PBKDF2%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EB%B3%B4%EC%95%88

### CHeck the overlap of ID or email

* javscript ajax 를 이용한 통신으로 중복체크 기능 만듬
* ajax 에서 보낸 id 값이 server 에서 내 예상대로 오지 않는 문제 발생.
* ajax 로 보낸 data 가 어디에 담겨 오는 건지 찾아봐야겠다.
* 이유를 몰라서 pure javascript 에서 jquery 로 바꿔서 ajax 사용 했더니 됨.
* 흠 pure javascript 로도 됐었는데 뭐가 문젠지 모르겠다.