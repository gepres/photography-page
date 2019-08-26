<template>
<div>
  <v-toolbar dark class="colorNav">
      <v-spacer></v-spacer>
        <v-btn flat to="/admin">Agregar</v-btn>
        <v-btn flat to="/admin-tabla">Tabla</v-btn>
        <v-toolbar-title class="emailNav">{{emailNav}}</v-toolbar-title>
        <v-btn round outline color="green lighten-5" class="btn-salir" @click="salir" >salir</v-btn>
  </v-toolbar>
</div>
</template>

<script>
import firebase from 'firebase'
  export default {
    name:'admin-menu',
    data(){
      return{
        emailNav :null
      }
    },
    methods:{
      salir(){
        firebase.auth().signOut().then(()=> {
        console.log('se salio de administración');
         this.$router.replace({ name: 'home' })
        }).catch(function(error) {
        // An error happened.
      });
      },
      observadorNav(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.emailNav = user.email
        }
      });
      }
    },
    mounted(){
    this.observadorNav()
    }
  }
</script>

<style lang="scss" scoped>
.emailNav{
  margin-right: 1.5rem;
}
.btn-salir{
  @media screen and (max-width:360px) {
    right: 15px;
  }
}
</style>