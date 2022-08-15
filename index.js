const express = require('express');

const app = express();
const usersRouter = require('./routes/users');

app.use('/users', usersRouter);

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`server running at http ${port}`);





//######################
const path = require('path');

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


