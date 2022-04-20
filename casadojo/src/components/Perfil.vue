<template>
  <div v-if="currentPerfil" class="edit-form">
    <h4>Recompensa</h4>
    <form>
    <label for="nombre">Nombre</label>
    <input
      type="text"
      class="form-control"
      id="nombre"
      required
      v-model="currentPerfil.nombre"
      name="nombre"
    />

    <label for="tipo">Tipo</label>
    <select
      v-model="currentPerfil.tipo"
      required
      id="tipo"
      class="form-control" >
        <option value="" selected disabled>Escoja una opción...</option>
        <option v-for="tipo in tiposPerfil" :value="tipo" :key="tipo">{{ tipo }}</option>
      </select>
    </form>

    <button class="btn btn-secondary" @click="volver">Volver</button>
    <button type="submit" class="btn btn-success" @click="updatePerfil">Actualizar</button>
    <button class="btn btn-danger mr-2" @click="deletePerfil" >Borrar</button>
    
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Por favor seleccione un Perfil...</p>
  </div>
</template>
<script>
import PerfilesDataService from "../services/PerfilesDataService";
import DatosDataService from "../services/DatosDataService";

export default {
  name: "perfil-detail",
  data() {
    return {
      currentPerfil: null,
      message: '',
      tiposPerfil: [],
    };
  },
  methods: {
    getPerfil(id) {
      PerfilesDataService.get(id)
        .then(response => {
          this.currentPerfil = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    updatePerfil() {
      PerfilesDataService.update(this.currentPerfil.id, this.currentPerfil)
        .then(response => {
          console.log(response.data);
          this.message = '¡Perfil actualizado correctamente!';
        })
        .catch(e => {
          console.log(e);
        });
    },
    deletePerfil() {
      PerfilesDataService.delete(this.currentPerfil.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "perfiles" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    volver(){
      this.$router.push('/perfiles/')
    },
    retrieveTiposPerfil() {
      DatosDataService.getAllTipoPerfil()
        .then(response => {
          this.tiposPerfil = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    loadData(){
      this.retrieveTiposPerfil();
    }

  },
  mounted() {
    this.message = '';
    this.loadData();
    this.getPerfil(this.$route.params.id);
  }
};
</script>
<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
