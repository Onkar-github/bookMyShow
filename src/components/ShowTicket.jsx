import React, { Component } from "react";
import Img from "./Capture4.PNG"
import auth from "./authService"

class ShowTicket extends Component {

    goBack = (city, name) => {
        window.location = (`/home/${city}/${name}`)
    }

    render() {
        let ticket = auth.getTicket();
        console.log(ticket);
        let { city, title, movieHall, tickets, amount, time, date } = ticket;
        return (<React.Fragment>
            <div className="row bg-dark text-light p-2">
                <div className="col" onClick={() => this.goBack(city, title)}><i className="fa fa-chevron-left fa-2x m-2 pt-1"></i></div>
                <div className="col-11">
                    <h2>{title}</h2>
                    <h6>{movieHall}</h6>
                </div>
                <div className="col mt-3" onClick={() => this.goBack(city, title)}><h6><i className="fa fa-close mt-1"></i></h6></div>
            </div>

            <div className="row bg-grey">
                <div className="col-7">
                    <div className="bg-white">
                        <img src={Img} alt="" className="w-75 p-1" />
                    </div>
                </div>
                <div className="col-4 mb-4">
                    <div className="bg-white ps-4 py-2 mb-4">
                        <h5 className="text-danger mb-4">BOOKING SUMMARY</h5>
                        <div className="px-3 pb-2">
                            <div className="d-flex justify-content-between">
                                <span> Movie Name </span>
                                <span>{title}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span> Movie Hall </span>
                                <span>{movieHall}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span> Total Tickets </span>
                                <span>{tickets.length}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Tickets</span>
                                <span>{tickets.join(",")}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Date</span>
                                <span>{date}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>Time</span>
                                <span>{time}</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between bg-lemon p-1 px-3">
                            <span>Amount Paid</span>
                            <span>{"Rs " + amount}</span>
                        </div>
                    </div>
                    <div className="ps-3">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRrJejSeZdttrdAbqlA_pby8wUoMDRN_Caww&usqp=CAU" alt="QR code" width={"70%"} />
                        <br />
                        <div style={{ fontSize: "10px" }} className="ps-4">
                            <ll >You can cancel the tickets 4 hour(s) before the show. Refunds will be done according to</ll>
                            <br />
                            <small className="d-block text-center">Cancellation Policy</small>
                        </div>
                    </div>
                </div>
            </div>

        </React.Fragment>
        )
    }
}
export default ShowTicket