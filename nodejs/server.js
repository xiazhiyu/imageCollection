//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');

// var async = require('async');
var mongoose = require('mongoose');
// var socketio = require('socket.io');
var express = require('express');
var PicModel = require('./PicModel');
var bodyParser = require('body-parser');
// var multer = require('multer'); 

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(multer()); // for parsing multipart/form-data

// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1');
//     // res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });

app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/:key',function(req,res){
  res.render('index');
});

app.delete('/:_id',function(req,res){
  // console.log(req.params._id);
  PicModel.deleteByeId(req.params._id,function(err){
    if(err){
      res.status(500).send('削除失敗しました。');
    }else{
      res.send("ok");
    }  
  })
});

app.get('/:key/json',function(req,res){

  var key = req.param('key');
  if(!key){
    res.status(500).send('keyを指定されていない');
    return;
  };
  
  PicModel.find(key, function(err,pics){
    if(pics.length>0){
      res.send({"total":pics.length+1 ,"result":pics});
    }
  });
});


// var middleware = [loadForum, loadThread];

app.post('/',function(req,res,next){
  // console.log(req.get('key'));
  var key = req.get('key');
  if(!key){
    res.status(500).send('keyを指定されていない');
    return;
  };
  PicModel.save(key,req.body,function(err,id){
  if(err){
      if(err == -1){
        res.status(500).send('同じURLの画像がすでに存在しています。');
      }else{
        res.status(500).send('保存を失敗しました。');
      }
    }else{
      res.send(id);
    }    
  });
});

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//

var server = http.createServer(app);


app.use(express.static(path.resolve(__dirname, 'client')));

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  // console.log("Chat server listening at", addr.address + ":" + addr.port);
});
