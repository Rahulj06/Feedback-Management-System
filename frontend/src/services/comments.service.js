import http from "../http-common";

class commentsDataService {
  getAll(id) {
    return http.get(`/comment?feed_id=${id}`);
  }

  get(id) {
    return http.get(`/comment/${id}`);
  }

  create(id,data) {
    return http.post(`/comment?feed_id=${id}`, data);
  }

  update(id, data) {
    return http.put(`/comment/${id}`, data);
  }

  delete(id) {
    return http.delete(`/comment/${id}`);
  }

  deleteAll() {
    return http.delete(`/comment`);
  }
}

export default new commentsDataService();