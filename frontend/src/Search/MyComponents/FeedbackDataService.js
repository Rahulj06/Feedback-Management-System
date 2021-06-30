import http from "./http-common";

class FeedbackDataService {
    getAll(params){
        return http.get("/core",{params});
    }

    findfreeText(params) {
        return http.get("/core",{params});
      }
}

export default new FeedbackDataService();