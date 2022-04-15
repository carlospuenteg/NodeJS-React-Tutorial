import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  // useState is a hook that allows us to create a state variable
  const [movieName, setMovieName] = useState('');
  const [movieReview, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);
  const [newMovieReview, setNewMovieReview] = useState('');

  // In localhost:3000, store the data from the database in movieReviewList with 'setMovieList'
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then(response => {
      setMovieList(response.data);
    });
  }, []);

  // Called when 'Submit' button is clicked
  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: movieReview
    });
  }

  // Called when 'Delete' button is clicked
  // Deletes the movie review from the database
  const deleteReview = (id) => {
    Axios.delete(`http://localhost:3001/api/delete/${id}`);
  }

  // Called when 'Update' button is clicked
  // Updates the movie review in the database
  const updateReview = (id) => {
    Axios.put(`http://localhost:3001/api/update/${id}`, {
      movieReview: newMovieReview
    });
    setNewMovieReview(""); 
  }

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <form className="form">
        <label>Movie name</label>
        <input type='text' name='movieName' placeholder='Movie Name' onChange={(e) => { 
          // onChange is a built in function that allows us to capture the value of the input
          // e is the event object
          setMovieName(e.target.value);
        }}/>
        <br/>
        <label>Review</label>
        <input type='text' name='review' placeholder='Review' onChange={(e) => { 
          // onChange
          setReview(e.target.value);
        }}/>
        <br/>
        <button onClick={submitReview}>SUBMIT</button>

        {movieReviewList.map((val, i) => {
          // map the movieReviewList
          return (
            <div className="card" key={i}>
              <h1 className="movieName">{val.movieName}</h1>
              <p className="movieReview">{val.movieReview}</p>
              <button onClick={() => deleteReview(val.id)}>Delete</button>
              <input type='text' placeholder='Edit' onChange={(e) => {
                setNewMovieReview(e.target.value);
              }}/>
              <button onClick={() => updateReview(val.id)}>Update</button>
            </div>
          )
        })}
      </form>
    </div>
  );
}

export default App;