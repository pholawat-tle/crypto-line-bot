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

app.post('/webhook', async (req, res) => {
    const { command, args } = parseCommand(req.body);
    console.log(command, args);
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
    res.sendStatus(200);
});

app.get('/', (req, res) => {
    res.send({ msg: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log(`Running at ${PORT}`);
});
