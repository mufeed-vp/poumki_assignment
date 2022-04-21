const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');


const app = express();


var originsWhitelist = [
    'http://localhost:3000', //React Dashboard URL
];


var db = mongoose.connection;

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
  mongoose.connect(env.dbString, { useFindAndModify:false, useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology:true });
});

mongoose.connect(env.dbString, { useFindAndModify:false, useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology:true });

const server = app.listen(process.env.PORT || 8000, function () {
  console.log("API server started on http://localhost:" + server.address().port);
});

module.exports = app