const express = require('express');
const app = express();
const router = express.Router();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4002;
app.use(express.static('public'));

app.listen(PORT);

app.use('/api', router);

//GET a random Quote
router.get('/quotes/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    res.send({quote: quote});
})

