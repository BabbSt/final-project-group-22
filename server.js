var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser' );
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
app.use(bodyParser.json());

var port = process.env.PORT || 3028;

app.get('/', function(req, res, next){
  res.status(200).render('homePage');
});

app.get('/home', function(req, res, next){
  res.status(200).render('homePage');
});

app.get('/joinus', function(req, res, next){
  res.status(200).render('joinusPage');
});

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

app.get('/blog', function(req, res, next){
  var blogCollection=mongoDB.collection('blogContent');
  var commentCollection=mongoDB.collection('comments');
  blogCollection.find().toArray(function (err, blogContent) {
     	if(err){
            	res.status(500).send("Error fetching blog content from DB.");
	}else{
  		commentCollection.find().toArray(function (err, comments) {
      			if (err) {
            		res.status(500).send("Error fetching blog comments from DB.");
	 		} else {
  				res.status(200).render('blogPage',{
    					blogInfo: blogContent,
    					comment: comments
  				});
			}
 		 });
	}
  });
});

app.post('/blog/addComment' , function (req, res, next) {
    console.log("body: "+req.body+" author: "+req.body.author+" content: "+req.body.commentContent);
    if (req.body && req.body.author && req.body.commentContent) {
  	var commentCollection=mongoDB.collection('comments');
	commentCollection.insertOne({
	      author: req.body.author,
	      commentContent: req.body.commentContent
	});
	} else {
	    res.status(400).send("Request needs a JSON body with author and comment.")
	}
app.get('/meetofficers', function(req, res, next){
  res.status(200).render('meetofficersPage',{
	content: officerData
  });
});

app.get('/aboutus', function(req, res, next){
  res.status(200).render('aboutusPage');
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
    app.listen(port, function () {
        console.log("== Server listening on port", port);
	  });
});
