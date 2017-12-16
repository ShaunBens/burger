//We must require our connection.js to link our database to our functions.
var connection = require("./connection.js");

function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    // column1=value, column2=value2,...
    var arr = [];

    for (var key in ob) {
        if (ob[key]) {
            arr.push(key + "=" + ob[key]);
        }
    }

    return arr.toString();
}

var orm = {
    //Show all the burgers from our database.
    all: function(tableInput, cb) {
        var queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    //Creates a new entry into burgers_db
    create: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    //Update the sql database with devoured = true
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    delete: function(table, cb) {
        var queryString = "DELETE * FROM " + table + ";";
        connection.query(queryString, function(err, res) {
            if (err) {
                return res.status(500).end();
            }
            else if (res.affectedRows == 0) {
                return res.status(404);
            }
            else {
                res.status(200).end();
            }

        });
    }
};

module.exports = orm;
