const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const DATABASE = require('./database');

// Create express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Declare JWT-secret
const JWT_Secret = 'top-secret-key'

app.post('/api/authenticate', (req, res) => {
    if (req.body) {
        let body = req.body;
        const user = DATABASE.USERS.find(user => user.email === body.email);

        if (!user || body.password !== user.password) {
            res.status(403).send({
                errorMessage: 'Authorisation required!'
            });
        } else {
            let token = jwt.sign(user, JWT_Secret, { expiresIn: '5min' });
            DATABASE.TOKENS.push({ id: 'new_uuid', user_id: 'new_user_id', token: token });

            res.status(200).send({
                signed_user: JSON.stringify({ name: user.name, email: user.email }),
                token: token
            });
        }
    } else {
        res.status(403).send({
            errorMessage: 'Please provide email and password'
        });
    }
});

app.put('/api/new', (req, res) => {
    if (req.body) {
        let body = req.body;
        DATABASE.USERS.push({ name: body.name, email: body.email, password: body.password });
        res.status(200).send({ message: 'User has been successfully created.' });
    } else {
        res.status(500).send({
            errorMessage: 'Incorrect data'
        });
    }
});

app.listen(5000, () => console.log('Server started on port 5000'));
