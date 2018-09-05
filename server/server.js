const express     = require('express');
const app         = express();
const path        = require('path');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const cors        = require('cors');
const jwt         = require('jsonwebtoken');

const config      = require('./config');
const User        = require('./models/user');

//routers
const aduserRoutes = require('./routes/admin/user');
const adnewsRoutes = require('./routes/admin/news');
const adproductsRoutes = require('./routes/admin/products');


const port = process.env.PORT || 3000;
mongoose.connect(config.database,{ useNewUrlParser: true }); // connect to database

app.use(express.static(path.join(__dirname, 'public')));
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(cors());


// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});
// app.post('/myupload',upload,function(req,res,next){
//   console.log(req.file.path)
// })

app.use('/admin', aduserRoutes);
app.use('/admin',adnewsRoutes);
app.use('/admin',adproductsRoutes);
// API ROUTES -------------------
// we'll get to these in a second

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
