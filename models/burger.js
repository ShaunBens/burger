var orm = require("../config/orm.js");

var burger = {
    all: function(cb) {
        orm.displayAll("burgers", function(res) {
            cb(res);
        });
    },

    create: function(name, cb) {
        orm.createBurger("burgers", ["burger_name", "devoured"], [name, false], cb);
    },

    update: function(id, cb) {
        var condition = "id=" + id;
        orm.updateCondition("burgers", {
            devoured: true
        }, condition, cb);
    },

    // del: function(cb) {
    //     orm.delete("burgers", function(res) {
    //         cb(res);
    //     });
    // }
};

module.exports = burger;
