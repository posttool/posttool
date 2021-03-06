var fs = require('fs');
var cluster = require('cluster');
var useCluster = false;

if (useCluster && cluster.isMaster) {
  var cpuCount = require('os').cpus().length;
  for (var i = 0; i < cpuCount; i += 1) {
    cluster.fork();
  }
  cluster.on('exit', function (worker) {
    console.log('Worker ' + worker.id + ' died');
    cluster.fork();
  });

} else {
  var express = require('express');
  var bodyParser = require('body-parser');
  var current = require('../currentcms');
  var cms = new current.Cms(require('./cms'));
  var app = express();
  app.use(bodyParser.urlencoded({ extended: false }))
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));

//  MongoClient.connect(config.mongo, function (err, db) {
//    if (err) throw err;
//
//    var users = db.collection('user');
//    var mails = db.collection('mail');
//    var relationships = db.collection('relationship');

  app.get('/', function (req, res, next) {
    res.render('index.ejs');
  });

  app.get('/company', function (req, res, next) {
    res.render('index.ejs');
  });

  app.get('/process', function (req, res, next) {
    res.render('process.ejs');
  });

  app.get('/contact', function (req, res, next) {
    res.render('contact.ejs');
  });

  var nodemailer = require('nodemailer');
  app.post('/message', function (req, res, next) {
    var transporter = nodemailer.createTransport();
    transporter.sendMail({
      from: req.body.name + '<' + req.body.email+ '>',
      to: 'david@posttool.com',
      subject: "[posttool] "+req.body.company,
      text: req.body.message
    }, function(err, r){
      if (err) return next(err);
      res.json({msg:'ok', data: req.body});
    });
  });

  app.get('/clients/', function (req, res, next) {
    var client_id = '544974b3cbcc2a000036aedb';
    cms.meta.model('Project').find({clients: {$in: [client_id]}}).populate('presentations').exec(function (err, projects) {
      res.render('clients.ejs', {projects: projects});
    })
  });

  app.get('/client/p/:id', function (req, res, next) {
    // todo check to see that you are in the container project
    cms.meta.model('Presentation').findOne({_id: req.params.id}).populate('slides comments').exec(function (err, presentation) {
      res.render('presentation.ejs', {presentation: presentation});
    })
  });


  app.listen(3001);
  console.log("ready")
//  });
}

//process.on('uncaughtException', function (err) {
//  console.error('uncaughtException:', err.message);
//  console.error(err.stack);
//});

//server.cms/app.on('error', function (err) {
//  console.error(err);
//});

