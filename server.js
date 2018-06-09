var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var port = process.env.PORT || 3000;

app.get('/', function(req, res, next){
  res.status(200).render('homePage');
});

app.get('/home', function(req, res, next){
  res.status(200).render('homePage');
});

app.get('/joinus', function(req, res, next){
  res.status(200).render('joinusPage');
});

var temp = [2];
temp[0]={
  companyName: "Something",
  companyContent: "More stuff",
  fullURL: "this",
  niceURL: "that",
  imagePath: "images/amazon.png"
}
temp[1]={
  companyName: "Something More",
  companyContent: "Even More stuff",
  fullURL: "thisisim",
  niceURL: "that is more im",
  imagePath: "images/eecs.png"
}


app.get('/partnerships', function(req, res, next){
  res.status(200).render('collabPage',{
    company: temp
  });
});
var comment =[2]
comment[0] =  {
  author: "bob",
  commentContent: "asdklfhewaejasjdbfjasd"
}
comment[1] =  {
  author: "Susan",
  commentContent: "Great photo!"
}
var tempt = [2];
 tempt[0] = {
  title: "this blog",
  imgpath: "images/outreach.png",
  content: "this is a little bit of text"
}
tempt[1] = {
 title: "this  is also great",
 imgpath: "images/amazon.png",
 content: "even more text to test this thing"
}
app.get('/blog', function(req, res, next){
  res.status(200).render('blogPage',{
    blogInfo: tempt,
    comment: comment
  })
});
/*app.get('/twits/:n', function(req, res, next){
  if(req.params.n>-1 && req.params.n<8){
    res.status(200).render('twitsPage',{
      twits: [twitsObjects[req.params.n]],
      showButton: false
    });
  }
  else{
    next();
  }
});*/

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).render('404Page');
});


app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
