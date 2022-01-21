const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');

const path = require('path');

const app = express();

let token = jwt.sign({ foo: 'bar' }, 'shhhhh');

app.use('/style', express.static('./public/styles/dist/'));
app.use('/img', express.static('./public/images/'));
app.use('/js', express.static('./public/scripts/dist/'));
app.use('/fonts', express.static('./public/fonts/'));
app.use('/films', express.static('./public/fimls'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// simple routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/index.html'));
});

app.get("/wt", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/viewing.html'));
});

// app.get("/login", (req, res) => {
//     res.sendFile(path.join(__dirname + '/pages/login.html'));
// });
//
// app.get("/registration", (req, res) => {
//     res.sendFile(path.join(__dirname + '/pages/register.html'));
// });


// require("./app/routes/customer.routes.js")(app);
// require("./app/routes/vf.routes.js")(app);
// require("./app/routes/milk.routes.js")(app);
// require("./app/routes/mfs.routes.js")(app);
require("./app/routes/confectionery.routes.js")(app);
// require("./app/routes/softDrinks.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});