const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = {};

graphql.schema = buildSchema(`
  # The GraphQL types are declared first.

  type Movie {
    movieID: Int, 
    Title: String,
    Year: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Seats: Int,
    Poster: String,
  }
  type User {
    userID: Int,
    username: String,
    password_hash: String,
    reviews: [Review],
    reservations: [Reservation],
  }

  type Review {
    reivewID: Int,
    text: String,
    rating: Int,
    userID: Int, 
    username: String,
    movieID: Int,
  }

  type Reservation {
    reservationID: Int,
    userID: Int,
    movieID: Int, 
    movieTitle: String,
    seatNum: Int,
    session: String,
  }

  # The input type can be used for incoming data.
  input UserInput {
    userID: Int,
    username: String,
    password_hash: String,
  }
  input MovieInput {
    Title: String,
    Year: String,
    Rated: String,
    Released: String,
    Runtime: String,
    Genre: String,
    Director: String,
    Writer: String,
    Actors: String,
    Plot: String,
    Language: String,
    Country: String,
    Awards: String,
    Seats: Int,
    Poster: String,
  }

  input ReviewInput{
    reviewID: Int,
  }

  # Queries (read-only operations).
  type Query {
    all_users: [User],
    all_movies: [Movie],
    all_reviews: [Review],
    all_reservation: [Reservation],
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
    create_movie(input: MovieInput): Movie,
    update_user(input: UserInput): User,
    delete_review(input: ReviewInput): Review,
  }
`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  all_users: async () => {
    return await db.user.findAll();
  },
  all_movies: async () => {
    return await db.movie.findAll();
  },
  all_reviews: async () => {
    return await db.review.findAll();
  },
  all_reservation: async () => {
    return await db.reservation.findAll();
  },

  // Mutations.
  delete_review: async (args) => {
    const review = await db.review.findByPk(args.input.reviewID);

    if (review === null) return;
    review.text = "**** This review has been deleted by the admin ***";

    await review.save();
    return review;
  },
  //   create_owner: async (args) => {
  //     const owner = await db.owner.create(args.input);

  //     return owner;
  //   },

  //   update_owner: async (args) => {
  //     const owner = await db.owner.findByPk(args.input.email);

  //     // Update owner fields.
  //     owner.first_name = args.input.first_name;
  //     owner.last_name = args.input.last_name;

  //     await owner.save();

  //     return owner;
  //   },
  //   delete_owner: async (args) => {
  //     const owner = await db.owner.findByPk(args.email);

  //     if (owner === null) return false;

  //     // First remove all pets owned by the owner.
  //     await db.pet.destroy({ where: { email: owner.email } });
  //     await owner.destroy();

  //     return true;
  //   },
};

module.exports = graphql;
