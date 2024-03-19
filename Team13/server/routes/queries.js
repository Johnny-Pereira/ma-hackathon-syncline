const express = require('express')
const Pool = require('pg').Pool
const router = express.Router();
const dotenv = require('dotenv').config()

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
})

const getFeedback = (req, res) => {
    pool.query('SELECT * FROM blind.feedback', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

router.get('/', (req, res) => {
    res.send('This is the homepage!')
})

router.get('/feedback', getFeedback)

module.exports = router;