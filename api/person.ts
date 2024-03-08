import express from "express";
import { TripPostPersonRespone } from "../model";
import mysql from "mysql";
import { conn } from "../dbconnect";

export const router = express.Router();

router.get("/", (req, res) => {
    conn.query('select * from Person', (err, result, fields)=>{
      res.json(result);
    });
  });


router.post("/", (req, res) => {
    let per: TripPostPersonRespone = req.body;
    let sql =
      "INSERT INTO `Person`(`name`,`detail`, `lmage`) VALUES (?,?,?)";
    sql = mysql.format(sql, [
        per.name,
        per.detail,
        per.lmage
     
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
    conn.query("delete from Person where pid = ?", [id], (err, result) => {
       if (err) throw err;
       res
         .status(200)
         .json({ affected_row: result.affectedRows });
    });
  });
  