const { goToBN, launchBrowser } = require('../functions/puppeteerHelper');
const axios = require('axios');

module.exports = class Cryptocurrency {
    symbol;
    left;
    right;

    constructor(s) {
        this.symbol = s;
        [this.left, this.right] = s.split('/');
    }

    async getPrice() {
        return new Promise((resolve) => {
            axios
                .get(
                    `https://api.binance.com/api/v3/ticker/price?symbol=${this.left}${this.right}`
                )
                .then((response) => {
                    resolve(response.data);
                })
                .catch((err) => resolve({}));
        });
    }

    async generateGraph() {
        const photoName = `${this.left}_${this.right}-${Date.now()}.png`;
        const browser = await launchBrowser();
        await goToBN(browser, this.left, this.right, photoName).catch((err) =>
            console.log(err)
        );
        return `http://pholawat.codes/api/static/${photoName}`;
    }

    toString() {
        return `Symbol : ${this.symbol}\nLeft : ${this.left}\nRight : ${this.right}`;
    }
};
