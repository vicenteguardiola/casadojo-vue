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
          v-model="recompensa.nombre"
          name="nombre"
        />

        <label for="cuantosPuntos">Nº Puntos</label>
        <input
          type="text"
          class="form-control"
          id="cuantosPuntos"
          required
          v-model="recompensa.cuantosPuntos"
          name="cuantosPuntos"
          @keypress="validateNumber"
        />

        <label for="tipo">Tipo</label>
        <select
          v-model="recompensa.tipo"
          required
          id="tipo"
          class="form-control" >
            <option value="" selected disabled>Escoja una opción...</option>
            <option v-for="tipo in tiposRecompensa" :value="tipo" :key="tipo">{{ tipo }}</option>
          </select>
      </div>
      <!-- Pendiente de añadir desplegable con tipo e imagen -->
      <button @click="saveRecompensa" class="btn btn-success">Guardar</button>
    </div>
    <div v-else>
      <h4>¡Creada correctamente!</h4>
      <button class="btn btn-success" @click="newRecompensa">Nuevo</button>
    </div>
  </div>
</template>
<script>
import RecompensasDataService from "../services/RecompensasDataService";
import DatosDataService from "../services/DatosDataService";
export default {
  name: "add-recompensa",
  data() {
    return {
      recompensa: {
        id: null,
        nombre: "",
        cuantosPuntos: 0,
        tipo: null,
        imagen: null
      },
      tiposRecompensa: [],
      submitted: false
    };
  },
  methods: {
    saveRecompensa() {
      var data = {
        nombre: this.recompensa.nombre,
        cuantosPuntos: this.recompensa.cuantosPuntos,
        tipo: this.recompensa.tipo,
        imagen: this.recompensa.imagen
      };
      RecompensasDataService.create(data)
        .then(response => {
          this.recompensa.id = response.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });

    },
    validateNumber: event => {
      let keyCode = event.keyCode;
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
      }
      },
    newRecompensa() {
      this.submitted = false;
      this.recompensa = {};
    },

    retrieveTiposRecompensa() {
      DatosDataService.getAllTipoRecompensa()
        .then(response => {
          this.tiposRecompensa = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    loadData(){
      this.retrieveTiposRecompensa();
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
