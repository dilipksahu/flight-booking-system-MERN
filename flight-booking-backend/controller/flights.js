const Flight = require("../models/flight");

module.exports = {

    addNewFlights: async (req, res, next) => {
        console.log("flight", req.body)
        let date = new Date(req.body.date);
        date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        let time = new Date(req.body.time);
        time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        console.log("data ", date, "== time", time);
        let datetime = new Date(date + " " + time);
        req.body.date = datetime;
        const newFlight = new Flight(req.body);

        newFlight
            .save()
            .then((result) => res.status(200).json("Flight added!"))
            .catch((err) => res.status(500).json("Error: " + err));
    },

    updateFlight: async (req, res, next) => {
        console.log("flight", req.body)
        let date = new Date(req.body.date);
        date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        let time = new Date(date + " " + req.body.time);
        time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        console.log("data ", date, "== time", time);
        let datetime = new Date(date + " " + time);
                
        req.body.date = datetime;
        req.body.time = datetime;

        await Flight.findByIdAndUpdate(req.params.id, req.body)
            .then((result) => res.status(200).json("Flight updated!"))
            .catch((err) => res.status(500).json("Error: " + err));
    },

    getFlights: async (req, res, next) => {
        let findFlight = {};
        let flightId = req.params.id;
        if(flightId){
            findFlight._id = flightId
        }
        await Flight.find(findFlight)
            .then((flights) => {
                console.log("------ all flights getflights ", flights)
                let flightResult = [];
                if (flights.length) {
                    for (let i = 0; i < flights.length; i++) {
                        let date = flights[i].date;
                        date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                        let time = new Date(flights[i].time);
                        time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
                        console.log("data ", date, "== time", time);
                        let eachFlight = {
                            _id: flights[i]._id,
                            airlines: flights[i].airlines,
                            fare: flights[i].fare,
                            from: flights[i].from,
                            to: flights[i].to,
                            name: flights[i].name,
                            date: date,
                            time: time,
                        }
                        flightResult = [...flightResult, eachFlight]
                    }
                }
                if (flightResult.length == 1) {
                    return res.status(200).json(flightResult[0])
                }
                res.status(200).json(flightResult)
            }).catch((err) => res.status(500).json("Error: " + err));
    },

}
