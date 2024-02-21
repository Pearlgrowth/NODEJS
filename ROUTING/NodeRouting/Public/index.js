const http = require('http');
const fs = require('fs');
const server =http.createServer((req, res)=>{
const home = fs.readFileSync('./home.html','utf8')
if(req.url === '/'){
res.write(home)
}
const signup = fs.readFileSync('./signUp.html','utf8')
if(req.url === '/signup'){
    console.log(here)
res.write(signup)
}
res.end()
})
server.listen(3000)