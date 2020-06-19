const { Rental, validate }  = require('../models/rental');
const { Movie }             = require('../models/movie');
const { Customer }          = require('../models/costumer');
const express               = require('express');
const router                = express.Router();

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(4004).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid movie.');

    // check movie stock apa masih bisa di rental apa enggak
    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });
    rental = await rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
});

router.get('/:id', async (req, res) => {
    const rentals = await Rental.findById(req.params.id);

    if (!rentals) return res.status(404).send('The rental with the given ID was not found.');

    res.send(rentals);
});

module.exports = router;