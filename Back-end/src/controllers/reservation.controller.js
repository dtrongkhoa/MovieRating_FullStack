const { default: retryAsPromised } = require("retry-as-promised");
const db = require("../database");

// Select all reservation from the database.
exports.all = async (req, res) => {
  try {
    const reservations = await db.reservation.findAll();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all reservation." });
  }
};

// Create a reservation in the database.
exports.create = async (req, res) => {
  const movieToUpdateSeat = await db.movie.findByPk(req.body.movieID);
  movieToUpdateSeat.Seats -= req.body.seatNum;

  const reservation = await db.reservation
    .create({
      userID: req.body.userID,
      movieID: req.body.movieID,
      movieTitle: req.body.movieTitle,
      seatNum: req.body.seatNum,
      session: req.body.session,
    })
    .then(async () => {
      await movieToUpdateSeat.save();
      res.json(reservation);
    });

  res.json(reservation);
};

// Update a reservation in the database
exports.updateReservation = async (req, res) => {
  const reservation = await db.reservation.findByPk(req.body.reservationID);

  //Update Reservation's fields
  reservation.seatNum = req.body.seatNum;

  await reservation.save();

  res.json(reservation);
};

exports.deleteReservation = async (req, res) => {
  try {
    const reservationToDelete = await db.reservation.findByPk(
      req.params.reservationID
    );

    if (reservationToDelete) {
      const returnSeat = reservationToDelete.seatNum;
      const movieToUpdateSeat = await db.movie.findByPk(
        reservationToDelete.movieID
      );
      movieToUpdateSeat.Seats += returnSeat;
      await reservationToDelete.destroy().then(await movieToUpdateSeat.save());
      res.json({ message: "Reservation deleted successfully." });
    } else {
      res.status(404).json({ message: "There are some errors!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Error deleting the reservation." });
  }
};
