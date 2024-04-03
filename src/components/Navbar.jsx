import React, { Component } from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import logo from "./logo.svg";
import Login from "./Login";
import auth from "./authService";
import { DropdownButton, Dropdown } from 'react-bootstrap';

class NavBar extends Component {

    state = {
        search: "",
        show: false,
        loginShow: false,
        navVal: ""
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        let s1 = { ...this.state };
        s1[input.name] = input.value;
        this.setState(s1);
    }

    handlelogin = () => {
        this.setState({ loginShow: false });
    }

    onEnter = (e) => {
        let { search } = this.state;
        let { loc } = this.props;
        // console.log("onEnter", loc, search)
        console.log(this.props)
        if (e.which === 13) {
            window.location = `/home/${loc}?q=${search}`;
        }
    }

    render() {
        let { search, show, loginShow } = this.state;
        let { loc } = this.props;
        let locArr = ["NCR", "Ahmedabad", "Banglore", "Chennai", "Mumbai", "Hyderabad"];
        let user = auth.getToken();
        return (
            <nav className="text-light bg-dark">
                <div className="row">
                    <div className="col-2 m-1">
                        <Link className="navbar-brand" to="/" >
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    <div className="col-5 py-1 mb-3">
                        <input type="text" name="search" value={search}
                            onChange={this.handleChange} onKeyPress={this.onEnter}
                            className="form-control form-control-sm fas fw-bold border border-2"
                            placeholder="&#128269; &nbsp;  Search for Movies" />
                    </div>
                    <div className="col-2 justify-content-end d-flex mt-3 ">
                        <NavDropdown title={loc} show={show} onMouseEnter={() => this.setState({ show: true })} onMouseLeave={() => this.setState({ show: false })}>
                            {locArr.map((l1, index) =>
                                <NavDropdown.Item key={index}>
                                    <Link className="dropdown-item" to={`/home/${l1}`} onClick={() => this.props.setValue(l1)} >{l1}</Link>
                                </NavDropdown.Item>)}
                        </NavDropdown>
                    </div>
                    <div className="col-1 justify-content-end d-flex mt-3">English</div>

                    {!user ?
                        <div className="col-1 justify-content-end d-flex mt-3 m-3">
                            <button className="btn btn-outline-light btn-sm" onClick={() => this.setState({ loginShow: true })} >Sign In</button>
                        </div>
                        : <div className="col text-center mt-3 ">
                            <DropdownButton
                                variant="dark"
                                menuVariant="dark"
                                title={<span><i className="fa fa-user-o"></i> Hi,{user.email}</span>}
                                className=""
                            >
                                <Dropdown.Item href="/myprofile/settings" className="border-bottom pb-2 px-2"><i className="fa fa-user-o"></i> Edit Profile</Dropdown.Item>
                                <Dropdown.Item href="/myprofile/history" className="border-bottom p-2"><i className="fa fa-store"></i> Purchase History</Dropdown.Item>
                                <Dropdown.Item href="/bookSmile" className="border-bottom p-2"><i className="fa fa-smile-o"></i> BookASmile</Dropdown.Item>
                                <Dropdown.Item href="#" className="border-bottom p-2"><i className="fa fa-headphones"></i> Help And Support</Dropdown.Item>
                                <Dropdown.Item href="/logout" className="p-2"><div className="text-center d-block border border-primary p-1 ">Sign Out</div></Dropdown.Item>
                            </DropdownButton>
                        </div>
                    }
                    {loginShow ? <Login setLogin={this.handlelogin} /> : ""}
                </div>

                <div className="row text-center" style={{ fontSize: "14px" }}>
                    <div className="col-2">Movies</div>
                    <div className="col-2">Events</div>
                    <div className="col-2">Plays</div>
                    <div className="col-2">Activities</div>
                    <div className="col-2">Fanhood</div>
                    <div className="col-2"></div>
                </div>
            </nav >
        )
    }
}
export default NavBar
