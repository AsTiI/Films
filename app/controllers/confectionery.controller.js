const Cards = require("../models/confectionery.model.js");

// Retrieve all soft drinks from the database.
// exports.findAll = (req, res) => {
//     Confectionery.getAll((err, data) => {
//         if (err)
//             res.status(500).send({
//                 message:
//                     err.message || "Some error occurred while retrieving customers."
//             });
//         else res.send(data);
//     });
// };
exports.findAll = (req, res) => {
    Cards.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    })
};
