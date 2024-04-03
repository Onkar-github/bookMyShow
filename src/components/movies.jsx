import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';
import LeftPanel from "./leftPanel";
import http from "./httpService";
import queryString from "query-string";

class Movies extends Component {

    state = {}

    async fetchData() {
        let queryParams = queryString.parse(this.props.location.search);
        let { city } = this.props.match.params;
        // let { q } = queryParams;
        let searchStr = this.makeSearchString(queryParams);
        // console.log(queryParams, "searchStr", searchStr, "city ", city, "Name", q)
        let response = await http.get(`/movies/${city}?${searchStr}`);
        let { data } = response;
        this.setState({ data: data });
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) this.fetchData();
    }


    makeSearchString = (options) => {
        let { q = "", lang = "", format = "", genre = "" } = options;
        let str = "";
        str = this.addToQueryString(str, "q", q);
        str = this.addToQueryString(str, "lang", lang);
        str = this.addToQueryString(str, "format", format);
        str = this.addToQueryString(str, "genre", genre);
        return str;
    }

    addToQueryString = (str, name, value) => (
        value ? str ? `${str}&${name}=${value}` : `${name}=${value}` : str
    )

    carouselPanel = () => (
        <div className="row">
            <Carousel className="col-8 mx-auto">
                <Carousel.Item>
                    <img
                        className="img-fluid"
                        src="https://i.ibb.co/ZGsJ3dh/jio-mami-21st-mumbai-film-festival-with-star-2019-02-09-2019-10-58-45-992.png"
                        alt="First slide"
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="img-fluid"
                        src="https://i.ibb.co/wRr7W1P/hustlers-01-10-2019-05-09-55-486.png"
                        alt="Second slide"
                    />
                </Carousel.Item>

                <Carousel.Item>
                    <img
                        className="img-fluid"
                        src="https://i.ibb.co/qFWPRpF/laal-kaptaan-16-10-2019-12-48-06-721.jpg"
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    )

    createNavbar = () => (
        <nav className="navbar navbar-expand navbar-light" style={{ backgroundColor: "#f2f2f2" }}>
            <h3 className="ms-4 m-2">Movies</h3>
            <ul className="navbar-nav ">
                <li className="nav-link">Now Showing</li>
                <li className="nav-link">Coming Soon</li>
                <li className="nav-link">Exclusive</li>
            </ul>
        </nav>
    )

    callUrl = (options, url) => {
        let searchStr = this.makeSearchString(options);
        this.props.history.push({ pathname: url, search: searchStr })
    }

    handleOptionChange = (options) => {
        let { city } = this.props.match.params;
        this.callUrl(options, `/home/${city}`)
    }

    render() {
        let queryParams = queryString.parse(this.props.location.search);
        let { city } = this.props.match.params;

        console.log(this.state.data);
        let { data = [] } = this.state;
        return (
            <div className="container-fluid">
                <br />
                {this.carouselPanel()}
                {this.createNavbar()}

                <div className="row" style={{ backgroundColor: "#f2f2f2" }}>
                    <div className="col-3">
                        <LeftPanel options={queryParams} onOptionChange={this.handleOptionChange} />
                    </div>
                    <div className="col-9">
                        <div className="row p-0 my-2 me-4">
                            {data.map((m1) =>
                                <div className="col-3 mb-4" key={m1.title} onClick={() => this.props.history.push(`/home/${city}/${m1.title}`)}>
                                    <div className="card mb-2 bg-dark text-light border-0">
                                        <img src={m1.img} alt="" className="card-img-top" />
                                        <h5 className="card-title" style={{ fontSize: "17px" }}>
                                            <i className="fas fa-heart mx-2 mt-2 text-danger"></i>
                                            {m1.rating}
                                            &nbsp; {m1.votes.includes(",") ? m1.votes.split(",")[0] + "k votes" : m1.votes}
                                        </h5>
                                    </div>
                                    <h5 >{m1.title}</h5>
                                    <h6 className="text-muted">{m1.genre.replace(",", "/")}</h6>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Movies
