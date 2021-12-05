/* eslint-disable no-undef */
import '../../setup.js';
import faker from 'faker';
import * as voteService from '../../src/services/voteService.js';
import * as voteRepository from '../../src/repositories/voteRepository.js';
import * as recommendationsRepository from '../../src/repositories/recommendationsRepository.js';

describe('test votes', () => {
  const object = {
    id: 1,
    score: -5,
    name: faker.name.title(),
    link: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
  };
  const objectToDelete = {
    id: 1,
    score: -6,
    name: faker.name.title(),
    link: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
  };

  it('should return null', async () => {
    jest.spyOn(voteRepository, 'updateScoreById').mockImplementation(() => {});
    const result = await voteService.updateScore({ id: -1, type: 'upvote' });
    expect(result).toBeNull();
  });

  it('shoul return removed: true', async () => {
    jest
      .spyOn(voteRepository, 'updateScoreById')
      .mockImplementation(() => objectToDelete);
    jest
      .spyOn(recommendationsRepository, 'removeRecommendation')
      .mockImplementation(() => objectToDelete);
    const result = await voteService.updateScore({ id: 1, type: 'downvote' });
    expect(result?.removed).toBe(true);
  });

  it('should return object', async () => {
    jest.spyOn(voteRepository, 'updateScoreById').mockImplementation(() => object);
    const result = await voteService.updateScore({ id: 1, type: 'downvote' });
    expect(result).toEqual(object);
  });
});
