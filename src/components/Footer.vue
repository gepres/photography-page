<template>
  <v-footer
    dark
    height="auto"
  >
   <v-layout wrap row class="colorNav darken-1 white--text text-xs-center">
      <v-flex lg12>
        <v-btn class="mx-3 white--text" icon href="https://www.google.com.pe/" target="_blank">
          <v-icon size="24px">fab fa-facebook</v-icon>
        </v-btn>
        <v-btn class="mx-3 white--text" icon href="https://www.google.com.pe/" target="_blank">
          <v-icon size="24px">fab fa-twitter</v-icon>
        </v-btn>
        <v-btn class="mx-3 white--text" icon href="https://www.google.com.pe/" target="_blank">
          <v-icon size="24px">fab fa-linkedin</v-icon>
        </v-btn>
        <v-btn class="mx-3 white--text" icon href="https://www.google.com.pe/" target="_blank">
          <v-icon size="24px">fab fa-instagram</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12 md4 lg4 class="mb-3">
        <h5 class="headline">Categorias</h5>
        <ul class="footer-categoria__ul">
          <li class="footer-categoria__li">Paisajes</li>
          <li class="footer-categoria__li">Flora</li>
          <li class="footer-categoria__li">Fauna</li>
          <!-- <li class="footer-categoria__li">Flores</li> -->
        </ul>
      </v-flex>
      <v-flex xs12 md4 lg4 class="mb-3">
        <h5 class="headline">Archivos</h5>
        <ul class="footer-categoria__ul">
          <li class="footer-categoria__li">Observación de aves</li>
          <li class="footer-categoria__li">Gastronomía</li>
          <li class="footer-categoria__li">Turismo</li>
          <li class="footer-categoria__li">Ica</li>
        </ul>
      </v-flex>
      <v-flex xs12 md4 lg4 class="mb-3">
        <h5 class="headline">Contacto</h5>
        <ul class="footer-categoria__ul">
          <li class="footer-contacto__li"><v-icon class="mr-3">fas fa-map-marker-alt</v-icon> Ica-Perú</li>
          <li class="footer-contacto__li"><v-icon class="mr-3">fas fa-phone</v-icon>+941 947 154</li>
          <li class="footer-contacto__li"><v-icon class="mr-3">fas fa-envelope</v-icon>matthewsrn38@gmail.com</li>
        </ul>
      </v-flex>
      <v-divider></v-divider>
      
      <v-card-text class="white--text colorNav darken-2">
        &copy;{{ new Date().getFullYear() }} — <strong><a class="brand"  href="https://www.facebook.com/genaro.pretillescobar" target="_blank">GepresDesign</a></strong>
      </v-card-text>
   </v-layout>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
    })
  }
</script>

<style lang="scss" scoped>
.footer{
  &-categoria{
    &__ul{
      text-align: start;
      padding-left: 4rem;
    }
    &__li{
      list-style: none;
      border-bottom: 1px solid rgba($color: #fff, $alpha: 0.2);
       padding-top: 1.2rem;
    }
  }
  &-contacto{
    &__li{
      list-style: none;
       padding-top: 1.2rem;
    }
  }
}
.brand{
  text-decoration:none;
  color:rgb(255, 255, 255);
}
</style>
