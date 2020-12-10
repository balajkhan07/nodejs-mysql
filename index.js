const express = require('express');
const app = express();
const port = 3000;

const order = require('./routes/order');
const product = require('./routes/product');
const category = require('./routes/category');

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-reqed-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(express.json({ limit: '50mb' }));

app.listen(port, () => {
    console.log('Listening on port 3000');
})


app.use('/api-order/', order);
app.use('/api-category/', category);
app.use('/api-product/', product);
