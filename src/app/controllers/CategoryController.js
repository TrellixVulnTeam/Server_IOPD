
const slugify = require("slugify");
const Category = require('../models/Category')
const env = require('dotenv');
const shortid = require("shortid");

function createCategories(categories, parentId = null) {

    const categoryList = []
    let category
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined)
    }
    else {
        category = categories.filter(cat => cat.parentId == parentId)
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type:cate.type,
            children: createCategories(categories, cate._id)
        })
    }
    return categoryList
}

class CategoryController {
    create(req, res, next) {

        const categoryObject = {
            name: req.body.name,
            slug: `${slugify(req.body.name)}-${shortid.generate()}`,
        }
        if (req.file) {
            categoryObject.categoryImage = '/uploads/' + req.file.filename
        }
        if (req.body.parentId) {
            categoryObject.parentId = req.body.parentId
        }
        const cat = new Category(categoryObject);
        cat.save((error, category) => {
            if (error) return res.status(400).json({ error });
            if (category) {
                return res.status(201).json({ category });
            }
        })
    }
    getCategories(req, res, next) {
        Category.find({})
            .exec((error, categories) => {
                if (error) return res.status(400).json({ error })

                if (categories) {
                    const categoryList = createCategories(categories)
                    res.status(200).json({ categoryList });
                }
            })
    }
    async updateCategories(req, res) {
        const { _id, name, parentId, type } = req.body
        const updatedCategories = []
        if (name instanceof Array) {
            for (let i = 0; i < name.length; i++) {
                const category = {
                    name: name[i],
                    type: type[i]
                }
                if (parentId[i] !== "") {
                    category.parentId = parentId[i]
                }
                const updatedCategory = await Category.findOneAndUpdate({ _id:_id[i] }, category, { new: true })
                updatedCategories.push(updatedCategory)

            }
            return res.status(201).json({ updatedCategories:updatedCategories })

        } else {
            const category = {
                name, type
            }
            if (parentId !== "") {
                category.parentId = parentId
            }
            const updatedCategory = await Category.findOneAndUpdate({ _id }, category, { new: true })
            return res.status(201).json({ updatedCategory })
        }
    }
    async deleteCategories(req,res){
        const {ids}=req.body.payload
        const deleteCategories=[]
        for(let i=0;i<ids.length;i++){
            const deleteCategory= await Category.findOneAndDelete({_id:ids[i]._id})
            deleteCategories.push(deleteCategory)
        }
        if(deleteCategories.length===ids.length){
            res.status(200).json({message:'Categories removed'})
        }else{
            res.status(400).json({message:'Something went wrong'})
        }
    }

}

module.exports = new CategoryController();