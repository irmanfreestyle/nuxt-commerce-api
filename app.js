let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let logger = require('morgan');
let router = require('./app/routes');
let path = require('path');
let db = require('./app/models');
let dbConfig = require('./app/config/db.config');
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'))
app.use('/public', express.static(path.join(__dirname, 'public')));

// let whitelist = ['http://localhost:3000/'];
// let corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(corsOptions));
app.use(cors());

db.mongoose
  .connect(`mongodb://localhost/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

router(app);

module.exports = app;