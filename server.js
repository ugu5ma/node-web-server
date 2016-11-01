const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//heroku: get port to run the web-server.
//If the env is not available use Port 3000
const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('not able to access server.log')
    }
  })
 next();
});

// app.use((req, res, next) =>{
//  res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
 return new Date().getFullYear()

});

hbs.registerHelper('screamIT', (text) =>{
  return text.toUpperCase();

});

app.get('/', (req, res) =>{
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome here',


  });
});
app.get('/about', (req, res) =>{
   res.render('about.hbs', {
     pageTitle: 'About Page',
   });
});

app.get('/projects', (req, res) =>{
   res.render('projects.hbs', {
     pageTitle: 'Projects Page',
   });
});

app.get('/bad', (req, res) =>{

 res.send({
   Error: 'Error-Page-Bad',
   Bad: [
     'This',
     'Page'
   ]
 });
});


app.listen(port, () => {
  console.log(`Server up and Running on port ${port}`);
});
