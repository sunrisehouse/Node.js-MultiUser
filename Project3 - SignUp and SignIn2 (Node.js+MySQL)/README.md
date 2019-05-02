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

* 아이디 중복 체크 버튼을 누를 수도 있겠지만 그것 보다는 ajax 를 이용해 바로바로 확인 가능하게 만들고 싶었다.