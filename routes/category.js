const express = require('express');
const router = express.Router();
const db = require('../db');
const mysql = require('mysql');

router.get('/category', async (_req, res) => {
    let sql = mysql.format('SELECT * FROM  category');
    db.query(sql, function (error, _results, _fields) {
        if (error) return res.status(400).send(error);
        return res.status(200).send(_results)
    });
})

router.post('/category', async (req, res) => {
    let categoryName = req.body.name;
    let sql = mysql.format('INSERT INTO category (name) VALUES (?)', [categoryName]);
    db.query(sql, function (error, _results, _fields) {
        if (error) return res.status(400).send(error);
        return res.status(200).send({ success: 'category added successfully' })
    });
})

module.exports = router;