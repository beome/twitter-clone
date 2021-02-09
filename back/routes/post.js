const express = require('express');
const db = require('../models/index');
const router = express.Router();

// posts 조회
router.post('/', async (req, res, next) => {
});

// post 작성
router.post('/addPost', async (req, res, next) => {
  try {
    const hashtags = req.body.content.match(/(#[^\s#]+)/g);
    const newPost = await db.Post.create({
      content: req.body.content,
      UserId: req.body.userId,
    });
    if (hashtags) {
      const result = await Promise.all(hashtags.map((tag) => {
        return db.Hashtag.findOrCreate({ where: { name: tag.slice(1) } });
      }));
      await newPost.addHashtags(result.map(r => r[0]));
    }

    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{
        model: db.User,
        attributes: [ 'id', 'nickname' ]
      }, {
        model: db.Image,
        as: 'Images',
      }, {
        model: db.Comment,
        as: 'Comments',
      }, {
        model: db.User,
        through: 'Like',
        as: 'Likers',
        attributes: [ 'id' ],
      }]
    });

    res.json(fullPost);  
  } catch (e) {
    console.error(e);
    next(e);
  }
}); 

router.post('/delete', async (req, res, next) => {
  try {
    const postId = req.body.id;
    const selectedPost = await db.Post.findOne({ where: { id: postId } });
    if (selectedPost) {
      await db.Post.destroy({ where: { id: postId } });
    }
    res.status(200).send('삭제 성공');
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;