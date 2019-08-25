<template>
<div>
   <v-container class="container">
    <v-layout>
      <v-flex class="text--dark">
        <router-link class="enlace black--text" to="/">Inicio</router-link>
        <v-icon class="icono">fas fa-chevron-right</v-icon>
        <span>{{link}}</span>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>
export default {
  name:'SliderText',
  props:{
   link:String
  }
}
</script>
<style lang="scss" scoped>
.container{
  padding-bottom: 0;
}
.icono{
  font-size: 1.2rem;
  margin:  0 .5rem;
}
.enlace{
  text-decoration: none;
}
</style>
