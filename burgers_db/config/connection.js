var mysql = require("mysql");

module.exports = function(connection) {
    mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "burgers_db"
    });
};
