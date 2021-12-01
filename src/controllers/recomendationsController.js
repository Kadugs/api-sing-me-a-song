// import * as recommendationsService from '../services/recommendationsService.js';

async function addNewMusic(req, res) {
  return res.send('hi');
}

async function getRandomMusic(req, res) {
  return res.send('hello');
}

async function listTopMusics(req, res) {
  return res.send('ola');
}

export { addNewMusic, getRandomMusic, listTopMusics };
