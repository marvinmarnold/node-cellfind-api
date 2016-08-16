Package.describe({
  name: 'marvin:cellfind-api',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.4.0.1');
  api.use(['ecmascript', 'http', 'underscore', 'mongo']);

  Npm.depends({
    "xml2js": "0.4.17",
    "xmlbuilder": "8.2.2"
  });

  api.use(['aldeed:simple-schema', 'aldeed:collection2']);
  api.addFiles('server.js', 'server');
  api.mainModule('cellfind-api.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('cellfind-api');
  api.mainModule('cellfind-api-tests.js');
});
