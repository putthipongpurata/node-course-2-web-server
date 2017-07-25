const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();
app.use(favicon(__dirname + '/favicon.ico'));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next){
	let now = new Date().toString();
	let log = `${now} : ${req.method} ${req.url}`;
	fs.appendFile('server.log', log + '\n',(err) => {
		if(err){console.log('Unable to append to server.log.');}
	});
	next();
});

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear',() => {
	return new Date().getFullYear();
});

app.get('/',(req, res) => {
	res.render('home.hbs',{
		pageTitle: 'Home Pages'
	});
});
app.get('/about',(req, res) => {
	res.render('about.hbs',{
		pageTitle: 'About Pages'
	});
});
app.get('/project',(req, res) => {
	res.render('project.hbs',{
		pageTitle: 'Project Pages'
	});
});

app.listen(port,() => {
	console.log(`Server is up to port ${port}`);
}); 