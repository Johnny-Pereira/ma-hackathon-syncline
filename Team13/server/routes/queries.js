const express = require('express')
const router = express.Router();
const dotenv = require('dotenv').config()
const pool = require('./connection')

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

router.get('/reviews', getFeedback)

router.get('/reviews/:OU', (req, res) => {
    console.log(req.params)
    pool.query('SELECT title, feedback, rating, upvotes, downvotes FROM blind.feedback WHERE "OUID" = $1', [req.params.OU], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

module.exports = router;