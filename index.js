const express = require('express');
const app = express();
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
const usersRouter = require('/routes/users');
var compression = require('compression');

app.use(compression());
app.use('/users', usersRouter);

const port = process.env.PORT || 5000;
app.listen(port);

app.use(function(req, res, next) {
  next(createError(404));
});
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {}; 
  res.status(err.status || 500);
  res.render('error');
});

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// module.exports = app;
