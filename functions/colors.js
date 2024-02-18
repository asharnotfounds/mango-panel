const chalk = require('chalk')

const info = (msg) => {
    console.log(chalk.gray(msg));
}
const log = (msg) => {
    console.log(chalk.whiteBright(msg));
}
const error = (msg) => {
    console.log(chalk.red.bgRed(msg));
}
const warn = (msg) => {
    console.log(chalk.redBright(msg));
}

module.exports.log = log
module.exports.info = info
module.exports.warn = warn
module.exports.error = error