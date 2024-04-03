import React, { Component } from "react";
import http from "./httpService";
import auth from "./authService";

class UserProfile extends Component {

    state = {
        data: {},
        booking: [],
        saveBtn: false,
        showBooking: false,
    }


    async fetchData() {
        let { val } = this.props.match.params;
        let url = val === "settings" ? "/user" : "/user/booking"
        let response = await http.get(url);
        let { data } = response;
        console.log("fetchData", data)
        let arr = data.booking ? data.booking : [];
        this.setState({ data: data.user, booking: arr });
    }

    componentDidMount = () => {
        this.fetchData();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps !== this.props) this.fetchData();
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1.data[input.name] = input.value;
        s1.saveBtn = true;
        this.setState(s1);
    }

    handleSave = async () => {
        let obj = this.state.data;
        let response = await http.put("/user", obj);
        let { data } = response;
        let token  = auth.getToken() ;
        token.email = data.email ;
        auth.removeToken() ;
        auth.storeTicket(token) ;
        console.log("handle save token" , token );
        alert(data.msg);
    }

    handleState = (val) => {
        this.props.history.push(`/myprofile/${val}`);
    }

    render() {
        let { data, saveBtn, booking, showBooking } = this.state
        let { fName, lName, email, number, married } = data;
        let { val } = this.props.match.params;
        return (<React.Fragment>

            <div className="p-1 text-white" style={{ backgroundColor: "rgb(13, 12, 59)" }}>
                {/* Show User  */}
                <h6 className="mx-5 my-3 text-muted fw-bold" >{"Online Tickets -> Profile -> " + val}</h6>
                <div className="row p-2">
                    <div className="col-2 d-flex">
                        <div className="ms-auto">
                            <i className="far fa-user-circle fa-7x  fa-inverse "></i>
                        </div>
                    </div>
                    <div className="col ">
                        <div className=" py-2">
                            <h2>{fName + " " + lName}</h2>
                            <h2>{number}</h2>
                        </div>
                    </div>
                </div>

                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                <div className="row fw-bold">
                    <div className={"col-2 mx-3 " + (val !== "settings" ? "text-success" : "")} onClick={() => this.handleState("history")} >Booking History</div>
                    <div className={"col-2 mx-3 " + (val === "settings" ? "text-success" : "")} onClick={() => this.handleState("settings")} >Settings</div>
                </div>
            </div>
            {/* Edit / Settings */}
            <div className="p-1" style={{ backgroundColor: "rgb(211,211,211)" }}>
                {val === "settings" ?
                    <div className="col-7 mx-5 my-4 bg-white">
                        <div className="p-3">
                            <h5 className="mb-3"><u>Edit Profile </u></h5>
                            <div className="row ">
                                <div className="col-6 text-muted">First Name </div>
                                <div className="col-6">
                                    <input type="text" name="fName" value={fName} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="row my-1">
                                <div className="col-6 text-muted">Last Name</div>
                                <div className="col-6">
                                    <input type="text" name="lName" value={lName} onChange={this.handleChange} />
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-6 text-muted">Email</div>
                                <div className="col-6">
                                    <input type="text" name="email" value={email} onChange={this.handleChange} />
                                </div>
                            </div>
                            <br />
                            <br />
                            <h6 className="col-6">Married ?</h6>
                            <div className="row ms-2">
                                <div className="col-6 form-check ">
                                    <input type="radio" name="married" className="form-check-input"
                                        value="Yes" onChange={this.handleChange} checked={married === "Yes"} />
                                    <label className="form-check-label">Yes</label>
                                </div>
                                <div className="col-6 form-check">
                                    <input type="radio" name="married" className="form-check-input"
                                        value="No" onChange={this.handleChange} checked={married === "No"} />
                                    <label className="form-check-label">No</label>
                                </div>
                            </div>
                            <div className="row mt-2 m-1">
                                {saveBtn ? <button className="btn btn-secondary" onClick={this.handleSave}>Save</button> : ""}
                            </div>
                        </div>

                    </div>
                    : <div className="mx-5 my-4">
                        <br />
                        <h5 className="" style={{ fontFamily: "cursive" }}>You don't seem to have any recent bookings.</h5>
                        <p className="text-danger my-4" onClick={() => this.setState({ showBooking: !showBooking })}>View all bookings</p>
                        {showBooking ?
                            <div className="row  bg-white">
                                <div className="row px-4 py-2">
                                    <div className="col-2"> <h4 className="text-danger">Movie</h4> </div>
                                    <div className="col-5"> <h4 className="text-danger">Hall</h4> </div>
                                    <div className="col-2"> <h4 className="text-danger">Amount</h4> </div>
                                    <div className="col-2"> <h4 className="text-danger">Seats</h4> </div>
                                    <div className="col-1"> <h4 className="text-danger">Date</h4> </div>
                                </div >
                                {
                                    booking.map((b1) =>
                                        <div className="row px-4">
                                            <div className="col-2"> <h6>{b1.title}</h6>  </div>
                                            <div className="col-5"> <h6>{b1.movieHall}</h6>  </div>
                                            <div className="col-2"> <h6>{b1.amount}</h6>  </div>
                                            <div className="col-2"> <h6>{b1.tickets.join(",")}</h6>  </div>
                                            <div className="col-1"> <h6>{b1.date}</h6>  </div>
                                        </div>
                                    )
                                }
                            </div >
                            : ""}
                        <br />
                        <br />
                        <br />
                        <div className="text-muted">
                            <small>
                                <h5>Privacy Note</h5>
                                <p>By using www.bookmyshow.com(our website), you are fully accepting the Privacy Policy available at <span className="link-danger">https://bookmyshow.com/privacy</span> governing your access to Bookmyshow and provision of services by Bookmyshow to you. If you do not accept terms mentioned in the <span className="link-danger">Privacy Policy</span>, you must not share any of your personal information and immediately exit Bookmyshow.</p>
                            </small>
                        </div>
                    </div >
                }
            </div>

        </React.Fragment >
        )
    }
}
export default UserProfile