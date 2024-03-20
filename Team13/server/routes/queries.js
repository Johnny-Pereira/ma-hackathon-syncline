const express = require("express");
const router = express.Router();
const moment = require("moment");
const dotenv = require("dotenv").config();
const pool = require("./connection");

const getFeedback = (req, res) => {
  pool.query("SELECT * FROM blind.feedback", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

router.get("/", (req, res) => {
  res.send("This is the homepage!");
});

router.get("/ou", (req, res) => {
  pool.query("SELECT * FROM blind.ou", (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
});

router.get("/reviews", getFeedback);

router.get('/reviews/:OU', (req, res) => {
    console.log(req.params);
    console.log(req.query.sort);
    console.log(req.query.page);

    const sortParam = req.query.sort;
    let query = '';

    switch (sortParam) {
        case 'oldest':
            // Sorting logic for sorting date oldest to newest 
            query = 'SELECT title, feedback, rating, upvotes, downvotes, date FROM blind.feedback WHERE "OUID" = $1 ORDER BY date ASC OFFSET $2 LIMIT 25';
            break;
        case 'highest':
            // Sorting logic for sorting reviews highest to lowest
            query = 'SELECT title, feedback, rating, upvotes, downvotes, date FROM blind.feedback WHERE "OUID" = $1 ORDER BY rating DESC OFFSET $2 LIMIT 25';
            break;
        case 'lowest':
            // Sorting logic for sorting reviews lowest to highest
            query = 'SELECT title, feedback, rating, upvotes, downvotes, date FROM blind.feedback WHERE "OUID" = $1 ORDER BY rating ASC OFFSET $2 LIMIT 25';
            break;
        case 'relevant':
            // Sorting logic for sorting relevancy highest to lowest based on difference of up and down votes
            query = 'SELECT title, feedback, rating, upvotes, downvotes, date FROM blind.feedback WHERE "OUID" = $1 ORDER BY (upvotes - downvotes) DESC OFFSET $2 LIMIT 25';
            break;
        default:
            // Sorting logic for sorting date newest to oldest (default), no query param
            query = 'SELECT title, feedback, rating, upvotes, downvotes, date FROM blind.feedback WHERE "OUID" = $1 ORDER BY date DESC OFFSET $2 LIMIT 25';
            break;
    }

    const offset = (req.query.page - 1) * 25; 
    const params = [req.params.OU, offset];

    pool.query(query, params, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});

router.post("/reviews", (req, res) => {
  console.log(req.body);
  // insert new feedback into feedback table
  pool.query(
    'INSERT INTO blind.feedback ("OUID", "userID", title, feedback, rating, date) VALUES ($1, $2, $3, $4, $5, $6)',
    [
      req.body.ouid,
      req.body.userid,
      req.body.title,
      req.body.feedback,
      req.body.rating,
      moment().format("YYYY-MM-DD HH:mm:ss"),
    ],
    (error) => {
      if (error) {
        throw error;
      }

      // gets updated average rating of OU and updates OU table with new average
      const currentRating = pool.query(
        'SELECT AVG(rating) FROM blind.feedback WHERE "OUID" = $1',
        [req.body.ouid],
        (error, results) => {
          if (error) {
            throw error;
          }
          console.log(`Current OU Rating: ${results.rows[0].avg}`);
          pool.query(
            'UPDATE blind.ou SET ou_rating = $1 WHERE "code" = $2',
            [results.rows[0].avg, req.body.ouid],
            (error, results) => {
              if (error) {
                throw error;
              }
            }
          );
        }
      );
      res.status(201).send("Review added");
    }
  );
});

module.exports = router;
