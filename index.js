const express = require('express');
const app = express();
const PORT = 3000;

const searchGoogle = require('./searchGoogle');

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

//Initialises the express server on the port 30000
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));