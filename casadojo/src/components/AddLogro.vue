<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          required
          v-model="logro.nombre"
          name="nombre"
        />

        <label for="cuantosPuntos">Nº Puntos</label>
        <input
          type="text"
          class="form-control"
          id="numeroPuntos"
          required
          v-model="logro.numeroPuntos"
          name="numeroPuntos"
          @keypress="validateNumber"
        />
      </div>
      <!-- Pendiente de añadir desplegable con tipo e imagen -->
      <button class="btn btn-secondary"  @click="volver"> Volver</button>
      <button class="btn btn-success" @click="saveLogro" >Guardar</button>
    </div>
    <div v-else>
      <h4>¡Creado correctamente!</h4>
      <button class="btn btn-secondary"  @click="volver"> Volver</button>
      <button class="btn btn-success" @click="newLogro">Nuevo</button>
    </div>
  </div>
</template>
<script>
import LogrosDataService from "../services/LogrosDataService";
import DatosDataService from "../services/DatosDataService";
export default {
  name: "add-logro",
  data() {
    return {
      logro: {
        id: null,
        nombre: "",
        numeroPuntos: 0,
        imagen: null
      },
      tiposLogro: [],
      submitted: false
    };
  },
  methods: {
    saveLogro() {
      var data = {
        nombre: this.logro.nombre,
        numeroPuntos: this.logro.numeroPuntos,
        imagen: this.logro.imagen
      };
      LogrosDataService.create(data)
        .then(response => {
          this.logro.id = response.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });

    },
    validateNumber: event => {
      let keyCode = event.keyCode;
      if (keyCode < 48 || keyCode > 57 ) {
        event.preventDefault();
      }
      },
    newLogro() {
      this.submitted = false;
      this.logro = {};
    },

    volver(){
      this.$router.push('/logros/')
    },

    retrieveTiposLogro() {
      DatosDataService.getAllTipoLogro()
        .then(response => {
          this.tiposLogro = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    loadData(){
      this.retrieveTiposLogro();
    }
  },
  mounted(){
    this.loadData();
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
