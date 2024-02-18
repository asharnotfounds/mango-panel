const config = {
    webserver : {
        port : 3000,
        view : 'ejs',
        secret : `123asd!`
    },
    database: {
        host : "127.0.0.1",
        user : "root",
        password : "",
        database : "mango"
    }
}

module.exports.config = config