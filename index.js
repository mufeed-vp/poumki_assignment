const logger = require('morgan');
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const env = require('./env')

const registrationForm = require('./services/registrationForm')

const app = express();


app.use(logger('dev'));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

var cors = require('cors');

var originWhitelist = ['http://localhost:3000','http://localhost:3001']; //react dashboard URL

var corsOptions = {
  origin: function(origin, callback){
    var isWhitelisted = originWhitelist.indexOf(origin)!== -1;
    callback(null, isWhitelisted);
  },
  Credential: true
}

app.use(cors(corsOptions));


var db = mongoose.connection;

try {
  
  db.on('connecting', () => console.log('connecting to MongoDB...'));
  
  db.on('error', (error) => {
    
    let serverError = `Error in MongoDb connection:  ${error}`
    
    console.log(serverError);
    mongoose.disconnect();
  });
  
  db.on('connected', () => console.log('MongoDB connected.'))
  db.once('open', () => console.log('MongoDB connection opened.'))
  db.on('reconnected', () => console.log('MongoDB reconnected!'))
  
  db.on('disconnected', () => {
    console.log('MongoDB disconnected, connect again');
    // mongoose.connect(env.dbString, { useFindAndModify:false, useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology:true });
  });
  
  mongoose.connect(env.dbString, {  useNewUrlParser: true, useUnifiedTopology:true });
  
  const server = app.listen(process.env.PORT || 8002, function () {
    console.log("API server started on http://localhost:" + server.address().port);
  });

} catch (error) {
  console.log(error)
}


app.use('/', registrationForm)

module.exports = app