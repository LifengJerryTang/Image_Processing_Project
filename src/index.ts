import express from "express";
import {promises as fs, existsSync} from "fs";
import sharp from 'sharp'
import path from "path";
import {checkQueryParams} from './middleware/check-query-params';

const app = express();
const port = 3000;

app.listen(port, async () => {
    console.log(`server started at http://localhost:${port}`);

    let thumbDir = path.resolve(__dirname, '../thumb');

    if (!existsSync(thumbDir)) {
        await fs.mkdir(thumbDir);
    }

});

app.get("/api/images", checkQueryParams,
    async (req, res, next) => {

    const filename: string = req.query.filename! as string;
    const width: number = +req.query.width!;
    const height: number = +req.query.height!;

    const originalFilePath = path.resolve(__dirname, `../images/${filename}.jpg`);

    if(!existsSync(originalFilePath)) {
        res.status(404).send(`Image named ${filename} DOES NOT EXISTS!`);
        return;
    }

    const originalImageFile: Buffer = await fs.readFile(originalFilePath);
    const thumbFilePath =
        path.resolve(__dirname, `../thumb/${filename}_thumb_${width}_${height}.jpg`)

    if (!existsSync(thumbFilePath)) {
        await sharp(originalImageFile)
            .resize({width, height})
            .toFile(thumbFilePath);
    }

    res.status(200).sendFile(thumbFilePath);

});


