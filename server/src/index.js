const express = require('express');
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(require('cors')());
app.use(require('morgan')('dev'));

app.get('/', (req, res) => {
    res.send({ msg: 'Hello World!' });
});

app.listen(PORT, () => {
    console.log(`Running at ${PORT}`);
});
