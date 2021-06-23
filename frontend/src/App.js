import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./SimplifyVMS_Logo.png";
import Addfeedback from "./components/add-feedback.component";
import feedback from "./components/feedback.component";
import FeedbacksList from "./components/feedbacks-list.component";
import Apps from "./Search/App";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-light bg-light">
          <a href="/Feedbacks" className="navbar-brand">
            <img alt="logo" className="photo" src={logo} />
            </a>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/Feedbacks"} className="nav-link">
                Feedback
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Post Feedback
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/Search"} className="nav-link">
                Search Feedback
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/Feedbacks"]} component={FeedbacksList} />
            <Route exact path="/add" component={Addfeedback} />
            <Route exact path="/Search" component={Apps} />
            <Route path="/Feedbacks/:id" component={feedback} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App
