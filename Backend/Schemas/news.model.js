const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsModel = new Schema({
    title: {type:String, required: true},
    description: {type:String, required: true},
    newsUrl: {type:String},
    imageUrl: {type: String},
    publishedAt: {type: Date, default: new Date()},
    newsCategory: {type: String, required: true, default: 'Main'}
})

module.exports = mongoose.model('news', newsModel, 'newslist') //model: news, collection: newslist

