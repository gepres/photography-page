<template>
<div>
  <SliderText link="Acerca"/>
   <v-container>
    <v-layout>
      <v-flex class="dark--text">
        <h1 class="display-1">Acerca</h1>
        <v-flex xs12 lg9>
          <p class="grey--text darken-1 mt-3 ml-3">Soy fotógrafo de la naturaleza, estudiante de biología.</p>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
  <v-container class="content-section2">
    <v-layout class="content-section2__row" wrap>
      <v-flex lg6 class="hover-img">
        <figure>
          <img class="img-section2"
        :src="require('@/assets/author.jpg')">
        </figure>
      </v-flex>
      <v-flex lg6 md6 class="light-green pa-5 lighten-5 content-section2__parrafo">
        <h2 class="display-1 my-2 font-weight-bold">Fotógrafo Profesional</h2>
        <p class="grey--text darken-1">Fotógrafo amateur, estudiante de biología, amante de la naturaleza, loco obsesionado con la observación de aves.<br>
        Me gusta dar a conocer sobre la flora y fauna de nuestro Perú, además de las culturas tenemos.
        </p>
        <ul class="grey--text darken-1">
          <li>Estudiante de biología.</li>
          <li>Amante de la naturaleza.</li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>
import SliderText from '@/components/Slider-text.vue'
export default {
  name:'about',
  components:{
     SliderText
  }
}
</script>
<style lang="scss" scoped>
.content-section2__parrafo{
  right: 30px;
  position: absolute;
  -webkit-box-shadow: 13px 15px 48px -5px rgba(0,0,0,0.55);
  -moz-box-shadow: 13px 15px 48px -5px rgba(0,0,0,0.55);
  box-shadow: 13px 15px 48px -5px rgba(0,0,0,0.55);
  & p,ul{
    font-size: 1.3rem;
  }
  & p{
    margin: 4rem 0;
  }
  & ul{
    padding-left: 3rem;
  }
  @media screen and (max-width:960px) {
    // background-color: red !important;
    position:relative;
    right: 0;
    box-shadow: none;
  }
}
.content-section2{
  padding-left: 0;
  padding-right: 0;
  &__row{
    align-items: center;
  }
}
.img-section2{
  width: 40vw;
  height: 700px;
  background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  @media screen and (max-width:960px) {
    width: 100vw;
    height: 400px;
  }
}
.hover-img figure img{
-webkit-transform: scale(1.5);
	transform: scale(1.5);
	-webkit-transition: .3s ease-in-out;
	transition: .3s ease-in-out;
}
figure{
	margin: 0;
	padding: 0;
	background: #fff;
	overflow: hidden;
  -webkit-box-shadow: 10px 10px 25px -5px rgba(0,0,0,0.75);
-moz-box-shadow: 10px 10px 25px -5px rgba(0,0,0,0.75);
box-shadow: 10px 10px 25px -5px rgba(0,0,0,0.75);
}

</style>
