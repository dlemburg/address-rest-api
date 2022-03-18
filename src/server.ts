import bodyParser from 'body-parser';
import express from 'express';
import router from './rest';

export let app;
const port = process.env.PORT || 4000;

export async function startServer() {
  app = express();

  app.use(bodyParser.json());
  app.use(router);

  app.use((err, req, res, next) => {
    console.error(`[${err.message}]: ${err.stack}`);
    res.status(500).send({ err: err.message });
  });

  await new Promise<void>((resolve) => app.listen(port, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}`);

  return app;
}
