var express     = require('express');
var app         = express();
var path        = require('path');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var cors        = require('cors');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./models/user'); // get our mongoose model


const fileUpload = require('express-fileupload');

var aduserRoutes = require('./routes/admin/user');
var adnewsRoutes = require('./routes/admin/news');
var adproductsRoutes = require('./routes/admin/products');

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(config.database,{ useNewUrlParser: true }); // connect to database
//app.set('superSecret', config.secret); // secret variable
app.use(express.static(path.join(__dirname, 'public')));
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));
app.use(cors());
app.use(fileUpload());
// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

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
