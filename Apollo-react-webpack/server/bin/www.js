const app = require('../app');
const http = require('http');
const glob = require("glob")

// glob("**/*.js", function (er, files) {
//   if(er) console.log('error')
//   else console.log(files)
//   })



http.createServer(app).listen('3000');