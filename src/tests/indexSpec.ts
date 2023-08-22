import app from '../index';
import supertest from 'supertest';
import { existsSync } from 'fs';
import path from 'path';

const request = supertest(app);
describe('Test image processing endpoint responses', (): void => {
  const imageName = 'fjord';
  const width = 200;
  const height = 250;
  const url = `/api/images?filename=${imageName}&width=${width}&height=${height}`;

  it('Returns successful response code when query params are valid', async () => {
    const response = await request.get(url);

    expect(response.status).toBe(200);
  });

  it('Produces the correctly processed image when query params are valid', async () => {
    await request.get(url);

    const thumbFilePath = path.resolve(
      __dirname,
      `../assets/thumbnails/${imageName}_thumb_${width}_${height}.jpg`
    );

    expect(existsSync(thumbFilePath)).toBeTruthy();
  });
});
