const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

// ---- routes --------//
// const CustomerRoutes = require('./routes/CustomerRoutes');
// const FoodItemRoutes = require('./routes/FoodItemRoutes');
// const OrderMasterRoutes = require('./routes/OrderMasterRoutes');
// const OrderDetailRoutes = require('./routes/OrderDetailRoutes');

const app = express();
dotenv.config();
mongoose.set('debug', true);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


// coustomer routes
// app.use('/', CustomerRoutes);
// // food item routes
// app.use('/', FoodItemRoutes);
// // order master routes
// app.use('/', OrderMasterRoutes);
// // order detail routes
// app.use('/', OrderDetailRoutes);

// console.log("CONNECTION_URL===>", CONNECTION_URL);
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});