import {promises as fs, existsSync} from "fs";
import { Router} from 'express';
import sharp from 'sharp'
import path from "path";
import {checkQueryParams} from '../middleware/check-query-params';

const router = Router();
router.get("/api/images", checkQueryParams,
    async (req, res, next) => {

        const filename: string = req.query.filename! as string;
        const width: number = +req.query.width!;
        const height: number = +req.query.height!;

        const originalFilePath = path.resolve(__dirname, `../assets/images/${filename}.jpg`);

        if(!existsSync(originalFilePath)) {
            res.status(404).send(`Image named ${filename} DOES NOT EXISTS!`);
            return;
        }

        const originalImageFile: Buffer = await fs.readFile(originalFilePath);
        const thumbFilePath =
            path.resolve(__dirname, `../assets/thumbnails/${filename}_thumb_${width}_${height}.jpg`)

        if (!existsSync(thumbFilePath)) {
            await sharp(originalImageFile)
                .resize({width, height})
                .toFile(thumbFilePath);
        }

        res.status(200).sendFile(thumbFilePath);

    });

export default router;
