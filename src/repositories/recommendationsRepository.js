import connection from '../database.js';

async function getAllMusicLinks() {
  const result = await connection.query('SELECT link FROM recommendations;');
  return result.rows;
}

async function insertNewRecommendation({ name, youtubeLink }) {
  const result = await connection.query(
    `
      INSERT
      INTO recommendations (name, link)
      VALUES ($1, $2)
      RETURNING *;  
      `,
    [name, youtubeLink],
  );
  return result.rows[0];
}

export { getAllMusicLinks, insertNewRecommendation };
