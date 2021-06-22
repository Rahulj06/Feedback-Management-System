import React, { Component } from "react";
import FeedbackDataService from "./FeedbackDataService";
//import "./search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.onChangeSearchTag = this.onChangeSearchTag.bind(this);
    this.retrieveFeedback = this.retrieveFeedback.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.searchTitle = this.searchTitle.bind(this);
    this.state = {
      feedback: [],
      searchTitle: "",
      searchTag: "",
      currentIndex: -1,
    };
  }
  componentDidMount() {
    this.retrieveFeedback();
  }
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle,
    });
  }
  onChangeSearchTag(e) {
    const searchTag = e.target.value;
    this.setState({
      searchTag: searchTag,
    });
  }
  retrieveFeedback() {
    FeedbackDataService.getAll()
      .then((respone) => {
        this.setState({
          feedback: respone.data,
        });
        console.log(respone.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveFeedback();
    this.setState({
      searchTag: "",
      currentIndex: -1,
    });
  }

  searchTitle() {
    FeedbackDataService.findfreeText(
      this.state.searchTitle,
      this.state.searchTag
    )
      .then((respone) => {
        this.setState({
          feedback: respone.data,
        });
        console.log(respone.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, feedback } = this.state;
    console.warn(this.state);
    return (
      <>
        <div className="container">
          <label className="search-label" htmlFor="search-input">
            Feedback :&nbsp;&nbsp;
            <input
              type="text"
              name="feedback"
              value={searchTitle}
              id="search-input"
              placeholder="Feedback"
              onChange = {this.onChangeSearchTitle}
            />
          </label>
          &nbsp;&nbsp;
          <label htmlFor="tag">Tag :  </label>
          <select name="tag" id="tag" onChange={this.onChangeSearchTag}>
            <option defaultValue> Select tag </option>
            <option value="positive">positive</option>
            <option value="negative">negative</option>
          </select>
          <br />
          <br />
          <button
            type="submit"
            class="btn btn-primary btn-sm"
            onClick={this.searchTitle}
          >
            Search
          </button>
        </div>
        <ul className="list-group">
          {feedback &&
            feedback.map((feedback) => (
              <li>
                  <>
                    <b>{feedback.feed}</b>
                    <br />
                    Tags: {feedback.tag ?"positive":"negative"}
                  </>
              </li>
            ))}
        </ul>
      </>
    );
  }
}

export default Search;
