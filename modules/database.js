const mysql2 = require('mysql2/promise');
const { log, info, warn, error } = require(`../functions/colors`);
const { config } = require(`../config.js`);
const chalk = require('chalk');
const bluebird = require('bluebird')

async function dbConnect() {
    return await mysql2.createConnection({
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        Promise : bluebird
    });
}


module.exports.dbConnect = dbConnect