let Booking = require("../models/booking");

const dateFormat = require('dateformat');

var HoldBookingCancel = async () => {

    let toDate = new Date(dateFormat(new Date().getTime() - 3 * 60 * 60 * 1000, 'isoDateTime', 'Asia/Kolkata'));
    console.log("----- toDate", toDate, "==== nowDate ", new Date())
    let checkholdings = {
        holdingStatus: true,
        updatedAt: {
            $lt : toDate
        }
    }

    await Booking.find(checkholdings).then(async (book) => {
        if (book.length) {
            let bookingIds = book.map((e1) => { return e1._id });
            console.log("GGGG ", bookingIds)
            for (let i = 0; i < bookingIds.length; i++) {
                let updateBook = await Booking.findByIdAndUpdate({
                    _id: bookingIds[i],
                },
                    {
                        holdingStatus: false,
                    }
                );
            }
        }
    }).catch((error) => {
        console.log("error on fetching hold bookings ", error)
    })

}

module.exports = HoldBookingCancel;