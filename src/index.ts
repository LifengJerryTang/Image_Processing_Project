import express from 'express';
import { promises as fs, existsSync } from 'fs';
import path from 'path';
import imagesRouter from './routes/images';

const app = express();
const port = 3000;

app.listen(port, async () => {
  console.log(`server started at http://localhost:${port}`);

  const thumbDir = path.resolve(__dirname, './assets/thumbnails');

  if (!existsSync(thumbDir)) {
    await fs.mkdir(thumbDir);
  }
});

app.use(imagesRouter);

export default app;
