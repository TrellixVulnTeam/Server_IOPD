const Phone = require('../models/Phone');
const { mongooseToObject } = require('../../util/mongoose');

class PhoneController {
    //[GET] /phone/:slug
    show(req, res, next) {
        Phone.findOne({ slug: req.params.slug })
            .then((phone) => {
                res.render('phone/show', { phone: mongooseToObject(phone) });
            })
            .catch(next);

        //res.send('phone- '+req.params.slug);
    }
    //[GET] /phone/create
    create(req, res, next) {
        res.render('phone/create');
    }
    //[POST] /phone/store
    store(req, res, next) {
        //res.render('phone/create')
        const phone = new Phone(req.body);
        phone
            .save()
            .then(() => res.redirect('/me/stored/phone'))
            .catch((error) => {});
    }
    //[GET] /phone/:id/edit
    edit(req, res, next) {
        //res.render('phone/create')
        Phone.findById(req.params.id)
            .then((phone) =>
                res.render('phone/edit', {
                    phone: mongooseToObject(phone),
                }),
            )
            .catch(next);
    }
    //PUT /phone/:id
    update(req, res, next) {
        Phone.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/phone'))
            .catch(next);
    }
    //[DELETE] /phone/:id
    delete(req, res, next) {
        Phone.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] /phone/:id/force
    forceDelete(req, res, next) {
        Phone.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[PATCH] /phone/:id/restore
    restore(req, res, next) {
        Phone.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new PhoneController();
