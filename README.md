# Run this project
If you want to try the finished project:
- Go to [Start with MySQL](#start-with-mysql) to create the database
- Download the project
- Go to the `client` folder and install all the node modules:
```bash
npm install
```
- Now go to the `server` folder and install all the node modules:
```bash
npm install
```
- Put your MySQL password in `server/index.js`
- Start the server by running this command in `server` folder
```bash
npm run devStart
```
- If you get the error: `Error: listen EADDRINUSE: address already in use :::3000`:
  - Type that command to find the PID (process id) associated with the port (3001 is our server port in this case)
    ```bash
    lsof -i :3001
    ```
  - Type that command in the terminal to kill the process
    ```bash
    sudo kill -9 <PID>
    ```
- If you get the error: `Error: ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost' (using password: YES)` it is because you didn't put or put an incorrect password in `server/index.js`
- Start the client by running this command in `client` folder ([link](https://levelup.gitconnected.com/how-to-kill-server-when-seeing-eaddrinuse-address-already-in-use-16c4c4d7fe5d))
```bash
npm start
```
- If you have installed MySQL2 and want to install MySQL:
```bash
npm un mysql2 && npm i mysql
```

# Contents
* [Client](#client)
  * [Create folders](#create-folders)
  * [Create React App](#create-react-app)
  * [Clean React App](#clean-react-app)
  * [Create Simple React App](#create-simple-react-app)
    * [Change `App.js` (1)](#change-appjs-1)
    * [Change `App.css` (1)](#change-appcss-1)
* [Server](#server)
  * [Move from client to server](#move-from-client-to-server) 
  * [Create NodeJS App](#create-nodejs-app)
  * [Install packages](#install-packages)
  * [Create the Express app](#create-the-express-app)
    * [Change `server/index.js` (1)](#change-serverindexjs-1)
  * [Configure Nodemon](#configure-nodemon)
  * [Start with MySQL](#start-with-mysql)
    * [Before you Start](#before-you-start)
    * [Get started](#get-started)
    * [Create a table](#create-a-table) 
  * [Access MySQL in your App](#access-mysql-in-your-app)
    * [Change `server/index.js` (2)](#change-serverindexjs-2)
    * [ER_NOT_SUPPORTED_AUTH_MODE](#er_not_supported_auth_mode)
    * [Type this command to run the server](#type-this-command-to-run-the-server)
    * [Check that your table has changed](#check-that-your-table-has-changed)
  * [Send data to MySQL](#send-data-to-mysql)
    * [Install cors](#install-cors) 
    * [Go back to `client`](#go-back-to-client)
    * [Install axios](#install-axios)
    * [Change `App.js` (2)](#change-appjs-2)
    * [Change `server/index.js` (3)](#change-serverindexjs-3)
    * [Change `server/index.js` (4)](#change-serverindexjs-4)
    * [Change `App.js` (3)](#change-appjs-3)
    * [Display the collected data in the client ([localhost:3000](http://localhost:300))](#display-the-collected-data-in-the-client)
  * [Update and Delete data from the database](#update-and-delete-data-from-the-database)
    * [Change `App.js` (4)](#change-appjs-4)
    * [Change `server/index.js` (5)](#change-serverindexjs-5)
    * [Change `App.css` (2)](#change-appcss-2)
  * [Install MySQL on MacOS](#install-mysql-on-macos)
  * [Install MySQL Workbench on MacOS](#install-mysql-workbench-on-macos)
* [Links for the original tutorial](#links-for-the-original-tutorial)


# Client

## Create folders
Create a folder for your project and open it with your IDE (I'm using VSCode)
- Make a folder called `client`: 

```bash
mkdir client
```
- Make a folder called `server`:
```bash
mkdir server
```

## Create React App
Go to the client folder:
```bash
cd client
```
Create a react app on that folder:
```bash
npx create-react-app .
```

## Clean React App
- In 'src', delete every file but `index.js`, `App.js` and `App.css`
- Clean `index.js` so that it looks like this:
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
- Clean `App.js`:
```jsx
import './App.css';

function App() {
  return (
    <div className="App">

    </div>
  );
}

export default App;
```
- Clean `App.css`: Delete everything

## Create simple React App
### Change `App.js` (1)
```jsx
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1>
      <form className="form">
        <label>Movie name</label>
        <input type='text' name='movieName' placeholder='Movie Name' />
        <br/>
        <label>Review</label>
        <input type='text' name='review' placeholder='Review' />
        <br/>
        <button>SUBMIT</button>
      </form>
    </div>
  );
}

export default App;
```

### Change `App.css` (1)
```css
.App {
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  font-size: 18px;
}

.form input {
  font-size: 15px;
}
```

Try the app in [localhost](http://localhost:3000/): `npm start`

# Server

## Move from `client` to `server`: 
```bash
cd ..
```

```bash
cd server
```

## Create NodeJS app

- Create the app:
```bash
npm init
```
- Press enter to all the questions
- A `package.json` file should have been created
- Create `index.js` file

## Install packages

Install Express Web Framework, Body-Parser, MySQL and Nodemon: 
```bash
npm install express body-parser mysql nodemon
```

## Create the Express app

### Change `server/index.js` (2)
```javascript
const express = require('express');
const app = express();

// Send a response to the client ('Hello World')
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Listen to the port 3001
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
```

## Configure Nodemon

Change the "scripts" object in `package.json` so that it looks like this:
```json
"scripts": {
    "start": "node index.js",
    "devStart": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
}
```

To run the server:
```bash
npm run devStart
```

## Start with MySQL

### Before you start
Install MySQL and MySQL Workbench:
- If you are on Mac, you can follow this tutorials:
  - [Install MySQL on MacOS](#install-mysql-on-macos)
  - [Install MySQL Workbench on MacOS](#install-mysql-workbench-on-macos)
- If you are on Windows follow a simple tutorial from YouTube or from other sites

### Get started
- Open MySQL Workbench and log in with your root user
- Go to `Schemas`, right click on the left side and click on `Create Schema`
- Name it 'CRUDDataBase'
- Click on `Apply` and then on `Apply` again
- The new database should appear on the left side

### Create a table
- Go to your database, to tables and right click to `Create Table`
- Name it 'movie_reviews'
- Where it says `<click to edit>`, type 'id'
- Appart from `PK` and `NN`, select `AI` (auto increment), which will increase the id by 1 when a new row is added to the database
- Now, where it says `<click to edit>`, type 'movieName' and give it the Datatype: `VARCHAR(200)`
- Select the `NN` (not null) in 'movieName' so that parameter can't be null
- In the next row, add 'movieReview, with the DataType TEXT(500) and `NN`
- Click on `Apply` and the table should be created
- Now right click on `CRUDDataBase/Tables/movie_reviews` and `Select Rows - Limit 1000`
- Since there's no information on the database, it will be empty

## Access MySQL in your App

### Change `server/index.js`:
```javascript
const express = require('express');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '<your_password>',
    database: 'CRUDDataBase'
});

// Send data to MySQL
app.get('/', (req, res) => {
    let sql = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('inception', 'good movie');";
    db.query(sql, (err, result) => {
        if (err) { 
            throw err;
        }
        console.log(result);
        res.send('Data sent to MySQL');
    });
});

// Listen to the port 3001
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
```

### `ER_NOT_SUPPORTED_AUTH_MODE`
- If you get this error, follow these steps:
- In MySQL Workbench, go to `File > New Query Tab` and paste this, changing the password for your new password:
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
```
- Now run the SQL Script: `File > Run SQL Script` or <kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>Enter</kbd>

### Type this command to run the server

```bash
npm run devStart
```

### Check that your table has changed

Right click on `CRUDDataBase/Tables/movie_reviews` and `Select Rows - Limit 1000`


## Send data to the database

### Install cors
```bash
npm install cors
```

### Go back to `client`
```bash
cd ..
```
```bash
cd client
```

### Install 'axios'
```bash
npm i axios
```

### Change `App.js` (2)
```jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  // useState is a hook that allows us to create a state variable
  const [movieName, setMovieName] = useState('');
  const [movieReview, setReview] = useState('');

  // Called when 'Submit' button is clicked
  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: movieReview
    })
    .then(res => {
      alert("Succesful insert!");
      console.log(res);
    });
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
      </form>
    </div>
  );
}

export default App;
```

### Change `server/index.js` (3)

When you click the submit button, the info from the inputs will be sent to MySQL database

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '<your-password>',
    database: 'CRUDDataBase'
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Send data to MySQL (require, response)
app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?, ?)";
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
      console.log(err);
    });
});

// Listen to the port 3001
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
```

### Change `server/index.js` (4)

Now all the information from the database will be displayed in [port 3001](http://localhost:3001/api/get) when you go there

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '<your-password',
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

// Listen to the port 3001
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
```

### Change `App.js` (3)

```jsx
import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  // useState is a hook that allows us to create a state variable
  const [movieName, setMovieName] = useState('');
  const [movieReview, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  // In localhost:3000, store the data from the database in movieReviewList with 'setMovieList'
  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then(response => {
      setMovieList(response.data);
      /*
      If you log the response, it runs twice, probably
      once when the component is first rendered and once when the component is updated
      */
    });
  }, []);

  // Called when 'Submit' button is clicked
  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName, 
      movieReview: movieReview
    })
    .then(res => {
      console.log(res);
    });
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

        {movieReviewList.map((val) => {
          // map the movieReviewList
          return (
            <p>{val.movieName.toUpperCase()}: {val.movieReview}</p>
          )
        })}
      </form>
    </div>
  );
}

export default App;
```

### Display the collected data in the [client](http://localhost:300)


## Update and Delete data from the database

### Change `App.js` (4)

```jsx
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
```

### Change `server/index.js` (5)
```javascript
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
```

### Change `App.css` (2)
```css
.App {
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 15px;
  font-size: 18px;
}

.form input {
  font-size: 15px;
}

.card {
  width: 500px;
  margin-top: 20px;
  padding: 20px;
  border: 2px solid black;
  border-radius: 15px;
}

.movieName {
  margin: 0;
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  font-size: 25px;
}

.movieReview {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  font-size: 15px;
}
```


## Install MySQL on MacOS

[Link of the original tutorial](https://youtu.be/k2EtMqUNkm8)
- Download the latest version of MySQL [here](https://dev.mysql.com/downloads/mysql/)
- In your Mac, go to 'System Preferences' and there to 'MySQL'
- If you want keep the option 'Start MySQL when your computer starts up'
- Open the terminal
- Go to `/usr` in `Macintosh HD` by searching it on <kbd>CMD</kbd>+<kbd>Spacebar</kbd>
- There go to `local/mysql`, select `bin` with right click and while pressing <kbd>Alt</kbd>, click on 'Copy "bin" as Pathname'
- Now go to the `.bash_profile` file that you opened earlier and type:
- Open the terminal and type:
```bash
cd <THE-PATH-YOU-JUST-COPIED>
```
```bash
mysql -u root -p
```
- Enter your root user password
### Show your databases:
```bash
show databases
```
### Exit:
```bash
exit
```

## Install MySQL Workbench on MacOS

- Download it [here](https://dev.mysql.com/downloads/workbench/)
- Log in with your root user

# Links for the original tutorial
[Part 1](https://youtu.be/T8mqZZ0r-RA)

[Part 2](https://youtu.be/3YrOOia3-mo)

[Part 3](https://youtu.be/_S2GKnFpdtE)
