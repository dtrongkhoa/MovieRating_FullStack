const express = require("express");
const cors = require("cors");
const db = require("./src/database");
const MovieList = require("./src/database/MoviesList");

const app = express();

const PORT = process.env.PORT || 4000;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

const userRoutes = require("./src/routes/user.routes.js");
const reviewRoutes = require("./src/routes/review.routes");
const movieRoutes = require("./src/routes/movie.routes");
const reservationRoutes = require("./src/routes/reservation.routes");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("./src/graphql");

app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reservations", reservationRoutes);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true,
  })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});

async function seedData() {
  const count = await db.movie.count();
  if (count > 0) return;

  await db.movie.bulkCreate(MovieList);
}

db.sequelize
  .sync()
  .then(() => {
    seedData();
    console.log("Database synced successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });
