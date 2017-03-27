const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const uuid = require('node-uuid');

const parseFormData = (req, res, next) => { 
  const form = new formidable.IncomingForm();

  form.uploadDir = path.join(__dirname, '../uploads');
  form.keepExtensions = true;
  form.maxFieldsSize = 20000 * 1024 * 1024;
  form.multiples = true;

  let post = {assets_url: [], hero_url: null};
  let files = [];
  let hero_img = null;

  form.parse(req);

  form.on('field', (name, value) => {
    post[name] = value;
  });

  form.on('file', (name, file) => {
    if (name !== 'hero_img') {
      files.push(file);
    } else {
      hero_img = file;
    }
  });

  form.on('end', () => {
    const post_id = post.post_id;

    try {
      fs.statSync(`${form.uploadDir}/${post_id}`);
    } catch (err) {
      fs.mkdir(`${form.uploadDir}/${post_id}`);
    }

    files.forEach(file => {
      const upload_path = path.join(`${form.uploadDir}/${post_id}/`, `${file.name}`);
      const url = `uploads/${post_id}/${file.name}`;
      fs.rename(file.path, upload_path);
      post.assets_url.push(url);
    });

    if (hero_img) {
      const upload_path = path.join(`${form.uploadDir}/${post_id}/`, `${hero_img.name}`);
      const url = `uploads/${post_id}/${hero_img.name}`;
      fs.rename(hero_img.path, upload_path);
      post.hero_url = url;
    }

    console.log(post);

    req.post = post;
    next();
  });
};

module.exports = parseFormData;