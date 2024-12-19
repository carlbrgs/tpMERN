const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
app.use(express.json());
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const annonceRoutes = require("./routes/annonceRoute");


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());
const PORT = 3000;


const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/tpMERN", {})
  .then(console.log("Connected to MongoDB"));

app.use("/user", userRoutes);
app.use("/annonce", annonceRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
