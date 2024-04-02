const mongoose = require('mongoose0');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser : true , useUnifiedTopology: true  });

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('Connected')
});


//model
require('./Category');