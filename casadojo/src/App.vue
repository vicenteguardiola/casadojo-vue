<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>CasaDojo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="link in links"
        :key="`${link.label}-header-link`"        
        :to="link.url"
        rounded="">
        {{ link.label }}
      </v-btn>
    </v-app-bar>

  <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
  </v-main>

    <v-footer 
      color="primary lighten-1"
      padless>

        <v-row
          justify="center"
          no-gutters
        >
          <v-btn
            v-for="link in links"
            :key="`${link.label}-footer-link`"
            :to="link.url"
            rounded>
            {{ link.label }}
          </v-btn>

        

      </v-row>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: "app",
  data(){
    return{
      links:[
        {
           label:'Inicio',
           url:'/'
        },
        {
           label:'Perfiles',
           url:'/perfiles'
        },
        {
           label:'Logros',
           url:'/logros'
        },
        {
           label:'Recompensas',
           url:'/recompensas'
        }
      ]
    }
  }
};
</script>
