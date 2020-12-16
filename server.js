const express = require('express');
const app = express();
const port = 3000;
const usersRouter = require('./routes/user.routes.js');
const bodyParser = require('body-parser');

app.use('/static', express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', usersRouter);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});