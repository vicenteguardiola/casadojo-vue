<template>
  <div v-if="currentRecompensa" class="edit-form">
    <h4>Recompensa</h4>
    <form>
    <label for="nombre">Nombre</label>
    <input
      type="text"
      class="form-control"
      id="nombre"
      required
      v-model="currentRecompensa.nombre"
      name="nombre"
    />

    <label for="cuantosPuntos">Nº Puntos</label>
    <input
      type="text"
      class="form-control"
      id="cuantosPuntos"
      required
      v-model="currentRecompensa.cuantosPuntos"
      name="cuantosPuntos"
      @keypress="validateNumber"
    />

    <label for="tipo">Tipo</label>
    <select
      v-model="currentRecompensa.tipo"
      required
      id="tipo"
      class="form-control" >
        <option value="" selected disabled>Escoja una opción...</option>
        <option v-for="tipo in tiposRecompensa" :value="tipo" :key="tipo">{{ tipo }}</option>
      </select>
    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteRecompensa"
    >
      Borrar
    </button>
    <button type="submit" class="badge badge-success"
      @click="updateRecompensa"
    >
      Actualizar
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Por favor seleccione una Recompensa...</p>
  </div>
</template>
<script>
import RecompensasDataService from "../services/RecompensasDataService";
import DatosDataService from "../services/DatosDataService";

export default {
  name: "recompensa-detail",
  data() {
    return {
      currentRecompensa: null,
      message: '',
      tiposRecompensa: [],
    };
  },
  methods: {
    getRecompensa(id) {
      RecompensasDataService.get(id)
        .then(response => {
          this.currentRecompensa = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateRecompensa() {
      RecompensasDataService.update(this.currentRecompensa.id, this.currentRecompensa)
        .then(response => {
          console.log(response.data);
          this.message = '¡Recompensa actualizado correctamente!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteRecompensa() {
      RecompensasDataService.delete(this.currentRecompensa.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "recompensas" });
        })
        .catch(e => {
          console.log(e);
        });
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
  mounted() {
    this.message = '';
    this.loadData();
    this.getRecompensa(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
