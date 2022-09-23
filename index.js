const express = require('express');
const app = express();
const PORT = 3000;

//Catches requests made to localhost:3000/
app.get('/', (req, res) => res.send('Hello World!'));


//Initialises the express server on the port 30000
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));