const express = require('express');
const router = express.Router();
const db = require('../models/index');

// posts 조회
router.get('/', async (req, res, next) => {
  try {
    const where = {};
    if (req.body.lastId) {
      where.id = { [Op.lt]: parseInt(req.body.lastId, 10) } //id < lastId
    }
    console.log('where : ' , where);
    const posts = await db.Post.findAll({
      where,
      limit: 10,
      include: [{
        model: db.User,
      }, {
        model: db.Image,
      }, {
        model: db.Comment,
        as: 'Comments',
        include: [{
          model: db.User,
        }]
      }, {
        model: db.User,
        through: 'Like',
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: db.Post,
        as: 'Retweet',
        include: [{
          model: db.User,
          attributes: ['id', 'nickname'],
        }, {
          model: db.Image,
      }],
    }],
      order: [['createdAt', 'DESC']],
      
    });

    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;