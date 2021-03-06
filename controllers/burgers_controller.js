var express = require("express");
var burger = require("../models/burger.js");
var router = express.Router();

router.get("/", function(req, res) {
    res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
    burger.all(function(data) {
        var hbsObject = { burgers: data };
        res.render("index", hbsObject);
    });
});

router.post("/burgers/create", function(req, res) {
    burger.create(req.body.burger_name, function(result) {
        console.log(result);
        res.redirect("/");

    });
});

router.put("/burgers/update/:id", function(req, res) {
    var name = req.params.id;
    burger.update({ name }, function(result) {
        if (result.affectedRows === 0) {
            // If no rows were changed, then the ID must not exist, so 404
            return res.status(404).end();
        }
        else {
            res.status(200).end();
        }
    });
});

// router.delete("/burgers", function(req, res) {
//     burger.del(function(data) {
//         var hbsObject = { burgers: data };
//         res.render("index", hbsObject);
//     });
// });

module.exports = router;
