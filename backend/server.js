const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middlewares/erroeMiddleware");

const app = express();
dotenv.config();
connectDB();


app.get("/", (req, res) => {
  res.send("Request received");
});

app.use(express.json()); //accept json data

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`server started at port ${PORT}`));