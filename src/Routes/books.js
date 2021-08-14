const express = require("express");
const dbConnection = require("../Config/database");

const router = express.Router();

router.get("/books", (req, res) => {
	const query = {
		sql: "SELECT idBook, b.name, isbn, a.idAuthor, a.name, a.country FROM books b INNER JOIN authors a ON a.idAuthor = b.idAuthor ORDER BY b.idBook ASC",
		nestTables: "_",
	};

	dbConnection.query(query, (err, rows) => {
		if (err) {
			return res.status(500).json({ msg: "Error al realizar la consulta" });
		}
		if (rows.length === 0) {
			return res.status(204).json({ msg: "No hay datos" });
		}

		let index = {};
		let result = [];

		rows.forEach((row) => {
			if (!(row.b_idBook in index)) {
				index[row.b_idBook] = {
					id: row.b_idBook,
					name: row.b_name,
					isbn: row.b_isbn,
					author: {},
				};
				result.push(index[row.b_idBook]);
			}

			index[row.b_idBook].author = {
				id: row.a_idAuthor,
				name: row.a_name,
				country: row.a_country,
			};
		});

		return res.status(200).json(result);
	});
});

router.get("/books/:id", (req, res) => {
	const { id } = req.params;

	const query = {
		sql: "SELECT idBook, b.name, isbn, a.idAuthor, a.name, a.country FROM books b INNER JOIN authors a ON a.idAuthor = b.idAuthor WHERE b.idBook = ?",
		nestTables: "_",
	};

	dbConnection.query(query, id, (err, row) => {
		if (err) {
			return res.status(500).json({ msg: "Error al realizar la consulta" });
		}
		if (row.length === 0) {
			// No se que status ponerle, por que me di cuenta de que cuando mando un 204 el postman no me muestra el mensaje
			return res.status(200).json({ msg: `No hay registros con el id: ${id}` });
		}

		const result = {
			id: row[0].b_idBook,
			name: row[0].b_name,
			isbn: row[0].b_isbn,
			author: {
				id: row[0].a_idAuthor,
				name: row[0].a_name,
				country: row[0].a_country,
			},
		};

		return res.status(200).json(result);
	});
});

router.post("/books", (req, res) => {
	const newBook = req.body;

	dbConnection.query("INSERT INTO books SET ?", newBook, (err) => {
		if (err) {
			if (err.errno === 1062) {
				return res.status(409).json({ msg: "El ISBN esta duplicado" });
			}
			if (err.errno === 1054) {
				return res
					.status(409)
					.json({ msg: "Uno de los campos esta mal escrito." });
			}
			if (err.errno === 1452) {
				return res.status(400).json({ msg: "Error con el ID del autor" });
			}
		}
		return res.status(201).json({ msg: "Libro agregado correctamente!" });
	});
});

router.put("/books/:id", (req, res) => {
	const { id } = req.params;
	const newData = req.body;

	dbConnection.query(
		"UPDATE books SET ? WHERE idBook = ?",
		[newData, id],
		(err, result) => {
			if (err) {
				if (err.code === "ER_DUP_ENTRY") {
					return res.status(409).json({ msg: "El ISBN esta duplicado" });
				}
				if (err.code === "ER_BAD_FIELD_ERROR") {
					return res
						.status(409)
						.json({ msg: "Uno de los campos esta mal escrito." });
				}
			}
			if (result.affectedRows === 0) {
				return res
					.status(204)
					.json({ msg: `No hay un libro con el ID: ${id}` });
			}

			return res.status(200).json({ msg: "Libro actualizado correctamente!" });
		}
	);
});

router.delete("/books/:id", (req, res) => {
	const { id } = req.params;

	dbConnection.query(
		"DELETE FROM books WHERE idbook = ?",
		id,
		(err, result) => {
			if (err) {
				return res.status(500).json({ msg: "No se pudo eliminar el libro" });
			}
			if (result.affectedRows === 0) {
				return res
					.status(204)
					.json({ msg: `No hay un libro con el ID: ${id}` });
			}
			return res.status(200).json({ msg: "Libro eliminado correctamente!" });
		}
	);
});

module.exports = router;
