var express = require('express');
//server module
var app = express();
var pg = require('pg');
//will parse through the data I am sending and receieving.
var bodyParser = require('body-parser');
//string to define connection to pg.
var connectionString = 'postgres://postgres:grandcircuspg@localhost:5432/postgres';
//creates client based on connection to pg.
var client = new pg.Client(connectionString);

var config = {
  user: 'postgres',
  database: 'postgres',
  password: 'grandcircuspg',
  host: 'localhost',
  port: 5432,
  max: 100,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);
// bodyParser converts to JSON and makes it accessible.
app.use(bodyParser.json({ extended: true}));
app.use(express.static(__dirname + '/public'));

// Server Route for Get Request
app.get('/api/items', function(req, res, next) {
  var items = [];

  pg.connect(connectionString, function(err, client, done){
    var query = client.query('SELECT * FROM shoppingcart');

    query.on('row', function(row) {
      items.push(row);
    });
    query.on('end', function() {
      console.log(items);
      client.end();
      return res.json(items);
    });

  });
});

// Server Route for DELETE Request
app.delete('/api-remove-item/:id', function(req, res, next) {
  var items = [];
  var id = req.params.id;

  pg.connect(connectionString, function(err, client, done) {

    client.query('DELETE FROM shoppingcart WHERE id=($1)', [id]);

    var query = client.query('SELECT * FROM shoppingcart');

    query.on('row', function(row) {
      items.push(row);
    });

    query.on('end', function() {
      client.end();
      return res.json(items);
    });
  });
});

// Server Route for POST Request
app.post('/api-add-item', function(req, res, next) {
  var items = [];
  var data = {
    product: req.body.product,
    price: req.body.price
  }

  pg.connect(connectionString, function(err, client, done) {
    client.query('INSERT INTO shoppingcart(product, price) values($1, $2)', [data.product, data.price]);

    var query = client.query('SELECT * FROM shoppingcart');

    query.on('row', function(row) {
      items.push(row);
    });

    query.on('end', function() {
      client.end();
      return res.json(items);
    });
  });
});

// Server Route for PUT Request
app.put('/api-change-item/:id', function(req, res, next) {
  var items = [];
  var data = {
    product: req.body.product,
    price: req.body.price
  };
  var id = req.params.id;

  pg.connect(connectionString, function(err, client, done) {
    client.query('UPDATE shoppingcart SET product=($1), price=($2) WHERE id=($3)', [data.product, data.price, id]);

    var query = client.query('SELECT * FROM shoppingcart');

    query.on('row', function(row) {
      items.push(row);
    });

    query.on('end', function() {
      client.end();
      return res.json(items);
    });
  });
});


var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('PostgreSQL server running at http://localhost:%s', port);
});
