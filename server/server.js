const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./db/mongoose');
const {ObjectID} = require('mongodb');

const {Post} = require('./models/post');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate')
const {config} = require('./config/config')

let app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
  res.header("Access-Control-Expose-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
  next();
});

/*
 * ===================================== 
 * Post Route
 * ===================================== 
 */

app.get('/posts', (req, res) => {
  Post.find({})
    .then((posts) => {
      res.send({posts});
    }, (e) => {
      res.state(400).send(e);
    });
});

app.get('/posts/:id', (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Post.findOne({ _id: id })
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

app.post('/posts', authenticate, (req, res) => {
  let data = req.body;
  let post = new Post({
    title: data.title,
    body: data.body,
    category: data.category
  });

  post.save().then((post) => {
    res.send(post);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.patch('/posts/:id', authenticate, (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let post = {
    title: data.title,
    body: data.body,
    category: data.category
  }

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Post.findOneAndUpdate({_id: id}, {$set: post}, {new: true})
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
  let id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Post.findOneAndRemove({_id: id})
    .then((post) => {
      if(!post) {
        return res.status(404).send();
      }

      res.send({post});
    }).catch((e) => {
      res.status(400).send();
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
  console.log(req);
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