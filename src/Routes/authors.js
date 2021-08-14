const express = require("express");
const dbConnection = require("../Config/database");

const router = express.Router();

router.get("/authors", (req, res) => {
	const query = "SELECT idAuthor, name, country FROM authors";

	dbConnection.query(query, (err, results) => {
		if (err) {
			return res.status(500).json({ msg: "Error al realizar la consulta" });
		}
		if (results.length === 0) {
			// Aca me pasa lo mismo que en "Books", no se que code ponerle porque un 204 el postman no me muestra el mensaje.
			return res.status(200).json({ msg: "No hay datos" });
		}

		return res.status(200).json(results);
	});
});

router.get("/authors/:id", (req, res) => {
	const { id } = req.params;

	const query =
		"SELECT idAuthor, name, country FROM authors WHERE idAuthor = ?";

	dbConnection.query(query, id, (err, result) => {
		if (err) {
			return res.status(500).json({ msg: "Error al realizar la consulta" });
		}
		if (result.length === 0) {
			//Lo mismo que arriba
			return res.status(200).json({ msg: "No hay datos" });
		}

		return res.status(200).json(result);
	});
});

router.post("/authors", (req, res) => {
	const newAuthor = req.body;

	const query = "INSERT INTO authors SET ?";

	dbConnection.query(query, newAuthor, (err) => {
		if (err) {
			if (err.errno === 1054) {
				return res
					.status(409)
					.json({ msg: "Uno de los campos esta mal escrito." });
			}
			return res.status(500).json({ msg: "Error al crear el autor" });
		}

		return res.status(201).json({ msg: "Autor agregado correctamente!" });
	});
});

router.put("/authors/:id", (req, res) => {
	const { id } = req.params;
	const newData = req.body;
	const query = "UPDATE authors SET ? WHERE idAuthor = ?";

	dbConnection.query(query, [newData, id], (err, result) => {
		if (err) {
			if (err.code === "ER_BAD_FIELD_ERROR") {
				return res
					.status(409)
					.json({ msg: "Uno de los campos esta mal escrito." });
			}
			return res.status(500).json({ msg: "Error al crear el autor" });
		}
		if (result.affectedRows === 0) {
			return res.status(204).json({ msg: `No hay un autor con el ID: ${id}` });
		}
		return res.status(200).json({ msg: "Autor actualizado correctamente!" });
	});
});

router.delete("/authors/:id", (req, res) => {
	const { id } = req.params;
	const query = "UPDATE authors SET isActive = 0 WHERE idAuthor = ?";

	dbConnection.query(query, id, (err, result) => {
		if (err) {
			return res.status(500).json({ msg: "No se pudo desactivar el Autor" });
		}
		if (result.affectedRows === 0) {
			return res.status(204).json({ msg: `No hay un autor con el ID: ${id}` });
		}
		return res.status(200).json({ msg: "Autor desactivado correctamente!" });
	});
});
module.exports = router;
