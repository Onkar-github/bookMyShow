import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import http from "./httpService";
import auth from "./authService";

class Login extends Component {

    state = {
        show: "true",
        email: "",
    }

    handleChange = (e) => {
        let { currentTarget: input } = e;
        this.setState({ email: input.value })
    }

    postLogin = async (url, email) => {
        // let { setValues } = this.props;
        console.log("props. checjk", this.props)
        try {
            let response = await http.post(url, { email })
            let { data } = response;
            console.log("login respnse", data);
            auth.storeToken(data);
            let ticket = auth.getTicket();
            ticket ? this.props.history.push("/home/ticket") : window.location = window.location.href;
        } catch (ex) {
            if (ex.response) {
                alert(ex.response.data);
            }
        }
    }


    onEnter = (e) => {
        if (e.which === 13)
            this.postLogin("/login", this.state.email);
    }

    handleClose = () => {
        this.props.setLogin();
    }

    render() {
        let { show, email } = this.state;
        return (
            <Modal
                show={show}
                // onHide={ }
                backdrop="static"
                size="xl"
                centered
                dialogClassName="modal-90w"
            >
                <div className="d-flex">
                    <button className="ms-auto px-2" onClick={this.handleClose}>X</button>
                </div>
                <div className="row mx-3">
                    <button className="btn btn-primary btn-lg rounded "><i className="fa fa-facebook-f"></i> Continue via facebook</button>
                </div>
                <div className="text-center">
                    <h6>OR</h6>
                </div>
                <div className="form-group mx-5 my-3">
                    <input type="text" name="email" value={email}
                        style={{ fontSize: "18px" }} onKeyPress={this.onEnter}
                        className="form-control" placeholder='Continue via mail' onChange={this.handleChange} />
                </div>
                <br />
                <br />
                <p className='text-center text-muted'><small>I agree to the Terms and Conditions and Privacy Policy.</small></p>
            </Modal >
        )
    }
}
export default Login