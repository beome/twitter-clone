const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

const saltRounds = 12;

router.get('/', (req, res) => {
  if (!req.user) {
    return res.status(401).send('로그인이 필요합니다!');
  } 

  return res.json(req.user);
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('logout 성공!');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      try {
        if (loginErr) {
          return next(loginErr);
        }
        const fullUser = await db.User.findOne({
          where: { id: user.id },
          include: [{
            model: db.Post,
            as: 'Posts',
            attributes: ['id'],
          },{
            model: db.User,
            as: 'Followers',
            attributes: ['id'],
          },{
            model: db.User,
            as: 'Followings',
            attributes: ['id'],
          }],
          attributes: ['id', 'nickname', 'email']
        });
        return res.json(fullUser);

      } catch (e) {
        console.error(e);
        next(e);
      }
     
    });
  })(req, res, next);
});

router.post('/signUp', async (req, res, next) => {
  try {
    const exUser = await db.User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = db.User.create({
      nickname: req.body.nickname,
      email: req.body.email,
      password: hashedPassword,
    });
    return res.status(200).json(newUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;