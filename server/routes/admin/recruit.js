const express = require('express');
const router = express.Router();
const mongoose=require('mongoose');

const RecruitController = require('../../controllers/admin/recruit');

const RESCODE=require('../../config/rescode');
const checkauth=require('../../middleware/auth');

router.post('/recruit', checkauth, RecruitController.recruit_add);
router.get('/recruit/page/:page', checkauth, RecruitController.recruit_get);
router.get('/recruit/:id', checkauth, RecruitController.recruit_getById);
router.patch('/recruit/:id', checkauth, RecruitController.recruit_updateById);
router.delete('/recruit/:id', checkauth, RecruitController.recruit_deleteById);
module.exports = router;