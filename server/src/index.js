const express = require('express');
const app = express();
const PORT = process.env.PORT;
const Cryptocurrency = require('./class/Cryptocurrency');
const {
    parseCommand,
    replyWithText,
    replyWithImage,
} = require('./functions/lineHelper');
require('dotenv').config({ path: 'src/.env' });

app.use(express.json());
app.use(require('cors')());
app.use(require('morgan')('dev'));

app.use('/static', express.static(__dirname + '/public/'));

const ChannelAccessToken = process.env.ChannelAccessToken;

const mysql = require('mysql');

var con = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: process.env.dbPassword,
    database: 'Line',
});

con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
});

app.post('/webhook', async (req, res) => {
    con.query(
        `SELECT * FROM Person WHERE userID='${req.body.events[0].source.userId}'`,
        function (err, result) {
            if (!err) {
                if (result.length == 0) {
                    con.query(
                        `INSERT INTO Person value ('${req.body.events[0].source.userId}',100)`
                    );
                }
            } else {
                console.log(err);
            }
        }
    );
    const { command, args } = parseCommand(req.body);
    if (command) {
        if (command.toLowerCase() === 'price') {
            const crypto = new Cryptocurrency(args[0].toUpperCase());
            replyWithText(
                ChannelAccessToken,
                req.body.events[0].replyToken,
                await crypto.getPrice()
            );
        } else if (command.toLowerCase() === 'graph') {
            const crypto = new Cryptocurrency(args[0].toUpperCase());
            const imgURL = await crypto.generateGraph();
            replyWithImage(
                ChannelAccessToken,
                req.body.events[0].replyToken,
                imgURL
            );
        }
    }
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.send({ msg: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log(`Running at ${PORT}`);
});
