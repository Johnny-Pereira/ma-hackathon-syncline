const express = require('express')
const router = express.Router();
const moment = require('moment')
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

router.post('/reviews', (req, res) => {
    console.log(req.body)
    pool.query('INSERT INTO blind.feedback ("OUID", "userID", title, feedback, rating, date) VALUES ($1, $2, $3, $4, $5, $6)', [req.body.ouid, req.body.userid, req.body.title, req.body.feedback, req.body.rating, moment().format("YYYY-MM-DD HH:mm:ss")], (error) => {
        if (error) {
            throw error
        }
        res.status(201).send("Review added")
    })
})

module.exports = router;