import React, { Component } from "react";
import feedbackDataService from "../services/feedback.service";
//import { Link } from "react-router-dom";
import CommentBox from "./comment";

//<Link to={<comment/>} className="badge badge-warning">Add Comment:</Link>

export default class feedbacksList extends Component {

  constructor(props) {

    super(props);

    this.retrievefeedbacks = this.retrievefeedbacks.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivefeedback = this.setActivefeedback.bind(this);

    this.state = {
      feedbacks: [],
      currentfeedback: null,
      currentIndex: -1,
      currentName:"",
      searchEmail: ""
    };
  }

  componentDidMount() {
    this.retrievefeedbacks();
  }

  onChangeSearchEmail(e) {
    const searchEmail = e.target.value;

    this.setState({
      searchEmail: searchEmail
    });
  }

  retrievefeedbacks() {
    feedbackDataService.getAll()
      .then(response => {
        this.setState({
          feedbacks: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievefeedbacks();
    this.setState({
      currentfeedback: null,
      currentIndex: -1,
      currentName: null
    });
  }

  setActivefeedback(feed, index,name) {
    this.setState({
      currentfeedback: feed,
      currentIndex: index,
      currentName:name
    });
  }
  render() {
    // ...
    const { feedbacks, currentfeedback, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Feedbacks List</h4>


          <ul className="list-group">
            {feedbacks &&
              feedbacks.map((feedback, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActivefeedback(feedback, index)}
                  key={index}
                >
                  {feedback.feed}
                </li>
              ))}
          </ul>


        </div>
        <div className="col-md-6">
          {currentfeedback ? (
            <div>
              <br/>
              <br/>
              <br/>
              <div>
                <b>Feedback : </b> {currentfeedback.feed}
              </div>
              <br/>
              <div>
              <b>From : </b> {currentfeedback.name}
              </div>
              <br/>

              <CommentBox />
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a feedback...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
  }
