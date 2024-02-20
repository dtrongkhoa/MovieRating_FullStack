module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "reservation",
    {
      reservationID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      movieID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      movieTitle: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      seatNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      session: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
