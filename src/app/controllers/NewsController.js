class NewsController {
    //[GET] /news
    index(req, res) {
        res.render('news');
    }
    //[GET] /news/:slug
    show(req, res) {
        res.send('Truong Dep Trai');
    }
}

module.exports = new NewsController();
