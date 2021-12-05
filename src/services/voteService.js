import * as voteRepository from '../repositories/voteRepository.js';
import * as recommendationsRepository from '../repositories/recommendationsRepository.js';

async function updateScore({ id, type }) {
  const symbol = type === 'upvote' ? '+' : '-';
  const updatedRecommendation = await voteRepository.updateScoreById({ id, symbol });
  if (!updatedRecommendation) return null;
  if (updatedRecommendation.score < -5) {
    const removedScore = await recommendationsRepository.removeRecommendation(id);
    return { ...removedScore, removed: true };
  }
  return updatedRecommendation;
}

export { updateScore };
