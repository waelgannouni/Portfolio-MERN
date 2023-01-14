const express = require("express");
const cors = require("cors");
const path = require('path');
const mongoose = require("mongoose");
const authRoutes = require("./routes/AuthRoutes");
const userRoutes = require("./routes/UserRoutes");
const aboutRoutes = require("./routes/AboutRoutes");
const resumeRoutes = require("./routes/ResumeRoutes");
const portfolioRoutes = require("./routes/PortfolioRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.listen(3060, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started Successfully.");
  }
});

mongoose
  .connect("mongodb://localhost:27017/portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

  
  
  app.use(
    cors({
      origin: ["http://localhost:3000"],
    methods: ["GET", "POST","DELETE","PATCH"],
    credentials: true,
  })
  );
  app.use(cookieParser());
  app.use(express.json({limit: '50mb'}));
  app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
  app.use("/", authRoutes,userRoutes,aboutRoutes,resumeRoutes,portfolioRoutes);