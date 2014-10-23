exports = module.exports = {
  name: "Post Tool",
  description: "Project management toolkit for clients of Post Tool",
  config: require('./config'),
  models: require('./models'),
  workflow: require('./workflow'),
  permissions: require('./permission')
};

var current = require('../../currentcms');
var utils = require('../../currentcms/lib/utils');

// node cms admin ... & node cms start ... TODO could be baked into library
if (process.argv.length > 2 && process.argv[2] == 'admin') {
  //console.log(module.exports)
  var mongoose = require('mongoose');
  var prompt = require('prompt');
  prompt.message = "create admin > ".cyan;
  prompt.delimiter = "".grey;
  var prompt_schema = {
    properties: {
      name: {required: true},
      email: {required: true},
      password: {hidden: true},
      confirm: {hidden: true}
    }
  };
  prompt.start();
  prompt.get(prompt_schema, function (err, result) {
    if (result.password != result.confirm)
      throw new Error('Password mismatch!');
    var cms = new current.Cms(module.exports);
    var User = cms.meta.model('User');
    utils.save_user(new User(), {name: result.name, email: result.email, email_verified: true,
      password: result.password, active: true, admin: true }, function (err, user) {
      if (err)
        throw new Error(err);
      console.log('Complete', user);
    });
  });
} else if (process.argv.length > 2 && process.argv[2] == 'start') {
  var app = require('express')();
  var cms = new current.Cms(module.exports);
  app.use(cms.app);
  // app.use(express.static(__dirname + '/public')); // if we have custom fields
  app.listen(cms.config.serverPort);
}

