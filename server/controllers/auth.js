const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../config/db");

exports.register = (req, res) => {
  const q = "SELECT email FROM users WHERE email = ?";

  connection.execute(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User is already exists");

    const salt = bcrypt.genSaltSync(10);
    const hashedPassowrd = bcrypt.hashSync(req.body.password, salt);

    const q =
      "INSERT INTO users (name, email, password, coverPic, profilePic) VALUES (?)";

    const values = [
      req.body.name,
      req.body.email,
      hashedPassowrd,
      req.body.coverPic,
      req.body.profilePic,
    ];

    connection.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(201).json("User has beed created");
    });
  });
};

exports.login = (req, res) => {
  const q = "SELECT * FROM users WHERE email = ?";

  connection.execute(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    const checkPasswords = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPasswords) return res.status(400).json("invalid credentials");

    const token = jwt.sign({ id: data[0].id }, "jwts");

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

exports.logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been logged out");
};
