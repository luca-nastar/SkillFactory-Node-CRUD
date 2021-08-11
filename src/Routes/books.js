const express = require("express");
const dbConnection = require("../Config/database");

const router = express.Router();

router.get("/books", (req, res) => {
	dbConnection.query("SELECT * FROM books", (err, results) => {
		if (err) {
			return res.status(500).json({ msg: "Error al realizar la consulta" });
		}
		if (results.length === 0) {
			return res.status(204).json({ msg: "No hay datos" });
		}

		return res.status(200).json({ results });
	});
});

router.get("/books/:id", (req, res) => {
	const { id } = req.params;

	dbConnection.query(
		"SELECT * FROM books WHERE idBook = ?",
		id,
		(err, result) => {
			if (err) {
				return res.status(500).json({ msg: "Error al realizar la consulta" });
			}
			if (result.length === 0) {
				return res
					.status(204)
					.json({ msg: `No hay registros con el id: ${id}` });
			}

			return res.status(200).json({ result });
		}
	);
});

router.post("/books", (req, res) => {
	const newBook = req.body;

	dbConnection.query("INSERT INTO books SET ?", newBook, (err) => {
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
		return res.status(201).json({ msg: "Libro agregado correctamente!" });
	});
});

router.put("/books/:id", (req, res) => {
	const { id } = req.params;
	const newData = req.body;

	dbConnection.query(
		"UPDATE books SET ? WHERE idBook = ?",
		[newData, id],
		(err) => {
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
