const db = require("../database");

exports.all = async (req, res) => {
  const movies = await db.movie.findAll();
  res.json(movies);
};
