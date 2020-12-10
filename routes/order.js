const express = require('express');
const router = express.Router();
const db = require('../db');
const mysql = require('mysql')

router.get('/order/:id', async (req, res) => {
    let orderId = req.params.id;
    let sql = mysql.format('SELECT * FROM order WHERE order.id = ?', [orderId]);
    db.query(sql, function (error, _results, _fields) {
        if (error) return res.status(400).send(error);
        return res.status(200).send(_results)
    });
})

router.post('/order', async (req, res) => {
    let categoryName = req.body.name;
    let sql = mysql.format('INSERT INTO category (name) VALUES (?)', [categoryName]);
    db.query(sql, function (error, _results, _fields) {
        if (error) return res.status(400).send(error);
        return res.status(200).send({ success: 'category added successfully' })
    });
})

module.exports = router;