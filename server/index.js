const express = require('express');
const bodyParder = require('body-parser');
const router = require('./router/index.js');

const app = express();

app.use(bodyParder({
    extended: true
}));
app.use(bodyParder.json());

app.use('/api', router);

const port = process.env.PORT || 5001;
app.listen(port, () =>  console.log(`app listening on port ${port}!!`))