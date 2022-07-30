const Flight = require('../model/flight');

class FlightService {
    add(data) {
        return Flight.add(data)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
    find(data, callback) {
        return Flight.find(data, callback)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
    update(condition, data) {
        return Flight.update(condition, data)
            .then((result) => {
                console.log(result)
                return result
            })
            .catch((error) => {
                return error
            })
    }
    delete(data) {
        return Flight.delete(data)
            .then((result) => {
                return result
            })
            .catch((error) => {
                return error
            })
    }
}

module.exports = new FlightService();