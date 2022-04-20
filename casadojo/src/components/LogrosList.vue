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

      <button class="btn btn-success" @click="nuevo">Nuevo</button>

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

        <button class="btn btn-success" @click="editar">Editar</button>

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
    },
    editar(){
      this.$router.push({ path: '/logros/'+this.currentLogro.id })
    },
    nuevo(){
      this.$router.push({ path: '/logros/add' })
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
