import express from "express";

export const router = express.Router();

router.get('/', (req, res)=>{
    let body = req.body
    res.send('Get in index.ts body:' + body);
});
