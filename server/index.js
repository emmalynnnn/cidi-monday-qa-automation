const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const database = require(`./database-interaction.js`);

const app = express();
const port = 3000;

const CLIENT_URL = 'http://localhost:5173'

app.use(cors({
    origin: CLIENT_URL
}));

app.use(bodyParser.json());

const initiateUpdate = require('./run-update.js');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

//trigger an update
//board id
app.post('/update-now', async (req, res) => {
    res.json({result: 'success'});
    const result = await initiateUpdate(req.body.id);
    console.log(result);
    /*if (result) {
        res.json({result: 'success'});
    } else {
        res.json({result: 'failure'});
    }*/
});

//add new board information to database
//board id
//title
//ally semester ID
//update column ID
//end date
app.post('/add-board', async (req, res) => {
    const result = await database.addNewBoard(req.body);
    console.log(result);
    res.json({result: result});
});

//edit board information
//board id (required)
//title
//ally semester ID
//update column ID
//end date
app.post('/edit-board', async (req, res) => {
    const result = await database.updateBoard(req.body);
    console.log(result);
    res.json({result: result});
});

//remove board information
//board id
app.post('/delete-board', async (req, res) => {
    const result = await database.deleteBoard(req.body);
    console.log(result);
    res.json({result: result});
});

//activate board
//board id

//deactivate board
//board id

//get list of current boards
app.get('/get-boards', async (req, res) => {
    res.json(await database.getBoards());
});

//add maintainer email
//email, name

//remove maintainer email
//email

//view all maintainer emails
app.get('/get-maintainers', (req, res) => {
    res.json([
        {
            name: 'Emma Lynn',
            email: 'email@email.com',
            primary: true,
        }, {
            name: 'Maddi May',
            email: 'email@email.com',
            primary: false,
        },
        {
            name: 'Percy the Shark',
            email: 'email@email.com',
            primary: false,
        }
    ]);
});

//edit head maintainer email

//view head maintainer email

app.listen(port, () => {
    console.log(`App listening on port ${port}! 🥳`);
});



