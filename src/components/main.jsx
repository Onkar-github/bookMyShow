import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ShowMovie from "./movieComponent";
import Movies from "./movies";
import NavBar from "./Navbar";
import Seats from "./seatComponent";
// import auth from "./authService";
import ShowTicket from "./ShowTicket";
// import Login from "./Login";
import Logout from "./logout";
import BookSmile from "./BookASmile";
import UserProfile from "./myProfile";

class MainComponent extends Component {
    state = {
        loc: "NCR",
        nav: true,
        date: "",
        mall: {},
    };

    setLocation = (city) => {
        this.setState({ loc: city });
    }


    handleMovieVal = (nav, m1, date) => {
        let s1 = { ...this.state };
        s1.nav = nav;
        if (m1) s1.mall = m1;
        if (date) s1.date = date;
        this.setState(s1);
    }

    render() {
        let { loc, nav, mall, date } = this.state;
        // let user = auth.getToken();
        return (<React.Fragment>
            {nav && <NavBar loc={loc} setValue={this.setLocation} />}

            <Switch>
                <Route path="/home/ticket" render={(props) => (<ShowTicket {...props} />)} />
                <Route path="/home/:city/:name/:index" render={(props) => (<Seats {...props} mall={mall} date={date} setValues={this.handleMovieVal} />)} />
                <Route path="/home/:city/:name" render={(props) => (<ShowMovie {...props} setValues={this.handleMovieVal} />)} />
                <Route path="/home/:city" render={(props) => (<Movies {...props} />)} />
                <Route path="/myprofile/:val" component={UserProfile} />
                <Route path="/bookSmile" component={BookSmile} />
                <Route path="/logout" component={Logout} />
                <Redirect from="/" to="/home/NCR" />
            </Switch>

        </React.Fragment>
        );

    }
}
export default MainComponent;    