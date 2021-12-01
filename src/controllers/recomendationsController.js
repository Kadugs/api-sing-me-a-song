import * as recommendationsService from '../services/recommendationsService.js';

async function addNewMusic(req, res) {
  const { name, youtubeLink } = req.body;
  if (!name || !youtubeLink) {
    return res.sendStatus(400);
  }
  try {
    const newMusic = await recommendationsService.authenticateNewMusic({
      name,
      youtubeLink,
    });

    if (newMusic === false) return res.sendStatus(409);
    if (newMusic?.name === name) return res.sendStatus(201);
    return res.sendStatus(400);
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
}

async function getRecommendation(req, res) {
  return res.send('hello');
}

async function listTopMusics(req, res) {
  return res.send('ola');
}

export { addNewMusic, getRecommendation, listTopMusics };
