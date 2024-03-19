const axios = require('axios');
require('dotenv').config();

const apiKey = process.env.API_KEY;

async function validationHandler(req, res) {

    var review = "This is the worst app I have ever used. The developer is terrible. I would not recommend this app to anyone."

    const preprompt = `
        Write FLAG if the following review contains any of the following:
        1. unprofessional language
        2. inappropriate language
        3. hate speech
        4. profanity
        5. threats
        6. spam
        7. any insults or harassment whatsoever
        After writing FLAG, write a newline, then return an alternative way of phrasing the review.
        The new review should be professional, constructive, and insightful.
        If the review does not contain any of the above, only write NOFLAG.
    `;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4",
            messages: [{"role": "user", "content": preprompt + review}],
            temperature: 0.7
          }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            }
        });
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
}

module.exports = validationHandler;
