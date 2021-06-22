import React, { Component } from "react";
import CommentsDataService from "../services/comments.service";

class CommentList extends Component {

  constructor(props) {

    super(props);

    this.retrievecomments = this.retrievecomments.bind(this);

    this.state = {
      comment: [],
      feed_id: props.feed_id
    };
  }

  componentDidMount() {
    this.retrievecomments();
  }



  retrievecomments() {
    CommentsDataService.getAll(this.state.feed_id)
      .then(response => {
        this.setState({
          comment: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    // ...
    const { comment } = this.state;

    return (
      <div className="list row">
        <div className="col-md-6">
          <h4>Comments:</h4>


          <ul className="list-group">
            {comment &&
              comment.map((comment) => (
                <li key={comment.id}>
                  {comment.comment}
                </li>
              ))}
          </ul>
        </div>

      </div>
    );
  }
  }
export default CommentList;