import React, { Component } from "react";
import FeedbackDataService from "../services/feedback.service";

export default class AddFeedback extends Component {
  constructor(props) {
    super(props);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onChangefeedback = this.onChangefeedback.bind(this);
    this.onChangename = this.onChangename.bind(this);
    this.onChangephoneNo = this.onChangephoneNo.bind(this);
    this.saveFeedback = this.saveFeedback.bind(this);
    this.newFeedback = this.newFeedback.bind(this);

    this.state = {
      id: null,
      name: "",
      email: "",
      feedback: "", 
      phoneNo: "",
      tag: true,

      submitted: false
    };
  }

  onChangeemail(e) {
    this.setState({
       email: e.target.value
    });
  }

  onChangefeedback(e) {
    this.setState({
      feedback: e.target.value
    });
  }

  onChangename(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangephoneNo(e) {
    this.setState({
      phoneNo: e.target.value
    });
  }

  saveFeedback() {
    var data = {
      email: this.state.email,
      feed: this.state.feedback,
      name: this.state.name,
      phoneNo: this.state.phoneNo
    };

    FeedbackDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          email: response.data.email,
          feed: response.data.feedback,
          name: response.data.name,
          phoneNo: response.data.phoneNo,
          
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newFeedback() {
    this.setState({
      id: null,
      email: "",
      feedback: "",
      name:"",
      phoneNo:"",
      tag: "",

      submitted: false
    });
  }

  render() {
          return (
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <h4>You submitted successfully!</h4>
                  <button className="btn btn-success" onClick={this.newFeedback}>
                    Add
                  </button>
                </div>
  
              ) : (
                <div>
                  <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Full Name"
                    required
                    value={this.state.name}
                    onChange={this.onChangename}
                    name="name"
                  />
                </div>
                <br/>

                <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        id="phoneNo"
                        placeholder="Phone Number"
                        required
                        value={this.state.phoneNo}
                        onChange={this.onChangephoneNo}
                        name="phoneNo"
                      />
                    </div>
                    <br/>
      
                  <div className="form-group">
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      placeholder="name@example.com"
                      required
                      value={this.state.email}
                      onChange={this.onChangeemail}
                      name="email"
                    />
                    </div>
                    <br/>
    

                  <div className="form-group">
                      <textarea
                      className="form-control" 
                      id="feedback" 
                      placeholder="Feedback"
                      rows="3"
                      required
                      value={this.state.feedback}
                      onChange={this.onChangefeedback}
                      name="feedback">
                      </textarea>
                  </div>
                  <br/>

                  <button onClick={this.saveFeedback} className="btn btn-success">
                    Post
                  </button>
                </div>
              )}
            </div>
          );
        }
      }
