import express from "express";
import { conn } from "../dbconnect";
import { TripPostMovieRespone } from "../model";
import mysql from "mysql";

export const router = express.Router();

router.get("/", (req, res) => {
  conn.query('select * from Movie', (err, result, fields)=>{
    res.json(result);
  });
});


router.post("/", (req, res) => {
  let move: TripPostMovieRespone = req.body;
  let sql =
    "INSERT INTO `Movie`(`name`, `type`, `detail`, `year`, `id`, `poster`) VALUES (?,?,?,?,?,?)";
  sql = mysql.format(sql, [
      move.name,
      move.type,
      move.detail,
      move.year,
      move.id,
      move.poster
   
  ]);
  conn.query(sql, (err, result) => {
    if (err) throw err;
    res
      .status(201)
      .json({ affected_row: result.affectedRows, last_idx: result.insertId });
  });
});

router.delete("/:id", (req, res) => {
  let id = + req.params.id;
  conn.query("delete from Movie where mid = ?", [id], (err, result) => {
     if (err) throw err;
     res
       .status(200)
       .json({ affected_row: result.affectedRows });
  });
});
