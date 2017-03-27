const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');
const path = require('path');
const {ObjectID} = require('mongodb');
const fs = require('fs');
const _ = require('lodash');
const rimraf = require('rimraf');

const {Post} = require('./models/post');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate')
const {config} = require('./config/config')
const parseFormData = require('./middleware/parseFormData')

let app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
  res.header("Access-Control-Expose-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
  next();
});

const server_path = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(server_path));

/*
 * ===================================== 
 * Blog Post routes
 * ===================================== 
 */

app.get('/posts', (req, res) => {
  Post.find({}).sort({_createdAt: -1})
    .then((posts) => {
      res.send({posts});
    }, (e) => {
      res.state(400).send(e);
    });
});

app.get('/posts/:id', (req, res) => {
  let post_id = req.params.id;

  Post.findOne({ post_id: post_id })
    .then((post) => {
      if(!post) {
        return res.status(404).send();
      }

      res.send({post});
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.post('/posts', authenticate, parseFormData, (req, res) => {
  let post = new Post(req.post);
  post._createdAt = new Date().getTime();

  post.save().then((post) => {
    res.send(post);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.patch('/posts/:id', authenticate, parseFormData, (req, res) => {
  let id = req.params.id;
  let post = req.post;

  Post.findOneAndUpdate({post_id: id}, {$set: post}, {new: true})
    .then((post) => {
      if (!post) {
        return res.status(404).send();
      }

      res.send({post});
    }).catch((e) => {
      res.status(400).send();
    });
});

app.delete('/posts/:id', authenticate, (req, res) => {
  const id = req.params.id;

  const uploadPath = path.join(__dirname, 'uploads');
  rimraf(`${uploadPath}/${id}`, () => {
    Post.findOneAndRemove({post_id: id})
      .then((post) => {
        if(!post) {
          return res.status(404).send();
        }

        res.status(200).send({post});
      }).catch((e) => {
        console.log(e);
        res.status(400).send();
      });
  });
});

/*
 * ===================================== 
 * User Route
 * ===================================== 
 */

app.post('/users', (req, res) => {
  User.find({}).then((users) => {
    if (users.length >= config.MAX_USER_ALLOWED) {
      res.status(400).send(`Only ${config.MAX_USER_ALLOWED} user can be created`);
    }
  });

  let data = {email: req.body.email, password: req.body.password};
  let user = new User(data);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send({email: user.email, id: user._id});
  }).catch((e) => {
    res.status(400).send();
  });
});


app.post('/users/login', (req, res) => {
  let data = {email: req.body.email, password: req.body.password};
  
  User.findByCredentials(data.email, data.password)
    .then((user) => {
      return user.generateAuthToken()
    })
    .then((token) => {
      res.header('x-auth', token).send('');
    }).catch((e) => {
      res.status(400).send();
    });
});

app.delete('/users/logout', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(config.PORT, () => {
  console.log(`Server started at PORT ${config.PORT}`);
});