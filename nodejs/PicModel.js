var mongoose = require('mongoose');
var connect = mongoose.connect('mongodb://'+process.env.IP+'/mypic'); //database urlは状況に応じて変更してください。
var Schema = mongoose.Schema;
var picSchema = new Schema({
  key: String,
  src:  String,
  pageUrl: String,
  width: Number,
  height: Number,
  addDateTime: Date
});

var Pic = mongoose.model("Pic", picSchema,"pic");

var PicDAO = function(){};

PicDAO.prototype.save = function(key, element, callback){
  element.key = key;
  Pic.find({url: element.src},function(err,docs){
    if(docs.length){
       callback(-1);
    }else{
      element.addDateTime = new Date();
      var domain = new Pic(element);
      domain.save(function(err,_id){
        callback(err,_id);
      });
    }
  }); 
}

PicDAO.prototype.find = function(key,callback){  
  Pic.find({"key":key}).sort({addDateTime: 'desc'}).exec(function(err, pics) {
     callback(err,pics);
  });
}
PicDAO.prototype.deleteByeId = function(_id, callback) {
  Pic.findByIdAndRemove(_id, function(err){
    // console.log();
    callback(err);
  });
};
module.exports = new PicDAO();