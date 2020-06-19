const express   = require('express');
const mongoose  = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/mojek', ({ useNewUrlParser: true,  useUnifiedTopology: true}))
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB..'));

app.use(express.json());

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));