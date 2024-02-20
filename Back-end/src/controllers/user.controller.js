const db = require("../database");
const argon2 = require("argon2");

exports.all = async (req, res) => {
  try {
    const users = await db.user.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all users." });
  }
};

exports.one = async (req, res) => {
  try {
    const user = await db.user.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching the user." });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: { username: req.body.username },
    });

    if (user && (await argon2.verify(user.password_hash, req.body.password))) {
      const userResponse = { ...user.toJSON() };
      delete userResponse.password_hash;
      res.json(userResponse);
    } else {
      res.status(401).json({ message: "Invalid username or password." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error during login." });
  }
};

exports.create = async (req, res) => {
  try {
    const existingUser = await db.user.findOne({
      where: { username: req.body.username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already taken." });
    }

    const hash = await argon2.hash(req.body.password, {
      type: argon2.argon2id,
    });

    const user = await db.user.create({
      username: req.body.username,
      password_hash: hash,
    });

    const userResponse = { ...user.toJSON() };
    delete userResponse.password_hash;

    res.json(userResponse);
  } catch (error) {
    res.status(500).json({ message: "Error creating user." });
  }
};

exports.oneByUsername = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: { username: req.params.username },
    });
    if (user) {
      const userResponse = { ...user.toJSON() };
      delete userResponse.password_hash;

      res.json(userResponse);
    } else {
      res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching the user." });
  }
};

exports.update = async (req, res) => {
  console.log("Attempting to update user:", req.params.username);
  console.log("Received update data:", req.body);

  try {
      const user = await db.user.findOne({
          where: { username: req.params.username },
      });
      console.log("Queried user:", user);

      if (user) {
          const hash = await argon2.hash(req.body.password, {
              type: argon2.argon2id,
          });
          console.log("Hashed password:", hash);
          
          await user.update({
              username: req.body.username,
              password_hash: hash,
          });
          console.log("User updated successfully in the database.");
          res.json({ message: "User updated successfully." });
      } else {
          console.warn("User not found for username:", req.params.username);
          res.status(404).json({ message: "User not found." });
      }
  } catch (error) {
      console.error("Error updating the user:", error.message);
      res.status(500).json({ message: "Error updating the user." });
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await db.user.findOne({
      where: { username: req.params.username },
    });

    if (!user) {
      console.error("User not found for deletion:", req.params.username);
      return res.status(404).json({ message: "User not found." });
    }

    // Deleting the user's reviews
    const deleteReviews = await db.review.destroy({
      where: { userID: user.userID },
    });
    console.log(`Deleted ${deleteReviews} reviews for user ${req.params.username}`);

    // Deleting the user's reservations
    const deleteReservations = await db.reservation.destroy({
      where: { userID: user.userID },
    });
    console.log(`Deleted ${deleteReservations} reservations for user ${req.params.username}`);

    // Deleting the user
    await user.destroy();
    console.log(`Deleted user ${req.params.username}`);

    res.json({ message: "User and associated data deleted successfully." });

  } catch (error) {
    console.error("Error during user deletion process:", error.message);
    res.status(500).json({ message: "Error deleting the user and associated data." });
  }
};
