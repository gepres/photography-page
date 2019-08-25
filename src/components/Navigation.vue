<template>
  <div>
     <!-- START - TOOLBAR -->
    <v-toolbar dark class="colorNav" v-if="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs ||  $vuetify.breakpoint.md" app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span class="title">Matthews</span>
        <span class="font-weight-light subheading">Fotógrafo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <!-- START - NAVIGATION -->
    <v-navigation-drawer dark class="colorNav" width="250" v-model="drawer" app>
      <v-layout  mt-4 column align-center>
        <v-flex>
          <v-avatar>
            <img src="@/assets/camara.svg" class="logo">
          </v-avatar>
        </v-flex>
        <v-flex>
          <h1 class="headline mt-3">Matthews Carbonel</h1>
          <p class="white--text mt-1 headline">FOTÓGRAFO</p>
        </v-flex>
      </v-layout>
      <v-layout column>
        <v-flex>
            <v-btn flat to="/" class="text-lg-right" block>Inicio</v-btn>
            <v-btn flat to="/gallery" block>Galeria</v-btn>
            <v-btn flat to="/about" block>Acerca</v-btn>
            <v-btn flat to="/contact" block>Contacto</v-btn>
            <v-btn v-show="observadorLogin" flat to="/login" block>Login</v-btn>
             <v-btn v-show="observador" flat to="/admin" block>Admin</v-btn>
        </v-flex>
      </v-layout>
       <v-spacer></v-spacer>
      <v-layout>
        <v-flex>
          <v-footer dark height="auto" fixed>
          <v-card class="flex" flat tile>
            <v-card-title class="colorNav justify-center">
              <v-btn class="mx-3 white--text" icon href="https://www.google.com.pe/" target="_blank">
                <v-icon size="20px">fab fa-facebook</v-icon>
              </v-btn>
              <v-btn class="mx-3 white--text" icon href="https://www.google.com.pe/" target="_blank">
                <v-icon size="20px">fab fa-twitter</v-icon>
              </v-btn>
              <v-btn class="mx-3 white--text" icon href="https://www.google.com.pe/" target="_blank">
                <v-icon size="20px">fab fa-linkedin</v-icon>
              </v-btn>
              <v-btn class="mx-3 white--text" icon href="https://www.google.com.pe/" target="_blank">
                <v-icon size="20px">fab fa-instagram</v-icon>
              </v-btn>
            </v-card-title>

            <v-card-actions class="colorNav darken-1 justify-center">
              &copy;{{ new Date().getFullYear() }}— <strong>GepresDesign</strong>
            </v-card-actions>
          </v-card>
        </v-footer>
        </v-flex>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>
<script>
import firebase from 'firebase'
export default {
  name:'navigation',
  data () {
    return {
      drawer:true,
      observador:false,
      observadorLogin:true
    }
  },
  methods:{
    observadorApp(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.observador = true  
          this.observadorLogin = false    
        }
      });
    }
  },
  mounted(){
    this.observadorApp()
  }
}
</script>

<style lang="scss" scoped>
.v-avatar{
  width: 100px !important;
  height: 100px !important;
}
.logo{
  border-radius: 0;
}
a{
  margin:0 !important;
}
</style>