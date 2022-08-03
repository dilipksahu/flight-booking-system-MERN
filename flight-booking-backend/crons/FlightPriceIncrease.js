const Flight = require('../models/flight');

const dateFormat = require('dateformat');

var FlightPriceIncrease = async () => {

    let from = new Date(dateFormat(new Date().getTime() - 5 * 60 * 60 * 1000, 'isoDateTime', 'Asia/Kolkata'));
    let to = new Date()
    console.log("----- from", from, "=== to ", to, "==== nowDate ", new Date())
    let checkFlights = {
        date: {
            $gte: from,
            $lt: to,
        }

    }
    await Flight.find(checkFlights).then(async (flights) => {
        console.log("flights ", flights)
        if (flights.length) {
            let increaseRate = Math.floor(Math.random() * (10 - 5 + 1) + 5)
            console.log("increaseRate", increaseRate)
            for (let i = 0; i < flights.length; i++) {
                let increaseFare = flights[i].fare + (increaseRate / 100) * flights[i].fare;
                console.log("Previous Fare", flights[i].fare, "=== increaseFare", increaseFare)
                await Flight.findByIdAndUpdate({
                    _id: flights[i]._id,
                },
                    {
                        fare: increaseFare,
                    }
                )
            }
        }
    }).catch((error) => {
        console.log("error fetching flight data on cron ", error)
    })
}

module.exports = FlightPriceIncrease;