# MySQL error

## Error: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

* 발생
    * node.js 로 만든 server side application 과 connect 시에 발생
* 원인
    * 원인 모름
* 해결
    * mysql 과 node.js version 이 안 맞아서 예전 방식을 써야하는 것으로 이해
    * `mysql
    ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'RootPassword';
    `

    * 이 sql을 이용해 해결

    * 참고 싸이트 - https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server