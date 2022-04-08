import http from "../http-common";
class PerfilesDataService {
  getAll() {
    return http.get("/perfil/");
  }
  get(id) {
   return http.get(`/perfil/${id}`);
 }
 create(data) {
   return http.post("/perfil/", data);
 }
 update(id, data) {
   return http.put(`/perfil/${id}`, data);
 }
 delete(id) {
   return http.delete(`/perfil/${id}`);
 }

}
export default new PerfilesDataService();
