import React, { Component } from "react";
import "../../App.css";
import axios from "axios";
import { readdirSync } from "fs";
import cookie from "react-cookies";
import { Redirect } from "react-router";
class CentralContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Who offers pickup near you?",
      searchtext: ""
    };
    this.itemsearch = this.itemsearch.bind(this);
    this.search = this.search.bind(this);
  }
  DP = e => {
    if (e.target.value == "pickup")
      this.setState({ text: "Who offers pickup near you?" });
    else {
      this.setState({ text: "Who delivers in your neighborhood?" });
    }
  };
  itemsearch = e => {
    this.setState({ searchtext: e.target.value });
    console.log(this.state.searchtext);
  };
  search = e => {
    e.preventDefault();
    console.log("search clicked");
    axios
      .get(`http://localhost:3100/items/${this.state.searchtext}`)
      .then(response => {
        console.log("Onclick");
        console.log(JSON.stringify(response.data));
      });
  };
  componentDidMount() {
    axios.get(`http://localhost:3100/items/${"pizza"}`).then(response => {
      console.log("populate");
      console.log(response.data);
    });
  }

  render() {
    let redirectVar = null;
    if (!cookie.load("cookie")) {
      redirectVar = <Redirect to="/buyer/login" />;
    }
    return (
      <div>
        {redirectVar}
        <div class="jumbotron">
          <h1 class="display-4">{}</h1>

          <div class="lead m-4" align="center">
            <span styles="color:blue">{this.state.text}</span>
            <br />
            <button
              type="button"
              class="btn btn-dark m-2"
              value="delivery"
              onClick={this.DP}
            >
              Delivery
            </button>
            <button
              type="button"
              class="btn btn-dark m-2"
              value="pickup"
              onClick={this.DP}
            >
              Pick-Up
            </button>
            <br />
            <div class="container">
              <div class="row">
                <div class="col-sm">
                  <button
                    type="button"
                    class="btn btn-outline-primary bg-light"
                  >
                    ASAP
                  </button>
                </div>
                <div class="col-sm">One of three columns</div>
                <div class="col-sm">
                  <nav class="navbar navbar-light bg-light">
                    <form class="form-inline">
                      <input
                        class="form-control mr-sm-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                        onChange={this.itemsearch}
                      />
                      <button
                        class="btn btn-outline-success my-2 my-sm-0"
                        type="submit"
                        onClick={this.search}
                      >
                        Search
                      </button>
                    </form>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <p></p>
        </div>
      </div>
    );
  }
}

export default CentralContent;
