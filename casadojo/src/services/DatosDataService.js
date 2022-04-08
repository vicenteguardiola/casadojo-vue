import http from "../http-common";
class DatosDataService {
  getAllTipoPerfil() {
    return http.get("/datos/tipoPerfil/");
  }
  getAllTipoLogro() {
    return http.get("/datos/tipoLogro/");
  }
  getAllTipoRecompensa() {
    return http.get("/datos/tipoRecompensa/");
  }

}
export default new DatosDataService();
