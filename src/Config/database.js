const mysql = require("mysql");

const dbConnection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "crud-node",
});

dbConnection.connect((err) => {
	if (err) {
		throw err;
	}

	console.log(` Base de datos conectada`);
	console.log("|------------------------------------|");
});

module.exports = dbConnection;
