const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
var app = express();
var port = process.env.PORT || 3000;
app.set('view engine','hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method}: ${req.url}` + '\n';
  console.log(log);
  fs.appendFile('server.log', log, (err) => {
    if(err){
      console.log("Unable to write log");
    }
    next();
  });
});

/*app.use((req, res, next) => {
  res.render('maintanance.hbs',{
    pageTitle: 'We are working now',
    pageContent: 'Under maintenance'
  });
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('upperTxt', (text) => {
  return text.toUpperCase();
});

hbs.registerHelper('getFullYear', () => {
  return new Date().getFullYear();
});

app.get('/',(req,res) => {
  //res.send("<h3>Home Page</h3>");
  res.render('home.hbs',{
    pageTitle: 'Home page',
    pageContent: 'Welcome'
  });
});

app.get('/about',(req,res) => {
  //res.send("About Page");
  res.render('about.hbs',{
    pageTitle: 'About page',
    pageContent: 'About page content'
  });
});

app.get('/bad',(req,res) => {
  res.send({
    error: "Unable serve for this request."
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);}
);
