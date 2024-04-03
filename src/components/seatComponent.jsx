import React, { Component } from "react";
import http from "./httpService";
import auth from "./authService"
import payBase from "./payBaseLogo.svg"
import Login from "./Login";

class Seats extends Component {

    state = {
        ticket: [],
        reclinerTicket: [],
        goldTicket: [],
        seats: [],
        timeIndex: "false",
        checkLogin: "",
    }

    async componentDidMount() {
        let response = await http.get(`/app/seats`);
        let { data } = response;
        this.setState({ seats: data });
    }

    handleTime = (index) => {
        let s1 = { ...this.state };
        s1.timeIndex = index;
        s1.ticket = [];
        s1.reclinerTicket = [];
        s1.goldTicket = [];
        this.setState(s1)
    }

    goBack = (city, name) => {
        this.props.setValues("true")
        this.props.history.push(`/home/${city}/${name}`)
    }

    addTicket = (row, price, num, available) => {
        if (available) {
            console.log("ticket Componenet");
            let seat = row + num;
            let { ticket, reclinerTicket, goldTicket } = this.state;
            if (price === 420) {
                let index = reclinerTicket.findIndex((f1) => f1 === seat);
                (index > -1) ? reclinerTicket.splice(index, 1) : reclinerTicket.push(seat);
            }
            else {
                let index = goldTicket.findIndex((f1) => f1 === seat);
                (index > -1) ? goldTicket.splice(index, 1) : goldTicket.push(seat);
            }
            ticket = [...reclinerTicket, ...goldTicket]
            this.setState({ ticket: ticket, reclinerTicket: reclinerTicket, goldTicket: goldTicket });
        }
    }

    async postSeat(url, obj) {
        let response = await http.post(url, obj);
        let { data } = response;
        console.log("ticket data => ", data)
        auth.storeTicket(data);
        this.setState({ checkLogin: true });
    }

    handlePayPrice = (price, index) => {
        let { name, city } = this.props.match.params;
        let { mall, date } = this.props;
        let { ticket } = this.state;

        let data = {
            city: city,
            title: name,
            movieHall: mall.name,
            tickets: ticket,
            amount: price,
            time: mall.timings[index].name,
            date: date,
        }
        this.postSeat("/seat", data);
        // this.props.history.push("/home/ticket");
    }

    handleCheckLogin = () => {
        this.setState({ checkLogin: false })
    }

    render() {
        let user = auth.getToken();

        let { ticket, reclinerTicket, goldTicket, seats, timeIndex, checkLogin } = this.state;
        let { city, name, index } = this.props.match.params;
        let { mall, date, setValues } = this.props;
        let recliner = [], gold = [];

        if (isNaN(timeIndex)) timeIndex = index;

        if (seats.length) seats[timeIndex % 3].map((f1) => f1.price === 420 ? recliner.push(f1) : gold.push(f1));

        let totalPrice = reclinerTicket.length * 420 + goldTicket.length * 250;

        console.log(ticket, "reclinerTicket", reclinerTicket, "goldTicket", goldTicket)

        return (<React.Fragment>
            {/* Name Bar */}
            <div className="row bg-dark text-light p-2">
                <div className="col" onClick={() => this.goBack(city, name)}><i className="fa fa-chevron-left fa-2x m-2 pt-1"></i></div>
                <div className="col-10">
                    <h2>{name}</h2>
                    <h6>{mall.name}</h6>
                </div>
                <div className="col-1 mt-3">{ticket.length} Tickets</div>
                <div className="col mt-3" onClick={() => this.goBack(city, name)}><h6><i className="fa fa-close mt-1"></i></h6></div>
            </div>
            {/* Time Bar */}
            <div className="bg-light p-3">
                <small>{date + ", " + mall.timings[timeIndex].name}</small>
                <div className="py-1">
                    {mall.timings.map((t1, index2) =>
                        <button key={index2} className={"btn btn-outline-success me-2 " + (+timeIndex === index2 ? "active" : "")}
                            onClick={() => this.handleTime(index2)}  >{t1.name}</button>
                    )}
                </div>
            </div>
            {/* Seats */}
            <div className="container px-5 mx-5">

                <h6 className="text-muted m-1">RECLINER - Rs 420.00</h6>
                <hr className="mt-1" />

                {recliner.map((s1) => <div className="row" key={s1.rowName}>
                    <div className="rowname">{s1.rowName}</div>
                    <div className="col-11 p-0">
                        {s1.seatList.map((m1) =>
                            <button key={m1.seatNo}
                                className={(m1.available ? "seat " : "noSeat ")
                                    + (reclinerTicket.find((fs) => fs == (s1.rowName + m1.seatNo)) ? "selectedSeat " : "")
                                }
                                onClick={() => this.addTicket(s1.rowName, s1.price, m1.seatNo, m1.available)}>{m1.seatNo}
                            </button>)}
                    </div>
                </div>)}
                <br />

                <h6 className="text-muted m-1 pt-3 px-3">GOLD - Rs 250.00</h6>
                <hr className="mt-1" />

                {gold.map((s1) => <div className="row" key={s1.rowName} >
                    <div className="rowname">{s1.rowName}</div>
                    <div className="col-11 p-0">
                        {s1.seatList.map((m1, index) =>
                            <button key={index}
                                className={(m1.available ? "seat " : "noSeat ")
                                    + (index + 1 === 7 || index + 1 === 18 ? "seat2 " : "")
                                    + (goldTicket.find((fs) => fs == (s1.rowName + m1.seatNo)) ? "selectedSeat" : "")
                                }
                                onClick={() => this.addTicket(s1.rowName, s1.price, m1.seatNo, m1.available)}>
                                {m1.seatNo}
                            </button>)}

                    </div>
                </div>)}
            </div>


            {/* payment */}
            <div className="text-center">
                {ticket.length
                    ? <button onClick={() => this.handlePayPrice(totalPrice, timeIndex)} className="col-4 btn btn-primary m-4">
                        Pay Rs. {totalPrice}</button>
                    : <img src={payBase} alt="PayOnTop Logo" className="m-5 " />
                }
            </div>
            {checkLogin && !user ?
                <Login {...this.props} setLogin={this.handleCheckLogin} />
                : checkLogin ? this.props.history.push("/home/ticket")
                    : ""}
        </React.Fragment >
        )
    }
}
export default Seats