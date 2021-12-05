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
  const recomendation = await recommendationsService.drawRecommendation();
  if (recomendation === null) {
    return res.sendStatus(404);
  }
  return res.status(200).send(recomendation);
}

async function listTopMusics(req, res) {
  const { amount } = req.params;

  const recommendationAmout = await recommendationsService.getRecommendationAmount(
    amount,
  );
  if (recommendationAmout === null) return res.sendStatus(404);
  return recommendationAmout;
}

export { addNewMusic, getRecommendation, listTopMusics };
