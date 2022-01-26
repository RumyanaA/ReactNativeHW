const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
const routes = require('./Routes/Routes');

app.use(cors());
app.use('/', routes);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
