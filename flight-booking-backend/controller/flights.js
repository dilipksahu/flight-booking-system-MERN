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
        let time = new Date(req.body.time);
        time = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
        console.log("data ", date, "== time", time);
        let datetime = new Date(date + " " + time);
        req.body.date = datetime;
        // const newFlight = new Flight(req.body);

        Flight.findByIdAndUpdate(req.params.id, req.body)
            .then(res.status(200).json("Flight updated!"))
            .catch((err) => res.status(500).json("Error: " + err));
    },



}
