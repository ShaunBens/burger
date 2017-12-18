//We must require our connection.js to link our database to our functions.
var connection = require("./connection.js");

var orm = {
    displayAll: function(tableName, cb) {
        var queryString = "SELECT * FROM ?? ORDER BY ??";
        connection.query(queryString, [tableName], function(err, result) {
            if (err) { return result.status(500).end(); }
            cb(err, result);
        });
    },

    createBurger: function(tableName, colName, valueName, cb) {
        var queryString = "INSERT INTO ?? (??) VALUES (?)";
        connection.query(queryString, [tableName, colName, valueName], function(err, result) {
            if (err) { return result.status(500).end(); }
            cb(err, result);
        });
    },

    updateCondition: function(tableName, setCol, setVal, idCol, idVal, cb) {
        var queryString = "UPDATE ?? SET ??=? WHERE ??=?";
        connection.query(queryString, [tableName, setCol, setVal, idCol, idVal], function(err, result) {
            if (err) { return result.status(500).end(); }
            cb(err, result);
        });
    }
};

module.exports = orm;
