import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  const name = 'hi';
  return res.send(`hello world ${name}`);
});

export default app;
