<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Recompensas</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(recompensa, index) in recompensas"
          :key="index"
          @click="setActiveRecompensa(recompensa, index)"
        >
          {{ recompensa.nombre }}
        </li>
      </ul>
      <router-link to="/recompensas/add" class="nav-link">Nuevo</router-link>
    </div>
    <div class="col-md-6">
      <div v-if="currentRecompensa">
        <h4>Recompensa</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentRecompensa.nombre }}
        </div>
        <div>
          <label><strong>Nº Puntos:</strong></label> {{ currentRecompensa.cuantosPuntos }}
        </div>
        <div>
          <label><strong>Tipo:</strong></label> {{ currentRecompensa.tipo }}
        </div>
        <router-link :to="'/recompensas/' + currentRecompensa.id" class="badge badge-warning">Editar</router-link>

      </div>
      <div v-else>
        <br />
        <p>Por favor seleccione una Recompensa...</p>
      </div>
    </div>
  </div>
</template>
<script>
import RecompensasDataService from "../services/RecompensasDataService";
export default {
  name: "recompensas-list",
  data() {
    return {
      recompensas: [],
      currentRecompensa: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveRecompensas() {
      RecompensasDataService.getAll()
        .then(response => {
          this.recompensas = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveRecompensas();
      this.currentRecompensa = null;
      this.currentIndex = -1;
    },
    setActiveRecompensa(recompensa, index) {
      this.currentRecompensa = recompensa;
      this.currentIndex = recompensa ? index : -1;
    }
  },
  mounted() {
    this.retrieveRecompensas();
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
