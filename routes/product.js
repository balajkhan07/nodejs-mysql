const express = require('express');
const router = express.Router();
const db = require('../db');
const mysql = require('mysql')

router.get('/product', async (req, res) => {
    let productId = req.params.id;
    let sql = mysql.format('SELECT * FROM products LEFT JOIN category ON products.catergoryId = category.id', [productId]);
    db.query(sql, function (error, _results, _fields) {
        if (error) return res.status(400).send(error);
        return res.status(200).send(_results)
    });
})

router.get('/product/:id', async (req, res) => {
    let productId = req.params.id;
    let sql = mysql.format('SELECT products.id, products.name, products.catergoryId FROM products LEFT JOIN category ON products.catergoryId = category.id WHERE products.id = ?', [productId]);
    db.query(sql, function (error, _results, _fields) {
        console.log(_results[0])
        let sql = mysql.format('SELECT * FROM category WHERE category.id = ?', [_results[0].catergoryId]);
        db.query(sql, function (error, _result, _fields) {
            if (error) return res.status(400).send(error);
            return res.status(200).send({ ..._results[0], category: _result });
        })
    });
})

router.post('/product', async (req, res) => {
    let productName = req.body.name;
    let categoryId = req.body.categoryId;
    let sql = mysql.format('INSERT INTO products (name, catergoryId) VALUES (?, ?)', [productName, categoryId]);
    db.query(sql, function (error, _results, _fields) {
        if (error) return res.status(400).send(error);
        return res.status(200).send({ success: 'product added successfully' })
    });
})

module.exports = router;