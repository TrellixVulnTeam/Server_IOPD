const Phone = require('../models/Phone');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    //[GET] /phone/:slug
    show(req, res, next) {
        Phone.findOne({ slug: req.params.slug })
            .then((phone) => {
                res.render('phone/show', {
                    phone: mutipleMongooseToObject(phone),
                });
            })
            .catch(next);

        //res.send('phone- '+req.params.slug);
    }
    //[GET] /me/stored/phone
    storedPhone(req, res, next) {
        Phone.find({})
            .then((phones) => {
                res.render('me/stored-phone', {
                    phones: mutipleMongooseToObject(phones),
                });
            })
            .catch(next);
    }
    //[POST] /phone/store
    store(req, res, next) {
        //res.render('phone/create')
        const phone = new Phone(req.body);
        phone
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => {});
    }

    //[GET] /me/trash/phone
    trashPhone(req, res, next) {
        Phone.findDeleted({})
            .then((phones) => {
                res.render('me/trash-phone', {
                    phones: mutipleMongooseToObject(phones),
                });
            })
            .catch(next);
    }
}

module.exports = new MeController();
