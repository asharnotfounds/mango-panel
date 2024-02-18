const path = require('path')
const { findJSFiles, filterJsFileName} = require(`../functions/findJsFile`)
const { log, info, warn, error } = require(`../functions/colors`)
const { app } = require('../main')
const chalk = require('chalk')
const indexRoute = findJSFiles(path.join(__dirname, `../routes/index`));
// indexRoute.forEach(file => {
//     let currentRoute = require(file);
    
//     log(`${filterJsFileName(file)} loaded`);
//   });


let loadedFiles = [];

indexRoute.forEach(file => {
  try {
    let currentRoute = require(file);
    app.use('/', currentRoute);
    loadedFiles.push({ file: filterJsFileName(file), status : `Loaded` });
  } catch (error) {
    loadedFiles.push({ file: filterJsFileName(file), status : `Error` });
    console.log(`err`, error);
  }
});
log(chalk.green("<==========<  Route Loader  >==========>"))

console.table(loadedFiles);

