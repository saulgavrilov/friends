const connection = require("../config/db");
const jwt = require("jsonwebtoken");

exports.getUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "jwts", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");
    const userId = req.params.userId;

    const q = `SELECT * FROM users WHERE id = ?`;

    connection.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json(err);

      const { password, ...others } = data[0];

      return res.status(200).json(others);
    });
  });
};

exports.updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "jwts", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "UPDATE users SET `name` = ?, `coverPic` = ?, `profilePic` = ? WHERE id = ?";

    const values = [
      req.body.name,
      req.body.coverPic,
      req.body.profilePic,
      userInfo.id,
    ];

    connection.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.affectedRows > 0) return res.status(201).json("Updated");
      return res.status(403).json("You can update only your profile !");
    });
  });
};
