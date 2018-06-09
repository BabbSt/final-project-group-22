var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

var port = process.env.PORT || 3000;

/*app.get('/', function(req, res, next){

});*/

app.get('/joinusPage', function(req, res, next){
  res.status(200).render('joinusPage');
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
  //res.status(404).render('404');
});


app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
