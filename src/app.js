import express from 'express';
import cors from 'cors';
import * as recommendationsController from './controllers/recomendationsController.js';
import * as voteController from './controllers/voteController.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/recommendations', recommendationsController.addNewMusic);
app.post('/recommendations/:id/upvote', voteController.upvote);
app.post('/recommendations/:id/downvote', voteController.downvote);

app.get('/recommendations/random', recommendationsController.getRecommendation);
app.get('/recommendations/top/:amount', recommendationsController.listTopMusics);

export default app;
