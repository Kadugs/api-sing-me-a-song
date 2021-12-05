import * as recommendationsRepository from '../repositories/recommendationsRepository.js';
import validateNewMusic from '../validation/validateNewMusic.js';

async function authenticateNewMusic({ name, youtubeLink }) {
  if (!validateNewMusic({ name, youtubeLink })) {
    return null;
  }
  const allMusics = await recommendationsRepository.getAllMusicLinks();
  const haveAlreadyInTheDatabase = allMusics.some((music) => music.link === youtubeLink);
  if (haveAlreadyInTheDatabase) {
    return false;
  }

  const newRecommendation = await recommendationsRepository.insertNewRecommendation({
    name,
    youtubeLink,
  });
  if (newRecommendation.name === name) {
    return newRecommendation;
  }
  return undefined;
}

async function drawRecommendation() {
  function getRandomIndex(item) {
    return Math.floor(Math.random() * item.length);
  }
  const recommendations = await recommendationsRepository.getAllRecommendations();
  if (recommendations.length === 0) return null;
  if (
    !recommendations.some((recommendation) => recommendation.score > 10) ||
    !recommendations.some((recommendation) => recommendation.score <= 10)
  ) {
    return recommendations[getRandomIndex(recommendations)];
  }
  const randomPercentage = Math.random() * 100;
  const lowScore = [];
  const highScore = [];

  recommendations.forEach((recommendation) => {
    if (recommendation.score > 10) {
      highScore.push(recommendation);
    } else {
      lowScore.push(recommendation);
    }
  });
  if (randomPercentage <= 70) {
    return highScore[getRandomIndex(highScore)];
  }
  return lowScore[getRandomIndex(lowScore)];
}

async function getRecommendationAmount(amount) {
  const recommendations = await recommendationsRepository.getTopRecommendationsOrdered(
    amount,
  );
  if (!recommendations[0]) return null;
  return recommendations;
}

export { authenticateNewMusic, drawRecommendation, getRecommendationAmount };
