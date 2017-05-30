const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    pwd: String,
    createDate: {
        type: Date,
        default: new Date()
    }
});

const articleSchema = new Schema({
    articleTitle: String,
    author: String,
    postTime: {
        type: Date,
        default: new Date()
    },
    tags: [String],
    content: String,
    pageView: {
        type: Number,
        default: 0
    }
});

const linkSchema = new Schema({
    name: String,
    href: String
});

const tagSchema = new Schema({
    tagId: Number,
    tagName: String,
    tagCreateTime: {
        type: Date,
        default: new Date()
    },
    tagsCreater: String
});

const Models = {
    User: mongoose.model('User', userSchema),
    Article: mongoose.model('Article', articleSchema),
    Link: mongoose.model('Link', linkSchema),
    Tag: mongoose.model('Tag', tagSchema),
    initialized: false
};

module.exports = Models;