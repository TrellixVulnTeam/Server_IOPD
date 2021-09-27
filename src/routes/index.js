
const authRoute=require('./auth')
const adminAuthRouter=require('./admin/auth')
const productRouter=require('./product')
const categoryRouter=require('./category')
const cartRouter=require('./cart')
const initialRouter=require('./admin/initialData')
const pageRouter=require('./admin/page')
const addressRouter=require('./address')
const orderRouter=require('./order')
const orderAdminRouter=require('./admin/orderAdmin')

function route(app) {
    app.use('/admin/order',orderAdminRouter)
    app.use('/page',pageRouter)
    app.use('/buyer/cart',cartRouter)
    app.use('/buyer/order',orderRouter)
    app.use('/buyer/address',addressRouter)
    app.use('/category',categoryRouter)
    app.use('/product',productRouter)
    app.use('/admin',adminAuthRouter)
    app.use('/init',initialRouter)
    app.use('/buyer',authRoute)
    
    

    /* app.post('/search', (req, res) => {
        console.log(req.body);
        res.send('');
    });*/
} 

module.exports = route;
