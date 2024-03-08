
import express from "express";
import { conn } from "../dbconnect";
import mysql from "mysql";

export const router = express.Router();

router.get("/:name", (req, res) => {
    let responseData = {
      persons: [],
      movies: []
    };
  
    let sql = `SELECT Person.* FROM Person WHERE PID IN (
      SELECT Stars_S.PID FROM Stars_S
      INNER JOIN Movie ON Stars_S.SMID = Movie.MID
      WHERE Movie.Name LIKE ?
  
      UNION
  
      SELECT creators_C.CMID FROM creators_C
      INNER JOIN Movie ON creators_C.CMID = Movie.MID
      WHERE Movie.Name LIKE ?
  )`;
    sql = mysql.format(sql, [`%${req.params.name}%`, `%${req.params.name}%`]); 
    conn.query(sql, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        responseData.persons = result;
        checkAndSendResponse();
      }
    });
  
    let sql1 = 'SELECT * FROM Movie_R WHERE Name LIKE ?';
    sql1 = mysql.format(sql1, [`%${req.params.name}%`]);
    conn.query(sql1, (err, result) => {
      if (err) {
        res.status(400).json(err);
      } else {
        responseData.movies = result;
        checkAndSendResponse();
      }
    });
  
    function checkAndSendResponse() {
      if (responseData.persons.length > 0 && responseData.movies.length > 0) {
        res.json(responseData);
      }
    }
  });