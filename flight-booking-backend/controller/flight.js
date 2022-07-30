const Flight = require('../service/flight');

class FlightController {
    add(req, res) {
        console.log("req.body: " + JSON.stringify(req.body, null, 2));
        const responseResult = {}
        // let inputData = {
        //     customerName: req.body.customerName,
        // };

        Flight.add(req.body).then((result) => {
            console.log("Flight add Result:" + JSON.stringify(result, null, 2));
            if (result.code == 11000) {
                responseResult.success = false;
                responseResult.message = "Duplicate record";
            } else if (result.errors) {
                responseResult.success = false;
                responseResult.message = "Please Enter Proper Input!";
            } else {
                responseResult.success = true;
                responseResult.message = "Sucessfully saved Flight Details";
            }
            responseResult.data = result;
            return res.status(201).send(responseResult);
        }).catch((e) => {
            responseResult.success = false;
            responseResult.error = e;
            return res.status(500).send(responseResult);
        })
    }

    async list(req, res) {
        const responseResult = {}; let inputData = {};
        if (req.params.id) { inputData = { _id: req.params.id } }
        await Flight.find(inputData).then((result) => {
            console.log("Flight list Result:" + JSON.stringify(result, null, 2));

            if (result) {
                responseResult.success = true;
                responseResult.message = "Flight Details Found";
                responseResult.data = result;
            } else {
                responseResult.success = false;
                responseResult.message = "No Flight Found ";
                responseResult.data = result;
            }
            res.status(200).send(responseResult);
        }).catch((errors) => {
            responseResult.success = false;
            responseResult.error = errors;
            return res.status(500).send(responseResult);
        })
    }
}

module.exports = new FlightController();