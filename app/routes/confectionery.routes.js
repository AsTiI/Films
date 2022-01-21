module.exports = app => {
    const cards = require("../controllers/confectionery.controller.js");

    // Retrieve all soft drinks
    app.get("/conf", cards.findAll);
};