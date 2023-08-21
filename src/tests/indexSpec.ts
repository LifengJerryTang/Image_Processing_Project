import app from "../index";
import supertest from "supertest";
import {existsSync} from "fs";
import path from "path";

const request = supertest(app);
describe("Test image processing endpoint responses", (): void => {
    it('Returns successful response code when query params are valid',
        async () => {
        const imageName = 'fjord';
        const width = 200;
        const height = 250;
        const url = `/api/images?filename=${imageName}&width=${width}&height=${height}`;

        const response = await request.get(url);
        const thumbFilePath =
            path.resolve(__dirname, `../assets/thumbnails/${imageName}_thumb_${width}_${height}.jpg`)

        expect(response.status).toBe(200);
        expect(existsSync(thumbFilePath)).toBeTruthy();

    })
})
