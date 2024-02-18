const express = require('express')
const http = require('http')
const passport = require('passport')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const fs = require('fs');
const bodyParser = require('body-parser')
const { config } = require(`./config`)
const chalk = require('chalk')

const { log, info, warn, error } = require(`./functions/colors`)
const { findJSFiles, filterJsFileName} = require(`./functions/findJsFile`)

const app = express()
module.exports.app = app
const server = new http.createServer(app)

const port = config.webserver.port

// VIEW APP ENGINE 
app.set('view engine', config.webserver.view);
app.set('views', path.join(__dirname, 'web'));
app.use(express.static(path.join(__dirname, 'public')));

//  MIDDELEWARE
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// SESSION
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: config.webserver.secret
}));
    
app.use(passport.initialize());
app.use(passport.session());


const modulesJs = findJSFiles(`./modules`)
let loadedFiles = [];

modulesJs.forEach(file => {
  try {
    require(`./${file}`);
    loadedFiles.push({ file: filterJsFileName(file), status : `Loaded` });
  } catch (error) {
    loadedFiles.push({ file: filterJsFileName(file), status : `Error` });
    console.log(`err`, error);
  }
});
log(chalk.green("<==========<  Module Loader  >==========>"))
console.table(loadedFiles);


server.listen(port , () => {
  info(`> Server is up and running on http://localhost:${port}`)
})