<template>
  <div v-if="currentLogro" class="edit-form">
    <h4>Logro</h4>
    <form>
      <div class="form-group">
        <label for="nombre">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          required
          v-model="currentLogro.nombre"
          name="nombre"
        />

        <label for="cuantosPuntos">Nº Puntos</label>
        <input
          type="text"
          class="form-control"
          id="numeroPuntos"
          required
          v-model="currentLogro.numeroPuntos"
          name="numeroPuntos"
          @keypress="validateNumber"
        />
      </div>
    </form>

    <button class="badge badge-danger mr-2"
      @click="deleteLogro"
    >
      Borrar
    </button>
    <button type="submit" class="badge badge-success"
      @click="updateLogro"
    >
      Actualizar
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Por favor seleccione un Logro...</p>
  </div>
</template>
<script>
import LogrosDataService from "../services/LogrosDataService";
export default {
  name: "logro-detail",
  data() {
    return {
      currentLogro: null,
      message: ''
    };
  },
  methods: {
    getLogro(id) {
      LogrosDataService.get(id)
        .then(response => {
          this.currentLogro = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateLogro() {
      LogrosDataService.update(this.currentLogro.id, this.currentLogro)
        .then(response => {
          console.log(response.data);
          this.message = '¡Logro actualizado correctamente!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deleteLogro() {
      LogrosDataService.delete(this.currentLogro.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "logros" });
        })
        .catch(e => {
          console.log(e);
        });
    }

  },
  mounted() {
    this.message = '';
    this.getLogro(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
