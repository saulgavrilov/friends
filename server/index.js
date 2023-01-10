const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");

const auth = require("./routes/auth");
const comments = require("./routes/comments");
const likes = require("./routes/likes");
const posts = require("./routes/posts");
const users = require("./routes/users");
const relationships = require("./routes/relationships");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/api/v1/uploads", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});
app.use("/uploads", express.static("uploads"));
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/comments", comments);
app.use("/api/v1/likes", likes);
app.use("/api/v1/posts", posts);
app.use("/api/v1/relationships", relationships);

app.listen(5000, console.log(`Server running on port 5000`));
