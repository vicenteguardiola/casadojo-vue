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

    <button class="btn btn-secondary" @click="volver">Volver</button>

    <button type="submit" class="btn btn-success" @click="updateRecompensa">Actualizar</button>

    <button class="btn btn-danger mr-2" @click="deleteRecompensa">Borrar</button>


    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Por favor seleccione una Recompensa...</p>
  </div>

  <confirm-dialogue ref="confirmDialogue"></confirm-dialogue>

</template>
<script>
import RecompensasDataService from "../services/RecompensasDataService";
import DatosDataService from "../services/DatosDataService";
import ConfirmDialogue from '../components/ConfirmDialogue.vue'


export default {
  name: "recompensa-detail",
  components: { ConfirmDialogue },

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
    async deleteRecompensa(){
      const ok = await this.$refs.confirmDialogue.show({
          title: 'Elimiar Logro',
          message: '¿Estás seguro que deseas eliminar la recompensa seleccionado?',
          okButton: 'Borrar',
      })
        if (ok) {
          this.doDeleteRecompensa();
        }

    },
    doDeleteRecompensa() {
      RecompensasDataService.delete(this.currentRecompensa.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "recompensas" });
        })
        .catch(e => {
          console.log(e);
        });
    },
    volver(){
      this.$router.push('/recompensas/')
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
