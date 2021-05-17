const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = {
    launchBrowser: () => {
        return new Promise((resolve, reject) => {
            puppeteer
                .launch({
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                })
                .then((browser) => resolve(browser))
                .catch((err) => reject(err));
        });
    },
    goToBN: async (browser, left, right, photoName) => {
        const page = await browser.newPage();
        page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });
        await page.goto(
            `https://www.binance.com/en/trade/${left}_${right}?type=spot`
        );
        const graph = await page.$('.css-1k8svrs');
        try {
            await page.click('.css-8qwo6f');
        } catch (error) {}
        try {
            await page.click('.css-1wngn4j');
        } catch (error) {}
        await new Promise((r) => setTimeout(r, 2000));
        await graph
            .screenshot({
                path: __dirname + `/../public/${photoName}`,
            })
            .then(() => {
                setTimeout(() => {
                    fs.unlink(__dirname + `/../public/${photoName}`, (err) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                }, 8.64e7);
            })
            .catch((err) => console.log(err));

        await browser.close();
    },
};
