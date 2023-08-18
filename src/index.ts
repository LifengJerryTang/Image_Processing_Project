import express from "express";
import {promises as fs} from "fs";
import sharp from 'sharp'
import path from "path";

const app = express();
const port = 3000;

app.listen(port, async () => {
    console.log(`server started at http://localhost:${port}`);

    try {
        let thumbDir = path.resolve(__dirname, '../thumb');
        await fs.mkdir(thumbDir);
    } catch (error) {
        console.log("Thumbnail directory already exists! No actions need to be taken here.");
    }

});

app.get("/api/images", async (req, res, next) => {

    console.log(req.query.filename!)
    const filename: string = req.query.filename! as string;
    const width: number = +req.query.width!;
    const height: number = +req.query.height!;

    const originalImageFile: Buffer =
        await fs.readFile(path.resolve(__dirname, `../images/${filename}.jpg`));

    const thumbFilePath = path.resolve(__dirname, `../thumb/${filename}_thumb.jpg`)

    await sharp(originalImageFile)
        .resize({width, height})
        .toFile(thumbFilePath);

    res.status(200).sendFile(thumbFilePath);
});


