const newRoute = require('./news');
const siteRoute = require('./site');

function route(app) {
    app.use('/news', newRoute);
    app.use('/', siteRoute);

    app.post('/search', (req, res) => {
        console.log(req.body);
        res.send('');
    });
}

module.exports = route;
