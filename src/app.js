const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.post('/user', (req, res) => {
	// get the data
	const { username, password, favoriteClub, newsLetter = false } = req.body;

	// All are required, check if they were sent
	if (!username) {
		return res.status(400).send('Username required');
	}

	if (!password) {
		return res.status(400).send('Password required');
	}

	if (!favoriteClub) {
		return res.status(400).send('favorite Club required');
	}

	// make sure username is correctly formatted.
	if (username.length < 6 || username.length > 20) {
		return res.status(400).send('Username must be between 6 and 20 characters');
	}

	// password length
	if (password.length < 8 || password.length > 36) {
		return res.status(400).send('Password must be between 8 and 36 characters');
	}

	// password contains digit, using a regex here
	if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
		return res.status(400).send('Password must be contain at least one digit');
	}

	const clubs = [
		'Cache Valley Stone Society',
		'Ogden Curling Club',
		'Park City Curling Club',
		'Salt City Curling Club',
		'Utah Olympic Oval Curling Club'
	];

	// make sure the club is valid
	if (!clubs.includes(favoriteClub)) {
		return res.status(400).send('Not a valid club');
	}

	// at this point all validation passed
	res.send('All validation passed');
});

module.exports = app;
