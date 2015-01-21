
function uploadImg(info, tab){
	//alert(info.srcUrl);
	// var purl= info.pageUrl.match(/^(http:\/\/)?([^\/]+)/)[0];
  var purl= info.pageUrl.match(/^((http:\/\/)|(https:\/\/))?([^\/]+)/)[0];
	if(purl=='https://fyg-xiazhiyu.c9.io')
	{
    chrome.contextMenus.update(contextMenuID,{"title":"删除"});
		alert("不可在此网站使用");
	}else{
    var i = new Image();
    i.src = info.srcUrl;
    i.onload = function(){
      var naturalWidth = i.width;
      var naturalHeight = i.height;
      if(naturalWidth>192){
        naturalHeight = Math.round(naturalHeight*192/naturalWidth);
        naturalWidth = 192;
      }
      // alert(naturalWidth);
      // alert(naturalHeight);
      var xmlhttp;
      xmlhttp=new XMLHttpRequest();
      xmlhttp.open("POST","https://fyg-xiazhiyu.c9.io",true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.setRequestHeader("key", "fyg");
      //xmlhttp.setRequestHeader("Content-length", paramsSend.length);
      xmlhttp.setRequestHeader("Connection", "close");
      xmlhttp.send("src="+info.srcUrl+"&pageUrl="+info.pageUrl+"&width="+naturalWidth+"&height="+naturalHeight);
    }
	}
}


function register(){
	
	chrome.windows.create(
	{
	url:'register.html', 
    width: 500,
    height: 500,
   // minWidth: 800,
    //minHeight: 600,
    left: 100,
    top: 100,
    type: 'popup'
  });

}
// alert("add");
function login(){
	/*
	var xmlhttp;
	xmlhttp=new XMLHttpRequest();
	xmlhttp.open("POST","http://surprise.xyjp.net/photogather/login.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	//xmlhttp.setRequestHeader("Content-length", paramsSend.length);
	xmlhttp.setRequestHeader("Connection", "close");
	xmlhttp.send("userID="+info.srcUrl+"&password="+info.pageUrl);
	
	alert("tset login");*/
}
function updateTitleText(info, tab){
  alert(info);
  var purl= info.pageUrl.match(/^((http:\/\/)|(https:\/\/))?([^\/]+)/)[0];
  if(purl=='https://fyg-xiazhiyu.c9.io'){
    chrome.contextMenus.update(contextMenuID,{"title":"删除", "onclick": deleteImg});
  }else{
    chrome.contextMenus.update(contextMenuID,{"title":"收集", "onclick": uploadImg});
  } 
}
// alert(info);
// chrome.runtime.onInstalled.addListener(register);
// chrome.runtime.onStartup.addListener(login);
// chrome.contextMenus.create({"title": "收集","contexts":["image"], "onRequest": deleteImg});
var contextMenuID = chrome.contextMenus.create({"id":"test","title": "收集","contexts":["image"], "onclick": uploadImg});
// chrome.contextMenus.update("test",{"title":"删除3", "onclick": deleteImg});
// chrome.contextMenus.update(contextMenuID,{"onRequest":updateTitleText});
// updateTitleText(info, tab);
// chrome.contextMenus.update(getImgId,{"title": "test"});

