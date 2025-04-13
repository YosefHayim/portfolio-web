import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    response: "Welcome to new_p project",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
