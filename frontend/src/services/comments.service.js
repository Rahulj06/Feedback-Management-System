import http from "../http-common";

class commentsDataService {
  getAll() {
    return http.get(`/comments?feed_id=${id}`);
  }

  get(id) {
    return http.get(`/comments/${id}`);
  }

  create(data) {
    return http.post(`/comments?feed_id=${id}`, data);
  }

  update(id, data) {
    return http.put(`/comments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/comments/${id}`);
  }

  deleteAll() {
    return http.delete(`/comments`);
  }
}

export default new commentsDataService();