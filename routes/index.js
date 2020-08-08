const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const ImgurAnonymousUploader = require('imgur-anonymous-uploader');
const {
  setIndexPageText,
  setUploadPageText,
  setDeletePageText,
} = require('../utils/i18n');
const { cookieName } = require('config');

router.get('/', (req, res, next) => {
  const pageText = setIndexPageText(res);
  res.render('index', { title: 'Express', pageText });
});

router.get('/upload', (req, res, next) => {
  res.redirect('/');
});

router.post('/upload', upload.single('file'), async (req, res, next) => {
  if (!req.file) {
    const pageText = setIndexPageText(res);

    return res.render('index', {
      pageText,
      errorMessage: res.__('fileNotSelected'),
    });
  }

  const pageText = setUploadPageText(res);
  const uploader = new ImgurAnonymousUploader(process.env.IMGUR_CLIENT_ID);
  const response = await uploader.upload(req.file.path);

  if (response.status !== 200) {
    return res.send({ message: res.__('uploadFailed') });
  }

  await fs.unlink(req.file.path);

  return res.render('upload', {
    url: response.url,
    deleteHash: response.deleteHash,
    pageText,
  });
});

router.get('/delete', (req, res, next) => {
  res.redirect('/');
});

router.post('/delete', async (req, res, next) => {
  if (!req.body.deleteHash) {
    const pageText = setIndexPageText(res);

    return res.render('index', {
      pageText,
      errorMessage: res.__('deleteHashNotEntered'),
    });
  }

  const pageText = setDeletePageText(res);
  const uploader = new ImgurAnonymousUploader(process.env.IMGUR_CLIENT_ID);
  const response = await uploader.delete(req.body.deleteHash);

  if (response.status !== 200) {
    return res.send({ message: res.__('deleteFailed') });
  }

  return res.render('delete', { pageText });
});

router.get('/change-lang', (req, res, next) => {
  res.cookie(cookieName, req.query.lang, {
    maxAge: 900000,
    httpOnly: true,
  });

  return res.redirect('/');
});

module.exports = router;
