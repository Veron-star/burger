var connection = require("../config/connection");

function createQmarks(num) {
    var arr = [];
    for(var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function translateSql(obj) {
    var arr = [];
    for(var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if(typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value)
        }
    }
    return arr.toString();
}

var orm = {
    selectAll: function(table, cb) {
        var queryString = " SELECT * FROM " + table + ";";
        connection.query(queryString, function(err, results) {
            if (err) throw err;
            cb(results);
        });
    },
    insertOne: function(table, cols, vals, cb) {
        var queryString = " INSERT INTO " + table +
        " (" + cols.toString() + ") " +
        "VALUES (" +
        createQmarks(vals.length) +
        ") ";
        console.log(queryString);

        connection.query(queryString, vals, function(err, results) {
            if (err) {
                throw err;
            }
            cb(results);
        });
    },
    updateOne: function(table,objColVals, condition, cb) {
        var queryString = " UPDATE " + table + " SET " +
        translateSql(objColVals) +
        " WHERE " + condition;

        console.log(queryString);

        connection.query(queryString, function(err, results) {
            if (err) throw err;
            cb(results);
        });
    },
    deleteOne: function(table, condition, cb) {
        var queryString = " DELETE FROM " + table +
        " WHERE " + condition;

        console.log(queryString);

        connection.query(queryString, function(err, results) {
            if (err) throw err;
            cb(results);
        });
    }
};

module.exports = orm;