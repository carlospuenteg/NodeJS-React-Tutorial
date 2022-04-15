const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '<your-password>',
    database: 'CRUDDataBase'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In http://localhost:3001/api/get
// Get all info from movie_reviews from the database and display it on the client (in http://localhost:3001/api/get)
app.get("/api/get", (req, res) => {
    const sqlSelect = 'SELECT * FROM movie_reviews';
    db.query(sqlSelect, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Send data to MySQL (require, response)
app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
      console.log(result);
    });
});

// Delete row with that id from the database
app.delete("/api/delete/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM movie_reviews WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update movie review of the row with that id
app.put("/api/update/:id", (req, res) => {
    const id = req.params.id;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE id = ?";
    db.query(sqlUpdate, [review, id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Listen to the port 3001
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});