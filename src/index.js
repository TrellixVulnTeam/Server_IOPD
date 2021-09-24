const path = require('path');
const express = require('express');
const app = express();
const port=3001; 
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const env=require('dotenv')
const cors=require('cors')

//connect to db
db.connect();
env.config()
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public',express.static(path.join(__dirname, 'uploads')));
//HTTP Logger
app.use(morgan('combined'));
app.use(methodOverride('_method'));
app.use(cors())
// template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
//console.log(path.join(__dirname, 'resources/views'));

// Routes Init
route(app);
app.listen(port,() => {
    console.log(`App listening at http://localhost:${port}`);
});
