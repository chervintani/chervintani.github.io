const express = require('express')
const app = express()
const port = process.env.PORT||8080;
const path = require('path')
const http = require('http').Server(app)

app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

http.listen(port, ()=>{
    console.log("Initializing server at port "+port)
});