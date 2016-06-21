/* eslint-disable new-cap */

import fs from 'fs';
import path from 'path';
import uuid from 'uuid';
const file = path.join(__dirname, '../../data/aliens.json');

function Alien(o) {
  this.id = uuid.v1();
  this.name = o.inputName;
  this.photo = o.inputPhoto;
  this.planet = o.inputPlanet;
}

module.exports = Alien;

Alien.find = function () {
  let data = fs.readFileSync(file, { encoding: 'utf8' });
  data = data.split('\n');
  data.pop();
  data = data.map(d => JSON.parse(d));
  return data;
};

Alien.findOne = function (alienId) {
  const aliens = Alien.find();
  const retVal = aliens.find(alien => alien.id === alienId);
  return retVal;
};

Alien.prototype.save = function () {
  fs.writeFileSync(file, `${JSON.stringify(this)}\n`, { flag: 'a' });
};

Alien.terminate = function (id) {
  let data = fs.readFileSync(file, { encoding: 'utf8' });
  data = data.split('\n');
  data.pop();

  fs.writeFileSync(file, '');

  for (let i = 0; i < data.length; i++) {
    if (data[i].indexOf(id) === -1) {
      fs.writeFileSync(file, `${data[i]}\n`, { flag: 'a' });
    }
  }

  return data;
};
