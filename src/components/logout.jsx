import { Component } from "react";
import auth from "./authService"

class Logout extends Component {

    componentDidMount = () => {
        auth.removeTicket();
        auth.removeToken();
        window.location = "/home/NCR"
    }

    render() {
        return ("")
    }
}
export default Logout