<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Perfiles</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(perfil, index) in perfiles"
          :key="index"
          @click="setActivePerfil(perfil, index)"
        >
          {{ perfil.nombre }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentPerfil">
        <h4>Perfil</h4>
        <div>
          <label><strong>Nombre:</strong></label> {{ currentPerfil.nombre }}
        </div>
        <div>
          <label><strong>Tipo:</strong></label> {{ currentPerfil.tipo }}
        </div>
      </div>
      <div v-else>
        <br />
        <p>Por favor seleccione un Perfil...</p>
      </div>
    </div>
  </div>
</template>
<script>
import PerfilesDataService from "../services/PerfilesDataService";
export default {
  name: "perfiles-list",
  data() {
    return {
      perfiles: [],
      currentPerfil: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrievePerfiles() {
      PerfilesDataService.getAll()
        .then(response => {
          this.perfiles = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrievePerfiles();
      this.currentPerfil = null;
      this.currentIndex = -1;
    },
    setActivePerfil(perfil, index) {
      this.currentPerfil = perfil;
      this.currentIndex = perfil ? index : -1;
    }
  },
  mounted() {
    this.retrievePerfiles();
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
