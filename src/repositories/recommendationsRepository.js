import connection from '../database.js';

async function getAllMusicLinks() {
  const result = await connection.query('SELECT link FROM recommendations;');
  return result.rows;
}

async function getAllRecommendations() {
  const result = await connection.query('SELECT * FROM recommendations;');
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
async function removeRecommendation(id) {
  const result = await connection.query(
    `
    DELETE
    FROM recommendations
    WHERE id = $1`,
    [id],
  );
  return result.rows[0];
}
async function getTopRecommendationsOrdered(quantity) {
  const result = await connection.query(
    `
  SELECT *
  FROM recommendations
  ORDER BY score DESC
  LIMIT $1;`,
    [quantity],
  );
  return result.rows;
}

export {
  getAllMusicLinks,
  insertNewRecommendation,
  removeRecommendation,
  getAllRecommendations,
  getTopRecommendationsOrdered,
};
