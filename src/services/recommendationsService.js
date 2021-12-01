import * as recommendationsRepository from '../repositories/recommendationsRepository.js';
import validateNewMusic from '../validation/validateNewMusic.js';

async function authenticateNewMusic({ name, youtubeLink }) {
  if (!validateNewMusic({ name, youtubeLink })) {
    return null;
  }
  const allMusics = await recommendationsRepository.getAllMusicLinks();
  const haveAlreadyInTheDatabase = allMusics.some((music) => music.link === youtubeLink);
  if (haveAlreadyInTheDatabase) return false;

  const newRecommendation = await recommendationsRepository.insertNewRecommendation({
    name,
    youtubeLink,
  });
  if (newRecommendation.name === name) {
    return newRecommendation;
  }
  return undefined;
}

export { authenticateNewMusic };
