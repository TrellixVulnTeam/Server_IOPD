const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Schema = mongoose.Schema;
//const ObjectId = Schema.ObjectId;

const Phone = new Schema(
    {
        ten: { type: String, required: true },
        gia: { type: String },
        image: { type: String },
        chitiet: { type: String },
        videoId: { type: String },
        slug: { type: String, slug: 'ten', unique: true },
    },
    { collection: 'SanPham' },
);

Phone.plugin(mongooseDelete, {
    overrideMethods: 'all',
    deletedAt: true,
});

module.exports = mongoose.model('SanPham', Phone);
