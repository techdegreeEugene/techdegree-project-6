const express = require('express');
const data = require('./data.json');
const app = express();

app.set('view engine', 'pug');

app.use('/static',express.static('public'));

app.get('/',(req,res) => {
    res.render('index',data);
});

app.get('/about',(req,res) => {
    res.render('about');
});

app.get('/projects/:id',(req,res,next) => {
    if ( req.params.id >= data.projects.length ) {
        const err =  new Error('I have not created this project yet.');
        err.status = 500;
        console.log(err.status + ': I have not created this project yet.');
        return next(err);
    }
    res.render('project',{
        project: data.projects[req.params.id]
    });
});

app.use((req,res,next) => {
    const err =  new Error('The URL or its content (such as files or images) was either deleted or moved (without adjusting any internal links accordingly');
    err.status = 404;
    console.log(err.status + ': The URL or its content (such as files or images) was either deleted or moved (without adjusting any internal links accordingly');
    next(err);
});

app.use((err,req,res,next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('App running on localhost:3000');
});