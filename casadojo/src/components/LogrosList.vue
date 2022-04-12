<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Logros</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(logro, index) in logros"
          :key="index"
          @click="setActiveLogro(logro, index)"
        >
          {{ logro.nombre }}
        </li>
      </ul>
      <router-link to="/logros/add" class="nav-link">Nuevo</router-link>
    </div>
    <div class="col-md-6">
      <div v-if="currentLogro">
        <h4>Logro</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentLogro.nombre }}
        </div>
        <div>
          <label><strong>Nº Puntos:</strong></label> {{ currentLogro.numeroPuntos }}
        </div>
        <router-link :to="'/logros/' + currentLogro.id" class="badge badge-warning">Editar</router-link>
      </div>
      <div v-else>
        <br />
        <p>Por favor seleccione un Logro...</p>
      </div>
    </div>
  </div>
</template>
<script>
import LogrosDataService from "../services/LogrosDataService";
export default {
  name: "logros-list",
  data() {
    return {
      logros: [],
      currentLogro: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveLogros() {
      LogrosDataService.getAll()
        .then(response => {
          this.logros = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveLogros();
      this.currentLogro = null;
      this.currentIndex = -1;
    },
    setActiveLogro(logro, index) {
      this.currentLogro = logro;
      this.currentIndex = logro ? index : -1;
    }
  },
  mounted() {
    this.retrieveLogros();
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
