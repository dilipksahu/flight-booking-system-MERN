import React, { Component } from "react";
import { Jumbotron, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class SuccessHoldingPage extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.booking.booking._id);
  }
  render() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return (
      <>
        {this.props.booking ? (
          <div>
            {this.props.booking.hasOwnProperty("_id") ? (
              <Jumbotron>
                <h1>Holding Flight Fare successful!</h1>
                <p>Your flight is hold for maximum 3 hours (i.e {date +" "+time})</p>
                <p>
                  <Button variant="primary">
                    <Link
                      to="/mybookings"
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                      View all bookings
                    </Link>
                  </Button>{" "}
                </p>
              </Jumbotron>
            ) : null}
          </div>
        ) : (
          <Jumbotron>
            <h1>Holding Flight Fare failed!</h1>
            <p>Please try again</p>
            <p>
              <Button variant="primary">
                <Link
                  to="/"
                  style={{ color: "inherit", textDecoration: "inherit" }}
                >
                  Search Flight
                </Link>
              </Button>
            </p>
          </Jumbotron>
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    booking: state.flight.booking,
    cancelBooking: state.flight.cancelBooking,
  };
}

export default connect(mapStateToProps)(SuccessHoldingPage);
