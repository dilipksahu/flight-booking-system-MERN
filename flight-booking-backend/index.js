const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const morgan = require("morgan");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const pdf = require("html-pdf");
const cron = require("node-cron");
const pdfTemplate = require("./documents");
require('dotenv').config({ path: path.join(__dirname, '.env') });

// ---- routes import--------//
const userRouter = require("./routes/users");
const userDetailsRouter = require("./routes/userDetails");
const flightsRouter = require("./routes/flights");
const bookingsRouter = require("./routes/bookings");

// Cron
const cancelHoldBook = require('./crons/HoldBookingCancel');
// let cancelHoldBookingCron = cron.schedule('* */10 * * * *', cancelHoldBook);
// cancelHoldBookingCron.start();

const flightPriceIncrease = require('./crons/FlightPriceIncrease');
// let flightPriceIncreaseCron = cron.schedule('*/1 * * * * *', flightPriceIncrease);
// flightPriceIncreaseCron.start();

const app = express();
dotenv.config();
mongoose.set('debug', true);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan("dev"));

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      swagger: "2.0",
      version: "1.0.0",
      title: "User Details API",
      description: "It contains information of the traveller ",
      contact: {
        name: "Pranav Karmarkar",
      },
      servers: ["http://localhost:" + process.env.PORT],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes 
app.use("/", userRouter);
app.use("/users", userDetailsRouter);
app.use("/flights", flightsRouter);
app.use("/bookings", bookingsRouter);

app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile('./result.pdf', (err, res) => {
    if (err) {
      res.send(Promise.reject(err));
    } else {
      res.send(Promise.resolve(res));
    }
  });
});

app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

// console.log("CONNECTION_URL===>", CONNECTION_URL);
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});