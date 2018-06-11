var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var MongoClient = require('mongodb').MongoClient;
var app = express();

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || '27017' ;
var mongoUsername = process.env.MONGO_USERNAME;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB_NAME;

var mongoURL="mongodb://"+ mongoUsername+ ":"+ mongoPassword+ "@"+ mongoHost+ ":"+ mongoPort+ "/"+ mongoDBName;

var mongoDB =null;

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
  var companiesCollection=mongoDB.collection('companies');
  companiesCollection.find().toArray(function (err, companies) {
      if (err) {
            res.status(500).send("Error fetching companies from DB.");
	 } else {
  		res.status(200).render('collabPage',{
    			company: companies
  		});
	}
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

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).render('404Page');
});


/*app.listen(port, function () {
  console.log("== Server is listening on port", port);
});*/

MongoClient.connect(mongoURL, function (err, client) {
  if (err) {
      throw err;
    }
  mongoDB = client.db(mongoDBName);
    app.listen(mongoPort, function () {
        console.log("== Server listening on port", mongoport);
	  });
});
