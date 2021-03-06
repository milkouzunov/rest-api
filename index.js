const express = require('express');

const PORT = require('./config/config').PORT;

const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

require('dotenv').config();

const app = express();

require('./config/setupExpress')(app);
require('./config/setupMongoose')();

app.use('/api', routes);
app.use(errorHandler);


app.listen(PORT, console.log.bind(console, `Server is listening on port ${PORT}`));
