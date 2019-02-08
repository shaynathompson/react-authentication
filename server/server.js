const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 4200;
const cors = require('cors');


const config = require('./database/DB');
const UserRouter = require('./routes/User');

mongoose.connect(config.DB).then(
    () => {console.log('Inzept 3D Database is connected') },
    err => { console.log('Unable to connect to the database' +err)
});

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/user', UserRouter);

app.listen(PORT, function(){
  console.log('Server is running on Port: ',PORT);
});

module.exports = app;