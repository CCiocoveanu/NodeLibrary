const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT;

const config = {
  user: 'library',
  password: 'RadovanU161192',
  server: 'hyperionlib.database.windows.net',
  database: 'NodeLibrary',

  options: {
    encrypt: true // Use this if you're on Windows Azure
  }
};

sql.connect(config).catch(err => debug(err));

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'library' }));
require('./src/config/passport.js')(app);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

app.set('views', 'src/views');
app.set('view engine', 'ejs');

const title = 'Library';
const nav = [
  { link: '/books', title: 'Books' },
  { link: '/add', title: 'Add New Entry' }
];
const bookRouter = require('./src/routes/bookRoutes')(title, nav);
const addRouter = require('./src/routes/addRoutes')(title, nav);
const authRouter = require('./src/routes/authRoutes')(title, nav);

app.use('/books', bookRouter);
app.use('/add', addRouter);
app.use('/auth', authRouter);
app.get('/', (req, res) => {
  res.render(
    'index',
    {
      title,
      nav
    }
  );
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});
