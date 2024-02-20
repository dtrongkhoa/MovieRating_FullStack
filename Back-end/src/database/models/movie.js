module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "movie",
    {
      movieID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      Title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Year: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      Rated: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      Released: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      Runtime: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      Genre: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Director: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      Writer: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Actors: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Plot: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Language: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Country: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Awards: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      Seats: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Poster: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // Don't add the timestamp attributes (updatedAt, createdAt).
      timestamps: true,
    }
  );
