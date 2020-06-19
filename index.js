const express   = require('express');
const mongoose  = require('mongoose');
const customers = require('./routes/costumers');
const genres    = require('./routes/genres');
const movies    = require('./routes/movies');
const app = express();

mongoose.connect('mongodb://localhost/mojek', ({ useNewUrlParser: true,  useUnifiedTopology: true}))
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB..'));

app.use(express.json());
app.use('/api/customers', customers);
app.use('/api/genres', genres);
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));