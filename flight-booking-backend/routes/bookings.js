const router = require("express-promise-router")();
const BookingsController = require("../controller/bookings");

router

  .route("/")
  /**
   * @swagger
   * /bookings/(bookingId):
   *  get:
   *    summary: Get all booking details
   *    description: Used to get all the booking details for a certain booking id
   *    responses:
   *      '200':
   *        description: Got all booking details successfully
   *      '500':
   *        description: Server error
   *  parameters:
   *       - in: path
   *         name: bookingId
   *         required: true
   *         schema:
   *         type: String
   *         description: The booking ID
   */
  .get(BookingsController.getAllBookings)
  /**
   * @swagger
   * /bookings/:
   *   post:
   *     tags:
   *       - Booking
   *     description: Save booking details for a user
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: newBookingDetail
   *         description: Booking object
   *         in: body
   *         required: true
   *     responses:
   *       200:
   *         description: Return saved booking
   */
  .post(BookingsController.addNewBooking);
  

router
  .route("/:bookingId")
  /** 
  * @swagger
  * /bookings/{id}:
  *  get:
  *    summary: Fetch a booking.
  *    description: Used to fetch a single booking
  *    responses:
  *      '200':
  *        description: Successfully fetched booking
  *      '500':
  *        description: Server error
  *  parameters:
  *       - in: path
  *         name: id
  *         required: true
  *         schema:
  *         type: String
  *         description: The booking ID
  */
  .get(BookingsController.getBookingById)
  /**
   * @swagger
   * /bookings/(id):
   *   patch:
   *     tags:
   *       - Booking
   *     description: Update booking details for a holding booking
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: updateholdingBooking
   *         description: Booking object
   *         in: body
   *         required: true
   *     responses:
   *       201:
   *         description: Return updated booking
   */
  .patch(BookingsController.updateBooking)
  /** 
  * @swagger
  * /bookings/{id}:
 *  delete:
 *    summary: Delete a booking.
 *    description: Used to delete a booking
 *    responses:
 *      '200':
 *        description: Successfully deleted booking
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *         type: String
 *         description: The booking ID
 */
  .delete (BookingsController.cancelBooking);

router
  .route("/userDetails/:userDetailId")
  /**
  * @swagger 
  * /bookings/{userDetailId}:
 *  get:
 *    summary: Fetch a booking.
 *    description: Used to fetch a all bookings by userDetailId
 *    responses:
 *      '200':
 *        description: Successfully fetched bookings
 *      '500':
 *        description: Server error
 *  parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *         type: String
 *         description: The booking ID
 */
  .get(BookingsController.getUserDetailBookings);

router.route("/razorpay").post(BookingsController.payment);
router.route("/verification").post(BookingsController.verifyPayment);
router.route("/userwiseHolding").post(BookingsController.getUserWiseHoldingDetails);
module.exports = router;
