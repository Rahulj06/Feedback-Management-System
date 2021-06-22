import React, { Component } from "react";
import CommentsDataService from "../services/comments.service";
import CommentList from "./Comment-list";

class SaveComment extends Component {
  constructor(props) {
    super(props);
    this.onChangecomment = this.onChangecomment.bind(this);
    this.saveComment = this.saveComment.bind(this);
    this.newComment = this.newComment.bind(this);

    this.state = {
      feed_id: this.props.feed_id,
      comment: "",
      submitted: false
    };
  }
  onChangecomment(e) {
    this.setState({
      comment: e.target.value
    });
  }

  saveComment() {
    var data = {
      feed_id: this.state.feed_id,
      comment: this.state.comment
    };

    CommentsDataService.create(data.feed_id,data)
      .then(response => {
        this.setState({
          feed_id: response.data.feed_id,
          comment: response.data.comment,
          
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newComment() {
    this.setState({
      feed_id: this.state.feed_id,
      comment: "",
      submitted: false
    });
  }

  render() {
          return (
            <div className="submit-form">
              {this.state.submitted ? (
                <div>
                  <br/>
                  <br/>
                  <h6>Comment Saved Succesfully!</h6>
                  <button className="btn btn-success" onClick={this.newComment}>
                    Add
                  </button>
                  <br/>
                </div>
  
              ) : (
                <div>
                  <br/>
                  <CommentList feed_id={this.state.feed_id}/>
                  <br/>
                  <div className="form-group">
                      <textarea
                      className="form-control" 
                      id="comment" 
                      placeholder="Add Comment"
                      rows="3"
                      required
                      value={this.state.comment}
                      onChange={this.onChangecomment}
                      name="comment">
                      </textarea>
                  </div>
                  <br/>

                  <button onClick={this.saveComment} className="btn btn-success">
                    Save
                  </button>
                </div>
              )}
            </div>
          );
        }
      }
export default SaveComment;