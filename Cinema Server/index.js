const express = require("express");
require('express-async-errors');
const app = express();

require("./Startup/UsersDB")();
require("./Startup/fetchData")
require('./startup/routes')(app);

const PORT = process.env.PORT || 8000;


app.listen(
    PORT,
    () => console.log(`app listening on port ${PORT}`)
    )
