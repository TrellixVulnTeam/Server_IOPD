const newRoute = require('./news');
const siteRoute = require('./site');
const meRoute = require('./me');
const phoneRoute = require('./phone');

function route(app) {
    app.use('/me', meRoute);
    app.use('/phone', phoneRoute);
    app.use('/news', newRoute);
    app.use('/', siteRoute);

    app.post('/search', (req, res) => {
        console.log(req.body);
        res.send('');
    });
}

module.exports = route;
