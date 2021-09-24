const Phone = require('../models/Phone');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
    //[GET] /
    index(req, res, next) {
        //res.render('home');
        Phone.find({})
            .then((phones) => {
                res.render('home', {
                    phones: mutipleMongooseToObject(phones),
                });
            })
            .catch(next);
    }
    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
