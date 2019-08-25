<template>
  <v-app>

    <Navigation></Navigation>
    <v-content>
      <router-view/>
      <Footer></Footer>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components:{
    Navigation,
    Footer
  },
  data () {
    return {
      //
    }
  }
}
</script>

