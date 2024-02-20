const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const sequelizeInstance = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.DIALECT,
  }
);

const db = {
  sequelize: sequelizeInstance,
  Sequelize: Sequelize,
  Op: Sequelize.Op,
  user: require("./models/user.js")(sequelizeInstance, DataTypes),
  review: require("./models/review.js")(sequelizeInstance, DataTypes),
  movie: require("./models/movie.js")(sequelizeInstance, DataTypes),
  reservation: require("./models/reservation.js")(sequelizeInstance, DataTypes),
};

db.review.belongsTo(db.user, {
  foreignKey: { name: "userID", allowNull: false },
});

db.review.belongsTo(db.movie, {
  foreignKey: { name: "movieID", allowNull: false },
});

db.reservation.belongsTo(db.user, {
  foreignKey: { name: "userID", allowNull: false },
});

db.reservation.belongsTo(db.movie, {
  foreignKey: { name: "movieID", allowNull: false },
});

module.exports = db;
