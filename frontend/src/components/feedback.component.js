import React, { Component } from "react";
import FeedbackDataService from "../services/feedback.service";

export default class Feedback extends Component {
  constructor(props) {
    super(props);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangeFeedback = this.onChangeFeedback.bind(this);
    this.onChangename = this.onChangename.bind(this);
    this.onChangephoneNo = this.onChangephoneNo.bind(this);
    this.getFeedback = this.getFeedback.bind(this);
    this.tag = this.tag.bind(this);
    this.updateFeedback = this.updateFeedback.bind(this);
    this.deleteFeedback = this.deleteFeedback.bind(this);

    this.state = {
      currentFeedback: {
        id: null,
        name: "",
        email: "",
        feedback: "", 
        phoneNo: "",
        tag: ""
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getFeedback(this.props.match.params.id);
  }

  onChangeemail(e) {
    const email = e.target.value;

    this.setState(function(prevState) {
      return {
        currentFeedback: {
          ...prevState.currentFeedback,
          email: email
        }
      };
    });
  }

  onChangefeedback(e) {
    const feedback = e.target.value;
    
    this.setState(prevState => ({
      currentFeedback: {
        ...prevState.currentFeedback,
        feedback: feedback
      }
    }));
  }
  onChangename(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentFeedback: {
          ...prevState.currentFeedback,
          name: name
        }
      };
    });
  }

  onChangephoneNo(e) {
    const phoneNo = e.target.value;

    this.setState(function(prevState) {
      return {
        currentFeedback: {
          ...prevState.currentFeedback,
          phoneNo: phoneNo
        }
      };
    });
  }

  getFeedback(id) {
    FeedbackDataService.get(id)
      .then(response => {
        this.setState({
          currentFeedback: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  tag(status) {
    var data = {
      id: this.state.currentFeedback.id,
      email: this.state.currentFeedback.email,
      feedback: this.state.currentFeedback.feedback,
      tag: status
    };

    FeedbackDataService.update(this.state.currentFeedback.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentFeedback: {
            ...prevState.currentFeedback,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateFeedback() {
    FeedbackDataService.update(
      this.state.currentFeedback.id,
      this.state.currentFeedback
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Feedback was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteFeedback() {    
    FeedbackDataService.delete(this.state.currentFeedback.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/feedbacks')
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    const { currentFeedback } = this.state;

    return (
      <div>
        {currentFeedback ? (
          <div className="edit-form">
            <h4>Feedback</h4>
            <form>
              <div className="form-group">
                <label htmlFor="email">email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentFeedback.email}
                  onChange={this.onChangeemail}
                />
              </div>
              <div className="form-group">
                <label htmlFor="feedback">feedback</label>
                <input
                  type="text"
                  className="form-control"
                  id="feedback"
                  value={currentFeedback.feedback}
                  onChange={this.onChangefeedback}
                />
              </div>

              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentFeedback.name}
                  onChange={this.onChangename}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNo">Phone No. </label>
                <input
                  type="text"
                  className="form-control"
                  id="phoneNo"
                  value={currentFeedback.phoneNo}
                  onChange={this.onChangephoneNo}
                />
              </div>
            </form>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Feedback...</p>
          </div>
        )}
      </div>
    );
  }
}