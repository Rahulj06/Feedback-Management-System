import http from "./http-common";

class FeedbackDataService {
    getAll(){
        return http.get("/core");
    }

    findfreeText(free_text,tag) {
        return http.get(`/core?feed=${free_text}&tag =${tag}`)
      }
}

export default new FeedbackDataService();
