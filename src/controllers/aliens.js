
/* eslint-disable new-cap */

import express from 'express';
import Alien from '../models/Alien';

const router = module.exports = express.Router();

router.get('/', (req, res) => {
  const aliens = Alien.find();
  res.render('aliens/index', { aliens });
});

router.get('/new', (req, res) => {
  res.render('aliens/new');
});

router.get('/show/:id', (req, res) => {
  const alien = Alien.findOne(req.params.id);
  res.render('aliens/show', { alien });
});

router.post('/remove/:id', (req, res) => {
  const id = req.params.id;
  Alien.terminate(id);
  res.redirect('/aliens');
});

router.post('/', (req, res) => {
  const alien = new Alien(req.body);
  alien.save();
  res.redirect('/aliens');
});
