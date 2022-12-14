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
    res.status(200).send({ quote: quote });
})

//GET all Quotes and GET person query
router.get('/quotes', (req, res, next) => {
    let result = [];
    if (req.query.person) {
        const person = req.query.person;
        result = quotes.filter(quote => quote.person === person);
        if (result != []) {
           res.status(200).send({ quotes: result })
        } else {
            res.status(204).send({ quotes: [] })
        }
    } else {
        res.status(200).send({ quotes: quotes})
    }
})

//POST a quote
router.post('/quotes', (req, res, next) => {
    const addPerson = req.query.person;
    const addQuote = req.query.quote;
    if(addPerson && addQuote){
        quotes.push({ quote: addQuote, person: addPerson });
    res.send({ quote: { quote: addQuote, person: addPerson } });
  } else {
    res.status(400);
    }
})
