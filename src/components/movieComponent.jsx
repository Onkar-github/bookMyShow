import React, { Component } from "react";
import http from "./httpService";
import "./style.css"

class ShowMovie extends Component {

    state = {
        data: "",
        city: "",
        day: 0,
        date: "",
        priceVal: [],
        timeVal: [],
        priceChevron: false,
        timeChevron: false,
    }

    async componentDidMount() {
        let { city, name } = this.props.match.params;
        let response = await http.get(`/movies/${city}/${name}`);
        let { data } = response;
        this.setState({ data: data, city: city });
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        if (input.checked)
            s1[input.name].push(input.value);
        else {
            let index = s1[input.name].findIndex((f1) => f1 === input.value);
            s1[input.name].splice(index, 1);
        }
        // console.log(s1);
        this.setState(s1);
    }

    makeCB = (arr, name, values) => (
        arr.map((opt, index) => (
            <div className="form-check" key={index}>
                <input type="checkbox" name={name} value={opt} className="form-check-input" checked={values.find(val => val === opt) || false} onChange={this.handleChange} />
                <label className="form-check-label">{opt}</label>
            </div>
        )))


    filterByPrice = (showTiming, inpVal) => {
        let show = JSON.parse(JSON.stringify(showTiming));
        let show2 = show.filter((s1) => {
            s1.timings = s1.timings.filter((t1) => inpVal.find((m1) => {
                if (m1.includes("More than")) {
                    return (t1.price > 300) ? true : false;
                }
                else {
                    let pArr = m1.split("-");
                    console.log(pArr)
                    return (t1.price > +pArr[0] && t1.price <= +pArr[1]) ? true : false;
                }
            })
            )
            return s1.timings.length === 0 ? false : s1.timings;
        })
        // console.log("show", show2)
        return show2;
    }


    filterByTime = (showTiming, inpVal) => {
        let show = JSON.parse(JSON.stringify(showTiming));
        let show2 = show.filter((s1) => {
            s1.timings = s1.timings.filter((t1) => inpVal.find((m1) => {
                if (m1 === "Morning") {
                    return t1.name.includes("AM")
                }

                else {
                    if (t1.name.includes("AM")) return false;
                    else {
                        let timeVal = t1.name.split(":");
                        console.log(timeVal[0])
                        if (m1 === "Afternoon")
                            return (timeVal[0] === 12 || timeVal[0] < 4) ? true : false;
                        if (m1 === "Evening")
                            return (timeVal[0] > 4 && timeVal[0] < 7) ? true : false;
                        if (m1 === "Night")
                            return (timeVal[0] > 7 && timeVal[0] < 12) ? true : false;
                    }
                }
            })
            )
            return s1.timings.length ? true : false;
        })
        // console.log("Time +how", show2)
        return show2;
    }

    handleHeart = (index) => {
        let s1 = { ...this.state };
        let val = s1.data.showTiming[s1.day][index].heart;
        s1.data.showTiming[s1.day][index].heart = val === "true" ? "false" : "true"
        this.setState(s1);
    }

    getSeats = (name, m1, index, date) => {
        this.props.setValues("", m1, date);
        this.props.history.push(`/home/${this.state.city}/${name}/${index}`)
    }


