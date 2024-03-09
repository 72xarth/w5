import express from "express";
import { conn } from "../dbconnect";
import {  TripPostStarRespone } from "../model";
import mysql from "mysql";

export const router = express.Router();

router.get("/", (req, res) => {
    conn.query('select * from Stars_S', (err, result, fields)=>{
      res.json(result);
    });
  });
  
  
  router.post("/", (req, res) => {
    let star: TripPostStarRespone = req.body;
    let sql =
      "INSERT INTO `Stars_S`(`SMID`, `SPID`) VALUES (?,?)";
    sql = mysql.format(sql, [
     star.SMID,
     star.SPID
     
    ]);
    conn.query(sql, (err, result) => {
      if (err) throw err;
      res
        .status(201)
        .json({ affected_row: result.affectedRows, last_idx: result.insertId });
    });
  });
  
  router.delete("/", (req, res) => {
    conn.query(
        "DELETE FROM Stars_S WHERE SMID = ? AND SPID = ?",
        [req.query.mid, req.query.pid],
        (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        }
    );
});
