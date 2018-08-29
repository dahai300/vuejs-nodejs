const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');

const NewsController = require('../../controllers/admin/news');

const checkauth=require('../../middleware/auth');

router.post('/news', checkauth, NewsController.news_add);
router.get('/news/page/:page', checkauth, NewsController.news_get);
router.get('/news/:id', checkauth, NewsController.news_getById);
router.patch('/news/:id', checkauth, NewsController.news_updateById);
router.delete('/news/:id', checkauth, NewsController.news_deleteById);
module.exports = router;