    render() {
        let { data, day, date, timeVal, priceVal, priceChevron, timeChevron } = this.state;
        let showTiming2 = [];
        if (data.showTiming) {
            data.showTiming[day].map((m1) => m1.heart ? m1.heart : m1.heart = "false");
            showTiming2 = [...data.showTiming[day]];
        }

        let priceArr = ["0-100", "101-200", "201-300", "More than 300"];
        let showTime = ["Morning", "Afternoon", "Evening", "Night"];
        let mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

        let d = new Date();
        let today = d.getDate() + " TODAY";
        if (!date) date = today;

        d.setDate(d.getDate() + 1)
        let tomorrow = d.getDate() + " " + mS[d.getMonth()];

        d.setDate(d.getDate() + 1);
        let nextDay = d.getDate() + " " + mS[d.getMonth()];

        if (priceVal.length) showTiming2 = this.filterByPrice(showTiming2, priceVal);
        if (timeVal.length) showTiming2 = this.filterByTime(showTiming2, timeVal);

        return (<React.Fragment>
            {/* Header */}
            <div className="bg-secondary text-light pt-3 px-3 p-1">
                <h1>{data.title}</h1>
                <h4>
                    <i className={"fas fa-heart text-danger fa-sm mt-2 "}></i>
                    <strong className="m-3">{data.rating}</strong>
                    {data.genre ? data.genre.split(",").map((b1) => <button key={b1} className="btn btn-outline-light btn-sm ms-2 ovel p-0"><small className="px-2">{b1.toUpperCase()}</small></button>) : ""}
                </h4>
                <small>{data.votes + " votes"}</small>
            </div>
            {/* Date  */}
            <div className="row bg-light p-2">
                <div className="col-8 my-auto">
                    <span className={"fw-bold p-2 m-1 " + (day === 0 ? "dateGreen" : "")} onClick={() => this.setState({ day: 0, date: today })}>{today}</span>
                    <span className={"fw-bold p-2 m-1 " + (day === 1 ? "dateGreen" : "")} onClick={() => this.setState({ day: 1, date: tomorrow })}>{tomorrow}</span>
                    <span className={"fw-bold p-2 m-1 " + (day === 2 ? "dateGreen" : "")} onClick={() => this.setState({ day: 2, date: nextDay })}>{nextDay}</span>
                </div>

                {/* Price Filter */}
                <div className="col-2 pb-4">
                    <div onClick={() => this.setState({ priceChevron: !priceChevron, timeChevron: false })}>
                        <span className="p-3">Filter Price</span>
                        <i className="fas fa-chevron-down fa-sm"></i>
                    </div>
                    {priceChevron ? <div className=" bg-white p-2 position-absolute shadow-lg">{this.makeCB(priceArr, "priceVal", priceVal)}</div> : ""}
                </div>
                <div className="col-2 pb-4" style={{ "borderLeft": "2px solid silver" }}>
                    <div onClick={() => this.setState({ priceChevron: false, timeChevron: !timeChevron })}>
                        <span className="p-3 " >Filter Showtime</span>
                        <i className="fas fa-chevron-down fa-sm"></i>
                    </div>
                    {timeChevron ? <div className=" bg-white p-2 position-absolute shadow-lg">{this.makeCB(showTime, "timeVal", timeVal)}</div> : ""}
                </div>
            </div>
            {/* images */}
            <div className="row p-1" style={{ backgroundColor: "rgb(255, 200, 176)" }}>
                <div className="col-6">
                    <i className="fa fa-mobile thinGreen fa-2x"></i>
                    <h6><small>M-Ticket Available</small></h6>
                </div>
                <div className="col-6">
                    <span className="fa-stack fa-2x  ">
                        <i className="fa fa-hamburger thinBrown fa-stack-lg "></i>
                        <i className="fas fa-wine-glass thinBrown fa-stack-lg"></i>
                    </span>
                    <h6><small>Food Available</small></h6>
                    {/* <i className="fas fa-cup-straw  fa-2x"></i> */}

                </div>
            </div>

            {/* Showtime  */}
            <div className="m-2">
                {
                    showTiming2.map((m1, index) =>
                        <div className="row mb-4" key={index} >
                            <div className="col-1">
                                <i className={"fa-heart fa-lg ms-3 " + (m1.heart === "true" ? "fa text-danger" : "far")} onClick={() => this.handleHeart(index)}></i>
                            </div>
                            <div className="col-3">
                                <h6 className="fw-bold">{m1.name}</h6>
                                <div className="row ">
                                    <div className="col-4 d-flex">
                                        <i className="fa fa-mobile thinGreen  "></i>
                                        <small className="ms-auto mt-2" style={{ fontSize: "12px" }}>M-Ticket</small>
                                    </div>
                                    <div className="col-4 d-flex">
                                        <span>
                                            <i className="fa fa-hamburger thinBrown "></i>
                                            <i className="fas fa-wine-glass thinBrown fa-stack-lg"></i>
                                        </span>
                                        <small className="ms-auto mt-2" style={{ fontSize: "12px" }}>F&B</small>
                                    </div>
                                </div>
                            </div>
                            <div className="col-8">
                                {m1.timings.map((t1, index2) =>
                                    <button type="button" className="btn border-dark text-primary m-2"
                                        key={index2}
                                        data-bs-toggle="tooltip" data-bs-placement="bottom" title={"Rs. " + t1.price}
                                        onClick={() => this.getSeats(data.title, m1, index2, date)}>
                                        {t1.name}
                                    </button>
                                )}
                                <li className="mx-5 text-danger"><span className="text-dark">Cancellation available</span></li>
                            </div>
                        </div>
                    )}
            </div>
        </React.Fragment >
        )
    }
}
export default ShowMovie 