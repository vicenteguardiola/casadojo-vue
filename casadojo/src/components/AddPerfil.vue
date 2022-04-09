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
          v-model="perfil.nombre"
          name="nombre"
        />

        <label for="tipo">Tipo</label>
        <select
          v-model="perfil.tipo"
          required
          id="tipo"
          class="form-control" >
            <option value="" selected disabled>Escoja una opción...</option>
            <option v-for="tipo in tiposPerfil" :value="tipo" :key="tipo">{{ tipo }}</option>
          </select>
      </div>
      <!-- Pendiente de añadir desplegable con tipo e imagen -->
      <button @click="savePerfil" class="btn btn-success">Guardar</button>
    </div>
    <div v-else>
      <h4>¡Creado correctamente!</h4>
      <button class="btn btn-success" @click="newPerfil">Nuevo</button>
    </div>
  </div>
</template>
<script>
import PerfilDataService from "../services/PerfilesDataService";
import DatosDataService from "../services/DatosDataService";
export default {
  name: "add-perfil",
  data() {
    return {
      perfil: {
        id: null,
        nombre: "",
        tipo: null,
        imagen: null
      },
      tiposPerfil: [],
      submitted: false
    };
  },
  methods: {
    savePerfil() {
      var data = {
        nombre: this.perfil.nombre,
        tipo: this.perfil.tipo,
        imagen: this.perfil.imagen
      };
      PerfilDataService.create(data)
        .then(response => {
          this.perfil.id = response.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },

    newPerfil() {
      this.submitted = false;
      this.perfil = {};
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
