import mysql from "mysql";

export const conn = mysql.createPool({
    connectionLimit : 10,
    host : "119.59.96.110",
    user : "aemandko_Tinchai",
    password : "Tinchai",
    database : "aemandko_Tinchai"
}); 