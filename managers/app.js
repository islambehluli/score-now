var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var mongoose = require("mongoose");
 var Handlebars = require("hbs");
var exphbs  = require('express-handlebars');
const session    = require("express-session");
const MongoStore = require("connect-mongo")(session);
var app = express();
require("dotenv").config()


app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
Handlebars.registerPartials(__dirname + '/views/partials');



mongoose.connect('mongodb://localhost/football', { useNewUrlParser: true });
var indexRouter = require("./routes/index");
var usersRouter = require('./routes/users');
var signInRouter = require("./routes/signInPage");
var registationPageRouter = require("./routes/registrationPage");
var liveRouter = require("./routes/live");
var competitionRouter = require("./routes/competition");
var videosRouter = require("./routes/videos");
var logOutRouter = require("./routes/logOut");
var personalPageRouter = require("./routes/personalPage");
var messagesRouter = require("./routes/messages")



// view engine setup
// app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SECRETS,
  cookie: { maxAge: 60 * 60 * 24 * 1000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

app.use("*",(req, res, next) => {
  if(req.session.user) {
    res.locals.user = req.session.user
    res.locals.loggedIn = true
  }
  next()
})
app.use('/',indexRouter);
app.use('/users', usersRouter);
app.use("/", signInRouter);
app.use("/", registationPageRouter);
app.use("/",liveRouter);
// app.use('/', nextMatchesRouter);
app.use("/", competitionRouter);
app.use("/",videosRouter);
app.use("/", logOutRouter);
app.use("/",personalPageRouter);
app.use("/", messagesRouter)
// app.use("/", laLigaRouter)
// app.use("/", bundesligaRouter)
// app.use("/", topScorersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.hbs');
});

module.exports = app;
