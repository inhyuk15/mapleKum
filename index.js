const express = require('express');

const app = express();

const port = process.env.PORT || 5000;
app.listen(port);

app.use("/api/data", function(req, res) {
	res.json({ greeting: "Hello World" });
});

console.log(`server running at http ${port}`);


const path = require('path');

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html')
});
