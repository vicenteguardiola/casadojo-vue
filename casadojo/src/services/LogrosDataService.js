import http from "../http-common";
class LogrosDataService {
  getAll() {
    return http.get("/logro/");
  }
  get(id) {
   return http.get(`/logro/${id}`);
 }
 create(data) {
   return http.post("/logro/", data);
 }
 update(id, data) {
   return http.put(`/logro/${id}`, data);
 }
 delete(id) {
   return http.delete(`/logro/${id}`);
 }

}
export default new LogrosDataService();
