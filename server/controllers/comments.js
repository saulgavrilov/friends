const jwt = require("jsonwebtoken");
const connection = require("../config/db");

exports.getComments = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "jwts", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = `SELECT c.*, u.id AS userId, name, profilePic FROM comments AS c JOIN users AS u ON (u.id = c.userId)
    WHERE c.postId = ?
    ORDER BY c.createdAt DESC`;

    connection.query(q, [req.query.postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

exports.addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "jwts", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO comments (`desc`, `userId`, `postId`) VALUES (?)";

    const values = [req.body.desc, userInfo.id, req.body.postId];

    connection.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been added");
    });
  });
};
