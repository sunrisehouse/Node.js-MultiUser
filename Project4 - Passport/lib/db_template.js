const mysql = require('mysql')
const db_connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'aaaa0000',
    port : 3306,
    database : 'study_db'
})

db_connection.connect(function(err){
    if(err) throw err;
    console.log("db connected!")
})

var dbLib = {
    selectUser:function(id){
        var sql = 'select * from users where id = ?';
        var query = db_connection.query(sql,id,function( err, results, fields){
            if(err) { throw err }
            else{
                console.log(1);
                return results;     
            }
        })
        console.log(2);
    },
    insertUser:function(id,password,name,email){
        var user = {        // 암호화된 hash 와 salt 값 을 저장
            'id' : id,
            'password': password,
            'name' : name,
            'email' : email
        }
        var sql = 'insert into users SET ?'
  
        var query = db_connection.query(sql, user , function(err, rows) {
            if(err) { throw err}
            else{
                return true;
            }
        })
    }
}

module.exports = dbLib;
