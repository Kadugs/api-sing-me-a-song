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
  jest.spyOn(recommendationsRepository, 'getAllMusicLinks').mockReturnValue([
    {
      name: conflictObject.name,
      link: conflictObject.youtubeLink,
    },
  ]);

  it('should return undefined', async () => {
    jest
      .spyOn(recommendationsRepository, 'insertNewRecommendation')
      .mockReturnValueOnce({});
    const result = await recommendationsService.authenticateNewMusic(object);
    expect(result).toEqual(undefined);
  });

  jest
    .spyOn(recommendationsRepository, 'insertNewRecommendation')
    .mockReturnValue(object);

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
describe('testing drawRecommendations', () => {
  it('should return null', async () => {
    jest.spyOn(recommendationsRepository, 'getAllRecommendations').mockReturnValue({});
    const result = await recommendationsRepository.getAllRecommendations();
    expect(result).toEqual({});
  });
  it('should return 100% random recommendations', async () => {
    const body = [
      {
        id: 1,
        name: 'test1',
        link: 'https://www.youtube.com/watch?v=KVYup3Qwh8Q',
        score: 10,
      },
      {
        id: 2,
        name: 'test2',
        link: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
        score: 10,
      },
    ];
    jest.spyOn(recommendationsRepository, 'getAllRecommendations').mockReturnValue(body);
    const result = await recommendationsService.drawRecommendation();
    expect(body).toContain(result);
  });
  it('should return 70% high rated random recommendations', async () => {
    const body = [
      {
        id: 1,
        name: 'test1',
        link: 'https://www.youtube.com/watch?v=KVYup3Qwh8Q',
        score: 5,
      },
      {
        id: 2,
        name: 'test2',
        link: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
        score: 11,
      },
      {
        id: 3,
        name: 'test3',
        link: 'https://www.youtube.com/watch?v=ewOPQZZn4SY',
        score: 30,
      },
    ];
    jest.spyOn(recommendationsRepository, 'getAllRecommendations').mockReturnValue(body);
    const result = await recommendationsService.drawRecommendation();
    expect(body).toContain(result);
  });
});

describe('testing getRecommendationsAcoount', () => {
  it('return null', async () => {
    jest
      .spyOn(recommendationsRepository, 'getTopRecommendationsOrdered')
      .mockReturnValueOnce([]);
    const result = await recommendationsService.getRecommendationAmount(0);
    expect(result).toBeNull();
  });
  it('return ordered recommendations', async () => {
    const body = [
      {
        id: 3,
        name: 'test3',
        link: 'https://www.youtube.com/watch?v=ewOPQZZn4SY',
        score: 30,
      },
    ];
    jest
      .spyOn(recommendationsRepository, 'getTopRecommendationsOrdered')
      .mockReturnValueOnce(body);
    const result = await recommendationsService.getRecommendationAmount(1);
    expect(result[0]).toEqual(body[0]);
  });
});
