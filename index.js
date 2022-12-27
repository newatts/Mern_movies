const mongoose = require('mongoose');
const express = require('express')  ;
const validate = require('./validate.js');
const moviesRouter = require('./routes/movies.js');
const app = express() ; 
const PORT = process.env.PORT||3000;
const DATABASE_URL = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017';

app.use(express.static('public'));

mongoose.set("strictQuery", true);

mongoose.connect(DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));  

app.use(express.json());

app.use('/movies',moviesRouter);

app.listen(PORT, ()=>console.log('Express server listening on port .... ' + PORT));

