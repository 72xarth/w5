import express from "express";
import { conn } from "../dbconnect";
import { TripPostCreatorRespone } from "../model";
import mysql from "mysql";

export const router = express.Router();

router.get("/", (req, res) => {
    conn.query('select * from Creators_C', (err, result, fields)=>{
      res.json(result);
    });
  });


router.post("/", (req, res) => {
    let crea: TripPostCreatorRespone = req.body;
    let sql =
      "INSERT INTO `Creators_C` (`CMID`,`CPID`) VALUES (?,?)";
    sql = mysql.format(sql, [
        crea.CMID,
        crea.CPID
     
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
        "DELETE FROM Creators_C WHERE CMID = ? AND CPID = ?",
        [req.query.mid, req.query.pid],
        (err, result, fields) => {
            if (err) throw err;
            res.json(result);
        }
    );
});