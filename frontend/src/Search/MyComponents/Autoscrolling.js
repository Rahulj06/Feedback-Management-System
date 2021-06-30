import React, { Component } from "react";
// import { Link } from "react-router-dom";
import FeedbackDataService from "./FeedbackDataService";
//import "./search.css";
import Pagination from "@material-ui/lab/Pagination";
import { ceil } from "lodash";
//import { textAlign } from "@material-ui/system";
// import Math from "core-js/library/fn/math";

class Autoscrolling extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
        this.onChangeSearchTag = this.onChangeSearchTag.bind(this);
        this.retrieveFeedback = this.retrieveFeedback.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.getLength = this.getLength.bind(this);

        this.state = {
          feedback: [],
          searchTitle: "",
          searchTag: "",
          page: 1,
          count: 0,
          pageSize: 3,
        };
        this.pageSizes = [3,6,9];
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
          searchTag: searchTag
        });
      }
      getRequestParams(searchTitle, searchTag, page, pageSize) {
        let params = {};
    
        if (searchTitle) {
          params["feed"] = searchTitle;
        }
        if(searchTag) {
            params["tag"] = searchTag;
        }
        if (page) {
          params["page"] = page - 1;
        }
    
        if (pageSize) {
          params["size"] = pageSize;
        }
    
        return params;
      }

      getLength() {
          const {searchTitle, searchTag,pageSize} = this.state;
          const params = this.getRequestParams(searchTitle, searchTag);
          
          FeedbackDataService.getAll(params)
          .then((response) => {
         this.setState({
             count: ceil(response.data.length/pageSize)
         });
         console.log(this.state)
          })
      }

      retrieveFeedback() {
        const { searchTitle, searchTag, page, pageSize } = this.state;
        const params = this.getRequestParams(searchTitle, searchTag, page, pageSize);
        this.getLength();
        FeedbackDataService.getAll(params)
          .then((response) => {
            const feedback = response.data;
            this.setState({
              feedback: feedback,
            });
            console.log(typeof(response.data));
          })
          .catch((e) => {
            console.log(e);
          });
      }

      refreshList() {
        this.retrieveFeedback();
        this.setState({
          currentIndex: -1,
          pageSizes : 3,
          page  : 1
        });
      }
    
      handlePageChange(event, value) {
        this.setState(
          {
            page: value,
          },
          () => {
            this.retrieveFeedback();
          }
        );
      }
      handlePageSizeChange(event) {
        this.setState(
          {
            pageSize: event.target.value,
            page: 1
          },
          () => {
            this.retrieveFeedback();
          }
        );
      }
      render() {
        const {
            searchTitle,
            feedback,
            page,
            count,
            pageSize
        } = this.state;
        console.warn(this.state);
        return (
          <div>
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
              <label htmlFor="tag">Tag : </label>
              <select name="tag" id="tag" onChange={this.onChangeSearchTag}>
                <option defaultValue>Select tag </option>
                <option value="happy">positive</option>
                <option value="not happy">negative</option>
              </select>
              <br />
              <br />
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                onClick={this.retrieveFeedback}
              >
                Search
              </button>
              
            </div>
            <div className="col-md">
                {"Item per page: "}
                <select onChange={this.handlePageSizeChange} value={pageSize}>
                  {this.pageSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                <Pagination
                  className="my-3"
                  count ={count}
                  page={page}
                  siblingCount ={1}
                  boundaryCount ={1}
                  variant = "outlined"
                  shape="rounded"
                  onChange = {this.handlePageChange}
                  
                />
            </div>
            {/* <div className="list-group"> */}
            <ul className="list-group">
              {feedback &&
                feedback.map((feedback) => (
                  <li key={feedback.id}>
                    {feedback.feed}
                    <br/>
                    Tags: {feedback.tag}
                    <hr/>
                  </li>
                ))}
            </ul>
            {/* </div> */}
          </div>
        );
      }
    }
export default Autoscrolling;