import http from "../http-common";
class RecompensasDataService {
  getAll() {
    return http.get("/recompensa/");
  }
  get(id) {
   return http.get(`/recompensa/${id}`);
 }
 create(data) {
   return http.post("/recompensa/", data);
 }
 update(id, data) {
   return http.put(`/recompensa/${id}`, data);
 }
 delete(id) {
   return http.delete(`/recompensa/${id}`);
 }

}
export default new RecompensasDataService();
