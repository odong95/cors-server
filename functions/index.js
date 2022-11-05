const { onRequest } = require('firebase-functions/v2/https');
const corsAnywhere = require('cors-anywhere');
const cors = require('cors');

const corsServer = corsAnywhere.createServer({
    originWhitelist: [
      'http://localhost:3000',
      'http://localhost:5000',
      'https://portfolio-ravenous.web.app',
      'https://portfolio-ravenous.firebaseapp.com',
      'https://brianodong.com',
      'personal-website-nnj0z6zag-odong95.vercel.app',
      'https://personal-website-odong95.vercel.app',
      'https://personal-website-git-main-odong95.vercel.app'

    ],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
});

const corsHandler = cors({ origin: true });

exports.proxy = onRequest((request, response) => {
    corsHandler(request, response, () => {
      corsServer.emit('request', request, response);
    })
});
