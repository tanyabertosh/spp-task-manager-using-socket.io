var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
var app = express();
var socket = require('socket.io');
// const siofu = require('socketio-file-upload');

app.use(cookieParser());

app.use(express.static(__dirname + '/public'));
// app.use(siofu.router);

const port = process.env.PORT || 3000

// устанавливаем движок EJS для представления
app.set('views','./views');
app.set('view engine','ejs');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())


// app.get('/download/:file',(req, res) => {
//   var fileName = req.params.file;
//   var fileLocation = __dirname + "/uploads/"+fileName;
//   var file = fs.readFileSync(fileLocation,'utf8');
//   res.sendFile(fileLocation);
// });

app.get('/', function(req, res) {
  res.render('pages/index');
  
});


app.post("/", function (request, response) {
  
});


var server = app.listen(port, function(){
  console.log('Приложение запущено! Смотрите на http://localhost:3000')
});

var io = socket(server);
io.set('transports', ['polling', 'websocket']);

const taskRoutes=require('./api/routes/tasks')(io);
app.use('/tasks',taskRoutes);

const userRoutes=require('./api/routes/user');
app.use('/user',userRoutes); 

// const io = socketIo(server, { path: "/socket/tasks" });

// setupSocket(io);




// io.on('connection', function (socket) {
//   console.log('made connection',socket.id);
//   // socket.emit('news', { hello: 'world' });
//   // socket.on('my other event', function (data) {
//   //   console.log(data);
//   // });
// });