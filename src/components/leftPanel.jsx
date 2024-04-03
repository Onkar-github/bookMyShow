import React, { Component } from "react";

class LeftPanel extends Component {

    state = {
        cb1: "",
        cb2: "",
        cb3: "",
    }

    handleChange = (e, index) => {
        let { currentTarget: input } = e;
        let { options } = this.props;
        let arr = this.updateCBs(options[input.name], input.checked, input.value, index);
        if (input.name === "lang") {
            let ind = arr.indexOf("Hindi");
            if (ind === 1) {
                [arr[0], arr[1]] = [arr[1], arr[0]];
            }
        }
        options[input.name] = arr.join(",");
        // console.log("options", options);
        this.props.onOptionChange(options);
    }

    updateCBs = (inpVal, checked, value) => {
        let arr = inpVal ? inpVal.split(",") : [];
        if (checked) arr.push(value);
        else {
            let index2 = arr.findIndex(ele => ele === value);
            arr.splice(index2, 1);
        }
        arr.sort((s1, s2) => s1.localeCompare(s2));
        return arr;
    }

    makeCB = (arr, name, values) => (
        arr.map((opt, index) => (
            <div className="form-check pt-1" key={index}>
                <input type="checkbox" name={name} value={opt} className="form-check-input"
                    checked={values.find(val => val === opt) || false} onChange={this.handleChange} />
                <label className="form-check-label">{opt}</label>
            </div>
        )))

    render() {
        let { cb1, cb2, cb3 } = this.state;
        let langArr = ["Hindi", "English", "Punjabi", "Tamil"];
        let formatArr = ["2D", "3D", "4DX"];
        let genreArr = ["Action", "Adventure", "Biography", "Comedy"];
        let { lang = "", format = "", genre = "" } = this.props.options;
        return (
            <div>
                <div className=" row  mx-1 p-1 mb-4">
                    <div className=" col-11 bg-white">
                        <img src="https://i.ibb.co/Hry1kDH/17443322900502723126.jpg" alt="" className="img-fluid p-1" />
                    </div>
                </div>
                <div className="row m-3 pb-2 pt-3">
                    <div className="col bg-white p-2">
                        <i className={"fas fa-chevron-" + (cb1 ? "up text-primary" : "down")} onClick={() => this.setState({ cb1: !cb1 })}> &nbsp; &nbsp; Select Language</i>
                        {cb1 && this.makeCB(langArr, "lang", lang.split(","))}
                    </div>
                </div>

                <div className="row m-3 ">
                    <div className="col bg-white p-2">
                        <i className={"fas fa-chevron-" + (cb2 ? "up text-primary" : "down")} onClick={() => this.setState({ cb2: !cb2 })}> &nbsp; &nbsp; Format</i>
                        {cb2 && this.makeCB(formatArr, "format", format.split(","))}
                    </div>
                </div>

                <div className="row m-3 py-2">
                    <div className="col bg-white p-2">
                        <i className={"fas fa-chevron-" + (cb3 ? "up text-primary" : "down")} onClick={() => this.setState({ cb3: !cb3 })}> &nbsp; &nbsp; Genre</i>
                        {cb3 && this.makeCB(genreArr, "genre", genre.split(","))}
                    </div>
                </div>
            </div>
        )
    }
}
export default LeftPanel
