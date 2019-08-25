<template>
  <div>
    <v-container fluid class="galery">
    <v-layout row wrap>
        <!-- obtienes el getters desde el store  -->
       <cardGallery v-for="item in this.$store.getters.getItems" :key="item.id" :gallery="item"></cardGallery>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
  import cardGallery from '../components/CardGallery'
  export default {
    name:'home',
    components: {
      cardGallery
    },
    beforeCreate: function () {
      // llamas  para usarlo en el componente
    this.$store.dispatch('setItems')
    },
    data(){
      return {

      }
    }
  }
</script>
<style lang="scss" scoped>
.galery{
  padding: 0;
}
</style>

