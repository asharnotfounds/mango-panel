const path = require('path')
const fs = require('fs')

const findJSFiles = (dir, files = []) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
          findJSFiles(fullPath, files);
        } else if (path.extname(file) === '.js') {
          files.push(fullPath);
        }
      });
      return files;
}
function filterJsFileName(path) {
  return path.split("\\").pop();

}
module.exports.findJSFiles = findJSFiles
module.exports.filterJsFileName = filterJsFileName