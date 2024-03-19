const express = require('express');
const validationHandler = require('./validation/validation');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        await validationHandler(req, res);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
