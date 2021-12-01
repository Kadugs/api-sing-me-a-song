import * as voteService from '../services/voteService.js';

async function voteFactory({ id, type }) {
  try {
    const newScore = await voteService.updateScore({ id, type });
    return newScore;
  } catch (err) {
    console.error(err);
    return 500;
  }
}

async function upvote(req, res) {
  const type = 'upvote';
  const status = await voteFactory({ id: req.params, type });
  return res.sendStatus(status);
}
async function downvote(req, res) {
  const type = 'downvote';
  const status = await voteFactory({ id: req.params, type });
  return res.sendStatus(status);
}

export { upvote, downvote };
