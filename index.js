const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const IP = process.env.IP || '0.0.0.0';

const searchGoogle = require('./searchGoogle');

app.get('/', async (req, res) => {
  res.status(200);
  res.send('You can make searchs like this : \'https://perch-engine.herokuapp.com/search?searchquery=dog\'');
});

//Catches GET requests made to localhost:3000/search
app.get('/search', async (req, res) => {
    const searchQuery = req.query.searchquery;
    
    if(searchQuery) {
        const results = await searchGoogle(searchQuery);
        //Returns a 200 Status OK with Results JSON back to the client.
        res.status(200);
        res.json(results);
    }
    else {
      res.end();
    }
});

//Initialises the express server on the port 8080
app.listen(PORT, IP, () => console.log(`Example app listening on port ${PORT}!`));