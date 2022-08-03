const router = require("express").Router();
let Flight = require("../models/flight");
let Booking = require("../models/booking");
const FlightController = require("../controller/flights");

/**
 * @swagger
 * /flights/:
 *  get:
 *    summary: Get all flights
 *    description: Used to get all the flights
 *    responses:
 *      '200':
 *        description: Got all flights successfully
 *      '500':
 *        description: Server error
 */
router.route("/").get((req, res) => {
  Flight.find()
    .then((flights) => {
      console.log("------ all flights ", flights)
      // Booking.count()
      res.status(200).json(flights)
    }).catch((err) => res.status(500).json("Error: " + err));
});

/**
 * @swagger
 * /flights/:
 *  post:
 *    summary: Creates a new flight.
 *    description: Used to create new flight
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: Object
 *            properties:
 *              airlines:
 *                type: String
 *              name:
 *                type: String
 *              from:
 *                type: String
 *              to:
 *                type: String
 *              date:
 *                type: Date
 *              fare:
 *                type: Number
 *            example:
 *              airlines: Air India
 *              name: AI4131
 *              from: PNQ
 *              to: BOM
 *              date: 2020-09-05
 *              fare: 4000
 *    responses:
 *         '200':
 *           description: A successful response
 *         '500':
 *           description: Server error
 */
router.route("/").post(FlightController.addNewFlights);

/**
 * @swagger
 * /flights/{id}:
 *  get:
 *    summary: Fetch a flight.
 *    description: Used to fetch a single flight
 *    responses:
 *      '200':
 *        description: Successfully fetched flight
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *         type: String
 *         description: The flight ID
 */
router.route("/:id").get((req, res) => {
  console.log("req.params", req.params)
  Flight.findById(req.params.id)
    .then((flight) => res.status(200).json(flight))
    .catch((err) => res.status(500).json("Error: " + err));
});

/**
 * @swagger
 * /flights/{id}:
 *  delete:
 *    summary: Delete a flight.
 *    description: Used to delete a flight
 *    responses:
 *      '200':
 *        description: Successfully deleted flight
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *         type: String
 *         description: The flight ID
 */
router.route("/:id").delete((req, res) => {
  Flight.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Flight deleted."))
    .catch((err) => res.status(500).json("Error: " + err));
});

/**
 * @swagger
 * /flights/{id}:
 *  patch:
 *    summary: Modify a flight.
 *    description: Used to modify existing flight
 *    responses:
 *      '200':
 *        description: Successfully updated flight
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *         type: String
 *         description: The flight ID
 */
router.route("/:id").patch(FlightController.updateFlight);

/**
 * @swagger
 * /flights/search/:
 *  post:
 *    summary: Search flights
 *    description: Used to search flights
 *    responses:
 *      '200':
 *        description: Successfully searched flights
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: body
 *         name: from
 *         required: true
 *         schema:
 *         type: String
 *         description: Source
 *       - in: body
 *         name: to
 *         required: true
 *         schema:
 *         type: String
 *         description: Destination
 *       - in: body
 *         name: date
 *         required: true
 *         schema:
 *         type: Date
 *         description: Journey date
 */
router.route("/search").post((req, res) => {
  console.log("flight search", req.body)
  const from = req.body.from;
  const to = req.body.to;
  const startDate = Date.parse(req.body.date);
  const endDate = startDate + 24 * 60 * 60 * 1000;
  console.log(endDate);
  Flight.find({ from, to, date: { $gte: startDate, $lt: endDate } })
    .exec()
    .then(async (flights) => {
      let flightResult = [];
      for (let flt of flights){
        let bookingCount = await Booking.count({
          flight: flt._id,
        })
        if (bookingCount <= 180){
          flightResult = [...flightResult,flt]
        }
      }
      res.status(200).json(flightResult)
    })
    .catch((err) => res.status(500).json("Error: " + err));
});

module.exports = router;
