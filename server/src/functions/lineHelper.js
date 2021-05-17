const axios = require('axios');
module.exports = {
    parseCommand: (body) => {
        const event = body.events[0];
        if (
            event.message.type === 'text' &&
            event.message.text.slice(0, 1) === '!'
        ) {
            const commandWithArgs = event.message.text.slice(1);
            const [command, ...args] = commandWithArgs.split(' ');
            // console.log(command, args);
            return { command, args };
        }
    },
    replyWithText: (access_token, reply_token, text) => {
        axios
            .post(
                'https://api.line.me/v2/bot/message/reply',
                {
                    replyToken: reply_token,
                    messages: [
                        {
                            type: 'text',
                            text: text,
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .catch((err) => console.log(err.response.data));
    },
    replyWithImage: (access_token, reply_token, imgURL) => {
        axios
            .post(
                'https://api.line.me/v2/bot/message/reply',
                {
                    replyToken: reply_token,
                    messages: [
                        {
                            type: 'image',
                            originalContentUrl: imgURL,
                            previewImageUrl: imgURL,
                        },
                    ],
                },
                {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                }
            )
            .catch((err) => console.log(err.response.data));
    },
};
