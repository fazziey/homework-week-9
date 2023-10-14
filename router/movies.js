const express = require("express");
const router = express.Router();
const pool = require("../query.js");
const auth = require("../middleware.js");

router.get("/", auth, function (req, res) {
  pool.query(
    `SELECT * FROM movies ${
      req.query.limit ? "LIMIT " + req.query.limit : ""
    } `,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});

router.get("/:id", function (req, res) {
  pool.query(
    `SELECT * FROM movies WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.json(results.rows);
    }
  );
});

router.post("/", function (req, res) {
  pool.query(
    `INSERT INTO movies ("id", "title", "genres", "year") VALUES ($1, $2, $3, $4);`,
    [req.body.id, req.body.title, req.body.genres, req.body.year],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: "success",
      });
    }
  );
});

router.delete("/:id", function (req, res) {
  pool.query(
    `DELETE FROM movies WHERE id = ${req.params.id}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: "success",
      });
    }
  );
});

router.put("/:id", function (req, res) {
  pool.query(
    `UPDATE movies SET year = ($1) WHERE id = ${req.params.id}`,
    [req.body.year],
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).json({
        status: "success",
      });
    }
  );
});

module.exports = router;
