const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var flightSchema = new Schema({
  airlines: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time:{
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Flight", flightSchema);
// class FlightModel {
//     add(data) {
//         console.log(data);
//         return new Promise((resolve, reject) => {
//             new Flight(data).save().then((result) => {
//                 resolve(result);
//             }).catch((err) => {
//                 reject(err);
//             })
//         })
//     }

//     find(data, callback) {

//         return new Promise((resolve, reject) => {
//           Flight.find(data)
//                 .sort({ createdAt: -1 })
//                 .lean()
//                 .then((result) => {
//                     resolve(result);
//                 }).catch((err) => {
//                     reject(err);
//                 })
//         })

//     }

//     update(condition, data) {
//         return new Promise((resolve, reject) => {
//           Flight.update(condition, data).then((result) => {
//                 resolve(result);
//             }).catch((err) => {
//                 reject(err);
//             })
//         })
//     }

//     delete(data, callback) {

//         return new Promise((resolve, reject) => {
//           Flight.findByIdAndRemove({ '_id': data.id }).then((result) => {
//                 resolve(result);
//             }).catch((err) => {
//                 console.log(err);
//                 reject(err);
//             })
//         })
//     }



// }

// module.exports = new FlightModel();