import connection from '../database.js';

async function updateScoreById({ id, symbol }) {
  const result = await connection.query(
    `
    UPDATE recommendations
    SET score = score ${symbol} 1
    WHERE id = $1
    RETURNING *;`,
    [id],
  );
  return result.rows[0];
}

export { updateScoreById };
