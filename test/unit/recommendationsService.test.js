/* eslint-disable no-undef */
import '../../setup.js';
import faker from 'faker';
import * as recommendationsService from '../../src/services/recommendationsService.js';
import * as recommendationsRepository from '../../src/repositories/recommendationsRepository.js';

describe('testing authenticateNewMusic', () => {
  const object = {
    name: faker.name.findName(),
    youtubeLink: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
  };
  const conflictObject = {
    name: faker.name.findName(),
    youtubeLink: 'https://www.youtube.com/watch?v=o4qsjmLxhow',
  };
  jest.spyOn(recommendationsRepository, 'getAllMusicLinks').mockImplementation(() => [
    {
      name: conflictObject.name,
      link: conflictObject.youtubeLink,
    },
  ]);

  jest
    .spyOn(recommendationsRepository, 'insertNewRecommendation')
    .mockImplementation(() => object);

  it('should return null', async () => {
    const result = await recommendationsService.authenticateNewMusic({
      name: faker.name.findName(),
      youtubeLink: 'youtube',
    });
    expect(result).toEqual(null);
  });

  it('should return false for conflict data', async () => {
    const result = await recommendationsService.authenticateNewMusic(conflictObject);
    expect(result).toEqual(false);
  });

  it('should return mocked object', async () => {
    const result = await recommendationsService.authenticateNewMusic(object);
    expect(result).toEqual(object);
  });
});
